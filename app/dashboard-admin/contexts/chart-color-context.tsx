"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"

export interface ChartColors {
  primary: string
  secondary: string
  tertiary: string
  quaternary: string
  quinary: string
  barChart: { primary: string; secondary: string }
  lineChart: { primary: string; secondary: string }
  gridColor: string
  textColor: string
}

type FlatColorKey = "primary" | "secondary" | "tertiary" | "quaternary" | "quinary" | "gridColor" | "textColor"

export interface ChartColorContextType {
  colors: ChartColors
  updateColor: (key: FlatColorKey, value: string) => void
  resetColors: () => void
}

const defaultColors: ChartColors = {
  primary: "#3b82f6",
  secondary: "#8b5cf6",
  tertiary: "#ec4899",
  quaternary: "#f59e0b",
  quinary: "#10b981",
  barChart: { primary: "#465FFF", secondary: "#10B981" },
  lineChart: { primary: "#465FFF", secondary: "#9CB9FF" },
  gridColor: "#E5E7EB",
  textColor: "#6B7280",
}

const noopContext: ChartColorContextType = {
  colors: defaultColors,
  updateColor: () => {},
  resetColors: () => {},
}

const ChartColorContext = createContext<ChartColorContextType | undefined>(undefined)

export function ChartColorProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState<ChartColors>(defaultColors)

  const updateColor = useCallback((key: FlatColorKey, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetColors = useCallback(() => {
    setColors(defaultColors)
  }, [])

  return (
    <ChartColorContext.Provider value={{ colors, updateColor, resetColors }}>
      {children}
    </ChartColorContext.Provider>
  )
}

/** Safe outside `ChartColorProvider` (e.g. `/dashboard-admin/reports` prerender). */
export function useChartColors(): ChartColorContextType {
  const context = useContext(ChartColorContext)
  return context ?? noopContext
}
