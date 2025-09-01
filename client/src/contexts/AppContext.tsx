'use client'

import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

type Theme = 'light' | 'dark'
type Language = 'en' | 'de'

interface AppContextType {
  theme: Theme
  language: Language
  isHydrated: boolean
  toggleTheme: () => void
  setLanguage: (lang: Language) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within an AppProvider')
  return context
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )
  const [language, setLanguage] = useState<Language>('en')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const root = document.documentElement
    const body = document.body
    
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark')
      body.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
      body.removeAttribute('data-theme')
    }
  }, [theme])

  useEffect(() => {
    if (typeof window === 'undefined') return
    document.documentElement.lang = language
  }, [language])

  // Handle hydration and language loading
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    setIsHydrated(true)
    
    // Load language from localStorage or auto-detect
    try {
      const storedLanguage = localStorage.getItem('language')
      if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'de')) {
        setLanguage(storedLanguage as Language)
      } else if (navigator.language.startsWith('de')) {
        setLanguage('de')
      }
    } catch (error) {
      console.error('Error loading language preference:', error)
    }
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    if (!isHydrated) return
    
    try {
      localStorage.setItem('language', language)
    } catch (error) {
      console.error('Error saving language preference:', error)
    }
  }, [language, isHydrated])

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  return (
    <AppContext.Provider value={{ theme, language, isHydrated, toggleTheme, setLanguage }}>
      {children}
    </AppContext.Provider>
  )
}
