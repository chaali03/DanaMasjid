"use client"

import Link from "next/link"
import { Twitter, Linkedin, Instagram, Facebook } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <div className="relative mt-32">
      {/* Background Image */}
      <div className="absolute -top-[30vw] sm:-top-[25vw] md:-top-[20vw] left-0 right-0 w-full h-[40vw] z-0 overflow-hidden">
        <Image 
          src="/images/masjid2.webp" 
          alt="Masjid Background" 
          fill 
          className="object-cover object-center" 
          loading="lazy"
        />
      </div>

      {/* Large Text Overlay */}
      <div className="absolute -top-[25vw] sm:-top-[20vw] md:-top-[15vw] left-0 right-0 flex items-end justify-center overflow-visible pointer-events-none z-10">
        <h2 className="font-bold text-center text-[28vw] sm:text-[25vw] md:text-[22vw] lg:text-[20vw] leading-[0.85] tracking-tighter text-white whitespace-nowrap">
          MASJID
        </h2>
      </div>

      <footer id="contact" className="relative z-20 border-t border-border py-16 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="flex items-center gap-2 mb-2">
                <div className="relative w-10 h-10">
                  <Image
                    src="/images/logo/parantara__3.png"
                    alt="PARANTARA Logo"
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
              </Link>
              <p className="text-sm text-muted-foreground text-center md:text-left font-light">
                laporan masjid yang transparan dan amanah.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] sm:text-xs text-muted-foreground font-light">© 2026 PARANTARA. Hak cipta dilindungi.</p>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/kebijakan-privasi"
                className="text-[10px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <span className="text-[10px] sm:text-xs text-muted-foreground opacity-50">•</span>
              <Link
                href="/syarat-ketentuan"
                className="text-[10px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Syarat & Ketentuan
              </Link>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-light text-right">DanaMasjid - Platform Donasi Masjid Terpercaya</p>
          </div>
        </div>
      </footer>
    </div>
  )
}