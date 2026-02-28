"use client"

import { Footer } from "@/components/layout"
import { Header } from "@/components/layout"
import { DonationHeroSection } from "@/components/sections/donation-hero-section"
import { DonationCategoriesSection } from "@/components/sections"

export default function DonasiPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="h-24" />
      
      <DonationHeroSection />
      
      {/* Donation Categories with Charts */}
      <DonationCategoriesSection />
      
      <Footer />
    </div>
  )
}
