'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from '@/components/ui/CodeBlock'
import Footer from '@/components/layout/Footer'

export default function GettingStartedPythonPage() {
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
              Python SDK
            </div>
            <h1 className="text-4xl md:text-5xl font-brutal font-black uppercase text-black">Getting Started with Arkiv (Python)</h1>
            <p className="text-xl font-mono text-[#1F1F1F] max-w-3xl mx-auto">Build decentralized applications with Python and Arkiv</p>
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
                <p className="text-stone-900 font-mono text-sm mb-4">What you need before starting</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="text-[#FE7445] text-xl">✓</div>
                    <div>
                      <p className="font-mono font-medium text-black">Python 3.8+</p>
                      <p className="text-sm font-mono text-stone-900">Latest stable version recommended</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-[#FE7445] text-xl">✓</div>
                    <div>
                      <p className="font-mono font-medium text-black">pip</p>
                      <p className="text-sm font-mono text-stone-900">Python package manager</p>
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
mkdir arkiv-python-practice
cd arkiv-python-practice

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install golem-base-sdk python-dotenv`}
                  language="bash"
                />
              </div>

              {/* Environment Configuration */}
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">Environment Configuration</h3>
                <p className="text-stone-900 font-mono text-sm mb-4">Create a .env file in your project directory</p>
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
              <p className="text-stone-900 font-mono text-sm mb-4">Connect to Arkiv using your private key</p>
              <CodeBlock
                code={`from golem_base_sdk import create_client, Tagged, Annotation
from golem_base_sdk.types import AccountData, GolemBaseCreate, GolemBaseUpdate
from dotenv import load_dotenv
import os
from uuid import uuid4

# Load environment variables
load_dotenv()

# Configure connection from .env
raw_key = os.getenv('PRIVATE_KEY', '')
hex_key = raw_key[2:] if raw_key.startswith('0x') else raw_key
key: AccountData = Tagged("privatekey", bytes.fromhex(hex_key))

chain_id = int(os.getenv('CHAIN_ID', '60138453033'))
rpc_url = os.getenv('RPC_URL', 'https://kaolin.hoodi.arkiv.network/rpc')
ws_url = os.getenv('WS_URL', 'wss://kaolin.hoodi.arkiv.network/rpc/ws')

# Create a client to interact with the Arkiv API
client = await create_client(
    chain_id,
    key,
    rpc_url,
    ws_url,
)

print("Connected to Arkiv testnet!")

# Get owner address
owner_address = await client.get_owner_address()
print(f"Connected with address: {owner_address}")`}
                language="python"
              />
            </div>
          </section>

          {/* Entities Section */}
          <section id="entities" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Creating & Managing Entities</h2>

            <div className="space-y-6">
              {/* Create Entity */}
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">Create Entity</h3>
                <CodeBlock
                  code={`# Create a new entity with annotations
entity_id = str(uuid4())
creates = [
    GolemBaseCreate(
        data=b"Test entity",
        btl=300,  # Block-To-Live: ~10 minutes (each block ~2 seconds)
        string_annotations=[
            Annotation("testTextAnnotation", "demo"),
            Annotation("id", entity_id)
        ],
        numeric_annotations=[Annotation("version", 1)]
    )
]

create_receipt = await client.create_entities(creates)
print('Receipt', create_receipt)

# create_entities takes a list of GolemBaseCreate objects with 4 fields:
# - data: Payload in bytes
# - btl: Block-To-Live, number of blocks the entity will exist
# - string_annotations: Text annotations for querying
# - numeric_annotations: Numeric annotations for querying`}
                  language="python"
                />
              </div>

              {/* Update Entity */}
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">Update and Delete Entity</h3>
                <CodeBlock
                  code={`# Update the entity
update_receipt = await client.update_entities([
    GolemBaseUpdate(
        entity_key=create_receipt[0].entity_key,
        data=b"Updated entity",
        btl=1200,  # Extend to ~40 minutes (1200 blocks * 2 seconds = 2400 seconds)
        string_annotations=[Annotation("id", entity_id)],
        numeric_annotations=[Annotation("version", 2)]
    )
])
print('Update', update_receipt)

# Updating an entity overrides all of its elements,
# including the payload, annotations, and BTL.

# Delete the entity
delete_receipt = await client.delete_entities([entity_key])
print('Delete', delete_receipt)`}
                  language="python"
                />
              </div>
            </div>
          </section>

          {/* Queries Section */}
          <section id="queries" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Query Entities</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <h3 className="text-xl font-brutal font-bold mb-2 text-black">Search with Annotations</h3>
              <CodeBlock
                code={`# Meta data and storage
if entity_key:
    meta = await client.get_entity_metadata(entity_key)
    print('Meta data:', meta)

    data = await client.get_storage_value(entity_key)
    print('Storage value:', data.decode())

# 1. Simple equality query
greetings = await client.query_entities('type = "greeting"')
print(f'Found {len(greetings)} greeting entities')

# 2. Processing query results
for entity in greetings:
    data = entity.storage_value.decode()
    print(f'Entity {entity.entity_key}: {data}')

# 3. Numeric comparison operators
await print_entities('High priority', await client.query_entities('priority > 5'))
await print_entities('Old versions', await client.query_entities('version < 3'))
await print_entities('In range', await client.query_entities('score >= 80 && score <= 100'))

# 4. Combining conditions with AND (&&)
await print_entities('Specific', await client.query_entities('type = "greeting" && version = 1'))

# 5. Using OR (||) for multiple options
await print_entities('Messages', await client.query_entities('type = "message" || type = "other"'))

# 6. Complex queries with mixed operators
await print_entities('Filtered', await client.query_entities('(type = "task" && priority > 3) || status = "urgent"'))

# Note: Query string must use double quotes for string values
# Numbers don't need quotes: priority = 5
# Strings need quotes: type = "message"


async def print_entities(label: str, entities: list):
    print(f'{label} - found {len(entities)} entities:')
    for entity in entities:
        data = entity.storage_value.decode()
        print(f'{label} EntityKey: {entity.entity_key}, Data: {data}')`}
                language="python"
              />
            </div>
          </section>

          {/* Events Section */}
          <section id="events" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Real-time Events</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <h3 className="text-xl font-brutal font-bold mb-2 text-black">Event Monitoring</h3>
              <p className="text-stone-900 font-mono text-sm mb-4">Listen to real-time blockchain events</p>
              <CodeBlock
                code={`async def setup_event_monitoring(client):
    """Watch for events from the blockchain"""

    def on_created(args):
        print("Entity created:", args.entity_key)

    def on_updated(args):
        print("Entity updated:", args.entity_key)

    def on_deleted(args):
        print("Entity deleted:", args.entity_key)

    def on_extended(args):
        print("Entity extended:", args.entity_key)

    def on_error(error):
        print("Watch error:", error)

    # Watch for events
    unwatch = client.watch_logs(
        from_block=0,
        on_created=on_created,
        on_updated=on_updated,
        on_deleted=on_deleted,
        on_extended=on_extended,
        on_error=on_error
    )

    # Return unwatch function to stop monitoring later
    return unwatch`}
                language="python"
              />
            </div>
          </section>

          {/* Batch Operations Section */}
          <section id="batch" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Batch Operations</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <h3 className="text-xl font-brutal font-bold mb-2 text-black">Create Multiple Entities</h3>
              <p className="text-stone-900 font-mono text-sm mb-4">Efficiently create multiple entities at once</p>
              <CodeBlock
                code={`async def batch_operations(client):
    """Create multiple entities at once"""
    entities = []
    batch_id = str(uuid4())

    for i in range(10):
        entities.append(GolemBaseCreate(
            data=f"Message {i}".encode(),
            btl=100,
            string_annotations=[
                Annotation("type", "batch"),
                Annotation("batchId", batch_id),
                Annotation("index", str(i))
            ],
            numeric_annotations=[]
        ))

    receipts = await client.create_entities(entities)
    print(f'Created {len(receipts)} entities in batch')

    batch_entity_keys = await client.query_entities(f'batchId = "{batch_id}"')
    print(f'Queried {len(batch_entity_keys)} entities in batch')`}
                language="python"
              />
            </div>
          </section>

          {/* BTL Section */}
          <section id="btl" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">BTL & Data Lifecycle</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <h3 className="text-xl font-brutal font-bold mb-2 text-black">Managing Entity Lifetime</h3>
              <p className="text-stone-900 font-mono text-sm mb-4">Control when your data expires with Blocks To Live (BTL)</p>
              <CodeBlock
                code={`async def manage_btl(client):
    """Manage entity lifetime with BTL"""

    # Create entity with specific BTL
    entity = GolemBaseCreate(
        data=b"Temporary data",
        btl=50,  # Expires after 50 blocks (50 blocks * 2 seconds = 100 seconds)
        string_annotations=[Annotation("type", "temporary")],
        numeric_annotations=[]
    )

    receipt = (await client.create_entities([entity]))[0]
    print(f'Entity expires at block: {receipt.expiration_block}')

    # Extend entity lifetime
    extend_receipts = await client.extend_entities([{
        'entity_key': receipt.entity_key,
        'number_of_blocks': 150  # Add 150 more blocks
    }])

    print(f'Extended to block: {extend_receipts[0].new_expiration_block}')

    # Check remaining BTL
    metadata = await client.get_entity_metadata(receipt.entity_key)
    print(f'Entity expires at block: {metadata.expires_at_block}')`}
                language="python"
              />
            </div>
          </section>

          {/* Troubleshooting Section */}
          <section id="troubleshooting" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Troubleshooting</h2>
            <div className="space-y-6">
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-4 text-black">Common Issues</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-700 mb-2">Connection Failed</h4>
                    <ul className="space-y-1 text-sm text-red-900 font-mono">
                      <li>• Check your RPC URL and WS URL in .env</li>
                      <li>• Verify your private key format (with or without 0x prefix)</li>
                      <li>• Ensure your wallet has test ETH from faucet</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Installation Issues</h4>
                    <ul className="space-y-1 text-sm text-blue-900 font-mono">
                      <li>• Update to Python 3.8+</li>
                      <li>• Activate virtual environment before installing packages</li>
                      <li>• Try: pip install --upgrade golem-base-sdk</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="font-semibold text-amber-700 mb-2">Query Issues</h4>
                    <ul className="space-y-1 text-sm text-amber-900 font-mono">
                      <li>• Use double quotes for string values in queries</li>
                      <li>• Verify annotation names match exactly</li>
                      <li>• Check entity still exists (BTL not expired)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Full Example Section */}
          <section id="example" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Complete Example</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <h3 className="text-xl font-brutal font-bold mb-2 text-black">Full Application</h3>
              <p className="text-stone-900 font-mono text-sm mb-4">A complete Python application demonstrating all Arkiv features</p>
              <CodeBlock
                code={`from golem_base_sdk import create_client, Tagged, Annotation
from golem_base_sdk.types import GolemBaseCreate, GolemBaseUpdate
from dotenv import load_dotenv
import os
from uuid import uuid4
import json
import time
import asyncio

# Load environment variables
load_dotenv()


async def main():
    # 1. INITIALIZE CLIENT
    private_key_hex = os.getenv('PRIVATE_KEY', '0x...').replace('0x', '')
    private_key = bytes.fromhex(private_key_hex)

    client = await create_client(
        60138453033,
        Tagged("privatekey", private_key),
        "https://kaolin.hoodi.arkiv.network/rpc",
        "wss://kaolin.hoodi.arkiv.network/rpc/ws"
    )

    print("Connected to Arkiv!")
    owner_address = await client.get_owner_address()
    print(f"Owner address: {owner_address}")

    # Get and check client account balance
    balance = await client.get_raw_client().http_client.get_balance(owner_address)
    balance_eth = float(balance) / 10**18
    print(f"Client account balance: {balance_eth} ETH")

    if balance_eth == 0:
        print("Warning: Account balance is 0 ETH. Please acquire test tokens from the faucet.")

    # Set up real-time event watching
    def on_created(args):
        print("WATCH-> Create:", args)

    def on_updated(args):
        print("WATCH-> Update:", args)

    def on_extended(args):
        print("WATCH-> Extend:", args)

    def on_deleted(args):
        print("WATCH-> Delete:", args)

    def on_error(error):
        print("WATCH-> Error:", error)

    block_number = await client.get_raw_client().http_client.get_block_number()
    unsubscribe = client.watch_logs(
        from_block=block_number,
        on_created=on_created,
        on_updated=on_updated,
        on_extended=on_extended,
        on_deleted=on_deleted,
        on_error=on_error,
        polling_interval=1000,
        transport="websocket"
    )

    # 2. CREATE - Single entity with annotations
    entity_id = str(uuid4())
    entity = GolemBaseCreate(
        data=json.dumps({
            "message": "Hello from Arkiv!",
            "timestamp": int(time.time() * 1000),
            "author": "Developer"
        }).encode(),
        btl=300,  # ~10 minutes (300 blocks * 2 seconds = 600 seconds)
        string_annotations=[
            Annotation("type", "message"),
            Annotation("event", "arkiv"),
            Annotation("id", entity_id)
        ],
        numeric_annotations=[
            Annotation("version", 1),
            Annotation("timestamp", int(time.time() * 1000))
        ]
    )

    create_receipts = await client.create_entities([entity])
    entity_key = create_receipts[0].entity_key
    print(f"Created entity: {entity_key}")

    # 3. QUERY - Find entity by annotations
    query_results = await client.query_entities(f'id = "{entity_id}" && version = 1')
    print(f"Found {len(query_results)} matching entities")

    for result in query_results:
        data = json.loads(result.storage_value.decode())
        print("Query result:", data)

    # 4. UPDATE - Modify existing entity
    update_data = GolemBaseUpdate(
        entity_key=entity_key,
        data=json.dumps({
            "message": "Updated message from Arkiv!",
            "updated": True,
            "update_time": int(time.time() * 1000)
        }).encode(),
        btl=600,  # ~20 minutes (600 blocks * 2 seconds = 1200 seconds)
        string_annotations=[
            Annotation("type", "message"),
            Annotation("id", entity_id),
            Annotation("status", "updated")
        ],
        numeric_annotations=[
            Annotation("version", 2)
        ]
    )

    update_receipts = await client.update_entities([update_data])
    print(f"Updated entity: {update_receipts[0].entity_key}")

    # 5. QUERY updated entity
    updated_results = await client.query_entities(f'id = "{entity_id}" && version = 2')
    print(f"Found {len(updated_results)} updated entities")

    # 6. BATCH OPERATIONS - Create multiple entities
    batch_entities = []
    for i in range(5):
        batch_entities.append(GolemBaseCreate(
            data=f"Batch message {i}".encode(),
            btl=100,
            string_annotations=[
                Annotation("type", "batch"),
                Annotation("index", str(i))
            ],
            numeric_annotations=[
                Annotation("sequence", i + 1)  # Start from 1, not 0 (SDK bug with value 0)
            ]
        ))

    batch_receipts = await client.create_entities(batch_entities)
    print(f"Created {len(batch_receipts)} entities in batch")

    # 7. BTL MANAGEMENT - Extend entity lifetime
    extend_receipts = await client.extend_entities([{
        'entity_key': entity_key,
        'number_of_blocks': 100
    }])
    print(f"Extended BTL to block: {extend_receipts[0].new_expiration_block}")

    # Check metadata to verify BTL
    metadata = await client.get_entity_metadata(entity_key)
    print(f"Entity expires at block: {metadata.expires_at_block}")

    # 8. DELETE - Remove entity
    delete_receipts = await client.delete_entities([entity_key])
    print(f"Deleted entity: {delete_receipts[0].entity_key}")

    # Clean up batch entities
    for receipt in batch_receipts:
        await client.delete_entities([receipt.entity_key])

    # Stop watching events
    unsubscribe()
    print("Complete!")


if __name__ == "__main__":
    asyncio.run(main())`}
                language="python"
              />
            </div>
          </section>

          {/* Footer Links */}
          <div className="mt-16 pt-8 border-t border-stone-300">
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="/getting-started"
                className="bg-gray-200 p-6 rounded-xl shadow-figma-card hover:bg-[#FE7445] hover:text-white transition-all group"
              >
                <h3 className="font-brutal font-bold text-lg mb-2">TypeScript SDK</h3>
                <p className="text-sm font-mono">Build with TypeScript and Arkiv</p>
              </a>
              <a
                href="/docs"
                className="bg-gray-200 p-6 rounded-xl shadow-figma-card hover:bg-[#FE7445] hover:text-white transition-all group"
              >
                <h3 className="font-brutal font-bold text-lg mb-2">Documentation</h3>
                <p className="text-sm font-mono">Comprehensive guides and references</p>
              </a>
              <a
                href="/playground"
                className="bg-gray-200 p-6 rounded-xl shadow-figma-card hover:bg-[#FE7445] hover:text-white transition-all group"
              >
                <h3 className="font-brutal font-bold text-lg mb-2">Playground</h3>
                <p className="text-sm font-mono">Try Arkiv in your browser</p>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
