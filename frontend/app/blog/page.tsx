'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  published_at: string
  author?: string
  cover_image?: string
  status: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const filter = JSON.stringify({ status: { _eq: 'published' } })
        const response = await fetch(`https://cms.arkiv.network/items/articles?filter=${encodeURIComponent(filter)}&sort=-published_at`)
        const data = await response.json()
        setPosts(data.data || [])
      } catch (error) {
        console.error('Failed to fetch blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = posts

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header Section */}
      <div className="border-b border-black/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-mono text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="font-mono text-lg text-gray-600">
            Latest updates, tutorials, and insights from the Arkiv team
          </p>
        </div>
      </div>


      {/* Blog Posts Grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="font-mono text-gray-600">Loading posts...</div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="font-mono text-gray-600">No blog posts yet</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group border border-black/10 rounded-lg overflow-hidden hover:border-black/30 transition-colors"
              >
                {/* Cover Image */}
                {post.cover_image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Title */}
                  <h2 className="font-mono text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="font-mono text-sm text-gray-700 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                    {post.author && <span>{post.author}</span>}
                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
