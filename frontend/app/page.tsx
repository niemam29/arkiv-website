import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
// import { Carousel } from '@/components/ui/Carousel'
import StructuredData from '@/components/seo/StructuredData'
import HoverVideo from '@/components/ui/HoverVideo'

// Force dynamic rendering to enable middleware CSP headers
export const revalidate = 0

const AnimatedCodeBlock = dynamic(() => import('@/components/ui/AnimatedCodeBlock'), {
  loading: () => <div className="h-[400px] bg-gray-50 animate-pulse rounded-lg" />,
  ssr: false
})

const UseCasesSection = dynamic(() => import('@/components/sections/UseCasesSection'), {
  loading: () => <div className="h-[600px] bg-gray-50 animate-pulse" />,
  ssr: true
})

const EventsSection = dynamic(() => import('@/components/sections/EventsSection'), {
  loading: () => <div className="h-[200px] bg-gray-50 animate-pulse" />,
  ssr: false
})

const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), {
  loading: () => <div className="h-[400px] bg-gray-50 animate-pulse" />,
  ssr: false
})

const LatestArticleCard = dynamic(() => import('@/components/sections/LatestArticleCard'), {
  loading: () => <div className="h-[200px] bg-gray-50 animate-pulse rounded-2xl" />,
  ssr: false
})

const ArticlesSection = dynamic(() => import('@/components/sections/ArticlesSection'), {
  loading: () => <div className="h-[400px] bg-gray-50 animate-pulse" />,
  ssr: false
})

export default function Home() {
  return (
    <>
      <StructuredData />
      {/* Hero Section - Zgodny z Figma Frame 2147238531 */}
      <section className="relative bg-transparent min-h-screen px-4 md:px-[60px] py-[32px] overflow-hidden">
        {/* Hero Content - max-w-[1280px] container */}
        <div className="relative z-10 max-w-[1280px] mx-auto pt-20">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">

            {/* Left Side - Main Hero Card */}
            <div className="w-full lg:w-[392px] h-auto lg:h-[442px] p-4 md:p-6 bg-white rounded-2xl shadow-figma-card flex flex-col justify-between">
              <h1 className="font-brutal text-2xl md:text-3xl font-medium uppercase leading-[32px] md:leading-[38px] text-black mb-4 md:mb-0">
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
                  <div className="w-[62px] h-8 hidden md:block">
                    <img src="/images/arkiv-logo.svg" alt="Arkiv logo - Universal data layer for Ethereum" className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a href="/getting-started" className="px-5 py-2 bg-[#1F1F1F] text-white font-mono text-sm md:text-base rounded-lg shadow-figma-button-primary hover:bg-stone-800 transition-colors whitespace-nowrap w-full text-center sm:w-auto">
                    Build now
                  </a>
                  <a href="/pdf/ARKIV_Litepaper.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-2 border border-black text-black font-mono text-sm md:text-base rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap w-full text-center sm:w-auto">
                    Read Litepaper
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Info Cards */}
            <div className="w-full lg:w-[480px] flex flex-col gap-3">


              {/* Features + Event Card */}
              <div className="flex flex-col gap-3 lg:gap-5 lg:h-[442px] p-0 lg:p-5 bg-transparent lg:bg-white rounded-2xl lg:shadow-figma-card">
                <div className="hidden lg:block font-mono text-base uppercase leading-8 text-black">
                  Queryable<br/>
                  Time‑scoped<br/>
                  Verifiable<br/>
                  Trustless by default<br/>
                  Ethereum‑aligned
                </div>

                {/* Latest Article Card */}
                <LatestArticleCard />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Why Arkiv Section */}
      <section id="why-arkiv" className="relative z-10 px-4 md:px-[60px] py-[32px] bg-white">
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
      <section className="relative z-10 px-4 md:px-[60px] py-[32px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-8">
            <h2 id="how-it-works" className="font-brutal text-xl font-medium uppercase text-black">[ How it Works ]</h2>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content Area */}
            <div className="w-full lg:w-[984px] h-[500px] lg:h-[624px] relative rounded-2xl overflow-hidden">
              <HoverVideo
                src="/movies/how_it_works.mp4"
                className="w-full h-full object-cover"
                muted={true}
                playsInline={true}
                autoPlay={true}
                loop={true}
                poster="/images/how-it-works-3d.png"
              />
              <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 left-4 md:left-auto flex flex-col md:flex-row gap-3">
                <a href="#getting-started" className="px-5 py-2 bg-stone-900 text-white font-mono text-base rounded-lg shadow-figma-button-primary hover:bg-stone-800 transition-colors text-center w-full md:w-auto">
                  Quickstart
                </a>
                <a href="/pdf/ARKIV_Litepaper_blue.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-2 border border-black text-black font-mono text-base rounded-lg hover:bg-gray-50 transition-colors text-center w-full md:w-auto">
                  Litepaper
                </a>
              </div>
            </div>

            {/* Side Info */}
            <div className="w-full lg:w-[312px] flex flex-col gap-6">
              {/* L3 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-2 bg-[#ACACAC] text-white font-mono text-base rounded-lg shadow-figma-button-primary w-fit">
                    L3
                  </div>
                  <h3 className="font-brutal text-xl font-medium uppercase text-[#1F1F1F]">DB‑Chains</h3>
                </div>
                <p className="font-mono text-base text-[#1F1F1F]">
                  Specialized database chains for data. CRUD via RPC, indexed queries, programmable expiration
                </p>
              </div>

              <div className="w-full h-px bg-stone-300"></div>

              {/* L2 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-2 bg-[#FE7445] text-white font-mono text-base rounded-lg shadow-figma-button-primary w-fit">
                    L2
                  </div>
                  <h3 className="font-brutal text-xl font-medium uppercase text-[#1F1F1F]">Arkiv Chain</h3>
                </div>
                <p className="font-mono text-base text-[#1F1F1F]">
                  Coordination & registry for DB‑chains; multi‑token gas logic; anchors L3 state; deterministic read layer.
                </p>
              </div>

              <div className="w-full h-px bg-stone-300"></div>

              {/* L1 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-2 bg-[#181EA9] text-white font-mono text-base rounded-lg shadow-figma-button-primary w-fit">
                    L1
                  </div>
                  <h3 className="font-brutal text-xl font-medium uppercase text-[#1F1F1F]">Ethereum</h3>
                </div>
                <p className="font-mono text-base text-[#1F1F1F]">
                  Final security & verifiability for proofs and commitments
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <ArticlesSection />

      {/* GLM Tokenomics Section */}
      <section className="relative z-10 px-4 md:px-[60px] py-[32px] bg-white">
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
                preload="none"
              />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* Start Building Section */}
      <section className="relative z-10 px-4 md:px-[60px] py-[32px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-[32px]">
          <h2 id="getting-started" className="font-brutal text-lg md:text-xl font-medium uppercase text-black leading-6">
            <span className="md:hidden">[ Start Now ]</span>
            <span className="hidden md:inline">[ Start building in Arkiv in 10 minutes ]</span>
          </h2>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-6">
              {/* Top Row Cards */}
              <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[216px]">
                {/* TypeScript Quickstart Guide Card */}
                <a href="/getting-started/typescript" className="bg-gray-200 flex-1 p-4 md:p-6 rounded-2xl shadow-figma-card flex flex-col justify-between relative hover:bg-orange-400 hover:shadow-figma-button-primary hover:scale-[1.02] transition-all duration-200 cursor-pointer group min-h-[216px]">
                    <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />

                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center justify-center">
                      <div className="transform scale-y-[-100%]">
                        <img src="/images/arrow-top-right.svg" alt="View use case details" className="w-10 h-10 group-hover:invert transition-all duration-200 hidden md:block" loading="lazy" />
                      </div>
                    </div>
                    <div className="bg-white group-hover:bg-[#FF6B35] overflow-hidden rounded-full w-16 h-16 flex items-center justify-center transition-colors duration-200">
                      <img src="/images/code.svg" alt="TypeScript guide icon" className="w-6 h-6" loading="lazy" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="font-mono text-base text-black group-hover:text-black leading-[22px] overflow-hidden overflow-ellipsis transition-colors duration-200">TypeScript Quickstart Guide</p>
                  </div>
                </a>

                {/* Python Quickstart Guide Card */}
                <a href="/getting-started/python" className="bg-gray-200 flex-1 p-4 md:p-6 rounded-2xl shadow-figma-card flex flex-col justify-between relative hover:bg-orange-400 hover:shadow-figma-button-primary hover:scale-[1.02] transition-all duration-200 cursor-pointer group min-h-[216px]">
                    <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />

                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center justify-center">
                      <div className="transform scale-y-[-100%]">
                        <img src="/images/arrow-top-right.svg" alt="View use case details" className="w-10 h-10 group-hover:invert transition-all duration-200 hidden md:block" loading="lazy" />
                      </div>
                    </div>
                    <div className="bg-white group-hover:bg-[#FF6B35] overflow-hidden rounded-full w-16 h-16 flex items-center justify-center transition-colors duration-200">
                      <img src="/images/sdk.svg" alt="Python guide icon" className="w-6 h-6" loading="lazy" />
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
                        <img src="/images/arrow-top-right.svg" alt="View use case details" className="w-10 h-10 group-hover:invert transition-all duration-200 hidden md:block" loading="lazy" />
                      </div>
                    </div>
                    <div className="bg-white group-hover:bg-[#FF6B35] overflow-hidden rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200">
                      <img src="/images/description.svg" alt="Litepaper documentation icon" className="w-6 h-6" loading="lazy" />
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
                        <img src="/images/arrow-top-right.svg" alt="View use case details" className="w-10 h-10 group-hover:invert transition-all duration-200 hidden md:block" loading="lazy" />
                      </div>
                    </div>
                    <div className="bg-white group-hover:bg-[#FF6B35] overflow-hidden rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200">
                      <img src="/images/menu-book.svg" alt="Documentation icon" className="w-6 h-6" loading="lazy" />
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
                        <img src="/images/arrow-top-right.svg" alt="View use case details" className="w-10 h-10 group-hover:invert transition-all duration-200 hidden md:block" loading="lazy" />
                      </div>
                    </div>
                    <div className="bg-white group-hover:bg-[#FF6B35] overflow-hidden rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200">
                      <img src="/images/mitre.svg" alt="GitHub repository icon" className="w-6 h-6" loading="lazy" />
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
    expires_in: 300, // Expires In: ~10 minutes
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

            {/* Action Switcher */}
            <div className="bg-[#ededed] box-border flex flex-col sm:flex-row gap-3 items-center p-2 rounded-2xl w-full">
              <a href="/getting-started" className="bg-[#1f1f1f] px-5 py-2.5 rounded-lg shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] text-center font-mono text-base text-white hover:bg-gray-800 transition-colors w-full sm:flex-1 relative after:absolute after:inset-0 after:pointer-events-none after:shadow-[inset_0px_2px_2px_0px_rgba(255,255,255,0.25),inset_0px_-4px_2px_0px_rgba(0,0,0,0.25)] after:rounded-lg">
                Build now
              </a>
              <a href="/pdf/ARKIV_Litepaper_blue.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-lg text-center font-mono text-base text-black hover:bg-gray-200 transition-colors w-full sm:flex-1">
                Read Litepaper
              </a>
              <a href="/docs" className="px-5 py-2.5 rounded-lg text-center font-mono text-base text-black hover:bg-gray-200 transition-colors w-full sm:flex-1">
                Read the Docs
              </a>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Dynamic from CMS */}
      <FAQSection />

      {/* Events Section - Dynamic from CMS */}
      <EventsSection />

      {/* Built By Section */}
      <section className="relative z-10 px-4 md:px-[60px] py-[32px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-[32px]">
          <h2 id="about" className="font-brutal text-lg md:text-xl font-medium uppercase text-black leading-6">[ Emerged by Golem Ecosystem ]</h2>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Description */}
            <div className="bg-[#f1f1f1] w-full lg:w-[764px] h-auto lg:h-[213px] px-6 py-6 pb-5 rounded-2xl flex flex-col justify-between">
              <div className="w-[155px] h-[73px]">
                <img src="/images/golem-logo-large.svg" alt="Golem Network logo - creators of Arkiv blockchain database" className="w-full h-full object-contain" loading="lazy" />
              </div>
              <p className="font-mono text-base text-[#1f1f1f] leading-[22px] w-full max-w-[601px]">
                Built within the Golem Ecosystem, Arkiv is a data availability & management layer (L2+L3) combining the usability of Web2 with the trustlessness of Web3. Built on Ethereum.
              </p>
            </div>

            {/* About Golem - Clickable */}
            <a href="https://golem.network/" target="_blank" rel="noopener noreferrer" className="bg-[#fe7446] w-full lg:w-[254px] h-[213px] p-5 rounded-2xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] flex flex-col justify-between relative hover:bg-[#e5673f] transition-colors duration-200 cursor-pointer group">
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_2px_2px_0px_rgba(255,255,255,0.25),inset_0px_-4px_2px_0px_rgba(0,0,0,0.15)] rounded-2xl" />

              <div className="w-[14px] h-[14px] relative shrink-0">
                <img src="/images/icon.svg" alt="" className="w-full h-full" loading="lazy" />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <div className="border border-white box-border flex items-center justify-center px-5 py-2.5 rounded-lg w-full">
                  <span className="font-mono text-base text-white leading-[22px]">About golem</span>
                </div>
              </div>
            </a>

            {/* Join Discord - Clickable */}
            <a href="https://discord.gg/arkiv" target="_blank" rel="noopener noreferrer" className="bg-[#181ea9] w-full lg:w-[254px] h-[213px] p-5 rounded-2xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] flex flex-col justify-between relative hover:bg-[#1518a0] transition-colors duration-200 cursor-pointer group">
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_2px_2px_0px_rgba(255,255,255,0.25),inset_0px_-4px_2px_0px_rgba(0,0,0,0.25)] rounded-2xl" />

              <div className="w-[14px] h-[14px] relative shrink-0">
                <img src="/images/icon.svg" alt="" className="w-full h-full" loading="lazy" />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <div className="border border-white box-border flex items-center justify-center px-5 py-2.5 rounded-lg w-full">
                  <span className="font-mono text-base text-white leading-[22px]">Join discord</span>
                </div>
              </div>
            </a>
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
    </>
  )
}
