import type { Metadata } from 'next'
import { AppProvider } from '../contexts/AppContext'
import { Layout } from '../components/Layout'
import '../index.css'

export const metadata: Metadata = {
  title: 'Portfolio - Giorgio Jacomella',
  description: 'Personal portfolio website showcasing projects and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
