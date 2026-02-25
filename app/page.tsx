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
import { ZoomParallax } from "@/components/animations"

const parallaxImages = [
  { src: "https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=1887&auto=format&fit=crop", alt: "Image 1" },
  { src: "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1964&auto=format&fit=crop", alt: "Image 2" },
  { src: "https://images.unsplash.com/photo-1605106715994-18d3fecffb98?q=80&w=1887&auto=format&fit=crop", alt: "Image 3" },
  { src: "https://images.unsplash.com/photo-1605106250963-ffda6d2a4b32?q=80&w=1887&auto=format&fit=crop", alt: "Image 4" },
  { src: "https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=1887&auto=format&fit=crop", alt: "Image 5" },
  { src: "https://images.unsplash.com/photo-1605106901227-991bd663255c?q=80&w=1887&auto=format&fit=crop", alt: "Image 6" },
  { src: "https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=1887&auto=format&fit=crop", alt: "Image 7" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturesSection />
      <CTASection />
      <div className="hidden lg:block">
        <ZoomParallax images={parallaxImages} />
      </div>
      <DonationProgramsSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
