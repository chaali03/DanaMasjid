"use client";

import { useEffect, useState, useRef, memo } from "react";
import dynamic from "next/dynamic";
import { OptimizedVideo } from "@/components/ui/optimized-video";

const LottieReact = dynamic(() => import("lottie-react"), { ssr: false });

const words = ["transparan", "mandiri", "aman", "terpercaya"];

const LottiePlayer = memo(function LottiePlayer() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    import("@/lotie/Man goes to the mosque on Ramadan.json").then((d) =>
      setAnimationData(d.default)
    );
  }, []);

  if (!animationData) return <div className="w-full h-full bg-slate-50 animate-pulse" />;

  return (
    <LottieReact
      animationData={animationData}
      loop={true}
      className="w-full h-full opacity-90"
    />
  );
});

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split("");
  const STAGGER = 45;
  const DURATION = 500;
  const GRADIENT_HOLD = STAGGER * letters.length + DURATION + 200;

  const [letterStates, setLetterStates] = useState<{ opacity: number; blur: number }[]>(
    letters.map(() => ({ opacity: 0, blur: 20 }))
  );
  const [showGradient, setShowGradient] = useState(true);
  const framesRef = useRef<number[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    framesRef.current.forEach(cancelAnimationFrame);
    timersRef.current.forEach(clearTimeout);
    framesRef.current = [];
    timersRef.current = [];

    setLetterStates(letters.map(() => ({ opacity: 0, blur: 20 })));
    setShowGradient(true);

    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setLetterStates(prev => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 20 * (1 - eased) };
            return next;
          });
          if (progress < 1) {
            const id = requestAnimationFrame(tick);
            framesRef.current.push(id);
          }
        };
        const id = requestAnimationFrame(tick);
        framesRef.current.push(id);
      }, i * STAGGER);
      timersRef.current.push(t);
    });

    const gt = setTimeout(() => setShowGradient(false), GRADIENT_HOLD);
    timersRef.current.push(gt);

    return () => {
      framesRef.current.forEach(cancelAnimationFrame);
      timersRef.current.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const gradientColors = ["#3b82f6", "#10b981", "#67e8f9", "#fbbf24", "#3b82f6"];

  return (
    <>
      {letters.map((char, i) => {
        const colorIndex = (i / Math.max(letters.length - 1, 1)) * (gradientColors.length - 1);
        const lower = Math.floor(colorIndex);
        const upper = Math.min(lower + 1, gradientColors.length - 1);
        const t = colorIndex - lower;

        const hex2rgb = (hex: string) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return [r, g, b];
        };
        const [r1, g1, b1] = hex2rgb(gradientColors[lower]);
        const [r2, g2, b2] = hex2rgb(gradientColors[upper]);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: letterStates[i]?.opacity ?? 0,
              filter: `blur(${letterStates[i]?.blur ?? 20}px)`,
              color: showGradient ? `rgb(${r},${g},${b})` : "#0f172a",
              transition: "color 0.4s ease",
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section - Image for mobile/tablet, Video for desktop */}
      <section className="relative min-h-[30vh] md:min-h-[40vh] lg:min-h-[105vh] flex flex-col justify-center items-start overflow-hidden bg-white mt-20 md:mt-0">
        {/* Background Image for mobile/tablet */}
        <div className="absolute inset-0 z-0 lg:hidden">
          <img
            src="/images/profile-tb.webp"
            alt="PARANTARA Background"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Background Video for desktop only */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          <OptimizedVideo
            src="/tb-profile-optimized.mp4"
            poster="/images/hero-poster.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            loading="eager"
            className="w-full h-full object-cover object-center"
            width={1280}
            height={720}
          />
        </div>
      </section>

      {/* Text Section - hanya muncul di mobile/tablet */}
      <section className="relative bg-white pt-8 pb-12 px-6 lg:hidden">
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Eyebrow */}
          <div 
            className={`mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-4 text-xs font-mono text-slate-600">
              <span className="w-16 h-[1px] bg-gray-400" />
              Tentang Kami
            </span>
          </div>
          
          {/* Main headline */}
          <div>
            <h1 
              className={`text-left text-[clamp(1.75rem,5vw,2.5rem)] font-display leading-[1.2] tracking-tight text-slate-900 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="block">Transparansi dana masjid</span>
              <span className="block">
                & supply chain yang{" "}
                <span className="relative inline-block">
                  <BlurWord word={words[wordIndex]} trigger={wordIndex} />
                </span>
              </span>
            </h1>

            <p className={`mt-6 text-lg text-slate-600 leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              Platform transparansi keuangan masjid dan rantai pasokan Nusantara berbasis blockchain untuk memajukan ekonomi umat secara mandiri dan terpercaya.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}