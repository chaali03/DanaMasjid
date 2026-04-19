"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { ReadingGuide } from "../components/reading-guide"

type FontSize = "small" | "medium" | "large" | "x-large"
type SpacingMode = "compact" | "comfortable" | "spacious"
type ColorBlindMode = "none" | "protanopia" | "deuteranopia" | "tritanopia"
type NavigationPosition = "sidebar-left" | "sidebar-right" | "top-navbar" | "bottom-navbar"

interface AccessibilitySettings {
  fontSize: FontSize
  spacingMode: SpacingMode
  colorBlindMode: ColorBlindMode
  reducedMotion: boolean
  grayscale: boolean
  lineHeight: number
  letterSpacing: number
  navigationPosition: NavigationPosition
}

interface AccessibilityContextType {
  settings: AccessibilitySettings
  updateFontSize: (size: FontSize) => void
  updateSpacingMode: (mode: SpacingMode) => void
  updateColorBlindMode: (mode: ColorBlindMode) => void
  updateLineHeight: (height: number) => void
  updateLetterSpacing: (spacing: number) => void
  toggleReducedMotion: () => void
  toggleGrayscale: () => void
  updateNavigationPosition: (position: NavigationPosition) => void
  resetSettings: () => void
  isPanelOpen: boolean
  openPanel: () => void
  closePanel: () => void
  togglePanel: () => void
}

const defaultSettings: AccessibilitySettings = {
  fontSize: "medium",
  spacingMode: "comfortable",
  colorBlindMode: "none",
  reducedMotion: false,
  grayscale: false,
  lineHeight: 1.5,
  letterSpacing: 0,
  navigationPosition: "sidebar-left",
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(
  undefined
)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("accessibility-settings")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Merge with defaults to ensure all properties exist
        setSettings({
          ...defaultSettings,
          ...parsed,
          lineHeight: parsed.lineHeight ?? defaultSettings.lineHeight,
          letterSpacing: parsed.letterSpacing ?? defaultSettings.letterSpacing,
          navigationPosition: parsed.navigationPosition ?? defaultSettings.navigationPosition,
        })
      } catch (e) {
        console.error("Failed to parse accessibility settings", e)
      }
    }

    // Check system preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) {
      setSettings((prev) => ({ ...prev, reducedMotion: true }))
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("accessibility-settings", JSON.stringify(settings))
    applySettings(settings)
  }, [settings])

  // Apply blur to body when panel is open
  useEffect(() => {
    if (isPanelOpen) {
      document.body.classList.add("accessibility-panel-open")
    } else {
      document.body.classList.remove("accessibility-panel-open")
    }
    
    return () => {
      document.body.classList.remove("accessibility-panel-open")
    }
  }, [isPanelOpen])

  const applySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement

    // Remove all font size classes first
    root.classList.remove('text-size-small', 'text-size-medium', 'text-size-large')
    
    // Add appropriate font size class
    root.classList.add(`text-size-${settings.fontSize}`)

    // Line height
    root.style.setProperty("--line-height", settings.lineHeight.toString())

    // Letter spacing
    root.style.setProperty("--letter-spacing", `${settings.letterSpacing}px`)

    // Spacing
    const spacingMap = {
      compact: "0.75",
      comfortable: "1",
      spacious: "1.25",
    }
    root.style.setProperty("--spacing-scale", spacingMap[settings.spacingMode])

    // Color blind mode
    root.setAttribute("data-colorblind-mode", settings.colorBlindMode)

    // Grayscale
    if (settings.grayscale) {
      root.classList.add("grayscale-mode")
    } else {
      root.classList.remove("grayscale-mode")
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add("reduce-motion")
    } else {
      root.classList.remove("reduce-motion")
    }

    // Navigation position
    root.setAttribute("data-navigation-position", settings.navigationPosition)
  }

  const updateFontSize = (size: FontSize) => {
    setSettings((prev) => ({ ...prev, fontSize: size }))
  }

  const updateSpacingMode = (mode: SpacingMode) => {
    setSettings((prev) => ({ ...prev, spacingMode: mode }))
  }

  const updateColorBlindMode = (mode: ColorBlindMode) => {
    setSettings((prev) => ({ ...prev, colorBlindMode: mode }))
  }

  const updateLineHeight = (height: number) => {
    setSettings((prev) => ({ ...prev, lineHeight: height }))
  }

  const updateLetterSpacing = (spacing: number) => {
    setSettings((prev) => ({ ...prev, letterSpacing: spacing }))
  }

  const toggleReducedMotion = () => {
    setSettings((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }))
  }

  const toggleGrayscale = () => {
    setSettings((prev) => ({ ...prev, grayscale: !prev.grayscale }))
  }

  const updateNavigationPosition = (position: NavigationPosition) => {
    setSettings((prev) => ({ ...prev, navigationPosition: position }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  const openPanel = () => setIsPanelOpen(true)
  const closePanel = () => setIsPanelOpen(false)
  const togglePanel = () => setIsPanelOpen((prev) => !prev)

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateFontSize,
        updateSpacingMode,
        updateColorBlindMode,
        updateLineHeight,
        updateLetterSpacing,
        toggleReducedMotion,
        toggleGrayscale,
        updateNavigationPosition,
        resetSettings,
        isPanelOpen,
        openPanel,
        closePanel,
        togglePanel,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider")
  }
  return context
}
