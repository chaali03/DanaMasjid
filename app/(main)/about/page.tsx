import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const values = [
  {
    title: "Transparansi",
    desc: "Semua alur dana tercatat rapi dan mudah dipahami, dari donatur sampai pengurus.",
  },
  {
    title: "Amanah",
    desc: "Kami membangun sistem yang menjaga kepercayaan jamaah dan martabat pengelola masjid.",
  },
  {
    title: "Kolaborasi",
    desc: "Pantara hadir sebagai jembatan antara masjid, donatur, dan komunitas.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "Ide Dimulai",
    desc: "Berawal dari keresahan soal laporan donasi yang sering tercecer dan sulit dipantau.",
  },
  {
    year: "2025",
    title: "Platform Dibangun",
    desc: "Kami merancang fondasi sistem pendaftaran masjid, verifikasi, dan dashboard transparansi.",
  },
  {
    year: "Sekarang",
    title: "Tumbuh Bersama",
    desc: "Pantara terus berkembang untuk bantu lebih banyak masjid menjadi modern dan terpercaya.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7d2eb] text-[#3f1434]">
      <Header />

      <main className="overflow-hidden">
        <section className="relative px-6 pt-32 pb-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 inline-block rounded-full border border-[#3f1434]/20 bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-widest">
              About Us
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Sekali ada niat baik, kami bantu jadi dampak nyata untuk masjid.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg">
              Pantara lahir dari semangat membuat pengelolaan donasi masjid jadi lebih
              terbuka, rapi, dan mudah dipahami semua pihak.
            </p>
          </div>

          <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#ff8de3]/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-[#ffc8ef]/70 blur-3xl" />
        </section>

        <section className="px-6 py-12 md:px-10 lg:px-16">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-4">
            <div className="rounded-3xl border border-[#3f1434]/15 bg-white/60 p-6 md:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#6f2a5d]">
                Siapa kami
              </p>
              <p className="mt-3 text-lg leading-relaxed">
                Kami adalah tim kecil yang fokus membangun teknologi untuk kebutuhan
                besar: kepercayaan dalam ekosistem donasi.
              </p>
            </div>
            <div className="rounded-3xl border border-[#3f1434]/15 bg-[#3f1434] p-6 text-white">
              <p className="text-3xl font-black">100%</p>
              <p className="mt-1 text-sm text-white/80">fokus pada masjid & jamaah</p>
            </div>
            <div className="rounded-3xl border border-[#3f1434]/15 bg-white/60 p-6">
              <p className="text-3xl font-black">24/7</p>
              <p className="mt-1 text-sm text-[#6f2a5d]">monitoring data donasi</p>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-black md:text-5xl">Nilai yang kami pegang</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {values.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-[#3f1434]/15 bg-white/60 p-6"
                >
                  <h3 className="text-xl font-extrabold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5d2750]">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl rounded-3xl border border-[#3f1434]/15 bg-white/55 p-6 md:p-10">
            <h2 className="text-3xl font-black md:text-5xl">Perjalanan Pantara</h2>
            <div className="mt-8 space-y-6">
              {timeline.map((step) => (
                <div
                  key={step.title}
                  className="grid gap-2 border-l-2 border-[#3f1434]/20 pl-4 md:grid-cols-[140px_1fr]"
                >
                  <p className="text-sm font-extrabold uppercase tracking-widest text-[#7f346a]">
                    {step.year}
                  </p>
                  <div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#5d2750]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#3f1434]/15 bg-[#3f1434] py-4 text-white">
          <div className="animate-marquee-infinite whitespace-nowrap text-xl font-black uppercase tracking-wider">
            <span className="mx-8">PANTARA</span>
            <span className="mx-8">TRANSPARAN</span>
            <span className="mx-8">AMANAH</span>
            <span className="mx-8">UNTUK MASJID INDONESIA</span>
            <span className="mx-8">PANTARA</span>
            <span className="mx-8">TRANSPARAN</span>
            <span className="mx-8">AMANAH</span>
          </div>
        </section>

        <section className="px-6 py-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl rounded-3xl border border-[#3f1434]/15 bg-white/60 p-8 md:p-12">
            <h2 className="max-w-3xl text-3xl font-black leading-tight md:text-5xl">
              Yuk tumbuh bersama. Satu langkah digital, banyak dampak sosial.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#5d2750] md:text-base">
              Kami percaya setiap masjid layak punya sistem yang modern tanpa kehilangan
              nilai amanah. Pantara siap jadi partner perjalanan itu.
            </p>
            <div className="mt-7">
              <a
                href="/daftar-masjid"
                className="inline-flex items-center rounded-full bg-[#3f1434] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2f0f27]"
              >
                Daftarkan Masjid
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
