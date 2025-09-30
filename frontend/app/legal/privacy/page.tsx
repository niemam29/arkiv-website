export default function PrivacyPolicy() {
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
            <span className="font-mono text-sm text-black">Privacy Policy</span>
          </div>

          {/* Main Content */}
          <div className="flex gap-[80px]">
            {/* Sidebar */}
            <aside className="w-[280px] flex-shrink-0">
              <div className="bg-[#EDEDED] p-6 rounded-2xl">
                <h3 className="font-mono text-sm font-medium text-black mb-4 uppercase">OUTLINE</h3>
                <nav className="space-y-3">
                  <a href="#controller" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">I. Controller</a>
                  <a href="#overview" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">II. Overview</a>
                  <a href="#legal-basis" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">III. Legal Basis</a>
                  <a href="#processing" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">IV. Data Processing</a>
                  <a href="#rights" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">V. Your Rights</a>
                  <a href="#storage" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">VI. Data Storage</a>
                  <a href="#transfers" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">VII. Data Transfers</a>
                  <a href="#updates" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">VIII. Policy Updates</a>
                </nav>
              </div>
            </aside>

            {/* Article Content */}
            <article className="flex-1 max-w-[600px]">
              <h1 className="font-brutal text-4xl font-black uppercase text-black mb-8 leading-tight">Privacy Policy</h1>

              <div className="prose prose-sm max-w-none">
                <p className="font-mono text-base text-black leading-[22px] mb-6">
                  We are committed to protecting your privacy and ensuring transparency in how we collect, use, and protect your personal information when you use Arkiv services.
                </p>

                <section id="controller" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">I. Controller</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    The data controller responsible for processing your personal data is:
                  </p>
                  <div className="bg-[#F8F8F8] p-4 rounded-lg mb-4">
                    <p className="font-mono text-sm text-black leading-[20px]">
                      <strong>Golem Factory GmbH</strong><br />
                      Gartenstrasse 5<br />
                      6300 Zug, Switzerland<br />
                      Email: privacy@golem.network<br />
                      <strong>Data Protection Officer:</strong> Available upon request via privacy@golem.network
                    </p>
                  </div>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    <strong>EU Representative:</strong> For data subjects in the European Union, you may contact our EU representative at privacy@golem.network.
                  </p>
                </section>

                <section id="overview" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">II. Overview</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    This privacy policy explains how we process personal data in connection with Arkiv, our universal data layer for Ethereum. We are committed to protecting your privacy and complying with applicable data protection laws, including the General Data Protection Regulation (GDPR) and the Swiss Federal Act on Data Protection (FADP).
                  </p>

                  <div className="bg-[#FFF3E0] border-l-4 border-[#FE7446] p-4 mb-4">
                    <h3 className="font-mono text-lg font-medium text-black mb-2">Important Notice About Blockchain Technology</h3>
                    <p className="font-mono text-base text-black leading-[22px] mb-2">
                      Arkiv uses blockchain technology, which creates permanent, immutable records. <strong>Once data is written to the blockchain, it cannot be deleted or modified.</strong> This may limit our ability to fulfill certain data subject rights, particularly the right to erasure ("right to be forgotten").
                    </p>
                    <p className="font-mono text-base text-black leading-[22px]">
                      We implement privacy-by-design principles and store minimal personal data on-chain, using off-chain storage and cryptographic techniques where personal data processing is required.
                    </p>
                  </div>

                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    We collect and process only the data necessary to provide our services, improve user experience, and comply with legal obligations.
                  </p>
                </section>

                <section id="legal-basis" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">III. Legal Basis for Processing</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    We process personal data based on the following legal grounds:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 font-mono text-base text-black leading-[22px]">
                    <li><strong>Consent:</strong> When you explicitly agree to data processing</li>
                    <li><strong>Contract performance:</strong> To provide Arkiv services you've requested</li>
                    <li><strong>Legal obligations:</strong> To comply with applicable laws and regulations</li>
                    <li><strong>Legitimate interests:</strong> For service improvement and security purposes</li>
                  </ul>
                </section>

                <section id="processing" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">IV. Data Processing Activities</h2>

                  <h3 className="font-mono text-lg font-medium text-black mb-3">Website Usage</h3>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    When you visit our website, we automatically collect technical information including IP addresses, browser types, device information, and usage patterns to ensure website functionality and security. This data is stored for a maximum of 30 days and processed based on our legitimate interest in maintaining website security and functionality.
                  </p>

                  <h3 className="font-mono text-lg font-medium text-black mb-3">Blockchain Address Processing</h3>
                  <div className="bg-[#F8F8F8] p-4 rounded-lg mb-4">
                    <p className="font-mono text-base text-black leading-[22px] mb-2">
                      <strong>Data Categories:</strong> Wallet addresses, transaction hashes, block numbers, timestamps, gas fees, and smart contract interaction data.
                    </p>
                    <p className="font-mono text-base text-black leading-[22px] mb-2">
                      <strong>Legal Basis:</strong> Contract performance (to provide Arkiv services) and legitimate interest (network security and fraud prevention).
                    </p>
                    <p className="font-mono text-base text-black leading-[22px]">
                      <strong>Classification:</strong> Blockchain addresses are pseudonymous identifiers that may constitute personal data when they can be linked to an identifiable person through additional information.
                    </p>
                  </div>

                  <h3 className="font-mono text-lg font-medium text-black mb-3">On-Chain vs Off-Chain Data</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-[#E8F5E8] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">On-Chain Data</h4>
                      <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                        <li>Cryptographic hashes</li>
                        <li>Transaction metadata</li>
                        <li>Smart contract addresses</li>
                        <li>Block timestamps</li>
                      </ul>
                      <p className="font-mono text-xs text-gray-600 mt-2"><strong>Retention:</strong> Permanent (blockchain immutability)</p>
                    </div>
                    <div className="bg-[#F0F8FF] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">Off-Chain Data</h4>
                      <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                        <li>Account preferences</li>
                        <li>Communication data</li>
                        <li>Support interactions</li>
                        <li>Analytics data</li>
                      </ul>
                      <p className="font-mono text-xs text-gray-600 mt-2"><strong>Retention:</strong> Variable (can be deleted)</p>
                    </div>
                  </div>

                  <h3 className="font-mono text-lg font-medium text-black mb-3">Smart Contract Processing</h3>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    Smart contracts on Arkiv may automatically process data according to their programmed logic. This processing occurs without human intervention and is necessary for contract execution. Users should review smart contract code before interaction to understand automated processing implications.
                  </p>

                  <h3 className="font-mono text-lg font-medium text-black mb-3">Communication and Support</h3>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    If you contact us or subscribe to updates, we process contact information and communication content to respond to inquiries and provide requested information. This data is retained for up to 3 years based on legal obligations and legitimate business interests.
                  </p>
                </section>

                <section id="rights" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">V. Your Rights</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    Under applicable data protection laws, you have the following rights. Please note that blockchain technology limitations may affect our ability to fulfill certain requests for on-chain data:
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-[#F8F8F8] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">✅ Right to Access</h4>
                      <p className="font-mono text-sm text-black leading-[20px]">
                        You can request information about your personal data processing. For blockchain data, this includes publicly visible transaction information.
                      </p>
                    </div>

                    <div className="bg-[#F8F8F8] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">✅ Right to Rectification</h4>
                      <p className="font-mono text-sm text-black leading-[20px]">
                        We can correct inaccurate off-chain data. For on-chain data, we can provide supplementary information but cannot modify blockchain records.
                      </p>
                    </div>

                    <div className="bg-[#FFF3E0] border-l-4 border-[#FE7446] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">⚠️ Right to Erasure (Limited)</h4>
                      <p className="font-mono text-sm text-black leading-[20px] mb-2">
                        <strong>Off-chain data:</strong> Can be deleted upon request where legally permissible.
                      </p>
                      <p className="font-mono text-sm text-black leading-[20px]">
                        <strong>On-chain data:</strong> Cannot be deleted due to blockchain immutability. We can anonymize our records linking blockchain addresses to your identity.
                      </p>
                    </div>

                    <div className="bg-[#F8F8F8] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">✅ Right to Restrict Processing</h4>
                      <p className="font-mono text-sm text-black leading-[20px]">
                        We can restrict processing of off-chain personal data. Blockchain processing cannot be restricted as it operates autonomously.
                      </p>
                    </div>

                    <div className="bg-[#F8F8F8] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">✅ Right to Data Portability</h4>
                      <p className="font-mono text-sm text-black leading-[20px]">
                        Available for off-chain data in structured formats. Blockchain data is inherently portable through public blockchain explorers.
                      </p>
                    </div>

                    <div className="bg-[#F8F8F8] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">✅ Right to Object</h4>
                      <p className="font-mono text-sm text-black leading-[20px]">
                        You can object to processing based on legitimate interests. Note that essential blockchain operations cannot be objected to as they're necessary for service provision.
                      </p>
                    </div>

                    <div className="bg-[#F8F8F8] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">✅ Right to Withdraw Consent</h4>
                      <p className="font-mono text-sm text-black leading-[20px]">
                        You can withdraw consent for future processing. Past blockchain transactions cannot be reversed, but future processing can be stopped.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#E8F5E8] p-4 rounded-lg mb-4">
                    <h4 className="font-mono text-base font-medium text-black mb-2">How to Exercise Your Rights</h4>
                    <p className="font-mono text-sm text-black leading-[20px] mb-2">
                      Contact us at <strong>privacy@golem.network</strong> with:
                    </p>
                    <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                      <li>Your specific request and preferred outcome</li>
                      <li>Wallet address(es) or account identifiers (if applicable)</li>
                      <li>Proof of identity (to prevent unauthorized requests)</li>
                      <li>Timeframe for response (we respond within 30 days)</li>
                    </ul>
                  </div>

                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    <strong>Right to Lodge a Complaint:</strong> You have the right to lodge a complaint with the Swiss Federal Data Protection and Information Commissioner (FDPIC) or your local data protection authority.
                  </p>
                </section>

                <section id="storage" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">VI. Data Storage and Retention</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#F0F8FF] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">Off-Chain Data Retention</h4>
                      <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                        <li><strong>Website data:</strong> 30 days</li>
                        <li><strong>Support communications:</strong> 3 years</li>
                        <li><strong>Account preferences:</strong> Until account deletion</li>
                        <li><strong>Analytics data:</strong> 26 months (GDPR compliant)</li>
                      </ul>
                    </div>
                    <div className="bg-[#FFF3E0] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">On-Chain Data Retention</h4>
                      <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                        <li><strong>Transaction data:</strong> Permanent</li>
                        <li><strong>Smart contract interactions:</strong> Permanent</li>
                        <li><strong>Blockchain addresses:</strong> Permanent</li>
                        <li><strong>Cryptographic hashes:</strong> Permanent</li>
                      </ul>
                    </div>
                  </div>

                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    We retain personal data only as long as necessary for the purposes for which it was collected or as required by law. Blockchain data cannot be deleted due to the immutable nature of distributed ledger technology.
                  </p>

                  <div className="bg-[#F8F8F8] p-4 rounded-lg mb-4">
                    <p className="font-mono text-sm text-black leading-[20px]">
                      <strong>Data Minimization Strategy:</strong> We implement privacy-by-design principles to minimize personal data stored on-chain, using techniques such as hashing, encryption, and off-chain storage for sensitive information.
                    </p>
                  </div>
                </section>

                <section id="transfers" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">VII. International Data Transfers</h2>

                  <div className="bg-[#E8F5E8] p-4 rounded-lg mb-4">
                    <h4 className="font-mono text-base font-medium text-black mb-2">Blockchain Network Considerations</h4>
                    <p className="font-mono text-sm text-black leading-[20px]">
                      Blockchain networks are inherently global and decentralized. Data on Arkiv may be processed by network nodes worldwide, including outside the EEA. This is necessary for blockchain functionality and network security.
                    </p>
                  </div>

                  <h4 className="font-mono text-base font-medium text-black mb-2">Safeguards for Data Transfers</h4>
                  <ul className="list-disc list-inside space-y-2 mb-4 font-mono text-base text-black leading-[22px]">
                    <li><strong>Standard Contractual Clauses (SCCs):</strong> For transfers to third-party service providers</li>
                    <li><strong>Adequacy Decisions:</strong> Transfers to countries with adequate data protection (e.g., Switzerland, UK)</li>
                    <li><strong>Consent:</strong> Explicit user consent for specific data transfers where required</li>
                    <li><strong>Derogations:</strong> Contract performance necessity for essential blockchain operations</li>
                  </ul>

                  <div className="bg-[#F8F8F8] p-4 rounded-lg mb-4">
                    <h4 className="font-mono text-base font-medium text-black mb-2">Third-Party Service Providers</h4>
                    <p className="font-mono text-sm text-black leading-[20px] mb-2">
                      We may share data with carefully selected service providers for:
                    </p>
                    <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                      <li>Infrastructure hosting and maintenance</li>
                      <li>Analytics and performance monitoring</li>
                      <li>Customer support and communication</li>
                      <li>Security and fraud prevention</li>
                    </ul>
                    <p className="font-mono text-sm text-gray-600 mt-2">
                      All providers are contractually required to provide adequate data protection.
                    </p>
                  </div>
                </section>

                <section id="updates" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">VIII. Policy Updates</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    We may update this privacy policy from time to time. Material changes will be communicated through our website or other appropriate means. The effective date of the current policy is displayed at the top of this document.
                  </p>
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