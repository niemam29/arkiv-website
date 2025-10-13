'use client'

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ThemeProvider, useTheme } from "@/components/providers/ThemeProvider";
import ArkivHeader from "@/components/layout/ArkivHeader";
import { 
  Code2, 
  Database, 
  Terminal, 
  FileCode, 
  Rocket, 
  BookOpen,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  Package,
  Network,
  Key,
  Layers,
  MessageSquare,
  Search,
  Activity,
  Zap,
  Users,
  Trophy,
  Home,
  Menu
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

function GettingStartedContent() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const section = searchParams.get('section');
  const [activeSection, setActiveSection] = useState<string>("setup");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const sections = [
    { id: "home", title: "Home", icon: <Home className="h-4 w-4" /> },
    { id: "setup", title: "Setup", icon: <Terminal className="h-4 w-4" /> },
    { id: "connect", title: "Connect", icon: <Database className="h-4 w-4" /> },
    { id: "entities", title: "Entities", icon: <FileCode className="h-4 w-4" /> },
    { id: "queries", title: "Queries", icon: <Search className="h-4 w-4" /> },
    { id: "events", title: "Events", icon: <Activity className="h-4 w-4" /> },
    { id: "batch", title: "Batch Operations", icon: <Layers className="h-4 w-4" /> },
    { id: "btl", title: "BTL & Lifecycle", icon: <Zap className="h-4 w-4" /> },
    { id: "troubleshooting", title: "Troubleshooting", icon: <AlertCircle className="h-4 w-4" /> },
    { id: "example", title: "Full Example", icon: <Rocket className="h-4 w-4" /> }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (section && sectionRefs.current[section]) {
      sectionRefs.current[section]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [section]);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      router.push('/');
      return;
    }
    const element = sectionRefs.current[sectionId];
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    router.push(`/getting-started?section=${sectionId}#${sectionId}`);
  };


  const codeBlocks = {
    installation: `# Create project directory
mkdir golem-sdk-practice
cd golem-sdk-practice

# Initialize project with Bun
bun init -y

# Install dependencies
bun add golem-base-sdk crypto dotenv tslib
bun add -d @types/node @types/bun typescript`,
    
    tsconfig: `{
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
}`,

    packageJson: `{
  "name": "golem-sdk-practice",
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
}`,

    envFile: `PRIVATE_KEY=0x...
CHAIN_ID=60138453033
RPC_URL=https://ethwarsaw.holesky.golemdb.io/rpc
WS_URL=wss://ethwarsaw.holesky.golemdb.io/rpc/ws`,

    basicConnection: `import { 
  createClient, 
  Tagged, 
  Annotation 
} from 'golem-base-sdk'
import type {
  AccountData,
  GolemBaseCreate,
  GolemBaseClient,
  GolemBaseUpdate
} from 'golem-base-sdk'

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
const rpcUrl = process.env.RPC_URL ?? 'https://ethwarsaw.holesky.golemdb.io/rpc'
const wsUrl = process.env.WS_URL ?? 'wss://ethwarsaw.holesky.golemdb.io/rpc/ws'

// TextEncoder and TextDecoder for data conversion
const encoder = new TextEncoder()
const decoder = new TextDecoder()

// Create a client to interact with the GolemDB API
const client = await createClient(
    chainId,
    key,
    rpcUrl,
    wsUrl,
);

console.log("Connected to Arkiv on ETHWarsaw testnet!");

// Get owner address
const ownerAddress = await client.getOwnerAddress();
console.log(\`Connected with address: \${ownerAddress}\`);`,

    createEntity: `// Create a new entity with annotations
const id = randomUUID()
const creates = [
    {
      data: encoder.encode("Test entity"),
      btl: 300,  // Block-To-Live: ~10 minutes (each block ~2 seconds)
      stringAnnotations: [
        new Annotation("testTextAnnotation", "demo"), 
        new Annotation("id", id)
      ],
      numericAnnotations: [new Annotation("version", 1)]
    } as GolemBaseCreate
]

const createReceipt = await client.createEntities(creates);
console.log('Receipt', createReceipt)

// createEntities takes a list of GolemBaseCreate objects with 4 fields:
// - data: Payload in bytes  
// - btl: Block-To-Live, number of blocks the entity will exist
// - stringAnnotations: Text annotations for querying  
// - numericAnnotations: Numeric annotations for querying`,

    queryEntities: `// Meta data and storage
if (entityKey) {
  const meta = await client.getEntityMetaData(entityKey)
  console.log('Meta data:', meta)

  const data = await client.getStorageValue(entityKey)
  console.log('Storage value:', decoder.decode(data))
}

// 1. Simple equality query
const greetings = await client.queryEntities('type = "greeting"')
console.log(\`Found \${greetings.length} greeting entities\`)

// 2. Processing query results
for (const entity of greetings) {
    const data = decoder.decode(entity.storageValue)
    console.log(\`Entity \${entity.entityKey}: \${data}\`)
}

// 3. Numeric comparison operators
await printEntities('High priority', await client.queryEntities('priority > 5'))
await printEntities('Old versions', await client.queryEntities('version < 3'))
await printEntities('In range', await client.queryEntities('score >= 80 && score <= 100'))

// 4. Combining conditions with AND (&&)
await printEntities('Specific', await client.queryEntities('type = "greeting" && version = 1'))

// 5. Using OR (||) for multiple options
await printEntities('Messages', await client.queryEntities('type = "message" || type = "other"'))

// 6. Complex queries with mixed operators
await printEntities('Filtered', await client.queryEntities('(type = "task" && priority > 3) || status = "urgent"'))

// Note: Query string must use double quotes for string values
// Numbers don't need quotes: priority = 5
// Strings need quotes: type = "message"


async function printEntities(label: string, entities: any[]) {
  console.log(\`\${label} - found \${entities.length} entities:\`)
  for (const entity of entities) {
    const data = decoder.decode(entity.storageValue)
    console.log(\`\${label} EntityKey: \${entity.entityKey}, Data: \${data}\`)
  }
}`,

    eventMonitoring: `async function setupEventMonitoring(client: GolemBaseClient) {
  // Watch for events from the blockchain
  const unwatch = client.watchLogs({
    fromBlock: BigInt(0),
    onCreated: (args) => {
      console.log("Entity created:", args.entityKey);
    },
    onUpdated: (args) => {
      console.log("Entity updated:", args.entityKey);
    },
    onDeleted: (args) => {
      console.log("Entity deleted:", args.entityKey);
    },
    onExtended: (args) => {
      console.log("Entity extended:", args.entityKey);
    },
    onError: (error) => {
      console.error("Watch error:", error);
    }
  });
  
  // Return unwatch function to stop monitoring later
  return unwatch;
}`,

    batchOperations: `async function batchOperations(client: GolemBaseClient) {
  // Create multiple entities at once
  const entities: GolemBaseCreate[] = [];
  const batchId = randomUUID()

  
  for (let i = 0; i < 10; i++) {
    entities.push({
      data: new TextEncoder().encode(\`Message \${i}\`),
      btl: 100,
      stringAnnotations: [
        new Annotation("type", "batch"),
        new Annotation("batchId", batchId),
        new Annotation("index", i.toString())
      ],
      numericAnnotations: [],
    });
  }
  
  const receipts = await client.createEntities(entities);
  console.log(\`Created \${receipts.length} entities in batch\`);

  const batchEntityKeys = await client.queryEntities(\`batchId = "\${batchId}"\`);
  console.log(\`Queried \${batchEntityKeys.length} entities in batch\`);
}`,

    updateEntity: `// Update the entity
const updateReceipt = await client.updateEntities([{
    entityKey: createReceipt[0].entityKey,
    data: encoder.encode("Updated entity"),
    btl: 1200,  // Extend to ~40 minutes (1200 blocks * 2 seconds = 2400 seconds)
    stringAnnotations: [new Annotation("id", id)],
    numericAnnotations: [new Annotation("version", 2)]
} as GolemBaseUpdate])
console.log('Update', updateReceipt)

// Updating an entity overrides all of its elements, 
// including the payload, annotations, and BTL.

// Delete the entity
const deleteReceipt = await client.deleteEntities([entityKey as \`0x\${string}\`])
console.log('Delete', deleteReceipt)`,

    btlManagement: `async function manageBTL(client: GolemBaseClient) {
  // Create entity with specific BTL
  const entity: GolemBaseCreate = {
    data: new TextEncoder().encode("Temporary data"),
    btl: 50,  // Expires after 50 blocks (50 blocks * 2 seconds = 100 seconds)
    stringAnnotations: [
      new Annotation("type", "temporary")
    ],
    numericAnnotations: []
  };
  
  const [receipt] = await client.createEntities([entity]);
  console.log(\`Entity expires at block: \${receipt.expirationBlock}\`);
  
  // Extend entity lifetime
  const extendReceipts = await client.extendEntities([{
    entityKey: receipt.entityKey,
    numberOfBlocks: 150  // Add 150 more blocks
  }]);
  
  console.log(\`Extended to block: \${extendReceipts[0].newExpirationBlock}\`);
  
  // Check remaining BTL
  const metadata = await client.getEntityMetaData(receipt.entityKey);
  console.log(\`Entity expires at block: \${metadata.expiresAtBlock}\`);
}`,

    fullExample: `import { 
  createClient, 
  type GolemBaseClient,
  type GolemBaseCreate,
  type GolemBaseUpdate,
  Annotation,
  Tagged
} from "golem-base-sdk";
import { randomUUID } from "crypto";
import { Logger, ILogObj } from "tslog";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Configure logger
const logLevelMap: Record<string, number> = {
  silly: 0,
  trace: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
  fatal: 6
};

const logger = new Logger<ILogObj>({
  name: "GolemDB Example",
  minLevel: logLevelMap[process.env.LOG_LEVEL as keyof typeof logLevelMap] || logLevelMap.info
});

async function main() {
  // 1. INITIALIZE CLIENT
  const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x...";
  const privateKeyHex = PRIVATE_KEY.replace(/^0x/, "");
  const privateKey = new Uint8Array(
    privateKeyHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );
  
  const client = await createClient(
    60138453033,
    new Tagged("privatekey", privateKey),
    "https://ethwarsaw.holesky.golemdb.io/rpc",
    "wss://ethwarsaw.holesky.golemdb.io/rpc/ws",
    logger
  );
  
  console.log("Connected to Arkiv!");
  const ownerAddress = await client.getOwnerAddress();
  console.log(\`Owner address: \${ownerAddress}\`);

  // Get and check client account balance
  const balanceBigint = await client.getRawClient().httpClient.getBalance({ address: ownerAddress });
  const balance = Number(balanceBigint) / 10**18;
  console.log(\`Client account balance: \${balance} ETH\`);

  if (balance === 0) {
    console.warn("Warning: Account balance is 0 ETH. Please acquire test tokens from the faucet.");
  }

  // Set up real-time event watching
  const unsubscribe = client.watchLogs({
    fromBlock: BigInt(await client.getRawClient().httpClient.getBlockNumber()),
    onCreated: (args) => {
      console.log("WATCH-> Create:", args);
    },
    onUpdated: (args) => {
      console.log("WATCH-> Update:", args);
    },
    onExtended: (args) => {
      console.log("WATCH-> Extend:", args);
    },
    onDeleted: (args) => {
      console.log("WATCH-> Delete:", args);
    },
    onError: (error) => {
      console.error("WATCH-> Error:", error);
    },
    pollingInterval: 1000,
    transport: "websocket",
  });
  
  // 2. CREATE - Single entity with annotations
  const id = randomUUID();
  const entity: GolemBaseCreate = {
    data: new TextEncoder().encode(JSON.stringify({
      message: "Hello from ETHWarsaw 2025!",
      timestamp: Date.now(),
      author: "Developer"
    })),
    btl: 300, // ~10 minutes (300 blocks * 2 seconds = 600 seconds)
    stringAnnotations: [
      new Annotation("type", "message"),
      new Annotation("event", "ethwarsaw"),
      new Annotation("id", id)
    ],
    numericAnnotations: [
      new Annotation("version", 1),
      new Annotation("timestamp", Date.now())
    ]
  };
  
  const createReceipts = await client.createEntities([entity]);
  const entityKey = createReceipts[0].entityKey;
  console.log(\`Created entity: \${entityKey}\`);
  
  // 3. QUERY - Find entity by annotations
  const queryResults = await client.queryEntities(\`id = "\${id}" && version = 1\`);
  console.log(\`Found \${queryResults.length} matching entities\`);
  
  for (const result of queryResults) {
    const data = JSON.parse(new TextDecoder().decode(result.storageValue));
    console.log("Query result:", data);
  }
  
  // 4. UPDATE - Modify existing entity
  const updateData: GolemBaseUpdate = {
    entityKey: entityKey,
    data: new TextEncoder().encode(JSON.stringify({
      message: "Updated message from ETHWarsaw!",
      updated: true,
      updateTime: Date.now()
    })),
    btl: 600, // ~20 minutes (600 blocks * 2 seconds = 1200 seconds)
    stringAnnotations: [
      new Annotation("type", "message"),
      new Annotation("id", id),
      new Annotation("status", "updated")
    ],
    numericAnnotations: [
      new Annotation("version", 2)
    ]
  };
  
  const updateReceipts = await client.updateEntities([updateData]);
  console.log(\`Updated entity: \${updateReceipts[0].entityKey}\`);
  
  // 5. QUERY updated entity
  const updatedResults = await client.queryEntities(\`id = "\${id}" && version = 2\`);
  console.log(\`Found \${updatedResults.length} updated entities\`);
  
  // 6. BATCH OPERATIONS - Create multiple entities
  const batchEntities: GolemBaseCreate[] = [];
  for (let i = 0; i < 5; i++) {
    batchEntities.push({
      data: new TextEncoder().encode(\`Batch message \${i}\`),
      btl: 100,
      stringAnnotations: [
        new Annotation("type", "batch"),
        new Annotation("index", i.toString())
      ],
      numericAnnotations: [
        new Annotation("sequence", i + 1)  // Start from 1, not 0 (SDK bug with value 0)
      ]
    });
  }
  
  const batchReceipts = await client.createEntities(batchEntities);
  console.log(\`Created \${batchReceipts.length} entities in batch\`);
  
  // 7. BTL MANAGEMENT - Extend entity lifetime
  const extendReceipts = await client.extendEntities([{
    entityKey: entityKey,
    numberOfBlocks: 100
  }]);
  console.log(\`Extended BTL to block: \${extendReceipts[0].newExpirationBlock}\`);
  
  // Check metadata to verify BTL
  const metadata = await client.getEntityMetaData(entityKey);
  console.log(\`Entity expires at block: \${metadata.expiresAtBlock}\`);
  
  // 8. DELETE - Remove entity
  const deleteReceipts = await client.deleteEntities([entityKey]);
  console.log(\`Deleted entity: \${deleteReceipts[0].entityKey}\`);
  
  // Clean up batch entities
  for (const receipt of batchReceipts) {
    await client.deleteEntities([receipt.entityKey]);
  }
  
  // Stop watching events
  unsubscribe();
  console.log("Complete!");
  
  // Clean exit
  process.exit(0);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});`
  };

  return (
    <div style={{ backgroundColor: theme.colors.background.primary, color: theme.colors.text.primary, minHeight: '100vh' }}>
      <ArkivHeader />

      {/* Sticky Navigation */}
      <div
        className="sticky top-16 z-40 backdrop-blur-md border-b shadow-xl"
        style={{
          backgroundColor: theme.colors.background.primary + '98',
          borderColor: theme.colors.border.primary
        }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Home button - always visible */}
            <button
              onClick={() => scrollToSection('home')}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                activeSection === 'home'
                  ? "bg-blue-600 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              )}
            >
              <Home className="h-4 w-4" />
              Home
            </button>
            
            {/* Desktop navigation - hidden on mobile */}
            <div className="hidden md:flex items-center gap-4 overflow-x-auto">
              {sections.slice(1).map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                    activeSection === section.id
                      ? "bg-blue-600 text-white"
                      : "bg-black text-white hover:bg-gray-800"
                  )}
                >
                  {section.icon}
                  {section.title}
                </button>
              ))}
            </div>
            
            {/* Mobile dropdown menu */}
            <div className="md:hidden ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Menu className="h-4 w-4 mr-2" />
                    Menu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {sections.slice(1).map((section) => (
                    <DropdownMenuItem
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={activeSection === section.id ? "bg-blue-600 text-white" : "bg-black text-white"}
                    >
                      <span className="flex items-center gap-2">
                        {section.icon}
                        {section.title}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            TypeScript SDK v0.1.16
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Getting Started with Arkiv
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Build decentralized applications with TypeScript and Arkiv
          </p>
        </div>

        {/* Setup Section */}
        <section ref={(el) => { sectionRefs.current.setup = el; }} id="setup" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Terminal className="h-8 w-8 text-blue-500" />
            Setup & Installation
          </h2>

          <div className="space-y-6">
            {/* Prerequisites */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
                <CardDescription>What you need before starting (Tested with golem-base-sdk@0.1.16 and Node.js 24.7.0)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Node.js 18+</p>
                      <p className="text-sm text-white">Latest LTS version recommended</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">TypeScript 5.0+</p>
                      <p className="text-sm text-white">For type safety</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Ethereum Wallet</p>
                      <p className="text-sm text-white">With Holesky testnet ETH</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Test ETH</p>
                      <p className="text-sm text-white">From ETHWarsaw faucet</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Setup */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Quick Setup with ETHWarsaw Testnet</CardTitle>
                <CardDescription>Public testnet endpoints - no local setup required!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-sm text-white mb-1">HTTP RPC</p>
                    <code className="text-blue-400">https://ethwarsaw.holesky.golemdb.io/rpc</code>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-sm text-white mb-1">WebSocket RPC</p>
                    <code className="text-blue-400">wss://ethwarsaw.holesky.golemdb.io/rpc/ws</code>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open('https://ethwarsaw.holesky.golemdb.io/faucet/', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Faucet
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open('https://explorer.ethwarsaw.holesky.golemdb.io', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Explorer
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open('https://ethwarsaw.holesky.golemdb.io/', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Installation */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Installation</CardTitle>
                <CardDescription>Set up a new TypeScript project with Bun and Arkiv SDK</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock code={codeBlocks.installation} language="bash" />
                <Alert className="mt-4 border-blue-500/50 bg-blue-500/10">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  <AlertDescription>
                    <strong>Why Bun?</strong> Bun runs TypeScript directly without compilation, has built-in package manager, and is significantly faster than Node.js.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Configuration Files */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>tsconfig.json</CardTitle>
                  <CardDescription>TypeScript configuration for Bun</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={codeBlocks.tsconfig} language="json" />
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>package.json</CardTitle>
                  <CardDescription>Project configuration with Bun scripts</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={codeBlocks.packageJson} language="json" />
                </CardContent>
              </Card>
            </div>

            {/* Environment Configuration */}
            <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-yellow-500" />
                  Environment Configuration
                </CardTitle>
                <CardDescription>Create a .env file in your project root with your connection details</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock code={codeBlocks.envFile} language="bash" />
                <Alert className="mt-4 border-yellow-500/50 bg-yellow-500/10">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <AlertDescription>
                    Replace <code>0x...</code> with your actual private key. Never commit your .env file to version control!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Connect Section */}
        <section ref={(el) => { sectionRefs.current.connect = el; }} id="connect" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Database className="h-8 w-8 text-blue-500" />
            Connect to Arkiv
          </h2>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Basic Connection</CardTitle>
              <CardDescription>Connect to Arkiv using your private key</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={codeBlocks.basicConnection} language="typescript" showPlayground={true} playgroundTitle="Connect to Arkiv" />
              
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Security Note:</strong> Never hardcode your private key. Use environment variables or secure key management.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>

        {/* Entities Section */}
        <section ref={(el) => { sectionRefs.current.entities = el; }} id="entities" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <FileCode className="h-8 w-8 text-blue-500" />
            Creating Entity
          </h2>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Create Your First Entity</CardTitle>
              <CardDescription>Store data on the blockchain with annotations</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4 border-blue-500/50 bg-blue-500/10">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <AlertDescription>
                  <strong>Before creating entities:</strong> Make sure your account has test ETH. Get some from the{' '}
                  <a 
                    href="https://ethwarsaw.holesky.golemdb.io/faucet/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    ETHWarsaw Faucet
                  </a>
                </AlertDescription>
              </Alert>
              
              <CodeBlock code={codeBlocks.createEntity} language="typescript" showPlayground={true} playgroundTitle="Create Entity" />
              
              <Alert className="mt-4 border-green-500/50 bg-green-500/10">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertDescription>
                  <strong>Verify your entity:</strong> After creation, check your entity on the{' '}
                  <a 
                    href="https://ethwarsaw.holesky.golemdb.io/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 underline"
                  >
                    Arkiv Block Explorer
                  </a>
                  {' '}using the returned entity key
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>

        {/* Queries Section */}
        <section ref={(el) => { sectionRefs.current.queries = el; }} id="queries" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Search className="h-8 w-8 text-blue-500" />
            Query Entities
          </h2>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Query Your Data</CardTitle>
              <CardDescription>Search entities using annotations</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={codeBlocks.queryEntities} language="typescript" showPlayground={true} playgroundTitle="Query Entities" />
            </CardContent>
          </Card>
        </section>

        {/* Events Section */}
        <section ref={(el) => { sectionRefs.current.events = el; }} id="events" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Activity className="h-8 w-8 text-blue-500" />
            Real-time Events
          </h2>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Event Monitoring</CardTitle>
              <CardDescription>Listen to real-time blockchain events</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={codeBlocks.eventMonitoring} language="typescript" />
            </CardContent>
          </Card>
        </section>

        {/* Batch Operations Section */}
        <section ref={(el) => { sectionRefs.current.batch = el; }} id="batch" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Layers className="h-8 w-8 text-blue-500" />
            Batch Operations
          </h2>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Batch Processing</CardTitle>
              <CardDescription>Efficiently create multiple entities at once</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={codeBlocks.batchOperations} language="typescript" />
            </CardContent>
          </Card>
        </section>

        {/* BTL Section */}
        <section ref={(el) => { sectionRefs.current.btl = el; }} id="btl" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Zap className="h-8 w-8 text-blue-500" />
            BTL & Data Lifecycle
          </h2>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Managing Data Lifetime</CardTitle>
              <CardDescription>Control when your data expires with Blocks To Live (BTL)</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={codeBlocks.btlManagement} language="typescript" />
            </CardContent>
          </Card>
        </section>

        {/* Troubleshooting Section */}
        <section ref={(el) => { sectionRefs.current.troubleshooting = el; }} id="troubleshooting" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-blue-500" />
            Troubleshooting
          </h2>

          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Common Issues</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-2">Connection Failed</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li>• Check your internet connection</li>
                    <li>• Verify ETHWarsaw endpoints are correct</li>
                    <li>• Ensure private key format is valid</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Insufficient Funds</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li>• Get test ETH from the faucet</li>
                    <li>• Check your wallet balance</li>
                    <li>• Ensure you're on Holesky testnet</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">TypeScript Errors</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li>• Update to TypeScript 5.0+</li>
                    <li>• Check tsconfig.json settings</li>
                    <li>• Reinstall node_modules</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://ethwarsaw.holesky.golemdb.io/faucet/', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Get Test ETH
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://discord.gg/golem', '_blank')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Join Discord
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Full Example Section */}
        <section ref={(el) => { sectionRefs.current.example = el; }} id="example" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Rocket className="h-8 w-8 text-blue-500" />
            Get Full Example
          </h2>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Complete Working Example</CardTitle>
              <CardDescription>A full TypeScript application demonstrating all Arkiv features</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={codeBlocks.fullExample} language="typescript" />
              
              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h4 className="font-semibold text-blue-400 mb-2">Running the Example</h4>
                <ol className="space-y-2 text-sm text-white">
                  <li>1. Save the code to <code className="text-blue-400">src/index.ts</code></li>
                  <li>2. Set your private key: <code className="text-blue-400">export PRIVATE_KEY=0x...</code></li>
                  <li>3. Build the project: <code className="text-blue-400">bun run build</code></li>
                  <li>4. Run the example: <code className="text-blue-400">bun run dev</code></li>
                </ol>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://github.com/golem-base/typescript-sdk', '_blank')}
                >
                  <Code2 className="h-4 w-4 mr-2" />
                  View SDK on GitHub
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://www.npmjs.com/package/golem-base-sdk', '_blank')}
                >
                  <Package className="h-4 w-4 mr-2" />
                  View on NPM
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Next Steps */}
        <Card className="glass-card bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-2xl">Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-1 gap-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-semibold">Connect with Community</p>
                  <p className="text-sm text-white">Get help and share your projects</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open('https://docs.golemdb.io', '_blank')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Full Documentation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Info Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5 text-purple-500" />
                Network Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white">Network:</span>
                  <span className="font-mono">Holesky</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Chain ID:</span>
                  <span className="font-mono">60138453033</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Testnet:</span>
                  <span className="font-semibold">ETHWarsaw on Holesky</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-500" />
                SDK Version
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white">Package:</span>
                  <span className="font-mono">golem-base-sdk</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Version:</span>
                  <span className="font-mono">0.1.16</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">License:</span>
                  <span className="font-mono">MIT</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-orange-500" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  <span>On-chain storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  <span>Query with annotations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  <span>Real-time events</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Section */}
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
  );
}

export default function GettingStarted() {
  return (
    <ThemeProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <GettingStartedContent />
      </Suspense>
    </ThemeProvider>
  );
}