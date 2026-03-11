"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { LottieLoading } from "@/components/ui/lottie-loading"

// Optimize dynamic imports with better chunking
const MarqueeLazy = dynamic(() => import("@/components/marquee"), {
  ssr: false,
  loading: () => <LottieLoading className="h-screen bg-white flex items-center justify-center" />
})

const ScrollingAnimationLazy = dynamic(
  () => import("@/components/scrolling-animation").then(mod => ({ default: mod.HomePage })), 
  {
    ssr: false,
    loading: () => <LottieLoading className="min-h-screen bg-white flex items-center justify-center" />
  }
)

export function Marquee() {
  return (
    <Suspense fallback={<LottieLoading className="h-screen bg-white flex items-center justify-center" />}>
      <MarqueeLazy />
    </Suspense>
  )
}

export function ScrollingAnimation() {
  return (
    <Suspense fallback={<LottieLoading className="min-h-screen bg-white flex items-center justify-center" />}>
      <ScrollingAnimationLazy />
    </Suspense>
  )
}
