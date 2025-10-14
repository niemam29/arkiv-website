const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export interface HeroContent {
  title: string
  description: string
  primaryButtonText: string
  secondaryButtonText: string
  golemAnnouncement: string
}

export interface LayerInfo {
  layerNumber: string
  title: string
  description: string
}

export interface HowItWorksContent {
  sectionTitle: string
  layers: LayerInfo[]
}

export interface GLMTokenomicsContent {
  sectionTitle: string
  feesTitle: string
  feesDescription: string
  incentivesTitle: string
  incentivesDescription: string
  multiTokenTitle: string
  multiTokenDescription: string
  buttonText: string
}

export interface UseCase {
  title: string
  description: string
  icon?: string
  order: number
}

export async function getHeroContent(): Promise<HeroContent | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/hero`)
    if (!response.ok) return null
    const data: any = await response.json()
    return data?.data?.attributes || null
  } catch (error) {
    console.error('Error fetching hero content:', error)
    return null
  }
}

export async function getHowItWorksContent(): Promise<HowItWorksContent | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/how-it-works?populate=layers`)
    if (!response.ok) return null
    const data: any = await response.json()
    return data?.data?.attributes || null
  } catch (error) {
    console.error('Error fetching how it works content:', error)
    return null
  }
}

export async function getGLMTokenomicsContent(): Promise<GLMTokenomicsContent | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/glm-tokenomics`)
    if (!response.ok) return null
    const data: any = await response.json()
    return data?.data?.attributes || null
  } catch (error) {
    console.error('Error fetching GLM tokenomics content:', error)
    return null
  }
}

export async function getUseCases(): Promise<UseCase[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/use-cases?sort=order:asc`)
    if (!response.ok) return []
    const data: any = await response.json()
    return data?.data?.map((item: any) => item.attributes) || []
  } catch (error) {
    console.error('Error fetching use cases:', error)
    return []
  }
}
