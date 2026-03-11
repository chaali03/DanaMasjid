"use client"

import dynamic from 'next/dynamic'

// Lazy load framer-motion components
export const LazyMotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { 
    ssr: false,
    loading: () => <div />
  }
)

export const LazyMotionSpan = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.span),
  { 
    ssr: false,
    loading: () => <span />
  }
)

export const LazyMotionP = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.p),
  { 
    ssr: false,
    loading: () => <p />
  }
)

export const LazyMotionH1 = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.h1),
  { 
    ssr: false,
    loading: () => <h1 />
  }
)

export const LazyMotionH2 = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.h2),
  { 
    ssr: false,
    loading: () => <h2 />
  }
)

// Simple fade in animation without framer-motion
export function SimpleFadeIn({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div 
      className={`animate-fade-in ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        opacity: 0,
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  )
}
