'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { GA_MEASUREMENT_ID, pageview } from '../lib/gtag'

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [consent] = useLocalStorage<'accepted' | 'rejected' | null>('cookie-consent', null)
  const hasConsent = consent === 'accepted'

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !hasConsent) return
    const qs = searchParams?.toString()
    pageview(qs ? `${pathname}?${qs}` : pathname)
  }, [pathname, searchParams, hasConsent])

  if (!GA_MEASUREMENT_ID || !hasConsent) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{page_path:window.location.pathname});`}
      </Script>
    </>
  )
}
