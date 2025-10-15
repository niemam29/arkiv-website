import { NextRequest, NextResponse } from 'next/server';

const EXECUTION_SERVICE_URL = process.env.EXECUTION_SERVICE_URL || 'http://execution-service:8001';

export async function POST(request: NextRequest) {
  console.log('[EXECUTE API] Request received');
  console.log('[EXECUTE API] EXECUTION_SERVICE_URL:', EXECUTION_SERVICE_URL);

  try {
    const { code, language, walletAddress } = await request.json();
    console.log('[EXECUTE API] Parsed body:', { code: code?.substring(0, 50), language, walletAddress });

    if (!code) {
      console.log('[EXECUTE API] No code provided');
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    // Forward execution request to execution-service
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(`https://arkiv.network/api/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        language: language || 'python',
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log('[EXECUTE API] Execution service response status:', response.status);

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      let errorMessage = 'Unknown error';

      if (contentType && contentType.includes('application/json')) {
        try {
          const error = await response.json();
          errorMessage = error.error || error.message || 'Unknown error';
        } catch (e) {
          errorMessage = await response.text();
        }
      } else {
        errorMessage = await response.text();
      }

      return NextResponse.json({
        output: `❌ Execution error:\n${errorMessage}\n\n💡 Tip: Make sure your code is complete and doesn't have syntax errors.`
      });
    }

    const result = await response.json();
    console.log('[EXECUTE API] Execution result:', { success: result.success, outputLength: result.output?.length });

    return NextResponse.json({
      output: result.success ? result.output : `❌ ${result.error}\n\nOutput:\n${result.output}`
    });

  } catch (error) {
    console.error('Execution service error:', error);

    // Handle abort/timeout errors specifically
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({
        output: '❌ Code execution timed out after 30 seconds.\n\n💡 Tip: Try simplifying your code or check for infinite loops.'
      }, { status: 504 });
    }

    return NextResponse.json({
      output: `❌ Failed to connect to execution service:\n${error instanceof Error ? error.message : 'Unknown error'}\n\n💡 Tip: The code execution service might be temporarily unavailable.`
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
