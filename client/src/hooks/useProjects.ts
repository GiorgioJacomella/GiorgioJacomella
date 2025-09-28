import { useState, useEffect, useCallback } from 'react'
import { client, Project, testSanityConnection } from '../lib/sanity'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const connectionTest = await testSanityConnection()
      if (!connectionTest.success) {
        setError(connectionTest.error || 'Connection test failed')
        return
      }
      
      const query = `*[_type == "project"] | order(publishedAt desc) {
        _id, title, description, image, publishedAt, slug, externalLink
      }`
      
      const result = await client.fetch(query)
      
      if (Array.isArray(result)) {
        setProjects(result)
      } else {
        setError('Invalid response format from Sanity')
      }
      
    } catch (err) {
      console.error('Project fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return { 
    projects, 
    loading, 
    error, 
    refresh: fetchProjects,
    projectCount: projects.length 
  }
}
