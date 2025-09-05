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
    `*[_type == "project" && slug.current == $slug][0] { title, description, image }`,
    { slug }
  )

  if (!project) return { title: 'Project Not Found - Giorgio Jacomella' }

  const title = getLocalizedContent(project.title, 'en', 'Untitled Project')
  const description = getLocalizedContent(project.description, 'en', 'No description available')
  const imageUrl = project.image ? urlFor(project.image).width(1200).height(630).fit('crop').url() : null

  return {
    title: `${title} - Giorgio Jacomella`,
    description,
    openGraph: { title: `${title} - Giorgio Jacomella`, description, images: imageUrl ? [{ url: imageUrl }] : [] },
    twitter: { card: 'summary_large_image', title: `${title} - Giorgio Jacomella`, description, images: imageUrl ? [imageUrl] : [] },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await client.fetch<Project>(
    `*[_type == "project" && slug.current == $slug][0] { title, description, image, publishedAt }`,
    { slug }
  )

  if (!project) notFound()

  return <ProjectPageClient project={project} />
}
