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

**Annotations** — Key-value pairs for querying:

\`\`\`typescript
type = "note"      // String annotation
priority = 5       // Numeric annotation
\`\`\`

**Expires In** — Automatic expiration (in seconds):

\`\`\`typescript
expiresIn: 1800    // 30 minutes
expiresIn: 86400   // 24 hours
expiresIn: 604800  // 7 days
\`\`\`

**Query Language** — SQL-like syntax:
\`\`\`sql
type = "note" && priority > 3 && created > 1672531200
\`\`\`

## Testnet Access

\`\`\`typescript
Chain ID:  60138453025
RPC URL:   https://kaolin.hoodi.arkiv.network/rpc
WebSocket: wss://kaolin.hoodi.arkiv.network/rpc/ws
\`\`\`

**Faucet:** [Get Test ETH](https://kaolin.hoodi.arkiv.network/faucet/)
**Explorer:** [View Transactions](https://explorer.kaolin.hoodi.arkiv.network)

Quick example:

\`\`\`typescript
import { createClient, createROClient, Annotation } from 'arkiv-sdk'

// Full client (read/write) - requires private key
const client = await createClient(
  60138453025,
  "YOUR_PRIVATE_KEY",
  "https://kaolin.hoodi.arkiv.network/rpc",
  "wss://kaolin.hoodi.arkiv.network/rpc/ws"
)

const receipt = await client.createEntities([{
  data: new TextEncoder().encode("Hello Arkiv!"),
  expiresIn: 1800,
  stringAnnotations: [new Annotation("type", "greeting")],
  numericAnnotations: []
}])

console.log("Stored:", receipt[0].entityKey)

// Read-only client (queries only) - no private key needed
const roClient = await createROClient(
  60138453025,
  "https://kaolin.hoodi.arkiv.network/rpc",
  "wss://kaolin.hoodi.arkiv.network/rpc/ws"
)

const data = await roClient.queryEntities('type = "greeting"')
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
  60138453025, // Arkiv Chain ID
  new Tagged("privatekey", Buffer.from("YOUR_PRIVATE_KEY", "hex")),
  "https://kaolin.hoodi.arkiv.network/rpc",
  "wss://kaolin.hoodi.arkiv.network/rpc/ws"
)

// Store data with annotations
const noteData = { title: "My Note", content: "Hello Arkiv!" }
const receipt = await client.createEntities([{
  data: new TextEncoder().encode(JSON.stringify(noteData)),
  expiresIn: 43200, // 43200 seconds = 12 hours
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

## Read-Only Client

For applications that only need to query data without writing, use \`createROClient\`:

\`\`\`typescript
import { createROClient } from 'arkiv-sdk'

// Create read-only client (no private key needed)
const roClient = await createROClient(
  60138453025, // Arkiv Chain ID
  "https://kaolin.hoodi.arkiv.network/rpc",
  "wss://kaolin.hoodi.arkiv.network/rpc/ws"
)

// Query entities (read-only)
const publicData = await roClient.queryEntities('type = "public"')

// Watch for changes (read-only)
const unwatch = roClient.watchLogs({
  fromBlock: BigInt(0),
  onCreated: (args) => console.log("New entity:", args.entityKey),
  pollingInterval: 2000
})
\`\`\`

**Benefits:**
- No private key required
- Safe for frontend/public use
- Prevents accidental writes
- Ideal for analytics and monitoring

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
  expiresIn: 86400, // 86400 seconds = 24 hours
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
  expiresIn: 1800, // 1800 seconds = 30 minutes
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

## Python SDK

\`\`\`python
from arkiv_sdk import create_client, Tagged, Annotation
from arkiv_sdk.types import AccountData, ArkivCreate
import os

# Load private key
raw_key = os.getenv('PRIVATE_KEY', '')
hex_key = raw_key[2:] if raw_key.startswith('0x') else raw_key
key: AccountData = Tagged("privatekey", bytes.fromhex(hex_key))

# Create client (async)
client = await create_client(
    60138453025,  # Chain ID
    key,
    "https://kaolin.hoodi.arkiv.network/rpc",
    "wss://kaolin.hoodi.arkiv.network/rpc/ws"
)

# Create entity
creates = [
    ArkivCreate(
        data=b"Hello from Python!",
        expires_in=43200,  # 43200 seconds = 12 hours
        string_annotations=[
            Annotation("type", "greeting"),
            Annotation("language", "python")
        ],
        numeric_annotations=[]
    )
]

receipts = await client.create_entities(creates)
print(f"Created entity: {receipts[0].entity_key}")

# Read-only client (no private key needed)
from arkiv_sdk import create_ro_client

ro_client = await create_ro_client(
    60138453025,  # Chain ID
    "https://kaolin.hoodi.arkiv.network/rpc",
    "wss://kaolin.hoodi.arkiv.network/rpc/ws"
)

# Query entities (read-only)
entities = await ro_client.query_entities('type = "greeting"')
for entity in entities:
    print(f"Entity: {entity.entity_key}")
\`\`\`

## SDK Comparison

| Feature | TypeScript | Python |
|---------|-----------|--------|
| Status | Production | Production |
| CRUD Operations | Full Support | Full Support |
| Real-time Events | WebSocket | WebSocket |
| Batch Operations | Supported | Supported |
| Type Safety | TypeScript | Type Hints |
| Use Cases | Web, APIs, Node.js | Data Science, Backend |

**Resources:**
[Getting Started](/getting-started) — [NPM Package](https://www.npmjs.com/package/arkiv-sdk) — [GitHub](https://github.com/arkiv-network/arkiv-sdk-js) — [Discord](https://discord.gg/arkiv)
`
}

const apiContent = {
  title: 'API Reference',
  content: `
# JSON-RPC API

Arkiv uses standard Ethereum JSON-RPC.

## Network

**Chain ID:** \`60138453025\`
**RPC:** \`https://kaolin.hoodi.arkiv.network/rpc\`
**WebSocket:** \`wss://kaolin.hoodi.arkiv.network/rpc/ws\`
**Explorer:** [explorer.kaolin.hoodi.arkiv.network](https://explorer.kaolin.hoodi.arkiv.network)
**Faucet:** [kaolin.hoodi.arkiv.network/faucet](https://kaolin.hoodi.arkiv.network/faucet/)

## Authentication

Uses Ethereum private key signing:

\`\`\`typescript
// SDK handles authentication automatically
const client = await createClient(
  60138453025,
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
  expiresIn: 43200, // 43200 seconds = 12 hours
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
  expiresIn: 86400, // 86400 seconds = 24 hours
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

Add more seconds to entity's expiration time.

\`\`\`typescript
const extendReceipts = await client.extendEntities([{
  entityKey: "0x1234567890abcdef...",
  numberOfBlocks: 86400 // Add 24 more hours (in seconds)
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
  expiresIn: 1800,
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

Understanding entity expiration times (in seconds):

| Expires In Value | Time | Use Case |
|-----------------|------|----------|
| \`1800\` | 30 minutes | Session data, temporary cache |
| \`3600\` | 1 hour | Short-term storage, clipboard |
| \`86400\` | 24 hours | Daily data, notes, messages |
| \`604800\` | 7 days | Weekly data, file metadata |
| \`2592000\` | 30 days | Monthly archives, backups |

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
- **📚 TypeScript Docs**: [Getting Started](/getting-started/typescript)
- **🛠️ GitHub Repository**: [Source Code](https://github.com/arkiv-network/arkiv-sdk-js)

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
// ✅ Good: Choose appropriate expiresIn for data type
const sessionData = { expiresIn: 1800 }    // 1800 seconds = 30 minutes
const dailyNotes = { expiresIn: 43200 }   // 43200 seconds = 12 hours
const weeklyBackup = { expiresIn: 604800 } // 604800 seconds = 7 days
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
  60138453025, // Arkiv testnet
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
  expiresIn: 43200, // 43200 seconds = 12 hours
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

Build a clipboard that syncs across devices using temporary storage.

\`\`\`typescript
import { createClient, Annotation, Tagged } from 'arkiv-sdk'
import { randomUUID } from 'crypto'

// Setup client
const client = await createClient(
  60138453025,
  new Tagged("privatekey", Buffer.from("YOUR_PRIVATE_KEY", "hex")),
  "https://kaolin.hoodi.arkiv.network/rpc",
  "wss://kaolin.hoodi.arkiv.network/rpc/ws"
)

// Copy to clipboard (store data)
async function copyToClipboard(text: string, deviceId: string) {
  const clipId = randomUUID()

  const receipt = await client.createEntities([{
    data: new TextEncoder().encode(text),
    expiresIn: 3600, // 1 hour
    stringAnnotations: [
      new Annotation("type", "clipboard"),
      new Annotation("deviceId", deviceId),
      new Annotation("clipId", clipId)
    ],
    numericAnnotations: [
      new Annotation("timestamp", Date.now())
    ]
  }])

  return clipId
}

// Paste from clipboard (retrieve latest)
async function getLatestClip(deviceId: string) {
  const clips = await client.queryEntities(
    \`type = "clipboard" && deviceId = "\${deviceId}"\`
  )

  // Sort by timestamp (newest first)
  clips.sort((a, b) => {
    const aTime = a.numericAnnotations.find(an => an.key === "timestamp")?.value || 0
    const bTime = b.numericAnnotations.find(an => an.key === "timestamp")?.value || 0
    return Number(bTime) - Number(aTime)
  })

  if (clips.length > 0) {
    return new TextDecoder().decode(clips[0].storageValue)
  }
  return null
}

// Usage
const myDeviceId = "device-" + randomUUID()
await copyToClipboard("Hello from device A!", myDeviceId)
const clipText = await getLatestClip(myDeviceId)
console.log("Pasted:", clipText)
\`\`\`

### 3. Real-time Data Sync

Sync data in real-time across multiple clients using event subscriptions.

\`\`\`typescript
// Client 1: Publisher
const publisher = await createClient(chainId, key1, rpcUrl, wsUrl)

// Watch for changes
const unwatch = publisher.watchLogs({
  fromBlock: BigInt(0),
  onCreated: async (args) => {
    const meta = await publisher.getEntityMetaData(args.entityKey)
    const annotations = Object.fromEntries(
      meta.stringAnnotations.map(a => [a.key, a.value])
    )

    if (annotations.type === "message") {
      const data = await publisher.getStorageValue(args.entityKey)
      console.log("New message:", new TextDecoder().decode(data))
      // Update UI, trigger notifications, etc.
    }
  },
  transport: "websocket"
})

// Client 2: Subscriber
const subscriber = await createClient(chainId, key2, rpcUrl, wsUrl)

// Post a message
await subscriber.createEntities([{
  data: new TextEncoder().encode("Hello everyone!"),
  expiresIn: 7200,
  stringAnnotations: [
    new Annotation("type", "message"),
    new Annotation("channel", "general")
  ],
  numericAnnotations: [new Annotation("timestamp", Date.now())]
}])

// Client 1 will receive the event in real-time
\`\`\`

## Advanced Guides

### Performance Optimization

Best practices for optimizing query performance and reducing costs.

**1. Use Specific Queries**
\`\`\`typescript
// ❌ Bad: Returns all notes
const allNotes = await client.queryEntities('type = "note"')

// ✅ Good: Filter by additional criteria
const recentNotes = await client.queryEntities(
  \`type = "note" && created > \${Date.now() - 86400000} && priority > 3\`
)
\`\`\`

**2. Batch Operations**
\`\`\`typescript
// ❌ Bad: Multiple individual creates
for (const item of items) {
  await client.createEntities([item]) // Slow!
}

// ✅ Good: Single batch create
await client.createEntities(items) // Fast!
\`\`\`

**3. Choose Appropriate expiresIn**
\`\`\`typescript
// Match data lifetime to use case
const sessionData = { expiresIn: 1800 }     // 30 min for sessions
const cacheData = { expiresIn: 3600 }       // 1 hour for cache
const tempFiles = { expiresIn: 86400 }      // 24 hours for temp files
const weeklyData = { expiresIn: 604800 }    // 7 days for weekly data

// Don't over-allocate storage time
\`\`\`

**4. Optimize Annotations**
\`\`\`typescript
// ✅ Good: Use numeric annotations for numbers
new Annotation("priority", 5)  // Numeric - can use > < operators

// ❌ Bad: Using string for numbers
new Annotation("priority", "5")  // String - only equality checks
\`\`\`

### Security Best Practices

Ensure your applications follow security best practices.

**1. Never Expose Private Keys**
\`\`\`typescript
// ✅ Good: Use environment variables
const privateKey = process.env.PRIVATE_KEY

// ❌ Bad: Hardcoded keys
const privateKey = "0x1234..." // NEVER DO THIS!
\`\`\`

**2. Validate User Input**
\`\`\`typescript
// ✅ Good: Sanitize and validate
function createNote(userInput: string) {
  // Validate input
  if (!userInput || userInput.length > 10000) {
    throw new Error("Invalid input")
  }

  // Sanitize
  const sanitized = userInput.trim()

  return client.createEntities([{
    data: new TextEncoder().encode(sanitized),
    expiresIn: 43200,
    stringAnnotations: [new Annotation("type", "note")]
  }])
}
\`\`\`

**3. Use Read-Only Clients for Queries**
\`\`\`typescript
import { createROClient } from 'arkiv-sdk'

// For public data queries, use a read-only client
// This prevents accidental writes and doesn't require private key
const readOnlyClient = await createROClient(
  chainId,
  rpcUrl,
  wsUrl
)

// Safe for public use - query only, no write operations
const publicData = await readOnlyClient.queryEntities('type = "public"')
\`\`\`

**4. Implement Rate Limiting**
\`\`\`typescript
// Prevent abuse with rate limiting
class RateLimiter {
  private requests = new Map<string, number[]>()

  canMakeRequest(userId: string, maxRequests = 10, windowMs = 60000) {
    const now = Date.now()
    const userRequests = this.requests.get(userId) || []

    // Remove old requests outside the window
    const recentRequests = userRequests.filter(time => now - time < windowMs)

    if (recentRequests.length >= maxRequests) {
      return false
    }

    recentRequests.push(now)
    this.requests.set(userId, recentRequests)
    return true
  }
}

const limiter = new RateLimiter()

async function createEntity(userId: string, data: any) {
  if (!limiter.canMakeRequest(userId)) {
    throw new Error("Rate limit exceeded")
  }

  return client.createEntities([data])
}
\`\`\`

### Image & File Storage Guide

Store large files efficiently using chunking strategy.

\`\`\`typescript
// Chunk large files for efficient storage
const CHUNK_SIZE = 64 * 1024 // 64KB chunks

async function uploadFile(file: Buffer, fileName: string) {
  const fileId = randomUUID()
  const chunks = []

  // Split file into chunks
  for (let i = 0; i < file.length; i += CHUNK_SIZE) {
    const chunk = file.slice(i, i + CHUNK_SIZE)
    const chunkIndex = Math.floor(i / CHUNK_SIZE)

    chunks.push({
      data: chunk,
      expiresIn: 604800, // 7 days
      stringAnnotations: [
        new Annotation("type", "file-chunk"),
        new Annotation("fileId", fileId),
        new Annotation("fileName", fileName)
      ],
      numericAnnotations: [
        new Annotation("chunkIndex", chunkIndex),
        new Annotation("totalChunks", Math.ceil(file.length / CHUNK_SIZE))
      ]
    })
  }

  // Upload all chunks
  await client.createEntities(chunks)

  return fileId
}

async function downloadFile(fileId: string): Promise<Buffer> {
  // Query all chunks for this file
  const chunks = await client.queryEntities(
    \`type = "file-chunk" && fileId = "\${fileId}"\`
  )

  // Sort by chunk index
  chunks.sort((a, b) => {
    const aIdx = a.numericAnnotations.find(an => an.key === "chunkIndex")?.value || 0
    const bIdx = b.numericAnnotations.find(an => an.key === "chunkIndex")?.value || 0
    return Number(aIdx) - Number(bIdx)
  })

  // Combine chunks
  const buffers = chunks.map(chunk => Buffer.from(chunk.storageValue))
  return Buffer.concat(buffers)
}

// Usage
const imageBuffer = fs.readFileSync("photo.jpg")
const fileId = await uploadFile(imageBuffer, "photo.jpg")
console.log("Uploaded file:", fileId)

// Later, download it
const downloaded = await downloadFile(fileId)
fs.writeFileSync("downloaded.jpg", downloaded)
\`\`\`

## Integration Examples

### Next.js Integration

\`\`\`typescript
// pages/api/store.ts
import { createClient, Annotation, Tagged } from 'arkiv-sdk'

const key = new Tagged("privatekey", Buffer.from(process.env.PRIVATE_KEY!, "hex"))

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = await createClient(
      60138453025,
      key,
      process.env.RPC_URL!,
      process.env.WS_URL!
    )

    const receipt = await client.createEntities([{
      data: new TextEncoder().encode(JSON.stringify(req.body)),
      expiresIn: 86400, // 24 hours
      stringAnnotations: [new Annotation("type", "api-data")],
      numericAnnotations: []
    }])

    res.json({ entityKey: receipt[0].entityKey })
  }
}
\`\`\`

### Express.js Integration

\`\`\`typescript
import express from 'express'
import { createClient, Annotation, Tagged } from 'arkiv-sdk'

const app = express()
const key = new Tagged("privatekey", Buffer.from(process.env.PRIVATE_KEY!, "hex"))

let client: any

async function getClient() {
  if (!client) {
    client = await createClient(
      60138453025,
      key,
      process.env.RPC_URL!,
      process.env.WS_URL!
    )
  }
  return client
}

app.post('/store', async (req, res) => {
  const arkiv = await getClient()
  const receipt = await arkiv.createEntities([{
    data: new TextEncoder().encode(JSON.stringify(req.body)),
    expiresIn: 86400, // 24 hours
    stringAnnotations: [new Annotation("type", "api-data")],
    numericAnnotations: []
  }])
  res.json({ entityKey: receipt[0].entityKey })
})
\`\`\`

### React Hook

\`\`\`typescript
import { useState, useEffect } from 'react'
import { createClient, Annotation, Tagged } from 'arkiv-sdk'

export function useArkiv() {
  const [client, setClient] = useState<any>(null)

  useEffect(() => {
    const init = async () => {
      const key = new Tagged(
        "privatekey",
        Buffer.from(process.env.NEXT_PUBLIC_PRIVATE_KEY!, "hex")
      )
      const arkivClient = await createClient(
        60138453025,
        key,
        process.env.NEXT_PUBLIC_RPC_URL!,
        process.env.NEXT_PUBLIC_WS_URL!
      )
      setClient(arkivClient)
    }
    init()
  }, [])

  const store = async (data: any, expiresIn: number = 86400) => {
    if (!client) throw new Error('Arkiv client not initialized')
    const receipt = await client.createEntities([{
      data: new TextEncoder().encode(JSON.stringify(data)),
      expiresIn,
      stringAnnotations: [new Annotation("type", "app-data")],
      numericAnnotations: []
    }])
    return receipt[0].entityKey
  }

  const get = async (entityKey: string) => {
    if (!client) throw new Error('Arkiv client not initialized')
    const data = await client.getStorageValue(entityKey)
    return JSON.parse(new TextDecoder().decode(data))
  }

  return { store, get, client }
}
\`\`\`

## Testing & Development

### Unit Testing with Jest

Write comprehensive tests for your Arkiv applications.

\`\`\`typescript
// __tests__/arkiv.test.ts
import { createClient, Annotation, Tagged } from 'arkiv-sdk'

describe('Arkiv Client', () => {
  let client: any

  beforeAll(async () => {
    const key = new Tagged(
      "privatekey",
      Buffer.from(process.env.TEST_PRIVATE_KEY!, "hex")
    )

    client = await createClient(
      60138453025,
      key,
      process.env.RPC_URL!,
      process.env.WS_URL!
    )
  })

  test('should create and retrieve entity', async () => {
    const testData = "Test data for Jest"

    // Create entity
    const [receipt] = await client.createEntities([{
      data: new TextEncoder().encode(testData),
      expiresIn: 3600,
      stringAnnotations: [new Annotation("type", "test")],
      numericAnnotations: []
    }])

    expect(receipt.entityKey).toBeDefined()

    // Retrieve entity
    const data = await client.getStorageValue(receipt.entityKey)
    const retrieved = new TextDecoder().decode(data)

    expect(retrieved).toBe(testData)
  })

  test('should query entities by annotations', async () => {
    // Create test entities
    await client.createEntities([
      {
        data: new TextEncoder().encode("Test 1"),
        expiresIn: 3600,
        stringAnnotations: [new Annotation("type", "test-query")],
        numericAnnotations: [new Annotation("priority", 5)]
      },
      {
        data: new TextEncoder().encode("Test 2"),
        expiresIn: 3600,
        stringAnnotations: [new Annotation("type", "test-query")],
        numericAnnotations: [new Annotation("priority", 3)]
      }
    ])

    // Query high priority items
    const results = await client.queryEntities(
      'type = "test-query" && priority > 4'
    )

    expect(results.length).toBeGreaterThanOrEqual(1)
  })
})
\`\`\`

### Deployment Strategies

Best practices for deploying Arkiv applications to production.

**1. Environment Configuration**
\`\`\`bash
# .env.production
PRIVATE_KEY=\${VAULT_PRIVATE_KEY}
RPC_URL=https://kaolin.hoodi.arkiv.network/rpc
WS_URL=wss://kaolin.hoodi.arkiv.network/rpc/ws
NODE_ENV=production
\`\`\`

**2. Docker Deployment**
\`\`\`dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
\`\`\`

**3. Health Checks**
\`\`\`typescript
// health.ts
import { createClient } from 'arkiv-sdk'

export async function healthCheck() {
  try {
    const client = await createClient(
      parseInt(process.env.CHAIN_ID!),
      process.env.PRIVATE_KEY!,
      process.env.RPC_URL!,
      process.env.WS_URL!
    )

    // Try a simple query
    await client.queryEntities('type = "health-check"')

    return { status: 'healthy', timestamp: Date.now() }
  } catch (error) {
    return { status: 'unhealthy', error: error.message }
  }
}
\`\`\`

**4. Monitoring & Logging**
\`\`\`typescript
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

// Log all Arkiv operations
async function createEntityWithLogging(data: any) {
  try {
    logger.info('Creating entity', { data })
    const receipt = await client.createEntities([data])
    logger.info('Entity created', { entityKey: receipt[0].entityKey })
    return receipt
  } catch (error) {
    logger.error('Failed to create entity', { error, data })
    throw error
  }
}
\`\`\`
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
          <p className="font-mono text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Everything you need to build with Arkiv. From quick start guides to comprehensive API documentation.
          </p>
          <p className="font-mono text-sm text-gray-500">
            Last updated: October 2025 · SDK v0.1.19
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
                {/* Page Header with Icon */}
                <div className="mb-12">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📚</span>
                    </div>
                    <h1 className="font-brutal text-4xl font-medium text-black m-0" style={{ textTransform: 'none' }}>
                      {currentContent.title}
                    </h1>
                  </div>
                  <p className="text-lg text-gray-600 font-mono mt-2">
                    {docsNavigation.find(s => s.id === activeSection)?.description}
                  </p>
                </div>

                <div className="docs-content space-y-8 prose prose-slate max-w-none" style={{ textTransform: 'none' }}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({node, ...props}) => (
                        <div className="bg-gradient-to-r from-blue-50 to-transparent border-l-4 border-blue-600 pl-6 py-4 my-10 rounded-r-lg">
                          <h1 className="font-brutal text-3xl font-medium text-black m-0" style={{ textTransform: 'none' }} {...props} />
                        </div>
                      ),
                      h2: ({node, ...props}) => (
                        <h2 className="font-brutal text-2xl font-medium text-black mt-12 mb-6 pb-3 border-b-2 border-gray-200" style={{ textTransform: 'none' }} {...props} />
                      ),
                      h3: ({node, ...props}) => (
                        <h3 className="font-brutal text-xl font-medium text-black mt-8 mb-4" style={{ textTransform: 'none' }} {...props} />
                      ),
                      p: ({node, ...props}) => {
                        // Check if paragraph starts with bold text (concept highlight)
                        const text = String(props.children);
                        const startsWithBold = text.match(/^\*\*(.+?)\*\*/);

                        if (startsWithBold) {
                          return (
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r">
                              <p className="mb-0 text-gray-800 leading-relaxed font-mono text-sm" style={{ textTransform: 'none' }} {...props} />
                            </div>
                          );
                        }

                        return <p className="mb-6 text-gray-700 leading-relaxed text-base" style={{ textTransform: 'none' }} {...props} />;
                      },
                      ul: ({node, ...props}) => <ul className="list-none my-6 space-y-3 pl-0" style={{ textTransform: 'none' }} {...props} />,
                      li: ({node, ...props}) => (
                        <li className="text-gray-700 pl-6 relative before:content-['▸'] before:absolute before:left-0 before:text-blue-600 before:font-bold" style={{ textTransform: 'none' }} {...props} />
                      ),
                      a: ({node, ...props}) => (
                        <a className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 font-medium transition-colors" style={{ textTransform: 'none' }} {...props} />
                      ),
                      pre: ({node, ...props}) => (
                        <pre className="bg-white" {...props} />
                      ),
                      code: ({node, inline, className, children, ...props}: any) => {
                        const match = /language-(\w+)/.exec(className || '')
                        const language = match ? match[1] : 'typescript'
                        return !inline ? (
                          <div className="my-8">
                            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
                              {/* Language Badge */}
                              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                                <span className="text-xs font-mono text-gray-300 uppercase tracking-wide">{language}</span>
                                <span className="text-xs text-gray-400">Example</span>
                              </div>
                              <CodeBlock code={String(children).replace(/\n$/, '')} language={language} />
                            </div>
                          </div>
                        ) : (
                          <code className="bg-blue-100 text-blue-900 px-2 py-1 rounded font-mono text-sm font-semibold" style={{ textTransform: 'none' }} {...props}>
                            {children}
                          </code>
                        )
                      },
                      table: ({node, ...props}) => (
                        <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 shadow-sm">
                          <table className="w-full border-collapse" {...props} />
                        </div>
                      ),
                      thead: ({node, ...props}) => <thead className="bg-gray-100" {...props} />,
                      th: ({node, ...props}) => <th className="border-b-2 border-gray-300 px-4 py-3 text-left font-brutal text-sm uppercase" {...props} />,
                      td: ({node, ...props}) => <td className="border-b border-gray-200 px-4 py-3 text-sm" {...props} />
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