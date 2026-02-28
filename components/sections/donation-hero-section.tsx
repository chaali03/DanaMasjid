"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function DonationHeroSection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Be the <span className="text-orange-500">Hero</span> that changes lives
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            We will distribute your assistance to anyone in need<br />
            out there, anytime and anywhere.
          </motion.p>
        </div>

        {/* Image Grid - 6 rounded images */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto mb-20">
          {[
            { color: "from-blue-400 to-blue-600", icon: "👨‍🦱" },
            { color: "from-green-400 to-green-600", icon: "🤝" },
            { color: "from-orange-400 to-orange-600", icon: "🏘️" },
            { color: "from-purple-400 to-purple-600", icon: "🍱" },
            { color: "from-pink-400 to-pink-600", icon: "❤️" },
            { color: "from-yellow-400 to-yellow-600", icon: "🤲" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className={`relative aspect-[9/16] rounded-[80px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${item.color}`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-80">
                {item.icon}
              </div>
              {/* Overlay pattern */}
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
