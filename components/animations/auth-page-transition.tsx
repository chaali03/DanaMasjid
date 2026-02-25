"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AuthPageTransitionProps {
  children: ReactNode
  direction?: "left" | "right"
}

export default function AuthPageTransition({ children, direction = "right" }: AuthPageTransitionProps) {
  const variants = {
    initial: {
      x: direction === "right" ? 100 : -100,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: direction === "right" ? -100 : 100,
      opacity: 0
    }
  }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  )
}
