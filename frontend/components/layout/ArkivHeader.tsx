'use client'

import Link from 'next/link'
import { useTheme } from '@/components/providers/ThemeProvider'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function ArkivHeader() {
  const { theme, isDark, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Getting Started', href: '/getting-started' },
    { name: 'Playground', href: '/playground' },
    { name: 'Documentation', href: '/docs' },
    { name: 'GitHub', href: 'https://github.com/arkiv-network' },
  ]

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: theme.colors.background.primary,
        borderColor: theme.colors.border.primary,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div
              className="font-brutal text-2xl font-black uppercase tracking-wider"
              style={{ color: theme.colors.text.primary }}
            >
              [ ARKIV ]
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-mono text-sm transition-colors hover:opacity-80"
                style={{ color: theme.colors.text.secondary }}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {item.name}
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: theme.colors.background.secondary,
                color: theme.colors.text.primary
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors mr-2"
              style={{
                backgroundColor: theme.colors.background.secondary,
                color: theme.colors.text.primary
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: theme.colors.background.secondary,
                color: theme.colors.text.primary
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className="md:hidden py-4 border-t"
            style={{ borderColor: theme.colors.border.primary }}
          >
            <nav className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block font-mono text-sm transition-colors hover:opacity-80"
                  style={{ color: theme.colors.text.secondary }}
                  onClick={() => setMobileMenuOpen(false)}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}