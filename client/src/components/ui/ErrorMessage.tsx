'use client'

import React from 'react'
import { Button } from './Button'

interface MessageProps {
  variant?: 'error' | 'success' | 'info'
  icon: string
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export const Message: React.FC<MessageProps> = ({
  variant = 'info',
  icon,
  title,
  message,
  actionLabel,
  onAction,
  className = ''
}) => {
  // Ensure all required props are strings
  const safeIcon = String(icon || '')
  const safeTitle = String(title || '')
  const safeMessage = String(message || '')
  const safeActionLabel = actionLabel ? String(actionLabel) : ''
  
  const variantStyles = {
    error: 'bg-red-50 border-red-200 text-red-600',
    success: 'bg-green-50 border-green-200 text-green-600',
    info: 'bg-gray-50 border-gray-200 text-gray-600'
  }

  const variantColors = {
    error: 'text-red-800 border-red-300 bg-white hover:bg-red-50',
    success: 'text-green-800 border-green-300 bg-white hover:bg-green-50',
    info: 'text-gray-800 border-gray-300 bg-white hover:bg-gray-50'
  }

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className={`border rounded-lg p-6 max-w-md mx-auto ${variantStyles[variant]}`}>
        <div className="text-6xl mb-4">{safeIcon}</div>
        <h3 className="text-lg font-medium mb-2">{safeTitle}</h3>
        <p className="text-sm mb-4">{safeMessage}</p>
        {safeActionLabel && onAction && (
          <Button
            onClick={onAction}
            variant="secondary"
            size="medium"
            className={`border ${variantColors[variant]}`}
          >
            {safeActionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
