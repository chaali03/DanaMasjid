"use client"

import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { AnimatedSection } from "@/components/animations/animated-section"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Ahmad Fauzi",
    role: "Pengurus Masjid Al-Ikhlas",
    content: "Alhamdulillah, dengan teknologi blockchain PARANTARA, setiap transaksi tercatat permanen dan transparan. Jamaah bisa lacak supply chain dana dari awal sampai akhir!",
    rating: 5,
    color: "#3b82f6",
    avatar: "https://i.pravatar.cc/56?img=12",
  },
  {
    name: "Siti Nurhaliza",
    role: "Donatur Aktif",
    content: "Akhirnya ada platform berbasis blockchain yang benar-benar transparan. Saya bisa lihat hash transaksi dan verifikasi sendiri di blockchain explorer. Sangat recommended!",
    rating: 5,
    color: "#10b981",
    avatar: "https://i.pravatar.cc/56?img=47",
  },
  {
    name: "Budi Santoso",
    role: "Pengurus Masjid Nurul Huda",
    content: "Smart contract otomatis membuat distribusi dana lebih efisien dan transparan. Supply chain tracking-nya membantu kami kelola bantuan dengan lebih baik.",
    rating: 5,
    color: "#8b5cf6",
    avatar: "https://i.pravatar.cc/56?img=33",
  },
]

const testimonials2 = [
  {
    name: "Fatimah Zahra",
    role: "Donatur dari Jakarta",
    content: "Pelacakan supply chain real-time membuat saya yakin donasi sampai ke tujuan. Teknologi blockchain-nya luar biasa! Terima kasih PARANTARA!",
    rating: 5,
    color: "#f59e0b",
    avatar: "https://i.pravatar.cc/56?img=32",
  },
  {
    name: "Muhammad Rizki",
    role: "Pengurus Masjid Ar-Rahman",
    content: "Audit trail blockchain memudahkan kami dalam pelaporan. Setiap transaksi punya hash unik yang tidak bisa dimanipulasi. Platform yang luar biasa!",
    rating: 5,
    color: "#ef4444",
    avatar: "https://i.pravatar.cc/56?img=15",
  },
  {
    name: "Dewi Lestari",
    role: "Donatur dari Bandung",
    content: "Verifikasi blockchain memberikan kepercayaan penuh. Saya bisa cek sendiri di blockchain explorer. Semoga makin banyak masjid yang bergabung.",
    rating: 5,
    color: "#06b6d4",
    avatar: "https://i.pravatar.cc/56?img=45",
  },
]

export function TestimonialsSection() {
  return (
    <AnimatedSection animation="fadeIn" className="py-8 md:py-20 lg:py-32 px-6 bg-white overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          >
            Apa Kata <span className="text-blue-600 relative inline-block">
              Mereka
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                style={{ height: '12px' }}
              >
                <motion.path
                  d="M0,6 Q12,10 24,6 T48,6 T72,6 T96,6 T120,6 T144,6 T168,6 T192,6 T216,6 T240,6 T264,6 T288,6 T300,6"
                  stroke="url(#gradient-testimonial)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient-testimonial" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto"
          >
            Ribuan masjid dan jamaah telah mempercayai PARANTARA untuk transparansi blockchain dan supply chain tracking
          </motion.p>
        </motion.div>

        <div className="space-y-6">
          {/* Baris pertama - scroll ke kanan */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
            className="relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 via-slate-50 to-transparent z-10 pointer-events-none" />

            <div className="overflow-x-hidden">
              <div className="flex gap-6 animate-scroll-right">
                {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={`row1-${index}`}
                    className="flex-shrink-0 w-[320px] sm:w-[400px] md:w-[450px] bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Quote className="w-full h-full" style={{ color: testimonial.color }} />
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="flex-shrink-0">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={56}
                            height={56}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-slate-100"
                            loading="lazy"
                            quality={75}
                            sizes="(max-width: 640px) 48px, 56px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-900 font-bold text-sm sm:text-base truncate">{testimonial.name}</p>
                          <p className="text-slate-500 text-xs sm:text-sm truncate">{testimonial.role}</p>
                          <div className="flex gap-1 mt-1">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-slate-700 leading-relaxed text-sm sm:text-base break-words">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite alternate;
          will-change: transform;
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite alternate;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-right,
          .animate-scroll-left {
            animation: none;
          }
        }
      `}} />
    </AnimatedSection>
  )
}
