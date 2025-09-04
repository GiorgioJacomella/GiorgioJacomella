import { Metadata } from 'next'
import { client, Project, urlFor, getLocalizedContent } from '../../../lib/sanity'
import { ProjectDetailContent } from './ProjectDetailContent'

export const runtime = 'edge'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const project = await client.fetch<Project>(
      `*[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        description,
        image,
        publishedAt,
        slug
      }`,
      { slug }
    )

    if (!project) {
      return {
        title: 'Project Not Found - Giorgio Jacomella',
        description: 'The requested project could not be found.',
      }
    }

    const title = getLocalizedContent(project.title, 'en', 'Untitled Project')
    const description = getLocalizedContent(project.description, 'en', 'No description available')
    const imageUrl = project.image ? urlFor(project.image).width(1200).height(630).fit('crop').url() : null

    return {
      title: `${title} - Giorgio Jacomella`,
      description: description,
      openGraph: {
        title: `${title} - Giorgio Jacomella`,
        description: description,
        images: imageUrl ? [{ url: imageUrl }] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} - Giorgio Jacomella`,
        description: description,
        images: imageUrl ? [imageUrl] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Project - Giorgio Jacomella',
      description: 'Project details page.',
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  return <ProjectDetailContent slug={slug} />
}
