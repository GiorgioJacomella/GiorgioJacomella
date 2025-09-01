'use client'

import React from 'react'
import { useApp } from '../../contexts/AppContext'
import { useProjects } from '../../hooks/useProjects'
import { ProjectCard } from '../../components/ProjectCard'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Message } from '../../components/ui/ErrorMessage'
import { PageLayout } from '../../components/PageLayout'

export default function ProjectsPage() {
  const { language } = useApp()
  const { projects, loading, error, refresh, projectCount } = useProjects()

  const messages = {
    errorLoading: language === 'de' ? 'Fehler beim Laden der Projekte' : 'Error Loading Projects',
    tryAgain: language === 'de' ? 'Erneut versuchen' : 'Try Again',
    noProjects: language === 'de' ? 'Noch keine Projekte veröffentlicht' : 'No projects published'
  }

  if (loading) {
    return (
      <PageLayout className="projects-page">
        <LoadingSpinner size="large" className="h-64" />
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout className="projects-page">
        <Message
          variant="error"
          icon="⚠️"
          title={messages.errorLoading}
          message={error}
          actionLabel={messages.tryAgain}
          onAction={refresh}
          className="h-64"
        />
      </PageLayout>
    )
  }

  return (
    <PageLayout className="projects-page">
      {projectCount === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {messages.noProjects}
          </p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </PageLayout>
  )
}
