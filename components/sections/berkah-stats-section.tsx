"use client"

import { useRef, useState, useEffect } from "react"

export function BerkahStatsSection() {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [textAnimationComplete, setTextAnimationComplete] = useState(false)
  const [berAnimationComplete, setBerAnimationComplete] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  // Effect untuk mengecek ketika kedua animasi strip selesai
  useEffect(() => {
    if (isInView) {
      // Simulate animation completion
      setTimeout(() => setBerAnimationComplete(true), 1200)
      setTimeout(() => setTextAnimationComplete(true), 1500)
    }
  }, [isInView])

  const stats = [
    { label: "Donasi Umum", value: "Rp 22.663.582", percentage: 46.7, color: "#3B82F6" },
    { label: "Zakat", value: "Rp 11.995.744", percentage: 1.0, color: "#10B981" },
    { label: "Infaq", value: "Rp 58.749.283", percentage: 8.0, color: "#8B5CF6" },
    { label: "Sedekah", value: "Rp 28.249.643", percentage: 27, color: "#F59E0B" },
  ]

  const totalDonasi = "Rp 103.658.252"
  const totalPercentage = "+46.7%"

  return (
    <section ref={ref} className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Left Side - BERKAH Text */}
          <div className="relative">
            {/* BERKAH Text with Strip Animation */}
            <div className="relative">
              <div className={`relative ${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}>
                {/* BER Text */}
                <div className="relative pb-2 sm:pb-4">
                  {/* Animated Strip for BER - Behind text */}
                  <div
                    className={`absolute left-0 right-0 bottom-0 h-6 sm:h-8 md:h-10 lg:h-12 xl:h-14 bg-blue-600 rounded-sm pointer-events-none ${isInView ? 'animate-slide-in-right' : 'scale-x-0'}`}
                    style={{ transformOrigin: 'left', zIndex: 0, animationDelay: '400ms' }}
                  />
                  
                  <h2 
                    className={`text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-black leading-none text-white relative z-10 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: '200ms' }}
                  >
                    BER
                  </h2>
                </div>

                {/* KAH Text */}
                <div className="relative pb-2 sm:pb-4">
                  {/* Animated Strip for KAH - Behind text */}
                  <div
                    className={`absolute left-0 right-0 bottom-0 h-6 sm:h-8 md:h-10 lg:h-12 xl:h-14 bg-yellow-500 rounded-sm pointer-events-none ${isInView ? 'animate-slide-in-right' : 'scale-x-0'}`}
                    style={{ transformOrigin: 'left', zIndex: 0, animationDelay: '700ms' }}
                  />
                  
                  <h2 
                    className={`text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-black leading-none text-white relative z-10 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: '500ms' }}
                  >
                    KAH
                  </h2>
                </div>
              </div>

              {/* Subtitle */}
              <p
                className={`text-lg md:text-xl text-slate-600 mt-6 max-w-md ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: '1500ms' }}
              >
                Transparansi penuh dalam setiap donasi yang masuk untuk kemakmuran masjid
              </p>
            </div>
          </div>

          {/* Right Side - Chart (Show after text animations complete) */}
          <div className="hidden md:block">
            {(berAnimationComplete && textAnimationComplete) ? (
              <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                  {/* Total Donasi Header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-500">Total Donasi</span>
                      <span className="text-sm font-semibold text-green-600">{totalPercentage}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900">{totalDonasi}</h3>
                    <p className="text-sm text-slate-500 mt-1">Kuartal Ini</p>
                  </div>

                  {/* Donut Chart */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative w-64 h-64">
                      {/* SVG Donut Chart */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background Circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#F1F5F9"
                          strokeWidth="12"
                        />
                        
                        {/* Animated Segments */}
                        {stats.map((stat, index) => {
                          const previousPercentages = stats.slice(0, index).reduce((sum, s) => sum + s.percentage, 0)
                          const circumference = 2 * Math.PI * 40
                          const offset = (previousPercentages / 100) * circumference
                          const dashArray = `${(stat.percentage / 100) * circumference} ${circumference}`
                          
                          return (
                            <circle
                              key={stat.label}
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke={stat.color}
                              strokeWidth="12"
                              strokeDasharray={dashArray}
                              strokeDashoffset={-offset}
                              strokeLinecap="round"
                              className="transition-all duration-1000 ease-out"
                              style={{ 
                                strokeDasharray: isInView ? dashArray : `0 ${circumference}`,
                                transitionDelay: `${300 + index * 200}ms`
                              }}
                            />
                          )
                        })}
                      </svg>

                      {/* Center Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats List */}
                  <div className="space-y-4">
                    {stats.map((stat, index) => (
                      <div
                        key={stat.label}
                        className="flex items-center justify-between animate-slide-in-left"
                        style={{ animationDelay: `${1200 + index * 100}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: stat.color }}
                          />
                          <span className="text-sm text-slate-700">{stat.label}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-slate-900">{stat.value}</div>
                          <div className="text-xs text-slate-500">{stat.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Placeholder to maintain layout
              <div className="h-[600px]" />
            )}
          </div>

          {/* Mobile Chart (Show immediately when in view, but with its own animations) */}
          <div className={`md:hidden ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1200ms' }}>
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              {/* Total Donasi Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">Total Donasi</span>
                  <span className="text-sm font-semibold text-green-600">{totalPercentage}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{totalDonasi}</h3>
                <p className="text-sm text-slate-500 mt-1">Kuartal Ini</p>
              </div>

              {/* Simple Progress Bars for Mobile */}
              <div className="space-y-4 mb-6">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}
                    style={{ animationDelay: `${1400 + index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: stat.color }}
                        />
                        <span className="text-sm text-slate-700">{stat.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{stat.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-800 ease-out"
                        style={{ 
                          backgroundColor: stat.color,
                          width: isInView ? `${stat.percentage}%` : '0%',
                          transitionDelay: `${1600 + index * 100}ms`
                        }}
                      />
                    </div>
                    <div className="text-right mt-1">
                      <span className="text-xs text-slate-500">{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Stats */}
              <div
                className={`border-t border-slate-100 pt-4 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: '2000ms' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Donasi</span>
                  <span className="text-sm font-semibold text-green-600">{totalPercentage}</span>
                </div>
                <div className="text-lg font-bold text-slate-900 mt-1">{totalDonasi}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}