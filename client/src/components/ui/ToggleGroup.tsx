'use client'

import React from 'react'

interface ToggleOption {
  value: string
  label: string
  icon?: string
}

interface ToggleGroupProps {
  options: ToggleOption[]
  value: string
  onChange: (value: string) => void
  className?: string
  size?: 'small' | 'medium'
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options,
  value,
  onChange,
  className = '',
  size = 'medium'
}) => {
  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2 text-base'
  }

  return (
    <div className={`toggle-group ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`toggle-btn ${sizeClasses[size]} ${value === option.value ? 'active' : ''}`}
          aria-label={option.icon ? 
            `Switch to ${option.value === 'light' ? 'dark' : 'light'} mode` :
            `Switch to ${option.value === 'en' ? 'German' : 'English'}`
          }
        >
          {option.icon ? (
            <span className="toggle-icon">{option.icon}</span>
          ) : (
            <span className="toggle-label">{option.label}</span>
          )}
        </button>
      ))}
    </div>
  )
}
