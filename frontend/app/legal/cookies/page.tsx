export default function CookiePolicy() {
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
            <a href="/" className="font-mono text-sm text-gray-600 hover:text-black transition-colors">
              Home page
            </a>
            <span className="font-mono text-sm text-gray-600">&lt;</span>
            <a href="/legal" className="font-mono text-sm text-gray-600 hover:text-black transition-colors">
              Legal
            </a>
            <span className="font-mono text-sm text-gray-600">&lt;</span>
            <span className="font-mono text-sm text-black">Cookie Policy</span>
          </div>

          {/* Main Content */}
          <div className="flex gap-[80px]">
            {/* Sidebar */}
            <aside className="w-[280px] flex-shrink-0">
              <div className="bg-[#EDEDED] p-6 rounded-2xl">
                <h3 className="font-mono text-sm font-medium text-black mb-4 uppercase">OUTLINE</h3>
                <nav className="space-y-3">
                  <a href="#overview" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">
                    I. Overview
                  </a>
                  <a href="#types" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">
                    II. Cookie Types
                  </a>
                  <a href="#technical" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">
                    III. Technical Cookies
                  </a>
                  <a href="#third-party" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">
                    IV. Third-Party Cookies
                  </a>
                  <a href="#management" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">
                    V. Cookie Management
                  </a>
                  <a href="#consent" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">
                    VI. Consent
                  </a>
                  <a href="#updates" className="block font-mono text-sm text-gray-700 hover:text-black transition-colors">
                    VII. Policy Updates
                  </a>
                </nav>
              </div>
            </aside>

            {/* Article Content */}
            <article className="flex-1 max-w-[600px]">
              <h1 className="font-brutal text-4xl font-black uppercase text-black mb-8 leading-tight">Cookie Policy</h1>

              <div className="prose prose-sm max-w-none">
                <p className="font-mono text-base text-black leading-[22px] mb-6">
                  This Cookie Policy explains how Arkiv uses cookies and similar tracking technologies when you visit our website and use
                  our services.
                </p>

                <section id="overview" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">I. What Are Cookies</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow us
                    to provide more user-friendly services and recognize individual browser preferences.
                  </p>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    Cookies help us understand how you interact with our website, improve your browsing experience, and provide personalized
                    content and services.
                  </p>
                </section>

                <section id="types" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">II. Types of Cookies</h2>

                  <h3 className="font-mono text-lg font-medium text-black mb-3">Session Cookies</h3>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    These cookies temporarily store information during your website navigation session. They are automatically deleted when
                    you close your browser.
                  </p>

                  <h3 className="font-mono text-lg font-medium text-black mb-3">Persistent Cookies</h3>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    These cookies store preferences for future website visits and remain on your device until they expire or are manually
                    deleted. They help us remember your settings and preferences.
                  </p>
                </section>

                <section id="technical" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">III. Cookie Categories</h2>

                  <div className="space-y-4 mb-6">
                    <div className="bg-[#E8F5E8] p-4 rounded-lg">
                      <h3 className="font-mono text-lg font-medium text-black mb-3">🔒 Strictly Necessary Cookies</h3>
                      <p className="font-mono text-base text-black leading-[22px] mb-2">
                        These cookies are essential for the website to function properly and cannot be disabled.
                      </p>
                      <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                        <li>User authentication and session management</li>
                        <li>Security features and fraud prevention</li>
                        <li>Load balancing and network management</li>
                        <li>Accessibility features</li>
                      </ul>
                      <p className="font-mono text-xs text-gray-600 mt-2">
                        <strong>Legal Basis:</strong> Legitimate interest (website functionality)
                      </p>
                    </div>

                    <div className="bg-[#F0F8FF] p-4 rounded-lg">
                      <h3 className="font-mono text-lg font-medium text-black mb-3">⚙️ Functional Cookies (Consent Required)</h3>
                      <p className="font-mono text-base text-black leading-[22px] mb-2">
                        These cookies enhance website functionality and personalization.
                      </p>
                      <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                        <li>Language and region preferences</li>
                        <li>Theme and display settings</li>
                        <li>Form data persistence</li>
                        <li>User interface customizations</li>
                      </ul>
                      <p className="font-mono text-xs text-gray-600 mt-2">
                        <strong>Legal Basis:</strong> User consent
                      </p>
                    </div>

                    <div className="bg-[#FFF3E0] p-4 rounded-lg">
                      <h3 className="font-mono text-lg font-medium text-black mb-3">📊 Analytics Cookies (Consent Required)</h3>
                      <p className="font-mono text-base text-black leading-[22px] mb-2">
                        These cookies collect anonymized information about website usage.
                      </p>
                      <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                        <li>Page views and user journey tracking</li>
                        <li>Performance monitoring and optimization</li>
                        <li>Error tracking and debugging</li>
                        <li>A/B testing and feature usage analytics</li>
                      </ul>
                      <p className="font-mono text-xs text-gray-600 mt-2">
                        <strong>Legal Basis:</strong> User consent
                      </p>
                    </div>

                    <div className="bg-[#F8F8F8] p-4 rounded-lg">
                      <h3 className="font-mono text-lg font-medium text-black mb-3">🎯 Marketing Cookies (Consent Required)</h3>
                      <p className="font-mono text-base text-black leading-[22px] mb-2">
                        These cookies are used for advertising and marketing purposes.
                      </p>
                      <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                        <li>Behavioral targeting and remarketing</li>
                        <li>Cross-site tracking for ad personalization</li>
                        <li>Conversion tracking and attribution</li>
                        <li>Social media integration</li>
                      </ul>
                      <p className="font-mono text-xs text-gray-600 mt-2">
                        <strong>Legal Basis:</strong> User consent
                      </p>
                    </div>
                  </div>
                </section>

                <section id="third-party" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">IV. Third-Party Cookies</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">We may use third-party cookies for:</p>
                  <ul className="list-disc list-inside space-y-2 mb-4 font-mono text-base text-black leading-[22px]">
                    <li>
                      <strong>Analytics tracking:</strong> To understand website usage patterns
                    </li>
                    <li>
                      <strong>Heat mapping:</strong> To analyze user behavior and interaction patterns
                    </li>
                    <li>
                      <strong>Session recording:</strong> To improve user experience and identify issues
                    </li>
                    <li>
                      <strong>Performance monitoring:</strong> To ensure optimal website functionality
                    </li>
                  </ul>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    These third-party services may collect and process data according to their own privacy policies.
                  </p>
                </section>

                <section id="management" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">V. Cookie Management and Consent</h2>

                  <div className="bg-[#E8F5E8] p-4 rounded-lg mb-6">
                    <h3 className="font-mono text-lg font-medium text-black mb-3">📋 Cookie Consent Management</h3>
                    <p className="font-mono text-base text-black leading-[22px] mb-2">
                      When you first visit our website, you'll see a cookie consent banner with granular options:
                    </p>
                    <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                      <li>
                        <strong>Accept All:</strong> Consent to all cookie categories
                      </li>
                      <li>
                        <strong>Reject All:</strong> Only strictly necessary cookies will be used
                      </li>
                      <li>
                        <strong>Customize Settings:</strong> Choose specific cookie categories
                      </li>
                      <li>
                        <strong>Cookie Settings:</strong> Access detailed preferences at any time
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#F0F8FF] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">✅ GDPR-Compliant Consent</h4>
                      <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                        <li>Freely given and specific</li>
                        <li>Informed and unambiguous</li>
                        <li>Easily withdrawable</li>
                        <li>Granular cookie category control</li>
                        <li>No pre-ticked boxes</li>
                      </ul>
                    </div>
                    <div className="bg-[#FFF3E0] p-4 rounded-lg">
                      <h4 className="font-mono text-base font-medium text-black mb-2">🔄 Consent Management</h4>
                      <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                        <li>Change preferences anytime</li>
                        <li>Clear consent withdrawal process</li>
                        <li>Consent logging for compliance</li>
                        <li>Regular consent renewal prompts</li>
                        <li>Cookie preference center access</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#FFF3E0] border-l-4 border-[#FE7446] p-4 mb-6">
                    <h4 className="font-mono text-base font-medium text-black mb-2">⚠️ Important Cookie Limitations</h4>
                    <p className="font-mono text-base text-black leading-[22px] mb-2">
                      <strong>Blockchain-Related Considerations:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 font-mono text-sm text-black leading-[20px]">
                      <li>Disabling cookies may affect blockchain wallet connections</li>
                      <li>Transaction history may still be publicly visible on blockchain</li>
                      <li>Some DApp functionality requires session persistence</li>
                      <li>Security features may be compromised without necessary cookies</li>
                    </ul>
                  </div>

                  <h3 className="font-mono text-lg font-medium text-black mb-3">🔧 Browser-Level Cookie Control</h3>
                  <div className="bg-[#F8F8F8] p-4 rounded-lg mb-4">
                    <p className="font-mono text-base text-black leading-[22px] mb-2">
                      Most browsers allow cookie control through settings:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-mono text-sm font-medium text-black mb-1">Chrome/Edge:</h5>
                        <p className="font-mono text-xs text-gray-600">Settings → Privacy and Security → Cookies</p>
                      </div>
                      <div>
                        <h5 className="font-mono text-sm font-medium text-black mb-1">Firefox:</h5>
                        <p className="font-mono text-xs text-gray-600">Options → Privacy & Security → Cookies</p>
                      </div>
                      <div>
                        <h5 className="font-mono text-sm font-medium text-black mb-1">Safari:</h5>
                        <p className="font-mono text-xs text-gray-600">Preferences → Privacy → Cookies</p>
                      </div>
                      <div>
                        <h5 className="font-mono text-sm font-medium text-black mb-1">Mobile:</h5>
                        <p className="font-mono text-xs text-gray-600">Browser settings → Privacy → Cookies</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="consent" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">VI. Consent and Withdrawal</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    By continuing to use our website after being informed about cookie usage, you consent to our use of cookies as described
                    in this policy.
                  </p>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">You can withdraw your consent at any time by:</p>
                  <ul className="list-disc list-inside space-y-2 mb-4 font-mono text-base text-black leading-[22px]">
                    <li>Adjusting your browser settings to block cookies</li>
                    <li>Using our cookie preference center (if available)</li>
                    <li>Clearing your browser's cookie storage</li>
                    <li>Contacting us directly at privacy@golem.network</li>
                  </ul>
                </section>

                <section id="updates" className="mb-8">
                  <h2 className="font-mono text-xl font-medium text-black mb-4">VII. Policy Updates</h2>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. Material
                    changes will be communicated through website notifications or other appropriate means.
                  </p>
                  <p className="font-mono text-base text-black leading-[22px] mb-4">
                    We recommend reviewing this policy periodically to stay informed about our cookie practices.
                  </p>
                  <p className="font-mono text-base text-black leading-[22px] mb-6">
                    <strong>Last updated:</strong>{' '}
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </section>
              </div>

              {/* Other Articles Button */}
              <div className="mt-12">
                <a
                  href="/legal"
                  className="inline-block bg-[#1F1F1F] text-white px-6 py-3 rounded-lg font-mono text-sm hover:bg-gray-800 transition-colors"
                >
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
