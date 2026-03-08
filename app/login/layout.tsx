import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Login Admin - DanaMasjid",
  description: "Masuk ke dashboard admin DanaMasjid untuk mengelola donasi masjid, laporan keuangan, dan program masjid Anda dengan transparan dan amanah.",
  keywords: ["login admin", "dashboard masjid", "admin danamasjid", "kelola donasi masjid"],
  openGraph: {
    title: "Login Admin - DanaMasjid",
    description: "Masuk ke dashboard admin DanaMasjid untuk mengelola donasi masjid Anda.",
    type: "website",
    url: "https://danamasjid.com/login",
  },
  alternates: {
    canonical: "https://danamasjid.com/login",
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data for Login Page */}
      <Script
        id="login-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Login Admin - DanaMasjid",
            "description": "Masuk ke dashboard admin DanaMasjid untuk mengelola donasi masjid Anda",
            "url": "https://danamasjid.com/login",
            "isPartOf": {
              "@type": "WebSite",
              "name": "DanaMasjid",
              "url": "https://danamasjid.com"
            }
          })
        }}
      />
      {children}
    </>
  )
}
