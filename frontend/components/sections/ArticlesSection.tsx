'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Article {
  id: number
  documentId: string
  title: string
  excerpt: string
  slug: string
  publishedAt: string
  cover?: {
    url: string
    alternativeText?: string
  }
}

export default function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        // Fetch up to 4 articles for the blog section
        const response = await fetch('https://cms.arkiv.network/api/articles?sort=publishedAt:desc&pagination[limit]=4')
        const data = await response.json()

        if (data.data && data.data.length > 0) {
          const articlesList = data.data.map((item: any) => ({
            id: item.id,
            documentId: item.documentId,
            title: item.title,
            excerpt: item.excerpt || '',
            slug: item.slug,
            publishedAt: item.publishedAt,
            cover: item.cover
          }))
          setArticles(articlesList)
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  if (loading) {
    return (
      <section className="relative z-10 px-4 md:px-[60px] py-[32px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-8">
            <h2 className="font-brutal text-xl font-medium uppercase text-black">[ Blog ]</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[200px] bg-gray-200 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <section className="relative z-10 px-4 md:px-[60px] py-[32px] bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-8">
          <h2 className="font-brutal text-xl font-medium uppercase text-black">[ Blog ]</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Link
                key={article.documentId}
                href={`/blog/${article.slug}`}
                className="p-5 bg-[#EDEDED] rounded-2xl shadow-figma-card flex flex-col gap-5 hover:bg-orange-400 transition-colors duration-200 cursor-pointer group"
              >
                {article.cover?.url && (
                  <div className="w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={`https://cms.arkiv.network${article.cover.url}`}
                      alt={article.cover.alternativeText || article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-mono text-sm text-[#1F1F1F] group-hover:text-white transition-colors">
                      {formatDate(article.publishedAt)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-mono text-xl leading-7 text-[#1F1F1F] group-hover:text-white transition-colors">
                    {article.title}
                  </div>
                  <div className="font-mono text-sm text-[#666] group-hover:text-white/90 transition-colors line-clamp-2">
                    {article.excerpt}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
