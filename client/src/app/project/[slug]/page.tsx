import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client, Project, urlFor, getLocalizedContent } from '../../../lib/sanity'
import { ProjectPageClient } from './ProjectPageClient'

export const dynamic = 'force-static'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "project" && defined(slug.current)] { "slug": slug.current }`
  )
  return projects.map(project => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await client.fetch<Project>(
    `*[_type == "project" && slug.current == $slug][0] { title, description, image, externalLink }`,
    { slug }
  )

  if (!project) return { title: 'Project Not Found - Giorgio Jacomella' }

  const title = getLocalizedContent(project.title, 'en', 'Untitled Project')
  const description = getLocalizedContent(project.description, 'en', 'No description available')
  const imageUrl = project.image ? urlFor(project.image).width(1200).height(630).fit('crop').url() : null
  
  const keywords = `${title}, web development, web design, TypeScript, React, Giorgio Jacomella, portfolio project`

  return {
    title: `${title} - Web Development Project | Giorgio Jacomella`,
    description,
    keywords,
    openGraph: { 
      title: `${title} - Web Development Project | Giorgio Jacomella`, 
      description, 
      images: imageUrl ? [{ url: imageUrl }] : [],
      url: `https://giorgio.jacomella.dev/project/${slug}`,
    },
    twitter: { 
      card: 'summary_large_image', 
      title: `${title} - Web Development Project | Giorgio Jacomella`, 
      description, 
      images: imageUrl ? [imageUrl] : [] 
    },
    alternates: {
      canonical: `https://giorgio.jacomella.dev/project/${slug}`,
      languages: {
        'en': `https://giorgio.jacomella.dev/en/project/${slug}`,
        'de': `https://giorgio.jacomella.dev/de/project/${slug}`,
      },
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await client.fetch<Project>(
    `*[_type == "project" && slug.current == $slug][0] { 
      _id,
      title,
      description,
      image,
      publishedAt,
      slug,
      "hasExternalLink": defined(externalLink),
      externalLink 
    }`,
    { slug }
  )

  if (!project) notFound()

  return <ProjectPageClient project={project} />
}
