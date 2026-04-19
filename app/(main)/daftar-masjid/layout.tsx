'use client'

import Script from "next/script"

export default function DaftarMasjidLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Structured Data for Registration Page */}
      <Script
        id="registration-page-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Pendaftaran Masjid - DanaMasjid",
            "description": "Daftarkan masjid Anda di platform DanaMasjid untuk mengelola donasi dengan transparan",
            "url": "https://danamasjid.com/daftar-masjid",
            "isPartOf": {
              "@type": "WebSite",
              "name": "DanaMasjid",
              "url": "https://danamasjid.com"
            }
          })
        }}
      />
      {children}
    </div>
  )
}
