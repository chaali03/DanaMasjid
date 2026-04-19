import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set the project root for Turbopack to prevent 
  // resolving to parent directories (like C:\Users\owner)
  // especially when multiple lockfiles exist higher up
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable static page generation
  output: 'standalone',
  
  // Disable Fast Refresh in development if FAST_REFRESH=false
  ...(process.env.NODE_ENV === 'development' && process.env.FAST_REFRESH === 'false' && {
    webpack: (config, { dev, isServer }) => {
      if (dev && !isServer) {
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300,
        }
      }
      return config
    }
  }),
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize quality settings for better performance
    qualities: [70, 75, 85], // Reduced quality for faster loading
    // Allow query strings for cache busting
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    loader: 'default',
    loaderFile: undefined,
  },
  compress: true,
  poweredByHeader: false,
  
  // Enhanced compression and optimization
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'lottie-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001', 'localhost:3011']
    },
    parallelServerBuildTraces: false,
    optimizeCss: true,
    gzipSize: true,
    // Disable parallel build traces to prevent manifest corruption in dev
    webpackBuildWorker: true,
    // Add memory limits for Turbopack if applicable
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Move serverComponentsExternalPackages to root level
  serverExternalPackages: ['sharp'],
  
  // Optimize CSS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
    styledComponents: true,
  },
  
  reactStrictMode: true,
  
  // Disable Fast Refresh / HMR for more stable development
  // Note: You'll need to manually refresh browser after code changes
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  productionBrowserSourceMaps: false,
  
  // Optimize webpack
  webpack: (config, { isServer, dev }) => {
    // Support Vite-style SVG React imports used by dashboard-component:
    // import Icon from "./icon.svg?react"
    const assetRule = config.module.rules.find((rule) => rule?.test?.test?.(".svg"))
    if (assetRule) {
      assetRule.exclude = /\.svg$/i
    }

    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /react/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            exportType: "default",
            svgo: true,
            titleProp: true,
          },
        },
      ],
    })

    // Optimize module resolution to stay within the project directory
    config.resolve.modules = [path.resolve(__dirname, 'node_modules'), 'node_modules'];
    config.resolve.symlinks = false;
    
    // Explicitly handle tailwindcss resolution if needed
    config.resolve.alias = {
      ...config.resolve.alias,
      'tailwindcss': path.resolve(__dirname, 'node_modules/tailwindcss'),
    };
    
    // Only optimize in production and client-side
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        minimize: true,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for node_modules
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20
            },
            // Common chunk for shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true
            },
            // Separate chunk for large libraries
            lib: {
              test: /[\\/]node_modules[\\/](react|react-dom|framer-motion|lottie-react)[\\/]/,
              name: 'lib',
              chunks: 'all',
              priority: 30
            }
          }
        }
      };
    }

    return config
  },
  
  // Complex Security Headers Configuration
  async headers() {
    // Only apply strict security headers in production
    if (process.env.NODE_ENV !== 'production') {
      return []
    }
    
    return [
      {
        source: '/:path*',
        headers: [
          // DNS Prefetch Control - Allow DNS prefetching for performance
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // HSTS - Force HTTPS for 2 years including subdomains with preload
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Prevent clickjacking attacks
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // XSS Protection (legacy but still useful)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions Policy - allow geolocation for mosque registration
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=*, interest-cohort=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
          },
          // COOP - Same origin for better isolation
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          // COEP - Allow cross-origin resources
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none'
          },
          // CORP - Allow same-site and cross-origin
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin'
          },
          // Comprehensive CSP with balanced security and functionality
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://www.google.com https://www.recaptcha.net https://apis.google.com https://danamasjid.firebaseapp.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https: wss:",
              "frame-src 'self' https://www.google.com https://www.recaptcha.net https://recaptcha.net https://danamasjid.firebaseapp.com",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "manifest-src 'self'",
              "media-src 'self' blob: data:",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          // Additional security headers
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none'
          },
          {
            key: 'X-Download-Options',
            value: 'noopen'
          },
          {
            key: 'Expect-CT',
            value: 'max-age=86400, enforce'
          }
        ],
      },
      // Cache static assets aggressively with proper MIME types
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig

// Cloudflare integration - uncomment after installing @opennextjs/cloudflare
// import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev())
