const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export interface NavigationItem {
  name: string
  href: string
  children?: NavigationItem[]
}

export async function getMenuItems(): Promise<NavigationItem[]> {
  // During build time, always use default menu
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return getDefaultMenu()
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api/menu-items?populate=*&sort=order:asc`, {
      next: { revalidate: 60 },
      cache: 'no-store'
    })

    if (!res.ok) {
      console.error('Failed to fetch menu from Strapi:', res.statusText)
      return getDefaultMenu()
    }

    const data = await res.json()

    // Transform Strapi data to NavigationItem format
    return data.data.map((item: any) => ({
      name: item.attributes.label,
      href: item.attributes.url,
    }))
  } catch (error) {
    console.error('Error fetching menu from Strapi:', error)
    return getDefaultMenu()
  }
}

function getDefaultMenu(): NavigationItem[] {
  return [
    { name: 'Why Arkiv', href: '/#why-arkiv' },
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'Use Cases', href: '/#use-cases' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/#about' },
  ]
}
