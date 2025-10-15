import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Set Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn-cookieyes.com https://umami.golemdb.io https://fonts.googleapis.com https://www.googletagmanager.com https://www.google-analytics.com; " +
    "worker-src 'self' 'unsafe-eval' blob:; " +
    "child-src 'self' blob:; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://cms.arkiv.network https://umami.golemdb.io https://cdn-cookieyes.com https://log.cookieyes.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com; " +
    "frame-src 'self' https://www.googletagmanager.com;"
  )

  return response
}

export const config = {
  matcher: '/:path*',
}
