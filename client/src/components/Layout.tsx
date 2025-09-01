'use client'

import React from 'react'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="layout">
    <Navigation />
    <main className="main-content">{children}</main>
    <Footer />
  </div>
)
