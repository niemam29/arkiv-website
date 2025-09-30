'use client'

import { useRef } from 'react'

interface HoverVideoProps {
  src: string
  className?: string
  muted?: boolean
  playsInline?: boolean
}

export default function HoverVideo({ src, className = '', muted = true, playsInline = true }: HoverVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      muted={muted}
      playsInline={playsInline}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}