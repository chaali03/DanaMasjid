'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  const pathname = usePathname()
  const animationContainer = useRef<HTMLDivElement>(null)
  const animationInstance = useRef<any>(null)

  // If we're in dashboard, don't render this component
  // Let the dashboard not-found handle it
  if (pathname?.startsWith('/dashboard-admin')) {
    return null
  }

  useEffect(() => {
    if (!animationContainer.current) return
    if (animationInstance.current) return

    // Dynamic import — keeps lottie-web out of the main bundle
    import('lottie-web').then((lottie) => {
      if (!animationContainer.current) return
      if (animationInstance.current) return
      
      animationInstance.current = lottie.default.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/lotie/Lonely 404.json'
      })
    }).catch((error) => {
      console.error('Failed to load Lottie animation:', error)
    })

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy()
        animationInstance.current = null
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Lottie Animation */}
        <div 
          ref={animationContainer} 
          className="w-full max-w-md mx-auto mb-8"
          style={{ height: '400px' }}
        />

        {/* Error Message */}
        <div className="space-y-4">
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau dihapus.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            Kembali ke Beranda
          </Link>
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium"
          >
            Halaman Sebelumnya
          </button>
        </div>
      </div>
    </div>
  )
}
