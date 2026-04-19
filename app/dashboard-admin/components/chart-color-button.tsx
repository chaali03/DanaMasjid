"use client"

import { Palette } from "lucide-react"

/**
 * TailAdmin demo pages under `app/dashboard-admin` mount outside the main dashboard
 * chart-color provider. This control is a no-op placeholder so builds resolve.
 */
export function ChartColorButton() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:border-gray-700 dark:bg-gray-800"
      disabled
      title="Kustomisasi warna chart tersedia dari layout dashboard admin utama"
      aria-label="Kustomisasi warna chart (tidak tersedia di halaman demo ini)"
    >
      <Palette className="h-4 w-4" />
      <span>Kustomisasi Warna</span>
    </button>
  )
}
