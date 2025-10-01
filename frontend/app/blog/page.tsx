'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'

interface BlogPost {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  author?: {
    name: string
  }
  category?: {
    name: string
  }
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://cms.arkiv.network/api/articles?populate=*&sort=publishedAt:desc')
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

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category?.name === selectedCategory)
    : posts

  const categories = Array.from(new Set(posts.map(post => post.category?.name).filter(Boolean)))

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-mono text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="font-mono text-lg text-gray-400">
            Latest updates, tutorials, and insights from the Arkiv team
          </p>
        </div>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`font-mono px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === null
                    ? 'bg-white text-black'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                All Posts
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category!)}
                  className={`font-mono px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-white text-black'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="font-mono text-gray-400">Loading posts...</div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="font-mono text-gray-400">
              {selectedCategory ? `No posts in "${selectedCategory}"` : 'No blog posts yet'}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug || post.documentId}`}
                className="group border border-white/10 rounded-lg p-6 hover:border-white/30 transition-colors"
              >
                {/* Category Badge */}
                {post.category && (
                  <div className="mb-4">
                    <span className="font-mono text-xs px-2 py-1 bg-white/10 rounded">
                      {post.category.name}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h2 className="font-mono text-xl font-bold mb-3 group-hover:text-gray-300 transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="font-mono text-sm text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                  {post.author && <span>{post.author.name}</span>}
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
