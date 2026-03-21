"use client"

import { useEffect } from "react"

export function TailadminIndexBootstrap() {
  useEffect(() => {
    // Dynamic import untuk menghindari SSR issues
    const initCharts = async () => {
      const [chart01Module, chart02Module, chart03Module, map01Module] = await Promise.all([
        import("@/dashboard-admin/_src_ref_tsx/js/components/charts/chart-01"),
        import("@/dashboard-admin/_src_ref_tsx/js/components/charts/chart-02"),
        import("@/dashboard-admin/_src_ref_tsx/js/components/charts/chart-03"),
        import("@/dashboard-admin/_src_ref_tsx/js/components/map-01")
      ])

      chart01Module.default()
      chart02Module.default()
      chart03Module.default()
      map01Module.default()
    }

    initCharts()
  }, [])

  return null
}

