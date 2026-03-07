"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Heart, Building2, Code, Users, BookOpen, Droplet, Home, Utensils, GraduationCap } from "lucide-react"
import { useRef } from "react"

const donationItems = [
  {
    id: 1,
    title: "Bantuan Korban Banjir Bandang",
    category: "Bencana Alam",
    description: "Membantu korban banjir bandang di Sumatra Barat",
    icon: Droplet,
    color: "from-red-400 to-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    borderColor: "border-red-200",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400",
    raised: "Rp 45.000.000",
    target: "Rp 100.000.000",
    percentage: 45,
    donors: 523,
    daysLeft: 12,
  },
  {
    id: 2,
    title: "Renovasi Masjid Al-Ikhlas",
    category: "Masjid",
    description: "Renovasi total masjid berusia 50 tahun",
    icon: Building2,
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400",
    raised: "Rp 180.000.000",
    target: "Rp 250.000.000",
    percentage: 72,
    donors: 1240,
    daysLeft: 25,
  },
  {
    id: 3,
    title: "Support DanaMasjid Development",
    category: "Developer",
    description: "Bantu pengembangan fitur baru platform",
    icon: Code,
    color: "from-orange-400 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    borderColor: "border-orange-200",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    raised: "Rp 8.500.000",
    target: "Rp 30.000.000",
    percentage: 28,
    donors: 89,
    daysLeft: 45,
  },
  {
    id: 4,
    title: "Bantuan Gempa Cianjur",
    category: "Bencana Alam",
    description: "Pemulihan pasca gempa untuk warga Cianjur",
    icon: Heart,
    color: "from-red-400 to-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    borderColor: "border-red-200",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400",
    raised: "Rp 95.000.000",
    target: "Rp 150.000.000",
    percentage: 63,
    donors: 1850,
    daysLeft: 8,
  },
  {
    id: 5,
    title: "Pembangunan Masjid Nurul Huda",
    category: "Masjid",
    description: "Pembangunan masjid baru untuk 500 jamaah",
    icon: Building2,
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400",
    raised: "Rp 320.000.000",
    target: "Rp 500.000.000",
    percentage: 64,
    donors: 2340,
    daysLeft: 60,
  },
  {
    id: 6,
    title: "Santunan Anak Yatim",
    category: "Sosial",
    description: "Program santunan bulanan untuk 100 anak yatim",
    icon: Users,
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    borderColor: "border-purple-200",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
    raised: "Rp 25.000.000",
    target: "Rp 60.000.000",
    percentage: 42,
    donors: 456,
    daysLeft: 20,
  },
  {
    id: 7,
    title: "Perpustakaan Masjid Digital",
    category: "Pendidikan",
    description: "Membangun perpustakaan digital untuk masjid",
    icon: BookOpen,
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-200",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    raised: "Rp 12.000.000",
    target: "Rp 40.000.000",
    percentage: 30,
    donors: 234,
    daysLeft: 35,
  },
  {
    id: 8,
    title: "Dapur Umum Ramadan",
    category: "Sosial",
    description: "Menyediakan makanan berbuka untuk 1000 orang",
    icon: Utensils,
    color: "from-yellow-400 to-yellow-600",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    borderColor: "border-yellow-200",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    raised: "Rp 18.000.000",
    target: "Rp 35.000.000",
    percentage: 51,
    donors: 678,
    daysLeft: 15,
  },
]

export function DonationCategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-2"
            >
              Donasi Terbuka
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-600"
            >
              Pilih program donasi yang ingin Anda dukung
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/donasi/all"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-300 group"
            >
              View All
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Scrollable Cards Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          
          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {donationItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex-shrink-0 w-[320px] snap-start"
                >
                  <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${item.borderColor} hover:scale-105 cursor-pointer group h-full flex flex-col`}>
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-60`} />
                      
                      {/* Category Badge */}
                      <div className={`absolute top-4 left-4 ${item.bgColor} px-3 py-1 rounded-full`}>
                        <span className={`text-xs font-semibold ${item.textColor}`}>{item.category}</span>
                      </div>
                      
                      {/* Days Left Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-slate-700">{item.daysLeft} hari lagi</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Title */}
                      <h3 className="text-lg font-bold mb-2 text-slate-900 line-clamp-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                      {/* Progress Bar */}
                      <div className="mb-4 mt-auto">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-600">Terkumpul</span>
                          <span className={`font-semibold ${item.textColor}`}>{item.percentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="space-y-1 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Terkumpul:</span>
                          <span className="font-semibold text-slate-900">{item.raised}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Target:</span>
                          <span className="font-semibold text-slate-900">{item.target}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Users className="w-4 h-4" />
                          <span>{item.donors.toLocaleString('id-ID')} donatur</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        className={`w-full py-2.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${item.color} text-white hover:shadow-lg transform hover:scale-105`}
                      >
                        Dukung Program
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-slate-500 text-sm mt-6"
        >
          ← Geser untuk melihat lebih banyak →
        </motion.p>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
