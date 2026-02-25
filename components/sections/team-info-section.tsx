"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function TeamInfoSection() {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Split Background - Left Yellow, Right Cyan */}
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-yellow-100"></div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-cyan-200"></div>
      </div>

      {/* Decorative Blobs/Circles */}
      <div className="absolute inset-0">
        {/* Yellow side blobs */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-orange-200 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300 rounded-full opacity-30"></div>
        
        {/* Cyan side blobs */}
        <div className="absolute top-10 right-10 w-48 h-48 bg-blue-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-10 right-20 w-36 h-36 bg-cyan-300 rounded-full opacity-50"></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-teal-200 rounded-full opacity-35"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Left Side - Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Tim
              <br />
              <span className="text-foreground">DanaMasjid</span>
              <br />
              <span className="text-primary">Kecil-Kecilan</span>
            </h2>
          </motion.div>

          {/* Center - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src="/images/logo/DanaMasjid.webp"
                alt="DanaMasjid Team"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Right Side - Description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              Kami adalah tim yang berdedikasi untuk membangun platform donasi masjid yang transparan dan amanah. Dengan pengalaman di bidang teknologi dan manajemen masjid, kami berkomitmen memberikan solusi terbaik.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
