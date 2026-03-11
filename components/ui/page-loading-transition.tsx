"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Lottie from "lottie-react"
import animationData from "@/public/lotie-loading.json"

export function PageLoadingTransition() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Trigger transition on route change
    setIsTransitioning(true)
    
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {isTransitioning && (
        <>
          <div className="fixed inset-0 z-[9998] bg-gray-500/50 backdrop-blur-sm transition-opacity duration-200" />

          <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none transition-all duration-300">
            <div className="flex flex-col items-center gap-6">
              <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  rendererSettings={{
                    preserveAspectRatio: "xMidYMid slice",
                    progressiveLoad: true,
                  }}
                />
              </div>
              <div className="text-gray-600 text-center">
                <div className="text-xl font-semibold">Loading...</div>
                <div className="text-base mt-2">Memuat halaman...</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
