/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'arkiv.network', 'cms.arkiv.network'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  experimental: {
    optimizeCss: false
  },
  env: {
    EXECUTION_SERVICE_URL: process.env.EXECUTION_SERVICE_URL || 'http://execution-service:8001'
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn-cookieyes.com https://umami.golemdb.io https://fonts.googleapis.com; worker-src 'self' 'unsafe-eval' blob:; child-src 'self' blob:; object-src 'none'; base-uri 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://cms.arkiv.network https://umami.golemdb.io https://cdn-cookieyes.com https://log.cookieyes.com; frame-src 'self';"
          }
        ]
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/pdf/ARKIV_Litepaper.pdf',
        destination: '/pdf/ARKIV_Litepaper_blue.pdf',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
