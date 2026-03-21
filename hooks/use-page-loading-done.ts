"use client"

import { useEffect, useState } from "react"
import { onPageLoadingDone } from "@/lib/page-loading-done"

/**
 * Returns true once all page loading overlays (initial + nav transitions) have finished.
 * Animations should wait for this before playing.
 */
export function usePageLoadingDone(): boolean {
  const [done, setDone] = useState(
    typeof window !== "undefined" && !!window.__pageLoadingDone
  )

  useEffect(() => {
    if (done) return
    const unsub = onPageLoadingDone(() => setDone(true))
    return unsub
  }, [done])

  return done
}
