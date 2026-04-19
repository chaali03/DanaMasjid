"use client"

import dynamicImport from "next/dynamic"

const ModernDashboard = dynamicImport(
  () => import("./components/modern-dashboard").then((mod) => mod.ModernDashboard),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground animate-pulse font-medium">Memuat Dashboard...</p>
        </div>
      </div>
    )
  }
)

export default function DashboardPage() {
  return <ModernDashboard />
}
