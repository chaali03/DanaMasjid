"use client"

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useVideoReverse } from '@/hooks/useVideoReverse'

interface VideoBackgroundProps {
  videoSrc: string
  posterSrc?: string // Thumbnail image for faster initial load
  duration?: number // Optional, will auto-detect if not provided
  className?: string
}

export function VideoBackground({ videoSrc, posterSrc, duration, className = '' }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Use custom hook for reverse playback with 60 FPS
  // Duration is optional - will auto-detect from video metadata
  useVideoReverse(videoRef as React.RefObject<HTMLVideoElement>, { duration, fps: 60 })

  return (
    <>
      {/* Video Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`absolute inset-0 w-full h-full ${className}`}
      >
        <video
          ref={videoRef}
          autoPlay
          loop={false}
          muted
          playsInline
          preload="metadata"
          poster={posterSrc}
          onLoadedData={() => setIsLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            perspective: '1000px',
            WebkitTransform: 'translate3d(0, 0, 0)',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
        {/* Loading indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-sky-900 to-cyan-900">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-white/80 text-sm">Loading...</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-sky-900/30 to-cyan-900/40 backdrop-blur-[2px]"
      />
    </>
  )
}
