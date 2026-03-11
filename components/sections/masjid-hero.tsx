"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

// BlurText animation component
interface BlurTextProps {
  text: string
  delay?: number
  animateBy?: "words" | "letters"
  direction?: "top" | "bottom"
  className?: string
  style?: React.CSSProperties
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("")
  }, [text, animateBy])

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  )
}

export default function MasjidHero() {
  return (
    <div 
      className="min-h-screen text-foreground transition-colors bg-gradient-to-b from-blue-50 via-white to-blue-50"
    >
      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col">
        {/* Centered Main Text - Always Perfectly Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">
            <div>
              <BlurText
                text="DAFTAR"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#2563eb", fontFamily: "'Fira Code', monospace" }}
              />
            </div>
            <div>
              <BlurText
                text="MASJID"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#2563eb", fontFamily: "'Fira Code', monospace" }}
              />
            </div>

            {/* Masjid Icon/Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] md:w-[140px] md:h-[140px] lg:w-[170px] lg:h-[170px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer bg-white border-4 border-blue-600">
                <div className="w-full h-full flex items-center justify-center">
                  <svg 
                    className="w-[50%] h-[50%] text-blue-600" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4V17c0 4.52-3.13 8.75-8 9.92-4.87-1.17-8-5.4-8-9.92V8.18l8-4zM12 6l-6 3v6c0 3.31 2.29 6.41 6 7.44 3.71-1.03 6-4.13 6-7.44V9l-6-3zm0 2.18L16 10v5c0 2.48-1.71 4.81-4 5.58-2.29-.77-4-3.1-4-5.58v-5l4-2.82z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline - Proper Distance Below Hero */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-36 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <BlurText
              text="Temukan masjid yang ingin Anda dukung dengan transparan dan amanah"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-gray-600 hover:text-gray-900"
              style={{ fontFamily: "'Antic', sans-serif" }}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300 animate-bounce"
          aria-label="Scroll down"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth"
            })
          }}
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-gray-500 hover:text-blue-600 transition-colors duration-300" />
        </button>
      </main>
    </div>
  )
}
