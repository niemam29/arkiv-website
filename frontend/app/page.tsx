import { Button } from '@/components/ui/button'
// import { Carousel } from '@/components/ui/Carousel'
import AnimatedCodeBlock from '@/components/ui/AnimatedCodeBlock'
import StructuredData from '@/components/seo/StructuredData'
import HoverVideo from '@/components/ui/HoverVideo'

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-transparent overflow-hidden relative">
      {/* Hero Section - Zgodny z Figma Frame 2147238531 */}
      <section className="relative bg-transparent min-h-screen px-4 md:px-[60px] py-[64px]">
        {/* Remove the local background div since it's now on the parent */}

        {/* Hero Content - max-w-[1280px] container */}
        <div className="relative z-10 max-w-[1280px] mx-auto pt-20">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">

            {/* Left Side - Main Hero Card */}
            <div className="w-full lg:w-[392px] h-auto lg:h-[442px] p-4 md:p-6 bg-white rounded-2xl shadow-figma-card flex flex-col justify-between">
              <h1 className="font-brutal text-2xl md:text-3xl font-medium uppercase leading-[32px] md:leading-[38px] text-black">
                Introducing&nbsp;Data&nbsp;as<br />
                A&nbsp;First&#8209;Class&nbsp;Citizen<br />
                On&nbsp;Blockchain
              </h1>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <div className="font-mono text-base leading-[22px] text-black">
                    A universal, cost efficient data layer where you control your data on Ethereum
                  </div>

                  {/* Arkiv Icon */}
                  <div className="w-[62px] h-8">
                    <img src="/images/arkiv-logo.svg" alt="Arkiv logo - Universal data layer for Ethereum" className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-row gap-3">
                  <a href="/getting-started" className="px-5 py-2 bg-[#1F1F1F] text-white font-mono text-sm md:text-base rounded-lg shadow-figma-button-primary hover:bg-stone-800 transition-colors whitespace-nowrap">
                    Build now
                  </a>
                  <a href="/pdf/ARKIV_Litepaper.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-2 border border-black text-black font-mono text-sm md:text-base rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                    Read Litepaper
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Info Cards */}
            <div className="w-full lg:w-[480px] flex flex-col gap-3">


              {/* Features + Event Card */}
              <div className="h-auto lg:h-[442px] p-5 bg-white rounded-2xl shadow-figma-card flex flex-col justify-between">
                <div className="font-mono text-base uppercase leading-8 text-black">
                  Queryable<br/>
                  Time‑scoped<br/>
                  Verifiable<br/>
                  Trustless by default<br/>
                  Ethereum‑aligned
                </div>

                <div className="flex flex-col gap-3">
                  <div className="font-mono text-sm text-[#1F1F1F]">Meet us at:</div>

                  {/* Event Card */}
                  <a href="https://lu.ma/adoptiondaysingapore" target="_blank" rel="noopener noreferrer" className="w-full lg:w-[420px] p-5 bg-[#EDEDED] rounded-2xl shadow-figma-card flex flex-col gap-5 hover:bg-orange-400 transition-colors duration-200 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-4 text-lg">🇸🇬</div>
                        <div className="font-mono text-sm text-[#1F1F1F]">Singapore - Sep 30th, 2025</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="font-mono text-xl leading-7 text-[#1F1F1F]">Real World Adoption Day</div>
                      <div className="font-mono text-base leading-[22px] text-[#1F1F1F]">Keynote, Swag, and more.</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Why Arkiv Section */}
      <section id="why-arkiv" className="relative z-10 px-4 md:px-[60px] py-[64px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-8">
            <h2 className="font-brutal text-xl font-medium uppercase text-black">[ Why arkiv ]</h2>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Current State of Data - Pain Point */}
            <div className="w-full lg:w-[648px] px-5 pt-5 pb-10 bg-zinc-100 rounded-2xl flex flex-col gap-8">
              <h3 className="font-brutal text-3xl font-medium uppercase text-stone-900">Current State of Data</h3>

              <div className="flex flex-col gap-6">
                <div className="w-full h-px bg-neutral-400"></div>
                <div className="font-mono text-base text-stone-900">
                  Web2 is convenient—until lock‑in, outages, or policy changes
                </div>

                <div className="w-full h-px bg-neutral-400"></div>
                <div className="font-mono text-base text-stone-900">
                  Web3 is trustworthy—but painful for data (rigid, slow, costly)
                </div>

                <div className="w-full h-px bg-neutral-400"></div>
                <div className="font-mono text-base text-stone-900">
                  Having to choose between “Convenience” or “Control”
                </div>
              </div>
            </div>

            {/* Arkiv - Solution */}
            <div className="w-full lg:w-[648px] h-auto lg:h-[478px] px-5 pt-5 pb-6 bg-blue-800 rounded-2xl flex flex-col gap-8">
              <h3 className="font-brutal text-3xl font-medium uppercase text-white">With Arkiv</h3>

              <div className="flex flex-col gap-6">
                <div className="w-full h-px bg-white/30"></div>
                <div className="font-mono text-base text-white">
                  Queryable by design. CRUD + indexes, not ad‑hoc indexers.
                </div>

                <div className="w-full h-px bg-white/30"></div>
                <div className="font-mono text-base text-white">
                  Time‑scoped. Pay by bytes × lifetime; auto‑prune on configurable dates.
                </div>

                <div className="w-full h-px bg-white/30"></div>
                <div className="font-mono text-base text-white">
                  Deterministic & verifiable. Same query → same answer.
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="relative z-10 px-4 md:px-[60px] py-[64px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-8">
            <h2 id="how-it-works" className="font-brutal text-xl font-medium uppercase text-black">[ How it Works ]</h2>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content Area */}
            <div className="w-full lg:w-[984px] h-[400px] lg:h-[624px] relative rounded-2xl overflow-hidden">
              <HoverVideo
                src="/movies/how_it_works.mp4"
                className="w-full h-full object-cover"
                muted={true}
                playsInline={true}
              />
              <div className="absolute bottom-8 right-8 flex gap-3">
                <a href="/pdf/ARKIV_Litepaper_blue.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-2 border border-black text-black font-mono text-base rounded-lg hover:bg-gray-50 transition-colors">
                  Litepaper
                </a>
                <a href="#getting-started" className="px-5 py-2 bg-stone-900 text-white font-mono text-base rounded-lg shadow-figma-button-primary hover:bg-stone-800 transition-colors">
                  Quickstart
                </a>
              </div>
            </div>

            {/* Side Info */}
            <div className="w-full lg:w-[312px] flex flex-col gap-6">
              {/* L3 */}
              <div className="flex flex-col gap-3">
                <div className="px-2.5 py-2 bg-[#ACACAC] text-white font-mono text-base rounded-lg shadow-figma-button-primary w-fit">
                  L3
                </div>
                <h3 className="font-brutal text-xl font-medium uppercase text-[#1F1F1F]">DB‑Chains</h3>
                <p className="font-mono text-base text-[#1F1F1F]">
                  Specialized database chains for data. CRUD via RPC, indexed queries, programmable expiration
                </p>
              </div>

              <div className="w-full h-px bg-stone-300"></div>

              {/* L2 */}
              <div className="flex flex-col gap-3">
                <div className="px-2.5 py-2 bg-[#FE7445] text-white font-mono text-base rounded-lg shadow-figma-button-primary w-fit">
                  L2
                </div>
                <h3 className="font-brutal text-xl font-medium uppercase text-[#1F1F1F]">Arkiv Chain</h3>
                <p className="font-mono text-base text-[#1F1F1F]">
                  Coordination & registry for DB‑chains; multi‑token gas logic; anchors L3 state; deterministic read layer.
                </p>
              </div>

              <div className="w-full h-px bg-stone-300"></div>

              {/* L1 */}
              <div className="flex flex-col gap-3">
                <div className="px-2.5 py-2 bg-[#181EA9] text-white font-mono text-base rounded-lg shadow-figma-button-primary w-fit">
                  L1
                </div>
                <h3 className="font-brutal text-xl font-medium uppercase text-[#1F1F1F]">Ethereum</h3>
                <p className="font-mono text-base text-[#1F1F1F]">
                  Final security & verifiability for proofs and commitments
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* GLM Tokenomics Section */}
      <section className="relative z-10 px-4 md:px-[60px] py-[64px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-8">
            <h2 className="font-brutal text-xl font-medium uppercase text-black">[ GLM — Tokenomics ]</h2>

            <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side Info */}
            <div className="w-full lg:w-80 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="font-brutal text-xl font-medium uppercase text-stone-900">Fees</h3>
                <p className="font-mono text-base text-stone-900">
                  Data writes and management are designed to be paid via Arkiv with GLM at the core.
                </p>
              </div>

              <div className="w-full h-px bg-stone-300"></div>

              <div className="flex flex-col gap-3">
                <h3 className="font-brutal text-xl font-medium uppercase text-stone-900">Multi‑token support</h3>
                <p className="font-mono text-base text-stone-900">
                  Arkiv supports multi‑token gas logic at L2 while keeping GLM central to the system's economics.
                </p>
              </div>

              <div className="w-full h-px bg-stone-300"></div>

              <div className="flex flex-col gap-3">
                <h3 className="font-brutal text-xl font-medium uppercase text-stone-900">Incentives</h3>
                <p className="font-mono text-base text-stone-900">
                  GLM ecosystem incentives align actors across the Arkiv Ecosystem.
                </p>
              </div>
            </div>

            {/* Right Side Visual */}
            <div className="w-full lg:w-[984px] h-[400px] lg:h-[624px] relative rounded-2xl overflow-hidden">
              <video
                src="/movies/golem.mp4"
                className="w-full h-full object-cover rounded-2xl"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative z-10 px-4 md:px-[60px] py-[64px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-[32px]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 id="use-cases" className="font-brutal text-lg md:text-xl font-medium uppercase text-black">[ Use Cases ]</h2>
              <div className="flex gap-4 items-center">
                <a href="https://usecases.arkiv.network/" className="bg-black px-5 py-2.5 rounded-lg">
                  <span className="font-mono text-sm md:text-base text-white leading-5">See More</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* CopyPal */}
              <a href="https://copypal.online/" target="_blank" rel="noopener noreferrer" className="bg-gray-200 h-full px-5 py-6 rounded-2xl shadow-figma-card flex flex-col gap-6 relative hover:bg-orange-400 transition-colors duration-200 cursor-pointer group">
                <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />
                <h3 className="font-brutal text-xl font-medium uppercase text-black leading-6">CopyPal</h3>
                <div className="relative bg-gray-300 rounded-2xl overflow-hidden aspect-[4/3]">
                  <img src="/images/copypal/copypal-online-2025-09-22-20_44_16.png" alt="CopyPal screenshot" className="absolute inset-0 w-full h-full object-cover object-center" />
                </div>
                <p className="font-mono text-base text-black leading-[22px]">Copy/paste any content to blockchain storage with one click, powered by decentralized CopyPal application.</p>
                <div className="flex justify-between items-end mt-auto">
                  <div className="flex items-center justify-between w-[60px]">
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">[</span>
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">1</span>
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">]</span>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center transform scale-y-[-100%]">
                    <img src="/images/arrow-top-right.svg" alt="View CopyPal" className="w-10 h-10 group-hover:invert transition-all duration-200" />
                  </div>
                </div>
              </a>

              {/* ImageDB */}
              <a href="https://imagedb.online/" target="_blank" rel="noopener noreferrer" className="bg-gray-200 h-full px-5 py-6 rounded-2xl shadow-figma-card flex flex-col gap-6 relative hover:bg-orange-400 transition-colors duration-200 cursor-pointer group">
                <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />
                <h3 className="font-brutal text-xl font-medium uppercase text-black leading-6">ImageDB</h3>
                <div className="relative bg-gray-300 rounded-2xl overflow-hidden aspect-[4/3]">
                  <img src="/images/imagedb/imagedb-2025-09-22-o-21.07.38.png" alt="ImageDB screenshot" className="absolute inset-0 w-full h-full object-cover object-center" />
                </div>
                <p className="font-mono text-base text-black leading-[22px]">Advanced image processing and editing with blockchain storage for permanent image preservation and versioning.</p>
                <div className="flex justify-between items-end mt-auto">
                  <div className="flex items-center justify-between w-[60px]">
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">[</span>
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">2</span>
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">]</span>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center transform scale-y-[-100%]">
                    <img src="/images/arrow-top-right.svg" alt="View ImageDB" className="w-10 h-10 group-hover:invert transition-all duration-200" />
                  </div>
                </div>
              </a>

              {/* FileDB */}
              <a href="https://filedb.online/" target="_blank" rel="noopener noreferrer" className="bg-gray-200 h-full px-5 py-6 rounded-2xl shadow-figma-card flex flex-col gap-6 relative hover:bg-orange-400 transition-colors duration-200 cursor-pointer group">
                <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />
                <h3 className="font-brutal text-xl font-medium uppercase text-black leading-6">FileDB</h3>
                <div className="relative bg-gray-300 rounded-2xl overflow-hidden aspect-[4/3]">
                  <img src="/images/filedb/filedb-2025-09-22 o 21.21.59.png" alt="FileDB screenshot" className="absolute inset-0 w-full h-full object-cover object-center" />
                </div>
                <p className="font-mono text-base text-black leading-[22px]">Universal file storage middleware with chunking for Arkiv integration. Seamlessly handles large files.</p>
                <div className="flex justify-between items-end mt-auto">
                  <div className="flex items-center justify-between w-[60px]">
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">[</span>
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">3</span>
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">]</span>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center transform scale-y-[-100%]">
                    <img src="/images/arrow-top-right.svg" alt="View FileDB" className="w-10 h-10 group-hover:invert transition-all duration-200" />
                  </div>
                </div>
              </a>

              {/* WebDB Static Hosting */}
              <a href="https://webdb.site" target="_blank" rel="noopener noreferrer" className="bg-gray-200 h-full px-5 py-6 rounded-2xl shadow-figma-card flex flex-col gap-6 relative hover:bg-orange-400 transition-colors duration-200 cursor-pointer group">
                <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />
                <h3 className="font-brutal text-xl font-medium uppercase text-black leading-6">WebDB Static Hosting</h3>
                <div className="relative bg-gray-300 rounded-2xl overflow-hidden aspect-[4/3]">
                  <img src="/images/webdb/webdb-2025-09-22 o 21.19.32.png" alt="WebDB screenshot" className="absolute inset-0 w-full h-full object-cover object-center" />
                </div>
                <p className="font-mono text-base text-black leading-[22px]">Immutable static hosting backed by Arkiv. Deploy websites with blockchain-verified content storage guarantees.</p>
                <div className="flex justify-between items-end mt-auto">
                  <div className="flex items-center justify-between w-[60px]">
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">[</span>
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">4</span>
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">]</span>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center transform scale-y-[-100%]">
                    <img src="/images/arrow-top-right.svg" alt="View WebDB details" className="w-10 h-10 group-hover:invert transition-all duration-200" />
                  </div>
                </div>
              </a>

              {/* Arkiv Portfolio */}
              <a href="https://usecases.arkiv.network" target="_blank" rel="noopener noreferrer" className="bg-gray-200 h-full px-5 py-6 rounded-2xl shadow-figma-card flex flex-col gap-6 relative hover:bg-orange-400 transition-colors duration-200 cursor-pointer group">
                <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />
                <h3 className="font-brutal text-xl font-medium uppercase text-black leading-6">Arkiv Portfolio</h3>
                <div className="relative bg-gray-300 rounded-2xl overflow-hidden aspect-[4/3]">
                  <img src="/images/portfolio/portfolio-2025-09-26 o 22.59.33.png" alt="Arkiv Portfolio screenshot" className="absolute inset-0 w-full h-full object-cover object-center" />
                </div>
                <p className="font-mono text-base text-black leading-[22px]">Showcase portfolio of real applications built with Arkiv - featuring caching and blockchain storage.</p>
                <div className="flex justify-between items-end mt-auto">
                  <div className="flex items-center justify-between w-[60px]">
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">[</span>
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">5</span>
                    <span className="font-brutal text-[32px] font-black uppercase text-black leading-[38px]">]</span>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center transform scale-y-[-100%]">
                    <img src="/images/arrow-top-right.svg" alt="View Portfolio" className="w-10 h-10 group-hover:invert transition-all duration-200" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Start Building Section */}
      <section className="relative z-10 px-4 md:px-[60px] py-[64px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-[32px]">
          <h2 id="getting-started" className="font-brutal text-lg md:text-xl font-medium uppercase text-black leading-6">[ Start building in Arkiv in 10 minutes ]</h2>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-6">
              {/* Top Row Cards */}
              <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[216px]">
                {/* TypeScript Quickstart Guide Card */}
                <a href="/getting-started?section=typescript" className="bg-gray-200 flex-1 p-4 md:p-6 rounded-2xl shadow-figma-card flex flex-col justify-between relative hover:bg-orange-400 hover:shadow-figma-button-primary hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
                    <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />

                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center justify-center">
                      <div className="transform scale-y-[-100%]">
                        <img src="/images/arrow-top-right.svg" alt="View use case details" className="w-10 h-10 group-hover:invert transition-all duration-200" />
                      </div>
                    </div>
                    <div className="bg-white group-hover:bg-[#FF6B35] overflow-hidden rounded-full w-16 h-16 flex items-center justify-center transition-colors duration-200">
                      <img src="/images/code.svg" alt="TypeScript guide icon" className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="font-mono text-base text-black group-hover:text-black leading-[22px] overflow-hidden overflow-ellipsis transition-colors duration-200">TypeScript Quickstart Guide</p>
                  </div>
                </a>

                {/* Python Quickstart Guide Card */}
                <a href="/getting-started?section=python" className="bg-gray-200 flex-1 p-4 md:p-6 rounded-2xl shadow-figma-card flex flex-col justify-between relative hover:bg-orange-400 hover:shadow-figma-button-primary hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
                    <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />

                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center justify-center">
                      <div className="transform scale-y-[-100%]">
                        <img src="/images/arrow-top-right.svg" alt="View use case details" className="w-10 h-10 group-hover:invert transition-all duration-200" />
                      </div>
                    </div>
                    <div className="bg-white group-hover:bg-[#FF6B35] overflow-hidden rounded-full w-16 h-16 flex items-center justify-center transition-colors duration-200">
                      <img src="/images/sdk.svg" alt="Python guide icon" className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="font-mono text-base text-black group-hover:text-black leading-[22px] overflow-hidden overflow-ellipsis transition-colors duration-200">Python Quickstart Guide</p>
                  </div>
                </a>
              </div>

              {/* Bottom Row Cards */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Litepaper Card */}
                <a href="/pdf/ARKIV_Litepaper_blue.pdf" target="_blank" rel="noopener noreferrer" className="bg-gray-200 flex-1 h-auto md:h-[160px] p-4 md:p-6 rounded-2xl shadow-figma-card flex flex-col justify-between relative hover:bg-orange-400 hover:shadow-figma-button-primary hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
                    <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />

                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center justify-center">
                      <div className="transform scale-y-[-100%]">
                        <img src="/images/arrow-top-right.svg" alt="View use case details" className="w-10 h-10 group-hover:invert transition-all duration-200" />
                      </div>
                    </div>
                    <div className="bg-white group-hover:bg-[#FF6B35] overflow-hidden rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200">
                      <img src="/images/description.svg" alt="Litepaper documentation icon" className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="font-mono text-base text-black group-hover:text-black leading-[22px] overflow-hidden overflow-ellipsis transition-colors duration-200">Litepaper</p>
                  </div>
                </a>

                {/* Docs Card */}
                <a href="/docs/" className="bg-gray-200 flex-1 h-auto md:h-[160px] p-4 md:p-6 rounded-2xl shadow-figma-card flex flex-col justify-between relative hover:bg-orange-400 hover:shadow-figma-button-primary hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
                    <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />

                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center justify-center">
                      <div className="transform scale-y-[-100%]">
                        <img src="/images/arrow-top-right.svg" alt="View use case details" className="w-10 h-10 group-hover:invert transition-all duration-200" />
                      </div>
                    </div>
                    <div className="bg-white group-hover:bg-[#FF6B35] overflow-hidden rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200">
                      <img src="/images/menu-book.svg" alt="Documentation icon" className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="font-mono text-base text-black group-hover:text-black leading-[22px] overflow-hidden overflow-ellipsis transition-colors duration-200">Docs</p>
                  </div>
                </a>

                {/* Github Card */}
                <a href="https://github.com/arkiv-network/" target="_blank" rel="noopener noreferrer" className="bg-gray-200 flex-1 h-auto md:h-[160px] p-4 md:p-6 rounded-2xl shadow-figma-card flex flex-col justify-between relative hover:bg-orange-400 hover:shadow-figma-button-primary hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
                    <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />

                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center justify-center">
                      <div className="transform scale-y-[-100%]">
                        <img src="/images/arrow-top-right.svg" alt="View use case details" className="w-10 h-10 group-hover:invert transition-all duration-200" />
                      </div>
                    </div>
                    <div className="bg-white group-hover:bg-[#FF6B35] overflow-hidden rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200">
                      <img src="/images/mitre.svg" alt="GitHub repository icon" className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="font-mono text-base text-black group-hover:text-black leading-[22px] overflow-hidden overflow-ellipsis transition-colors duration-200">Github</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Animated Code Examples */}
            <AnimatedCodeBlock
              examples={[
                {
                  id: 'create-entity',
                  title: 'Create an entity',
                  code: `const id = randomUUID()
const creates = [
  {
    data: encoder.encode("Test entity"),
    btl: 300, // Block-To-Live: ~10 minutes
    // (each block ~2 seconds)
    stringAnnotations: [
      new Annotation("testTextAnnotation", "demo"),
      new Annotation("id", id)
    ],
    numericAnnotations: [new Annotation("version", 1)]
  } as GolemBaseCreate
]

const createReceipt = await client.createEntities(creates);
console.log('Receipt', createReceipt)`
                },
                {
                  id: 'read-entity',
                  title: 'Read an entity',
                  code: `// Meta data and storage
if (entityKey) {
  const meta = await client.getEntityMetaData(entityKey)
  console.log('Meta data:', meta)

  const data = await client.getStorageValue(entityKey)
  console.log('Storage value:', decoder.decode(data))
}

const greetings = await client.queryEntities('type = "greeting"')
console.log(\`Found \${greetings.length} greeting entities\`)

for (const entity of greetings) {
  const data = decoder.decode(entity.storageValue)
  console.log(\`Entity \${entity.entityKey}: \${data}\`)
}

async function printEntities(label: string, entities: any[]) {
  console.log(\`\${label} - found \${entities.length} entities:\`)
  for (const entity of entities) {
    const data = decoder.decode(entity.storageValue)
    console.log(\`\${label} EntityKey: \${entity.entityKey}, Data: \${data}\`)
  }
}`
                }
              ]}
            />

            {/* Action Buttons */}
            <div className="flex items-center justify-between w-full">
              <div className="bg-gray-200 p-2 rounded-2xl flex gap-3 items-center">
                <a href="/getting-started" className="bg-[#1f1f1f] px-5 py-2.5 rounded-lg shadow-figma-card relative hover:bg-gray-800 transition-colors">
                  <div className="absolute inset-0 pointer-events-none shadow-inner" />
                  <span className="font-mono text-base text-white leading-[22px]">Build now</span>
                </a>
                <a href="/pdf/ARKIV_Litepaper_blue.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors">
                  <span className="font-mono text-base text-black leading-[22px]">Read Litepaper</span>
                </a>
                <a href="/docs" className="px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors">
                  <span className="font-mono text-base text-black leading-[22px]">Read the Docs</span>
                </a>
              </div>

              <a href="/playground" className="flex gap-6 items-center hover:opacity-80 transition-opacity">
                <span className="font-mono text-base text-black leading-[22px]">Explore Playground</span>
                <div className="flex items-center justify-center">
                  <div className="transform rotate-180">
                    <img src="/images/arrow.svg" alt="Explore playground arrow" className="w-10 h-10" />
                  </div>
                </div>
              </a>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-4 md:px-[60px] py-[64px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-8">
          <h2 id="faq" className="font-brutal text-xl font-medium uppercase text-black">[ FAQ ]</h2>

          <div className="flex flex-col gap-6">
            {[
              {
                question: "Is Arkiv a rollup?",
                answer: "Arkiv coordinates DB‑chains (L3) on an OP-Stack based L2 and anchors to Ethereum L1. DB-Chains specialized for data and queries, not general smart contracts."
              },
              {
                question: "How is this different from indexers?",
                answer: "Your data is queryable at the protocol layer. Fewer bespoke indexers, fewer trust assumptions."
              },
              {
                question: "How do fees work?",
                answer: "You mainly pay size × lifetime, plus small costs for commitments. No paying for redundant replicas—you pay for the data and how long it lives."
              },
              {
                question: "Can I run a node?",
                answer: "Yes. Regular and archive modes; snapshot/fast‑sync supported."
              },
              {
                question: "What about private data?",
                answer: "Permissionless by default. Permissioned/trusted modes are configurable per DB‑chain."
              }
            ].map((faq, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="w-full h-px bg-neutral-400"></div>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="w-full lg:w-[648px] font-mono text-lg lg:text-xl text-black">{faq.question}</div>
                  <div className="w-full lg:w-[648px] font-mono text-base text-black">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="relative z-10 px-4 md:px-[60px] py-[64px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-[32px]">
          <h2 className="font-brutal text-lg md:text-xl font-medium uppercase text-black leading-6">
            [ <span className="font-brutal font-medium">Upcoming</span> Events ]
          </h2>

          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Event 1 - Real World Adoption Day */}
            <a href="https://luma.com/adoptiondaysingapore" target="_blank" rel="noopener noreferrer" className="bg-gray-200 p-5 rounded-2xl shadow-figma-card flex flex-row gap-6 relative min-h-[160px] flex-1 hover:bg-[#FE7445] transition-colors cursor-pointer group">
                <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />

              {/* Left Side - Content */}
              <div className="flex-1 flex flex-col gap-3">
                <h3 className="font-mono text-xl text-[#1f1f1f] leading-7 group-hover:text-white transition-colors">Arkiv @ Real World Adoption Day</h3>
                <div className="flex gap-2 items-center">
                  <img className="w-4 h-4" src="/images/location-icon.png" alt="Location" />
                  <span className="font-mono text-sm text-[#1f1f1f] leading-5 group-hover:text-white transition-colors">Singapore</span>
                </div>
                <p className="font-mono text-base text-[#1f1f1f] leading-[22px] group-hover:text-white transition-colors">Meetup booth + Keynote</p>
              </div>

              {/* Right Side - Image */}
              <div className="w-[200px] h-[120px] relative rounded-2xl overflow-hidden flex-shrink-0">
                <div className="absolute bg-[#d9d9d9] inset-0"></div>
                <img alt="Arkiv Real World Adoption Day event" className="absolute inset-0 w-full h-full object-cover" src="/images/Real_World_Adoption_Day.png" />
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-mono">
                  Sep 30th, 2025
                </div>
              </div>
            </a>

            {/* Event 2 - Builder Nights */}
            <a href="https://luma.com/bnsingapore" target="_blank" rel="noopener noreferrer" className="bg-gray-200 p-5 rounded-2xl shadow-figma-card flex flex-row gap-6 relative min-h-[160px] flex-1 hover:bg-[#FE7445] transition-colors cursor-pointer group">
                <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />

              {/* Left Side - Content */}
              <div className="flex-1 flex flex-col gap-3">
                <h3 className="font-mono text-xl text-[#1f1f1f] leading-7 group-hover:text-white transition-colors">Arkiv @ Builder Nights</h3>
                <div className="flex gap-2 items-center">
                  <img className="w-4 h-4" src="/images/location-icon.png" alt="Location" />
                  <span className="font-mono text-sm text-[#1f1f1f] leading-5 group-hover:text-white transition-colors">Singapore</span>
                </div>
                <p className="font-mono text-base text-[#1f1f1f] leading-[22px] group-hover:text-white transition-colors">Talks, Networking & Nice Vibes</p>
              </div>

              {/* Right Side - Image */}
              <div className="w-[200px] h-[120px] relative rounded-2xl overflow-hidden flex-shrink-0">
                <div className="absolute bg-[#d9d9d9] inset-0"></div>
                <img alt="Arkiv Builder Nights event" className="absolute inset-0 w-full h-full object-cover" src="/images/Builder_Nights.png" />
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-mono">
                  Sep 30th, 2025
                </div>
              </div>
            </a>
          </div>
          </div>
        </div>
      </section>

      {/* Built By Section */}
      <section className="relative z-10 px-4 md:px-[60px] py-[64px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-[32px]">
          <h2 id="about" className="font-brutal text-lg md:text-xl font-medium uppercase text-black leading-6">[ built by ]</h2>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Description */}
            <div className="bg-[#f1f1f1] w-full lg:w-[764px] h-auto lg:h-[213px] px-4 md:px-6 py-6 pb-5 rounded-2xl flex flex-col justify-between">
              <div className="w-[155px] h-[73px]">
                <img src="/images/golem-logo-large.svg" alt="Golem Network logo - creators of Arkiv blockchain database" className="w-full h-full object-contain" />
              </div>
              <p className="font-mono text-sm md:text-base text-[#1f1f1f] leading-[22px] w-full max-w-[601px]">
                Built within the Golem Ecosystem, Arkiv is a data availability & management layer (L2+L3) combining the usability of Web2 with the trustlessness of Web3. Built on Ethereum.
              </p>
            </div>

            {/* Golem - Clickable */}
            <a href="https://golem.network/" target="_blank" rel="noopener noreferrer" className="bg-[#fe7446] w-full lg:w-[254px] h-auto lg:h-[213px] p-4 md:p-5 rounded-2xl shadow-figma-card flex flex-col justify-between relative hover:bg-[#e5673f] hover:shadow-figma-button-secondary hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
              <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />

              <div className="w-[14px] h-[14px] relative">
                <div className="absolute inset-[8.49%]">
                  <img src="/images/icon.svg" alt="Golem Network star icon" className="w-full h-full group-hover:brightness-110 transition-all duration-200" />
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <span className="font-mono text-base text-white leading-[22px] whitespace-pre-wrap group-hover:text-gray-100 transition-colors duration-200">About Golem</span>
              </div>
            </a>

            {/* Join Discord - Clickable */}
            <a href="https://discord.gg/arkiv" target="_blank" rel="noopener noreferrer" className="bg-[#181ea9] w-full lg:w-[254px] h-auto lg:h-[213px] p-4 md:p-5 rounded-2xl shadow-figma-card flex flex-col justify-between relative hover:bg-[#1518a0] hover:shadow-figma-button-secondary hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
              <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />

              <div className="w-[14px] h-[14px] relative">
                <div className="absolute inset-[8.49%]">
                  <img src="/images/icon.svg" alt="Golem Network star icon" className="w-full h-full group-hover:brightness-110 transition-all duration-200" />
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <span className="font-mono text-base text-white leading-[22px] whitespace-pre-wrap group-hover:text-gray-100 transition-colors duration-200">Join discord</span>
              </div>
            </a>
          </div>
          </div>
        </div>
      </section>

      {/* Footer Section - Figma Design */}
      <section className="px-4 md:px-[60px] py-[64px] bg-[#181EA9]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-8">
            {/* Main Footer Content - Single Row */}
            <div className="flex items-start justify-between">
              {/* Large ARKIV Logo */}
              <div className="flex-shrink-0">
                <h2 className="font-brutal text-[60px] md:text-[80px] font-black uppercase text-white leading-tight tracking-wider">
                  [ ARKIV ]
                </h2>
              </div>

              {/* Footer Navigation - Horizontal Layout */}
              <div className="flex gap-16 items-start">
                {/* Developers */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-mono text-sm text-white leading-tight mb-2">Developers</h3>
                  <div className="flex flex-col gap-1">
                    <a href="/docs" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Docs</a>
                    <a href="/getting-started" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Getting Started</a>
                    <a href="/playground" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Playground</a>
                    <a href="https://github.com/arkiv-network" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">GitHub</a>
                    <a href="/pdf/ARKIV_Litepaper.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Litepaper</a>
                    <a href="/aips" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">AIPs [Soon]</a>
                  </div>
                </div>

                {/* Connect */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-mono text-sm text-white leading-tight mb-2">Connect</h3>
                  <div className="flex flex-col gap-1">
                    <a href="https://twitter.com/arkiv" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">X</a>
                    <a href="https://discord.gg/arkiv" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Discord</a>
                    <a href="#upcoming-events" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Events</a>
                  </div>
                </div>

                {/* Legal */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-mono text-sm text-white leading-tight mb-2">Legal</h3>
                  <div className="flex flex-col gap-1">
                    <a href="/legal/privacy" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Privacy Policy</a>
                    <a href="/legal/cookies" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Cookie Policy</a>
                    <a href="/legal/terms" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Terms of Use</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright - Single Row */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="font-mono text-sm text-white leading-tight">© 2025 Arkiv</span>
              <span className="font-mono text-sm text-white leading-tight">All rights reserved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA - Hidden per feedback */}
      <div className="hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 px-3 pt-2 pb-3 bg-orange-400 rounded-2xl shadow-figma-button-secondary flex flex-col items-center gap-3 z-50">
        <div className="text-center">
          <span className="text-white text-sm font-mono">Build your DB-chain on </span>
          <span className="text-white text-sm font-brutal font-black uppercase">[ Arkiv ] </span>
          <span className="text-white text-sm font-mono">now</span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white text-black font-mono text-xs rounded-lg shadow-figma-card">
            Build now
          </button>
          <button className="px-4 py-2 border border-white text-white font-mono text-xs rounded-lg">
            Read the Docs
          </button>
          <button className="px-4 py-2 text-white font-mono text-xs rounded-lg">
            Talk to us
          </button>
        </div>
      </div>
      </div>
    </>
  )
}
