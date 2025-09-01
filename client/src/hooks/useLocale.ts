import { useApp } from '../contexts/AppContext'
import enLocale from '../locales/en.json'
import deLocale from '../locales/de.json'

export function useLocale() {
  try {
    const { language, isHydrated } = useApp()
    // Always return English until hydrated to prevent mismatch
    if (!isHydrated) return enLocale
    return language === 'en' ? enLocale : deLocale
  } catch (error) {
    console.error('Error in useLocale:', error)
    return enLocale // fallback to English
  }
}
