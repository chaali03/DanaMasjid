"use client"

import { Settings } from "lucide-react"
import { useAccessibility } from "../contexts/accessibility-context"

export function AccessibilityButton() {
  const { togglePanel } = useAccessibility()

  const handleClick = () => {
    console.log("Accessibility button clicked!")
    togglePanel()
  }

  return (
    <button
      onClick={handleClick}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors lg:h-11 lg:w-11"
      aria-label="Pengaturan Aksesibilitas"
      title="Aksesibilitas"
    >
      <Settings className="h-5 w-5" />
    </button>
  )
}
