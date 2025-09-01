'use client'

import React, { useMemo, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '../../../contexts/AppContext'
import { useLocale } from '../../../hooks/useLocale'
import { client, Project, urlFor, getLocalizedContent } from '../../../lib/sanity'
import { Button } from '../../../components/ui/Button'
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner'
import { Message } from '../../../components/ui/ErrorMessage'
import { PageLayout } from '../../../components/PageLayout'

interface ProjectDetailContentProps {
  slug: string
}

export function ProjectDetailContent({ slug }: ProjectDetailContentProps) {
  const router = useRouter()
  const appContext = useApp()
  const language = appContext?.language || 'en'
  const locale = useLocale()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        setError(null)

        const query = `*[_type == "project" && slug.current == $slug][0] {
          _id, title, description, image, publishedAt, slug
        }`

        const result = await client.fetch(query, { slug })
        
        if (result) {
          setProject(result)
        } else {
          setError('Project not found')
        }
      } catch (err) {
        console.error('Project fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch project')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [slug])

  const { title, description, imageUrl, formattedDate } = useMemo(() => {
    if (!project) return { title: '', description: '', imageUrl: null, formattedDate: '' }
    
    try {
      const title = getLocalizedContent(project.title, language, 'Untitled Project')
      const description = getLocalizedContent(project.description, language, 'No description available')
      const imageUrl = project.image ? urlFor(project.image).width(800).height(600).fit('crop').url() : null
      const formattedDate = project.publishedAt ? new Date(project.publishedAt).toLocaleDateString(
        language === 'de' ? 'de-DE' : 'en-US'
      ) : ''
      
      return { title, description, imageUrl, formattedDate }
    } catch (error) {
      console.error('Error processing project data:', error)
      return { 
        title: 'Untitled Project', 
        description: 'No description available', 
        imageUrl: null, 
        formattedDate: '' 
      }
    }
  }, [project, language])

  if (loading) {
    return (
      <PageLayout className="project-detail-page">
        <LoadingSpinner size="large" className="h-64" />
      </PageLayout>
    )
  }

  if (error || !project) {
    return (
      <PageLayout className="project-detail-page">
        <Message
          variant="error"
          icon="⚠️"
          title={error === 'Project not found' ? 'Project Not Found' : 'Error Loading Project'}
          message={error || 'Unknown error'}
          actionLabel="← Back to Projects"
          onAction={() => router.push('/projects')}
          className="h-64"
        />
      </PageLayout>
    )
  }

  return (
    <PageLayout className="project-detail-page">
      <Button
        variant="secondary"
        size="medium"
        onClick={() => router.push('/projects')}
        className="back-button-top"
      >
        ← Back to Projects
      </Button>

      <div className="project-detail-grid">
        <div className="project-image-container">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-auto shadow-lg"
              loading="lazy"
            />
          )}
        </div>

        <div className="project-text-content">
          <h1 className="project-title">{title}</h1>
          
          <div className="project-description mb-4">
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
              {description}
            </p>
          </div>
          
          <div className="text-sm text-gray-500">{formattedDate}</div>
        </div>
      </div>
    </PageLayout>
  )
}
