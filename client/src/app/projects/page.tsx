'use client'

import React from 'react'
import { useApp } from '../../contexts/AppContext'
import { useProjects } from '../../hooks/useProjects'
import { ProjectCard } from '../../components/ProjectCard'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Message } from '../../components/ui/ErrorMessage'
import { PageLayout } from '../../components/PageLayout'
import { useLocale } from '../../hooks/useLocale'

export default function ProjectsPage() {
  const { language } = useApp()
  const { projects, loading, error, refresh, projectCount } = useProjects()
  const locale = useLocale()

  const messages = {
    errorLoading: language === 'de' ? 'Fehler beim Laden der Projekte' : 'Error Loading Projects',
    tryAgain: language === 'de' ? 'Erneut versuchen' : 'Try Again',
    noProjects: language === 'de' ? 'Noch keine Projekte veröffentlicht' : 'No projects published'
  }

  return (
    <PageLayout className="projects-page">
      <h1 className="page-title">{locale.navigation.projects}</h1>
      {loading && <LoadingSpinner size="large" className="h-64" />}
      {!loading && error && (
        <Message
          variant="error"
          icon="⚠️"
          title={messages.errorLoading}
          message={error}
          actionLabel={messages.tryAgain}
          onAction={refresh}
          className="h-64"
        />
      )}
      {!loading && !error && projectCount === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">{messages.noProjects}</p>
        </div>
      )}
      {!loading && !error && projectCount > 0 && (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </PageLayout>
  )
}
