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
                <div className="font-brutal text-3xl font-black uppercase text-black tracking-wider">[ ARKIV ]</div>
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
                      {item.children && <img src="/images/dropdown-arrow.svg" alt="" className="w-5 h-5" />}
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
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile/Tablet Navigation */}
            {mobileMenuOpen && (
              <>
                <div className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

                <div className="lg:hidden fixed top-6 left-4 right-4 z-50 max-w-[1280px] mx-auto">
                  <div className="hidden md:block bg-[#FF6B35] text-white rounded-2xl shadow-figma-card">
                    <div className="w-full p-6 flex flex-col">
                      <div className="flex justify-between items-start mb-8">
                        <div className="font-brutal text-2xl font-black uppercase tracking-wider">[ ARKIV ]</div>
                        <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white hover:text-gray-200 transition-colors">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <nav className="flex-1 space-y-3">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block font-mono text-lg text-white hover:text-gray-200 transition-colors py-1"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </nav>

                      <div className="mt-8">
                        <div className="font-mono text-xs text-white/60 uppercase">Trustless by default</div>
                        <div className="font-mono text-xs text-white/60 uppercase">Ethereum-aligned</div>
                      </div>
                    </div>
                  </div>

                  <div className="md:hidden bg-[#FF6B35] text-white rounded-2xl shadow-figma-card p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="font-brutal text-xl font-black uppercase tracking-wider">[ ARKIV ]</div>
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 text-white hover:text-gray-200 transition-colors"
                        aria-label="Close menu"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <nav className="flex-1 space-y-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block font-mono text-lg text-white hover:text-gray-200 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>

                    <div className="pt-4">
                      <div className="font-mono text-xs text-white/60 uppercase">Trustless by default</div>
                      <div className="font-mono text-xs text-white/60 uppercase">Ethereum-aligned</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
