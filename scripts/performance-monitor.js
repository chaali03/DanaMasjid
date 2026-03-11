#!/usr/bin/env node

/**
 * Performance Monitoring Script
 * Tracks Core Web Vitals and performance metrics
 */

const fs = require('fs');
const path = require('path');

// Performance monitoring code to inject into pages
const performanceScript = `
// Core Web Vitals monitoring
(function() {
  // Track performance metrics
  const metrics = {};
  
  // First Contentful Paint
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        metrics.fcp = entry.startTime;
        console.log('FCP:', entry.startTime);
      }
    }
  }).observe({ entryTypes: ['paint'] });
  
  // Largest Contentful Paint
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    metrics.lcp = lastEntry.startTime;
    console.log('LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });
  
  // First Input Delay
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      metrics.fid = entry.processingStart - entry.startTime;
      console.log('FID:', metrics.fid);
    }
  }).observe({ entryTypes: ['first-input'] });
  
  // Cumulative Layout Shift
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
    metrics.cls = clsValue;
    console.log('CLS:', clsValue);
  }).observe({ entryTypes: ['layout-shift'] });
  
  // Total Blocking Time (approximation)
  new PerformanceObserver((entryList) => {
    let tbt = 0;
    for (const entry of entryList.getEntries()) {
      if (entry.duration > 50) {
        tbt += entry.duration - 50;
      }
    }
    metrics.tbt = tbt;
    console.log('TBT:', tbt);
  }).observe({ entryTypes: ['longtask'] });
  
  // Send metrics to analytics (when available)
  window.addEventListener('beforeunload', () => {
    if (navigator.sendBeacon && window.gtag) {
      navigator.sendBeacon('/api/analytics', JSON.stringify({
        type: 'core-web-vitals',
        metrics: metrics,
        url: window.location.href,
        timestamp: Date.now()
      }));
    }
  });
  
  // Log summary after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      console.log('Performance Summary:', metrics);
      
      // Store in localStorage for debugging
      localStorage.setItem('performance-metrics', JSON.stringify({
        ...metrics,
        url: window.location.href,
        timestamp: Date.now()
      }));
    }, 3000);
  });
})();
`;

console.log('🔍 Performance Monitoring Setup');
console.log('================================');

// Create performance monitoring file
const monitoringPath = path.join(process.cwd(), 'public', 'performance-monitor.js');
fs.writeFileSync(monitoringPath, performanceScript);

console.log('✅ Performance monitoring script created at /public/performance-monitor.js');
console.log('');
console.log('📊 To use this monitoring:');
console.log('1. Add the script to your pages:');
console.log('   <script src="/performance-monitor.js" defer></script>');
console.log('');
console.log('2. Check browser console for Core Web Vitals');
console.log('3. Check localStorage for "performance-metrics"');
console.log('');
console.log('🎯 Performance Targets:');
console.log('- FCP: < 1.8s (Good)');
console.log('- LCP: < 2.5s (Good)');
console.log('- FID: < 100ms (Good)');
console.log('- CLS: < 0.1 (Good)');
console.log('- TBT: < 200ms (Good)');
console.log('');
console.log('📈 Current optimizations applied:');
console.log('✅ Aggressive code splitting (max 100KB chunks)');
console.log('✅ Critical CSS inlined');
console.log('✅ Service worker for caching');
console.log('✅ Lazy loading for animations');
console.log('✅ Optimized webpack configuration');
console.log('✅ Reduced bundle sizes');
console.log('✅ DNS prefetch for external domains');
console.log('✅ Resource hints for critical assets');