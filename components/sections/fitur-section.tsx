"use client"

import { AnimatedSection } from "@/components/animations/animated-section"
import { motion } from "framer-motion"

export function FiturSection() {
  return (
    <AnimatedSection animation="fadeIn" className="relative bg-background min-h-[120vh] md:min-h-[150vh] lg:min-h-[135vh]">
      <div className="relative px-4 py-8 md:py-12 min-h-[120vh] md:min-h-[130vh] lg:min-h-[135vh]">
        {/* Wavy Background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-0 z-0"
        >
          {/* Top Wave */}
          <svg
            className="absolute top-0 left-0 w-full h-[40vh] md:h-[50vh] lg:h-[60vh]"
            viewBox="0 0 1440 800"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB923C" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>
            </defs>
            <path
              d="M0,0 C240,150 480,200 720,180 C960,160 1200,100 1440,150 L1440,0 L0,0 Z"
              fill="url(#waveGradient)"
            />
          </svg>

          {/* Bottom Wave */}
          <svg
            className="absolute bottom-0 left-0 w-full h-[40vh] md:h-[50vh] lg:h-[60vh]"
            viewBox="0 0 1440 800"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EA580C" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
            </defs>
            <path
              d="M0,800 C240,650 480,600 720,620 C960,640 1200,700 1440,650 L1440,800 L0,800 Z"
              fill="url(#waveGradient2)"
            />
          </svg>
        </motion.div>

        {/* TRANSPARAN - Pojok Kanan Atas */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          viewport={{ once: true }}
          className="absolute top-4 left-1/2 -translate-x-1/2 lg:top-12 lg:right-16 lg:left-auto lg:translate-x-0 overflow-visible w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[25vw] z-10"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative inline-block w-full"
          >
            <div className="absolute inset-0 border-3 sm:border-4 border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl pointer-events-none z-20 shadow-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-2xl sm:rounded-3xl shadow-xl"></div>
            <span className="relative z-10 font-bold text-center text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[3.5vw] leading-none tracking-tighter text-white whitespace-nowrap px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 block drop-shadow-lg">
              TRANSPARAN
            </span>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="relative w-full px-4 md:px-6 lg:px-8 z-20">
          <div className="max-w-[1400px] mx-auto scale-90 md:scale-95 lg:scale-100">

            {/* Hero Section */}
            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10 lg:gap-20 mb-8">
              <div className="max-w-[536px] pt-0 md:pt-10 lg:pb-10"></div>
            </div>

            {/* Top 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-gray-200 dark:border-gray-700">
              {[
                {
                  gradient: "linear-gradient(177deg, rgb(9, 138, 95) 2.45%, rgb(5, 227, 156) 97.55%)",
                  icon: "/images/stak/Zakat-Ramadan.webp",
                  title: "Manajemen Donasi Digital",
                  desc: "Platform terintegrasi untuk mencatat dan mengelola donasi, infaq, wakaf, dan zakat secara digital dengan dashboard yang mudah digunakan pengurus masjid."
                },
                {
                  gradient: "linear-gradient(177deg, rgb(67, 49, 94) 2.45%, rgb(168, 119, 217) 97.55%)",
                  icon: "/images/stak/Halal-Sign-Ramadan.webp",
                  title: "Laporan Keuangan Transparan",
                  desc: "Setiap donasi tercatat otomatis dan dapat diakses jamaah secara real-time. Laporan pemasukan dan pengeluaran tersedia lengkap dan terbuka untuk publik."
                },
                {
                  gradient: "linear-gradient(177deg, rgb(251, 186, 111) 2.45%, rgb(255, 236, 225) 97.55%)",
                  icon: "/images/stak/Ramadan-Lantern-Ramadan.webp",
                  title: "Verifikasi Masjid Resmi",
                  desc: "Setiap masjid yang bergabung melalui proses verifikasi dokumen resmi oleh tim DanaMasjid untuk memastikan keabsahan dan kepercayaan platform."
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  viewport={{ once: true }}
                  className="flex flex-col p-4 md:p-8 border-r border-gray-200 dark:border-gray-700 last:border-r-0"
                >
                  {/* Gradient Header with Icon */}
                  <div
                    className="relative h-12 md:h-16 lg:h-20 w-full rounded-xl md:rounded-2xl rounded-tl-[32px] md:rounded-tl-[40px] lg:rounded-tl-[60px] shadow-lg mt-12 sm:mt-16 lg:mt-20 mb-4 md:mb-8"
                    style={{ background: card.gradient }}
                  >
                    <div className="absolute bottom-0 left-0 h-[150%] max-h-[120px] aspect-square">
                      <img
                        src={card.icon}
                        alt={card.title}
                        width={120}
                        height={120}
                        sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>

                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Bottom 4 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-900 rounded-[20px] border border-gray-200 dark:border-gray-700 p-4 md:p-0 md:bg-transparent md:border-0 mt-6">
              {[
                {
                  icon: "/images/stak/Tauhid-Ramadan.webp",
                  title: "Notifikasi Donasi Real-time",
                  desc: "Pengurus masjid dan donatur mendapat notifikasi langsung setiap ada donasi masuk, sehingga tidak ada transaksi yang terlewat."
                },
                {
                  icon: "/images/stak/Sorry-Hand-Ramadan.webp",
                  title: "Dukungan Pengurus Masjid",
                  desc: "Tim support siap membantu pengurus masjid dalam penggunaan platform, mulai dari pendaftaran hingga pengelolaan laporan keuangan harian."
                },
                {
                  icon: "/images/stak/Ramadan-Drum-Ramadan.webp",
                  title: "Riwayat Donasi Lengkap",
                  desc: "Semua riwayat donasi tersimpan permanen dan dapat diunduh kapan saja untuk keperluan audit, pelaporan, atau pertanggungjawaban kepada jamaah."
                },
                {
                  icon: "/images/stak/Ramadan-Discount-Ramadan.webp",
                  title: "Berbagai Metode Pembayaran",
                  desc: "Mendukung transfer bank, QRIS, dan berbagai e-wallet populer sehingga jamaah dapat berdonasi dengan cara yang paling mudah dan nyaman."
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 md:gap-5 border-t border-gray-200 dark:border-gray-700 p-0 md:p-5 lg:px-8 lg:py-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Icon */}
                  <div className="relative size-12 sm:size-16 md:size-20 shrink-0">
                    <img
                      src={card.icon}
                      alt={card.title}
                      width={80}
                      height={80}
                      sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                      {card.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* JUJUR - Pojok Kiri Bawah */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          viewport={{ once: true }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-12 lg:bottom-12 lg:left-16 lg:translate-x-0 overflow-visible w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[25vw] z-10"
        >
          <div className="relative inline-block w-full">
            <div className="absolute inset-0 border-3 sm:border-4 border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl pointer-events-none z-20 shadow-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-2xl sm:rounded-3xl shadow-xl"></div>
            <span className="relative z-10 font-bold text-center text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[3.5vw] leading-none tracking-tighter text-white whitespace-nowrap px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 block drop-shadow-lg">
              JUJUR
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
