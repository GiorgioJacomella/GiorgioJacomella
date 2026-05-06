import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AppProvider } from '../contexts/AppContext'
import { Layout } from '../components/Layout'
import { Analytics } from '../components/Analytics'
import { CookieBanner } from '../components/CookieBanner'
import '../index.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://giorgio.jacomella.dev'),
  title: 'Giorgio Jacomella — React, TypeScript & JavaScript web development',
  description:
    'Web developer and designer building interfaces and products with React, TypeScript, and JavaScript. Portfolio, background, and selected work. English or German.',
  keywords:
    'Giorgio Jacomella, web developer, React developer, TypeScript developer, JavaScript, frontend development, web design, portfolio',
  authors: [{ name: 'Giorgio Jacomella' }],
  category: 'portfolio',
  robots: 'index, follow, max-image-preview:large',
  openGraph: {
    title: 'Giorgio Jacomella — React & TypeScript web developer',
    description:
      'Web development and design with React, TypeScript, and JavaScript—project work, background, and contact.',
    url: 'https://giorgio.jacomella.dev/',
    siteName: 'Giorgio Jacomella',
    locale: 'en_US',
    alternateLocale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giorgio Jacomella — React & TypeScript web developer',
    description:
      'Experienced in React, TypeScript, and JavaScript: portfolio, selected projects, and ways to get in touch.',
  },
  alternates: {
    canonical: 'https://giorgio.jacomella.dev/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['Person', 'ProfessionalService'],
    '@id': 'https://giorgio.jacomella.dev/#person',
    'name': 'Giorgio Jacomella',
    'description': 'Web developer and designer focused on React, TypeScript, JavaScript, and modern web products',
    'jobTitle': 'Web Developer & Designer',
    'knowsLanguage': [
      { '@type': 'Language', 'name': 'English' },
      { '@type': 'Language', 'name': 'German' }
    ],
    'email': 'giorgio@jacomella.dev',
    'url': 'https://giorgio.jacomella.dev/',
    'sameAs': [
      'https://www.linkedin.com/in/giorgio-jacomella-095062231/',
      'https://github.com/GiorgioJacomella'
    ],
    'hasOccupation': {
      '@type': 'Occupation',
      'name': 'Web Developer',
      'occupationalCategory': 'Web Developer & Designer',
      'skills': 'TypeScript, JavaScript, React, web design, frontend development'
    },
    'workLocation': {
      '@type': 'Country',
      'name': 'Switzerland'
    },
    'serviceType': 'Web Development and Design Services',
    'areaServed': 'Worldwide',
    'availableLanguage': ['English', 'German']
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <AppProvider>
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <Layout>
            {children}
          </Layout>
          <CookieBanner />
        </AppProvider>
      </body>
    </html>
  )
}
