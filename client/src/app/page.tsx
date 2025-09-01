'use client'

import React from 'react'
import { useLocale } from '../hooks/useLocale'
import { Button } from '../components/ui/Button'

export default function HomePage() {
  const locale = useLocale()
  
  return (
    <section className="home-page">
      <div className="home-content">
        <h1 className="home-title">
          {locale.home.title}
        </h1>
        <div className="home-buttons">
          <Button to="/contact" variant="primary" size="large" className="home-btn primary-btn">
            {locale.home.primaryButton}
          </Button>
          <div className="secondary-buttons">
            <Button to="/about" variant="secondary" size="medium" className="home-btn secondary-btn">
              {locale.home.secondaryButtons.about}
            </Button>
            <Button to="/projects" variant="secondary" size="medium" className="home-btn secondary-btn">
              {locale.home.secondaryButtons.projects}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
