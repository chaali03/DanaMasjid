'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined' || !('scrollRestoration' in history)) return

    history.scrollRestoration = 'manual'
    const key = 'sr_' + pathname

    // Always scroll to top on home page and about-us page
    if (pathname === '/' || pathname === '/about-us') {
      sessionStorage.removeItem(key)
      window.scrollTo(0, 0)
    } else {
      const saved = sessionStorage.getItem(key)
      if (saved) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo(0, parseInt(saved, 10))
          })
        })
      }
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem(key, String(window.scrollY))
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [pathname])

  return null
}
