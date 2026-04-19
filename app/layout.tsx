import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { CookieConsentBanner } from "@/components/cookie-consent"
import { QueryProvider, RecaptchaProvider, SecurityProvider } from "@/components/providers"
import { AuthProvider } from "@/lib/auth-context"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { ScrollRestoration } from "@/components/scroll-restoration"
import { SuppressExtensionErrors } from "@/components/suppress-extension-errors"
import "./globals.css"
import { PageLoadingTransition } from "@/components/ui/page-loading-transition"
import { LottieLoading } from "@/components/ui/lottie-loading"

export const metadata: Metadata = {
  title: "PARANTARA: Platform Transparansi Berbasis Blockchain untuk Dana Masjid dan Rantai Pasokan Nusantara",
  description: "PARANTARA menghadirkan solusi transparansi berbasis blockchain untuk pengelolaan dana masjid dan supply chain bantuan di Indonesia. Lacak donasi, zakat, infaq, dan sedekah secara real-time dengan teknologi yang aman dan tidak dapat dimanipulasi.",
  keywords: ["blockchain", "transparansi", "dana masjid", "supply chain", "zakat", "infaq", "sedekah", "masjid", "donasi online", "transparansi donasi", "rantai pasokan", "blockchain indonesia"],
  authors: [{ name: "PARANTARA" }],
  creator: "PARANTARA",
  publisher: "PARANTARA",
  generator: 'byHidupTebe',
  manifest: '/favicon_io/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://danamasjid.com',
    title: 'PARANTARA: Platform Transparansi Berbasis Blockchain untuk Dana Masjid dan Rantai Pasokan Nusantara',
    description: 'PARANTARA menghadirkan solusi transparansi berbasis blockchain untuk pengelolaan dana masjid dan supply chain bantuan di Indonesia. Lacak donasi secara real-time dengan teknologi yang aman.',
    siteName: 'PARANTARA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PARANTARA: Platform Transparansi Berbasis Blockchain untuk Dana Masjid dan Rantai Pasokan Nusantara',
    description: 'PARANTARA menghadirkan solusi transparansi berbasis blockchain untuk pengelolaan dana masjid dan supply chain bantuan di Indonesia.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_io/favicon.ico' },
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/favicon_io/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon_io/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  metadataBase: new URL('https://danamasjid.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Viewport - required to avoid 300ms tap delay on mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Inline CSS for instant loading screen - prevents flash of content */}
        <style suppressHydrationWarning dangerouslySetInnerHTML={{__html: `
          #initial-loader-overlay {
            position: fixed;
            inset: 0;
            z-index: 99999;
            background: linear-gradient(to bottom right, #eff6ff, #ffffff, #fefce8);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          body.loading-active {
            overflow: hidden !important;
          }
          .loading-text-fixed {
            font-family: system-ui, -apple-system, sans-serif;
          }
        `}} />

        {/* Console ASCII art */}
        <Script src="/console-art.js" strategy="afterInteractive" id="console-art" />

        {/* Preload critical assets - only assets that are actually used immediately */}
        <link rel="preload" href="/images/loading/mosque.webp" as="image" type="image/webp" />
        <link rel="preload" href="/lotie-loading.json" as="fetch" type="application/json" crossOrigin="anonymous" />
        <link rel="preload" href="/font/arabic-ramadan/ArabicRamadan.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://apis.google.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for other origins */}
        <link rel="dns-prefetch" href="https://danamasjid.firebaseapp.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        
        {/* Meta Description */}
        <meta name="description" content="PARANTARA menghadirkan solusi transparansi berbasis blockchain untuk pengelolaan dana masjid dan supply chain bantuan di Indonesia. Lacak donasi, zakat, infaq, dan sedekah secara real-time dengan teknologi yang aman dan tidak dapat dimanipulasi." />
      </head>
      <body className={`font-sans antialiased loading-active`} suppressHydrationWarning>
        <ScrollRestoration />
        {/* Defer all structured data to after interactive */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PARANTARA",
              "url": "https://danamasjid.com",
              "logo": "https://danamasjid.com/favicon_io/android-chrome-512x512.png",
              "description": "Platform transparansi berbasis blockchain untuk pengelolaan dana masjid dan supply chain bantuan di Indonesia",
              "sameAs": [
                "https://www.facebook.com/danamasjid",
                "https://www.instagram.com/danamasjid",
                "https://twitter.com/danamasjid"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "email": "info@danamasjid.com"
              }
            })
          }}
        />
        
        {/* Structured Data for WebSite */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "PARANTARA",
              "url": "https://danamasjid.com",
              "description": "PARANTARA menghadirkan solusi transparansi berbasis blockchain untuk pengelolaan dana masjid dan supply chain bantuan di Indonesia. Lacak donasi, zakat, infaq, dan sedekah secara real-time dengan teknologi yang aman dan tidak dapat dimanipulasi.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://danamasjid.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* Service Worker Registration */}
        <Script
          id="sw-registration"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `
          }}
        />
        
        <SuppressExtensionErrors />
        <LottieLoading initialLoad />
        <ScrollProgress />
        <PageLoadingTransition />
        <SecurityProvider>
          <QueryProvider>
            <RecaptchaProvider>
              <AuthProvider>
                {children}
                <CookieConsentBanner />
                {/* <BackToTop /> - Temporarily disabled to fix hydration issues */}
              </AuthProvider>
            </RecaptchaProvider>
          </QueryProvider>
        </SecurityProvider>
      </body>
    </html>
  )
}