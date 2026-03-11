"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface MarqueeSectionProps {
  sponsors: Array<{
    src: string;
    alt: string;
  }>;
  sponsorOrder: number[];
}

export function MarqueeSection({ sponsors, sponsorOrder }: MarqueeSectionProps) {
  return (
    <div className="w-full">
      {/* Sponsor Logos Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 py-4 md:py-6"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-3">
            <p className="text-xs md:text-sm font-bold text-gray-800 uppercase tracking-widest">
              Didukung Oleh
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-x-0 md:divide-x divide-yellow-600">
            <AnimatePresence mode="popLayout">
              {sponsorOrder.map((sponsorIndex, position) => (
              <motion.div 
                key={`sponsor-${sponsorIndex}`}
                layout
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: position * 0.08,
                  ease: [0.4, 0, 0.2, 1],
                  layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                }}
                className="flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-lg p-3 md:p-4 shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <Image
                      src={sponsors[sponsorIndex].src}
                      alt={sponsors[sponsorIndex].alt}
                      width={120}
                      height={48}
                      className="h-10 md:h-12 object-contain"
                      loading="lazy"
                      sizes="(max-width: 768px) 80px, 120px"
                    />
                  </motion.div>
                  <p className="text-[10px] md:text-xs font-semibold text-gray-800 text-center">
                    {sponsors[sponsorIndex].alt}
                  </p>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      
      {/* Marquee Animation */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, type: "spring", stiffness: 80, damping: 15 }}
        className="bg-blue-600 py-1 overflow-hidden"
      >
        <div className="flex animate-marquee-infinite whitespace-nowrap">
          <span className="text-xs text-white mx-6">Platform Donasi Masjid Terpercaya</span>
          <span className="text-xs text-white">|</span>
          <span className="text-xs text-white mx-6">Transparansi Real-Time</span>
          <span className="text-xs text-white">|</span>
          <span className="text-xs text-white mx-6">Amanah & Berkah</span>
          <span className="text-xs text-white">|</span>
          <span className="text-xs text-white mx-6">Laporan Lengkap</span>
          <span className="text-xs text-white">|</span>
          <span className="text-xs text-white mx-6">Mudah & Aman</span>
          <span className="text-xs text-white">|</span>
          <span className="text-xs text-white mx-6">Sesuai Syariah</span>
          <span className="text-xs text-white">|</span>
          <span className="text-xs text-white mx-6">Donasi Digital Terpercaya</span>
          <span className="text-xs text-white">|</span>
        </div>
      </motion.div>
    </div>
  );
}