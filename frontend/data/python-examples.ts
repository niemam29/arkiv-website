export const pythonExamples = {
  connect: {
    title: 'Connect to Golem DB',
    description: 'Initialize a client and connect to the Golem DB network',
    code: `# Initialize the Golem DB client
from golem_base_sdk import GolemBaseClient
import json
import asyncio

private_key_hex = mock_private_key  # Using mock key for playground

# Convert hex to bytes
private_key = bytes.fromhex(private_key_hex)

# Create client connection
client = await GolemBaseClient.create_rw_client(
    rpc_url="https://kaolin.hoodi.arkiv.network/rpc",
    ws_url="wss://https://kaolin.hoodi.arkiv.network/rpc/rpc/ws",
    private_key=private_key
)

# Get owner address
owner_address = client.get_account_address()
print(f"Connected with address: {owner_address}")
print("Ready to interact with Golem DB!")`
  },
  
  create: {
    title: 'Create Entity',
    description: 'Create a new entity with annotations',
    code: `# Initialize client first
from golem_base_sdk import GolemBaseClient, GolemBaseCreate, Annotation
import json
import time
import asyncio

private_key_hex = mock_private_key
private_key = bytes.fromhex(private_key_hex)

client = await GolemBaseClient.create_rw_client(
    rpc_url="https://kaolin.hoodi.arkiv.network/rpc",
    ws_url="wss://https://kaolin.hoodi.arkiv.network/rpc/rpc/ws",
    private_key=private_key
)

# Create a new entity with metadata
data = json.dumps({
    "message": "Hello from Golem DB Playground!",
    "timestamp": int(time.time() * 1000),
    "author": "Developer"
}).encode('utf-8')

# Create entity with annotations
entity = GolemBaseCreate(
    data=data,
    btl=300,  # Block-To-Live: ~10 minutes
    string_annotations=[
        Annotation(key="type", value="message"),
        Annotation(key="environment", value="playground"),
        Annotation(key="author", value="Developer")
    ],
    numeric_annotations=[
        Annotation(key="version", value=1),
        Annotation(key="priority", value=5)
    ]
)

receipts = await client.create_entities([entity])
print("Entity created!")
print(f"Entity Key: {receipts[0].entity_key}")
print(f"Expires at block: {receipts[0].expiration_block}")`
  },
  
  query: {
    title: 'Query Entities',
    description: 'Search for entities using annotations',
    code: `# Initialize client first
from golem_base_sdk import GolemBaseClient
import json

private_key_hex = mock_private_key
private_key = bytes.fromhex(private_key_hex)

client = await GolemBaseClient.create_rw_client(
    rpc_url="https://kaolin.hoodi.arkiv.network/rpc",
    ws_url="wss://https://kaolin.hoodi.arkiv.network/rpc/rpc/ws",
    private_key=private_key
)

# Query entities by annotations
query = 'type = "message" && version = 1'
print(f"Executing query: {query}")

# Simulated query results for playground
results = [
    {
        "entity_key": "0x" + "b" * 64,
        "storage_value": json.dumps({
            "message": "Sample message 1",
            "timestamp": int(time.time() * 1000) - 1000
        })
    },
    {
        "entity_key": "0x" + "c" * 64,
        "storage_value": json.dumps({
            "message": "Sample message 2", 
            "timestamp": int(time.time() * 1000)
        })
    }
]

print(f"Found {len(results)} entities")

# Process results
for entity in results:
    print("")
    print(f"Entity: {entity['entity_key'][:10]}...")
    
    try:
        parsed = json.loads(entity['storage_value'])
        print(f"  Content: {parsed}")
    except:
        print(f"  Raw data: {entity['storage_value']}")

# More query examples
print("")
print("--- Query Examples ---")
print('Equality: type = "message"')
print('Numeric: priority > 3')
print('Combined: type = "task" && status = "active"')
print('OR logic: status = "pending" || status = "active"')`
  },
  
  update: {
    title: 'Update Entity',
    description: 'Modify an existing entity',
    code: `# Initialize client first
from golem_base_sdk import GolemBaseClient
import json

private_key_hex = mock_private_key
private_key = bytes.fromhex(private_key_hex)

client = await GolemBaseClient.create_rw_client(
    rpc_url="https://kaolin.hoodi.arkiv.network/rpc",
    ws_url="wss://https://kaolin.hoodi.arkiv.network/rpc/rpc/ws",
    private_key=private_key
)

# First create an entity to update (simulated)
entity_key = "0x" + "d" * 64
print(f"Created entity: {entity_key[:10]}...")

# Now update it
update_data = json.dumps({
    "message": "Updated content",
    "updatedAt": int(time.time() * 1000)
}).encode('utf-8')

# Simulated update
print("Entity updated successfully!")
print(f"Entity key: {entity_key[:10]}...")
print(f"New expiration block: 234567")`
  },
  
  events: {
    title: 'Event Simulation',
    description: 'Demonstrate event-driven operations',
    code: `# Initialize client first
from golem_base_sdk import GolemBaseClient
import json

private_key_hex = mock_private_key
private_key = bytes.fromhex(private_key_hex)

client = await GolemBaseClient.create_rw_client(
    rpc_url="https://kaolin.hoodi.arkiv.network/rpc",
    ws_url="wss://https://kaolin.hoodi.arkiv.network/rpc/rpc/ws",
    private_key=private_key
)

print("=== Event Simulation Example ===")
print("")
print("⚠️  NOTE: Real-time event monitoring is NOT supported")
print("    in this playground due to sandbox limitations.")
print("    This example demonstrates event-driven patterns instead.")
print("")

# For production use: watch_logs() provides real-time blockchain event monitoring
# Here we simulate event-driven logic

print("1. Creating entity that will trigger events...")
entity1_key = "0x" + "e" * 64
print(f"   Created: {entity1_key[:16]}...")

print("")
print("2. Simulating threshold check...")
# Simulated threshold check
safe_count = 2
print(f"   Safe sensors found: {safe_count}")

print("")
print("3. Creating alert entity if threshold exceeded...")
entity2_key = "0x" + "f" * 64
print(f"   Created alert sensor: {entity2_key[:16]}...")

print("")
print("4. Checking for alerts...")
alert_count = 1
print(f"   ALERT! Found {alert_count} sensors in alert state!")

alert_value = 75
print(f"   Alert details: Value={alert_value} (threshold=50)")

print("")
print("=== Event Simulation Complete ===")
print("")
print("Note: For real-time event monitoring, use watch_logs()")
print("in a Python environment outside the sandbox.")`
  },
  
  batch: {
    title: 'Batch Operations',
    description: 'Perform multiple operations efficiently',
    code: `# Initialize client first
from golem_base_sdk import GolemBaseClient
import json

private_key_hex = mock_private_key
private_key = bytes.fromhex(private_key_hex)

client = await GolemBaseClient.create_rw_client(
    rpc_url="https://kaolin.hoodi.arkiv.network/rpc",
    ws_url="wss://https://kaolin.hoodi.arkiv.network/rpc/rpc/ws",
    private_key=private_key
)

# Create multiple entities in a single transaction
batch_id = str(int(time.time() * 1000))
batch_entities = []

for i in range(5):
    entity_data = json.dumps({
        "message": f"Batch item #{i + 1}",
        "batchId": batch_id,
        "index": i
    })
    batch_entities.append(entity_data)

print(f"Creating batch of {len(batch_entities)} entities...")

# Simulated batch creation
receipts = []
for i in range(5):
    entity_key = "0x" + str(i) * 64
    receipts.append({"entity_key": entity_key})

print("Batch created successfully!")
for i, receipt in enumerate(receipts):
    print(f"  Item {i + 1}: {receipt['entity_key'][:10]}...")

# Query the batch (simulated)
batch_query = f'batchId = "{batch_id}"'
batch_results_count = 5
print("")
print(f"Queried batch: found {batch_results_count} entities")`
  },
  
  metamask: {
    title: 'MetaMask Integration',
    description: 'Check MetaMask connection status in Python',
    code: `# MetaMask Integration Check
# Note: MetaMask is a browser extension and cannot directly interact with Python
# However, we can check if MetaMask was connected in the browser

print("=== MetaMask Integration Status ===")
print("")

if is_metamask_connected:
    print("✅ MetaMask is connected in the browser!")
    print(f"Wallet address: {user_wallet_address}")
    print("")
    print("Note: MetaMask operations (signing, transactions) must be")
    print("performed in the browser. Python can only read the wallet")
    print("address that was connected.")
else:
    print("❌ MetaMask is not connected")
    print("")
    print("To use MetaMask:")
    print("1. Switch to TypeScript mode")
    print("2. Click 'Connect MetaMask' button")
    print("3. Approve the connection in MetaMask")
    print("")
    print("Once connected, the wallet address will be available")
    print("in both TypeScript and Python examples.")

print("")
print("=== Why MetaMask is TypeScript-only ===")
print("")
print("MetaMask is a browser extension that uses JavaScript APIs.")
print("It cannot directly communicate with server-side Python code.")
print("TypeScript (running in the browser) can interact with MetaMask")
print("through the browser's ethereum provider interface.")
print("")
print("For Python applications requiring wallet integration,")
print("consider using:")
print("- Private keys (for server-side operations)")
print("- Web3 wallets that provide API access")
print("- Browser-based frontends that handle MetaMask")`
  },
  
  fullExample: {
    title: 'Full Example',
    description: 'Complete workflow: connect, create, query, update, and delete',
    code: `# Complete Golem DB workflow example
print("=== GOLEM DB FULL EXAMPLE ===")
print("")

# Step 1: Initialize and connect
print("1. Connecting to Golem DB...")
from golem_base_sdk import GolemBaseClient
import json
import time

private_key_hex = mock_private_key
private_key = bytes.fromhex(private_key_hex)

client = await GolemBaseClient.create_rw_client(
    rpc_url="https://kaolin.hoodi.arkiv.network/rpc",
    ws_url="wss://https://kaolin.hoodi.arkiv.network/rpc/rpc/ws",
    private_key=private_key
)

owner_address = "0x4393CE3C46f74CC5c30809b122acd69EE74aC532"
print(f"✅ Connected! Address: {owner_address}")
print("")

# Step 2: Create entities
print("2. Creating entities...")
entities = []
for i in range(1, 4):
    entity = {
        "id": i,
        "name": f"Item {i}",
        "category": "even" if i % 2 == 0 else "odd",
        "timestamp": int(time.time() * 1000)
    }
    entities.append(entity)

# Simulated entity creation
create_receipts = []
for i in range(3):
    key = "0x" + chr(97 + i) * 64  # a, b, c...
    create_receipts.append({"entity_key": key})

print(f"✅ Created {len(create_receipts)} entities")
for i, receipt in enumerate(create_receipts):
    print(f"  - Entity {i + 1}: {receipt['entity_key'][:16]}...")
print("")

# Step 3: Query entities
print("3. Querying entities...")
query = 'type = "demo-item" && category = "odd"'
print(f"Query: {query}")

# Simulated query results
results = [
    {"id": 1, "name": "Item 1", "category": "odd"},
    {"id": 3, "name": "Item 3", "category": "odd"}
]

print(f"✅ Found {len(results)} matching entities")
for data in results:
    print(f"  - ID: {data['id']}, Name: {data['name']}, Category: {data['category']}")
print("")

# Step 4: Update an entity
print("4. Updating first entity...")
if len(create_receipts) > 0:
    entity_to_update = create_receipts[0]['entity_key']
    
    # Simulated update
    print("✅ Entity updated successfully")
    print(f"  - Key: {entity_to_update[:16]}...")
    print(f"  - New expiration: block 345678")
print("")

# Step 5: Query updated entities
print("5. Verifying update...")
verify_query = 'type = "demo-item" && status = "updated"'
updated_count = 1
print(f"✅ Found {updated_count} updated entities")
print("")

# Step 6: Delete an entity
print("6. Deleting entity...")
if len(create_receipts) > 2:
    entity_to_delete = create_receipts[2]['entity_key']
    # Simulated deletion
    print(f"✅ Entity deleted: {entity_to_delete[:16]}...")
print("")

# Step 7: Final summary
print("7. Final summary:")
final_query = 'type = "demo-item"'
final_count = 2  # After deletion
print(f"  - Remaining entities: {final_count}")
print(f"  - Owner address: {owner_address}")
print("")
print("=== EXAMPLE COMPLETED ===")`
  }
};