"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Type,
  Maximize2,
  Palette,
  Minimize2,
  RotateCcw,
  X,
  LayoutDashboard,
  Settings,
  Check,
} from "lucide-react"
import { useAccessibility } from "../contexts/accessibility-context"
import { toast } from "sonner"

export function AccessibilityPanel() {
  const {
    settings,
    updateFontSize,
    updateSpacingMode,
    updateColorBlindMode,
    updateLineHeight,
    updateLetterSpacing,
    toggleReducedMotion,
    updateNavigationPosition,
    resetSettings,
    isPanelOpen,
    closePanel,
  } = useAccessibility()

  const handleReset = () => {
    resetSettings()
    toast.success("Pengaturan berhasil direset")
  }

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
            className="fixed inset-0 z-[99998]"
            style={{ 
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(20px) saturate(180%)', 
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          />

          {/* Panel Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[99999] h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl dark:bg-gray-900"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Pengaturan Aksesibilitas
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Sesuaikan tampilan sesuai kebutuhan Anda
                  </p>
                </div>
              </div>
              <button
                onClick={closePanel}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6 p-6">
              {/* Font Size */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Ukuran Teks
                  </label>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: "small", label: "A" },
                    { value: "medium", label: "A" },
                    { value: "large", label: "A" },
                    { value: "x-large", label: "A" },
                  ].map((size, idx) => (
                    <button
                      key={size.value}
                      onClick={() => updateFontSize(size.value as any)}
                      className={`relative flex h-12 items-center justify-center rounded-lg border-2 font-semibold transition-all ${
                        settings.fontSize === size.value
                          ? "border-blue-600 bg-blue-50 text-blue-600 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600"
                      }`}
                      style={{ fontSize: `${14 + idx * 2}px` }}
                    >
                      {size.label}
                      {settings.fontSize === size.value && (
                        <Check className="absolute right-1 top-1 h-3 w-3" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200 dark:border-gray-800" />

              {/* Line Height */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Tinggi Baris
                    </label>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {settings.lineHeight.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.1"
                  value={settings.lineHeight}
                  onChange={(e) => updateLineHeight(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <hr className="border-gray-200 dark:border-gray-800" />

              {/* Letter Spacing */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Jarak Huruf
                    </label>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {settings.letterSpacing}px
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.5"
                  value={settings.letterSpacing}
                  onChange={(e) => updateLetterSpacing(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <hr className="border-gray-200 dark:border-gray-800" />

              {/* Spacing Mode */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Maximize2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Jarak Elemen
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "compact", label: "Kompak" },
                    { value: "comfortable", label: "Nyaman" },
                    { value: "spacious", label: "Luas" },
                  ].map((spacing) => (
                    <button
                      key={spacing.value}
                      onClick={() => updateSpacingMode(spacing.value as any)}
                      className={`rounded-lg border-2 px-3 py-2 text-xs font-medium transition-all ${
                        settings.spacingMode === spacing.value
                          ? "border-blue-600 bg-blue-50 text-blue-600 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      {spacing.label}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200 dark:border-gray-800" />

              {/* Color Blind Mode */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Mode Buta Warna
                  </label>
                </div>
                <select
                  value={settings.colorBlindMode}
                  onChange={(e) => updateColorBlindMode(e.target.value as any)}
                  className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors hover:border-gray-300 focus:border-blue-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:focus:border-blue-500"
                >
                  <option value="none">Tidak Ada</option>
                  <option value="protanopia">Protanopia (Merah-Hijau)</option>
                  <option value="deuteranopia">Deuteranopia (Hijau-Merah)</option>
                  <option value="tritanopia">Tritanopia (Biru-Kuning)</option>
                </select>
              </div>

              <hr className="border-gray-200 dark:border-gray-800" />

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Minimize2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Kurangi Animasi
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Nonaktifkan efek gerakan
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleReducedMotion}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.reducedMotion
                      ? "bg-blue-600 dark:bg-blue-500"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.reducedMotion ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <hr className="border-gray-200 dark:border-gray-800" />

              {/* Navigation Position */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Posisi Navigasi
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateNavigationPosition("sidebar-left")}
                    className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
                      settings.navigationPosition === "sidebar-left"
                        ? "border-blue-600 bg-blue-50 text-blue-600 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    Sidebar Kiri
                  </button>
                  <button
                    onClick={() => updateNavigationPosition("sidebar-right")}
                    className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
                      settings.navigationPosition === "sidebar-right"
                        ? "border-blue-600 bg-blue-50 text-blue-600 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    Sidebar Kanan
                  </button>
                </div>
              </div>

              <hr className="border-gray-200 dark:border-gray-800" />

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <RotateCcw className="h-4 w-4" />
                Reset ke Default
              </button>

              {/* Info Box */}
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <p className="text-xs font-medium text-blue-900 dark:text-blue-300">
                  💡 Tips
                </p>
                <p className="mt-1 text-xs text-blue-700 dark:text-blue-400">
                  Semua pengaturan disimpan otomatis dan akan tetap ada saat Anda kembali.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
