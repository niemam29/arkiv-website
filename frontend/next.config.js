/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'arkiv.network', 'cms.arkiv.network'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  experimental: {
    optimizeCss: false,
  },
  env: {
    EXECUTION_SERVICE_URL: process.env.EXECUTION_SERVICE_URL || 'http://execution-service:8001',
  },
  // CSP headers moved to middleware.ts for standalone mode support
  async redirects() {
    return [
      {
        source: '/pdf/ARKIV_Litepaper.pdf',
        destination: '/pdf/ARKIV_Litepaper_blue.pdf',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig