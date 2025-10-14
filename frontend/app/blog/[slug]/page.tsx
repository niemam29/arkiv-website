'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { CodeBlock } from '@/components/ui/CodeBlock'
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
    avatar?: {
      url: string
    }
  }
  category?: {
    name: string
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Try by slug first
        let response = await fetch(`https://cms.arkiv.network/api/articles?filters[slug][$eq]=${slug}&populate=*`)
        let data = await response.json()

        // If not found by slug, try by documentId
        if (!data.data || data.data.length === 0) {
          response = await fetch(`https://cms.arkiv.network/api/articles/${slug}?populate=*`)
          data = await response.json()

          if (data.data) {
            setPost(data.data)
          } else {
            setError('Post not found')
          }
        } else {
          setPost(data.data[0])
        }
      } catch (err) {
        console.error('Failed to fetch blog post:', err)
        setError('Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <div className="font-mono text-gray-400">Loading...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="font-mono text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="font-mono text-gray-400 mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
            <Link href="/blog" className="font-mono text-sm text-white hover:text-gray-300 transition-colors">
              ← Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Back Link */}
      <div className="border-b border-black/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/article"
            className="font-mono text-sm text-gray-600 hover:text-black transition-colors inline-flex items-center gap-2"
          >
            ← Back to Articles
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category */}
        {post.category && (
          <div className="mb-6">
            <span className="font-mono text-sm px-3 py-1 bg-black/10 rounded">{post.category.name}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="font-mono text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

        {/* Excerpt */}
        {post.excerpt && <p className="font-mono text-xl text-gray-600 mb-8">{post.excerpt}</p>}

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-12 pb-8 border-b border-black/10">
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.avatar?.url && (
                <img src={`https://cms.arkiv.network${post.author.avatar.url}`} alt={post.author.name} className="w-10 h-10 rounded-full" />
              )}
              <span className="font-mono text-sm">{post.author.name}</span>
            </div>
          )}
          <span className="font-mono text-sm text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none bg-gray-50 text-black p-8 rounded-lg">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '')
                const inline = !match
                return !inline && match ? (
                  <CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')} />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
              h1: ({ children }) => <h1 className="font-mono text-3xl font-bold mt-12 mb-6 first:mt-0 text-black">{children}</h1>,
              h2: ({ children }) => <h2 className="font-mono text-2xl font-bold mt-10 mb-4 text-black">{children}</h2>,
              h3: ({ children }) => <h3 className="font-mono text-xl font-bold mt-8 mb-3 text-black">{children}</h3>,
              p: ({ children }) => <p className="font-mono text-base mb-6 leading-relaxed text-gray-800">{children}</p>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => <ul className="font-mono list-disc pl-6 mb-6 space-y-2 text-gray-800">{children}</ul>,
              ol: ({ children }) => <ol className="font-mono list-decimal pl-6 mb-6 space-y-2 text-gray-800">{children}</ol>,
              blockquote: ({ children }) => (
                <blockquote className="font-mono border-l-4 border-gray-300 pl-6 my-6 italic text-gray-600">{children}</blockquote>
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <Footer />
    </div>
  )
}
