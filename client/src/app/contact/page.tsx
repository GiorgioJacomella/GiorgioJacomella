'use client'

import React from 'react'
import { ContactForm } from '../../components/ui/ContactForm'
import { PageLayout } from '../../components/PageLayout'
import { useLocale } from '../../hooks/useLocale'

export default function ContactPage() {
  const locale = useLocale()
  return (
    <PageLayout className="contact-page">
      <h1 className="page-title">{locale.navigation.contact}</h1>
      <ContactForm />
    </PageLayout>
  )
}
