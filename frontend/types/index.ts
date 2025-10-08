// Content Types based on expected CMS structure

export interface Page {
  id: number
  attributes: {
    title: string
    slug: string
    content: string
    seo?: SEO
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface Post {
  id: number
  attributes: {
    title: string
    slug: string
    excerpt: string
    content: string
    featuredImage?: Media
    author?: Author
    category?: Category
    tags?: Tag[]
    seo?: SEO
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface Service {
  id: number
  attributes: {
    title: string
    slug: string
    description: string
    content: string
    icon?: Media
    featuredImage?: Media
    features?: string[]
    pricing?: {
      price: number
      currency: string
      period: string
    }
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface Author {
  id: number
  attributes: {
    name: string
    email: string
    bio?: string
    avatar?: Media
    createdAt: string
    updatedAt: string
  }
}

export interface Category {
  id: number
  attributes: {
    name: string
    slug: string
    description?: string
    createdAt: string
    updatedAt: string
  }
}

export interface Tag {
  id: number
  attributes: {
    name: string
    slug: string
    createdAt: string
    updatedAt: string
  }
}

export interface Media {
  id: number
  attributes: {
    name: string
    alternativeText?: string
    caption?: string
    width: number
    height: number
    formats?: {
      thumbnail?: MediaFormat
      small?: MediaFormat
      medium?: MediaFormat
      large?: MediaFormat
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl?: string
    provider: string
    createdAt: string
    updatedAt: string
  }
}

export interface MediaFormat {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  path?: string
  url: string
}

export interface SEO {
  id: number
  metaTitle?: string
  metaDescription?: string
  keywords?: string
  metaRobots?: string
  structuredData?: any
  metaViewport?: string
  canonicalURL?: string
  metaImage?: Media
}

export interface GlobalContent {
  id: number
  attributes: {
    siteName: string
    siteDescription: string
    logo?: Media
    favicon?: Media
    defaultSEO?: SEO
    header: {
      navigation: NavigationItem[]
    }
    footer: {
      content: string
      links: NavigationItem[]
      socialLinks: SocialLink[]
    }
    createdAt: string
    updatedAt: string
  }
}

export interface NavigationItem {
  id: number
  title: string
  url: string
  target?: '_blank' | '_self'
  children?: NavigationItem[]
}

export interface SocialLink {
  id: number
  platform: string
  url: string
  icon?: string
}
