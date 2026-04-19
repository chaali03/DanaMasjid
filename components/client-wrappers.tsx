"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { SimpleSpinner } from "@/components/ui/simple-spinner"

// Optimize dynamic imports with better chunking and loading strategy
const MarqueeLazy = dynamic(() => import("@/components/marquee"), {
  ssr: false,
  loading: () => <div className="h-32 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400" />
})

const FiturSectionLazy = dynamic(
  () => import("@/components/sections/fitur-section").then(mod => ({ default: mod.FiturSection })), 
  {
    ssr: false,
    loading: () => <div className="min-h-[400px] bg-white" />
  }
)

export function Marquee() {
  return (
    <Suspense fallback={<div className="h-32 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400" />}>
      <MarqueeLazy />
    </Suspense>
  )
}

export function ScrollingAnimation() {
  return (
    <Suspense fallback={<div className="min-h-[400px] bg-white" />}>
      <FiturSectionLazy />
    </Suspense>
  )
}
