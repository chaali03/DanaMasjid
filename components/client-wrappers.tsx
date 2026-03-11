"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

// Lazy load komponen berat dengan framer-motion
const IntroAnimationLazy = dynamic(() => import("@/components/scroll-morph-hero"), {
  ssr: false,
  loading: () => <div className="h-screen bg-white flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
})

const ScrollingAnimationLazy = dynamic(() => import("@/components/scrolling-animation").then(mod => ({ default: mod.HomePage })), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
})

function useDeferMount(delayMs: number) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let timeoutId: number | null = null

    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number
        cancelIdleCallback?: (id: number) => void
      }

    if (typeof w.requestIdleCallback === "function") {
      const idleId = w.requestIdleCallback(() => setReady(true), { timeout: delayMs })
      return () => w.cancelIdleCallback?.(idleId)
    }

    timeoutId = window.setTimeout(() => setReady(true), delayMs)
    return () => {
      if (timeoutId != null) window.clearTimeout(timeoutId)
    }
  }, [delayMs])

  return ready
}

export function IntroAnimation() {
  // Defer heavy framer-motion work until after initial paint/LCP
  const ready = useDeferMount(2500)
  return ready ? <IntroAnimationLazy /> : <div className="h-screen bg-white" aria-hidden="true" />
}

export function ScrollingAnimation() {
  // Defer below-the-fold animation work
  const ready = useDeferMount(2500)
  return ready ? <ScrollingAnimationLazy /> : <div className="min-h-screen bg-white" aria-hidden="true" />
}
