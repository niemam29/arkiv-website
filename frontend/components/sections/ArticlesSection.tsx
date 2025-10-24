'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Article {
  id: number
  title: string
  excerpt: string
  slug: string
  published_at: string
  cover_image?: string
}

export default function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        // Fetch up to 4 articles for the blog section
        const filter = JSON.stringify({ status: { _eq: 'published' } })
        const response = await fetch(`https://cms.arkiv.network/items/articles?filter=${encodeURIComponent(filter)}&sort=-published_at&limit=4`)
        const data = await response.json()

        if (data.data && data.data.length > 0) {
          const articlesList = data.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            excerpt: item.excerpt || '',
            slug: item.slug,
            published_at: item.published_at,
            cover_image: item.cover_image
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
                key={article.id}
                href={`/blog/${article.slug}`}
                className="p-5 bg-[#EDEDED] rounded-2xl shadow-figma-card flex flex-col gap-5 hover:bg-orange-400 transition-colors duration-200 cursor-pointer group"
              >
                {article.cover_image && (
                  <div className="w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-mono text-sm text-[#1F1F1F] group-hover:text-white transition-colors">
                      {formatDate(article.published_at)}
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
