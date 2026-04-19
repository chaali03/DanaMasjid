"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, useCallback, Suspense } from "react"
import { markPageLoadingDone } from "@/lib/page-loading-done"
import { LottieLoading } from "@/components/ui/lottie-loading"

declare global {
  interface Window {
    __pageLoadingPending?: boolean
    __pageLoadingShow?: () => void
    __pageLoadingHide?: () => void
  }
}

function PathWatcher({ onHide }: { onHide: () => void }) {
  const pathname = usePathname()
  const prevRef = useRef(pathname)

  useEffect(() => {
    if (prevRef.current !== pathname) {
      const previousPath = prevRef.current
      prevRef.current = pathname
      
      console.log(`🔄 Path changed: ${previousPath} → ${pathname}`)
      
      // Wait for page to be FULLY loaded before hiding
      const checkPageLoaded = () => {
        let attempts = 0
        const maxAttempts = 20 // 2 seconds max (reduced from 25)
        
        const checkInterval = setInterval(() => {
          attempts++
          
          // Check multiple conditions to ensure page is truly ready
          const isDocumentComplete = document.readyState === 'complete'
          const hasContent = document.body.children.length > 0
          const noLoadingElements = document.querySelectorAll('[data-loading="true"]').length === 0
          
          // All conditions must be met OR max attempts reached
          const isReady = isDocumentComplete && hasContent && noLoadingElements
          
          // Force show page after max attempts to prevent infinite loading
          const shouldShow = isReady || attempts >= maxAttempts
          
          if (shouldShow) {
            clearInterval(checkInterval)
            
            // Shorter delay for faster page display
            const delay = 150
            
            setTimeout(() => {
              const loadTime = Date.now() - (window as any).__pageLoadStart || 0
              if (process.env.NODE_ENV === 'development') {
                if (isReady) {
                  console.log(`✅ Page fully loaded in ${loadTime}ms`)
                } else {
                  console.log(`⚠️ Max loading time reached (${loadTime}ms), showing page anyway`)
                }
              }
              onHide()
            }, delay)
          }
        }, 100) // Check every 100ms
        
        return () => clearInterval(checkInterval)
      }
      
      // Mark start time for logging
      (window as any).__pageLoadStart = Date.now()
      
      // Start checking immediately
      const timer = setTimeout(checkPageLoaded, 100)
      return () => clearTimeout(timer)
    }
  }, [pathname, onHide])

  return null
}

function LottieOverlay({ fading }: { fading: boolean }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: fading ? "opacity 150ms ease" : "none", // Smooth fade
        pointerEvents: fading ? "none" : "all",
        willChange: fading ? "opacity" : "auto",
      }}
    >
      {/* Always use Lottie directly - no fallback */}
      <LottieLoading className="flex flex-col items-center gap-3" />
    </div>
  )
}

function Inner() {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)
  const isShowingRef = useRef(false)
  const showStartRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const safetyRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (safetyRef.current) clearTimeout(safetyRef.current)
  }, [])

  const hideOverlay = useCallback(() => {
    if (!isShowingRef.current) return
    
    const elapsedTime = Date.now() - showStartRef.current
    if (process.env.NODE_ENV === 'development') {
      console.log(`⏱️ Page loaded in ${elapsedTime}ms`)
    }
    
    clearTimers()
    isShowingRef.current = false
    window.__pageLoadingPending = false

    // Smooth fade transition
    setFading(true)
    timerRef.current = setTimeout(() => {
      setVisible(false)
      setFading(false)
      markPageLoadingDone()
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Loading animation hidden')
      }
    }, 200) // Smooth fade duration
  }, [clearTimers])

  const showOverlay = useCallback(() => {
    // Prevent showing if already showing
    if (isShowingRef.current && visible) {
      if (process.env.NODE_ENV === 'development') {
        console.log('⏭️ Already showing loading - skipping')
      }
      return
    }
    
    clearTimers()
    
    // Reset loading done state when showing overlay
    if (typeof window !== "undefined") {
      window.__pageLoadingDone = false
    }
    
    isShowingRef.current = true
    showStartRef.current = Date.now()
    setFading(false)
    setVisible(true)
    
    // Add safety timeout to prevent infinite loading (2.5 seconds max)
    safetyRef.current = setTimeout(() => {
      if (isShowingRef.current) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ Safety timeout reached - forcing hide')
        }
        hideOverlay()
      }
    }, 2500)
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Loading started - waiting for page to be ready...')
    }
  }, [clearTimers, hideOverlay, visible])

  useEffect(() => {
    window.__pageLoadingShow = showOverlay
    window.__pageLoadingHide = hideOverlay
    
    return () => {
      // Cleanup
    }
  }, [showOverlay, hideOverlay])

  useEffect(() => {
    if (window.__pageLoadingPending) {
      showOverlay()
    } else {
      window.__pageLoadingPending = false
    }

    const onNavigate = () => showOverlay()
    window.addEventListener("page-navigate", onNavigate)
    
    // Handle browser back/forward buttons - show loading IMMEDIATELY
    const onPopState = (e: PopStateEvent) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🔙 Browser back/forward detected')
      }
      // Show overlay immediately without any delay
      showOverlay()
    }
    
    // Listen to popstate with capture phase to catch it as early as possible
    window.addEventListener("popstate", onPopState, true)

    return () => {
      clearTimers()
      window.removeEventListener("page-navigate", onNavigate)
      window.removeEventListener("popstate", onPopState, true)
      window.__pageLoadingShow = undefined
      window.__pageLoadingHide = undefined
    }
  }, [showOverlay, clearTimers])

  // Intercept <a> clicks - only show loading for actual page changes
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a")
      if (!a) return
      
      const href = a.getAttribute("href")
      if (!href) return
      
      // Skip if not internal link
      if (!href.startsWith("/")) return
      
      // Skip if hash link (same page navigation)
      if (href.startsWith("/#") || href.includes("#")) return
      
      // Skip if API route
      if (href.startsWith("/api")) return
      
      // Skip if external link attribute
      if (a.target === "_blank" || a.rel?.includes("external")) return
      
      // Get current pathname without query/hash
      const currentPath = window.location.pathname
      const targetPath = href.split("?")[0].split("#")[0]
      
      // Normalize paths - treat "/" and "" as the same
      const normalizedCurrent = currentPath === "" ? "/" : currentPath
      const normalizedTarget = targetPath === "" ? "/" : targetPath
      
      // Skip if same page (exact match)
      if (normalizedTarget === normalizedCurrent) {
        console.log(`⏭️ Skipping loading - already on ${normalizedCurrent}`)
        return
      }
      
      // Skip if clicking within same section (e.g., dashboard sub-pages)
      const currentBase = normalizedCurrent.split("/")[1]
      const targetBase = normalizedTarget.split("/")[1]
      
      // Only skip for dashboard-admin internal navigation
      if (currentBase === "dashboard-admin" && targetBase === "dashboard-admin") {
        // Allow loading for main dashboard page transitions
        if (normalizedTarget === "/dashboard-admin" || normalizedCurrent === "/dashboard-admin") {
          showOverlay()
        }
        return
      }
      
      // ALWAYS show loading when navigating FROM about-us to any other page
      if (normalizedCurrent === "/about-us" && normalizedTarget !== "/about-us") {
        console.log(`🔄 Navigating FROM about-us to ${normalizedTarget}`)
        showOverlay()
        return
      }
      
      // Show loading for all other page changes
      console.log(`🔄 Navigating from ${normalizedCurrent} to ${normalizedTarget}`)
      showOverlay()
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [showOverlay])

  return (
    <>
      <Suspense fallback={null}>
        <PathWatcher onHide={hideOverlay} />
      </Suspense>
      {visible && <LottieOverlay fading={fading} />}
    </>
  )
}

export function PageLoadingTransition() {
  return <Inner />
}