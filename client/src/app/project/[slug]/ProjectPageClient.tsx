'use client'

import React from 'react'
import { useApp } from '../../../contexts/AppContext'
import { Project, urlFor, getLocalizedContent } from '../../../lib/sanity'
import { Button } from '../../../components/ui/Button'
import { PageLayout } from '../../../components/PageLayout'

interface ProjectPageClientProps {
  project: Project
}

export function ProjectPageClient({ project }: ProjectPageClientProps) {
  const { language } = useApp()
  
  const title = getLocalizedContent(project.title, language, 'Untitled Project')
  const description = getLocalizedContent(project.description, language, 'No description available')
  const imageUrl = project.image ? urlFor(project.image).width(800).height(600).fit('crop').url() : null
  const formattedDate = project.publishedAt ? new Date(project.publishedAt).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US') : ''
  const backButtonText = language === 'de' ? '← Zurück zu Projekten' : '← Back to Projects'
  const defaultButtonText = language === 'de' ? 'Projekt besuchen' : 'Visit Project'
  
  let externalLinkText = defaultButtonText;
  if (project.hasExternalLink && project.externalLink && project.externalLink.text) {
    try {
      externalLinkText = getLocalizedContent(project.externalLink.text, language, defaultButtonText);
    } catch (error) {
      console.error('Error getting localized external link text:', error);
    }
  }

  return (
    <PageLayout className="project-detail-page">
      <Button variant="secondary" size="medium" href="/projects" className="back-button-top">
        {backButtonText}
      </Button>

      <div className="project-detail-grid">
        <div className="project-image-container">
          {imageUrl && <img src={imageUrl} alt={title} className="w-full h-auto shadow-lg" loading="lazy" />}
        </div>
        <div className="project-text-content">
          <h1 className="project-title">{title}</h1>
          <div className="project-description mb-4">
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{description}</p>
          </div>
          <div className="text-sm text-gray-500 mb-4">{formattedDate}</div>
          
          {project.hasExternalLink !== false && project.externalLink && project.externalLink.url && (
            <div className="mt-4">
              <Button 
                variant="primary" 
                size="medium" 
                href={project.externalLink.url} 
                external={true}
              >
                {externalLinkText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
