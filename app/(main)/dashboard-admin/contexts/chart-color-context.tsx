"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ChartColors {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  quinary: string;
  barChart: {
    primary: string;
    secondary: string;
  };
  lineChart: {
    primary: string;
    secondary: string;
  };
}

interface ChartColorContextType {
  colors: ChartColors;
  updateColor: (key: keyof ChartColors, value: string) => void;
  resetColors: () => void;
}

const defaultColors: ChartColors = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  tertiary: '#ec4899',
  quaternary: '#f59e0b',
  quinary: '#10b981',
  barChart: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
  },
  lineChart: {
    primary: '#10b981',
    secondary: '#f59e0b',
  },
};

const noopContext: ChartColorContextType = {
  colors: defaultColors,
  updateColor: () => {},
  resetColors: () => {},
}

const ChartColorContext = createContext<ChartColorContextType | undefined>(undefined);

export function ChartColorProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState<ChartColors>(defaultColors);

  const updateColor = useCallback((key: keyof ChartColors, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetColors = useCallback(() => {
    setColors(defaultColors);
  }, []);

  return (
    <ChartColorContext.Provider value={{ colors, updateColor, resetColors }}>
      {children}
    </ChartColorContext.Provider>
  );
}

/** Safe outside `ChartColorProvider` (e.g. `/dashboard-admin/reports` prerender). */
export function useChartColors(): ChartColorContextType {
  const context = useContext(ChartColorContext);
  return context ?? noopContext
}
