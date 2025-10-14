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

export default function LatestArticleCard() {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLatestArticle() {
      try {
        const response = await fetch('https://cms.arkiv.network/api/articles?sort=publishedAt:desc&pagination[limit]=1')
        const data = await response.json()

        if (data.data && data.data.length > 0) {
          const item = data.data[0]
          setArticle({
            id: item.id,
            documentId: item.documentId,
            title: item.title,
            excerpt: item.excerpt || '',
            slug: item.slug,
            publishedAt: item.publishedAt,
            cover: item.cover
          })
        }
      } catch (error) {
        console.error('Error fetching latest article:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestArticle()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <div className="font-mono text-sm text-[#1F1F1F]">The latest in our Blog</div>
        <div className="w-full lg:w-[420px] h-[200px] bg-gray-200 rounded-2xl animate-pulse"></div>
      </div>
    )
  }

  if (!article) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="font-mono text-sm text-[#1F1F1F]">The latest in our Blog</div>

      <Link
        href={`/blog/${article.slug}`}
        className="w-full lg:w-[420px] p-5 bg-[#EDEDED] rounded-2xl shadow-figma-card flex flex-col gap-5 hover:bg-orange-400 transition-colors duration-200 cursor-pointer group"
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
    </div>
  )
}
