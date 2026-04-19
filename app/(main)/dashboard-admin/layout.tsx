"use client"

import type { ReactNode } from "react"
import "./dashboard-component/src/index.css"
import "./styles/accessibility.css"
import "flatpickr/dist/flatpickr.min.css"
import "swiper/css/bundle"
import { AccessibilityProvider } from "./contexts/accessibility-context"
import { ChartColorProvider } from "./contexts/chart-color-context"
import { ThemeProvider } from "@/app/dashboard-admin/dashboard-component/src/context/ThemeContext"
import AppLayout from "@/app/dashboard-admin/dashboard-component/src/layout/AppLayout"
import { Toaster } from "sonner"
import { ColorBlindFilters } from "./components/color-blind-filters"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <ChartColorProvider>
          <ColorBlindFilters />
          <AppLayout>{children}</AppLayout>
          <Toaster position="top-right" richColors />
        </ChartColorProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  )
}
