import { createClient, SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { getSanityConfig } from '../config/sanity'

const config = getSanityConfig()

export const client = createClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: config.apiVersion,
  useCdn: config.useCdn,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  try {
    if (!source || !source.asset || !source.asset._ref) {
      return builder.image({ asset: { _ref: 'fallback' } })
    }
    return builder.image(source)
  } catch (error) {
    console.error('Error generating image URL:', error)
    return builder.image({ asset: { _ref: 'fallback' } })
  }
}

export async function testSanityConnection(): Promise<{ success: boolean; error?: string }> {
  try {
    await client.fetch('*[_type == "project"]')
    return { success: true }
  } catch (error) {
    let errorMessage = 'Unknown connection error'
    
    if (error instanceof Error) {
      if (error.message.includes('CORS')) {
        errorMessage = `CORS policy violation - add ${config.allowedOrigins.join(', ')} to Sanity CORS origins`
      } else if (error.message.includes('401') || error.message.includes('403')) {
        errorMessage = 'Authentication required - add public read token or check project permissions'
      } else if (error.message.includes('404')) {
        errorMessage = `Project not found - verify project ID (${config.projectId}) and dataset (${config.dataset})`
      } else if (error.message.includes('fetch')) {
        errorMessage = 'Network error - check internet connection and CORS settings'
      } else {
        errorMessage = error.message
      }
    }
    
    return { success: false, error: errorMessage }
  }
}

export interface Project {
  _id: string
  title: {
    en: string
    de: string
  }
  description: {
    en: string
    de: string
  }
  image: {
    asset: {
      _ref: string
    }
  }
  publishedAt: string
  slug: {
    current: string
  }
}

export function getLocalizedContent<T>(
  content: { en: T; de: T } | null | undefined,
  language: string,
  fallback: T
): T {
  if (!content || typeof content !== 'object') return fallback
  
  const localizedContent = content[language as keyof typeof content]
  if (localizedContent !== undefined && localizedContent !== null) return localizedContent
  
  return content.en || fallback
}

export { config as sanityConfig }
