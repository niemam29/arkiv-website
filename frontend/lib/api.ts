import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Types for Strapi responses
export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiEntity {
  id: number
  attributes: Record<string, any>
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

// API Functions
export const strapiApi = {
  // Generic fetch function
  async fetch<T>(endpoint: string, params?: Record<string, any>): Promise<StrapiResponse<T[]>> {
    const response = await api.get(endpoint, { params })
    return response.data
  },

  // Get single item
  async fetchOne<T>(endpoint: string, id: string | number, params?: Record<string, any>): Promise<StrapiResponse<T>> {
    const response = await api.get(`${endpoint}/${id}`, { params })
    return response.data
  },

  // Pages
  async getPages(params?: Record<string, any>) {
    return this.fetch('/pages', {
      populate: '*',
      ...params,
    })
  },

  async getPage(slug: string) {
    return this.fetch('/pages', {
      filters: { slug: { $eq: slug } },
      populate: '*',
    })
  },

  // Blog posts
  async getPosts(params?: Record<string, any>) {
    return this.fetch('/posts', {
      populate: '*',
      sort: 'publishedAt:desc',
      ...params,
    })
  },

  async getPost(slug: string) {
    return this.fetch('/posts', {
      filters: { slug: { $eq: slug } },
      populate: '*',
    })
  },

  // Services
  async getServices(params?: Record<string, any>) {
    return this.fetch('/services', {
      populate: '*',
      ...params,
    })
  },

  // Global content (header, footer, etc.)
  async getGlobal(params?: Record<string, any>) {
    return this.fetchOne('/global', 1, {
      populate: 'deep',
      ...params,
    })
  },
}