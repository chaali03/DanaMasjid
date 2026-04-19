"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { triggerPageLoading } from "@/lib/page-loading"

declare global {
  interface Window { __scrollTarget?: string }
}

// Inline SVGs to avoid lucide hydration mismatch
const IconMenu = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)
const IconX = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
)
const IconChevronDown = ({ className }: { className?: string }) => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
)
const IconArrowRight = ({ className }: { className?: string }) => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
)
const IconArrowUpRight = ({ className }: { className?: string }) => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M7 7h10v10" /><path d="M7 17 17 7" />
  </svg>
)

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false)
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  
  // Combined condition for header styling
  const isHeaderActive = isScrolled || isOpen
  
  // Detect scroll for floating header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Helper function to check if link is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Check if we're on homepage
    if (window.location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } else {
      // Navigate to homepage
      triggerPageLoading()
      router.push('/')
    }
  }

  const solutions = {
    types: [
      { name: "Sertifikasi & NGO", description: "Monitoring, audit, dan data dampak yang lebih kredibel bagi donatur.", href: "#" },
    ],
    cases: [
      { name: "Transparansi Dana", description: "Laporan keuangan real-time yang membangun kepercayaan jamaah.", href: "#" },
      { name: "Manajemen Supply Chain", description: "Pelacakan bantuan dan logistik secara transparan dari hulu ke hilir.", href: "#" },
      { name: "Digitalisasi Donasi", description: "Terima donasi melalui berbagai metode pembayaran digital (QRIS, Bank).", href: "#" },
      { name: "Akuntabilitas Publik", description: "Hasilkan laporan akuntabilitas bulanan dan tahunan secara otomatis.", href: "#" },
    ],
  }

  const resources = {
    company: [
      { name: "Tentang Kami", description: "Misi kami, cerita, dan tim", href: "/about-us" },
      { name: "Tim", description: "Bergabunglah dengan tim global kami yang berorientasi pada tujuan", href: "/team" },
    ],
    support: [
      { name: "Help Desk", description: "Temukan jawaban dan panduan", href: "/help-desk", external: true },
      { name: "Kontak", description: "Hubungi tim kami untuk bantuan", href: "/contact" },
    ],
  }

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed z-50 transition-all duration-300 ${
        isHeaderActive ? "top-3 left-3 right-3" : "top-0 left-0 right-0"
      }`}
      style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className={`max-w-7xl mx-auto transition-all duration-300 ${
          isHeaderActive
            ? "bg-white/80 backdrop-blur-xl rounded-xl shadow-lg px-4 py-2"
            : "bg-transparent px-4 py-3"
        }`}
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isHeaderActive ? "h-14" : "h-12"
        }`}>
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
            <div className="relative w-9 h-9">
              <Image
                src="/images/logo/parantara__3.png"
                alt="DanaMasjid Logo"
                fill
                sizes="36px"
                className="object-contain mix-blend-multiply"
                priority
              />
            </div>
          </a>

          <nav className="hidden xl:flex items-center gap-6">
            {isActive('/') ? (
              <span className="text-sm text-gray-400 cursor-not-allowed pointer-events-none">
                Beranda
              </span>
            ) : (
              <Link
                href="/"
                onClick={() => triggerPageLoading()}
                className={`text-sm transition-colors cursor-pointer ${
                  isHeaderActive ? "text-black hover:text-black" : "text-black hover:text-black"
                }`}
              >
                Beranda
              </Link>
            )}

            {/* Solusi dropdown - always accessible */}
            <div 
              className="relative"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm transition-colors cursor-pointer ${
                  isHeaderActive ? "text-black hover:text-black" : "text-black hover:text-black"
                } ${isSolutionsOpen ? (isHeaderActive ? "text-black font-medium" : "text-black font-medium") : ""}`}
              >
                Solusi
                <IconChevronDown className={`w-3 h-3 transition-transform duration-300 ${isSolutionsOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isSolutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[650px] bg-white rounded-3xl shadow-2xl border border-zinc-100 p-8 z-[60]"
                    style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                  >
                  <div className="grid grid-cols-2 gap-12">
                    {/* Tipe Column */}
                    <div className="flex flex-col gap-6">
                      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Audit & Sertifikasi</span>
                      <div className="flex flex-col gap-6">
                        {solutions.types.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => {
                              setIsSolutionsOpen(false)
                              triggerPageLoading()
                            }}
                            className="group flex flex-col gap-1"
                          >
                            <div className="flex items-center gap-1 font-semibold text-zinc-900 group-hover:text-black transition-colors">
                              {item.name}
                            </div>
                            <p className="text-sm text-zinc-500 line-clamp-2 leading-snug">
                              {item.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Use Cases Column */}
                    <div className="flex flex-col gap-6">
                      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Kasus Penggunaan</span>
                      <div className="flex flex-col gap-6">
                        {solutions.cases.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => {
                              setIsSolutionsOpen(false)
                              triggerPageLoading()
                            }}
                            className="group flex flex-col gap-1"
                          >
                            <div className="flex items-center gap-1 font-semibold text-zinc-900 group-hover:text-black transition-colors">
                              {item.name}
                            </div>
                            <p className="text-sm text-zinc-500 line-clamp-2 leading-snug">
                              {item.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>

            {/* Separator */}
            <div className={`h-5 w-px ${isScrolled ? "bg-zinc-300" : "bg-white/20"}`} />

            {isActive('/masjid') ? (
              <span className="text-sm text-gray-400 cursor-not-allowed pointer-events-none">
                Masjid
              </span>
            ) : (
              <Link
                href="/masjid"
                onClick={() => triggerPageLoading()}
                className={`text-sm transition-colors cursor-pointer ${
                  isHeaderActive ? "text-black hover:text-black" : "text-black hover:text-black"
                }`}
              >
                Masjid
              </Link>
            )}
            {isActive('/pricing') ? (
              <span className="text-sm text-gray-400 cursor-not-allowed pointer-events-none">
                Harga
              </span>
            ) : (
              <Link
                href="/pricing"
                onClick={() => triggerPageLoading()}
                className={`text-sm transition-colors cursor-pointer ${
                  isHeaderActive ? "text-black hover:text-black" : "text-black hover:text-black"
                }`}
              >
                Harga
              </Link>
            )}
            
            <div 
              className="relative"
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm transition-colors cursor-pointer ${
                  isHeaderActive ? "text-black hover:text-black" : "text-black hover:text-black"
                } ${isResourcesOpen ? (isHeaderActive ? "text-black font-medium" : "text-black font-medium") : ""}`}
              >
                Lainnya
                <IconChevronDown className={`w-3 h-3 transition-transform duration-300 ${isResourcesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isResourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-white rounded-3xl shadow-2xl border border-zinc-100 p-8 z-[60]"
                    style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                  >
                    <div className="grid grid-cols-2 gap-12">
                      {/* Company Column */}
                      <div className="flex flex-col gap-6">
                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Company</span>
                        <div className="flex flex-col gap-6">
                          {resources.company.map((item) => {
                            const isCurrentPage = isActive(item.href)
                            return isCurrentPage ? (
                              <div key={item.name} className="group flex flex-col gap-1 cursor-not-allowed">
                                <div className="flex items-center gap-1 font-semibold text-gray-400">
                                  {item.name}
                                </div>
                                <p className="text-sm text-gray-300 line-clamp-2 leading-snug">
                                  {item.description}
                                </p>
                              </div>
                            ) : (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => {
                                  setIsResourcesOpen(false)
                                  triggerPageLoading()
                                }}
                                className="group flex flex-col gap-1"
                              >
                                <div className="flex items-center gap-1 font-semibold text-zinc-900 group-hover:text-black transition-colors">
                                  {item.name}
                                </div>
                                <p className="text-sm text-zinc-500 line-clamp-2 leading-snug">
                                  {item.description}
                                </p>
                              </Link>
                            )
                          })}
                        </div>
                      </div>

                      {/* Support Column */}
                      <div className="flex flex-col gap-6">
                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Support</span>
                        <div className="flex flex-col gap-6">
                          {resources.support.map((item) => {
                            const isCurrentPage = isActive(item.href)
                            return isCurrentPage ? (
                              <div key={item.name} className="group flex flex-col gap-1 cursor-not-allowed">
                                <div className="flex items-center gap-1 font-semibold text-gray-400">
                                  {item.name}
                                  {item.external && <IconArrowUpRight className="w-3 h-3" />}
                                </div>
                                <p className="text-sm text-gray-300 line-clamp-2 leading-snug">
                                  {item.description}
                                </p>
                              </div>
                            ) : (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => {
                                  setIsResourcesOpen(false)
                                  triggerPageLoading()
                                }}
                                className="group flex flex-col gap-1"
                              >
                                <div className="flex items-center gap-1 font-semibold text-zinc-900 group-hover:text-black transition-colors">
                                  {item.name}
                                  {item.external && <IconArrowUpRight className="w-3 h-3" />}
                                </div>
                                <p className="text-sm text-zinc-500 line-clamp-2 leading-snug">
                                  {item.description}
                                </p>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isActive('/donasi') ? (
              <span className="text-sm text-gray-400 cursor-not-allowed pointer-events-none">
                Donasi
              </span>
            ) : (
              <Link
                href="/donasi"
                onClick={() => triggerPageLoading()}
                className={`text-sm transition-colors cursor-pointer ${
                  isHeaderActive ? "text-black hover:text-black" : "text-black hover:text-black"
                }`}
              >
                Donasi
              </Link>
            )}
          </nav>

          <div className="hidden xl:flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 group ${
                  isScrolled 
                    ? "border-zinc-300 text-black" 
                    : "border-zinc-300 text-black"
                }`}
                style={{ willChange: 'transform' }}
              >
                <span className={`absolute inset-0 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 origin-center ${
                  isScrolled ? "bg-black" : "bg-white"
                }`} style={{ willChange: 'transform' }} />
                <span className={`relative z-10 transition-colors duration-200 ${
                  isHeaderActive ? "group-hover:text-white" : "group-hover:text-black"
                }`}>Masuk</span>
                <IconChevronDown className={`w-4 h-4 relative z-10 transition-all duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                } ${isHeaderActive ? "group-hover:text-white" : "group-hover:text-black"}`} />
              </button>

              {isDropdownOpen && (
                <div className={`absolute top-full right-0 mt-2 w-40 rounded-lg shadow-lg border overflow-hidden ${
                  isScrolled ? "bg-white border-zinc-200" : "bg-background border-border"
                }`}>
                  <button
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      isScrolled 
                        ? "text-black hover:bg-zinc-50" 
                        : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => {
                      setIsDropdownOpen(false)
                      triggerPageLoading()
                      router.push("/login")
                    }}
                  >
                    Masuk
                  </button>
                  <button
                    className={`w-full text-left px-4 py-3 text-sm transition-colors border-t ${
                      isScrolled 
                        ? "text-black hover:bg-zinc-50 border-zinc-200" 
                        : "text-foreground hover:bg-muted border-border"
                    }`}
                    onClick={() => {
                      setIsDropdownOpen(false)
                      triggerPageLoading()
                      router.push("/register")
                    }}
                  >
                    Daftar
                  </button>
                  <button
                    className={`w-full text-left px-4 py-3 text-sm transition-colors border-t ${
                      isScrolled 
                        ? "text-black hover:bg-zinc-50 border-zinc-200" 
                        : "text-foreground hover:bg-muted border-border"
                    }`}
                    onClick={() => {
                      setIsDropdownOpen(false)
                      triggerPageLoading()
                      router.push("/masjid")
                    }}
                  >
                    Jamaah
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/donasi"
              onClick={() => triggerPageLoading()}
              className={`relative flex items-center gap-0 border rounded-full pl-4 pr-1 py-0.5 transition-all duration-200 group overflow-hidden ${
                isScrolled ? "border-zinc-300" : "border-zinc-300"
              }`}
              style={{ willChange: 'transform' }}
            >
              <span
                className={`absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-200 ${
                  isScrolled ? "bg-black" : "bg-black"
                }`}
                style={{ willChange: 'transform' }}
              />
              <span
                className={`text-sm pr-2 relative z-10 transition-colors duration-200 ${
                  isHeaderActive ? "text-black group-hover:text-white" : "text-black group-hover:text-white"
                }`}
              >
                Donasi Sekarang
              </span>
              <span className="w-7 h-7 rounded-full flex items-center justify-center relative z-10">
                <IconArrowRight
                  className={`w-3.5 h-3.5 group-hover:opacity-0 absolute transition-opacity duration-200 ${
                    isHeaderActive ? "text-black" : "text-black"
                  }`}
                />
                <IconArrowUpRight
                  className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                    isHeaderActive ? "text-black group-hover:text-white" : "text-black group-hover:text-white"
                  }`}
                />
              </span>
            </Link>
          </div>

          <button
            className={`xl:hidden transition-colors duration-150 ${isHeaderActive ? "text-black" : "text-black"}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isOpen}
            suppressHydrationWarning
          >
            {isOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className={`xl:hidden overflow-hidden`}
              style={{ willChange: 'height, opacity' }}
            >
              <div className={`mt-6 pb-6 flex flex-col gap-4 border-t pt-6 ${
                isScrolled ? "border-zinc-200" : "border-border"
              }`}>
                {isActive('/') ? (
                  <span className="text-gray-400 cursor-not-allowed pointer-events-none">
                    Beranda
                  </span>
                ) : (
                  <Link
                    href="/"
                    onClick={() => { setIsOpen(false); triggerPageLoading() }}
                    className={`transition-colors cursor-pointer ${
                      isHeaderActive ? "text-black hover:text-black" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Beranda
                  </Link>
                )}

                {/* Mobile Solutions Accordion */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                    className={`flex items-center justify-between transition-colors cursor-pointer font-medium ${
                      isHeaderActive ? "text-black hover:text-black" : "text-foreground hover:text-foreground"
                    }`}
                  >
                    Solusi
                    <IconChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileSolutionsOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isMobileSolutionsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex flex-col gap-4 pl-4 pt-2 overflow-hidden"
                        style={{ willChange: 'height, opacity' }}
                      >
                        <div className="flex flex-col gap-3">
                          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Audit & Sertifikasi</span>
                          {solutions.types.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => { setIsOpen(false); triggerPageLoading() }}
                              className="text-sm text-black hover:text-black transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                        <div className="flex flex-col gap-3">
                          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Kasus Penggunaan</span>
                          {solutions.cases.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => { setIsOpen(false); triggerPageLoading() }}
                              className="text-sm text-black hover:text-black transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Separator */}
                <div className={`h-px w-full ${isScrolled ? "bg-zinc-200" : "bg-border"}`} />

                {isActive('/masjid') ? (
                  <span className="text-gray-400 cursor-not-allowed pointer-events-none font-medium">
                    Masjid
                  </span>
                ) : (
                  <Link
                    href="/masjid"
                    onClick={() => { setIsOpen(false); triggerPageLoading() }}
                    className={`transition-colors cursor-pointer font-medium ${
                      isHeaderActive ? "text-black hover:text-black" : "text-foreground hover:text-foreground"
                    }`}
                  >
                    Masjid
                  </Link>
                )}
                {isActive('/pricing') ? (
                  <span className="text-gray-400 cursor-not-allowed pointer-events-none font-medium">
                    Harga
                  </span>
                ) : (
                  <Link
                    href="/pricing"
                    onClick={() => { setIsOpen(false); triggerPageLoading() }}
                    className={`transition-colors cursor-pointer font-medium ${
                      isHeaderActive ? "text-black hover:text-black" : "text-foreground hover:text-foreground"
                    }`}
                  >
                    Harga
                  </Link>
                )}

                {/* Mobile Resources Accordion */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                    className={`flex items-center justify-between transition-colors cursor-pointer font-medium ${
                      isHeaderActive ? "text-black hover:text-black" : "text-foreground hover:text-foreground"
                    }`}
                  >
                    Lainnya
                    <IconChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileResourcesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isMobileResourcesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex flex-col gap-4 pl-4 pt-2 overflow-hidden"
                        style={{ willChange: 'height, opacity' }}
                      >
                        <div className="flex flex-col gap-3">
                          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Company</span>
                          {resources.company.map((item) => {
                            const isCurrentPage = isActive(item.href)
                            return isCurrentPage ? (
                              <span
                                key={item.name}
                                className="text-sm text-gray-400 cursor-not-allowed"
                              >
                                {item.name}
                              </span>
                            ) : (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => { setIsOpen(false); triggerPageLoading() }}
                                className="text-sm text-black hover:text-black transition-colors"
                              >
                                {item.name}
                              </Link>
                            )
                          })}
                        </div>
                        <div className="flex flex-col gap-3">
                          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Support</span>
                          {resources.support.map((item) => {
                            const isCurrentPage = isActive(item.href)
                            return isCurrentPage ? (
                              <span
                                key={item.name}
                                className="text-sm text-gray-400 cursor-not-allowed"
                              >
                                {item.name}
                              </span>
                            ) : (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => { setIsOpen(false); triggerPageLoading() }}
                                className="text-sm text-black hover:text-black transition-colors"
                              >
                                {item.name}
                              </Link>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {isActive('/donasi') ? (
                  <span className="text-gray-400 cursor-not-allowed pointer-events-none font-medium">
                    Donasi
                  </span>
                ) : (
                  <Link
                    href="/donasi"
                    onClick={() => { setIsOpen(false); triggerPageLoading() }}
                    className={`transition-colors cursor-pointer font-medium ${
                      isHeaderActive ? "text-black hover:text-black" : "text-foreground hover:text-foreground"
                    }`}
                  >
                    Donasi
                  </Link>
                )}
                
                <div
                  className={`flex flex-col gap-3 mt-4 pt-4 border-t ${isScrolled ? "border-zinc-200" : "border-border"}`}
                >
                  <div className="relative">
                    <button
                      onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                      className={`relative flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium border w-fit transition-all duration-150 group ${
                        isScrolled 
                          ? "border-zinc-300 text-black" 
                          : "border-border text-foreground"
                      }`}
                      style={{ willChange: 'transform' }}
                    >
                      <span className={`absolute inset-0 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-150 origin-center ${
                        isScrolled ? "bg-black" : "bg-foreground"
                      }`} style={{ willChange: 'transform' }} />
                      <span className="relative z-10 group-hover:text-white transition-colors duration-150">Masuk</span>
                      <IconChevronDown className={`w-4 h-4 relative z-10 transition-all duration-150 ${
                        isMobileDropdownOpen ? "rotate-180" : ""
                      } group-hover:text-white`} />
                    </button>

                    <AnimatePresence>
                      {isMobileDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
                          className={`overflow-hidden mt-2 rounded-lg shadow-lg border ${
                            isScrolled ? "bg-white border-zinc-200" : "bg-background border-border"
                          }`}
                        >
                          <button
                            className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                              isScrolled 
                                ? "text-black hover:bg-zinc-50" 
                                : "text-foreground hover:bg-muted"
                            }`}
                            onClick={() => {
                              setIsMobileDropdownOpen(false)
                              setIsOpen(false)
                              triggerPageLoading()
                              router.push("/login")
                            }}
                          >
                            Masuk
                          </button>
                          <button
                            className={`w-full text-left px-4 py-3 text-sm transition-colors border-t ${
                              isScrolled 
                                ? "text-black hover:bg-zinc-50 border-zinc-200" 
                                : "text-foreground hover:bg-muted border-border"
                            }`}
                            onClick={() => {
                              setIsMobileDropdownOpen(false)
                              setIsOpen(false)
                              triggerPageLoading()
                              router.push("/register")
                            }}
                          >
                            Daftar
                          </button>
                          <button
                            className={`w-full text-left px-4 py-3 text-sm transition-colors border-t ${
                              isScrolled 
                                ? "text-black hover:bg-zinc-50 border-zinc-200" 
                                : "text-foreground hover:bg-muted border-border"
                            }`}
                            onClick={() => {
                              setIsMobileDropdownOpen(false)
                              setIsOpen(false)
                              triggerPageLoading()
                              router.push("/masjid")
                            }}
                          >
                            Jamaah
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="/donasi"
                    onClick={() => { setIsOpen(false); triggerPageLoading() }}
                    className={`relative flex items-center gap-0 border rounded-full pl-5 pr-1 py-1 w-fit transition-all duration-150 group overflow-hidden ${
                      isScrolled ? "border-zinc-300" : "border-border"
                    }`}
                    style={{ willChange: 'transform' }}
                  >
                    <span
                      className={`absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-150 ${
                        isScrolled ? "bg-black" : "bg-foreground"
                      }`}
                      style={{ willChange: 'transform' }}
                    />
                    <span
                      className={`text-sm pr-3 relative z-10 transition-colors duration-150 ${
                        isHeaderActive ? "text-black group-hover:text-white" : "text-foreground group-hover:text-background"
                      }`}
                    >
                      Donasi Sekarang
                    </span>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center relative z-10">
                      <IconArrowRight
                        className={`w-4 h-4 group-hover:opacity-0 absolute transition-opacity duration-150 ${
                          isHeaderActive ? "text-black" : "text-foreground"
                        }`}
                      />
                      <IconArrowUpRight
                        className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-150 ${
                          isHeaderActive ? "text-black group-hover:text-white" : "text-foreground group-hover:text-background"
                        }`}
                      />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  )
}




