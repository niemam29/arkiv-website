'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface UseCaseItem {
  id: number
  title: string
  description: string
  href: string
  image: string
}

const USE_CASES: UseCaseItem[] = [
  {
    id: 1,
    title: 'CopyPal',
    description: 'Copy/paste any content to blockchain storage with one click, powered by decentralized CopyPal application.',
    href: 'https://copypal.online/',
    image: '/images/copypal/copypal-online-2025-09-22-20_44_16.png',
  },
  {
    id: 2,
    title: 'ImageDB',
    description: 'Advanced image processing and editing with blockchain storage for permanent image preservation and versioning.',
    href: 'https://imagedb.online/',
    image: '/images/imagedb/imagedb-2025-09-22-o-21.07.38.png',
  },
  {
    id: 3,
    title: 'FileDB',
    description: 'Universal file storage middleware with chunking for Arkiv integration. Seamlessly handles large files.',
    href: 'https://filedb.online/',
    image: '/images/filedb/filedb-2025-09-22 o 21.21.59.png',
  },
  {
    id: 4,
    title: 'WebDB Static Hosting',
    description: 'Immutable static hosting backed by Arkiv. Deploy websites with blockchain-verified content storage guarantees.',
    href: 'https://webdb.site',
    image: '/images/webdb/webdb-2025-09-22 o 21.19.32.png',
  },
  {
    id: 5,
    title: 'Arkiv Portfolio',
    description: 'Showcase portfolio of real applications built with Arkiv - featuring caching and blockchain storage.',
    href: 'https://usecases.arkiv.network',
    image: '/images/portfolio/portfolio-2025-09-26 o 22.59.33.png',
  },
]

const scrollOffset = 320

export default function UseCasesCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = () => {
    const el = containerRef.current
    if (!el) return
    const maxScrollLeft = el.scrollWidth - el.clientWidth
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 8)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    updateScrollState()
    const handleScroll = () => updateScrollState()
    el.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', updateScrollState)

    return () => {
      el.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const handleArrowClick = (direction: 'left' | 'right') => {
    const el = containerRef.current
    if (!el) return

    const amount = direction === 'left' ? -scrollOffset : scrollOffset
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-2 pr-6 snap-x snap-mandatory xl:overflow-visible xl:pr-[200px]"
      >
        {USE_CASES.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 min-w-[280px] md:min-w-[300px] xl:min-w-[266px] px-5 py-6 rounded-2xl shadow-figma-card flex flex-col gap-6 relative flex-shrink-0 hover:bg-orange-400 transition-colors duration-200 cursor-pointer group snap-start"
          >
            <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />
            <h3 className="font-brutal text-xl font-medium uppercase text-black leading-6 mb-6 group-hover:text-white">
              {item.title}
            </h3>
            <div className="relative bg-gray-300 rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={item.image}
                alt={`${item.title} screenshot`}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
            <p className="font-mono text-base text-black leading-[22px] group-hover:text-white">{item.description}</p>
            <div className="flex justify-between items-end mt-auto">
              <div className="flex items-center justify-between w-[60px]">
                <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px] group-hover:text-white">[</span>
                <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px] group-hover:text-white">
                  {item.id}
                </span>
                <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px] group-hover:text-white">]</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center transform scale-y-[-100%]">
                <img
                  src="/images/arrow-top-right.svg"
                  alt={`View ${item.title}`}
                  className="w-10 h-10 group-hover:invert transition-all duration-200 hidden md:block"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation arrows */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => handleArrowClick('left')}
          className="hidden xl:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-figma-card border border-stone-200 absolute left-[-24px] top-1/2 -translate-y-1/2 z-10 hover:bg-gray-100 transition-colors"
          aria-label="Scroll left"
        >
          <img src="/images/arrow.svg" alt="Scroll left" className="w-6 h-6 rotate-180" />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={() => handleArrowClick('right')}
          className="hidden xl:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-figma-card border border-stone-200 absolute right-[-24px] top-1/2 -translate-y-1/2 z-10 hover:bg-gray-100 transition-colors"
          aria-label="Scroll right"
        >
          <img src="/images/arrow.svg" alt="Scroll right" className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
