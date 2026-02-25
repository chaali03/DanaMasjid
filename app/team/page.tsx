"use client"

import { Footer } from "@/components/layout"
import { Header } from "@/components/layout"
import { HeroSection2 } from "@/components/sections"
import { TeamInfoSection } from "@/components/sections"
import { TeamMembersSection } from "@/components/sections"
import { motion } from "framer-motion"

export default function TeamPage() {
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
            Kenali <span className="text-primary">Tim</span> <span className="relative inline-block">
              <span className="relative z-10 text-white px-2">HidupTebe</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 -z-0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </>
        }
        subtitle="Bersama membangun platform donasi masjid yang transparan, amanah, dan terpercaya untuk kemakmuran masjid di seluruh Indonesia."
        callToAction={{
          text: "LIHAT TIM →",
          href: "#team",
        }}
        backgroundImage="/images/hero/sky2.webp"
        rightImage="/images/tim/heroo.webp"
        contactInfo={{
          website: "",
          phone: "",
          address: "",
        }}
      />

      {/* Team Info Section */}
      <TeamInfoSection />

      {/* Team Members Section */}
      <TeamMembersSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
