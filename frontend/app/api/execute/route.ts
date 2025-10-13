import { NextRequest, NextResponse } from 'next/server';
import { spawn, execSync } from 'child_process';
import { promises as fs } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { tmpdir } from 'os';

// Find executables in PATH (cross-platform)
function findExecutable(name: string): string {
  try {
    const path = execSync(`which ${name}`, { encoding: 'utf-8' }).trim();
    return path;
  } catch {
    // Fallback for Windows
    try {
      const result = execSync(`where ${name}`, { encoding: 'utf-8' }).split('\n')[0];
      if (!result) throw new Error('Command not found');
      return result.trim();
    } catch {
      // If not found, return the name and let spawn handle PATH resolution
      return name;
    }
  }
}

const BUN_PATH = findExecutable('bun');
const PYTHON_PATH = findExecutable('python3') || findExecutable('python') || 'python3';

// Sanitize code to prevent malicious operations
function sanitizeCode(code: string, language: string): string {
  // Remove potentially dangerous imports/operations
  const dangerousPatterns = [
    /require\s*\(\s*['"`]child_process['"`]\s*\)/gi,
    /require\s*\(\s*['"`]fs['"`]\s*\)/gi,
    /require\s*\(\s*['"`]net['"`]\s*\)/gi,
    /require\s*\(\s*['"`]http['"`]\s*\)/gi,
    /require\s*\(\s*['"`]https['"`]\s*\)/gi,
    /require\s*\(\s*['"`]os['"`]\s*\)/gi,
    /require\s*\(\s*['"`]path['"`]\s*\)/gi,
    /import\s+.*\s+from\s+['"`]child_process['"`]/gi,
    /import\s+.*\s+from\s+['"`]fs['"`]/gi,
    /import\s+.*\s+from\s+['"`]net['"`]/gi,
    /import\s+.*\s+from\s+['"`]http['"`]/gi,
    /import\s+.*\s+from\s+['"`]https['"`]/gi,
    /import\s+.*\s+from\s+['"`]os['"`]/gi,
    /import\s+.*\s+from\s+['"`]path['"`]/gi,
    /eval\s*\(/gi,
    /Function\s*\(/gi,
    /process\.exit/gi,
    /process\.env/gi,
    /process\.cwd/gi,
    /process\.kill/gi,
    /global\./gi,
    /Bun\.spawn/gi,
    /Bun\.shell/gi,
    // /fetch\s*\(/gi,  // Allow fetch for Arkiv connections
    /XMLHttpRequest/gi,
    // /WebSocket/gi,  // Allow WebSocket for Arkiv connections
    /localStorage/gi,
    /sessionStorage/gi,
    /document\./gi,
    /window\./gi,
  ];

  let sanitized = code;
  for (const pattern of dangerousPatterns) {
    if (pattern.test(sanitized)) {
      throw new Error('Code contains potentially dangerous operations');
    }
  }

  // Limit code size (max 10KB)
  if (code.length > 10000) {
    throw new Error('Code is too large (max 10KB)');
  }

  return sanitized;
}

// Execute TypeScript code
async function executeTypeScript(code: string, walletAddress?: string): Promise<string> {
  const tempDir = join(tmpdir(), 'arkiv-playground');
  await fs.mkdir(tempDir, { recursive: true });

  // Create a package.json for dependencies
  const packageJson = {
    name: "playground-temp",
    version: "1.0.0",
    dependencies: {
      "golem-base-sdk": "^0.1.16",
      "ethers": "^6.15.0"
    }
  };

  await fs.writeFile(
    join(tempDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // Install dependencies
  execSync('bun install', { cwd: tempDir, stdio: 'ignore' });

  const filename = `temp-${randomUUID()}.js`;
  const filepath = join(tempDir, filename);

  try {
    // Wrap code with necessary imports
    const wrappedCode = `
const { createClient, Annotation, Tagged } = require('golem-base-sdk');
const { ethers } = require('ethers');

// Use MetaMask wallet if connected, otherwise use mock key
const isMetaMaskConnected = ${walletAddress ? 'true' : 'false'};
const userWalletAddress = '${walletAddress || ''}';

// Mock environment for playground (read-only test key)
const mockPrivateKey = '1e951be867cba332c76e83ca9f0e55fffcd858f574973a5feac3148b308ff8ae';

// Note: When MetaMask is connected, some operations requiring private key won't work in sandbox
if (isMetaMaskConnected) {
  console.log('🦊 Using MetaMask wallet:', userWalletAddress);
  console.log('⚠️  Note: Private key operations are handled by MetaMask in browser');
  console.log('');
}

async function main() {
  ${code}
}

main().then(() => {
  console.log('');
  console.log('✅ Execution completed');
}).catch(error => {
  console.error('❌ Error:', error.message);
});
`;

    await fs.writeFile(filepath, wrappedCode);

    return new Promise((resolve, reject) => {
      const child = spawn(BUN_PATH, ['run', filepath], {
        cwd: tempDir,  // Run in isolated temp directory
        timeout: 30000, // 30 second timeout for blockchain operations
        env: {  // Minimal environment
          NODE_ENV: 'production',
          HOME: tempDir,
          PATH: process.env.PATH,  // Use system PATH
        },
      });

      let output = '';
      let errorOutput = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      child.on('close', async (code) => {
        // Clean up temp file
        await fs.unlink(filepath).catch(() => {});

        if (code !== 0) {
          reject(new Error(errorOutput || 'Execution failed'));
        } else {
          resolve(output);
        }
      });

      child.on('error', (err) => {
        reject(err);
      });
    });
  } catch (error) {
    // Clean up on error
    await fs.unlink(filepath).catch(() => {});
    throw error;
  }
}

// Execute Python code
async function executePython(code: string, walletAddress?: string): Promise<string> {
  try {
    // Wrap code with necessary imports
    const wrappedCode = `
import asyncio
import json
import time
from golem_base_sdk import GolemBaseClient, Annotation
from web3 import AsyncWeb3
import os

# Check if MetaMask wallet is connected
is_metamask_connected = ${walletAddress ? 'True' : 'False'}
user_wallet_address = '${walletAddress || ''}'

# Mock environment for playground
mock_private_key = '1e951be867cba332c76e83ca9f0e55fffcd858f574973a5feac3148b308ff8ae'

if is_metamask_connected:
    print('🦊 Using MetaMask wallet:', user_wallet_address)
    print('⚠️  Note: Private key operations are handled by MetaMask in browser')
    print()

# Helper function to create client (matching TypeScript API)
async def create_client(chain_id, private_key_hex, rpc_url, ws_url=None):
    # Create client with chain ID and RPC URL
    client = GolemBaseClient(chain_id, rpc_url)
    # For playground, we'll use mock operations
    return client

# Simplified Tagged class for compatibility
class Tagged:
    def __init__(self, tag, value):
        self.tag = tag
        self.value = value

async def main():
${code.split('\n').map(line => '    ' + line).join('\n')}

try:
    asyncio.run(main())
    print('\\n✅ Execution completed')
except Exception as e:
    print(f'\\n❌ Error: {e}')
`;

    return new Promise((resolve, reject) => {
      // Execute Python with proper PYTHONPATH to find golem-base-sdk
      const child = spawn(PYTHON_PATH, ['-c', wrappedCode], {
        timeout: 30000, // 30 second timeout for blockchain operations
        env: {  // Environment with Python path for golem-base-sdk
          ...process.env,
          PYTHONPATH: '/root/.local/lib/python3.12/site-packages',
          PATH: process.env.PATH,
        },
      });

      let output = '';
      let errorOutput = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      child.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(errorOutput || 'Execution failed'));
        } else {
          resolve(output);
        }
      });

      child.on('error', (err) => {
        reject(err);
      });
    });
  } catch (error) {
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code, language, walletAddress } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    // Sanitize code for safety
    try {
      sanitizeCode(code, language);
    } catch (error) {
      return NextResponse.json({
        error: `Security check failed: ${error instanceof Error ? error.message : 'Invalid code'}`
      }, { status: 400 });
    }

    // Execute real code based on language
    try {
      let output = '';

      if (language === 'typescript' || language === 'javascript') {
        output = await executeTypeScript(code, walletAddress);
      } else if (language === 'python') {
        output = await executePython(code, walletAddress);
      } else {
        // Fallback to simulation for unsupported languages
        output = '⚠️ Language not supported for real execution. Showing simulated output:\n\n';

        if (code.includes('createClient')) {
          output += '🔌 Connected to Arkiv on ETHWarsaw testnet\n';
          output += '📍 Owner address: 0x4393CE3C46f74CC5c30809b122acd69EE74aC532';
        } else {
          output += '✅ Code executed successfully';
        }
      }

      return NextResponse.json({ output });

    } catch (execError) {
      // If execution fails, return the error
      return NextResponse.json({
        output: `❌ Execution error:\n${execError instanceof Error ? execError.message : 'Unknown error'}\n\n💡 Tip: Make sure your code is complete and doesn't have syntax errors.`
      });
    }

  } catch (error) {
    console.error('Execution error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Execution failed'
    }, { status: 500 });
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to execute code.' },
    { status: 405 }
  );
}