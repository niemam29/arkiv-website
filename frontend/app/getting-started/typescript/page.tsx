'use client'

import { useEffect, useState } from 'react'
import { CodeBlock } from '@/components/ui/CodeBlock'

export default function GettingStartedPage() {
  const [activeSection, setActiveSection] = useState('setup-install')

  const story = {
    setupInstall: {
      p: `Before we start the story, make sure your environment is ready. You’ll install the SDK, set up a tiny script, and provide credentials.`
    },
    connect: {
      p: `You’re the facilitator. You’ll open a team vote and watch decisions take shape on-chain. First, connect with a private key and an RPC endpoint.`,
      bullets: [
        { t: 'Goal', v: 'Create a client that can sign & send.' },
        { t: 'Why it matters', v: 'Everything else depends on a working connection.' },
        { t: 'Success check', v: 'The script prints your address.' }
      ]
    },
    open: {
      p: `Create the space where a decision will be made. The proposal is the room; its BTL is the voting window.`,
      bullets: [
        { t: 'Goal', v: 'Write a proposal entity with a finite BTL.' },
        { t: 'Why it matters', v: 'The window is enforced by expiration; predictable cost comes from time-scoping.' },
        { t: 'Success check', v: 'You get a proposal.entityKey (the proposal id).' }
      ]
    },
    cast: {
      p: `Participants vote. Each vote is its own entity, linked to the proposal via proposalKey and attributed to the voter address.`,
      bullets: [
        { t: 'Goal', v: 'Create votes with { type="vote", proposalKey, voter, choice }.' },
        { t: 'Why it matters', v: 'Votes are small, auditable, and independently verifiable.' },
        { t: 'Success check', v: 'Two vote keys printed; both linked to your proposal.' }
      ]
    },
    batch: {
      p: `Optionally, add many votes at once-great for voting across multiple proposals, fixtures or demos.`,
      bullets: [
        { t: 'Goal', v: 'Create multiple vote entities in a single call.' },
        { t: 'Success check', v: 'Receipt count matches the number you pushed.' }
      ]
    },
    tally: {
      p: `Tally by querying annotations. Deterministic reads mean the same query yields the same answer.`,
      bullets: [
        { t: 'Goal', v: 'Query votes by proposalKey and choice.' },
        { t: 'Success check', v: 'YES/NO totals match your inputs.' }
      ]
    },
    listen: {
      p: `Keep your ear to the door. Watch vote and proposal creations and extensions in real time-no polling.`,
      bullets: [
        { t: 'Goal', v: 'Subscribe to creation and extension events for votes.' },
        { t: 'Success check', v: 'Console logs “[Vote created] …” or “[Vote extended] …”.' }
      ]
    },
    extend: {
      p: `Need more time? Extend the proposal’s BTL and keep the room open.`,
      bullets: [
        { t: 'Goal', v: 'Extend the proposal entity by N blocks.' },
        { t: 'Success check', v: 'New expiration block printed to console.' }
      ]
    }
  } as const

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)), {
      root: null,
      rootMargin: '-100px 0px -80% 0px',
      threshold: 0
    })
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((s) => observer.observe(s))
    return () => sections.forEach((s) => observer.unobserve(s))
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 120
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const navItems = [
    { id: 'setup-install', label: 'Setup & Installation', icon: '🧰' },
    { id: 'connect', label: '1) Connect & Verify', icon: '🔗' },
    { id: 'open', label: '2) Open Proposal', icon: '📥' },
    { id: 'cast', label: '3) Cast Votes', icon: '🗳️' },
    { id: 'batch', label: '4) (Optional) Batch', icon: '📦' },
    { id: 'tally', label: '5) Tally Votes', icon: '🔢' },
    { id: 'listen', label: '6) Watch Live', icon: '📡' },
    { id: 'extend', label: '7) Extend Window', icon: '⏱️' },
    { id: 'help', label: 'Troubleshooting', icon: '🔧' }
  ]

  return (
    <div className="min-h-screen bg-white pt-28">
      <main className="relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-[60px] py-12">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-block px-4 py-2 bg-[#FE7445] text-white text-sm font-mono rounded-lg shadow-figma-button-primary">
              TypeScript SDK v0.1.16
            </div>
            <h1 className="text-4xl md:text-5xl font-brutal font-black uppercase text-black">Arkiv TS SDK - Getting Started</h1>
            <p className="text-xl font-mono text-[#1F1F1F] max-w-3xl mx-auto">
              Voting Board: Open a proposal, collect votes in real time, tally them, batch more votes, then extend the voting window.
            </p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 font-mono text-xs text-stone-700">
              <span>Story</span>
              <span>•</span>
              <span>Connect → Open → Cast → (Batch) → Tally → Watch → Extend</span>
            </div>
          </div>

          {/* Sticky Nav */}
          <div className="sticky top-[88px] z-40 backdrop-blur-md border-b border-stone-300 bg-white/95 -mx-4 px-4 py-3 mb-12">
            <div className="flex items-center gap-4 overflow-x-auto">
              <a
                href="/"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono bg-gray-200 text-black hover:bg-[#FE7445] hover:text-white transition-all whitespace-nowrap"
              >
                Home
              </a>
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

          {/* Setup & Installation */}
          <section id="setup-install" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Setup &amp; Installation</h2>

            {/* Prerequisites */}
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card mb-6">
              <h3 className="text-xl font-brutal font-bold mb-4 text-black">Prerequisites</h3>
              <p className="text-stone-900 font-mono text-sm mb-4">Tested with golem-base-sdk@0.1.16 and Node.js 20+. Bun also works.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="text-[#FE7445] text-xl">✓</div>
                  <div>
                    <p className="font-mono font-medium text-black">Node.js 18+ (or Bun 1.x)</p>
                    <p className="text-sm font-mono text-stone-900">LTS recommended</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[#FE7445] text-xl">✓</div>
                  <div>
                    <p className="font-mono font-medium text-black">TypeScript 5+ (optional)</p>
                    <p className="text-sm font-mono text-stone-900">For typed scripts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[#FE7445] text-xl">✓</div>
                  <div>
                    <p className="font-mono font-medium text-black">Ethereum Wallet</p>
                    <p className="text-sm font-mono text-stone-900">With test ETH for your RPC</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[#FE7445] text-xl">✓</div>
                  <div>
                    <p className="font-mono font-medium text-black">RPC Endpoint</p>
                    <p className="text-sm font-mono text-stone-900">HTTP + (optionally) WS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Installation */}
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card mb-6">
              <h3 className="text-xl font-brutal font-bold mb-2 text-black">Installation</h3>
              <CodeBlock
                language="bash"
                code={`# Using npm
npm init -y
npm i golem-base-sdk dotenv tslib

# or with Bun
bun init -y
bun add golem-base-sdk dotenv tslib`}
              />
            </div>

            {/* Optional config files */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">tsconfig.json (optional)</h3>
                <CodeBlock
                  language="json"
                  code={`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["*.ts"]
}`}
                />
              </div>
              <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
                <h3 className="text-xl font-brutal font-bold mb-2 text-black">package.json (scripts)</h3>
                <CodeBlock
                  language="json"
                  code={`{
  "type": "module",
  "scripts": {
    "start": "tsx voting-board.ts",
    "build": "tsc",
    "dev": "tsx watch voting-board.ts"
  },
  "dependencies": {
    "golem-base-sdk": "^0.1.16",
    "dotenv": "^16.4.5",
    "tslib": "^2.8.1"
  },
  "devDependencies": {
    "tsx": "^4.19.2",
    "typescript": "^5.6.3"
  }
}`}
                />
              </div>
            </div>

            {/* Environment Configuration */}
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <h3 className="text-xl font-brutal font-bold mb-2 text-black">Environment Configuration</h3>
              <CodeBlock
                language="bash"
                code={`# .env
PRIVATE_KEY=0x...
RPC_URL=https://your.rpc.endpoint/rpc # https://kaolin.hoodi.arkiv.network/rpc
WS_URL=wss://your.rpc.endpoint/rpc/ws # wss://kaolin.hoodi.arkiv.network/rpc`}
              />
            </div>
          </section>

          {/* 1) Connect & Verify */}
          <section id="connect" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">1) Connect &amp; Verify</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <p className="font-mono text-sm text-stone-900 mb-4">{story.connect.p}</p>
              <ul className="list-disc list-inside font-mono text-sm text-stone-900 space-y-1 mb-4">
                {story.connect.bullets.map((b) => (
                  <li key={b.t}>
                    <b>{b.t}:</b> {b.v}
                  </li>
                ))}
              </ul>
              <CodeBlock
                language="typescript"
                code={`import 'dotenv/config';
import { createClient, Annotation, Tagged, type AccountData, type GolemBaseCreate } from 'golem-base-sdk';

// Helper: query RPC for basic network info
async function getChainId(rpcUrl: string): Promise<number> {
  const res = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_chainId', params: [] }),
  });
  const json = await res.json();
  if (!json?.result) throw new Error('RPC eth_chainId failed');
  return Number(json.result);
}

const rawKey = process.env.PRIVATE_KEY ?? '';
if (!rawKey) throw new Error('Missing PRIVATE_KEY in .env');
const hex = rawKey.startsWith('0x') ? rawKey.slice(2) : rawKey;
const key: AccountData = new Tagged('privatekey', Buffer.from(hex, 'hex'));

const rpcUrl = process.env.RPC_URL ?? '';
const wsUrl  = process.env.WS_URL  ?? '';
if (!rpcUrl) throw new Error('Missing RPC_URL in .env');

const chainId = await getChainId(rpcUrl);
const client = await createClient(chainId, key, rpcUrl, wsUrl);
console.log('Connected.');

const enc = new TextEncoder();
const decoder = new TextDecoder();

const owner = await (client as any).getOwnerAddress?.();
if (owner) console.log('Your account:', owner);`}
              />
            </div>
          </section>

          {/* 2) Open Proposal */}
          <section id="open" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">2) Open Proposal</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <p className="font-mono text-sm text-stone-900 mb-4">{story.open.p}</p>
              <ul className="list-disc list-inside font-mono text-sm text-stone-900 space-y-1 mb-4">
                {story.open.bullets.map((b) => (
                  <li key={b.t}>
                    <b>{b.t}:</b> {b.v}
                  </li>
                ))}
              </ul>
              <CodeBlock
                language="typescript"
                code={`const [proposal] = await client.createEntities([
  {
    data: enc.encode('Proposal: Switch stand-up to 9:30?'),
    btl: 200,
    stringAnnotations: [
      new Annotation('type', 'proposal'),
      new Annotation('status', 'open'),
    ],
    numericAnnotations: [new Annotation('version', 1)],
  } as GolemBaseCreate,
]);
console.log('Proposal key:', proposal.entityKey);

// Use entityKey as this proposal's identifier
const proposalKey = proposal.entityKey;`}
              />
            </div>
          </section>

          {/* 3) Cast Votes */}
          <section id="cast" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">3) Cast Votes</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <p className="font-mono text-sm text-stone-900 mb-4">{story.cast.p}</p>
              <ul className="list-disc list-inside font-mono text-sm text-stone-900 space-y-1 mb-4">
                {story.cast.bullets.map((b) => (
                  <li key={b.t}>
                    <b>{b.t}:</b> {b.v}
                  </li>
                ))}
              </ul>
              <CodeBlock
                language="typescript"
                code={`const voterAddr = (await (client as any).getOwnerAddress?.()) ?? 'unknown';

const [vote1, vote2] = await client.createEntities([
  {
    data: enc.encode('vote: yes'),
    btl: 200,
    stringAnnotations: [
      new Annotation('type', 'vote'),
      new Annotation('proposalKey', proposalKey),
      new Annotation('voter', voterAddr),
      new Annotation('choice', 'yes'),
    ],
    numericAnnotations: [new Annotation('weight', 1)],
  },
  {
    data: enc.encode('vote: no'),
    btl: 200,
    stringAnnotations: [
      new Annotation('type', 'vote'),
      new Annotation('proposalKey', proposalKey),
      new Annotation('voter', voterAddr),
      new Annotation('choice', 'no'),
    ],
    numericAnnotations: [new Annotation('weight', 1)],
  },
] as GolemBaseCreate[]);
console.log('Votes cast:', vote1.entityKey, vote2.entityKey);`}
              />
            </div>
          </section>

          {/* 4) (Optional) Batch Votes */}
          <section id="batch" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">4) (Optional) Batch Votes</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <p className="font-mono text-sm text-stone-900 mb-4">{story.batch.p}</p>
              <ul className="list-disc list-inside font-mono text-sm text-stone-900 space-y-1 mb-4">
                {story.batch.bullets.map((b) => (
                  <li key={b.t}>
                    <b>{b.t}:</b> {b.v}
                  </li>
                ))}
              </ul>
              <CodeBlock
                language="typescript"
                code={`const extras = Array.from({ length: 5 }, (_, i) => ({
  data: enc.encode(\`vote: yes #\${i + 1}\`),
  btl: 200,
  stringAnnotations: [
    new Annotation('type', 'vote'),
    new Annotation('proposalKey', proposalKey),
    new Annotation('voter', \`\${voterAddr}-bot\${i}\`),
    new Annotation('choice', 'yes'),
  ],
  numericAnnotations: [new Annotation('weight', 1)],
})) as GolemBaseCreate[];

const receipts = await client.createEntities(extras);
console.log(\`Batch created: \${receipts.length} votes\`);`}
              />
            </div>
          </section>

          {/* 5) Tally Votes */}
          <section id="tally" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">5) Tally Votes</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <p className="font-mono text-sm text-stone-900 mb-4">{story.tally.p}</p>
              <ul className="list-disc list-inside font-mono text-sm text-stone-900 space-y-1 mb-4">
                {story.tally.bullets.map((b) => (
                  <li key={b.t}>
                    <b>{b.t}:</b> {b.v}
                  </li>
                ))}
              </ul>
              <CodeBlock
                language="typescript"
                code={`const yesVotes = await client.queryEntities(
  \`type = "vote" && proposalKey = "\${proposalKey}" && choice = "yes"\`
);
const noVotes = await client.queryEntities(
  \`type = "vote" && proposalKey = "\${proposalKey}" && choice = "no"\`
);
console.log(\`Tallies - YES: \${yesVotes.length}, NO: \${noVotes.length}\`);`}
              />
            </div>
          </section>

          {/* 6) Watch Live */}
          <section id="listen" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">6) Watch Live</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <p className="font-mono text-sm text-stone-900 mb-4">{story.listen.p}</p>
              <ul className="list-disc list-inside font-mono text-sm text-stone-900 space-y-1 mb-4">
                {story.listen.bullets.map((b) => (
                  <li key={b.t}>
                    <b>{b.t}:</b> {b.v}
                  </li>
                ))}
              </ul>
              <CodeBlock
                language="typescript"
                code={`const stopWatching = client.watchLogs({
  fromBlock: BigInt(0),

  onCreated: (e) => {
    void (async () => {
      try {
        const meta = await (client as any).getEntityMetaData?.(e.entityKey);
        const strs = Object.fromEntries((meta?.stringAnnotations ?? []).map((a: any) => [a.key, a.value]));
        if (strs.type === 'vote') {
          const data = await client.getStorageValue(e.entityKey);
          console.log('[Vote created]', decoder.decode(data), 'key=', e.entityKey);

          // OPTIONAL: show a UI toast or send a webhook/email push here
          // notify('New vote', { entityKey: e.entityKey, proposalKey: strs.proposalKey });
        } else if (strs.type === 'proposal') {
          const data = await client.getStorageValue(e.entityKey);
          console.log('[Proposal created]', decoder.decode(data), 'key=', e.entityKey);

          // OPTIONAL: alert subscribers a new proposal is open
          // notify('New proposal', { entityKey: e.entityKey });
        }
      } catch {}
    })();
  },

  onExtended: (e) => {
    void (async () => {
      try {
        const meta = await (client as any).getEntityMetaData?.(e.entityKey);
        const strs = Object.fromEntries((meta?.stringAnnotations ?? []).map((a: any) => [a.key, a.value]));
        if (strs.type === 'vote') {
          console.log('[Vote extended]', 'key=', e.entityKey, '→', e.newExpirationBlock);
        } else if (strs.type === 'proposal') {
          console.log('[Proposal extended]', 'key=', e.entityKey, '→', e.newExpirationBlock);

          // OPTIONAL: alert subscribers about window extension
          // notify('Voting window extended', { entityKey: e.entityKey, newExpirationBlock: e.newExpirationBlock });
        }
      } catch {}
    })();
  },

  onUpdated: () => {},
  onDeleted: () => {},
  onError: (err) => console.error('[watchLogs] error:', err),
});
console.log('Watching for proposal/vote creations and extensions…');
`}
              />
            </div>
          </section>

          {/* 7) Extend Window */}
          <section id="extend" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">7) Extend Window</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card">
              <p className="font-mono text-sm text-stone-900 mb-4">{story.extend.p}</p>
              <ul className="list-disc list-inside font-mono text-sm text-stone-900 space-y-1 mb-4">
                {story.extend.bullets.map((b) => (
                  <li key={b.t}>
                    <b>{b.t}:</b> {b.v}
                  </li>
                ))}
              </ul>
              <CodeBlock
                language="typescript"
                code={`const [ext] = await client.extendEntities([
  { entityKey: proposal.entityKey, numberOfBlocks: 150 },
]);
console.log('Proposal extended to block:', ext.newExpirationBlock);`}
              />
            </div>
          </section>

          {/* Troubleshooting */}
          <section id="help" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Troubleshooting</h2>
            <div className="bg-gray-200 rounded-2xl p-6 border border-stone-300 shadow-figma-card space-y-4">
              <p className="font-mono text-sm text-stone-900">
                <b>Invalid sender:</b> Your RPC may point to an unexpected network for your key. Verify your RPC URL is correct.
              </p>
              <p className="font-mono text-sm text-stone-900">
                <b>Insufficient funds:</b> Get test ETH for your network; writes require gas.
              </p>
              <p className="font-mono text-sm text-stone-900">
                <b>No events seen?</b> Ensure <code>fromBlock</code> is low enough and keep the process running to receive logs.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
