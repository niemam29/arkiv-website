import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import ConditionalHeader from '@/components/layout/ConditionalHeader'
import ConditionalVideo from '@/components/layout/ConditionalVideo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arkiv - Universal Data Layer for Ethereum | Blockchain Database',
  description:
    'Arkiv introduces data as a first-class citizen on blockchain. A universal, cost-efficient data layer for Ethereum with queryable, time-scoped, and verifiable database chains.',
  keywords: [
    'arkiv',
    'blockchain',
    'ethereum',
    'database',
    'data layer',
    'web3',
    'decentralized database',
    'blockchain data',
    'ethereum data',
    'db-chains',
    'golem',
    'cryptocurrency',
    'DeFi'
  ],
  authors: [{ name: 'Golem Network' }],
  creator: 'Golem Network',
  publisher: 'Golem Network',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL('https://moon.dev.golem.network:8765'),
  alternates: {
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://moon.dev.golem.network:8765',
    siteName: 'Arkiv',
    title: 'Arkiv - Universal Data Layer for Ethereum',
    description:
      'Introducing data as a first-class citizen on blockchain. Build queryable, time-scoped, and verifiable applications with Arkiv.',
    images: [
      {
        url: '/images/main-page-screenshot-20250921-at-1419261.png',
        width: 1200,
        height: 630,
        alt: 'Arkiv - Universal Data Layer for Ethereum'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@golemproject',
    creator: '@golemproject',
    title: 'Arkiv - Universal Data Layer for Ethereum',
    description:
      'Introducing data as a first-class citizen on blockchain. Build with queryable, time-scoped, and verifiable database chains.',
    images: ['/images/main-page-screenshot-20250921-at-1419261.png']
  },
  verification: {
    google: 'your-google-verification-code'
  },
  category: 'technology'
}

// Navigation data according to Menu.pdf
const navigation = [
  { name: 'Why Arkiv', href: '/#why-arkiv' },
  { name: 'How it Works', href: '/#how-it-works' },
  { name: 'Use Cases', href: '/#use-cases' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'About', href: '/#about' }
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className} suppressHydrationWarning={true}>
        {/* CookieYes banner script */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/1f514a9f971e377d7471b973/script.js"
          strategy="beforeInteractive"
        />

        {/* Umami Analytics */}
        <Script async defer data-website-id="c1696d86-bccc-4ccb-9087-aef7367d250b" src="https://umami.golemdb.io/script.js" />

        <div className="min-h-screen bg-white flex flex-col relative">
          {/* Background Video - conditional based on route */}
          <ConditionalVideo />

          <ConditionalHeader navigation={navigation} />

          <main className="flex-1 relative z-10">{children}</main>
        </div>
      </body>
    </html>
  )
}
