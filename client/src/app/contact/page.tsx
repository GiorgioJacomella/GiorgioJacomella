'use client'

import React from 'react'
import { ContactForm } from '../../components/ui/ContactForm'
import { PageLayout } from '../../components/PageLayout'

export default function ContactPage() {
  return (
    <PageLayout className="contact-page">
      <ContactForm />
    </PageLayout>
  )
}
