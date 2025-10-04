import { MetadataRoute } from 'next'
import { client } from '../lib/sanity'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://giorgio.jacomella.dev'
  
  let projects: { slug: { current: string }; publishedAt: string }[] = []
  
  try {
    projects = await client.fetch<{ slug: { current: string }; publishedAt: string }[]>(
      `*[_type == "project" && defined(slug.current)] { 
        "slug": slug.current, 
        publishedAt 
      }`
    )
  } catch (error) {
    console.warn('Failed to fetch projects for sitemap:', error)
  }

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/project/${project.slug}`,
    lastModified: new Date(project.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...projectPages]
}
