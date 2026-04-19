'use client';

import { Palette } from 'lucide-react';
import { useChartColors } from '../contexts/chart-color-context';

export function ChartColorButton() {
  const { togglePanel } = useChartColors();

  return (
    <button
      onClick={togglePanel}
      className="flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-purple-600 hover:bg-purple-50 hover:text-purple-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-purple-500 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
      aria-label="Kustomisasi warna chart"
      title="Kustomisasi Warna Chart"
    >
      <Palette className="h-4 w-4" />
      <span>Kustomisasi Warna</span>
    </button>
  );
}
