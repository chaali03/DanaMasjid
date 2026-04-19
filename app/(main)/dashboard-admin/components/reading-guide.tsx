"use client"

import { useEffect, useState } from "react"
import { useAccessibility } from "../contexts/accessibility-context"

export function ReadingGuide() {
  const { settings } = useAccessibility()
  const [top, setTop] = useState(-100)

  useEffect(() => {
    if (!settings.readingGuide) return

    const handleMouseMove = (e: MouseEvent) => {
      setTop(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [settings.readingGuide])

  if (!settings.readingGuide) return null

  return (
    <div
      id="reading-guide"
      style={{ top: `${top}px` }}
      aria-hidden="true"
    />
  )
}
