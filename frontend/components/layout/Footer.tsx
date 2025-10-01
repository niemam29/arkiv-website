export default function Footer() {
  return (
    <section className="px-4 md:px-[60px] py-[32px] bg-[#181EA9]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-8">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            {/* Large ARKIV Logo */}
            <div className="flex-shrink-0 text-left self-start order-first">
              <h2 className="font-brutal text-[60px] md:text-[80px] font-black uppercase text-white leading-tight tracking-wider">
                [ ARKIV ]
              </h2>
            </div>

            {/* Footer Navigation */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-start text-left md:text-left">
              {/* Developers */}
              <div className="flex flex-col gap-2">
                <h3 className="font-mono text-sm text-white leading-tight mb-2">Developers</h3>
                <div className="flex flex-col gap-1">
                  <a href="/docs" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Docs</a>
                  <a href="/getting-started/typescript" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Getting Started</a>
                  <a href="/playground" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Playground</a>
                  <a href="https://github.com/arkiv-network" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">GitHub</a>
                  <a href="/pdf/ARKIV_Litepaper.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Litepaper</a>
                </div>
              </div>

              {/* Connect */}
              <div className="flex flex-col gap-2">
                <h3 className="font-mono text-sm text-white leading-tight mb-2">Connect</h3>
                <div className="flex flex-col gap-1">
                  <a href="https://twitter.com/arkiv" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">X</a>
                  <a href="https://discord.gg/arkiv" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Discord</a>
                  <a href="/#upcoming-events" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Events</a>
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-4 border-t border-white/10 text-center md:text-left">
            <span className="font-mono text-sm text-white leading-tight">© 2025 Arkiv</span>
            <span className="font-mono text-sm text-white leading-tight">All rights reserved</span>
          </div>
        </div>
      </div>
    </section>
  )
}