"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatedText } from "@/components/animations"
import Image from "next/image"


export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const masjidRef = useRef<HTMLDivElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    
    // Optimized GPU acceleration
    video.style.transform = 'translate3d(0,0,0)'
    video.style.backfaceVisibility = 'hidden'
    video.style.willChange = 'auto' // Only set when animating
    video.preload = 'metadata'
    video.playsInline = true

    // Optimized lazy load with faster play
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        video.preload = 'auto'
        video.load()
        // Play immediately for better UX
        video.play().catch(() => {})
        observer.disconnect()
      }
    }, { threshold: 0.1, rootMargin: '50px' })
    observer.observe(video)

    const handleEnded = () => { video.currentTime = 0; video.play().catch(() => {}) }
    video.addEventListener('ended', handleEnded, { passive: true })
    return () => { 
      video.removeEventListener('ended', handleEnded)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const masjid = masjidRef.current
    const videoWrap = videoWrapRef.current
    if (!masjid || !videoWrap) return

    let ticking = false
    let lastScrollY = 0
    
    const handleScroll = () => {
      const scrollY = window.pageYOffset
      
      // Skip if scroll hasn't changed enough (optimization)
      if (Math.abs(scrollY - lastScrollY) < 5) return
      lastScrollY = scrollY
      
      if (!ticking) {
        requestAnimationFrame(() => {
          const progress = Math.min(scrollY / 400, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          // Optimized DOM mutations with GPU acceleration
          videoWrap.style.borderRadius = `${ease * 48}px`
          masjid.style.transform = `translate3d(0, ${progress * 150}px, 0)`
          masjid.style.opacity = `${1 - progress * 0.8}`
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="pt-32 pb-12 px-6 min-h-screen flex items-center relative max-w-full">
      {/* Video background */}
      <div className="absolute inset-0 top-0 w-full overflow-hidden">
        <div
          ref={videoWrapRef}
          className="w-full overflow-hidden relative"
          style={{ height: '100vh', backfaceVisibility: 'hidden' }}
        >
          <video
            ref={videoRef}
            autoPlay loop muted playsInline preload="none"
            className="w-full h-full object-cover"
            style={{ 
              transform: 'translate3d(0,0,0)', 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <source src="/vidio/vidio1.mp4" type="video/mp4" />
            <track kind="captions" srcLang="id" label="Indonesian" />
          </video>
        </div>
      </div>

      {/* MASJID text — CSS animation, no framer-motion */}
      <div
        ref={masjidRef}
        className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none z-[5] flex items-end justify-center px-4"
        style={{ height: "100%" }}
      >
        <span
          className="block font-bold text-[24vw] sm:text-[22vw] md:text-[20vw] lg:text-[18vw] tracking-tighter select-none text-center leading-none bg-gradient-to-r from-blue-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent max-w-full pb-2"
          style={{
            animation: "heroMasjidIn 0.8s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          SARANA
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-12 max-w-full">
          <div>
            <h1
              className="text-[2rem] xs:text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem] font-normal leading-tight mb-6 w-full px-4 max-w-6xl mx-auto text-center"
              style={{ fontFamily: "'ArabicRamadan', serif" }}
            >
              <AnimatedText text="Transparansi" delay={0} />
              {" "}
              <AnimatedText text="Dana" delay={0.1} />
              {" "}
              <AnimatedText text="Masjid" delay={0.2} />
              {" "}
              <AnimatedText text="&" delay={0.3} />
              {" "}
              <AnimatedText text="Supply" delay={0.4} />
              {" "}
              <AnimatedText text="Chain" delay={0.5} />
            </h1>
            <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8 px-4 drop-shadow-lg">
              Kelola dana masjid dan rantai pasok secara transparan dengan pelacakan berbasis blockchain.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 relative">
          {/* Review Image - Left Side (1 image) */}
          <div className={`absolute left-[0px] md:left-[5px] lg:left-[10px] xl:left-[20px] 2xl:left-[30px] top-1/2 -translate-y-1/2 lg:flex flex-col gap-6 z-20 md:z-0 ${mounted ? 'flex' : 'hidden'}`}>
            <div className="animate-float-slow" style={{ willChange: 'transform' }}>
              <img
                src="/images/review1.png"
                alt="Review 1"
                width={100}
                height={100}
                className="rounded-lg -rotate-6 -translate-x-4 hover:rotate-0 hover:translate-x-0 hover:scale-110 transition-transform duration-300 w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] xl:w-[240px] xl:h-[240px] 2xl:w-[280px] 2xl:h-[280px]"
                loading="lazy"
                decoding="async"
                style={{ transform: 'translateZ(0)' }}
              />
            </div>
          </div>

          {/* iPhone Center */}
          <div className="hero-image relative w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] z-10" style={{ willChange: 'transform' }}>
            <Image
              src="/images/iphone.webp"
              alt="PARANTARA Mobile App"
              width={350}
              height={688}
              sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 350px"
              className="w-full relative z-10"
              style={{ height: 'auto', transform: 'translateZ(0)' }}
              priority
              fetchPriority="high"
              unoptimized={process.env.NODE_ENV === 'development'}
            />
          </div>

          {/* Review Images - Right Side (2 images stacked) */}
          <div className={`absolute right-[0px] md:right-[5px] lg:right-[10px] xl:right-[20px] 2xl:right-[30px] top-1/2 -translate-y-1/2 lg:flex flex-col gap-4 xl:gap-6 z-20 md:z-0 ${mounted ? 'flex' : 'hidden'}`}>
            <div className="animate-float-delayed" style={{ willChange: 'transform' }}>
              <img
                src="/images/review2.png"
                alt="Review 2"
                width={90}
                height={90}
                className="rounded-lg rotate-6 translate-x-4 hover:rotate-0 hover:translate-x-0 hover:scale-110 transition-transform duration-300 w-[110px] h-[110px] md:w-[150px] md:h-[150px] lg:w-[190px] lg:h-[190px] xl:w-[230px] xl:h-[230px] 2xl:w-[270px] 2xl:h-[270px]"
                loading="lazy"
                decoding="async"
                style={{ transform: 'translateZ(0)' }}
              />
            </div>
            <div className="animate-float-slow" style={{ willChange: 'transform' }}>
              <img
                src="/images/review3.png"
                alt="Review 3"
                width={85}
                height={85}
                className="rounded-lg -rotate-3 -translate-x-2 hover:rotate-0 hover:translate-x-0 hover:scale-110 transition-transform duration-300 w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[180px] lg:h-[180px] xl:w-[220px] xl:h-[220px] 2xl:w-[250px] 2xl:h-[250px]"
                loading="lazy"
                decoding="async"
                style={{ transform: 'translateZ(0)' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroMasjidIn {
          from { opacity: 0; transform: translateY(60px) scale(0.85); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes heroSubtitleIn {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroImageIn {
          from { opacity: 0; transform: translateY(40px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .hero-subtitle {
          animation: heroSubtitleIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both;
        }
        .hero-image {
          animation: heroImageIn 1s cubic-bezier(0.16,1,0.3,1) 0.8s both;
        }
      `}</style>
    </section>
  )
}