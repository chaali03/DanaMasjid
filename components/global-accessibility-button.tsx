'use client';

import { Settings } from 'lucide-react';
import { useGlobalAccessibility } from './providers/global-accessibility-provider';
import { motion } from 'framer-motion';

export function GlobalAccessibilityButton() {
  const { togglePanel } = useGlobalAccessibility();

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      onClick={togglePanel}
      className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50 transition-all hover:scale-110 hover:shadow-xl hover:shadow-blue-500/60 focus:outline-none focus:ring-4 focus:ring-blue-500/50 dark:from-blue-500 dark:to-cyan-500"
      aria-label="Buka pengaturan aksesibilitas (Alt + A)"
      title="Pengaturan Aksesibilitas (Alt + A)"
    >
      <Settings className="h-6 w-6 animate-spin-slow" />
      <span className="sr-only">Pengaturan Aksesibilitas</span>
    </motion.button>
  );
}
