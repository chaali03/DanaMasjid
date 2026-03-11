import { Header } from "@/components/layout"
import { HeroSection } from "@/components/sections"
import { StatsSection } from "@/components/sections"
import { ServicesSection } from "@/components/sections"
import { FeaturesSection } from "@/components/sections"
import { DonationProgramsSection } from "@/components/sections"
import { TestimonialsSection } from "@/components/sections"
import { FAQSection } from "@/components/sections"
import { CTASection } from "@/components/sections"
import { Footer } from "@/components/layout"
import { IntroAnimation, ScrollingAnimation } from "@/components/client-wrappers"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturesSection />
      <CTASection />
      <IntroAnimation />
      <DonationProgramsSection />
      <ScrollingAnimation />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  )
}