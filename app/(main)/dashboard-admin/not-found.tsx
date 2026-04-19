'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardNotFound() {
  const router = useRouter()
  const animationContainer = useRef<HTMLDivElement>(null)
  const animationInstance = useRef<any>(null)

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Lottie Animation */}
        <div 
          ref={animationContainer} 
          className="w-full max-w-md mx-auto mb-8"
          style={{ height: '400px' }}
        />

        {/* Error Message */}
        <div className="space-y-4">
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau dihapus.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/dashboard-admin"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            Kembali ke Beranda
          </Link>
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Halaman Sebelumnya
          </button>
        </div>
      </div>
    </div>
  )
}
