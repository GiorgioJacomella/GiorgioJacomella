'use client'

import React from 'react'

interface FormInputProps {
  id: string
  name: string
  type: 'text' | 'email' | 'tel' | 'textarea'
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
  rows?: number
  showRequired?: boolean
  showOptional?: boolean
  optionalText?: string
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 6,
  showRequired = false,
  showOptional = false,
  optionalText = 'optional'
}) => {
  const InputComponent = type === 'textarea' ? 'textarea' : 'input'
  const inputProps = type === 'textarea' 
    ? { rows, className: 'form-textarea' }
    : { type, className: 'form-input' }

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
        {showRequired && <span className="required">*</span>}
        {showOptional && <span className="optional">({optionalText})</span>}
      </label>
      <InputComponent
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        {...inputProps}
      />
    </div>
  )
}
