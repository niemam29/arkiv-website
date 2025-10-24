'use client'

import { usePathname } from 'next/navigation'

export default function ConditionalVideo() {
  const pathname = usePathname()

  // Only render video on homepage
  if (pathname !== '/') {
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