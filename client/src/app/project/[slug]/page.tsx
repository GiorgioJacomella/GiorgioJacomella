import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client, Project, urlFor, getLocalizedContent } from '../../../lib/sanity'
import { Button } from '../../../components/ui/Button'
import { PageLayout } from '../../../components/PageLayout'

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

  const title = getLocalizedContent(project.title, 'en', 'Untitled Project')
  const description = getLocalizedContent(project.description, 'en', 'No description available')
  const imageUrl = project.image ? urlFor(project.image).width(800).height(600).fit('crop').url() : null
  const formattedDate = project.publishedAt ? new Date(project.publishedAt).toLocaleDateString('en-US') : ''

  return (
    <PageLayout className="project-detail-page">
      <Button variant="secondary" size="medium" href="/projects" className="back-button-top">
        ← Back to Projects
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
          <div className="text-sm text-gray-500">{formattedDate}</div>
        </div>
      </div>
    </PageLayout>
  )
}
