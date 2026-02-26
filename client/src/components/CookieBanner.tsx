'use client'

import { useLocalStorage } from '../hooks/useLocalStorage'
import { useApp } from '../contexts/AppContext'
import { useLocale } from '../hooks/useLocale'
import { Button } from './ui/Button'

type ConsentState = 'accepted' | 'rejected' | null

export function CookieBanner() {
  const { isHydrated } = useApp()
  const locale = useLocale()
  const [consent, setConsent] = useLocalStorage<ConsentState>('cookie-consent', null)

  if (!isHydrated || consent === 'accepted' || consent === 'rejected') return null

  const t = locale.cookieBanner

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-content">
        <div className="cookie-banner-text">
          <h2 className="cookie-banner-title">{t.title}</h2>
          <p className="cookie-banner-description">{t.description}</p>
        </div>
        <div className="cookie-banner-actions">
          <Button size="small" className="cookie-banner-button secondary" onClick={() => setConsent('rejected')}>
            {t.onlyNecessary}
          </Button>
          <Button size="small" className="cookie-banner-button primary" onClick={() => setConsent('accepted')}>
            {t.acceptAll}
          </Button>
        </div>
      </div>
    </div>
  )
}

