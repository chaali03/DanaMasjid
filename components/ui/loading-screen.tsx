"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    // Load Lottie animation
    import("@/lotie/loading screen.json").then((data) => {
      setAnimationData(data.default)
    })

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center"
        >
          <div className="text-center">
            {/* Lottie Animation */}
            {animationData && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[800px] h-[800px] max-w-[90vw] max-h-[90vh] mx-auto"
              >
                <Lottie animationData={animationData} loop={true} />
              </motion.div>
            )}

            {/* Loading Text */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-bold text-white mb-4"
            >
              DanaMasjid
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
