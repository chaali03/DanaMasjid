'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Upload, ChevronDown, ExternalLink, X, FileText, Image as ImageIcon } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Pertanyaan Umum',
    message: '',
    file: null as File | null
  });
  const [showMap, setShowMap] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjects = ['Pertanyaan Umum', 'Donasi', 'Pendaftaran Masjid', 'Lainnya'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: 'Pertanyaan Umum',
          message: '',
          file: null
        });
        setPreviewUrl(null);
      } else {
        toast.error(result.error || 'Gagal mengirim pesan. Silakan coba lagi.');
        if (result.details) {
          console.error('[CONTACT] Error details:', result.details);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, file });
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const removeFile = () => {
    setFormData({ ...formData, file: null });
    setPreviewUrl(null);
  };

  const inputClasses = "w-full bg-transparent border-b border-blue-200 py-2 focus:border-blue-600 outline-none transition-colors text-sm placeholder:text-gray-400";
  const labelClasses = "block text-xs font-medium text-gray-500 mb-1";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8 // Wait for the initial loader to fade out
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const leftColumnVariants = {
    hidden: { opacity: 0, x: -50, rotateY: -10 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 50, rotateY: 10 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  // URL Embed Google Maps dengan marker (titik merah) untuk SMK Taruna Bhakti Depok
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3167!2d106.8611!3d-6.3489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec988a0e884d%3A0x6295304918e95c!2sSMK%20Taruna%20Bhakti!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid&q=SMK+Taruna+Bhakti+Depok";
  
  // Google Maps Directions URL dengan alamat lengkap
  const mapsDirectionUrl = "https://www.google.com/maps/dir/?api=1&destination=SMK+Taruna+Bhakti+Depok,+Jl.+Pekapuran,+Curug,+Cimanggis,+Depok+Jawa+Barat+16953";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 pt-32 pb-55 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Kontak Kami
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ada pertanyaan atau ingin berdiskusi tentang solusi untuk masjid Anda? Tim kami siap membantu Anda dengan layanan terbaik kami.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-[25px] shadow-2xl overflow-hidden flex flex-col md:flex-row p-3 md:p-4 hover:shadow-3xl transition-shadow duration-500"
            style={{ 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
            }}
          >
            {/* Left Column: Contact Information */}
            <motion.div 
              variants={leftColumnVariants}
              className="md:w-[40%] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-[20px] p-10 relative overflow-hidden flex flex-col min-h-[600px]"
            >
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-3">
                  Informasi Kontak
                </h2>
                <p className="text-blue-100 text-sm mb-16">
                  Hubungi kami untuk bantuan dan pertanyaan!
                </p>

                <div className="space-y-12">
                  <div className="flex items-center gap-6 group">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-xl group-hover:bg-white/30 transition-colors"
                    >
                      <Phone className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-xs text-blue-200 mb-1">Telepon</p>
                      <span className="text-base font-medium">+62 812 3456 7890</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-xl group-hover:bg-white/30 transition-colors"
                    >
                      <Mail className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-xs text-blue-200 mb-1">Email</p>
                      <span className="text-base font-medium">danamasjid@gmail.com</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <motion.button 
                      onClick={() => setShowMap(!showMap)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-start gap-6 group w-full text-left"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-xl group-hover:bg-white/30 transition-colors shrink-0"
                      >
                        <MapPin className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-xs text-blue-200 mb-1">Alamat</p>
                        <div className="flex items-center justify-between">
                          <span className="text-base font-medium leading-tight">
                            Pantara<br />
                            <span className="text-sm text-blue-100">Jl. Pekapuran, RT.02/RW.06, Curug, Kec. Cimanggis, Kota Depok, Jawa Barat 16953</span>
                          </span>
                          <motion.div
                            animate={{ rotate: showMap ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </div>
                        <p className="text-[11px] text-blue-100 mt-2 italic">Klik untuk melihat lokasi di peta</p>
                      </div>
                    </motion.button>

                    <AnimatePresence>
                      {showMap && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, scale: 0.95 }}
                          animate={{ height: 'auto', opacity: 1, scale: 1 }}
                          exit={{ height: 0, opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="rounded-2xl overflow-hidden border-2 border-white/30 mt-4 h-64 relative shadow-inner">
                            <iframe
                              src={mapSrc}
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              title="Peta Pantara - Jl. Pekapuran, Curug, Cimanggis, Depok"
                            ></iframe>
                            <motion.a 
                              href={mapsDirectionUrl}
                              target="_blank" 
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              className="absolute top-4 right-4 bg-white text-blue-600 p-2.5 rounded-full shadow-xl transition-all z-20"
                              title="Buka Petunjuk Arah ke Pantara"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </motion.a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
             </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div 
              variants={rightColumnVariants}
              className="md:w-[60%] p-10 md:p-16 relative bg-white"
            >
              <form onSubmit={handleSubmit} className="h-full flex flex-col">
                <div className="grid grid-cols-1 gap-y-12 mb-12">
                  <div className="relative group">
                    <label className={labelClasses}>Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Masukkan nama lengkap Anda"
                      className={inputClasses}
                    />
                  </div>
                  <div className="relative group">
                    <label className={labelClasses}>Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Subject Selection */}
                <div className="mb-12">
                  <label className="block text-sm font-bold text-gray-900 mb-6">Pilih Subjek?</label>
                  <div className="flex flex-wrap gap-8">
                    {subjects.map((sub, idx) => (
                      <motion.label 
                        key={idx} 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name="subject"
                            value={sub}
                            checked={formData.subject === sub}
                            onChange={() => setFormData({ ...formData, subject: sub })}
                            className="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-100 checked:border-blue-600 transition-all cursor-pointer"
                          />
                          <motion.div 
                            initial={false}
                            animate={{ scale: formData.subject === sub ? 1 : 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="absolute w-2.5 h-2.5 rounded-full bg-blue-600"
                          />
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors font-medium">{sub}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="mb-12">
                  <label className={labelClasses}>Pesan</label>
                  <textarea
                    rows={1}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tulis pesan Anda.."
                    className={`${inputClasses} resize-none overflow-hidden`}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = target.scrollHeight + 'px';
                    }}
                  />
                </div>

                {/* File Upload */}
                <div className="mb-12">
                  <label className={labelClasses}>Lampiran (Gambar/File)</label>
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <motion.label 
                      htmlFor="file-upload"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 w-full border-b border-blue-100 py-3 cursor-pointer hover:border-blue-600 transition-colors group"
                    >
                      <motion.div 
                        whileHover={{ rotate: 10 }}
                        className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all"
                      >
                        <Upload className="w-5 h-5" />
                      </motion.div>
                      <span className="text-sm text-gray-500 font-medium">
                        {formData.file ? "Ubah file terpilih" : "Pilih file untuk diunggah.."}
                      </span>
                    </motion.label>
                  </div>

                  {/* File Preview */}
                  <AnimatePresence>
                    {formData.file && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: 10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: 10 }}
                        className="mt-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-4"
                      >
                        {previewUrl ? (
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-blue-200">
                            <img 
                              src={previewUrl} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center border border-blue-200">
                            {formData.file.type.includes('pdf') ? (
                              <FileText className="w-8 h-8 text-blue-600" />
                            ) : (
                              <ImageIcon className="w-8 h-8 text-blue-600" />
                            )}
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {formData.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(formData.file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button */}
                <div className="mt-auto flex justify-end relative z-10">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-16 rounded-2xl shadow-[0_10px_30px_-10px_rgba(37,99,235,0.4)] transition-all flex items-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      'Kirim Pesan'
                    )}
                  </motion.button>
                </div>

                {/* Enhanced Paper Plane Decoration */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                  animate={{ opacity: 0.03, scale: 1, rotate: 12 }}
                  transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                  className="absolute bottom-6 right-10 pointer-events-none"
                >
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 100L180 20L150 180L100 130L20 100Z" stroke="currentColor" className="text-blue-600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M180 20L100 130" stroke="currentColor" className="text-blue-600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}