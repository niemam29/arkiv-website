'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ConditionalVideo() {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Only render video on homepage and not on mobile
  if (pathname !== '/' || isMobile) {
    return null
  }

  // Use main.mp4 on production, hero.mp4 on staging
  const isStaging = process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging'
  const videoSrc = isStaging ? '/movies/hero.mp4' : '/movies/main.mp4'

  return (
    <div className="fixed inset-0 z-0">
      <video
        src={videoSrc}
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