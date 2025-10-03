'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

interface ConditionalHeaderProps {
  navigation: Array<{ name: string; href: string }>
}

export default function ConditionalHeader({ navigation }: ConditionalHeaderProps) {
  const pathname = usePathname()

  // Don't render Header on playground page
  if (pathname === '/playground') {
    return null
  }

  return <Header navigation={navigation} />
}
