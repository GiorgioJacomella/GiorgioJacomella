'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from '../contexts/AppContext'
import { useLocale } from '../hooks/useLocale'
import { ToggleGroup } from './ui/ToggleGroup'
import { navigationConfig } from '../config/navigation'

export const Navigation: React.FC = () => {
  const { theme, language, toggleTheme, setLanguage } = useApp()
  const locale = useLocale()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navItems = navigationConfig.items.map(item => ({
    ...item,
    label: locale.navigation[item.key as keyof typeof locale.navigation]
  }))

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const renderNavLinks = (items: typeof navItems, isMobile = false) => 
    items.map(({ path, label }) => (
      <Link
        key={path}
        href={path}
        className={`${isMobile ? 'mobile-nav-item' : ''} ${pathname === path ? 'active' : ''}`}
        onClick={isMobile ? closeMobileMenu : undefined}
      >
        {label}
      </Link>
    ))

  const renderToggleGroups = (size: 'small' | 'medium') => (
    <>
      <ToggleGroup
        options={navigationConfig.languageOptions}
        value={language}
        onChange={(value) => setLanguage(value as 'en' | 'de')}
        className={`${size === 'small' ? 'language-selector' : 'mobile-language-selector'}`}
        size={size}
      />
      <ToggleGroup
        options={navigationConfig.themeOptions}
        value={theme}
        onChange={() => toggleTheme()}
        className={`${size === 'small' ? 'theme-selector' : 'mobile-theme-selector'}`}
        size={size}
      />
    </>
  )

  const homeItem = { path: '/', label: locale.navigation.home, key: 'home' }

  return (
    <>
      <nav className="navigation">
        <div className="nav-content">
          <Link href="/" className={`nav-logo ${pathname === '/' ? 'active' : ''}`}>
            {locale.navigation.logo}
          </Link>
          
          <div className="nav-right">
            <div className="nav-links">
              {renderNavLinks(navItems)}
            </div>

            <div className="nav-controls">
              {renderToggleGroups('small')}
            </div>

            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
      
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h3>{locale.navigation.logo}</h3>
          <button onClick={closeMobileMenu} className="mobile-menu-close">✕</button>
        </div>
        
        <nav className="mobile-nav">
          {renderNavLinks([homeItem, ...navItems], true)}
        </nav>

        <div className="mobile-controls">
          {renderToggleGroups('medium')}
        </div>
      </div>
    </>
  )
}
