'use client'

import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '../contexts/AppContext'
import { Project, urlFor, getLocalizedContent } from '../lib/sanity'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useApp()
  const router = useRouter()
  
  const { title, imageUrl } = useMemo(() => {
    const title = getLocalizedContent(project.title, language, 'Untitled Project')
    const imageUrl = project.image ? urlFor(project.image).width(400).height(300).fit('crop').url() : null
    return { title, imageUrl }
  }, [project.title, project.image, language])

  const handleClick = () => router.push(`/project/${project.slug.current}`)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div 
      className="project-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="relative">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 text-center">{title}</h3>
      </div>
    </div>
  )
}
