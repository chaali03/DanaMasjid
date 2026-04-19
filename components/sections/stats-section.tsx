"use client"
import { useEffect, useState } from "react"
import { AnimatedSection } from "@/components/animations/animated-section"
import { motion } from "framer-motion"

function useCountUp(end: number, duration = 2000, suffix = "") {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, hasStarted])

  return { 
    value: hasStarted ? count + suffix : "0" + suffix, 
    start: () => setHasStarted(true), 
    hasStarted 
  }
}

export function StatsSection() {
  const transactions = useCountUp(25, 2500, "K+")
  const transparency = useCountUp(99, 2800, "%")
  const supply = useCountUp(15, 3000, "K+")

  const startCounters = () => {
    setTimeout(() => transactions.start(), 200)
    setTimeout(() => transparency.start(), 400)
    setTimeout(() => supply.start(), 600)
  }

  return (
    <AnimatedSection animation="slideRotate" className="py-24 px-6 bg-white" id="stats-section">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onViewportEnter={() => !transactions.hasStarted && startCounters()}
            className="text-center"
          >
            <p className="font-light text-foreground mb-2 text-6xl md:text-7xl leading-none">{transactions.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Transaksi Dana Tercatat</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-light text-foreground mb-2 text-6xl md:text-7xl leading-none">{transparency.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Terpublikasi kepada Masyarakat</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-light text-foreground mb-2 text-6xl md:text-7xl leading-none">{supply.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">rantai Supply Terlacak</p>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
