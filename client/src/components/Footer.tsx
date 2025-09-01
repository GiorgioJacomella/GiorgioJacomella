'use client'

import React from 'react'
import Link from 'next/link'
import { useApp } from '../contexts/AppContext'
import { useLocale } from '../hooks/useLocale'
import { navigationConfig } from '../config/navigation'

export const Footer = () => {
  const { language } = useApp()
  const locale = useLocale()

  const navItems = navigationConfig.items.map(item => ({
    ...item,
    label: locale.navigation[item.key as keyof typeof locale.navigation]
  }))

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">{locale.navigation.logo}</h3>
          <p className="footer-description">{locale.footer.description}</p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">{locale.footer.navigation}</h4>
          <nav className="footer-nav">
            {navItems.map(({ path, label }) => (
              <Link key={path} href={path} className="footer-link">{label}</Link>
            ))}
          </nav>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">{locale.footer.social}</h4>
          <div className="social-links">
            {navigationConfig.social.map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span className="social-name">{name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} {locale.navigation.logo}. {locale.footer.rights}
        </p>
      </div>
    </footer>
  )
}