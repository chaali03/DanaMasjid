"use client";

import { memo, Suspense, useState, useEffect } from "react";

// Minimal loading fallback
const LoadingFallback = memo(function LoadingFallback() {
  return (
    <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
    </div>
  );
});

// Ultra-lazy Lottie loader - only loads when actually needed
const LottiePlayer = memo(function LottiePlayer() {
  const [LottieComponent, setLottieComponent] = useState<any>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    // Only load Lottie when component mounts
    const loadLottie = async () => {
      try {
        const [lottieModule, animData] = await Promise.all([
          import("lottie-react"),
          import("@/public/lotie-loading.json")
        ]);
        
        setLottieComponent(() => lottieModule.default);
        setAnimationData(animData.default);
      } catch (error) {
        console.error('Failed to load Lottie:', error);
      }
    };

    loadLottie();
  }, []);

  if (!LottieComponent || !animationData) {
    return <LoadingFallback />;
  }

  return (
    <div className="w-32 h-32 md:w-40 md:h-40">
      <LottieComponent 
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice",
          progressiveLoad: true,
        }}
      />
    </div>
  );
});

interface LottieLoadingProps {
  className?: string;
}

export const LottieLoading = memo(function LottieLoading({ 
  className = "h-screen bg-white flex items-center justify-center"
}: LottieLoadingProps) {
  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-4">
        <Suspense fallback={<LoadingFallback />}>
          <LottiePlayer />
        </Suspense>
        <div className="text-gray-600 text-center">
          <div className="text-lg font-semibold">Loading...</div>
          <div className="text-sm mt-1">Memuat konten...</div>
        </div>
      </div>
    </div>
  );
});