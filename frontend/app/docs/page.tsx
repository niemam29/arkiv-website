'use client'

import { useState } from 'react'
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
    description: 'TypeScript, Python, and Rust SDKs'
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

**Arkiv** is a revolutionary decentralized data layer that brings queryable, time-scoped storage to Ethereum. Built on ETHWarsaw Holesky testnet, Arkiv enables developers to store, query, and manage data with built-in expiration and powerful annotation systems.

## 🚀 Why Arkiv?

Unlike traditional blockchain storage solutions, Arkiv is designed from the ground up for **data as a first-class citizen**:

### ⚡ **Instant Queries**
- SQL-like queries with annotations
- Real-time data retrieval
- No need for external indexing services

### 💰 **Cost-Efficient**
- Pay only for storage duration (BTL - Blocks To Live)
- Automatic data pruning saves costs
- No permanent storage fees

### 🔗 **Ethereum-Native**
- Built on proven Ethereum infrastructure
- Full transparency and verifiability
- Compatible with existing Web3 tools

### 🎯 **Developer-Friendly**
- Simple CRUD operations
- TypeScript SDK with full type safety
- Real-time event streaming

## 🏗️ How It Works

Arkiv uses a unique **three-layer architecture**:

### 🔷 Layer 1: Ethereum Mainnet
**Final Settlement & Security**
- Proof verification and commitments
- Ultimate source of truth
- Ethereum's proven security model

### 🔷 Layer 2: Arkiv Coordination Layer
**Data Management & Registry**
- DB-chain coordination and registry
- Cross-chain data synchronization
- Deterministic query resolution

### 🔷 Layer 3: Specialized DB-Chains
**High-Performance Data Operations**
- CRUD operations via JSON-RPC
- Indexed queries with annotations
- Programmable data expiration (BTL)

## 🎯 Perfect For

### 🗂️ **Temporary Data Storage**
- Session data that expires automatically
- Cross-device clipboards and notes
- Cached API responses with TTL

### 📊 **Event & Analytics Data**
- Application logs with automatic cleanup
- User activity tracking
- Temporary metrics collection

### 🖼️ **File & Media Management**
- Image metadata with expiration
- Document versioning systems
- Chunked file storage

### 🔄 **Real-Time Applications**
- Live chat applications
- Collaborative tools
- IoT data streams

## 💡 Key Concepts

### **Entities**
Data records with content, annotations, and expiration time.

### **Annotations**
Key-value pairs for efficient querying:
- **String annotations**: \`type = "note"\`, \`category = "work"\`
- **Numeric annotations**: \`priority = 5\`, \`created = 1672531200\`

### **BTL (Blocks To Live)**
Automatic expiration system:
- \`900\` blocks = ~30 minutes
- \`43200\` blocks = ~24 hours
- \`302400\` blocks = ~7 days

### **Query Language**
SQL-like syntax for data retrieval:
\`\`\`sql
type = "note" && priority > 3 && created > 1672531200
\`\`\`

## 🌟 Live Demo

Try Arkiv right now on **ETHWarsaw Testnet**:

### **Network Details**
- **Chain ID**: \`60138453033\`
- **RPC URL**: \`https://ethwarsaw.holesky.golemdb.io/rpc\`
- **WebSocket**: \`wss://ethwarsaw.holesky.golemdb.io/rpc/ws\`
- **Faucet**: [Get Test ETH](https://ethwarsaw.holesky.golemdb.io/faucet/)
- **Explorer**: [View Transactions](https://explorer.ethwarsaw.holesky.golemdb.io)

### **Quick Test**
\`\`\`typescript
import { createClient, Annotation } from 'golem-base-sdk'

// Connect to Arkiv
const client = await createClient(
  60138453033,
  "YOUR_PRIVATE_KEY",
  "https://ethwarsaw.holesky.golemdb.io/rpc",
  "wss://ethwarsaw.holesky.golemdb.io/rpc/ws"
)

// Store data with 1-hour expiration
const receipt = await client.createEntities([{
  data: new TextEncoder().encode("Hello Arkiv!"),
  btl: 1800, // 1 hour
  stringAnnotations: [new Annotation("type", "greeting")],
  numericAnnotations: []
}])

console.log("Stored:", receipt[0].entityKey)
\`\`\`

## 🎓 Next Steps

Ready to build with Arkiv? Here's your learning path:

1. **[Getting Started →](/getting-started)** - Set up your development environment
2. **[SDK Reference →](#sdk)** - Explore TypeScript, Python, and Rust SDKs
3. **[API Docs →](#api)** - Learn the JSON-RPC interface
4. **[Guides →](#guides)** - Build real applications step-by-step

### **Need Help?**
- 📋 [Playground](/playground) - Interactive code examples
- 💬 [Discord Community](https://discord.gg/arkiv) - Get support
- 📖 [Full Documentation](https://arkiv.network/docs) - Deep dive guides
`
}

const gettingStartedContent = {
  title: 'Getting Started',
  content: `
# Quick Start Guides

Choose your preferred development environment to get started with Arkiv:

## TypeScript SDK
If you're using TypeScript, the TypeScript SDK will walk you through the setup and help you run your first Arkiv app in less than 10 minutes.

[**→ TypeScript Quickstart**](/getting-started?section=typescript)

## Python SDK
To run Python code with Arkiv, the Python SDK is a great starting point — it guides you through the full setup and gets you up and running in under 10 minutes.

[**→ Python Quickstart**](/getting-started?section=python)

## Rust SDK
If you're working with Rust and want to use Arkiv, check out the Rust SDK. It shows you how to set things up and run your first task in just a few minutes.

[**→ Rust Quickstart**](/getting-started?section=rust)

## CLI Guide
If you're working with the command line, the CLI guide explains how to set up the CLI and run commands from your terminal.

[**→ CLI Guide**](/getting-started?section=cli)

## Prerequisites

Before you begin, ensure you have:

1. **Node.js 18+** or **Bun runtime** installed
2. **Basic understanding** of TypeScript/JavaScript
3. **Ethereum wallet** for testnet interactions
4. **Git** for cloning repositories

## First Steps

1. **Install the SDK** of your choice
2. **Set up your environment** with API keys
3. **Connect to a testnet** for development
4. **Run your first query** to store and retrieve data
5. **Explore advanced features** like time-scoped storage

Pick the approach that suits your needs and start building with Arkiv today!
`
}

const sdkContent = {
  title: 'SDKs & Libraries',
  content: `
# Software Development Kits

Build powerful applications with Arkiv using our official SDKs and libraries.

## 🚀 TypeScript SDK (golem-base-sdk)

The **golem-base-sdk** is our flagship TypeScript SDK with full type safety and comprehensive features.

### Installation
\`\`\`bash
# Using Bun (recommended)
bun add golem-base-sdk crypto dotenv

# Using npm
npm install golem-base-sdk crypto dotenv
\`\`\`

### Quick Start
\`\`\`typescript
import { createClient, Annotation, Tagged } from 'golem-base-sdk'
import { randomUUID } from 'crypto'

// Create client connection
const client = await createClient(
  60138453033, // ETHWarsaw Chain ID
  new Tagged("privatekey", Buffer.from("YOUR_PRIVATE_KEY", "hex")),
  "https://ethwarsaw.holesky.golemdb.io/rpc",
  "wss://ethwarsaw.holesky.golemdb.io/rpc/ws"
)

// Store data with annotations
const noteData = { title: "My Note", content: "Hello Arkiv!" }
const receipt = await client.createEntities([{
  data: new TextEncoder().encode(JSON.stringify(noteData)),
  btl: 43200, // 24 hours
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

### Core Operations

#### 🔍 **Query Data**
\`\`\`typescript
// Query by annotations
const notes = await client.queryEntities('type = "note" && created > 1672531200')

// Process results
for (const entity of notes) {
  const data = JSON.parse(new TextDecoder().decode(entity.storageValue))
  console.log(\`Note: \${data.title} - \${data.content}\`)
}
\`\`\`

#### 📝 **Update Data**
\`\`\`typescript
// Update existing entity
const updateReceipt = await client.updateEntities([{
  entityKey: receipt[0].entityKey,
  data: new TextEncoder().encode(JSON.stringify({
    title: "Updated Note",
    content: "This note has been updated"
  })),
  btl: 86400, // Extend to 48 hours
  stringAnnotations: [new Annotation("type", "note")],
  numericAnnotations: [new Annotation("updated", Date.now())]
}])
\`\`\`

#### 🗑️ **Delete Data**
\`\`\`typescript
// Delete entity
const deleteReceipt = await client.deleteEntities([receipt[0].entityKey])
console.log('Entity deleted:', deleteReceipt[0].entityKey)
\`\`\`

#### ⚡ **Real-time Events**
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

### Advanced Features

#### 🔄 **Batch Operations**
\`\`\`typescript
// Create multiple entities at once
const entities = Array.from({ length: 5 }, (_, i) => ({
  data: new TextEncoder().encode(\`Batch item \${i}\`),
  btl: 1800, // 1 hour
  stringAnnotations: [new Annotation("type", "batch")],
  numericAnnotations: [new Annotation("index", i)]
}))

const batchReceipts = await client.createEntities(entities)
console.log(\`Created \${batchReceipts.length} entities\`)
\`\`\`

#### ⏰ **BTL Management**
\`\`\`typescript
// Extend entity lifetime
const extendReceipts = await client.extendEntities([{
  entityKey: receipt[0].entityKey,
  numberOfBlocks: 43200 // Add 24 more hours
}])

console.log(\`Extended to block: \${extendReceipts[0].newExpirationBlock}\`)
\`\`\`

## 🐍 Python SDK (Coming Soon)

Perfect for data science, AI/ML applications, and backend services.

\`\`\`python
# Preview of upcoming Python SDK
from arkiv_python import ArkivClient
import os

client = ArkivClient(
    chain_id=60138453033,
    private_key=os.getenv("PRIVATE_KEY"),
    rpc_url="https://ethwarsaw.holesky.golemdb.io/rpc"
)

# Create entity
entity = client.create_entity(
    data={"message": "Hello from Python!"},
    btl=43200,  # 24 hours
    annotations={
        "type": "greeting",
        "language": "python"
    }
)

print(f"Created entity: {entity.key}")
\`\`\`

## ⚙️ Rust SDK (Planned)

High-performance SDK for systems programming and performance-critical applications.

\`\`\`rust
// Preview of upcoming Rust SDK
use arkiv_rust::{ArkivClient, Entity, Annotation};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = ArkivClient::new(
        60138453033,
        &std::env::var("PRIVATE_KEY")?,
        "https://ethwarsaw.holesky.golemdb.io/rpc"
    ).await?;

    let entity = client.create_entity(Entity {
        data: serde_json::json!({"message": "Hello from Rust!"}),
        btl: 43200,
        annotations: vec![
            Annotation::string("type", "greeting"),
            Annotation::string("language", "rust")
        ]
    }).await?;

    println!("Created entity: {}", entity.key);
    Ok(())
}
\`\`\`

## 📊 SDK Comparison

| Feature | TypeScript (golem-base-sdk) | Python | Rust |
|---------|----------------------------|--------|------|
| **Status** | ✅ Production Ready | 🚧 In Development | 📋 Planned |
| **CRUD Operations** | ✅ Full Support | 🚧 Coming Soon | 📋 Planned |
| **Real-time Events** | ✅ WebSocket Support | 🚧 Coming Soon | 📋 Planned |
| **Batch Operations** | ✅ Full Support | 🚧 Coming Soon | 📋 Planned |
| **Type Safety** | ✅ Full TypeScript | 🚧 Type Hints | ✅ Rust Types |
| **Performance** | ⚡ Fast | ⚡ Fast | 🚀 Blazing Fast |
| **Use Cases** | Web Apps, APIs, Node.js | Data Science, ML, Backend | Systems, High Performance |

### **Getting Started Recommendations**

- **🚀 Start Now**: Use TypeScript SDK (golem-base-sdk) for immediate development
- **🐍 Python Developers**: Join our waitlist for Python SDK beta access
- **⚙️ Rust Developers**: Follow our roadmap for Rust SDK updates

### **Resources**

- **TypeScript**: [Getting Started Guide](/getting-started) | [NPM Package](https://www.npmjs.com/package/golem-base-sdk)
- **GitHub**: [SDK Repository](https://github.com/golem-base/typescript-sdk)
- **Support**: [Discord Community](https://discord.gg/arkiv) | [GitHub Issues](https://github.com/golem-base/typescript-sdk/issues)
`
}

const apiContent = {
  title: 'API Reference',
  content: `
# JSON-RPC API Reference

Arkiv is built on Ethereum JSON-RPC standard. Use these endpoints to interact directly with the network.

## 🌐 Network Information

### **ETHWarsaw Holesky Testnet**
- **Chain ID**: \`60138453033\`
- **RPC URL**: \`https://ethwarsaw.holesky.golemdb.io/rpc\`
- **WebSocket**: \`wss://ethwarsaw.holesky.golemdb.io/rpc/ws\`
- **Explorer**: [https://explorer.ethwarsaw.holesky.golemdb.io](https://explorer.ethwarsaw.holesky.golemdb.io)
- **Faucet**: [https://ethwarsaw.holesky.golemdb.io/faucet/](https://ethwarsaw.holesky.golemdb.io/faucet/)

## 🔐 Authentication

Arkiv uses Ethereum private key signing for authentication. Include your private key in the SDK client initialization:

\`\`\`typescript
// SDK handles authentication automatically
const client = await createClient(
  60138453033,
  new Tagged("privatekey", Buffer.from("YOUR_PRIVATE_KEY", "hex")),
  "https://ethwarsaw.holesky.golemdb.io/rpc",
  "wss://ethwarsaw.holesky.golemdb.io/rpc/ws"
)
\`\`\`

## 📋 Core Operations

All operations are performed through the **golem-base-sdk** which abstracts the underlying Ethereum transactions.

### 🆕 **Create Entities**

Store data with annotations and automatic expiration.

\`\`\`typescript
// Create single entity
const receipt = await client.createEntities([{
  data: new TextEncoder().encode(JSON.stringify({ message: "Hello" })),
  btl: 43200, // ~24 hours (blocks to live)
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

### 🔍 **Query Entities**

Find entities using SQL-like annotation queries.

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
  btl: 86400, // Extend to ~48 hours
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

Add more blocks to entity's BTL (Blocks To Live).

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
  btl: 1800,
  stringAnnotations: [new Annotation("type", "batch")],
  numericAnnotations: [new Annotation("index", i)]
}))

const batchReceipts = await client.createEntities(entities)
console.log(\`✅ Created \${batchReceipts.length} entities\`)

// Query all batch items
const batchItems = await client.queryEntities('type = "batch"')
console.log(\`📊 Found \${batchItems.length} batch items\`)
\`\`\`

## 💡 **BTL (Blocks To Live) Reference**

Understanding entity expiration times:

| BTL Value | Time (approx.) | Use Case |
|-----------|----------------|----------|
| \`900\` | 30 minutes | Session data, temporary cache |
| \`1800\` | 1 hour | Short-term storage, clipboard |
| \`43200\` | 24 hours | Daily data, notes, messages |
| \`302400\` | 7 days | Weekly data, file metadata |
| \`1296000\` | 30 days | Monthly archives, backups |

**Note**: Each block is approximately 2 seconds on ETHWarsaw Holesky testnet.

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
- **🔗 Add Network to MetaMask**: [ETHWarsaw Holesky](https://chainlist.org/chain/17000)
- **💰 Get Test ETH**: [Faucet](https://ethwarsaw.holesky.golemdb.io/faucet/)
- **🔍 Block Explorer**: [View Transactions](https://explorer.ethwarsaw.holesky.golemdb.io)
- **📊 Network Dashboard**: [Status & Metrics](https://ethwarsaw.holesky.golemdb.io/)

### **SDK Documentation**
- **📦 NPM Package**: [golem-base-sdk](https://www.npmjs.com/package/golem-base-sdk)
- **📚 TypeScript Docs**: [API Reference](https://docs.golemdb.io/typescript-sdk)
- **🛠️ GitHub Repository**: [Source Code](https://github.com/golem-base/typescript-sdk)

## 🎯 **Best Practices**

### **Efficient Querying**
\`\`\`typescript
// ✅ Good: Specific queries
const notes = await client.queryEntities('type = "note" && priority > 3')

// ❌ Avoid: Overly broad queries
const all = await client.queryEntities('type = "note"') // Returns everything
\`\`\`

### **Proper BTL Management**
\`\`\`typescript
// ✅ Good: Choose appropriate BTL for data type
const sessionData = { btl: 900 }    // 30 minutes
const dailyNotes = { btl: 43200 }   // 24 hours
const weeklyBackup = { btl: 302400 } // 7 days
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

## Quick Start Projects

### 1. Build a Decentralized Note-Taking App

Create a simple note-taking app with automatic expiration and annotations.

\`\`\`typescript
import { createClient, Annotation } from 'golem-base-sdk'

const client = await createClient(
  60138453033, // ETHWarsaw testnet
  privateKey,
  "https://ethwarsaw.holesky.golemdb.io/rpc",
  "wss://ethwarsaw.holesky.golemdb.io/rpc/ws"
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
  btl: 43200, // ~24 hours (43200 blocks * 2 seconds)
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

[**→ Image Storage Guide**](/guides/image-storage)

### Real-time Data Sync

Build applications that sync data in real-time across multiple clients.

[**→ Real-time Sync Guide**](/guides/realtime-sync)

## Advanced Guides

### Custom DB-Chain Deployment

Deploy your own specialized database chain for specific use cases.

[**→ DB-Chain Deployment**](/guides/db-chain)

### Performance Optimization

Best practices for optimizing query performance and reducing costs.

[**→ Performance Guide**](/guides/performance)

### Security Best Practices

Ensure your applications follow security best practices.

[**→ Security Guide**](/guides/security)

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

[**→ Local Setup Guide**](/guides/local-setup)

### Unit Testing

Write comprehensive tests for your Arkiv applications.

[**→ Testing Guide**](/guides/testing)

### Deployment Strategies

Best practices for deploying Arkiv applications to production.

[**→ Deployment Guide**](/guides/deployment)
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
                      onClick={() => setActiveSection(section.id)}
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
                <div className="docs-content space-y-4" style={{ textTransform: 'none' }}>
                  {currentContent.content.split('\n\n').map((section, index) => {
                    if (section.startsWith('# ')) {
                      return (
                        <h1 key={index} className="font-brutal text-2xl font-medium text-black mt-8 mb-4 border-b border-gray-200 pb-2" style={{ textTransform: 'none' }}>
                          {section.replace('# ', '')}
                        </h1>
                      )
                    }
                    if (section.startsWith('## ')) {
                      return (
                        <h2 key={index} className="font-brutal text-xl font-medium text-black mt-6 mb-3" style={{ textTransform: 'none' }}>
                          {section.replace('## ', '')}
                        </h2>
                      )
                    }
                    if (section.startsWith('### ')) {
                      return (
                        <h3 key={index} className="font-semibold text-lg text-black mt-4 mb-2" style={{ textTransform: 'none' }}>
                          {section.replace('### ', '')}
                        </h3>
                      )
                    }
                    if (section.startsWith('```')) {
                      const lines = section.split('\n')
                      const firstLine = lines[0] || ''
                      const language = firstLine.replace('```', '') || 'typescript'
                      const codeContent = lines.slice(1, -1).join('\n')
                      return (
                        <div key={index} className="my-6">
                          <CodeBlock code={codeContent} language={language} />
                        </div>
                      )
                    }
                    if (section.includes('|')) {
                      const rows = section.split('\n').filter(row => row.includes('|'))
                      if (rows.length > 1) {
                        return (
                          <div key={index} className="overflow-x-auto my-6">
                            <table className="w-full border-collapse border border-gray-300">
                              <thead>
                                <tr className="bg-gray-50">
                                  {rows[0]?.split('|').filter(cell => cell.trim()).map((header, i) => (
                                    <th key={i} className="border border-gray-300 px-3 py-2 text-left font-semibold">
                                      {header.trim()}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {rows.slice(2).map((row, i) => (
                                  <tr key={i}>
                                    {row.split('|').filter(cell => cell.trim()).map((cell, j) => (
                                      <td key={j} className="border border-gray-300 px-3 py-2 text-sm">
                                        {cell.trim()}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )
                      }
                    }
                    if (section.startsWith('- ')) {
                      const items = section.split('\n').filter(item => item.startsWith('- '))
                      return (
                        <ul key={index} className="list-disc list-inside my-4 space-y-2" style={{ textTransform: 'none' }}>
                          {items.map((item, i) => {
                            const content = item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            return (
                              <li key={i} className="text-gray-700" style={{ textTransform: 'none' }} dangerouslySetInnerHTML={{ __html: content }} />
                            )
                          })}
                        </ul>
                      )
                    }
                    if (section.trim()) {
                      let content = section
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-black">$1</strong>')
                        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>')
                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline font-medium">$1</a>')

                      return (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed" style={{ textTransform: 'none' }} dangerouslySetInnerHTML={{ __html: content }} />
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="px-4 md:px-[60px] py-[64px] bg-[#181EA9]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-8">
            {/* Main Footer Content - Single Row */}
            <div className="flex items-start justify-between">
              {/* Large ARKIV Logo */}
              <div className="flex-shrink-0">
                <h2 className="font-brutal text-[60px] md:text-[80px] font-black uppercase text-white leading-tight tracking-wider">
                  [ ARKIV ]
                </h2>
              </div>

              {/* Footer Navigation - Horizontal Layout */}
              <div className="flex gap-16 items-start">
                {/* Developers */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-mono text-sm text-white leading-tight mb-2">Developers</h3>
                  <div className="flex flex-col gap-1">
                    <a href="/docs" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Docs</a>
                    <a href="/getting-started" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Getting Started</a>
                    <a href="/playground" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Playground</a>
                    <a href="https://github.com/arkiv-network" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">GitHub</a>
                    <a href="/litepaper" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Litepaper</a>
                    <a href="/whitepaper" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Whitepaper [Soon]</a>
                    <a href="/aips" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">AIPs [Soon]</a>
                  </div>
                </div>

                {/* Company */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-mono text-sm text-white leading-tight mb-2">Company</h3>
                  <div className="flex flex-col gap-1">
                    <a href="https://www.golem.network/" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Golem</a>
                    <a href="https://glm.golem.network/" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">GLM Token</a>
                    <a href="https://www.golem.network/careers" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Careers</a>
                    <a href="#upcoming-events" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Events</a>
                  </div>
                </div>

                {/* Connect */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-mono text-sm text-white leading-tight mb-2">Connect</h3>
                  <div className="flex flex-col gap-1">
                    <a href="https://twitter.com/arkiv" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">X</a>
                    <a href="https://discord.gg/arkiv" className="font-mono text-sm text-white leading-tight hover:text-gray-200 transition-colors">Discord</a>
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
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="font-mono text-sm text-white leading-tight">© 2025 Arkiv</span>
              <span className="font-mono text-sm text-white leading-tight">All rights reserved</span>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}