'use client'

import { useRef, useEffect, useState } from 'react'

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
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        // Auto-play on mobile when in view
        if (entry.isIntersecting && autoPlay && videoRef.current) {
          videoRef.current.play().catch(() => {
            // Ignore autoplay errors (e.g., browser policy restrictions)
          })
        }
      },
      { threshold: 0.1 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [autoPlay])

  const handleMouseEnter = () => {
    if (videoRef.current && isInView) {
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
      src={isInView ? src : undefined}
      className={className}
      muted={muted}
      playsInline={playsInline}
      autoPlay={autoPlay}
      loop={loop}
      poster={poster}
      preload="none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}
