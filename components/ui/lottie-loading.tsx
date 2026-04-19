"use client";

import { memo, useState, useEffect, useRef } from "react";
import { markPageLoadingDone } from "@/lib/page-loading-done";
import dynamic from "next/dynamic";

// Dynamic import Lottie to prevent SSR issues
const LottieReact = dynamic(() => import("lottie-react"), { ssr: false });

// Optimized Lottie Player with reduced complexity
const LottiePlayer = memo(function LottiePlayer() {
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const loadedRef = useRef(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    // Show spinner only after 500ms delay (give Lottie more time to load)
    const spinnerTimer = setTimeout(() => {
      if (!animationData) {
        setShowSpinner(true);
      }
    }, 500);

    const load = async () => {
      try {
        // Check cache first for instant load
        const cached = sessionStorage.getItem('lottie-animation-data');
        
        // If cached, load immediately
        if (cached) {
          try {
            const cachedData = JSON.parse(cached);
            setAnimationData(cachedData);
            setIsLoading(false);
            clearTimeout(spinnerTimer);
            if (process.env.NODE_ENV === 'development') {
              console.log('✅ Lottie loaded from cache');
            }
            return;
          } catch (e) {
            // If cache is corrupted, continue to fetch
            sessionStorage.removeItem('lottie-animation-data');
          }
        }
        
        // Load Lottie animation data with timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout (increased)
        
        const response = await fetch("/lotie-loading.json", { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Cache for session
        try {
          sessionStorage.setItem('lottie-animation-data', JSON.stringify(data));
        } catch (e) {
          // Ignore quota errors
        }
        
        setAnimationData(data);
        setIsLoading(false);
        clearTimeout(spinnerTimer);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Lottie loaded from network');
        }
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Failed to load Lottie:", e);
        }
        // On error, force show spinner
        setIsLoading(false);
        setShowSpinner(true);
      }
    };
    
    // Start loading immediately without delay
    load();
    
    return () => clearTimeout(spinnerTimer);
  }, [animationData]);

  // Only show spinner if loading takes more than 300ms
  if ((isLoading || !animationData) && showSpinner) {
    return (
      <div className="w-36 h-36 md:w-40 md:h-40 flex items-center justify-center">
        <div className="relative w-20 h-20 md:w-24 md:h-24">
          {/* Outer yellow ring - spinning animation */}
          <div 
            className="absolute inset-0 rounded-full border-4 border-yellow-200 animate-spin" 
            style={{ 
              borderTopColor: '#EAB308',
              borderRightColor: '#FBBF24',
              willChange: 'transform'
            }}>
          </div>
          
          {/* Inner pulsing circle - yellow */}
          <div 
            className="absolute inset-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 animate-pulse"
            style={{ 
              willChange: 'opacity'
            }}>
          </div>
          
          {/* Center mosque image - optimized */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <img 
              src="/images/loading/mosque.webp" 
              alt="Mosque"
              className="w-full h-full object-contain drop-shadow-lg"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-36 h-36 md:w-40 md:h-40" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
      <LottieReact
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%", transform: 'translateZ(0)' }}
        rendererSettings={{ 
          preserveAspectRatio: "xMidYMid slice", 
          progressiveLoad: true,
          hideOnTransparent: true
        }}
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
        const noLoadingElements = document.querySelectorAll('[data-loading="true"]').length === 0
        
        if (isDocumentComplete && hasContent && noLoadingElements) {
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