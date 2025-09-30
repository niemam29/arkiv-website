'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

interface ConditionalHeaderProps {
  navigation: Array<{ name: string; href: string }>
}

export default function ConditionalHeader({ navigation }: ConditionalHeaderProps) {
  const pathname = usePathname()

  // Don't render Header on playground or getting-started pages
  if (pathname === '/playground' || pathname === '/getting-started') {
    return null
  }

  return <Header navigation={navigation} />
}