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
    `*[_type == "project" && slug.current == $slug][0] { title, description, seoDescription, image, externalLink }`,
    { slug }
  )

  if (!project) return { title: 'Project Not Found - Giorgio Jacomella' }

  const title = getLocalizedContent(project.title, 'en', 'Untitled Project')
  const baseDesc = getLocalizedContent(project.description, 'en', 'No description available')
  const description = project.seoDescription
    ? getLocalizedContent(project.seoDescription as { en: string; de: string }, 'en', baseDesc)
    : baseDesc
  const imageUrl = project.image ? urlFor(project.image).width(1200).height(630).fit('crop').url() : null
  const metaTitle = `${title} - Web Development Project | Giorgio Jacomella`

  return {
    title: metaTitle,
    description,
    keywords: `${title}, web development, web design, TypeScript, React, Giorgio Jacomella, portfolio project`,
    openGraph: { title: metaTitle, description, images: imageUrl ? [{ url: imageUrl }] : [], url: `https://giorgio.jacomella.dev/project/${slug}` },
    twitter: { card: 'summary_large_image', title: metaTitle, description, images: imageUrl ? [imageUrl] : [] },
    alternates: { canonical: `https://giorgio.jacomella.dev/project/${slug}` },
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
