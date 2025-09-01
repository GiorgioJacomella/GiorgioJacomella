'use client'

import React from 'react'

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = '', 
  contentClassName = '' 
}) => (
  <section className={`page-section ${className}`}>
    <div className={`page-content ${contentClassName}`}>
      {children}
    </div>
  </section>
)
