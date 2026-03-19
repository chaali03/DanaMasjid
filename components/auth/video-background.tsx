"use client"

import { useEffect, useRef, useState } from 'react'

interface VideoBackgroundProps {
  videoSrc: string
  posterSrc?: string
  className?: string
}

export function VideoBackground({ videoSrc, posterSrc, className = '' }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

  // Intersection Observer - only load when visible
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect()

          // Check connection quality
          const connection = (navigator as any).connection
          const isSlow = connection && (connection.effectiveType === '2g' || connection.saveData)

          if (isSlow) {
            setHasError(true) // just show poster on slow connection
            return
          }

          // Short delay so page content renders first
          const timer = setTimeout(() => setShouldLoadVideo(true), 800)
          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.01 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoadVideo) return

    const video = videoRef.current
    if (!video) return

    const playVideo = async () => {
      try {
        await video.play()
        setIsLoaded(true)
      } catch {
        setHasError(true)
      }
    }

    const handleError = () => setHasError(true)
    video.addEventListener('error', handleError)

    if (video.readyState >= 3) {
      playVideo()
    } else {
      video.addEventListener('canplay', playVideo, { once: true })
    }

    return () => video.removeEventListener('error', handleError)
  }, [shouldLoadVideo])

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`}>
      {/* Poster / gradient fallback */}
      <div
        className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600"
        style={posterSrc ? { backgroundImage: `url(${posterSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      />

      {/* Video — only rendered when ready */}
      {shouldLoadVideo && !hasError && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={posterSrc}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: 'translateZ(0)',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-sky-900/30 to-cyan-900/40 backdrop-blur-[2px]" />
    </div>
  )
}
