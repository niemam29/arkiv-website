'use client'

import { useRef, useState, useEffect } from 'react'

export default function UseCasesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    const el = scrollContainerRef.current
    if (!el) return
    const maxScrollLeft = el.scrollWidth - el.clientWidth
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 8)
  }

  useEffect(() => {
    const el = scrollContainerRef.current
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
    const el = scrollContainerRef.current
    if (!el) return

    const cardWidth = 312 + 24 // card width + gap
    const amount = direction === 'left' ? -cardWidth : cardWidth
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section id="use-cases" className="relative z-10 px-4 md:px-[60px] py-[32px] bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[12px]">
            <h2 className="font-brutal text-lg md:text-xl font-medium uppercase text-black leading-6">[ Use Cases ]</h2>
            <p className="font-mono text-sm md:text-base text-black leading-[22px] max-w-[800px]">
              Discover real-world applications built with Arkiv - from decentralized clipboards to immutable static hosting.
            </p>
          </div>

          <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto scroll-smooth">
            {/* CopyPal */}
            <a
              href="https://copypal.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 w-[312px] h-[400px] px-5 py-6 rounded-2xl shadow-figma-card flex flex-col justify-between relative flex-shrink-0 hover:bg-orange-400 transition-colors duration-200 cursor-pointer group"
            >
              <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />
              <div className="flex flex-col gap-6">
                <h3 className="font-brutal text-xl font-medium uppercase text-black leading-6">CopyPal</h3>
                <div className="bg-gray-300 h-[132px] rounded-2xl overflow-hidden">
                  <img
                    src="/images/copypal/copypal-online-2025-09-22-20_44_16.png"
                    alt="CopyPal screenshot"
                    className="w-full h-[132px] object-cover object-top"
                  />
                </div>
                <p className="font-mono text-base text-black leading-[22px]">
                  Copy/paste any content to blockchain storage with one click, powered by decentralized CopyPal application.
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center justify-between w-[60px]">
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">[</span>
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">1</span>
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">]</span>
                </div>
                <div className="w-10 h-10 flex items-center justify-center transform scale-y-[-100%]">
                  <img
                    src="/images/arrow-top-right.svg"
                    alt="View CopyPal"
                    className="w-10 h-10 group-hover:invert transition-all duration-200 hidden md:block"
                  />
                </div>
              </div>
            </a>

            {/* ImageDB */}
            <a
              href="https://imagedb.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 w-[312px] h-[400px] px-5 py-6 rounded-2xl shadow-figma-card flex flex-col justify-between relative flex-shrink-0 hover:bg-orange-400 transition-colors duration-200 cursor-pointer group"
            >
              <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />
              <div className="flex flex-col gap-6">
                <h3 className="font-brutal text-xl font-medium uppercase text-black leading-6">ImageDB</h3>
                <div className="bg-gray-300 h-[132px] rounded-2xl overflow-hidden">
                  <img
                    src="/images/imagedb/imagedb-2025-09-22-o-21.07.38.png"
                    alt="ImageDB screenshot"
                    className="w-full h-[132px] object-cover object-top"
                  />
                </div>
                <p className="font-mono text-base text-black leading-[22px]">
                  Advanced image processing and editing with blockchain storage for permanent image preservation and versioning.
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center justify-between w-[60px]">
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">[</span>
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">2</span>
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">]</span>
                </div>
                <div className="w-10 h-10 flex items-center justify-center transform scale-y-[-100%]">
                  <img
                    src="/images/arrow-top-right.svg"
                    alt="View ImageDB"
                    className="w-10 h-10 group-hover:invert transition-all duration-200 hidden md:block"
                  />
                </div>
              </div>
            </a>

            {/* FileDB */}
            <a
              href="https://filedb.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 w-[312px] h-[400px] px-5 py-6 rounded-2xl shadow-figma-card flex flex-col justify-between relative flex-shrink-0 hover:bg-orange-400 transition-colors duration-200 cursor-pointer group"
            >
              <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />
              <div className="flex flex-col gap-6">
                <h3 className="font-brutal text-xl font-medium uppercase text-black leading-6">FileDB</h3>
                <div className="bg-gray-300 h-[132px] rounded-2xl overflow-hidden">
                  <img
                    src="/images/filedb/filedb-2025-09-22 o 21.21.59.png"
                    alt="FileDB screenshot"
                    className="w-full h-[132px] object-cover object-top"
                  />
                </div>
                <p className="font-mono text-base text-black leading-[22px]">
                  Universal file storage middleware with chunking for Arkiv integration. Seamlessly handles large files.
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center justify-between w-[60px]">
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">[</span>
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">3</span>
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">]</span>
                </div>
                <div className="w-10 h-10 flex items-center justify-center transform scale-y-[-100%]">
                  <img
                    src="/images/arrow-top-right.svg"
                    alt="View FileDB"
                    className="w-10 h-10 group-hover:invert transition-all duration-200 hidden md:block"
                  />
                </div>
              </div>
            </a>

            {/* WebDB Static Hosting */}
            <a
              href="https://webdb.site"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 w-[312px] h-[400px] px-5 py-6 rounded-2xl shadow-figma-card flex flex-col justify-between relative flex-shrink-0 hover:bg-orange-400 transition-colors duration-200 cursor-pointer group"
            >
              <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />
              <div className="flex flex-col gap-6">
                <h3 className="font-brutal text-xl font-medium uppercase text-black leading-6">WebDB Static Hosting</h3>
                <div className="bg-gray-300 h-[132px] rounded-2xl overflow-hidden">
                  <img
                    src="/images/webdb/webdb-2025-09-22 o 21.19.32.png"
                    alt="WebDB screenshot"
                    className="w-full h-[132px] object-cover object-top"
                  />
                </div>
                <p className="font-mono text-base text-black leading-[22px]">
                  Immutable static hosting backed by Arkiv. Deploy websites with blockchain-verified content storage guarantees.
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center justify-between w-[60px]">
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">[</span>
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">4</span>
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">]</span>
                </div>
                <div className="w-10 h-10 flex items-center justify-center transform scale-y-[-100%]">
                  <img
                    src="/images/arrow-top-right.svg"
                    alt="View WebDB details"
                    className="w-10 h-10 group-hover:invert transition-all duration-200 hidden md:block"
                  />
                </div>
              </div>
            </a>

            {/* Arkiv Portfolio */}
            <a
              href="https://usecases.arkiv.network"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 w-[312px] h-[400px] px-5 py-6 rounded-2xl shadow-figma-card flex flex-col justify-between relative flex-shrink-0 hover:bg-orange-400 transition-colors duration-200 cursor-pointer group"
            >
              <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />
              <div className="flex flex-col gap-6">
                <h3 className="font-brutal text-xl font-medium uppercase text-black leading-6">Arkiv Portfolio</h3>
                <div className="bg-gray-300 h-[132px] rounded-2xl overflow-hidden">
                  <img
                    src="/images/portfolio/portfolio-2025-09-26 o 22.59.33.png"
                    alt="Arkiv Portfolio screenshot"
                    className="w-full h-[132px] object-cover object-top"
                  />
                </div>
                <p className="font-mono text-base text-black leading-[22px]">
                  Showcase portfolio of real applications built with Arkiv - featuring caching and blockchain storage.
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center justify-between w-[60px]">
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">[</span>
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">5</span>
                  <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">]</span>
                </div>
                <div className="w-10 h-10 flex items-center justify-center transform scale-y-[-100%]">
                  <img
                    src="/images/arrow-top-right.svg"
                    alt="View Portfolio"
                    className="w-10 h-10 group-hover:invert transition-all duration-200 hidden md:block"
                  />
                </div>
              </div>
            </a>

            {/* More Examples */}
            <a
              href="https://usecases.arkiv.network"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#181EA9] w-[312px] h-[400px] px-5 py-6 rounded-2xl shadow-figma-card flex flex-col justify-center items-center relative flex-shrink-0 hover:bg-[#1518a0] transition-colors duration-200 cursor-pointer group"
            >
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_2px_2px_0px_rgba(255,255,255,0.25),inset_0px_-4px_2px_0px_rgba(0,0,0,0.25)] rounded-2xl" />
              <div className="flex flex-col gap-8 items-center">
                <h3 className="font-brutal text-[40px] font-black uppercase text-white leading-tight text-center">[ ARKIV ]</h3>
                <div className="border border-white box-border flex items-center justify-center px-5 py-2.5 rounded-lg">
                  <span className="font-mono text-base text-white leading-[22px]">More Examples</span>
                </div>
              </div>
            </a>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-[12px]">
            <div className="flex gap-[12px] items-center">
              {/* Left Arrow */}
              <button
                disabled={!canScrollLeft}
                onClick={() => handleArrowClick('left')}
                className="border border-[#c7c7c7] border-solid box-border flex items-center p-[12px] rounded-full w-10 h-10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:border-black group transition-colors"
                aria-label="Previous"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 4L6 8L10 12"
                    stroke={canScrollLeft ? 'currentColor' : '#c7c7c7'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-white"
                  />
                </svg>
              </button>

              {/* Right Arrow */}
              <button
                disabled={!canScrollRight}
                onClick={() => handleArrowClick('right')}
                className="border border-[rgba(0,0,0,0.32)] border-solid box-border flex items-center p-[12px] rounded-full w-10 h-10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:border-black group transition-colors"
                aria-label="Next"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 4L10 8L6 12"
                    stroke={canScrollRight ? 'currentColor' : '#c7c7c7'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-white"
                  />
                </svg>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-px relative flex-1 ml-[24px]">
              <div className="absolute bg-[#c7c7c7] h-px left-0 top-0 w-full" />
              <div
                className="absolute bg-black h-px left-0 top-0 transition-all duration-300"
                style={{
                  width: canScrollLeft ? (canScrollRight ? '50%' : '100%') : '20%'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
