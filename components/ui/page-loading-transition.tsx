"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export function PageLoadingTransition() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    // Trigger transition on route change
    setIsTransitioning(true)
    
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    if (!isTransitioning || animationData) return
    let cancelled = false
    import("@/lotie/loading screen.json").then((data) => {
      if (!cancelled) setAnimationData(data.default)
    })
    return () => {
      cancelled = true
    }
  }, [isTransitioning, animationData])

  return (
    <>
      {isTransitioning && (
        <>
          <div className="fixed inset-0 z-[9998] bg-gray-500/50 backdrop-blur-sm transition-opacity duration-200" />

          <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none transition-all duration-300">
            <div className="text-center">
              {animationData ? (
                <div className="w-[700px] h-[700px] max-w-[85vw] max-h-[85vh] mx-auto">
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    rendererSettings={{
                      preserveAspectRatio: "xMidYMid slice",
                      progressiveLoad: true,
                    }}
                  />
                </div>
              ) : (
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
