'use client'

import React, { useState } from 'react'
import { useLocale } from '../../hooks/useLocale'
import { FormInput } from './FormInput'

interface ContactFormProps {
  className?: string
}

export const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const locale = useLocale()
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const form = e.target as HTMLFormElement
      const formDataToSend = new FormData(form)
      
          const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
    if (!web3formsKey) throw new Error('Web3Forms API key not configured')
      
      formDataToSend.append('access_key', web3formsKey)
      
      const originalSubject = formDataToSend.get('subject') as string
      formDataToSend.set('subject', originalSubject?.trim() ? 
        `Portfolio Contact: ${originalSubject}` : 'Portfolio Contact: New Message')

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name.trim() && formData.email.trim() && 
                     formData.subject.trim() && formData.message.trim()

  return (
    <div className={`contact-form ${className}`}>
      {submitStatus === 'success' && (
        <div className="success-message">
          <p>{locale.contact.success.message}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="error-message">
          <p>{locale.contact.error.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <FormInput
          id="name"
          name="name"
          type="text"
          label={locale.contact.form.name}
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={locale.contact.form.namePlaceholder}
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label={locale.contact.form.email}
          value={formData.email}
          onChange={handleChange}
          required
          showRequired
          placeholder={locale.contact.form.emailPlaceholder}
        />

        <FormInput
          id="phone"
          name="phone"
          type="tel"
          label={locale.contact.form.phone}
          value={formData.phone}
          onChange={handleChange}
          showOptional
          optionalText={locale.contact.form.optional}
          placeholder={locale.contact.form.phonePlaceholder}
        />

        <FormInput
          id="subject"
          name="subject"
          type="text"
          label={locale.contact.form.subject}
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder={locale.contact.form.subjectPlaceholder}
        />

        <FormInput
          id="message"
          name="message"
          type="textarea"
          label={locale.contact.form.message}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder={locale.contact.form.messagePlaceholder}
        />

        <div className="form-actions">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="btn btn-primary btn-large submit-btn"
          >
            {isSubmitting ? locale.contact.form.sending : locale.contact.form.send}
          </button>
        </div>
      </form>
    </div>
  )
}
