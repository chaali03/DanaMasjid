"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface VideoBackgroundProps {
  videoSrc: string
  posterSrc?: string
  className?: string
}

export function VideoBackground({ videoSrc, posterSrc, className = '' }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Force play on mount
    const playVideo = async () => {
      try {
        // Set video properties for better performance
        video.playbackRate = 1
        video.defaultPlaybackRate = 1
        
        // Try to play
        await video.play()
        setIsLoaded(true)
      } catch (error) {
        console.warn('Video autoplay failed:', error)
        // Retry on user interaction
        const handleInteraction = async () => {
          try {
            await video.play()
            setIsLoaded(true)
            document.removeEventListener('click', handleInteraction)
            document.removeEventListener('touchstart', handleInteraction)
          } catch (e) {
            console.error('Video play failed:', e)
            setHasError(true)
          }
        }
        
        document.addEventListener('click', handleInteraction, { once: true })
        document.addEventListener('touchstart', handleInteraction, { once: true })
      }
    }

    // Wait for video to be ready
    if (video.readyState >= 3) {
      playVideo()
    } else {
      video.addEventListener('canplay', playVideo, { once: true })
    }

    // Handle errors
    const handleError = () => {
      console.error('Video loading error')
      setHasError(true)
    }
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('error', handleError)
    }
  }, [])

  return (
    <>
      {/* Fallback background if video fails */}
      {hasError && (
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600"
          style={{
            backgroundImage: posterSrc ? `url(${posterSrc})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Video Background */}
      {!hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0.5 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`absolute inset-0 w-full h-full ${className}`}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={posterSrc}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              willChange: 'opacity',
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      )}

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-sky-900/30 to-cyan-900/40 backdrop-blur-[2px]"
      />
    </>
  )
}
