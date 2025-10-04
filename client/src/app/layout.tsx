import type { Metadata } from 'next'
import { AppProvider } from '../contexts/AppContext'
import { Layout } from '../components/Layout'
import '../index.css'

export const metadata: Metadata = {
  title: 'Portfolio - Giorgio Jacomella | Web Developer & Designer',
  description: 'Personal portfolio of Giorgio Jacomella - Web Developer and Designer specializing in TypeScript, React, and modern web design solutions in both English and German.',
  keywords: 'website developer, web designer, TypeScript developer, React developer, frontend developer, web development, web design, JavaScript, Giorgio Jacomella',
  authors: [{ name: 'Giorgio Jacomella' }],
  category: 'portfolio',
  robots: 'index, follow, max-image-preview:large',
  openGraph: {
    title: 'Giorgio Jacomella - Web Developer & Designer',
    description: 'Professional portfolio showcasing web development and design work with TypeScript, React and modern technologies',
    url: 'https://giorgio.jacomella.dev',
    siteName: 'Giorgio Jacomella Portfolio',
    locale: 'en_US',
    alternateLocale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giorgio Jacomella - Web Developer & Designer',
    description: 'Portfolio showcasing web development and design expertise in TypeScript, React and modern technologies',
  },
  alternates: {
    canonical: 'https://giorgio.jacomella.dev',
    languages: {
      'en': 'https://giorgio.jacomella.dev/en',
      'de': 'https://giorgio.jacomella.dev/de',
    },
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
    'description': 'Web Developer and Designer specializing in TypeScript, React, and modern web solutions',
    'jobTitle': 'Web Developer & Designer',
    'knowsLanguage': [
      { '@type': 'Language', 'name': 'English' },
      { '@type': 'Language', 'name': 'German' }
    ],
    'email': 'giorgio@jacomella.dev',
    'url': 'https://giorgio.jacomella.dev',
    'sameAs': [
      'https://www.linkedin.com/in/giorgio-jacomella-095062231/',
      'https://github.com/GiorgioJacomella'
    ],
    'hasOccupation': {
      '@type': 'Occupation',
      'name': 'Web Developer',
      'occupationalCategory': 'Web Developer & Designer',
      'skills': 'TypeScript, React, JavaScript, Web Design, Frontend Development'
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
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://giorgio.jacomella.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <AppProvider>
          <Layout>
            {children}
          </Layout>
        </AppProvider>
      </body>
    </html>
  )
}
