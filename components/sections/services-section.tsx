"use client"

import { FileText, CheckCircle, Shield, Link2, Package, Database } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const services = [
  {
    icon: Database,
    title: "Blockchain Transparan",
    description: "Setiap transaksi donasi tercatat di blockchain, memastikan transparansi penuh dan tidak dapat dimanipulasi.",
  },
  {
    icon: Link2,
    title: "Supply Chain Terlacak",
    description: "Lacak perjalanan dana dari donatur hingga penggunaan akhir dengan teknologi blockchain yang terdesentralisasi.",
  },
  {
    icon: Shield,
    title: "Keamanan Terjamin",
    description: "Smart contract otomatis memastikan dana masjid tersalurkan dengan aman dan sesuai tujuan yang telah ditetapkan.",
  },
]

function AnimatedIcon({ Icon, delay = 0 }: { Icon: any; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (iconRef.current) {
      observer.observe(iconRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={iconRef} className="relative">
      <Icon
        className={`text-foreground h-16 w-16 ${isVisible ? "animate-draw-icon" : ""}`}
        strokeWidth={1}
        style={{
          strokeDasharray: isVisible ? undefined : 1000,
          strokeDashoffset: isVisible ? undefined : 1000,
        }}
      />
    </div>
  )
}

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use requestIdleCallback for non-critical state updates
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => setIsVisible(true))
          } else {
            setIsVisible(true)
          }
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" className="py-32 px-6 pb-24 relative max-w-full">
      <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-0 max-w-full overflow-hidden">
        <span className="relative inline-block">
          <span className="relative z-10 font-bold text-center text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] leading-none tracking-tighter text-white whitespace-nowrap px-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
            AMANAH
          </span>
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 -z-0"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drawPath {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }
        :global(.animate-draw-icon) :global(path),
        :global(.animate-draw-icon) :global(line),
        :global(.animate-draw-icon) :global(polyline),
        :global(.animate-draw-icon) :global(circle),
        :global(.animate-draw-icon) :global(rect) {
          animation: drawPath 2s ease-out forwards;
        }
      `}} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={sectionRef} className="relative px-6 lg:px-8 py-20 lg:py-24 mb-3 lg:mt-25 overflow-hidden rounded-3xl min-h-[450px] lg:min-h-[550px]">
          {/* Background image that spans full width */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src="/images/masjid1.webp"
              alt="Beautiful house"
              width={960}
              height={639}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 960px, 1200px"
              className={`w-full h-[130%] object-cover transition-transform duration-1000 ease-out ${
                isVisible ? "scale-100" : "scale-110"
              }`}
              style={{ 
                minWidth: '100%', 
                minHeight: '100%',
                objectPosition: 'center 20%',
                willChange: isVisible ? 'auto' : 'transform'
              }}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          </div>

          {/* Text content on top */}
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-1 lg:order-2">
              <p className="text-sm uppercase tracking-[0.2em] text-white/80 font-medium mb-4">Misi Kami</p>
              <h2 className="font-sans md:text-4xl lg:text-5xl font-medium text-white text-balance mb-8 text-5xl">
                Membangun Transparansi Dana Masjid & Supply Chain
              </h2>
              <div className="space-y-6 text-white/90 leading-relaxed">
                <p>
                  Di Parantara, kami menghadirkan sistem transparan untuk mengelola donasi dan distribusi bantuan menggunakan teknologi blockchain. Kami menghubungkan donatur, masjid, dan rantai pasok dalam satu ekosistem terintegrasi.
                </p>
                <p>
                  Setiap masjid terverifikasi, setiap transaksi tercatat permanen di blockchain. Supply chain bantuan dapat dipantau real-time dari pengadaan hingga distribusi, memastikan bantuan tepat sasaran dan mengurangi potensi penyalahgunaan.
                </p>
              </div>
              <div className="mt-10"></div>
            </div>
          </div>
        </div>

        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif">Semua yang Anda Butuhkan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Platform lengkap untuk mengelola donasi masjid dan supply chain produk bantuan dari A sampai Z dengan teknologi blockchain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl hover:bg-zinc-50 transition-colors duration-300 text-center"
            >
              <div className="mb-6 flex justify-center">
                <AnimatedIcon Icon={service.icon} delay={index * 0.2} />
              </div>
              <h3 className="text-xl font-medium mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}