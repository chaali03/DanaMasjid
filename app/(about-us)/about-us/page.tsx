"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/about-us/hero-section"

// Lazy load heavy components for better initial load
const MissionSection = dynamic(() => import("@/components/about-us/mission-section").then(mod => ({ default: mod.MissionSection })), {
  loading: () => <div className="min-h-screen" />
})
const FeaturesSection = dynamic(() => import("@/components/about-us/features-section").then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <div className="min-h-screen" />
})
const HowItWorksSection = dynamic(() => import("@/components/about-us/how-it-works-section").then(mod => ({ default: mod.HowItWorksSection })), {
  loading: () => <div className="min-h-screen" />
})
const InfrastructureSection = dynamic(() => import("@/components/about-us/infrastructure-section").then(mod => ({ default: mod.InfrastructureSection })), {
  loading: () => <div className="min-h-screen" />
})
const MetricsSection = dynamic(() => import("@/components/about-us/metrics-section").then(mod => ({ default: mod.MetricsSection })), {
  loading: () => <div className="min-h-screen" />
})
const CtaSection = dynamic(() => import("@/components/about-us/cta-section").then(mod => ({ default: mod.CtaSection })), {
  loading: () => <div className="min-h-[50vh]" />
})
const Footer = dynamic(() => import("@/components/layout/footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="min-h-[40vh]" />
})

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export default function AboutUsPage() {
  useEffect(() => {
    // Force scroll to top immediately - multiple methods for reliability
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Also set after a tiny delay to ensure it happens after any other scroll events
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
    
    // Add class to html and body to isolate styles - but wait for loading to finish
    const addClassTimer = setTimeout(() => {
      document.documentElement.classList.add('about-us-active');
      document.body.classList.add('about-us-active');
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(addClassTimer);
      document.documentElement.classList.remove('about-us-active');
      document.body.classList.remove('about-us-active');
    };
  }, []);

  return (
    <div className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
      <main className="relative min-h-screen bg-white text-slate-900">
        <Header />
        <HeroSection />
        <MissionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <InfrastructureSection />
        <MetricsSection />
        <CtaSection />
        <Footer />
      </main>
    </div>
  )
}
