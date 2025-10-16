'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { CodeBlock } from "@/components/ui/CodeBlock"

const docsNavigation = [
  {
    id: 'overview',
    name: 'Overview',
    description: 'Introduction to Arkiv and its architecture'
  },
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Quick start guides for developers'
  },
  {
    id: 'sdk',
    name: 'SDKs',
    description: 'TypeScript and Python SDKs'
  },
  {
    id: 'api',
    name: 'API Reference',
    description: 'JSON-RPC API documentation'
  },
  {
    id: 'guides',
    name: 'Guides',
    description: 'Step-by-step tutorials and examples'
  }
]

const overviewContent = {
  title: 'Arkiv Documentation',
  content: `
# What is Arkiv?

Arkiv is a decentralized data layer that brings queryable, time-scoped storage to Ethereum. It enables developers to store, query, and manage data with built-in expiration and annotation systems.

## Why Arkiv?

Arkiv treats data as a first-class citizen on Ethereum:

**Instant Queries** — SQL-like queries with annotations, real-time data retrieval, no external indexing required.

**Cost-Efficient** — Pay only for storage duration (Expires In), automatic data pruning, no permanent storage fees.

**Ethereum-Native** — Built on Ethereum infrastructure, fully transparent and verifiable, compatible with existing Web3 tools.

**Developer-Friendly** — Simple CRUD operations, TypeScript SDK with full type safety, real-time event streaming.

## Architecture

Arkiv uses a three-layer architecture:

**Layer 1: Ethereum Mainnet**
Final settlement and security. Proof verification, commitments, and ultimate source of truth.

**Layer 2: Arkiv Coordination Layer**
Data management and registry. DB-chain coordination, cross-chain synchronization, deterministic query resolution.

**Layer 3: Specialized DB-Chains**
High-performance data operations. CRUD via JSON-RPC, indexed queries with annotations, programmable expiration (Expires In).

## Use Cases

**Temporary Data Storage** — Session data with automatic expiration, cross-device clipboards, cached API responses.

**Event & Analytics** — Application logs with cleanup, user activity tracking, temporary metrics.

**File & Media** — Image metadata with expiration, document versioning, chunked file storage.

**Real-Time Apps** — Live chat, collaborative tools, IoT data streams.

## Core Concepts

**Entities** — Data records containing content, annotations, and expiration time.

**Annotations** — Key-value pairs for querying. String annotations like \`type = "note"\` or numeric like \`priority = 5\`.

**Expires In** — Automatic expiration:
- \`900\` blocks ≈ 30 minutes
- \`43200\` blocks ≈ 24 hours
- \`302400\` blocks ≈ 7 days

**Query Language** — SQL-like syntax:
\`\`\`sql
type = "note" && priority > 3 && created > 1672531200
\`\`\`

## Testnet Access

**Chain ID:** \`60138453033\`
**RPC URL:** \`https://kaolin.hoodi.arkiv.network/rpc\`
**WebSocket:** \`wss://kaolin.hoodi.arkiv.network/rpc/ws\`
**Faucet:** [Get Test ETH](https://kaolin.hoodi.arkiv.network/faucet/)
**Explorer:** [View Transactions](https://explorer.kaolin.hoodi.arkiv.network)

Quick example:

\`\`\`typescript
import { createClient, Annotation } from 'arkiv-sdk'

const client = await createClient(
  60138453033,
  "YOUR_PRIVATE_KEY",
  "https://kaolin.hoodi.arkiv.network/rpc",
  "wss://kaolin.hoodi.arkiv.network/rpc/ws"
)

const receipt = await client.createEntities([{
  data: new TextEncoder().encode("Hello Arkiv!"),
  expires_in: 1800,
  stringAnnotations: [new Annotation("type", "greeting")],
  numericAnnotations: []
}])

console.log("Stored:", receipt[0].entityKey)
\`\`\`

## Next Steps

1. [Getting Started](/getting-started) — Set up your dev environment
2. [SDK Reference](#sdk) — TypeScript and Python SDKs
3. [API Docs](#api) — JSON-RPC interface
4. [Guides](#guides) — Build real applications

**Resources:**
[Playground](/playground) — Interactive examples
[Discord](https://discord.gg/arkiv) — Community support
`
}

const gettingStartedContent = {
  title: 'Getting Started',
  content: `
# Quickstart

## TypeScript SDK
[TypeScript Quickstart](/getting-started/typescript) — Full setup in under 10 minutes.

## Python SDK
[Python Quickstart](/getting-started/python) — Get up and running with Python.

## Prerequisites

- Node.js 18+ or Bun runtime
- Basic TypeScript/JavaScript knowledge
- Ethereum wallet for testnet
- Git

## Installation

Install the SDK, set up your environment, connect to testnet.
`
}

const sdkContent = {
  title: 'SDKs & Libraries',
  content: `
# TypeScript SDK

## Installation

\`\`\`bash
bun add arkiv-sdk crypto dotenv
# or
npm install arkiv-sdk crypto dotenv
\`\`\`

## Quickstart
\`\`\`typescript
import { createClient, Annotation, Tagged } from 'arkiv-sdk'
import { randomUUID } from 'crypto'

// Create client connection
const client = await createClient(
  60138453033, // Arkiv Chain ID
  new Tagged("privatekey", Buffer.from("YOUR_PRIVATE_KEY", "hex")),
  "https://kaolin.hoodi.arkiv.network/rpc",
  "wss://kaolin.hoodi.arkiv.network/rpc/ws"
)

// Store data with annotations
const noteData = { title: "My Note", content: "Hello Arkiv!" }
const receipt = await client.createEntities([{
  data: new TextEncoder().encode(JSON.stringify(noteData)),
  expires_in: 43200, // 24 hours
  stringAnnotations: [
    new Annotation("type", "note"),
    new Annotation("id", randomUUID())
  ],
  numericAnnotations: [
    new Annotation("created", Date.now())
  ]
}])

console.log('Entity created:', receipt[0].entityKey)
\`\`\`

## Query Data
\`\`\`typescript
// Query by annotations
const notes = await client.queryEntities('type = "note" && created > 1672531200')

// Process results
for (const entity of notes) {
  const data = JSON.parse(new TextDecoder().decode(entity.storageValue))
  console.log(\`Note: \${data.title} - \${data.content}\`)
}
\`\`\`

## Update Data
\`\`\`typescript
// Update existing entity
const updateReceipt = await client.updateEntities([{
  entityKey: receipt[0].entityKey,
  data: new TextEncoder().encode(JSON.stringify({
    title: "Updated Note",
    content: "This note has been updated"
  })),
  expires_in: 86400, // Extend to 48 hours
  stringAnnotations: [new Annotation("type", "note")],
  numericAnnotations: [new Annotation("updated", Date.now())]
}])
\`\`\`

## Delete Data
\`\`\`typescript
// Delete entity
const deleteReceipt = await client.deleteEntities([receipt[0].entityKey])
console.log('Entity deleted:', deleteReceipt[0].entityKey)
\`\`\`

## Real-time Events
\`\`\`typescript
// Watch for data changes
const unwatch = client.watchLogs({
  fromBlock: BigInt(0),
  onCreated: (args) => console.log("Created:", args.entityKey),
  onUpdated: (args) => console.log("Updated:", args.entityKey),
  onDeleted: (args) => console.log("Deleted:", args.entityKey),
  pollingInterval: 2000,
  transport: "websocket"
})

// Stop watching later
// unwatch()
\`\`\`

## Batch Operations
\`\`\`typescript
// Create multiple entities at once
const entities = Array.from({ length: 5 }, (_, i) => ({
  data: new TextEncoder().encode(\`Batch item \${i}\`),
  expires_in: 1800, // 1 hour
  stringAnnotations: [new Annotation("type", "batch")],
  numericAnnotations: [new Annotation("index", i)]
}))

const batchReceipts = await client.createEntities(entities)
console.log(\`Created \${batchReceipts.length} entities\`)
\`\`\`

## Expires In Management
\`\`\`typescript
// Extend entity lifetime
const extendReceipts = await client.extendEntities([{
  entityKey: receipt[0].entityKey,
  numberOfBlocks: 43200 // Add 24 more hours
}])

console.log(\`Extended to block: \${extendReceipts[0].newExpirationBlock}\`)
\`\`\`

## Python SDK (In Development)

\`\`\`python
# Preview of upcoming Python SDK
from arkiv_python import ArkivClient
import os

client = ArkivClient(
    chain_id=60138453033,
    private_key=os.getenv("PRIVATE_KEY"),
    rpc_url="https://kaolin.hoodi.arkiv.network/rpc"
)

# Create entity
entity = client.create_entity(
    data={"message": "Hello from Python!"},
    expires_in=43200,  # 24 hours
    annotations={
        "type": "greeting",
        "language": "python"
    }
)

print(f"Created entity: {entity.key}")
\`\`\`

## SDK Comparison

| Feature | TypeScript | Python |
|---------|-----------|--------|
| Status | Production | In Development |
| CRUD Operations | Full Support | Coming Soon |
| Real-time Events | WebSocket | Coming Soon |
| Batch Operations | Supported | Coming Soon |
| Type Safety | TypeScript | Type Hints |
| Use Cases | Web, APIs, Node.js | Data Science, Backend |

**Resources:**
[Getting Started](/getting-started) — [NPM Package](https://www.npmjs.com/package/arkiv-sdk) — [GitHub](https://github.com/Arkiv-network/arkiv-sdk) — [Discord](https://discord.gg/arkiv)
`
}

const apiContent = {
  title: 'API Reference',
  content: `
# JSON-RPC API

Arkiv uses standard Ethereum JSON-RPC.

## Network

**Chain ID:** \`60138453033\`
**RPC:** \`https://kaolin.hoodi.arkiv.network/rpc\`
**WebSocket:** \`wss://kaolin.hoodi.arkiv.network/rpc/ws\`
**Explorer:** [explorer.kaolin.hoodi.arkiv.network](https://explorer.kaolin.hoodi.arkiv.network)
**Faucet:** [kaolin.hoodi.arkiv.network/faucet](https://kaolin.hoodi.arkiv.network/faucet/)

## Authentication

Uses Ethereum private key signing:

\`\`\`typescript
// SDK handles authentication automatically
const client = await createClient(
  60138453033,
  new Tagged("privatekey", Buffer.from("YOUR_PRIVATE_KEY", "hex")),
  "https://kaolin.hoodi.arkiv.network/rpc",
  "wss://kaolin.hoodi.arkiv.network/rpc/ws"
)
\`\`\`

## Create Entities

\`\`\`typescript
// Create single entity
const receipt = await client.createEntities([{
  data: new TextEncoder().encode(JSON.stringify({ message: "Hello" })),
  expires_in: 43200, // ~24 hours (blocks to live)
  stringAnnotations: [
    new Annotation("type", "message"),
    new Annotation("category", "general")
  ],
  numericAnnotations: [
    new Annotation("priority", 5),
    new Annotation("created", Date.now())
  ]
}])

console.log("Entity Key:", receipt[0].entityKey)
console.log("Expires at block:", receipt[0].expirationBlock)
\`\`\`

## Query Entities

\`\`\`typescript
// Query by annotations
const entities = await client.queryEntities(
  'type = "message" && priority > 3 && created > 1672531200'
)

// Process results
entities.forEach(entity => {
  const data = JSON.parse(new TextDecoder().decode(entity.storageValue))
  console.log(\`Found: \${data.message}\`)
  console.log(\`Entity Key: \${entity.entityKey}\`)
  console.log(\`Annotations:\`, entity.stringAnnotations)
})
\`\`\`

### 📊 **Get Entity Data**

Retrieve specific entity by key.

\`\`\`typescript
// Get entity metadata
const metadata = await client.getEntityMetaData(entityKey)
console.log("Expires at block:", metadata.expiresAtBlock)
console.log("String annotations:", metadata.stringAnnotations)
console.log("Numeric annotations:", metadata.numericAnnotations)

// Get entity storage value
const storageValue = await client.getStorageValue(entityKey)
const data = JSON.parse(new TextDecoder().decode(storageValue))
console.log("Entity data:", data)
\`\`\`

### ✏️ **Update Entities**

Modify existing entities with new data and annotations.

\`\`\`typescript
const updateReceipt = await client.updateEntities([{
  entityKey: "0x1234567890abcdef...",
  data: new TextEncoder().encode(JSON.stringify({
    message: "Updated content",
    lastModified: Date.now()
  })),
  expires_in: 86400, // Extend to ~48 hours
  stringAnnotations: [
    new Annotation("type", "message"),
    new Annotation("status", "updated")
  ],
  numericAnnotations: [
    new Annotation("version", 2)
  ]
}])
\`\`\`

### 🗑️ **Delete Entities**

Remove entities from storage.

\`\`\`typescript
const deleteReceipts = await client.deleteEntities([
  "0x1234567890abcdef...",
  "0xabcdef1234567890..."
])

deleteReceipts.forEach(receipt => {
  console.log(\`Deleted: \${receipt.entityKey}\`)
})
\`\`\`

### ⏰ **Extend Entity Lifetime**

Add more blocks to entity's Expires In.

\`\`\`typescript
const extendReceipts = await client.extendEntities([{
  entityKey: "0x1234567890abcdef...",
  numberOfBlocks: 43200 // Add 24 more hours
}])

console.log(\`New expiration: \${extendReceipts[0].newExpirationBlock}\`)
\`\`\`

## ⚡ **Real-time Events**

Monitor blockchain events in real-time.

\`\`\`typescript
const unwatch = client.watchLogs({
  fromBlock: BigInt(await client.getRawClient().httpClient.getBlockNumber()),
  onCreated: (args) => {
    console.log("✅ Entity Created:", args.entityKey)
    console.log("Owner:", args.owner)
    console.log("Expires at:", args.expirationBlock)
  },
  onUpdated: (args) => {
    console.log("📝 Entity Updated:", args.entityKey)
  },
  onDeleted: (args) => {
    console.log("🗑️ Entity Deleted:", args.entityKey)
  },
  onExtended: (args) => {
    console.log("⏰ Entity Extended:", args.entityKey)
    console.log("New expiration:", args.newExpirationBlock)
  },
  onError: (error) => {
    console.error("❌ Watch Error:", error)
  },
  pollingInterval: 2000, // Poll every 2 seconds
  transport: "websocket" // Use WebSocket for real-time updates
})

// Stop watching when done
// unwatch()
\`\`\`

## 🔄 **Batch Operations**

Perform multiple operations efficiently.

\`\`\`typescript
// Create multiple entities
const entities = Array.from({ length: 10 }, (_, i) => ({
  data: new TextEncoder().encode(\`Batch item \${i}\`),
  expires_in: 1800,
  stringAnnotations: [new Annotation("type", "batch")],
  numericAnnotations: [new Annotation("index", i)]
}))

const batchReceipts = await client.createEntities(entities)
console.log(\`✅ Created \${batchReceipts.length} entities\`)

// Query all batch items
const batchItems = await client.queryEntities('type = "batch"')
console.log(\`📊 Found \${batchItems.length} batch items\`)
\`\`\`

## 💡 **Expires In Reference**

Understanding entity expiration times:

| Expires In Value | Time (approx.) | Use Case |
|-----------|----------------|----------|
| \`900\` | 30 minutes | Session data, temporary cache |
| \`1800\` | 1 hour | Short-term storage, clipboard |
| \`43200\` | 24 hours | Daily data, notes, messages |
| \`302400\` | 7 days | Weekly data, file metadata |
| \`1296000\` | 30 days | Monthly archives, backups |

**Note**: Each block is approximately 2 seconds on Arkiv Hoodi testnet.

## 🚨 **Error Handling**

Common errors and how to handle them:

\`\`\`typescript
try {
  const receipt = await client.createEntities([entity])
  console.log("Success:", receipt[0].entityKey)
} catch (error) {
  if (error.message.includes("insufficient funds")) {
    console.error("❌ Insufficient ETH. Get more from the faucet.")
  } else if (error.message.includes("entity not found")) {
    console.error("❌ Entity doesn't exist or has expired.")
  } else {
    console.error("❌ Error:", error.message)
  }
}
\`\`\`

## 🔧 **Low-level Access**

Access the underlying Ethereum client for advanced operations:

\`\`\`typescript
// Get raw Ethereum client
const rawClient = client.getRawClient()

// Check account balance
const balance = await rawClient.httpClient.getBalance({
  address: await client.getOwnerAddress()
})
console.log(\`Balance: \${Number(balance) / 10**18} ETH\`)

// Get current block number
const blockNumber = await rawClient.httpClient.getBlockNumber()
console.log(\`Current block: \${blockNumber}\`)

// Get transaction receipt
const txHash = "0x123..."
const receipt = await rawClient.httpClient.getTransactionReceipt({
  hash: txHash
})
\`\`\`

## 📚 **Query Language Reference**

Arkiv supports SQL-like queries for entity retrieval:

### **String Annotations**
\`\`\`sql
-- Exact match
type = "message"

-- Multiple conditions
type = "note" && category = "work"

-- OR conditions
status = "active" || status = "pending"
\`\`\`

### **Numeric Annotations**
\`\`\`sql
-- Comparison operators
priority > 5
score >= 80 && score <= 100
created > 1672531200

-- Combined conditions
priority > 3 && type = "task"
\`\`\`

### **Complex Queries**
\`\`\`sql
-- Parentheses for grouping
(type = "message" && priority > 3) || status = "urgent"

-- Date range queries
created > 1672531200 && created < 1672617600
\`\`\`

## 🆔 **Entity Keys**

Every entity has a unique key (address) on the blockchain:

\`\`\`typescript
// Entity keys are Ethereum addresses
const entityKey = "0x1234567890abcdef1234567890abcdef12345678"

// Use entity keys to reference specific data
const data = await client.getStorageValue(entityKey)
\`\`\`

## 🌐 **Network Resources**

### **Quick Links**
- **🔗 Add Network to MetaMask**: [Arkiv Hoodi](https://chainlist.org/chain/17000)
- **💰 Get Test ETH**: [Faucet](https://kaolin.hoodi.arkiv.network/faucet/)
- **🔍 Block Explorer**: [View Transactions](https://explorer.kaolin.hoodi.arkiv.network)
- **📊 Network Dashboard**: [Status & Metrics](https://kaolin.hoodi.arkiv.network/)

### **SDK Documentation**
- **📦 NPM Package**: [arkiv-sdk](https://www.npmjs.com/package/arkiv-sdk)
- **📚 TypeScript Docs**: [API Reference](https://docs.golemdb.io/typescript-sdk)
- **🛠️ GitHub Repository**: [Source Code](https://github.com/Arkiv-network/arkiv-sdk)

## 🎯 **Best Practices**

### **Efficient Querying**
\`\`\`typescript
// ✅ Good: Specific queries
const notes = await client.queryEntities('type = "note" && priority > 3')

// ❌ Avoid: Overly broad queries
const all = await client.queryEntities('type = "note"') // Returns everything
\`\`\`

### **Proper Expires In Management**
\`\`\`typescript
// ✅ Good: Choose appropriate Expires In for data type
const sessionData = { expires_in: 900 }    // 30 minutes
const dailyNotes = { expires_in: 43200 }   // 24 hours
const weeklyBackup = { expires_in: 302400 } // 7 days
\`\`\`

### **Error Handling**
\`\`\`typescript
// ✅ Good: Comprehensive error handling
try {
  const receipt = await client.createEntities([entity])
} catch (error) {
  console.error('Operation failed:', error.message)
  // Handle specific error types
}
\`\`\`
`
}

const guidesContent = {
  title: 'Guides & Tutorials',
  content: `
# Guides & Tutorials

Step-by-step guides to help you build with Arkiv using real examples.

## Quickstart Projects

### 1. Build a Decentralized Note-Taking App

Create a simple note-taking app with automatic expiration and annotations.

\`\`\`typescript
import { createClient, Annotation } from 'arkiv-sdk'

const client = await createClient(
  60138453033, // Arkiv testnet
  privateKey,
  "https://kaolin.hoodi.arkiv.network/rpc",
  "wss://kaolin.hoodi.arkiv.network/rpc/ws"
)

// Create a note with 24-hour expiration
const noteId = randomUUID()
const noteData = {
  title: "My First Note",
  content: "This note will expire in 24 hours",
  created: Date.now()
}

const createReceipt = await client.createEntities([{
  data: new TextEncoder().encode(JSON.stringify(noteData)),
  expires_in: 43200, // ~24 hours (43200 blocks * 2 seconds)
  stringAnnotations: [
    new Annotation("type", "note"),
    new Annotation("noteId", noteId),
    new Annotation("title", noteData.title)
  ],
  numericAnnotations: [
    new Annotation("created", noteData.created)
  ]
}])

console.log('Note created:', createReceipt[0].entityKey)
\`\`\`

### 2. Cross-Device Clipboard

Implement efficient image storage by splitting large files into chunks.

**→ Image Storage Guide** (soon)

### Real-time Data Sync

Build applications that sync data in real-time across multiple clients.

**→ Real-time Sync Guide** (soon)

## Advanced Guides

### Custom DB-Chain Deployment

Deploy your own specialized database chain for specific use cases.

**→ DB-Chain Deployment** (soon)

### Performance Optimization

Best practices for optimizing query performance and reducing costs.

**→ Performance Guide** (soon)

### Security Best Practices

Ensure your applications follow security best practices.

**→ Security Guide** (soon)

## Integration Examples

### Next.js Integration

\`\`\`typescript
// pages/api/store.ts
import { ArkivClient } from '@arkiv/typescript-sdk'

const client = new ArkivClient({
  rpcUrl: process.env.ARKIV_RPC_URL!,
  privateKey: process.env.ARKIV_PRIVATE_KEY!
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const result = await client.store({
      data: req.body,
      expiration: '24h'
    })
    res.json(result)
  }
}
\`\`\`

### Express.js Integration

\`\`\`typescript
import express from 'express'
import { ArkivClient } from '@arkiv/typescript-sdk'

const app = express()
const arkiv = new ArkivClient({
  rpcUrl: process.env.ARKIV_RPC_URL!,
  privateKey: process.env.ARKIV_PRIVATE_KEY!
})

app.post('/store', async (req, res) => {
  const result = await arkiv.store({
    data: req.body,
    expiration: '1d'
  })
  res.json(result)
})
\`\`\`

### React Hook

\`\`\`typescript
import { useState, useEffect } from 'react'
import { ArkivClient } from '@arkiv/typescript-sdk'

export function useArkiv() {
  const [client, setClient] = useState<ArkivClient | null>(null)

  useEffect(() => {
    const arkivClient = new ArkivClient({
      rpcUrl: process.env.NEXT_PUBLIC_ARKIV_RPC_URL!,
      privateKey: process.env.ARKIV_PRIVATE_KEY!
    })
    setClient(arkivClient)
  }, [])

  const store = async (data: any, expiration?: string) => {
    if (!client) throw new Error('Arkiv client not initialized')
    return client.store({ data, expiration })
  }

  const get = async (id: string) => {
    if (!client) throw new Error('Arkiv client not initialized')
    return client.get(id)
  }

  return { store, get, client }
}
\`\`\`

## Testing & Development

### Local Development Setup

Set up a local Arkiv node for development and testing.

**→ Local Setup Guide** (soon)

### Unit Testing

Write comprehensive tests for your Arkiv applications.

**→ Testing Guide** (soon)

### Deployment Strategies

Best practices for deploying Arkiv applications to production.

**→ Deployment Guide** (soon)
`
}

const contentMap = {
  overview: overviewContent,
  'getting-started': gettingStartedContent,
  sdk: sdkContent,
  api: apiContent,
  guides: guidesContent
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview')

  // Sync activeSection with URL hash on mount and hash change
  useEffect(() => {
    const updateFromHash = () => {
      const hash = window.location.hash.slice(1) // Remove #
      if (hash && contentMap[hash as keyof typeof contentMap]) {
        setActiveSection(hash)
      }
    }

    // Set initial section from hash
    updateFromHash()

    // Listen for hash changes
    window.addEventListener('hashchange', updateFromHash)
    return () => window.removeEventListener('hashchange', updateFromHash)
  }, [])

  // Update URL hash when activeSection changes
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
    window.history.pushState(null, '', `#${sectionId}`)
  }

  const currentContent = contentMap[activeSection as keyof typeof contentMap]

  return (
    <>
      <style jsx global>{`
        .docs-content h1 {
          font-family: 'Brutal', sans-serif;
          text-transform: uppercase;
          font-weight: 500;
        }
        .docs-content h2 {
          font-family: 'Brutal', sans-serif;
          text-transform: uppercase;
          font-weight: 500;
        }
        .docs-content h3 {
          font-weight: 600;
          text-transform: none;
        }
        .docs-content p {
          text-transform: none;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .docs-content ul {
          text-transform: none;
        }
        .docs-content li {
          text-transform: none;
          margin-bottom: 0.5rem;
        }
        .docs-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        .docs-content th {
          background-color: #f8f9fa;
          font-weight: 600;
          text-align: left;
          padding: 0.75rem;
          border: 1px solid #dee2e6;
        }
        .docs-content td {
          padding: 0.75rem;
          border: 1px solid #dee2e6;
        }
        .docs-content code {
          text-transform: none;
        }
        .docs-content pre {
          text-transform: none;
        }
      `}</style>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-4 md:px-[60px] pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1 className="font-brutal text-4xl md:text-6xl font-black uppercase text-black leading-tight tracking-wider mb-6">
            [ ARKIV DOCS ]
          </h1>
          <p className="font-mono text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to build with Arkiv. From quick start guides to comprehensive API documentation.
          </p>
        </div>
      </section>

      {/* Navigation & Content */}
      <section className="px-4 md:px-[60px] py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-80">
              <div className="sticky top-8">
                <h2 className="font-brutal text-lg font-medium uppercase text-black mb-6">Documentation</h2>
                <nav className="space-y-2">
                  {docsNavigation.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        activeSection === section.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 text-black hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-mono text-sm font-medium">{section.name}</div>
                      <div className={`font-mono text-xs mt-1 ${
                        activeSection === section.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {section.description}
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="prose prose-lg max-w-none">
                <h1 className="font-brutal text-3xl font-medium text-black mb-8" style={{ textTransform: 'none' }}>
                  {currentContent.title}
                </h1>
                <div className="docs-content space-y-4 prose prose-slate max-w-none" style={{ textTransform: 'none' }}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({node, ...props}) => <h1 className="font-brutal text-2xl font-medium text-black mt-8 mb-4 border-b border-gray-200 pb-2" style={{ textTransform: 'none' }} {...props} />,
                      h2: ({node, ...props}) => <h2 className="font-brutal text-xl font-medium text-black mt-6 mb-3" style={{ textTransform: 'none' }} {...props} />,
                      h3: ({node, ...props}) => <h3 className="font-semibold text-lg text-black mt-4 mb-2" style={{ textTransform: 'none' }} {...props} />,
                      p: ({node, ...props}) => <p className="mb-4 text-gray-700 leading-relaxed" style={{ textTransform: 'none' }} {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside my-4 space-y-2" style={{ textTransform: 'none' }} {...props} />,
                      li: ({node, ...props}) => <li className="text-gray-700" style={{ textTransform: 'none' }} {...props} />,
                      a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-800 underline font-medium" style={{ textTransform: 'none' }} {...props} />,
                      code: ({node, inline, className, children, ...props}: any) => {
                        const match = /language-(\w+)/.exec(className || '')
                        const language = match ? match[1] : 'typescript'
                        return !inline ? (
                          <div className="my-6">
                            <CodeBlock code={String(children).replace(/\n$/, '')} language={language} />
                          </div>
                        ) : (
                          <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" style={{ textTransform: 'none' }} {...props}>
                            {children}
                          </code>
                        )
                      },
                      table: ({node, ...props}) => (
                        <div className="overflow-x-auto my-6">
                          <table className="w-full border-collapse border border-gray-300" {...props} />
                        </div>
                      ),
                      thead: ({node, ...props}) => <thead className="bg-gray-50" {...props} />,
                      th: ({node, ...props}) => <th className="border border-gray-300 px-3 py-2 text-left font-semibold" {...props} />,
                      td: ({node, ...props}) => <td className="border border-gray-300 px-3 py-2 text-sm" {...props} />
                    }}
                  >
                    {currentContent.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}