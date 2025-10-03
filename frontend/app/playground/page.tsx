'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { pythonExamples } from '@/data/python-examples'
import Footer from '@/components/layout/Footer'

const CodePlayground = dynamic(() => import('@/components/ui/CodePlayground').then((mod) => ({ default: mod.CodePlayground })), {
  loading: () => (
    <div className="w-full h-[600px] bg-gray-50 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-gray-400 font-mono">Loading playground...</div>
    </div>
  ),
  ssr: false
})

const examples = {
  connect: {
    title: 'Connect with Ethers',
    description: 'Connect to Arkiv using ethers.js',
    code: `// Connect using ethers.js
// Note: ethers is already imported in the playground environment

// Setup provider and wallet
const provider = new ethers.JsonRpcProvider(
  "https://kaolin.hoodi.arkiv.network/rpc"
);

// Create wallet from private key (ethers needs 0x prefix)
const wallet = new ethers.Wallet(mockPrivateKeyWithPrefix, provider);

// Get wallet information
const address = await wallet.getAddress();
const balance = await provider.getBalance(address);

console.log("Connected to Arkiv testnet");
console.log("Wallet address:", address);
console.log("Balance:", ethers.formatEther(balance), "ETH");

// Get network info
const network = await provider.getNetwork();
console.log("Chain ID:", network.chainId.toString());
console.log("Network name:", network.name === "unknown" ? "Arkiv testnet" : (network.name || "Arkiv testnet"));`
  },

  create: {
    title: 'Smart Contract Interaction',
    description: 'Interact with Arkiv smart contract using ethers',
    code: `// Interact with Arkiv smart contract
// Note: ethers is already imported in the playground environment

// Setup provider and wallet
const provider = new ethers.JsonRpcProvider(
  "https://kaolin.hoodi.arkiv.network/rpc"
);
const wallet = new ethers.Wallet(mockPrivateKeyWithPrefix, provider);

// Arkiv contract ABI (simplified example)
const abi = [
  "function createEntity(bytes data, uint256 btl, tuple(string key, string value)[] stringAnnotations) returns (bytes32)",
  "function getEntity(bytes32 entityKey) view returns (bytes, uint256, tuple(string, string)[])",
  "event EntityCreated(bytes32 indexed entityKey, address indexed owner, uint256 expirationBlock)"
];

// Contract address (example - would need actual deployed address)
const contractAddress = "0x0000000000000000000000000000000000000000";
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Example: Create entity transaction
const entityData = ethers.toUtf8Bytes(JSON.stringify({
  message: "Hello from ethers.js!",
  timestamp: Date.now()
}));

const btl = 300; // Block-to-live
const annotations = [
  { key: "type", value: "message" },
  { key: "author", value: "ethers-demo" }
];

console.log("Preparing to create entity...");
console.log("Data:", ethers.toUtf8String(entityData));
console.log("BTL:", btl);
console.log("Annotations:", annotations);

// Note: In playground, actual transaction would require deployed contract
console.log("");
console.log("⚠️ Contract interaction example - requires deployed contract address");`
  },

  query: {
    title: 'Read Blockchain Data',
    description: 'Query blockchain data using ethers',
    code: `// Query blockchain data with ethers
// Note: ethers is already imported in the playground environment

const provider = new ethers.JsonRpcProvider(
  "https://kaolin.hoodi.arkiv.network/rpc"
);

// Get current block information
const blockNumber = await provider.getBlockNumber();
const block = await provider.getBlock(blockNumber);

console.log("Current block number:", blockNumber);
console.log("Block timestamp:", new Date(block.timestamp * 1000).toISOString());
console.log("Block hash:", block.hash);
console.log("Transactions in block:", block.transactions.length);

// Get transaction count for an address
const address = "0x4393CE3C46f74CC5c30809b122acd69EE74aC532";
const txCount = await provider.getTransactionCount(address);
console.log("");
console.log("Transaction count for", address.slice(0, 10) + "...:", txCount);

// Query logs/events (example filter)
const filter = {
  fromBlock: blockNumber - 100,
  toBlock: blockNumber,
  topics: [] // Add specific event topics here
};

try {
  const logs = await provider.getLogs(filter);
  console.log("");
  console.log("Found", logs.length, "logs in last 100 blocks");

  if (logs.length > 0) {
    console.log("Sample log:", {
      address: logs[0].address,
      blockNumber: logs[0].blockNumber,
      topics: logs[0].topics.length + " topics"
    });
  }
} catch (error) {
  console.log("");
  console.log("Log query example (may require specific event filters)");
}`
  },

  update: {
    title: 'Send Transaction',
    description: 'Send a transaction using ethers',
    code: `// Send transaction with ethers
// Note: ethers is already imported in the playground environment

const provider = new ethers.JsonRpcProvider(
  "https://kaolin.hoodi.arkiv.network/rpc"
);
const wallet = new ethers.Wallet(mockPrivateKeyWithPrefix, provider);

// Get current gas price
const feeData = await provider.getFeeData();
console.log("Current gas price:", ethers.formatUnits(feeData.gasPrice, "gwei"), "gwei");

// Prepare transaction
const tx = {
  to: "0x4393CE3C46f74CC5c30809b122acd69EE74aC532", // Example recipient
  value: ethers.parseEther("0.001"), // Send 0.001 ETH
  data: "0x", // No data for simple transfer
  gasLimit: 21000, // Standard gas limit for ETH transfer
  gasPrice: feeData.gasPrice
};

console.log("");
console.log("Transaction details:");
console.log("To:", tx.to);
console.log("Value:", ethers.formatEther(tx.value), "ETH");
console.log("Gas limit:", tx.gasLimit);

// Estimate gas
try {
  const estimatedGas = await wallet.estimateGas(tx);
  console.log("Estimated gas:", estimatedGas.toString());

  // Calculate transaction cost
  const txCost = estimatedGas * feeData.gasPrice;
  console.log("Estimated cost:", ethers.formatEther(txCost), "ETH");
} catch (error) {
  console.log("Gas estimation example (requires sufficient balance)");
}

// Sign transaction (without sending)
const signedTx = await wallet.signTransaction(tx);
console.log("");
console.log("Signed transaction (not sent):");
console.log(signedTx.slice(0, 100) + "...");

console.log("");
console.log("⚠️ Transaction not sent in playground environment");`
  },

  events: {
    title: 'Event Listening',
    description: 'Listen to blockchain events with ethers',
    code: `// Listen to events with ethers
// Note: ethers is already imported in the playground environment

const provider = new ethers.JsonRpcProvider(
  "https://kaolin.hoodi.arkiv.network/rpc"
);

console.log("=== Event Listening Example ===");
console.log("");
console.log("⚠️  NOTE: Real-time WebSocket event listening is limited in playground");
console.log("    This example shows event filtering and historical queries");
console.log("");

// Get current block for reference
const currentBlock = await provider.getBlockNumber();
console.log("Current block:", currentBlock);

// Example: ERC20 Transfer event filter
// In a real scenario, you'd use a specific contract address
const transferEventSignature = ethers.id("Transfer(address,address,uint256)");
console.log("");
console.log("Transfer event topic:", transferEventSignature);

// Create a filter for recent events
const filter = {
  fromBlock: Math.max(0, currentBlock - 1000),
  toBlock: currentBlock,
  topics: [transferEventSignature]
};

console.log("");
console.log("Searching for Transfer events in last 1000 blocks...");

try {
  const logs = await provider.getLogs(filter);
  console.log("Found", logs.length, "Transfer events");

  if (logs.length > 0) {
    // Show first event details
    const log = logs[0];
    console.log("");
    console.log("Sample event:");
    console.log("  Block:", log.blockNumber);
    console.log("  Transaction:", log.transactionHash.slice(0, 10) + "...");
    console.log("  Contract:", log.address);
  }
} catch (error) {
  console.log("No Transfer events found (this is normal on test networks)");
}

console.log("");
console.log("For real-time WebSocket events, use:");
console.log('provider.on("block", (blockNumber) => { ... })');
console.log('provider.on("pending", (tx) => { ... })');`
  },

  metamask: {
    title: 'MetaMask Integration',
    description: 'Use MetaMask wallet with Arkiv',
    code: `// MetaMask integration example
// Note: ethers is already imported in the playground environment

// In a real app, you'd check if MetaMask is connected
// For playground, we'll use a mock wallet
console.log("Using mock wallet for demonstration");
console.log("");

const provider = new ethers.JsonRpcProvider(
  "https://kaolin.hoodi.arkiv.network/rpc"
);
const wallet = new ethers.Wallet(mockPrivateKeyWithPrefix, provider);
const address = await wallet.getAddress();

console.log("Wallet address:", address);

// Get wallet info
const balance = await provider.getBalance(address);
console.log("Balance:", ethers.formatEther(balance), "ETH");

// Get transaction count
const txCount = await provider.getTransactionCount(address);
console.log("Transaction count:", txCount);

// Get current block
const blockNumber = await provider.getBlockNumber();
console.log("Current block:", blockNumber);

console.log("");
console.log("💡 In a real app:");
console.log("1. Click 'Connect MetaMask' to use your wallet");
console.log("2. Sign transactions when prompted");
console.log("3. Your wallet pays for gas fees");`
  },

  batch: {
    title: 'Batch Operations',
    description: 'Perform multiple operations efficiently',
    code: `// Initialize client first
// Note: mockPrivateKey is already defined in the playground environment
const privateKeyHex = mockPrivateKey;
const privateKey = new Uint8Array(
  privateKeyHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
);

const client = await createClient(
  60138453033, // Arkiv testnet Chain ID
  new Tagged("privatekey", privateKey),
  "https://kaolin.hoodi.arkiv.network/rpc",
  "wss://kaolin.hoodi.arkiv.network/rpc/ws"
);

// Create multiple entities in a single transaction
const batchEntities = [];
for (let i = 0; i < 5; i++) {
  batchEntities.push({
    data: new TextEncoder().encode(\`Batch item \${i}\`),
    btl: 300,
    stringAnnotations: [
      { key: "type", value: "batch" },
      { key: "index", value: i.toString() }
    ],
    numericAnnotations: []
  });
}

console.log("Creating", batchEntities.length, "entities in batch...");
const receipts = await client.createEntities(batchEntities);
console.log("✓ Created", receipts.length, "entities");

// Query all batch entities
const results = await client.queryEntities('type = "batch"');
console.log("✓ Found", results.length, "batch entities");

// Display results
results.forEach((entity, idx) => {
  const data = new TextDecoder().decode(entity.storageValue);
  console.log(\`  [\${idx}] \${entity.entityKey.slice(0, 10)}... → \${data}\`);
});`
  },

  fullExample: {
    title: 'Full Example',
    description: 'Complete Arkiv workflow demonstration',
    code: `// === COMPLETE ARKIV EXAMPLE ===
// Note: mockPrivateKey is already defined in the playground environment
console.log("=== ARKIV COMPLETE EXAMPLE ===");
console.log("");

// 1. Initialize client
console.log("1. Initializing Arkiv client...");
const privateKeyHex = mockPrivateKey;
const privateKey = new Uint8Array(
  privateKeyHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
);

const client = await createClient(
  60138453033,
  new Tagged("privatekey", privateKey),
  "https://kaolin.hoodi.arkiv.network/rpc",
  "wss://kaolin.hoodi.arkiv.network/rpc/ws"
);

const ownerAddress = await client.getOwnerAddress();
console.log("  ✓ Connected as:", ownerAddress.slice(0, 10) + "...");
console.log("");

// 2. CREATE entities
console.log("2. Creating entities...");
const creates = [];
for (let i = 1; i <= 3; i++) {
  creates.push({
    data: new TextEncoder().encode(\`Demo item \${i}\`),
    btl: 300,
    stringAnnotations: [
      { key: "type", value: "demo-item" },
      { key: "name", value: \`Item \${i}\` }
    ],
    numericAnnotations: [{ key: "priority", value: i }]
  });
}

const createReceipts = await client.createEntities(creates);
console.log("  ✓ Created " + createReceipts.length + " entities");
console.log("");

// 3. QUERY entities
console.log("3. Querying entities...");
const queryResults = await client.queryEntities('type = "demo-item"');
console.log("  ✓ Found " + queryResults.length + " entities");
queryResults.forEach((entity, idx) => {
  const data = new TextDecoder().decode(entity.storageValue);
  console.log("    [" + idx + "] " + entity.entityKey.slice(0, 10) + "... → " + data);
});
console.log("");

// 4. UPDATE entity
console.log("4. Updating first entity...");
const firstKey = createReceipts[0].entityKey;
const updateReceipt = await client.updateEntities([{
  entityKey: firstKey,
  data: new TextEncoder().encode("Updated demo item 1"),
  btl: 600,
  stringAnnotations: [
    { key: "type", value: "demo-item" },
    { key: "name", value: "Item 1" },
    { key: "status", value: "updated" }
  ],
  numericAnnotations: [{ key: "priority", value: 10 }]
}]);
console.log("  ✓ Updated entity: " + updateReceipt[0].entityKey.slice(0, 10) + "...");
console.log("");

// 5. EXTEND entity lifetime
console.log("5. Extending entity BTL...");
const extendReceipt = await client.extendEntities([{
  entityKey: firstKey,
  numberOfBlocks: 100
}]);
console.log("  ✓ Extended to block: " + extendReceipt[0].newExpirationBlock);
console.log("");

// 6. DELETE entity
console.log("6. Deleting second entity...");
const secondKey = createReceipts[1].entityKey;
await client.deleteEntities([secondKey]);
console.log("  ✓ Deleted entity: " + secondKey.slice(0, 10) + "...");
console.log("");

// 7. Final summary
console.log("7. Final summary:");
const finalQuery = 'type = "demo-item"';
const finalResults = await client.queryEntities(finalQuery);
console.log("  - Remaining entities: " + finalResults.length);
console.log("  - Owner address: " + ownerAddress);
console.log("");
console.log("=== EXAMPLE COMPLETED ===");`
  }
}

export default function PlaygroundPage() {
  const [selectedExample, setSelectedExample] = useState<keyof typeof examples>('connect')
  const [customCode, setCustomCode] = useState<string | null>(null)
  const [customTitle, setCustomTitle] = useState<string | null>(null)
  const [customLanguage, setCustomLanguage] = useState<'typescript' | 'python'>('typescript')

  useEffect(() => {
    // Check if there's an example from Getting Started
    const storedExample = sessionStorage.getItem('playgroundExample')
    const storedLanguage = sessionStorage.getItem('playgroundLanguage')

    if (storedExample) {
      // Set the selected example
      if (storedExample in examples) {
        setSelectedExample(storedExample as keyof typeof examples)
        setCustomCode(null)
        setCustomTitle(null)
      }

      // Clear the stored data after using it
      sessionStorage.removeItem('playgroundExample')
      sessionStorage.removeItem('playgroundLanguage')
    } else {
      // Check if there's custom code
      const storedCode = sessionStorage.getItem('playgroundCode')
      const storedTitle = sessionStorage.getItem('playgroundTitle')

      if (storedCode) {
        setCustomCode(storedCode)
        setCustomTitle(storedTitle || 'Custom Code')
        setCustomLanguage(storedLanguage === 'python' ? 'python' : 'typescript')

        // Clear the stored data after using it
        sessionStorage.removeItem('playgroundCode')
        sessionStorage.removeItem('playgroundLanguage')
        sessionStorage.removeItem('playgroundTitle')
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 md:px-[60px] mt-6 sticky top-6 z-[100]">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-figma-card">
            <nav className="px-6 py-4">
              <div className="flex items-center justify-between">
                <a href="/" className="flex items-center">
                  <div className="font-brutal text-3xl font-black uppercase text-black tracking-wider">[ ARKIV ]</div>
                </a>
                <div className="hidden lg:flex items-center space-x-6 ml-auto">
                  <a href="/#why-arkiv" className="font-mono text-sm text-black hover:text-gray-600 transition-colors">
                    Why Arkiv
                  </a>
                  <a href="/#how-it-works" className="font-mono text-sm text-black hover:text-gray-600 transition-colors">
                    How it Works
                  </a>
                  <a href="/#use-cases" className="font-mono text-sm text-black hover:text-gray-600 transition-colors">
                    Use Cases
                  </a>
                  <a href="/#faq" className="font-mono text-sm text-black hover:text-gray-600 transition-colors">
                    FAQ
                  </a>
                  <a href="/#about" className="font-mono text-sm text-black hover:text-gray-600 transition-colors">
                    About
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-[60px] py-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-brutal font-black uppercase text-black leading-tight mb-4">Code Playground</h1>
            <p className="text-xl font-mono text-[#1F1F1F]">
              Interactive examples for learning Arkiv SDK. Edit the code and see results instantly!
            </p>
          </div>

          {/* Examples Bar */}
          <div className="bg-gray-200 rounded-2xl p-4 border border-stone-300 shadow-figma-card mb-6">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {customCode ? (
                <>
                  <span className="text-sm text-black font-mono font-medium whitespace-nowrap">Custom Code:</span>
                  <button
                    onClick={() => {
                      setCustomCode(null)
                      setCustomTitle(null)
                    }}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-black hover:bg-[#FE7445] hover:text-white transition-all font-mono text-sm border border-stone-300"
                  >
                    ← Back to Examples
                  </button>
                </>
              ) : (
                <>
                  <span className="text-sm text-black font-mono font-medium whitespace-nowrap">Examples:</span>
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(examples).map(([key, example]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedExample(key as keyof typeof examples)}
                        className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap font-mono text-sm ${
                          selectedExample === key
                            ? 'bg-[#FE7445] text-white shadow-figma-button-primary'
                            : 'bg-white text-black border border-stone-300 hover:bg-[#FE7445] hover:text-white'
                        }`}
                      >
                        {example.title}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Code Playground */}
          <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card mb-6">
            {customCode ? (
              <CodePlayground
                initialCode={customCode}
                initialCodePython={customCode}
                language={customLanguage}
                title={customTitle || 'Custom Code'}
                description="Code from Getting Started guide"
                showLanguageToggle={false}
              />
            ) : (
              <CodePlayground
                initialCode={examples[selectedExample].code}
                initialCodePython={pythonExamples[selectedExample].code}
                language="typescript"
                title={examples[selectedExample].title}
                description={examples[selectedExample].description}
                showLanguageToggle={true}
              />
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 shadow-figma-card mb-6">
            <h3 className="font-brutal text-lg font-medium uppercase text-black mb-3">Playground Tips</h3>
            <ul className="text-sm font-mono text-stone-900 space-y-1">
              <li>• Edit code and click "Run" to execute in browser</li>
              <li>• Runs in sandboxed environment with limited access</li>
              <li>• Uses test key for read-only operations</li>
              <li>• Both TypeScript and Python supported</li>
            </ul>
          </div>

          {/* Additional Resources */}
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/getting-started">
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card hover:bg-[#FE7445] hover:text-white transition-all group cursor-pointer">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <img src="/images/icons/ts.svg" alt="TypeScript icon" className="w-6 h-6" />
                  </div>
                  <h3 className="font-brutal font-bold text-lg text-black group-hover:text-white">TypeScript Guide</h3>
                </div>
                <p className="text-sm font-mono text-black group-hover:text-white">Full TypeScript SDK documentation</p>
              </div>
            </Link>

            <Link href="/getting-started/python">
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card hover:bg-[#FE7445] hover:text-white transition-all group cursor-pointer">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <img src="/images/icons/python.svg" alt="Python icon" className="w-6 h-6" />
                  </div>
                  <h3 className="font-brutal font-bold text-lg text-black group-hover:text-white">Python Guide</h3>
                </div>
                <p className="text-sm font-mono text-black group-hover:text-white">Complete Python SDK guide</p>
              </div>
            </Link>

            <a href="https://github.com/golem-base" target="_blank" rel="noopener noreferrer">
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card hover:bg-[#FE7445] hover:text-white transition-all group cursor-pointer">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <img src="/images/icons/github.svg" alt="GitHub icon" className="w-6 h-6" />
                  </div>
                  <h3 className="font-brutal font-bold text-lg text-black group-hover:text-white">GitHub</h3>
                </div>
                <p className="text-sm font-mono text-black group-hover:text-white">View source code and examples</p>
              </div>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
