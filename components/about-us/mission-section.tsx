"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

function HighlightedText({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(8px)", y: 10, scale: 0.95 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 1, 
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: 0.2
      }}
      className={`text-blue-600 font-semibold italic relative inline-block group ${className}`}
    >
      {children}
      <motion.span 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 origin-left -z-10 opacity-70"
      />
    </motion.span>
  );
}

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.15
      }
    },
    viewport: { once: true, margin: "-100px" }
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-40 bg-white overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-yellow-50 rounded-full blur-3xl" 
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Opening Statement */}
        <motion.div 
          className="mb-32 lg:mb-48"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="max-w-5xl">
            <motion.span 
              variants={fadeInUp}
              className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8"
            >
              <span className="w-12 h-px bg-foreground/30" />
              Misi Kami
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-[100px] font-display tracking-tight text-slate-900 leading-[0.95] mb-12"
            >
              Kami memberdayakan masjid dan pelaku rantai pasokan untuk membawa{" "}
              <HighlightedText>visibilitas</HighlightedText> dan{" "}
              <HighlightedText>kepercayaan</HighlightedText> di seluruh operasi mereka.
            </motion.h2>
          </div>
        </motion.div>

        {/* About Us Section */}
        <motion.div 
          className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-32 lg:mb-48"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <div className="sticky top-24">
              <span className="inline-flex items-center gap-4 text-xs font-mono text-slate-500 mb-8 uppercase tracking-[0.2em]">
                <span className="w-16 h-[1px] bg-slate-200" />
                Tentang Kami
              </span>
              <h3 className="text-4xl lg:text-6xl font-display tracking-tight text-slate-900 leading-[1.1]">
                Kami menjalankan misi <HighlightedText className="not-italic">transparansi</HighlightedText> di PARANTARA
              </h3>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-8 text-xl text-slate-600 leading-relaxed font-light">
            <p>
              PARANTARA dibangun dan dipimpin oleh orang-orang yang percaya bahwa transparansi dan ketertelusuran harus dapat diakses, dapat ditindaklanjuti, dan selaras dengan kebutuhan nyata masjid, rantai pasokan, dan orang-orang di dalamnya.
            </p>
            <p>
              Tim kami adalah praktisi keuangan masjid dan rantai pasokan, bukan hanya insinyur perangkat lunak, konsultan, atau manajer keuangan. Kami telah bekerja dengan pengurus masjid, petani, nelayan, pengolah, dan pembeli di berbagai sektor, dan kami melihat kesenjangan: ketertelusuran seringkali terlalu rumit, terlalu mahal, dan terlalu terputus dari realitas di lapangan.
            </p>
            <motion.div 
              variants={fadeInUp}
              className="p-8 bg-slate-50 border-l-4 border-slate-900 my-10 italic text-slate-900 font-normal"
            >
              "PARANTARA diciptakan untuk mengubah itu. PARANTARA membantu orang mengumpulkan dan berbagi informasi dengan lebih mudah, memenuhi persyaratan kepatuhan tanpa menambah biaya yang tidak perlu."
            </motion.div>
            <p>
              Kami di sini untuk mendukung keputusan yang lebih cerdas, hubungan yang lebih kuat, dan lebih banyak kepercayaan antara setiap aktor dalam rantai. Kami tidak melihat ketertelusuran sebagai fitur teknis — kami melihatnya sebagai tanggung jawab bersama, dan kesempatan untuk berbisnis lebih baik bersama.
            </p>
          </motion.div>
        </motion.div>

        {/* Who We Are Section */}
        <motion.div 
          className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-32 lg:mb-48"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="lg:col-span-5 order-1 lg:order-2">
            <div className="sticky top-24">
              <span className="inline-flex items-center gap-4 text-xs font-mono text-slate-500 mb-8 uppercase tracking-[0.2em]">
                <span className="w-16 h-[1px] bg-slate-200" />
                Siapa Kami
              </span>
              <h3 className="text-4xl lg:text-6xl font-display tracking-tight text-slate-900 leading-[1.1]">
                Teknologi yang <HighlightedText className="not-italic">memenuhi</HighlightedText> Anda di mana pun Anda berada
              </h3>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-8 text-xl text-slate-600 leading-relaxed font-light order-2 lg:order-1">
            <p>
              PARANTARA dibangun dari asal rantai pasokan, dibentuk oleh pengalaman dunia nyata dalam pengelolaan keuangan masjid, perikanan, pertanian, dan sistem pangan, bukan hanya sprint rekayasa atau dek investor.
            </p>
            <p>
              PARANTARA dirancang untuk bekerja untuk semua orang dalam rantai nilai: pengurus masjid kecil yang menggunakan ponsel, produsen skala kecil, pengolah yang mencetak label ketertelusuran, atau pembeli perusahaan yang menghubungkan beberapa sistem. Kami mendukung standar global seperti GS1 dan GDST, tetapi kami menjaga pengalaman pengguna tetap sederhana dan dapat disesuaikan.
            </p>
            <p>
              Kami fokus pada interoperabilitas, integrasi, kegunaan, dan fleksibilitas karena ketertelusuran hanya berfungsi ketika berfungsi untuk orang-orang yang menggunakannya.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
