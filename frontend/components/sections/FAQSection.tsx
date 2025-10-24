'use client'

import { useEffect, useState } from 'react'

interface FAQ {
  id: number
  documentId: string
  question: string
  answer: string
  sortOrder: number
}

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const response = await fetch('https://cms.arkiv.network/api/faqs?sort=sortOrder:asc')
        const data = await response.json()

        const faqList: FAQ[] = data.data?.map((item: any) => ({
          id: item.id,
          documentId: item.documentId,
          question: item.question,
          answer: item.answer,
          sortOrder: item.sortOrder || 0
        })) || []

        // If no data from CMS, use hardcoded fallback
        if (faqList.length === 0) {
          setFaqs([
            {
              id: 1,
              documentId: 'faq-1',
              question: 'What is Arkiv?',
              answer: 'Arkiv is a universal data layer for Ethereum that introduces data as a first-class citizen on blockchain. It provides queryable, time-scoped, and verifiable database chains.',
              sortOrder: 1
            },
            {
              id: 2,
              documentId: 'faq-2',
              question: 'How is Arkiv different from traditional databases?',
              answer: 'Arkiv combines blockchain\'s trustless verification with database functionality. Unlike traditional databases, data in Arkiv is immutable, verifiable, and decentralized.',
              sortOrder: 2
            },
            {
              id: 3,
              documentId: 'faq-3',
              question: 'What are DB-Chains?',
              answer: 'DB-Chains are specialized Layer 3 chains designed for data storage. They support CRUD operations via RPC, indexed queries, and programmable data expiration.',
              sortOrder: 3
            },
            {
              id: 4,
              documentId: 'faq-4',
              question: 'What is time-scoped data?',
              answer: 'Time-scoped data means you pay for storage based on bytes × lifetime. Data can automatically expire on configurable dates, reducing long-term costs.',
              sortOrder: 4
            },
            {
              id: 5,
              documentId: 'faq-5',
              question: 'How do I get started with Arkiv?',
              answer: 'Start by installing our SDK (arkiv-sdk for TypeScript or arkiv-sdk for Python), then follow our Getting Started guide to connect to Arkiv testnet and create your first database.',
              sortOrder: 5
            }
          ])
        } else {
          setFaqs(faqList)
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error)
        // On error, use hardcoded fallback
        setFaqs([
          {
            id: 1,
            documentId: 'faq-1',
            question: 'What is Arkiv?',
            answer: 'Arkiv is a universal data layer for Ethereum that introduces data as a first-class citizen on blockchain. It provides queryable, time-scoped, and verifiable database chains.',
            sortOrder: 1
          },
          {
            id: 2,
            documentId: 'faq-2',
            question: 'How is Arkiv different from traditional databases?',
            answer: 'Arkiv combines blockchain\'s trustless verification with database functionality. Unlike traditional databases, data in Arkiv is immutable, verifiable, and decentralized.',
            sortOrder: 2
          },
          {
            id: 3,
            documentId: 'faq-3',
            question: 'What are DB-Chains?',
            answer: 'DB-Chains are specialized Layer 3 chains designed for data storage. They support CRUD operations via RPC, indexed queries, and programmable data expiration.',
            sortOrder: 3
          },
          {
            id: 4,
            documentId: 'faq-4',
            question: 'What is time-scoped data?',
            answer: 'Time-scoped data means you pay for storage based on bytes × lifetime. Data can automatically expire on configurable dates, reducing long-term costs.',
            sortOrder: 4
          },
          {
            id: 5,
            documentId: 'faq-5',
            question: 'How do I get started with Arkiv?',
            answer: 'Start by installing our SDK (arkiv-sdk for TypeScript or arkiv-sdk for Python), then follow our Getting Started guide to connect to Arkiv testnet and create your first database.',
            sortOrder: 5
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  if (loading) {
    return (
      <section className="relative z-10 px-4 md:px-[60px] py-[32px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-8">
            <h2 className="font-brutal text-xl font-medium uppercase text-black">[ FAQ ]</h2>
            <div className="animate-pulse bg-gray-200 h-48 rounded-2xl"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative z-10 px-4 md:px-[60px] py-[32px] bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-8">
          <h2 id="faq" className="font-brutal text-xl font-medium uppercase text-black">[ FAQ ]</h2>

          <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto">
            {faqs.map((faq, index) => (
              <div key={faq.documentId} className="flex flex-col gap-4">
                <div className="w-full h-px bg-neutral-400"></div>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="w-full lg:w-[648px] font-mono text-lg lg:text-xl text-black">{faq.question}</div>
                  <div className="w-full lg:w-[648px] font-mono text-base text-black">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
