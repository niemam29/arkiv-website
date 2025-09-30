'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

interface CodeExample {
  id: string
  title: string
  code: string
}

interface AnimatedCodeBlockProps {
  examples: CodeExample[]
  className?: string
}

export default function AnimatedCodeBlock({ examples, className = '' }: AnimatedCodeBlockProps) {
  const [currentExample, setCurrentExample] = useState(0)
  const [displayedCode, setDisplayedCode] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasAnimated, setHasAnimated] = useState<boolean[]>(new Array(examples.length).fill(false))
  const [isInView, setIsInView] = useState(false)
  const codeRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer to detect when component is in viewport
  useEffect(() => {
    // Skip on server-side rendering
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setIsInView(true)
        }
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Animate typing effect
  useEffect(() => {
    if (!isInView || hasAnimated[currentExample] || isAnimating) return

    const currentExampleData = examples[currentExample]
    if (!currentExampleData) return

    const targetCode = currentExampleData.code
    setIsAnimating(true)
    setDisplayedCode('')

    let index = 0
    const typingSpeed = 3 // milliseconds per character

    const typeChar = () => {
      if (index < targetCode.length) {
        setDisplayedCode(targetCode.slice(0, index + 1))
        index++
        setTimeout(typeChar, typingSpeed)
      } else {
        setIsAnimating(false)
        setHasAnimated(prev => {
          const newState = [...prev]
          newState[currentExample] = true
          return newState
        })
      }
    }

    setTimeout(typeChar, 500) // Initial delay
  }, [currentExample, isInView, examples, hasAnimated, isAnimating])

  // Reset animation state when example changes if it hasn't been animated before
  const handleExampleChange = (index: number) => {
    if (index !== currentExample) {
      setCurrentExample(index)
      if (!hasAnimated[index]) {
        setDisplayedCode('')
      } else {
        const exampleData = examples[index]
        if (exampleData) {
          setDisplayedCode(exampleData.code)
        }
      }
    }
  }

  return (
    <div ref={containerRef} className={`flex flex-col gap-6 ${className}`}>
      {/* Example Switcher */}
      <div className="flex gap-3">
        {examples.map((example, index) => (
          <button
            key={example.id}
            onClick={() => handleExampleChange(index)}
            className={`px-5 py-2.5 rounded-lg font-mono text-sm transition-colors shadow-sm ${
              currentExample === index
                ? 'bg-[#1F1F1F] text-white hover:bg-gray-800 shadow-figma-button-primary'
                : 'bg-white text-black border border-black/10 hover:bg-gray-100'
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* Code Block */}
      <div className="bg-[#1F1F1F] rounded-2xl p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-sm text-white">TypeScript</span>
          <a href="/playground" className="px-4 py-2 bg-[#FE7446] text-white font-mono text-sm rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
            <img src="/images/play.svg" alt="Play icon" className="w-4 h-4" />
            <span>Explore Playground</span>
          </a>
        </div>

        <div
          ref={codeRef}
          className="font-mono text-sm text-white leading-relaxed whitespace-pre-wrap overflow-auto max-h-[400px]"
          style={{ minHeight: '200px' }}
        >
          {hasAnimated[currentExample] ? examples[currentExample]?.code || '' : displayedCode}
          {isAnimating && <span className="animate-pulse">|</span>}
        </div>
      </div>
    </div>
  )
}
