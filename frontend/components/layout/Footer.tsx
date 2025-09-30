import Link from 'next/link'
import { Heading, Text } from '@/components/ui/Typography'

interface FooterLink {
  name: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  name: string
  href: string
  icon: React.ReactNode
}

interface FooterProps {
  logo?: string
  description?: string
  sections: FooterSection[]
  socialLinks?: SocialLink[]
  bottomText?: string
}

export default function Footer({
  logo,
  description,
  sections,
  socialLinks,
  bottomText
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="flex items-start">
          {/* Brand Section - 450px */}
          <div className="w-[450px] flex-shrink-0 flex items-start">
            {/* Logo Section */}
            <div className="flex-shrink-0 pt-1">
              <Link href="/" className="inline-block mb-6">
                {logo ? (
                  <img src={logo} alt="ARKIV" className="h-8 w-auto" />
                ) : (
                  <Heading level={3} size="xl" className="text-white">
                    ARKIV
                  </Heading>
                )}
              </Link>
            </div>

            {/* Spacer - 24px */}
            <div className="w-6 flex-shrink-0"></div>

            {/* Content Section */}
            <div className="flex-1 pt-1">
              {/* Description */}
              {description && (
                <Text color="secondary" className="mb-8 text-neutral-300 leading-relaxed">
                  {description}
                </Text>
              )}

              {/* Social Links */}
              {socialLinks && socialLinks.length > 0 && (
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-primary transition-all duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Separator - 20px */}
          <div className="w-5 flex-shrink-0"></div>

          {/* Footer Sections - 760px divided into 4 equal parts */}
          <div className="w-[760px] flex gap-6">
            {sections.map((section) => (
              <div key={section.title} className="flex-1">
                <Heading level={4} size="md" className="text-white mb-6 pt-1">
                  {section.title}
                </Heading>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <Text size="sm" className="text-neutral-400 mb-4 md:mb-0">
              {bottomText || `© ${currentYear} ARKIV. All rights reserved.`}
            </Text>

            {/* Bottom Links */}
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}