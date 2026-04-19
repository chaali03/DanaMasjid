"use client"

import { Suspense, lazy } from "react"
import { Palette } from "lucide-react"
import { ChartColorPanel } from "./chart-color-panel"
import { useChartColors } from "../contexts/chart-color-context"
import { Button } from "@/components/ui/button"

// Import directly instead of lazy loading to avoid build errors
import { ModernChart } from "./modern-chart"

const ChartSkeleton = () => (
  <div className="rounded-lg border bg-card p-6 dark:bg-gray-800 dark:border-gray-700 animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
    <div className="h-[400px] bg-gray-100 dark:bg-gray-800 rounded"></div>
  </div>
)

// Data perbandingan
const comparisonData = [
  { name: "Jan", pemasukan: 15500000, pengeluaran: 12000000 },
  { name: "Feb", pemasukan: 18200000, pengeluaran: 13500000 },
  { name: "Mar", pemasukan: 16800000, pengeluaran: 14200000 },
  { name: "Apr", pemasukan: 19500000, pengeluaran: 15800000 },
  { name: "Mei", pemasukan: 17300000, pengeluaran: 13900000 },
  { name: "Jun", pemasukan: 18800000, pengeluaran: 14600000 },
  { name: "Jul", pemasukan: 20100000, pengeluaran: 15200000 },
  { name: "Agu", pemasukan: 19800000, pengeluaran: 16100000 },
  { name: "Sep", pemasukan: 21500000, pengeluaran: 15900000 },
  { name: "Okt", pemasukan: 22300000, pengeluaran: 17200000 },
  { name: "Nov", pemasukan: 20900000, pengeluaran: 16800000 },
  { name: "Des", pemasukan: 23500000, pengeluaran: 18500000 },
]

export function ComparisonChartPage() {
  const { colors, openPanel } = useChartColors()

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header with Customize Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Chart Perbandingan Pemasukan vs Pengeluaran
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Visualisasi perbandingan pemasukan dan pengeluaran masjid
          </p>
        </div>
        
        {/* Customize Colors Button */}
        <Button
          onClick={openPanel}
          variant="outline"
          className="gap-2 whitespace-nowrap"
        >
          <Palette className="h-4 w-4" />
          Kustomisasi Warna
        </Button>
      </div>

      {/* Color Customization Panel (Modal) */}
      <ChartColorPanel />

      {/* Comparison Chart */}
      <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
            Perbandingan Tahunan
          </h2>
          <p className="text-sm text-muted-foreground">
            Data perbandingan pemasukan dan pengeluaran selama 12 bulan terakhir
          </p>
        </div>
        
        <Suspense fallback={<ChartSkeleton />}>
          <div className="h-[400px]">
            <ModernChart
              key={`comparison-${colors.barChart.primary}-${colors.barChart.secondary}`}
              data={comparisonData}
              type="bar"
              dataKey="pemasukan"
              secondaryDataKey="pengeluaran"
              xAxisKey="name"
              title=""
              color={colors.barChart.primary}
              secondaryColor={colors.barChart.secondary}
              height={400}
            />
          </div>
        </Suspense>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded" style={{ backgroundColor: colors.barChart.primary }}></div>
            <span className="text-sm font-medium text-muted-foreground">Pemasukan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded" style={{ backgroundColor: colors.barChart.secondary }}></div>
            <span className="text-sm font-medium text-muted-foreground">Pengeluaran</span>
          </div>
        </div>
      </div>
    </div>
  )
}
