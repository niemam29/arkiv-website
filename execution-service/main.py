from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
from io import StringIO
import traceback
import asyncio
import json
import subprocess
import tempfile
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeExecutionRequest(BaseModel):
    code: str
    language: str = "python"

class CodeExecutionResponse(BaseModel):
    output: str
    error: str = ""
    success: bool = True

@app.post("/execute", response_model=CodeExecutionResponse)
async def execute_code(request: CodeExecutionRequest):
    """Execute Python or JavaScript/TypeScript code and return output"""

    if request.language == "python":
        return await execute_python(request.code)
    elif request.language in ["javascript", "typescript"]:
        return await execute_javascript(request.code)
    else:
        raise HTTPException(status_code=400, detail=f"Language '{request.language}' is not supported")

async def execute_python(code: str) -> CodeExecutionResponse:
    """Execute Python code"""
    try:
        # Wrap code in async function to support top-level await
        wrapped_code = f"""
import asyncio

# Mock environment for playground (read-only test key)
mock_private_key = '1e951be867cba332c76e83ca9f0e55fffcd858f574973a5feac3148b308ff8ae'

async def main():
{chr(10).join('    ' + line for line in code.split(chr(10)))}

asyncio.run(main())
print('')
print('✅ Execution completed')
"""

        # Execute with Python in a subprocess (avoids event loop issues)
        result = subprocess.run(
            ['python3', '-c', wrapped_code],
            capture_output=True,
            text=True,
            timeout=30
        )

        return CodeExecutionResponse(
            output=result.stdout,
            error=result.stderr,
            success=result.returncode == 0
        )

    except subprocess.TimeoutExpired:
        return CodeExecutionResponse(
            output="",
            error="Execution timed out after 30 seconds",
            success=False
        )
    except Exception as e:
        error_msg = f"{type(e).__name__}: {str(e)}\n{traceback.format_exc()}"
        return CodeExecutionResponse(
            output="",
            error=error_msg,
            success=False
        )

async def execute_javascript(code: str) -> CodeExecutionResponse:
    """Execute JavaScript/TypeScript code using Node.js"""
    try:
        # Wrap code with necessary imports and setup
        wrapped_code = f"""
const {{ ethers }} = require('ethers');
const {{ createClient, Annotation, Tagged }} = require('golem-base-sdk');

// Mock environment for playground (read-only test key)
// Without 0x prefix for golem-base-sdk (32 bytes requirement)
const mockPrivateKey = '1e951be867cba332c76e83ca9f0e55fffcd858f574973a5feac3148b308ff8ae';
// With 0x prefix for ethers.js
const mockPrivateKeyWithPrefix = '0x' + mockPrivateKey;

async function main() {{
{chr(10).join('  ' + line for line in code.split(chr(10)))}
}}

main().then(() => {{
  console.log('');
  console.log('✅ Execution completed');
}}).catch(error => {{
  console.error('❌ Error:', error.message);
  process.exit(1);
}});
"""

        # Create temporary directory for execution
        temp_dir = tempfile.mkdtemp()

        try:
            # Create symlink to node_modules for package access
            node_modules_src = '/app/js_workspace/node_modules'
            node_modules_dst = os.path.join(temp_dir, 'node_modules')
            os.symlink(node_modules_src, node_modules_dst)

            # Create package.json for CommonJS (require works better than import)
            package_json = os.path.join(temp_dir, 'package.json')
            with open(package_json, 'w') as f:
                f.write('{"type": "commonjs"}')

            # Create JavaScript file
            temp_file = os.path.join(temp_dir, 'script.js')
            with open(temp_file, 'w') as f:
                f.write(wrapped_code)

            # Execute with Node.js with 30 second timeout
            result = subprocess.run(
                ['node', temp_file],
                capture_output=True,
                text=True,
                timeout=30,
                cwd=temp_dir
            )

            return CodeExecutionResponse(
                output=result.stdout,
                error=result.stderr,
                success=result.returncode == 0
            )

        finally:
            # Clean up temp directory
            import shutil
            if os.path.exists(temp_dir):
                shutil.rmtree(temp_dir)

    except subprocess.TimeoutExpired:
        return CodeExecutionResponse(
            output="",
            error="Execution timed out after 30 seconds",
            success=False
        )
    except Exception as e:
        error_msg = f"{type(e).__name__}: {str(e)}\n{traceback.format_exc()}"
        return CodeExecutionResponse(
            output="",
            error=error_msg,
            success=False
        )

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
