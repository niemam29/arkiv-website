export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Grid Background */}
      <section className="relative px-4 md:px-[60px] pt-[120px] pb-[64px]">
        {/* Grid Background */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[#F5F5F5] opacity-50">
            <div className="grid grid-cols-12 gap-0 h-full">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="border-r border-gray-300 h-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Orange Accent Box */}
        <div className="absolute top-[200px] left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] bg-[#FE7446] rounded-lg"></div>

        <div className="relative z-10 max-w-[1440px] mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-8">
            <a href="/" className="font-mono text-sm text-gray-600 hover:text-black transition-colors">Home page</a>
            <span className="font-mono text-sm text-gray-600">&lt;</span>
            <a href="/legal" className="font-mono text-sm text-gray-600 hover:text-black transition-colors">Legal</a>
            <span className="font-mono text-sm text-gray-600">&lt;</span>
            <span className="font-mono text-sm text-black">Terms of Use</span>
          </div>

          {/* Main Content */}
          <div className="flex gap-[80px]">
            {/* Sidebar */}
            <aside className="w-[280px] flex-shrink-0">
              <div className="bg-[#EDEDED] p-6 rounded-2xl">
                <h3 className="font-mono text-sm font-medium text-black mb-4 uppercase">OUTLINE</h3>
                <nav className="space-y-3">
                  <a href="#overview" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">I. Overview</a>
                  <a href="#acceptance" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">II. Acceptance</a>
                  <a href="#services" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">III. Services</a>
                  <a href="#warranties" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">IV. Warranties</a>
                  <a href="#liability" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">V. Liability</a>
                  <a href="#responsibilities" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">VI. User Responsibilities</a>
                  <a href="#compliance" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">VII. Compliance</a>
                  <a href="#jurisdiction" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">VIII. Jurisdiction</a>
                </nav>
              </div>
            </aside>

            {/* Article Content */}
            <article className="flex-1 max-w-[600px]">
              <h1 className="font-brutal text-4xl font-black uppercase text-black mb-8 leading-tight">Terms of Use</h1>

              <div className="prose prose-sm max-w-none">
                <p className="font-mono text-base text-black leading-[22px] mb-6">
                  These terms govern your use of Arkiv, a universal data layer for Ethereum that enables queryable, time-scoped, and verifiable database chains.
                </p>

                <section id="overview" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">I. Overview</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    Arkiv is a decentralized data availability and management platform built on Ethereum. The platform enables developers to create and manage database chains (DB-chains) with built-in querying capabilities, time-based data lifecycle management, and cryptographic verification.
                  </p>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    By accessing or using Arkiv services, you acknowledge that you understand the decentralized nature of blockchain technology and the associated risks.
                  </p>
                </section>

                <section id="acceptance" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">II. Acceptance of Terms</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    By using Arkiv services, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
                  </p>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    These terms may be updated from time to time, and continued use of the service constitutes acceptance of any modifications.
                  </p>
                </section>

                <section id="services" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">III. Service Description</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    Arkiv provides:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 font-mono text-base text-black leading-[22px]">
                    <li>Decentralized data storage and management infrastructure</li>
                    <li>Queryable database chains with cryptographic verification</li>
                    <li>Time-scoped data lifecycle management (BTL - Blocks to Live)</li>
                    <li>Developer tools and SDKs for blockchain application development</li>
                    <li>Integration capabilities with Ethereum and compatible networks</li>
                  </ul>
                </section>

                <section id="warranties" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">IV. Disclaimer of Warranties</h2>

                  <div className="bg-[#FFF3E0] border-l-4 border-[#FE7446] p-4 mb-6">
                    <p className="font-mono text-base text-black leading-[22px] font-medium mb-2">
                      ARKIV SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.
                    </p>
                    <p className="font-mono text-sm text-black leading-[20px]">
                      This includes the blockchain infrastructure, smart contracts, and all associated technologies.
                    </p>
                  </div>

                  <h3 className="font-mono text-lg font-medium text-black mb-3">General Service Disclaimers</h3>
                  <ul className="list-disc list-inside space-y-2 mb-4 font-mono text-base text-black leading-[22px]">
                    <li>Continuous availability or uptime of services</li>
                    <li>Data integrity or prevention of data loss</li>
                    <li>Compatibility with all systems or applications</li>
                    <li>Freedom from software defects or security vulnerabilities</li>
                    <li>Performance or speed of transactions</li>
                  </ul>

                  <h3 className="font-mono text-lg font-medium text-black mb-3">Blockchain-Specific Disclaimers</h3>
                  <div className="bg-[#F8F8F8] p-4 rounded-lg mb-4">
                    <ul className="list-disc list-inside space-y-2 font-mono text-base text-black leading-[22px]">
                      <li><strong>Network Congestion:</strong> Transaction delays or failures due to blockchain network conditions</li>
                      <li><strong>Gas Fee Volatility:</strong> Unpredictable transaction costs on Ethereum network</li>
                      <li><strong>Fork Events:</strong> Blockchain splits or protocol changes affecting service</li>
                      <li><strong>Smart Contract Bugs:</strong> Potential vulnerabilities in deployed contracts</li>
                      <li><strong>Key Management:</strong> Loss of private keys or wallet access</li>
                      <li><strong>Regulatory Changes:</strong> Government actions affecting blockchain operations</li>
                      <li><strong>Third-Party Integrations:</strong> Wallet providers, node operators, or other services</li>
                    </ul>
                  </div>

                  <div className="bg-[#E8F5E8] p-4 rounded-lg mb-4">
                    <h4 className="font-mono text-base font-medium text-black mb-2">🔒 Cryptographic Risks</h4>
                    <p className="font-mono text-sm text-black leading-[20px] mb-2">
                      Users acknowledge the inherent risks of cryptographic systems:
                    </p>
                    <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                      <li>Advances in quantum computing potentially compromising encryption</li>
                      <li>Discovery of vulnerabilities in cryptographic algorithms</li>
                      <li>Human error in key generation or management</li>
                      <li>Malicious attacks on cryptographic implementations</li>
                    </ul>
                  </div>
                </section>

                <section id="liability" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">V. Limitation of Liability</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    To the maximum extent permitted by law, Golem Factory GmbH and its affiliates shall not be liable for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 font-mono text-base text-black leading-[22px]">
                    <li>Any direct, indirect, incidental, or consequential damages</li>
                    <li>Loss of profits, data, or business opportunities</li>
                    <li>Damages resulting from network congestion or blockchain issues</li>
                    <li>Financial losses from cryptocurrency or token transactions</li>
                    <li>Security breaches or unauthorized access to user accounts</li>
                  </ul>
                </section>

                <section id="responsibilities" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">VI. User Responsibilities</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    As a user of Arkiv services, you are responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 font-mono text-base text-black leading-[22px]">
                    <li>Maintaining the security of your private keys and wallet credentials</li>
                    <li>Understanding the risks associated with blockchain technology</li>
                    <li>Complying with all applicable laws and regulations</li>
                    <li>Ensuring the legality of data stored on Arkiv</li>
                    <li>Managing your own data backup and recovery strategies</li>
                    <li>Understanding transaction fees and network costs</li>
                  </ul>
                </section>

                <section id="compliance" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">VII. Regulatory Compliance</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    Blockchain technology and cryptocurrency regulations are evolving rapidly. We are committed to operating in compliance with applicable laws and may:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 font-mono text-base text-black leading-[22px]">
                    <li>Modify services to comply with new regulations</li>
                    <li>Require additional verification or documentation</li>
                    <li>Restrict access in certain jurisdictions</li>
                    <li>Cooperate with regulatory authorities when legally required</li>
                  </ul>
                </section>

                <section id="force-majeure" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">VIII. Force Majeure</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    We shall not be liable for any failure or delay in performance under these Terms due to circumstances beyond our reasonable control, including but not limited to:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-[#F8F8F8] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">Traditional Force Majeure</h4>
                      <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                        <li>Natural disasters</li>
                        <li>Acts of war or terrorism</li>
                        <li>Government actions or regulations</li>
                        <li>Labor strikes or disputes</li>
                        <li>Internet infrastructure failures</li>
                      </ul>
                    </div>
                    <div className="bg-[#FFF3E0] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">Blockchain-Specific Events</h4>
                      <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                        <li>Ethereum network congestion or failures</li>
                        <li>Blockchain forks or protocol changes</li>
                        <li>Smart contract vulnerabilities or exploits</li>
                        <li>Cryptocurrency exchange outages</li>
                        <li>Consensus mechanism failures</li>
                      </ul>
                    </div>
                  </div>

                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    During force majeure events, we will make reasonable efforts to minimize service disruption and communicate updates to users. Our obligations will be suspended until the force majeure event ends.
                  </p>
                </section>

                <section id="jurisdiction" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">IX. Governing Law and Jurisdiction</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    These Terms of Use shall be governed by and construed in accordance with the laws of Switzerland, without regard to its conflict of law provisions.
                  </p>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    Any disputes arising from these terms or your use of Arkiv services shall be subject to the exclusive jurisdiction of the courts of Zug, Switzerland.
                  </p>

                  <div className="bg-[#E8F5E8] p-4 rounded-lg mb-4">
                    <h4 className="font-mono text-base font-medium text-black mb-2">🤝 Alternative Dispute Resolution</h4>
                    <p className="font-mono text-sm text-black leading-[20px]">
                      Before initiating formal legal proceedings, parties agree to attempt resolution through good faith negotiations for 30 days. For blockchain-specific disputes, we recommend consultation with experts familiar with distributed ledger technology.
                    </p>
                  </div>

                  <p className="font-mono text-base text-black leading-[22px] mb-6">
                    <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </section>
              </div>

              {/* Other Articles Button */}
              <div className="mt-12">
                <a href="/legal" className="inline-block bg-[#1F1F1F] text-white px-6 py-3 rounded-lg font-mono text-sm hover:bg-gray-800 transition-colors">
                  Other articles
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}