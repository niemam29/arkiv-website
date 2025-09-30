'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationItem {
  name: string
  href: string
  children?: NavigationItem[]
}

interface HeaderProps {
  navigation: NavigationItem[]
}

export default function Header({ navigation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="px-4 md:px-[60px] mt-6 sticky top-6 z-[100]">
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-figma-card">
          <nav className="px-6 py-4">
            <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="font-brutal text-3xl font-black uppercase text-black tracking-wider">
              [ ARKIV ]
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 ml-auto">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-2 font-mono text-sm text-black hover:text-gray-600 transition-colors"
                >
                  <span>{item.name}</span>
                  {item.children && (
                    <img src="/images/dropdown-arrow.svg" alt="" className="w-5 h-5" />
                  )}
                </Link>

                {/* Dropdown menu for children */}
                {item.children && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-figma-card border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm font-mono text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
                          target={child.href.startsWith('http') ? '_blank' : undefined}
                          rel={child.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-black hover:text-gray-600 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            {/* Tablet Menu (iPad/medium screens) - Figma design with orange background */}
            <div className="hidden md:block lg:hidden fixed inset-0 z-50 bg-white">
              <div className="flex h-full">
                {/* Left side - Orange menu */}
                <div className="w-[368px] h-full bg-[#FF6B35] p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div className="font-brutal text-2xl font-black uppercase text-white tracking-wider">
                      [ ARKIV ]
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 text-white hover:text-gray-200 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <nav className="flex-1">
                    <div className="space-y-1">
                      <div className="font-mono text-sm text-white/80 uppercase mb-4">RESOURCES</div>

                      <Link href="/github" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                        GitHub
                      </Link>

                      <div className="font-mono text-sm text-white/80 py-1">Litepaper (Draft)</div>

                      <Link href="/apps" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                        Apps (soon)
                      </Link>

                      <div className="font-mono text-sm text-white/80 uppercase mt-6 mb-4">GOLEM</div>

                      <Link href="/blog" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                        Blog
                      </Link>

                      <Link href="/careers" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                        Careers
                      </Link>

                      <div className="font-mono text-sm text-white/80 uppercase mt-6 mb-4">SUPPORT</div>

                      <Link href="/chat" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                        Chat
                      </Link>

                      <Link href="/discord" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                        Discord
                      </Link>

                      <Link href="/email" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                        Email
                      </Link>

                      <div className="font-mono text-sm text-white/80 uppercase mt-6 mb-4">LEGAL</div>

                      <Link href="/privacy" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                        Privacy
                      </Link>

                      <Link href="/terms" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                        Terms
                      </Link>
                    </div>
                  </nav>

                  <div className="mt-auto">
                    <div className="font-mono text-xs text-white/60 uppercase mb-2">TRUSTLESS BY DEFAULT</div>
                    <div className="font-mono text-xs text-white/60 uppercase">ETHEREUM-ALIGNED</div>
                  </div>
                </div>

                {/* Right side - Logo */}
                <div className="flex-1 flex items-center justify-center bg-white">
                  <div className="font-brutal text-6xl font-black uppercase text-black tracking-wider">
                    [ A ]
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu (small screens) - Figma design with orange background */}
            <div className="md:hidden fixed inset-0 z-50 bg-[#FF6B35] p-6">
              <div className="flex justify-between items-start mb-8">
                <div className="font-brutal text-xl font-black uppercase text-white tracking-wider">
                  [ ARKIV ]
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1">
                <div className="space-y-3">
                  <div className="font-mono text-sm text-white/80 uppercase mb-4">RESOURCES</div>

                  <Link href="/github" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                    GitHub
                  </Link>

                  <div className="font-mono text-sm text-white/80 py-2">Litepaper (Draft)</div>

                  <Link href="/apps" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                    Apps (soon)
                  </Link>

                  <div className="font-mono text-sm text-white/80 uppercase mt-6 mb-4">GOLEM</div>

                  <Link href="/blog" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                    Blog
                  </Link>

                  <Link href="/careers" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                    Careers
                  </Link>

                  <div className="font-mono text-sm text-white/80 uppercase mt-6 mb-4">SUPPORT</div>

                  <Link href="/chat" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                    Chat
                  </Link>

                  <Link href="/discord" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                    Discord
                  </Link>

                  <Link href="/email" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                    Email
                  </Link>

                  <div className="font-mono text-sm text-white/80 uppercase mt-6 mb-4">LEGAL</div>

                  <Link href="/privacy" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                    Privacy
                  </Link>

                  <Link href="/terms" className="block font-mono text-base text-white hover:text-gray-200 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                    Terms
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
          </nav>
        </div>
      </div>
    </header>
  )
}