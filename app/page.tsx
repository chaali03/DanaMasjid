"use client";

import { Header } from "@/components/layout"
import { HeroSection } from "@/components/sections"
import { StatsSection } from "@/components/sections"
import { ServicesSection } from "@/components/sections"
import { Marquee } from "@/components/client-wrappers"
import dynamic from "next/dynamic"
import { Suspense } from "react"

// Lazy load non-critical sections - removed ssr: false since we're now in a client component
const FeaturesSection = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})

const DonationProgramsSection = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.DonationProgramsSection })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})

const ScrollingAnimation = dynamic(() => import("@/components/client-wrappers").then(mod => ({ default: mod.ScrollingAnimation })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})

const TestimonialsSection = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})

const FAQSection = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.FAQSection })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})

const CTASection = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="h-32 bg-gray-50 animate-pulse" />
})

const Footer = dynamic(() => import("@/components/layout").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-64 bg-gray-900 animate-pulse" />
})

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      
      {/* Lazy loaded sections */}
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <FeaturesSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-32 bg-gray-50 animate-pulse" />}>
        <CTASection />
      </Suspense>
      
      <Marquee />
      
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <DonationProgramsSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <ScrollingAnimation />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <FAQSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-64 bg-gray-900 animate-pulse" />}>
        <Footer />
      </Suspense>
    </main>
  )
}