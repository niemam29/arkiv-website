export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Arkiv',
    alternateName: 'Golem Network Arkiv',
    url: 'https://moon.dev.golem.network:8765',
    logo: 'https://moon.dev.golem.network:8765/images/arkiv-logo.svg',
    description: 'Universal data layer for Ethereum with queryable, time-scoped, and verifiable database chains',
    foundingDate: '2024',
    founder: {
      '@type': 'Organization',
      name: 'Golem Network'
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Golem Network',
      url: 'https://golem.network'
    },
    industry: 'Blockchain Technology',
    keywords: 'blockchain, ethereum, database, data layer, web3, decentralized',
    sameAs: ['https://github.com/arkiv-network', 'https://twitter.com/golemproject', 'https://discord.gg/arkiv']
  }

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Arkiv',
    description: 'Universal data layer for Ethereum that introduces data as a first-class citizen on blockchain',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    creator: {
      '@type': 'Organization',
      name: 'Golem Network'
    },
    featureList: [
      'Queryable database chains',
      'Time-scoped data storage',
      'Verifiable data layer',
      'Ethereum-aligned architecture',
      'Cost-efficient data management',
      'Trustless by default'
    ]
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Arkiv',
    url: 'https://moon.dev.golem.network:8765',
    description: 'Universal data layer for Ethereum',
    publisher: {
      '@type': 'Organization',
      name: 'Golem Network'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://moon.dev.golem.network:8765/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://moon.dev.golem.network:8765'
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  )
}
