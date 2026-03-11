"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";

// Lazy load sections to reduce initial bundle
const MarqueeSection = dynamic(() => import("@/components/sections/marquee-section").then(mod => ({ default: mod.MarqueeSection })), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse" />,
  ssr: false
});

export default function Marquee() {
    const [sponsorOrder, setSponsorOrder] = useState([0, 1, 2, 3]);

    // Memoize sponsor logos data to prevent re-creation
    const sponsors = useMemo(() => [
        { src: "/images/sponsor/alikhlas.webp", alt: "Masjid Al Ikhlas PIK" },
        { src: "/images/sponsor/pondokIT.webp", alt: "Pondok IT" },
        { src: "/images/sponsor/tb.webp", alt: "SMK Taruna Bhakti" },
        { src: "/images/sponsor/ysb.webp", alt: "Yayasan Setia Bhakti" },
    ], []);

    // Optimize shuffle function with useCallback
    const shuffleSponsors = useCallback(() => {
        setSponsorOrder(prev => {
            const newOrder = [...prev];
            // Fisher-Yates shuffle
            for (let i = newOrder.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
            }
            return newOrder;
        });
    }, []);

    // Shuffle sponsor positions every 30 seconds
    useEffect(() => {
        const shuffleInterval = setInterval(shuffleSponsors, 30000);
        return () => clearInterval(shuffleInterval);
    }, [shuffleSponsors]);

    return (
        <div className="relative w-full bg-gray-100">
            <div className="w-full">
                {/* Stats Bar - Top */}
                <MarqueeSection sponsors={sponsors} sponsorOrder={sponsorOrder} />
            </div>
        </div>
    );
}