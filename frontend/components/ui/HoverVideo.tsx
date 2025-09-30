'use client'

import { useRef } from 'react'

interface HoverVideoProps {
  src: string
  className?: string
  muted?: boolean
  playsInline?: boolean
  autoPlay?: boolean
  loop?: boolean
  poster?: string
}

export default function HoverVideo({
  src,
  className = '',
  muted = true,
  playsInline = true,
  autoPlay = false,
  loop = false,
  poster,
}: HoverVideoProps) {
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
      autoPlay={autoPlay}
      loop={loop}
      poster={poster}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}
