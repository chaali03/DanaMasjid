"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== "undefined" && "performance" in window) {
      // Track LCP
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime)
          }
        }
      })
      
      try {
        observer.observe({ entryTypes: ["largest-contentful-paint"] })
      } catch (e) {
        // Fallback for older browsers
      }

      // Track FCP
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            console.log("FCP:", entry.startTime)
          }
        }
      })
      
      try {
        fcpObserver.observe({ entryTypes: ["paint"] })
      } catch (e) {
        // Fallback for older browsers
      }

      return () => {
        observer.disconnect()
        fcpObserver.disconnect()
      }
    }
  }, [])

  return null
}