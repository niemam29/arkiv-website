import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import ConditionalHeader from '@/components/layout/ConditionalHeader'
import ConditionalVideo from '@/components/layout/ConditionalVideo'
import Footer from '@/components/layout/Footer'
import { getMenuItems } from '@/lib/strapi'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arkiv - Universal Data Layer for Ethereum | Blockchain Database',
  description: 'Arkiv introduces data as a first-class citizen on blockchain. A universal, cost-efficient data layer for Ethereum with queryable, time-scoped, and verifiable database chains.',
  keywords: ['arkiv', 'blockchain', 'ethereum', 'database', 'data layer', 'web3', 'decentralized database', 'blockchain data', 'ethereum data', 'db-chains', 'golem', 'cryptocurrency', 'DeFi'],
  authors: [{ name: 'Golem Network' }],
  creator: 'Golem Network',
  publisher: 'Golem Network',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://arkiv.network'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arkiv.network',
    siteName: 'Arkiv',
    title: 'Arkiv - Universal Data Layer for Ethereum',
    description: 'Introducing data as a first-class citizen on blockchain. Build queryable, time-scoped, and verifiable applications with Arkiv.',
    images: [
      {
        url: '/images/main-page-screenshot-20250921-at-1419261.png',
        width: 1200,
        height: 630,
        alt: 'Arkiv - Universal Data Layer for Ethereum',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@golemproject',
    creator: '@golemproject',
    title: 'Arkiv - Universal Data Layer for Ethereum',
    description: 'Introducing data as a first-class citizen on blockchain. Build with queryable, time-scoped, and verifiable database chains.',
    images: ['/images/main-page-screenshot-20250921-at-1419261.png'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch navigation from Strapi CMS
  const navigation = await getMenuItems()

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Start cookieyes banner */}
        <script id="cookieyes" type="text/javascript" src="https://cdn-cookieyes.com/client_data/1f514a9f971e377d7471b973/script.js"></script>
        {/* End cookieyes banner */}
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KW755WH8');`
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google Tag Manager (noscript) */}
        <noscript dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KW755WH8"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }} />
        {/* End Google Tag Manager (noscript) */}

        {/* Umami Analytics */}
        <Script
          async
          defer
          data-website-id="c1696d86-bccc-4ccb-9087-aef7367d250b"
          src="https://umami.golemdb.io/script.js"
        />

        <div className="bg-white flex flex-col relative">
          {/* Background Video - conditional based on route */}
          <ConditionalVideo />

          <ConditionalHeader navigation={navigation} />

          <main className="relative z-10">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}