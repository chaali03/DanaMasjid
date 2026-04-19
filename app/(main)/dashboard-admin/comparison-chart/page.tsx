"use client"

import dynamicImport from "next/dynamic"

const ComparisonChartPage = dynamicImport(
  () => import("../components/comparison-chart-page").then((mod) => mod.ComparisonChartPage),
  {
    ssr: false,
    loading: () => <div className="p-8 text-center">Memuat grafik...</div>
  }
)

export default function ComparisonChart() {
  return <ComparisonChartPage />
}
