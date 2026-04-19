'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Palette } from 'lucide-react';
import { useChartColors } from '../contexts/chart-color-context';
import { toast } from 'sonner';

const presetColors = [
  { name: 'Blue', value: '#465FFF' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Green', value: '#10B981' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Indigo', value: '#6366F1' },
];

export function ChartColorPanel() {
  const {
    colors,
    updateLineChartPrimary,
    updateLineChartSecondary,
    updateBarChartPrimary,
    updateBarChartSecondary,
    updateGridColor,
    updateTextColor,
    resetColors,
    isPanelOpen,
    closePanel,
  } = useChartColors();

  const handleReset = () => {
    resetColors();
    toast.success('Warna chart berhasil direset');
  };

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
            className="fixed inset-0 z-[99998] bg-black/50 backdrop-blur-sm"
          />

          {/* Panel Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[99999] h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl dark:bg-gray-900"
            role="dialog"
            aria-labelledby="chart-color-panel-title"
            aria-modal="true"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2
                    id="chart-color-panel-title"
                    className="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    Kustomisasi Warna Chart
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Ubah warna chart sesuai keinginan Anda
                  </p>
                </div>
              </div>
              <button
                onClick={closePanel}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label="Tutup panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6 p-6">
              {/* Line Chart Colors */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Line Chart
                </h3>

                {/* Primary Color */}
                <div className="space-y-2">
                  <label
                    htmlFor="line-primary"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Warna Utama (Sales)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="line-primary"
                      type="color"
                      value={colors.lineChart.primary}
                      onChange={(e) => updateLineChartPrimary(e.target.value)}
                      className="h-12 w-20 cursor-pointer rounded-lg border-2 border-gray-200 dark:border-gray-700"
                    />
                    <input
                      type="text"
                      value={colors.lineChart.primary}
                      onChange={(e) => updateLineChartPrimary(e.target.value)}
                      className="flex-1 rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-sm font-mono text-gray-900 focus:border-purple-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="#465FFF"
                    />
                  </div>
                  {/* Preset Colors */}
                  <div className="grid grid-cols-5 gap-2">
                    {presetColors.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => updateLineChartPrimary(preset.value)}
                        className="h-10 w-full rounded-lg border-2 border-gray-200 transition-all hover:scale-110 dark:border-gray-700"
                        style={{ backgroundColor: preset.value }}
                        title={preset.name}
                        aria-label={`Set primary color to ${preset.name}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Secondary Color */}
                <div className="space-y-2">
                  <label
                    htmlFor="line-secondary"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Warna Sekunder (Revenue)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="line-secondary"
                      type="color"
                      value={colors.lineChart.secondary}
                      onChange={(e) => updateLineChartSecondary(e.target.value)}
                      className="h-12 w-20 cursor-pointer rounded-lg border-2 border-gray-200 dark:border-gray-700"
                    />
                    <input
                      type="text"
                      value={colors.lineChart.secondary}
                      onChange={(e) => updateLineChartSecondary(e.target.value)}
                      className="flex-1 rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-sm font-mono text-gray-900 focus:border-purple-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="#9CB9FF"
                    />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {presetColors.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => updateLineChartSecondary(preset.value)}
                        className="h-10 w-full rounded-lg border-2 border-gray-200 transition-all hover:scale-110 dark:border-gray-700"
                        style={{ backgroundColor: preset.value }}
                        title={preset.name}
                        aria-label={`Set secondary color to ${preset.name}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <hr className="border-gray-200 dark:border-gray-800" />

              {/* Bar Chart Colors */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Bar Chart & Comparison Chart
                </h3>

                {/* Primary Bar Color */}
                <div className="space-y-2">
                  <label
                    htmlFor="bar-primary"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Warna Bar Utama (Pemasukan)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="bar-primary"
                      type="color"
                      value={colors.barChart.primary}
                      onChange={(e) => updateBarChartPrimary(e.target.value)}
                      className="h-12 w-20 cursor-pointer rounded-lg border-2 border-gray-200 dark:border-gray-700"
                    />
                    <input
                      type="text"
                      value={colors.barChart.primary}
                      onChange={(e) => updateBarChartPrimary(e.target.value)}
                      className="flex-1 rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-sm font-mono text-gray-900 focus:border-purple-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="#465fff"
                    />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {presetColors.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => updateBarChartPrimary(preset.value)}
                        className="h-10 w-full rounded-lg border-2 border-gray-200 transition-all hover:scale-110 dark:border-gray-700"
                        style={{ backgroundColor: preset.value }}
                        title={preset.name}
                        aria-label={`Set bar primary color to ${preset.name}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Secondary Bar Color */}
                <div className="space-y-2">
                  <label
                    htmlFor="bar-secondary"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Warna Bar Sekunder (Pengeluaran)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="bar-secondary"
                      type="color"
                      value={colors.barChart.secondary}
                      onChange={(e) => updateBarChartSecondary(e.target.value)}
                      className="h-12 w-20 cursor-pointer rounded-lg border-2 border-gray-200 dark:border-gray-700"
                    />
                    <input
                      type="text"
                      value={colors.barChart.secondary}
                      onChange={(e) => updateBarChartSecondary(e.target.value)}
                      className="flex-1 rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-sm font-mono text-gray-900 focus:border-purple-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="#10B981"
                    />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {presetColors.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => updateBarChartSecondary(preset.value)}
                        className="h-10 w-full rounded-lg border-2 border-gray-200 transition-all hover:scale-110 dark:border-gray-700"
                        style={{ backgroundColor: preset.value }}
                        title={preset.name}
                        aria-label={`Set bar secondary color to ${preset.name}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <hr className="border-gray-200 dark:border-gray-800" />

              {/* Grid & Text Colors */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Grid & Text
                </h3>

                <div className="space-y-2">
                  <label
                    htmlFor="grid-color"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Warna Grid
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="grid-color"
                      type="color"
                      value={colors.gridColor}
                      onChange={(e) => updateGridColor(e.target.value)}
                      className="h-12 w-20 cursor-pointer rounded-lg border-2 border-gray-200 dark:border-gray-700"
                    />
                    <input
                      type="text"
                      value={colors.gridColor}
                      onChange={(e) => updateGridColor(e.target.value)}
                      className="flex-1 rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-sm font-mono text-gray-900 focus:border-purple-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="#E5E7EB"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="text-color"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Warna Text
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="text-color"
                      type="color"
                      value={colors.textColor}
                      onChange={(e) => updateTextColor(e.target.value)}
                      className="h-12 w-20 cursor-pointer rounded-lg border-2 border-gray-200 dark:border-gray-700"
                    />
                    <input
                      type="text"
                      value={colors.textColor}
                      onChange={(e) => updateTextColor(e.target.value)}
                      className="flex-1 rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-sm font-mono text-gray-900 focus:border-purple-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="#6B7280"
                    />
                  </div>
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
              <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                <p className="text-xs font-medium text-purple-900 dark:text-purple-300">
                  💡 Tips
                </p>
                <p className="mt-1 text-xs text-purple-700 dark:text-purple-400">
                  Warna yang Anda pilih akan tersimpan otomatis dan diterapkan ke semua chart di dashboard.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
