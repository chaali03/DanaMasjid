"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { AnimatedSection } from "@/components/ui/animated-section"

export function PricingInfoSection() {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Split Background - Left Yellow, Right Cyan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-yellow-100"></div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-cyan-200"></div>
      </div>

      {/* Decorative Blobs/Circles */}
      <div className="absolute inset-0">
        {/* Yellow side blobs */}
        <AnimatedSection variant="scaleIn" delay={0.1}>
          <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-200 rounded-full opacity-50"></div>
        </AnimatedSection>
        <AnimatedSection variant="scaleIn" delay={0.2}>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-orange-200 rounded-full opacity-40"></div>
        </AnimatedSection>
        <AnimatedSection variant="scaleIn" delay={0.3}>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300 rounded-full opacity-30"></div>
        </AnimatedSection>
        
        {/* Cyan side blobs */}
        <AnimatedSection variant="scaleIn" delay={0.15}>
          <div className="absolute top-10 right-10 w-48 h-48 bg-blue-300 rounded-full opacity-40"></div>
        </AnimatedSection>
        <AnimatedSection variant="scaleIn" delay={0.25}>
          <div className="absolute bottom-10 right-20 w-36 h-36 bg-cyan-300 rounded-full opacity-50"></div>
        </AnimatedSection>
        <AnimatedSection variant="scaleIn" delay={0.35}>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-teal-200 rounded-full opacity-35"></div>
        </AnimatedSection>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Left Side - Title */}
          <AnimatedSection variant="fadeInLeft">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Platform
              <br />
              <span className="text-foreground">Donasi & Transparansi</span>
              <br />
              <span className="text-primary">Program Masjid</span>
            </h2>
          </AnimatedSection>

          {/* Center - Image */}
          <AnimatedSection variant="flipIn" delay={0.2}>
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image
                  src="/images/harga/ngaji.webp"
                  alt="DanaMasjid Platform"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Right Side - Description */}
          <AnimatedSection variant="fadeInRight" delay={0.3}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              DanaMasjid hadir untuk memudahkan pengelolaan donasi dan transparansi program masjid secara digital. Pilih paket yang sesuai dengan kebutuhan masjid Anda dan mulai kelola donasi dengan lebih efisien dan amanah.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
