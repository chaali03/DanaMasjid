"use client"

import dynamic from "next/dynamic"

// Lazy load komponen berat dengan framer-motion
export const IntroAnimation = dynamic(() => import("@/components/scroll-morph-hero"), {
  ssr: false,
  loading: () => <div className="h-screen bg-white flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
})

export const ScrollingAnimation = dynamic(() => import("@/components/scrolling-animation").then(mod => ({ default: mod.HomePage })), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
})
