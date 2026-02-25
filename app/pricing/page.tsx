"use client"

import { Footer } from "@/components/layout"
import { Pricing } from "@/components/cards"
import { Header } from "@/components/layout"
import { HeroSection2 } from "@/components/sections"
import { PricingInfoSection } from "@/components/sections"
import { motion } from "framer-motion"

const pricingPlans = [
  {
    name: "Basic",
    price: "0",
    yearlyPrice: "0",
    period: "selamanya",
    features: [
      "Maksimal 100 donatur",
      "Laporan donasi bulanan",
      "1 admin masjid",
      "Notifikasi email",
      "Dashboard sederhana",
      "Support via email",
    ],
    description: "Cocok untuk masjid kecil yang baru memulai",
    buttonText: "Mulai Gratis",
    href: "/register",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "99",
    yearlyPrice: "990",
    period: "bulan",
    features: [
      "Donatur unlimited",
      "Laporan real-time",
      "5 admin masjid",
      "Notifikasi WhatsApp & Email",
      "Dashboard analytics lengkap",
      "Program donasi custom",
      "QR Code donasi",
      "Priority support 24/7",
      "Export data Excel/PDF",
    ],
    description: "Untuk masjid yang ingin berkembang lebih cepat",
    buttonText: "Pilih Pro",
    href: "/register?plan=pro",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    yearlyPrice: "Custom",
    period: "tahun",
    features: [
      "Semua fitur Pro",
      "Multi-masjid management",
      "Admin unlimited",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "Training & onboarding",
      "Custom integration",
      "SLA guarantee",
    ],
    description: "Solusi lengkap untuk organisasi besar",
    buttonText: "Hubungi Sales",
    href: "/contact",
    isPopular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Spacing for fixed header */}
      <div className="h-24" />

      {/* Hero Section */}
      <HeroSection2
        title={
          <>
            Harga yang <span className="relative inline-block">
              <span className="relative z-10 text-white px-2">Transparan</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-400 -z-0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </span> untuk Semua
          </>
        }
        subtitle="Pilih paket yang sesuai dengan kebutuhan masjid Anda. Semua paket sudah termasuk fitur keamanan dan transparansi penuh."
        callToAction={{
          text: "LIHAT PAKET →",
          href: "#pricing",
        }}
        backgroundImage="/images/hero/sky.webp"
        rightImage="/images/harga/heroo.webp"
        contactInfo={{
          website: "",
          phone: "",
          address: "",
        }}
      />

      {/* Info Section */}
      <PricingInfoSection />

      {/* Pricing Component */}
      <div id="pricing" className="max-w-6xl mx-auto mb-88">
        <Pricing 
          plans={pricingPlans}
          title="Pilih Paket yang Tepat"
          description="Mulai gratis atau upgrade untuk fitur lebih lengkap
Semua paket dapat diupgrade atau downgrade kapan saja"
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
