"use client"

import { useMemo } from "react"

interface AnimatedTextProps {
  text: string
  delay?: number
}

export function AnimatedText({ text, delay = 0 }: AnimatedTextProps) {
  // Use a simple split('') for stable character mapping
  const chars = text.split('')

  return (
    <span
      className="font-normal leading-tight text-black inline-block"
      style={{ 
        perspective: 400, 
        fontFamily: "'ArabicRamadan', serif", 
        letterSpacing: "0.05em",
        whiteSpace: "pre-wrap" // Preserve spaces naturally
      }}
      suppressHydrationWarning
    >
      {chars.map((char, i) => {
        // Handle spaces with a non-breaking space for layout stability
        const displayChar = char === " " ? "\u00A0" : char

        return (
          <span
            key={`${char}-${i}`}
            className="dm-animated-char inline-block"
            style={{
              animationDelay: `${delay + i * 0.025}s`,
              fontFamily: "inherit",
              fontWeight: "inherit"
            }}
            aria-hidden="true"
          >
            {displayChar}
          </span>
        )
      })}
      <span className="sr-only">{text}</span>
    </span>
  )
}
