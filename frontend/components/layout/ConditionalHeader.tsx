'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from './Header'
import type { NavigationItem } from '@/lib/strapi'

interface ConditionalHeaderProps {
  navigation?: NavigationItem[]
}

export default function ConditionalHeader({ navigation: initialNavigation }: ConditionalHeaderProps) {
  const pathname = usePathname()
  const [navigation, setNavigation] = useState<Array<{ name: string; href: string }>>(
    initialNavigation || [
      { name: 'Why Arkiv', href: '/#why-arkiv' },
      { name: 'How it Works', href: '/#how-it-works' },
      { name: 'Use Cases', href: '/#use-cases' },
      { name: 'FAQ', href: '/#faq' },
      { name: 'Blog', href: '/blog' },
      { name: 'About', href: '/#about' },
    ]
  )

  useEffect(() => {
    async function fetchNavigation() {
      try {
        const response = await fetch('https://cms.arkiv.network/api/menu-items?sort=order:asc&populate=*')
        const data = await response.json()

        if (data.data && data.data.length > 0) {
          const items = data.data.map((item: any) => ({
            name: item.label,
            href: item.url,
            children: item.children?.map((child: any) => ({
              name: child.label,
              href: child.url
            }))
          }))

          // Check if Blog already exists in CMS
          const hasBlog = items.some((item: any) => item.name === 'Blog' || item.href === '/blog')

          // If Blog is not in CMS, add it before "About"
          if (!hasBlog) {
            const aboutIndex = items.findIndex((item: any) => item.name === 'About')
            if (aboutIndex > -1) {
              items.splice(aboutIndex, 0, { name: 'Blog', href: '/blog' })
            } else {
              items.push({ name: 'Blog', href: '/blog' })
            }
          }

          setNavigation(items)
        }
      } catch (error) {
        console.error('Error fetching navigation:', error)
      }
    }

    fetchNavigation()
  }, [])

  // Don't render Header on playground page
  if (pathname === '/playground') {
    return null
  }

  return <Header navigation={navigation} />
}