'use client'

import { useRef, useEffect, useState } from 'react'

interface ScrollPlayVideoProps {
  src: string
  className?: string
  muted?: boolean
  playsInline?: boolean
  poster?: string
  pingPong?: boolean
}

export default function ScrollPlayVideo({
  src,
  className = '',
  muted = true,
  playsInline = true,
  poster,
  pingPong = false,
}: ScrollPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const reversingRef = useRef(false)
  const inViewRef = useRef(false)
  const lastTimeRef = useRef<number>(0)
  const [isInView, setIsInView] = useState(false)
  const [canAutoplay, setCanAutoplay] = useState(true)
  const [showPlayButton, setShowPlayButton] = useState(false)

  // Cleanup animation frame helper
  const clearReverseAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }

  // Reverse playback using requestAnimationFrame with timestamp
  const playReverse = (timestamp: number) => {
    const video = videoRef.current
    if (!video || !inViewRef.current) {
      clearReverseAnimation()
      reversingRef.current = false
      return
    }

    // Initialize lastTime on first call
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = timestamp
    }

    // Calculate delta time
    const deltaTime = (timestamp - lastTimeRef.current) / 1000 // Convert to seconds
    lastTimeRef.current = timestamp

    if (video.currentTime <= 0.05) {
      // Reached start, play forward again
      clearReverseAnimation()
      reversingRef.current = false
      lastTimeRef.current = 0
      video.currentTime = 0

      // Force play without waiting for promise
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Play after reverse failed:', error)
          setShowPlayButton(true)
        })
      }
    } else {
      // Continue reversing - use actual delta time for smooth playback
      video.currentTime = Math.max(0, video.currentTime - deltaTime)
      animationFrameRef.current = requestAnimationFrame(playReverse)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        setIsInView(entry.isIntersecting)

        if (entry.isIntersecting) {
          // When scrolled into view, reset and play
          clearReverseAnimation()
          reversingRef.current = false

          if (video.paused) {
            video.currentTime = 0
            const playPromise = video.play()
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.log('Autoplay prevented:', error)
                setCanAutoplay(false)
                setShowPlayButton(true)
              })
            }
          }
        } else if (!entry.isIntersecting) {
          // When scrolled out of view, pause and reset
          clearReverseAnimation()
          reversingRef.current = false
          video.pause()
          video.currentTime = 0
          setShowPlayButton(false)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(video)

    // Handle video end - ping-pong loop or pause
    const handleEnded = () => {
      if (pingPong && inViewRef.current && !reversingRef.current) {
        // Start reverse playback immediately
        reversingRef.current = true
        lastTimeRef.current = 0

        // Make sure video is paused
        if (!video.paused) {
          video.pause()
        }

        // Start reverse on next frame
        setTimeout(() => {
          animationFrameRef.current = requestAnimationFrame(playReverse)
        }, 0)
      } else if (!pingPong) {
        video.pause()
        setShowPlayButton(false)
      }
    }

    // Handle play event
    const handlePlay = () => {
      setShowPlayButton(false)
      // Make sure we're not in reverse mode when playing forward
      if (reversingRef.current) {
        clearReverseAnimation()
        reversingRef.current = false
        lastTimeRef.current = 0
      }
    }

    video.addEventListener('ended', handleEnded)
    video.addEventListener('play', handlePlay)

    return () => {
      clearReverseAnimation()
      observer.unobserve(video)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('play', handlePlay)
    }
  }, [canAutoplay, pingPong])

  const handleManualPlay = () => {
    const video = videoRef.current
    if (!video) return

    clearReverseAnimation()
    reversingRef.current = false
    video.currentTime = 0

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setCanAutoplay(true)
        setShowPlayButton(false)
      }).catch((error) => {
        console.error('Manual play failed:', error)
      })
    }
  }

  return (
    <div className="relative w-full h-full bg-white">
      <video
        ref={videoRef}
        src={isInView ? src : undefined}
        className={className}
        muted={muted}
        playsInline={playsInline}
        loop={false}
        poster={poster}
        preload="metadata"
        style={{ backgroundColor: '#ffffff' }}
        // Mobile-specific attributes
        webkit-playsinline="true"
        x5-playsinline="true"
      />

      {/* Fallback play button for mobile if autoplay fails */}
      {showPlayButton && isInView && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handleManualPlay}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-black ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
