export default function LegalIndex() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-4 md:px-[60px] pt-[120px] pb-[64px]">
        <div className="relative z-10 max-w-[1440px] mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-8">
            <a href="/" className="font-mono text-sm text-gray-600 hover:text-black transition-colors">
              Home page
            </a>
            <span className="font-mono text-sm text-gray-600">&lt;</span>
            <span className="font-mono text-sm text-black">Legal</span>
          </div>

          {/* Main Content */}
          <div className="max-w-[800px]">
            <h1 className="font-brutal text-4xl font-black uppercase text-black mb-8 leading-tight">Legal Documents</h1>

            <p className="font-mono text-base text-black leading-[22px] mb-12">
              Find all legal documents and policies related to your use of Arkiv services. These documents outline your rights,
              responsibilities, and how we handle your data.
            </p>

            {/* Legal Documents Grid */}
            <div className="grid gap-6">
              {/* Privacy Policy */}
              <a
                href="/legal/privacy"
                className="group bg-[#EDEDED] p-6 rounded-2xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] hover:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)] transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-mono text-xl font-medium text-black mb-2 group-hover:text-gray-800 transition-colors">
                      Privacy Policy
                    </h3>
                    <p className="font-mono text-base text-gray-700 leading-[22px] mb-4">
                      Learn how we collect, use, and protect your personal information when you use Arkiv services.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-600">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="ml-6 opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>

              {/* Terms of Use */}
              <a
                href="/legal/terms"
                className="group bg-[#EDEDED] p-6 rounded-2xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] hover:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)] transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-mono text-xl font-medium text-black mb-2 group-hover:text-gray-800 transition-colors">
                      Terms of Use
                    </h3>
                    <p className="font-mono text-base text-gray-700 leading-[22px] mb-4">
                      Understand the terms and conditions that govern your use of Arkiv platform and services.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-600">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="ml-6 opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>

              {/* Cookie Policy */}
              <a
                href="/legal/cookies"
                className="group bg-[#EDEDED] p-6 rounded-2xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] hover:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)] transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-mono text-xl font-medium text-black mb-2 group-hover:text-gray-800 transition-colors">
                      Cookie Policy
                    </h3>
                    <p className="font-mono text-base text-gray-700 leading-[22px] mb-4">
                      Discover how we use cookies and similar technologies to improve your browsing experience.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-600">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="ml-6 opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-[#F8F8F8] p-6 rounded-2xl">
              <h3 className="font-mono text-lg font-medium text-black mb-4">Questions About Our Legal Documents?</h3>
              <p className="font-mono text-base text-gray-700 leading-[22px] mb-4">
                If you have any questions about these legal documents or need clarification about your rights and responsibilities, please
                contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:privacy@golem.network"
                  className="inline-flex items-center gap-2 bg-[#1F1F1F] text-white px-4 py-2 rounded-lg font-mono text-sm hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact Legal Team
                </a>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 bg-white border border-gray-300 text-black px-4 py-2 rounded-lg font-mono text-sm hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
