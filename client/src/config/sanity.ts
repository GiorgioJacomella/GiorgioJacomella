// Sanity configuration. Add your studio URL to Sanity CORS origins in the dashboard.
const projectId = '5uxgduir'
const dataset = 'production'
const apiVersion = '2024-01-01'

const devOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8080']
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://giorgio.jacomella.dev'

export const SANITY_CONFIG = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  apiUrl: `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  get allowedOrigins() {
    return process.env.NODE_ENV === 'development' ? devOrigins : [siteUrl, ...devOrigins]
  },
} as const

export const getSanityConfig = () => {
  const isDev = process.env.NODE_ENV === 'development'
  return {
    ...SANITY_CONFIG,
    useCdn: !isDev,
    studioUrl: isDev ? 'http://localhost:3333' : `https://${projectId}.sanity.studio`,
  }
}
