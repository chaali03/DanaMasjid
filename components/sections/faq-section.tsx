import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/animations/animated-section"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "Bagaimana blockchain digunakan untuk supply chain tracking?",
    answer:
      "Setiap transaksi dana dan distribusi produk tercatat di blockchain dengan hash unik. Anda bisa lacak perjalanan dana dari donatur hingga penggunaan akhir secara real-time dan transparan.",
  },
  {
    question: "Apa itu smart contract dan bagaimana cara kerjanya?",
    answer:
      "Smart contract adalah kode otomatis di blockchain yang mengelola distribusi dana tanpa campur tangan pihak ketiga. Ketika kondisi terpenuhi, dana otomatis tersalurkan sesuai tujuan yang telah ditetapkan.",
  },
  {
    question: "Bagaimana cara verifikasi transaksi di blockchain?",
    answer:
      "Setiap transaksi memiliki hash unik yang dapat Anda verifikasi di blockchain explorer seperti Etherscan atau Polygonscan. Cukup copy hash transaksi dan paste di explorer untuk melihat detail lengkapnya.",
  },
  {
    question: "Apakah data di blockchain aman dan tidak bisa diubah?",
    answer:
      "Ya, blockchain bersifat immutable (tidak dapat diubah). Setelah transaksi tercatat, data tidak bisa dihapus atau dimanipulasi oleh siapapun. Ini menjamin integritas dan transparansi penuh.",
  },
  {
    question: "Blockchain apa yang digunakan PARANTARA?",
    answer:
      "Kami mendukung multi-chain termasuk Ethereum, Polygon, Binance Smart Chain (BSC), dan Solana. Anda bisa pilih blockchain sesuai kebutuhan biaya dan kecepatan transaksi.",
  },
  {
    question: "Bagaimana supply chain produk bantuan dilacak?",
    answer:
      "Setiap produk bantuan (beras, minyak, sembako) diberi ID unik yang tercatat di blockchain. Anda bisa lacak dari supplier, gudang, hingga distribusi ke penerima manfaat dengan scan QR code atau cek di dashboard.",
  },
]

export function FAQSection() {
  return (
    <AnimatedSection animation="fadeIn" className="py-8 md:py-20 lg:py-32 px-6 pb-16 md:pb-40 lg:pb-80 overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif"
          >
            Pertanyaan yang Sering Diajukan
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Semua yang perlu Anda ketahui tentang PARANTARA. Punya pertanyaan lain? Hubungi tim dukungan kami.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3 py-0 my-0">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.35, 
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-foreground/30"
                >
                  <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
