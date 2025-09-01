'use client'

import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  to?: string
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  external?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  to,
  href,
  onClick,
  children,
  className = '',
  external = false
}) => {
  const sizeClasses = { small: 'btn-small', medium: 'btn-medium', large: 'btn-large' }
  const classes = `btn ${sizeClasses[size]} ${className}`.trim()

  if (to) return <Link href={to} className={classes}>{children}</Link>
  if (href) return external ? 
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a> :
    <a href={href} className={classes}>{children}</a>

  return <button onClick={onClick || undefined} className={classes}>{children}</button>
}
