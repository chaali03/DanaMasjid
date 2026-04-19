'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useFocusRing } from '@react-aria/focus';

type FontSize = 'small' | 'medium' | 'large' | 'x-large';
type ContrastMode = 'normal' | 'high';
type SpacingMode = 'compact' | 'comfortable' | 'spacious';
type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

interface GlobalAccessibilitySettings {
  fontSize: FontSize;
  contrastMode: ContrastMode;
  spacingMode: SpacingMode;
  colorBlindMode: ColorBlindMode;
  reducedMotion: boolean;
  lineHeight: number;
  letterSpacing: number;
  focusIndicators: boolean;
  keyboardNavigation: boolean;
  screenReaderOptimized: boolean;
}

interface GlobalAccessibilityContextType {
  settings: GlobalAccessibilitySettings;
  updateFontSize: (size: FontSize) => void;
  updateContrastMode: (mode: ContrastMode) => void;
  updateSpacingMode: (mode: SpacingMode) => void;
  updateColorBlindMode: (mode: ColorBlindMode) => void;
  updateLineHeight: (height: number) => void;
  updateLetterSpacing: (spacing: number) => void;
  toggleReducedMotion: () => void;
  toggleFocusIndicators: () => void;
  toggleKeyboardNavigation: () => void;
  toggleScreenReaderOptimized: () => void;
  resetSettings: () => void;
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
}

const defaultSettings: GlobalAccessibilitySettings = {
  fontSize: 'medium',
  contrastMode: 'normal',
  spacingMode: 'comfortable',
  colorBlindMode: 'none',
  reducedMotion: false,
  lineHeight: 1.5,
  letterSpacing: 0,
  focusIndicators: true,
  keyboardNavigation: true,
  screenReaderOptimized: false,
};

const GlobalAccessibilityContext = createContext<GlobalAccessibilityContextType | undefined>(
  undefined
);

export function GlobalAccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<GlobalAccessibilitySettings>(defaultSettings);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { isFocusVisible } = useFocusRing();

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('global-accessibility-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({
          ...defaultSettings,
          ...parsed,
        });
      } catch (e) {
        console.error('Failed to parse global accessibility settings', e);
      }
    }

    // Check system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches;
    
    if (prefersReducedMotion || prefersHighContrast) {
      setSettings((prev) => ({
        ...prev,
        reducedMotion: prefersReducedMotion || prev.reducedMotion,
        contrastMode: prefersHighContrast ? 'high' : prev.contrastMode,
      }));
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('global-accessibility-settings', JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  // Apply blur to body when panel is open
  useEffect(() => {
    if (isPanelOpen) {
      document.body.classList.add('global-accessibility-panel-open');
    } else {
      document.body.classList.remove('global-accessibility-panel-open');
    }

    return () => {
      document.body.classList.remove('global-accessibility-panel-open');
    };
  }, [isPanelOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + A to open accessibility panel
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        togglePanel();
      }
      
      // Alt + + to increase font size
      if (e.altKey && e.key === '+') {
        e.preventDefault();
        const sizes: FontSize[] = ['small', 'medium', 'large', 'x-large'];
        const currentIndex = sizes.indexOf(settings.fontSize);
        if (currentIndex < sizes.length - 1) {
          updateFontSize(sizes[currentIndex + 1]);
        }
      }
      
      // Alt + - to decrease font size
      if (e.altKey && e.key === '-') {
        e.preventDefault();
        const sizes: FontSize[] = ['small', 'medium', 'large', 'x-large'];
        const currentIndex = sizes.indexOf(settings.fontSize);
        if (currentIndex > 0) {
          updateFontSize(sizes[currentIndex - 1]);
        }
      }
      
      // Alt + C to toggle high contrast
      if (e.altKey && e.key === 'c') {
        e.preventDefault();
        updateContrastMode(settings.contrastMode === 'normal' ? 'high' : 'normal');
      }
    };

    if (settings.keyboardNavigation) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [settings]);

  const applySettings = (settings: GlobalAccessibilitySettings) => {
    const root = document.documentElement;

    // Font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'x-large': '20px',
    };
    root.style.setProperty('--global-base-font-size', fontSizeMap[settings.fontSize]);

    // Line height
    root.style.setProperty('--global-line-height', settings.lineHeight.toString());

    // Letter spacing
    root.style.setProperty('--global-letter-spacing', `${settings.letterSpacing}px`);

    // Spacing
    const spacingMap = {
      compact: '0.75',
      comfortable: '1',
      spacious: '1.25',
    };
    root.style.setProperty('--global-spacing-scale', spacingMap[settings.spacingMode]);

    // Contrast
    if (settings.contrastMode === 'high') {
      root.classList.add('global-high-contrast');
    } else {
      root.classList.remove('global-high-contrast');
    }

    // Color blind mode
    root.setAttribute('data-global-colorblind-mode', settings.colorBlindMode);

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('global-reduce-motion');
    } else {
      root.classList.remove('global-reduce-motion');
    }

    // Focus indicators
    if (settings.focusIndicators) {
      root.classList.add('global-focus-indicators');
    } else {
      root.classList.remove('global-focus-indicators');
    }

    // Screen reader optimized
    if (settings.screenReaderOptimized) {
      root.classList.add('global-screen-reader-optimized');
    } else {
      root.classList.remove('global-screen-reader-optimized');
    }

    // Announce changes to screen readers
    announceToScreenReader(`Pengaturan aksesibilitas diperbarui`);
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  const updateFontSize = (size: FontSize) => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
    announceToScreenReader(`Ukuran teks diubah ke ${size}`);
  };

  const updateContrastMode = (mode: ContrastMode) => {
    setSettings((prev) => ({ ...prev, contrastMode: mode }));
    announceToScreenReader(`Mode kontras diubah ke ${mode === 'high' ? 'tinggi' : 'normal'}`);
  };

  const updateSpacingMode = (mode: SpacingMode) => {
    setSettings((prev) => ({ ...prev, spacingMode: mode }));
    announceToScreenReader(`Jarak elemen diubah ke ${mode}`);
  };

  const updateColorBlindMode = (mode: ColorBlindMode) => {
    setSettings((prev) => ({ ...prev, colorBlindMode: mode }));
    announceToScreenReader(`Mode buta warna diubah ke ${mode === 'none' ? 'tidak ada' : mode}`);
  };

  const updateLineHeight = (height: number) => {
    setSettings((prev) => ({ ...prev, lineHeight: height }));
  };

  const updateLetterSpacing = (spacing: number) => {
    setSettings((prev) => ({ ...prev, letterSpacing: spacing }));
  };

  const toggleReducedMotion = () => {
    setSettings((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }));
    announceToScreenReader(
      `Animasi ${settings.reducedMotion ? 'diaktifkan' : 'dinonaktifkan'}`
    );
  };

  const toggleFocusIndicators = () => {
    setSettings((prev) => ({ ...prev, focusIndicators: !prev.focusIndicators }));
  };

  const toggleKeyboardNavigation = () => {
    setSettings((prev) => ({ ...prev, keyboardNavigation: !prev.keyboardNavigation }));
  };

  const toggleScreenReaderOptimized = () => {
    setSettings((prev) => ({ ...prev, screenReaderOptimized: !prev.screenReaderOptimized }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    announceToScreenReader('Pengaturan aksesibilitas direset ke default');
  };

  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);
  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  return (
    <GlobalAccessibilityContext.Provider
      value={{
        settings,
        updateFontSize,
        updateContrastMode,
        updateSpacingMode,
        updateColorBlindMode,
        updateLineHeight,
        updateLetterSpacing,
        toggleReducedMotion,
        toggleFocusIndicators,
        toggleKeyboardNavigation,
        toggleScreenReaderOptimized,
        resetSettings,
        isPanelOpen,
        openPanel,
        closePanel,
        togglePanel,
      }}
    >
      {children}
    </GlobalAccessibilityContext.Provider>
  );
}

export function useGlobalAccessibility() {
  const context = useContext(GlobalAccessibilityContext);
  if (!context) {
    throw new Error('useGlobalAccessibility must be used within GlobalAccessibilityProvider');
  }
  return context;
}
