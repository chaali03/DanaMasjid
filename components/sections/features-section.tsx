"use client"

import { Check } from "lucide-react"
import { RealtimePropertyCard } from "@/components/cards"

const features = [
  "Daftar masjid dalam 5 menit",
  "Verifikasi profil termasuk",
  "Notifikasi real-time",
  "Dukungan 24/7",
  "Tanpa biaya tersembunyi",
  "Pembayaran aman",
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 px-6 relative overflow-hidden max-w-full">
      <div className="absolute top-[50%] md:top-[45%] lg:top-[85%] xl:top-[80%] -translate-y-1/2 left-0 right-0 lg:left-[46%] flex justify-center pointer-events-none z-20 max-w-full overflow-hidden">
        <span className="relative inline-block">
          <span className="relative z-10 font-bold text-center text-[20vw] sm:text-[14vw] md:text-[12vw] lg:text-[12vw] leading-none tracking-tighter text-white whitespace-nowrap px-4">
            KELOLA
          </span>
          <span
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 -z-0 animate-slide-in-right"
            style={{ 
              transformOrigin: "left",
              animationDelay: "200ms"
            }}
          />
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 mt-30 lg:-mt-20">
            <RealtimePropertyCard />
          </div>

          <div className="order-1 lg:order-2 space-y-8 lg:-mt-50">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Kelola keuangan masjid dengan transparan
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Pantau pemasukan dan pengeluaran, kelola program masjid, publikasikan laporan keuangan real-time, dan tingkatkan kepercayaan jamaah dengan transparansi penuh.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 rounded-xl hover:bg-zinc-50 transition-colors duration-300 gap-2 py-1 animate-slide-in-left"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
