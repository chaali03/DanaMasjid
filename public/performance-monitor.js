
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
