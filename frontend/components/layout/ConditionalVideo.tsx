'use client'

import { usePathname } from 'next/navigation'

export default function ConditionalVideo() {
  const pathname = usePathname()

  // Don't render video on playground or getting-started pages
  if (pathname === '/playground' || pathname === '/getting-started') {
    return null
  }

  return (
    <div className="fixed inset-0 z-0">
      <video
        src="/movies/hero.mp4"
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
    </div>
  )
}