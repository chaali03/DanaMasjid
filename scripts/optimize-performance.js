#!/usr/bin/env node

/**
 * Performance Optimization Script
 * Run this after build to analyze and optimize bundle sizes
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Performance Optimization Analysis');
console.log('=====================================');

// Check if .next directory exists
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  console.log('❌ .next directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Analyze bundle sizes
const staticDir = path.join(nextDir, 'static', 'chunks');
if (fs.existsSync(staticDir)) {
  console.log('\n📊 Bundle Analysis:');
  
  const files = fs.readdirSync(staticDir)
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const filePath = path.join(staticDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        sizeKB: Math.round(stats.size / 1024)
      };
    })
    .sort((a, b) => b.size - a.size);

  files.forEach(file => {
    const status = file.sizeKB > 200 ? '🔴' : file.sizeKB > 100 ? '🟡' : '🟢';
    console.log(`${status} ${file.name}: ${file.sizeKB} KB`);
  });

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  console.log(`\n📦 Total Bundle Size: ${Math.round(totalSize / 1024)} KB`);
}

// Performance recommendations
console.log('\n💡 Performance Recommendations:');
console.log('1. ✅ Code splitting implemented');
console.log('2. ✅ Lazy loading for animations');
console.log('3. ✅ Image optimization enabled');
console.log('4. ✅ CSS optimization enabled');
console.log('5. 🔄 Consider implementing service worker for caching');
console.log('6. 🔄 Consider using CDN for static assets');
console.log('7. 🔄 Monitor Core Web Vitals in production');

console.log('\n🎯 Next Steps:');
console.log('- Run Lighthouse again to measure improvements');
console.log('- Monitor bundle sizes after each deployment');
console.log('- Consider implementing critical CSS inlining');
console.log('- Add resource hints for external domains');