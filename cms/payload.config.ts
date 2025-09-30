import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const payloadSecret = process.env.PAYLOAD_SECRET
if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET must be defined')
}

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error('DATABASE_URL must be defined')
}

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    // Users collection for admin auth
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
    // Hero section content
    {
      slug: 'hero',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'textarea',
          required: true,
          defaultValue: 'Introducing data as\\na first‑class citizen\\non blockchain.',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: 'A universal, cost efficient data layer where you control your data on Ethereum',
        },
        {
          name: 'primaryButtonText',
          type: 'text',
          required: true,
          defaultValue: 'Build now',
        },
        {
          name: 'secondaryButtonText',
          type: 'text',
          required: true,
          defaultValue: 'Read the litepaper',
        },
        {
          name: 'golemAnnouncement',
          type: 'textarea',
          required: true,
          defaultValue: 'GolemDB:now Arkiv\\nRead the announcement',
        },
      ],
    },
    // How it works section
    {
      slug: 'how-it-works',
      admin: {
        useAsTitle: 'sectionTitle',
      },
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          defaultValue: '[ How it Works ]',
        },
        {
          name: 'layers',
          type: 'array',
          fields: [
            {
              name: 'layerNumber',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
    // GLM Tokenomics section
    {
      slug: 'glm-tokenomics',
      admin: {
        useAsTitle: 'sectionTitle',
      },
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          defaultValue: '[ GLM — Tokenomics ]',
        },
        {
          name: 'feesTitle',
          type: 'text',
          required: true,
          defaultValue: 'Fees',
        },
        {
          name: 'feesDescription',
          type: 'textarea',
          required: true,
          defaultValue: 'Data writes and management are designed to be paid via Arkiv with GLM at the core.',
        },
        {
          name: 'incentivesTitle',
          type: 'text',
          required: true,
          defaultValue: 'Incentives',
        },
        {
          name: 'incentivesDescription',
          type: 'textarea',
          required: true,
          defaultValue: 'GLM aligns actors across DB‑chains and coordinator services.',
        },
        {
          name: 'multiTokenTitle',
          type: 'text',
          required: true,
          defaultValue: 'Multi‑token gas',
        },
        {
          name: 'multiTokenDescription',
          type: 'textarea',
          required: true,
          defaultValue: 'Arkiv supports multi‑token gas logic at L2 while keeping GLM central to the system\'s economics.',
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
          defaultValue: 'Bridge GLM Now!',
        },
      ],
    },
    // Use cases
    {
      slug: 'use-cases',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'order', 'updatedAt'],
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          required: false,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 1,
        },
      ],
    },
  ],
  editor: lexicalEditor({}),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
    },
  }),
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://moon.dev.golem.network:3000',
    'https://moon.dev.golem.network',
  ],
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://moon.dev.golem.network:3000',
    'https://moon.dev.golem.network',
  ],
})
