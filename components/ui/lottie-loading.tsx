"use client";

import { memo, useState, useEffect, useRef } from "react";
import { markPageLoadingDone } from "@/lib/page-loading-done";
import dynamic from "next/dynamic";

// Dynamic import DotLottieReact to prevent SSR issues
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

// Optimized Lottie Player with DotLottie support
const LottiePlayer = memo(function LottiePlayer() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    // Show spinner only after 800ms delay if Lottie is not loaded
    const spinnerTimer = setTimeout(() => {
      if (!isLoaded) {
        setShowSpinner(true);
      }
    }, 800);

    return () => clearTimeout(spinnerTimer);
  }, [isLoaded]);

  // Only show spinner if loading takes too long
  if (!isLoaded && showSpinner) {
    return (
      <div className="w-36 h-36 md:w-40 md:h-40 flex items-center justify-center">
        <div className="relative w-20 h-20 md:w-24 md:h-24">
          <div 
            className="absolute inset-0 rounded-full border-4 border-yellow-200 animate-spin" 
            style={{ 
              borderTopColor: '#EAB308',
              borderRightColor: '#FBBF24',
              willChange: 'transform'
            }}>
          </div>
          <div 
            className="absolute inset-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 animate-pulse"
            style={{ willChange: 'opacity' }}>
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <img 
              src="/images/loading/mosque.webp" 
              alt="Mosque"
              className="w-full h-full object-contain drop-shadow-lg"
              loading="eager"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-72 h-72 md:w-96 md:h-96 lottie-smooth-container" 
      style={{ 
        willChange: 'transform', 
        transform: 'translateZ(0)',
        perspective: '1000px',
      }}
    >
      <DotLottieReact
        src="/loading.lottie"
        loop
        autoplay
        speed={1}
        onLoad={() => setIsLoaded(true)}
        className={isLoaded ? 'lottie-loaded' : ''}
        style={{ 
          width: "100%", 
          height: "100%",
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
        renderConfig={{
          devicePixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 2,
          freezeOnOffscreen: true,
          hideOnTransparent: true,
        }}
        backgroundColor="transparent"
      />
    </div>
  );
});

interface LottieLoadingProps {
  className?: string;
  initialLoad?: boolean;
  hideText?: boolean;
}

export const LottieLoading = memo(function LottieLoading({
  className = "h-screen bg-white flex items-center justify-center",
  initialLoad = false,
  hideText = false,
}: LottieLoadingProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [visible, setVisible] = useState(true);
  const timersRef = useRef<{ fade?: NodeJS.Timeout; hide?: NodeJS.Timeout }>({});

  useEffect(() => {
    if (!initialLoad) return;
    
    document.body.classList.add("loading-active");

    // Optimized page load detection with faster checks
    const checkAndHide = () => {
      let attempts = 0
      const maxAttempts = 100 // Maximum 10 seconds for initial load
      
      const checkInterval = setInterval(() => {
        attempts++
        
        // Check if everything is ready
        const isDocumentComplete = document.readyState === 'complete'
        const hasContent = document.body.children.length > 1 // More than just the loader
        
        // Add about-us-active as an alternative to stop loading
        const isAboutUsActive = document.body.classList.contains('about-us-active') || 
                                document.documentElement.classList.contains('about-us-active')

        const noLoadingElements = document.querySelectorAll('[data-loading="true"]').length === 0
        
        if ((isDocumentComplete && hasContent && noLoadingElements) || (attempts > 5 && isAboutUsActive)) {
          clearInterval(checkInterval)
          
          // Faster fade out with GPU acceleration
          timersRef.current.fade = setTimeout(() => setFadeOut(true), 200);
          timersRef.current.hide = setTimeout(() => {
            setVisible(false);
            document.body.classList.remove("loading-active");
            markPageLoadingDone();
          }, 400);
        } else if (attempts >= maxAttempts) {
          // Fallback after 10 seconds
          clearInterval(checkInterval)
          
          timersRef.current.fade = setTimeout(() => setFadeOut(true), 100);
          timersRef.current.hide = setTimeout(() => {
            setVisible(false);
            document.body.classList.remove("loading-active");
            markPageLoadingDone();
          }, 300);
        }
      }, 100) // Check every 100ms
      
      return () => clearInterval(checkInterval)
    };

    // Start checking after small delay for React to initialize
    const initTimer = setTimeout(checkAndHide, 200);

    return () => {
      clearTimeout(initTimer);
      if (timersRef.current.fade) clearTimeout(timersRef.current.fade);
      if (timersRef.current.hide) clearTimeout(timersRef.current.hide);
    };
  }, [initialLoad]);

  if (initialLoad) {
    if (!visible) return null;
    return (
      <div
        id="initial-loader-overlay"
        className="fixed inset-0 z-[99999] bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center"
        style={{ 
          opacity: fadeOut ? 0 : 1, 
          pointerEvents: fadeOut ? "none" : "all",
          transition: 'opacity 0.3s ease-out',
          willChange: 'opacity',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="flex flex-col items-center gap-5">
          <LottiePlayer />
          <div className="text-center loading-text-fixed">
            <div className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
              PARANTARA
            </div>
            <div className="text-sm text-slate-700 font-medium">Platform Transparansi Blockchain</div>
            <div className="text-xs text-slate-600 mt-2">Memuat konten...</div>
          </div>
          
          {/* Loading bar */}
          <div className="w-44 md:w-48 h-1 bg-zinc-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-yellow-500 animate-loading-bar rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-3">
        <LottiePlayer />
        {!hideText && (
          <div className="text-center loading-text-fixed">
            <div className="text-lg font-semibold text-slate-900">Loading...</div>
            <div className="text-sm mt-1 text-slate-700">Memuat konten...</div>
          </div>
        )}
      </div>
    </div>
  );
});