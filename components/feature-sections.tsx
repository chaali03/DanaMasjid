"use client"

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Eye, QrCode, Layers } from "lucide-react";
import { memo } from "react";

// Memoize feature card untuk performa lebih baik
const FeatureCard = memo(function FeatureCard({ 
  feature, 
  index 
}: { 
  feature: { icon: any; title: string; description: string }; 
  index: number 
}) {
  const Icon = feature.icon;
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 backdrop-blur-sm border border-yellow-200 flex items-center justify-center" style={{ willChange: 'transform' }}>
          <Icon className="w-5 h-5 text-yellow-600" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="text-base font-semibold text-zinc-900">
            {feature.title}
          </h4>
          <p className="text-sm text-zinc-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
});

export function FeatureSections() {
  const features = [
    {
      icon: CheckCircle2,
      title: "Lebih dari Sekedar Paspor Digital",
      description: "Ceritakan kisah yang lebih mendalam tentang perjalanan, kualitas, dan keberlanjutan produk Anda. Bukan hanya kotak centang kepatuhan."
    },
    {
      icon: Eye,
      title: "Tunjukkan Transparansi Merek",
      description: "Soroti komitmen Anda terhadap sumber etis, keberlanjutan, dan keaslian produk melalui data yang dapat diverifikasi."
    },
    {
      icon: QrCode,
      title: "Pindai untuk Melihat Perjalanan Produk",
      description: "Libatkan konsumen dengan kode QR yang membuka detail produk yang kaya—langsung dari kemasan."
    },
    {
      icon: Layers,
      title: "Aktifkan Transparansi Tingkat Lot",
      description: "Berikan visibilitas dan ketertelusuran hingga ke batch atau lot produk individual untuk memenuhi permintaan pembeli dan regulasi."
    }
  ];

  return (
    <section id="features-continued" className="w-full py-8 md:py-16 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements - optimized */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent" style={{ willChange: 'auto' }} />
      <div className="absolute inset-0 bg-grid-zinc-900/[0.02] bg-[size:50px_50px]" style={{ willChange: 'auto' }} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 backdrop-blur-sm border border-blue-200">
                <span className="text-sm font-medium text-blue-600">Visibilitas Produk</span>
              </div>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 leading-tight">
                Bagikan Cerita di Balik Produk Anda
              </h2>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Berikan konsumen dan mitra akses instan ke sumber, kualitas, dan detail keberlanjutan langsung dari kemasan.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Link 
                href="/transparency"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 group"
                style={{ willChange: 'transform' }}
              >
                <span>Bagikan Cerita Produk Anda</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Features Grid - optimized with memoization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="grid sm:grid-cols-2 gap-6 pt-8"
            >
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </motion.div>
          </div>

          {/* Right Column - Image - optimized */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative lg:sticky lg:top-24"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-yellow-50 p-8">
              <div className="aspect-square relative">
                <img
                  src="/images/produk/produk-priview.webp"
                  alt="Kemasan produk dengan kode QR menampilkan detail ketertelusuran"
                  className="w-full h-full object-contain object-center"
                  loading="lazy"
                  decoding="async"
                  style={{ transform: 'translateZ(0)' }}
                />
              </div>
            </div>
            
            {/* Decorative blur elements - optimized */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full blur-3xl -z-10 opacity-40" style={{ willChange: 'auto' }} />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-200 rounded-full blur-3xl -z-10 opacity-40" style={{ willChange: 'auto' }} />
          </motion.div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div id="black-exit" className="h-4 md:h-8 lg:h-20" />
    </section>
  );
}
