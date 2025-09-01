// Sanity Configuration
export const SANITY_CONFIG = {
  projectId: '5uxgduir',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  studioUrl: 'http://localhost:3333/studio',
  apiUrl: `https://5uxgduir.api.sanity.io/v2024-01-01/data/query/production`,
  allowedOrigins: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8080'
  ]
} as const

export const getSanityConfig = () => {
  const isDevelopment = (import.meta as any).env?.DEV || process.env.NODE_ENV === 'development'
  
  return {
    ...SANITY_CONFIG,
    useCdn: !isDevelopment,
    studioUrl: isDevelopment ? SANITY_CONFIG.studioUrl : `https://${SANITY_CONFIG.projectId}.sanity.studio`
  }
}
