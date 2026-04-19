"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function MasjidHeroV2() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""
      const response = await fetch(`${apiUrl}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage("Terima kasih! Cek email Anda untuk langkah selanjutnya.")
        setEmail("")
      } else {
        setMessage("❌ " + (data.message || "Gagal berlangganan. Silakan coba lagi."))
      }
    } catch (error) {
      setMessage("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full blur-3xl opacity-20"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-20"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <section className="relative">
        <motion.div 
          className="relative mx-auto max-w-7xl px-6 py-28 lg:py-32"
          style={{ y, opacity }}
        >
          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="relative z-10 mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/login"
                  className="rounded-xl mx-auto flex w-fit items-center gap-2 border p-1.5 pr-4 lg:ml-0 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-500 group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <span className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg px-3 py-1.5 text-xs font-bold shadow-md">
                    Admin Masjid
                  </span>
                  <span className="relative text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    Kelola Masjid Anda di Sini
                  </span>
                  <span className="relative bg-gray-300 block h-4 w-px"></span>
                  <ArrowRight className="relative size-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                  <Sparkles className="absolute -top-1 -right-1 size-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 text-balance text-4xl font-bold md:text-5xl xl:text-6xl text-gray-900 leading-tight"
              >
                Daftarkan Masjid Anda & Terima Donasi{" "}
                <span className="relative inline-block">
                  <motion.span
                    className="relative z-10 text-white px-3 py-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                  >
                    Transparan
                  </motion.span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 -z-0 rounded-lg"
                    initial={{ scaleX: 0, rotate: -2 }}
                    animate={{ scaleX: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                  <motion.span
                    className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-500 -z-10 blur-lg opacity-50 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  />
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 text-gray-600 text-lg leading-relaxed"
              >
                Bergabunglah dengan ratusan masjid di Indonesia yang sudah menerima donasi secara transparan dan amanah melalui platform kami.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <form onSubmit={handleSubscribe} className="mx-auto my-10 max-w-2xl lg:my-12 lg:ml-0 lg:mr-auto">
                  <motion.div 
                    className="bg-white has-[input:focus]:ring-blue-500 relative grid grid-cols-[1fr_auto] items-center rounded-2xl border-2 border-gray-200 pr-2 shadow-xl hover:shadow-2xl has-[input:focus]:ring-4 has-[input:focus]:border-blue-400 transition-all duration-300"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Mail className="text-gray-400 pointer-events-none absolute inset-y-0 left-6 my-auto size-5" />
                    </motion.div>

                    <input
                      placeholder="Masukkan email Anda..."
                      className="h-16 w-full bg-transparent pl-14 pr-4 focus:outline-none text-gray-900 text-base placeholder:text-gray-400"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />

                    <div className="md:pr-2 lg:pr-2">
                      <Button
                        type="submit"
                        aria-label="subscribe"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold relative overflow-hidden group"
                        disabled={loading}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        />
                        <span className="relative hidden md:block">{loading ? "Mengirim..." : "Daftar Sekarang"}</span>
                        <Mail className="relative mx-auto size-5 md:hidden" strokeWidth={2} />
                      </Button>
                    </div>
                  </motion.div>
                  
                  {message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`mt-4 text-sm font-medium px-4 py-2 rounded-lg ${
                        message.includes("❌") 
                          ? "text-red-700 bg-red-50 border border-red-200" 
                          : "text-green-700 bg-green-50 border border-green-200"
                      }`}
                    >
                      {message}
                    </motion.p>
                  )}
                </form>

                <ul className="list-inside space-y-3 text-gray-700">
                  {[
                    { text: "Gratis untuk 3 bulan pertama", delay: 0.5 },
                    { text: "Dashboard lengkap & mudah", delay: 0.6 },
                    { text: "Support 24/7", delay: 0.7 }
                  ].map((item, index) => (
                    <motion.li
                      key={item.text}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-3 group"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <motion.div
                          className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-0 group-hover:opacity-50"
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                      <span className="font-medium group-hover:text-gray-900 transition-colors">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
          
          {/* Enhanced Image Section with Parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            className="absolute inset-0 -mx-4 rounded-3xl p-3 lg:col-span-3 perspective-1000"
          >
            <div aria-hidden className="absolute z-[1] inset-0 bg-gradient-to-r from-white via-white/80 from-35% to-transparent" />
            
            {/* Decorative Elements */}
            <motion.div
              className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl opacity-20 blur-2xl z-0"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-20 blur-2xl z-0"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div 
              className="relative h-full w-full rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-yellow-600/10 z-10 opacity-0 hover:opacity-100 transition-opacity duration-500"
              />
              <Image
                className="rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform duration-700"
                src="/images/masjid/interior.webp"
                alt="Masjid illustration"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                animate={{ translateX: ["100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
