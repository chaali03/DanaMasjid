"use client"

import type { ReactNode } from "react"
import PartialsPreloader from "@/dashboard-admin/_src_ref_tsx/partials/preloader"
import PartialsSidebar from "@/dashboard-admin/_src_ref_tsx/partials/sidebar"
import PartialsOverlay from "@/dashboard-admin/_src_ref_tsx/partials/overlay"
import PartialsHeader from "@/dashboard-admin/_src_ref_tsx/partials/header"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="dark:bg-gray-900">
      <PartialsPreloader />
      <div className="flex h-screen overflow-hidden">
        <PartialsSidebar />
        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          <PartialsOverlay />
          <PartialsHeader />
          <main>
            <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

