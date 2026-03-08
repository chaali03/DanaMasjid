"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export function PageLoadingTransition() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    // Load Lottie animation once with lazy loading
    const loadAnimation = async () => {
      const data = await import("@/lotie/loading screen.json")
      setAnimationData(data.default)
    }
    loadAnimation()
  }, [])

  useEffect(() => {
    // Trigger transition on route change
    setIsTransitioning(true)
    
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <>
          {/* Gray overlay on entire page */}
          <motion.div
            key="gray-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-gray-500/50 backdrop-blur-sm"
          />
          
          {/* Loading animation */}
          <motion.div
            key="loading-animation"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          >
            <div className="text-center">
              {/* Lottie Animation */}
              {animationData ? (
                <div className="w-[700px] h-[700px] max-w-[85vw] max-h-[85vh] mx-auto">
                  <Lottie 
                    animationData={animationData} 
                    loop={true}
                    rendererSettings={{
                      preserveAspectRatio: 'xMidYMid slice',
                      progressiveLoad: true
                    }}
                  />
                </div>
              ) : (
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
