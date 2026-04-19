"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { LottieLoading } from "@/components/ui/lottie-loading"
import toast from "react-hot-toast"

export default function DaftarMasjidRootPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    const checkRegistrationStatus = async () => {
      try {
        // 1. Check if user already registered a mosque (cookie check is fast)
        const isRegistered = document.cookie.split(';').some(item => item.trim().startsWith('mosque_registered='))
        if (isRegistered) {
          router.replace("/menunggu")
          return
        }

        // 2. Try to find/create token in one go if possible
        const response = await fetch('/api/mosque-registration-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: user?.email, 
            name: user?.displayName || user?.email?.split('@')[0] || 'User' 
          })
        })
        const result = await response.json()

        if (result.success && result.token) {
          router.replace(`/daftar-masjid/${result.token}`)
        } else {
          toast.error("Gagal menyiapkan sesi pendaftaran. Silakan coba lagi.")
          router.replace("/register")
        }
      } catch (error) {
        console.error("Error checking registration status:", error)
        router.replace("/register")
      } finally {
        setLoading(false)
      }
    }

    // Add a small delay for user state to stabilize after login redirect
    const userStabilizeTimer = setTimeout(() => {
      if (!user) {
        router.replace("/login?redirect=/daftar-masjid&message=Silakan+login+untuk+melanjutkan+pendaftaran+masjid")
        return
      }

      checkRegistrationStatus()
    }, 500)

    return () => clearTimeout(userStabilizeTimer)
  }, [user, authLoading, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <LottieLoading className="bg-transparent h-auto" hideText />
        <p className="mt-4 text-slate-500 font-medium">Memeriksa status pendaftaran...</p>
      </div>
    </div>
  )
}
