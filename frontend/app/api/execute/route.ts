import { NextRequest, NextResponse } from 'next/server';

const EXECUTION_SERVICE_URL = process.env.EXECUTION_SERVICE_URL || 'http://execution-service:8001';

export async function POST(request: NextRequest) {
  try {
    const { code, language, walletAddress } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    // Forward execution request to execution-service
    const response = await fetch(`${EXECUTION_SERVICE_URL}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        language: language === 'typescript' || language === 'javascript' ? 'python' : language,
      }),
    });

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

    return NextResponse.json({
      output: result.success ? result.output : `❌ ${result.error}\n\nOutput:\n${result.output}`
    });

  } catch (error) {
    console.error('Execution service error:', error);
    return NextResponse.json({
      output: `❌ Failed to connect to execution service:\n${error instanceof Error ? error.message : 'Unknown error'}`
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
