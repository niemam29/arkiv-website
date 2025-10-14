'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from '@/components/ui/CodeBlock'
import Footer from '@/components/layout/Footer'

export default function GettingStartedPage() {
  const [activeSection, setActiveSection] = useState('setup')

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -80% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const navItems = [
    { id: 'setup', label: 'Setup', icon: '⚙️' },
    { id: 'connect', label: 'Connect', icon: '🔗' },
    { id: 'entities', label: 'Entities', icon: '📄' },
    { id: 'queries', label: 'Queries', icon: '🔍' },
    { id: 'events', label: 'Events', icon: '📡' },
    { id: 'batch', label: 'Batch', icon: '📦' },
    { id: 'btl', label: 'BTL', icon: '⚡' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: '🔧' },
    { id: 'example', label: 'Full Example', icon: '🚀' }
  ]

  return (
    <div className="min-h-screen bg-white pt-28">
      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-[60px] py-12">
          {/* Page Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-block px-4 py-2 bg-[#FE7445] text-white text-sm font-mono rounded-lg shadow-figma-button-primary">
              TypeScript SDK v0.1.16
            </div>
            <h1 className="text-4xl md:text-5xl font-brutal font-black uppercase text-black">Getting Started with Arkiv</h1>
            <p className="text-xl font-mono text-[#1F1F1F] max-w-3xl mx-auto">Build decentralized applications with TypeScript and Arkiv</p>
          </div>

          {/* Sticky Navigation */}
          <div className="sticky top-[88px] z-40 backdrop-blur-md border-b border-stone-300 bg-white/95 -mx-4 px-4 py-3 mb-12">
            <div className="flex items-center gap-4 overflow-x-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all whitespace-nowrap ${
                    activeSection === item.id ? 'bg-[#FE7445] text-white' : 'bg-gray-200 text-black hover:bg-[#FE7445] hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Setup Section */}
          <section id="setup" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Setup & Installation</h2>

            <div className="space-y-6">
              {/* Prerequisites */}
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-4 text-black">Prerequisites</h3>
                <p className="text-stone-900 font-mono text-sm mb-4">
                  What you need before starting (Tested with golem-base-sdk@0.1.16 and Node.js 24.7.0)
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="text-[#FE7445] text-xl">✓</div>
                    <div>
                      <p className="font-mono font-medium text-black">Node.js 18+</p>
                      <p className="text-sm font-mono text-stone-900">Latest LTS version recommended</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-[#FE7445] text-xl">✓</div>
                    <div>
                      <p className="font-mono font-medium text-black">TypeScript 5.0+</p>
                      <p className="text-sm font-mono text-stone-900">For type safety</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-[#FE7445] text-xl">✓</div>
                    <div>
                      <p className="font-mono font-medium text-black">Ethereum Wallet</p>
                      <p className="text-sm font-mono text-stone-900">With Hoodi testnet ETH</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-[#FE7445] text-xl">✓</div>
                    <div>
                      <p className="font-mono font-medium text-black">Test ETH</p>
                      <p className="text-sm font-mono text-stone-900">From Arkiv faucet</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installation */}
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">Installation</h3>
                <CodeBlock
                  code={`# Create project directory
mkdir arkiv-sdk-practice
cd arkiv-sdk-practice

# Initialize project with Bun
bun init -y

# Install dependencies
bun add golem-base-sdk crypto dotenv tslib
bun add -d @types/node @types/bun typescript`}
                  language="bash"
                />
              </div>

              {/* Config Files */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                  <h3 className="text-xl font-brutal font-bold mb-2 text-black">tsconfig.json</h3>
                  <CodeBlock
                    code={`{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["@types/bun"]
  },
  "include": ["*.ts"],
  "exclude": ["node_modules"]
}`}
                    language="json"
                  />
                </div>
                <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                  <h3 className="text-xl font-brutal font-bold mb-2 text-black">package.json</h3>
                  <CodeBlock
                    code={`{
  "name": "arkiv-sdk-practice",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "bun run crud.ts",
    "build": "bun build ./crud.ts --outdir ./dist",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "golem-base-sdk": "^0.1.16",
    "crypto": "^1.0.1",
    "dotenv": "^17.2.1",
    "tslib": "^2.8.1"
  },
  "devDependencies": {
    "@types/bun": "^1.0.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}`}
                    language="json"
                  />
                </div>
              </div>

              {/* Environment Configuration */}
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">Environment Configuration</h3>
                <CodeBlock
                  code={`PRIVATE_KEY=0x...
CHAIN_ID=60138453033
RPC_URL=https://kaolin.hoodi.arkiv.network/rpc
WS_URL=wss://kaolin.hoodi.arkiv.network/rpc/ws`}
                  language="bash"
                />
              </div>
            </div>
          </section>

          {/* Connect Section */}
          <section id="connect" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Connect to Arkiv</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <h3 className="text-xl font-brutal font-bold mb-2 text-black">Basic Connection</h3>
              <CodeBlock
                code={`import { createClient, Tagged, Annotation } from 'golem-base-sdk'
import type { AccountData, GolemBaseClient } from 'golem-base-sdk'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
import { randomUUID } from 'crypto'

// Configure connection from .env
const rawKey = process.env.PRIVATE_KEY ?? '';
const hexKey = rawKey.startsWith('0x') ? rawKey.slice(2) : rawKey;
const key: AccountData = new Tagged(
  "privatekey",
  Buffer.from(hexKey, 'hex')
);
const chainId = Number(process.env.CHAIN_ID)
const rpcUrl = process.env.RPC_URL ?? 'https://kaolin.hoodi.arkiv.network/rpc'
const wsUrl = process.env.WS_URL ?? 'wss://kaolin.hoodi.arkiv.network/rpc/ws'

// TextEncoder and TextDecoder for data conversion
const encoder = new TextEncoder()
const decoder = new TextDecoder()

// Create a client
const client: GolemBaseClient = await createClient(
  chainId,
  key,
  rpcUrl,
  wsUrl
)

console.log("Connected to Arkiv testnet!")`}
                language="typescript"
              />
            </div>
          </section>

          {/* Entities Section */}
          <section id="entities" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Working with Entities</h2>

            <div className="space-y-6">
              {/* Create Entity */}
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">Create Entity</h3>
                <CodeBlock
                  code={`// Create an entity with annotations
const entityId = randomUUID()
const data = {
  message: "Hello from Arkiv",
  timestamp: Date.now(),
  user: "alice"
}

const result = await client.createEntity({
  id: entityId,
  data: encoder.encode(JSON.stringify(data)),
  btl: 300, // Time-to-live in blocks
  stringAnnotations: [
    new Annotation("type", "message"),
    new Annotation("user", "alice"),
    new Annotation("event", "arkiv")
  ]
})

console.log("Entity created:", result.entityKey)`}
                  language="typescript"
                />
              </div>

              {/* Read Entity */}
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">Read Entity</h3>
                <CodeBlock
                  code={`// Get entity by key
const entity = await client.getEntity(result.entityKey)
const entityData = JSON.parse(decoder.decode(entity.data))

console.log("Entity data:", entityData)
console.log("Annotations:", entity.stringAnnotations)`}
                  language="typescript"
                />
              </div>

              {/* Update Entity */}
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">Update Entity</h3>
                <CodeBlock
                  code={`// Update entity data
const updatedData = {
  message: "Updated message from Arkiv",
  timestamp: Date.now(),
  user: "alice",
  updated: true
}

await client.updateEntity({
  entityKey: result.entityKey,
  data: encoder.encode(JSON.stringify(updatedData)),
  btl: 600 // Extended TTL
})

console.log("Entity updated!")`}
                  language="typescript"
                />
              </div>

              {/* Delete Entity */}
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">Delete Entity</h3>
                <CodeBlock
                  code={`// Delete entity
await client.deleteEntity(result.entityKey)

console.log("Entity deleted!")`}
                  language="typescript"
                />
              </div>
            </div>
          </section>

          {/* Queries Section */}
          <section id="queries" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Querying Data</h2>

            <div className="space-y-6">
              {/* Query by Annotations */}
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">Query by Annotations</h3>
                <CodeBlock
                  code={`// Query entities by annotation
const entities = await client.queryEntities({
  annotations: [
    { key: "type", value: "message" },
    { key: "user", value: "alice" }
  ]
})

console.log(\`Found \${entities.length} entities\`)

entities.forEach(entity => {
  const data = JSON.parse(decoder.decode(entity.data))
  console.log("Entity:", data)
})`}
                  language="typescript"
                />
              </div>

              {/* Complex Queries */}
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">Advanced Queries</h3>
                <CodeBlock
                  code={`// Query with multiple conditions
const results = await client.queryEntities({
  annotations: [
    { key: "event", value: "arkiv" }
  ],
  limit: 10,
  offset: 0
})

// Sort and filter locally
const sortedResults = results
  .map(e => ({
    ...e,
    data: JSON.parse(decoder.decode(e.data))
  }))
  .sort((a, b) => b.data.timestamp - a.data.timestamp)

console.log("Latest messages:", sortedResults)`}
                  language="typescript"
                />
              </div>
            </div>
          </section>

          {/* Events Section */}
          <section id="events" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Real-time Events</h2>

            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <h3 className="text-xl font-brutal font-bold mb-2 text-black">Subscribe to Events</h3>
              <CodeBlock
                code={`// Subscribe to entity creation events
const subscription = client.subscribeToEntityCreation({
  annotations: [
    { key: "type", value: "message" }
  ]
}, (entity) => {
  const data = JSON.parse(decoder.decode(entity.data))
  console.log("New entity created:", data)
})

// Unsubscribe after 1 minute
setTimeout(() => {
  subscription.unsubscribe()
  console.log("Unsubscribed from events")
}, 60000)`}
                language="typescript"
              />
            </div>
          </section>

          {/* Batch Operations */}
          <section id="batch" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Batch Operations</h2>

            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <h3 className="text-xl font-brutal font-bold mb-2 text-black">Create Multiple Entities</h3>
              <CodeBlock
                code={`// Batch create entities
const entities = Array.from({ length: 10 }, (_, i) => ({
  id: randomUUID(),
  data: encoder.encode(JSON.stringify({
    message: \`Message \${i + 1}\`,
    timestamp: Date.now(),
    index: i
  })),
  btl: 300,
  stringAnnotations: [
    new Annotation("type", "batch"),
    new Annotation("index", i.toString())
  ]
}))

const results = await Promise.all(
  entities.map(entity => client.createEntity(entity))
)

console.log(\`Created \${results.length} entities\`)`}
                language="typescript"
              />
            </div>
          </section>

          {/* BTL Section */}
          <section id="btl" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Blocks-to-Live (BTL)</h2>

            <div className="space-y-6">
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-4 text-black">Understanding BTL</h3>
                <p className="text-stone-900 font-mono text-sm mb-4">
                  BTL determines how long data lives on Arkiv. Each block is approximately 2 seconds on Arkiv Hoodi testnet.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-mono font-bold text-black mb-1">BTL: 150</p>
                    <p className="text-sm text-stone-900">~5 minutes</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-mono font-bold text-black mb-1">BTL: 1800</p>
                    <p className="text-sm text-stone-900">~1 hour</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-mono font-bold text-black mb-1">BTL: 43200</p>
                    <p className="text-sm text-stone-900">~24 hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">Setting BTL</h3>
                <CodeBlock
                  code={`// Short-lived data (5 minutes)
await client.createEntity({
  id: randomUUID(),
  data: encoder.encode("Temporary data"),
  btl: 150
})

// Medium-lived data (1 hour)
await client.createEntity({
  id: randomUUID(),
  data: encoder.encode("Session data"),
  btl: 1800
})

// Long-lived data (24 hours)
await client.createEntity({
  id: randomUUID(),
  data: encoder.encode("Daily data"),
  btl: 43200
})`}
                  language="typescript"
                />
              </div>
            </div>
          </section>

          {/* Troubleshooting Section */}
          <section id="troubleshooting" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Troubleshooting</h2>

            <div className="space-y-6">
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-4 text-black">Common Issues</h3>

                <div className="space-y-4">
                  <div>
                    <p className="font-mono font-bold text-black mb-2">Connection Error</p>
                    <ul className="list-disc list-inside text-stone-900 font-mono text-sm space-y-1">
                      <li>Verify Arkiv endpoints are correct</li>
                      <li>Check your internet connection</li>
                      <li>Ensure firewall isn't blocking connections</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-mono font-bold text-black mb-2">Transaction Failed</p>
                    <ul className="list-disc list-inside text-stone-900 font-mono text-sm space-y-1">
                      <li>Check your wallet has sufficient test ETH</li>
                      <li>Get test ETH from faucet</li>
                      <li>Verify private key is correctly set</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-mono font-bold text-black mb-2">Entity Not Found</p>
                    <ul className="list-disc list-inside text-stone-900 font-mono text-sm space-y-1">
                      <li>Entity may have expired (BTL reached)</li>
                      <li>Check entity key is correct</li>
                      <li>Verify entity was successfully created</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-4 text-black">Getting Help</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <a
                    href="https://discord.gg/arkiv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <span className="text-xl">💬</span>
                    <span className="font-mono text-sm text-black">Discord</span>
                  </a>
                  <a
                    href="https://github.com/arkiv-network"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <span className="text-xl">📖</span>
                    <span className="font-mono text-sm text-black">Documentation</span>
                  </a>
                  <a
                    href="https://github.com/arkiv-network/arkiv/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <span className="text-xl">🐛</span>
                    <span className="font-mono text-sm text-black">Report Issue</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Full Example Section */}
          <section id="example" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Complete Example</h2>

            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <h3 className="text-xl font-brutal font-bold mb-2 text-black">Full CRUD Application</h3>
              <CodeBlock
                code={`import { createClient, Tagged, Annotation } from 'golem-base-sdk'
import type { AccountData, GolemBaseClient } from 'golem-base-sdk'
import dotenv from 'dotenv'
import { randomUUID } from 'crypto'

dotenv.config()

// Setup
const rawKey = process.env.PRIVATE_KEY ?? '';
const hexKey = rawKey.startsWith('0x') ? rawKey.slice(2) : rawKey;
const key: AccountData = new Tagged("privatekey", Buffer.from(hexKey, 'hex'));
const chainId = Number(process.env.CHAIN_ID)
const rpcUrl = process.env.RPC_URL ?? 'https://kaolin.hoodi.arkiv.network/rpc'
const wsUrl = process.env.WS_URL ?? 'wss://kaolin.hoodi.arkiv.network/rpc/ws'

const encoder = new TextEncoder()
const decoder = new TextDecoder()

async function main() {
  // Connect
  const client: GolemBaseClient = await createClient(chainId, key, rpcUrl, wsUrl)
  console.log("✅ Connected to Arkiv testnet!")

  // Create
  const entityId = randomUUID()
  const data = {
    message: "Hello from Arkiv",
    timestamp: Date.now()
  }

  const createResult = await client.createEntity({
    id: entityId,
    data: encoder.encode(JSON.stringify(data)),
    btl: 300,
    stringAnnotations: [
      new Annotation("type", "demo"),
      new Annotation("event", "arkiv")
    ]
  })
  console.log("✅ Created entity:", createResult.entityKey)

  // Read
  const entity = await client.getEntity(createResult.entityKey)
  const entityData = JSON.parse(decoder.decode(entity.data))
  console.log("✅ Read entity:", entityData)

  // Update
  const updatedData = { ...entityData, updated: true, timestamp: Date.now() }
  await client.updateEntity({
    entityKey: createResult.entityKey,
    data: encoder.encode(JSON.stringify(updatedData)),
    btl: 600
  })
  console.log("✅ Updated entity")

  // Query
  const results = await client.queryEntities({
    annotations: [{ key: "type", value: "demo" }]
  })
  console.log(\`✅ Found \${results.length} entities\`)

  // Delete
  await client.deleteEntity(createResult.entityKey)
  console.log("✅ Deleted entity")
}

main().catch(console.error)`}
                language="typescript"
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
