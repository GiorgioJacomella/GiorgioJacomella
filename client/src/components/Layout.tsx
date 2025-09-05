'use client'

import React, { useEffect } from 'react'
import { useApp } from '../contexts/AppContext'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, isHydrated } = useApp()

  useEffect(() => {
    if (!isHydrated) return
    document.documentElement.lang = language
  }, [language, isHydrated])

  return (
    <div className="layout">
      <Navigation />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  )
}
