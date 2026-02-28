// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { VideoBackground } from '@/components/auth/video-background';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [direction, setDirection] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  const videoOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { 
      scale: 0.95, 
      opacity: 0,
      y: 30
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 200,
        delay: 0.3
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 1.1,
      y: -30
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: 0.4
      }
    }
  };

  const curveVariants = {
    hidden: { 
      y: "100%"
    },
    visible: { 
      y: 0,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 150,
        delay: 0.6
      }
    }
  };

  const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: 0.6 + (custom * 0.1)
      }
    })
  };

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 20,
        stiffness: 200
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    })
  };

  const buttonHoverVariants = {
    hover: { 
      scale: 1.02,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.98,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 1.5,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleStepChange = (newStep: number) => {
    setDirection(newStep > step ? 1 : -1);
    setStep(newStep);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Kode OTP telah dikirim ke email Anda');
        setResendCountdown(60);
        handleStepChange(2);
      } else {
        setError(data.message || 'Gagal mengirim OTP');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Masukkan 6 digit kode OTP');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/verify-reset-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Verifikasi berhasil!');
        handleStepChange(3);
      } else {
        setError(data.message || 'Kode OTP tidak valid');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    if (!/(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
      setError('Password harus mengandung huruf kapital dan angka');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const otpString = otp.join('');

    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Password berhasil direset! Mengalihkan...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(data.message || 'Gagal reset password');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCountdown > 0) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Kode OTP telah dikirim ulang');
        setResendCountdown(60);
      } else {
        setError(data.message || 'Gagal mengirim OTP');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }

      // Auto submit if all digits are filled
      if (index === 5 && value && newOtp.every(digit => digit !== "")) {
        setTimeout(() => {
          document.getElementById('submit-otp')?.click();
        }, 300);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50"
    >
      {/* Video Background */}
      <VideoBackground 
        videoSrc="/vidio/login.mp4"
        posterSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231e3a8a;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%230369a1;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%230891b2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23grad)'/%3E%3C/svg%3E"
      />

      {/* Overlay with Fade In */}
      <motion.div
        variants={videoOverlayVariants}
        transition={{ delay: 0.2 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-sky-900/30 to-cyan-900/40 backdrop-blur-[2px]"
      />

      {/* Main Card - Vertical Layout */}
      <motion.div 
        variants={cardVariants}
        className="relative z-20 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Top - Image with Parallax Effect */}
        <motion.div
          variants={imageVariants}
          className="relative w-full h-64 md:h-80 overflow-hidden"
        >
          <Image
            src="/images/login/loginnnn.webp"
            alt="Forgot Password"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          
          {/* Curved Divider at Bottom with Slide Up Animation */}
          <motion.div
            variants={curveVariants}
            className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"
          >
            <svg
              className="absolute bottom-0 left-0 w-full h-full"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,0 Q600,80 1200,0 L1200,100 L0,100 Z"
                fill="white"
                className="drop-shadow-lg"
              />
            </svg>
          </motion.div>

          {/* Step Indicator on Image */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
          >
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <motion.div 
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                      step === s 
                        ? 'bg-yellow-500 text-white shadow-lg' 
                        : step > s 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    animate={step === s ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    {step > s ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-semibold">{s}</span>
                    )}
                  </motion.div>
                  {s < 3 && (
                    <motion.div 
                      className={`w-12 h-1 rounded-full transition-all duration-300 ${
                        step > s ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: step > s ? 48 : 48 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom - Form */}
        <motion.div
          variants={formContainerVariants}
          className="w-full p-8 md:p-12"
        >
          {/* Back Link */}
          <motion.div custom={0} variants={itemVariants}>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-all group mb-6 relative"
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ x: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <motion.div
                  animate={{ x: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </motion.div>
                <span className="relative">
                  Kembali ke Login
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 bg-gray-900"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div custom={1} variants={itemVariants} className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {step === 1 && 'Lupa Password'}
              {step === 2 && 'Verifikasi OTP'}
              {step === 3 && 'Password Baru'}
            </h1>
            <p className="text-sm text-gray-600">
              {step === 1 && 'Masukkan email Anda untuk menerima kode OTP'}
              {step === 2 && 'Masukkan kode OTP 6 digit yang dikirim ke email Anda'}
              {step === 3 && 'Buat password baru yang kuat untuk akun Anda'}
            </p>
          </motion.div>

          {/* Success/Error Messages with Animation */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-600 flex items-center gap-3"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
            {success && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-600 flex items-center gap-3"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step Content with Smooth Animation */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6"
            >
              {/* Step 1: Email */}
              {step === 1 && (
                <form onSubmit={handleSendOTP} className="space-y-6">
                  <motion.div custom={2} variants={itemVariants} className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <motion.div 
                      className="relative group"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@masjid.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsHovered('email')}
                        onBlur={() => setIsHovered(null)}
                        className="pl-10 h-12 border-gray-900 focus:border-blue-500 focus:ring-blue-500 transition-all"
                        required
                      />
                      <motion.div 
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        animate={{ scale: isHovered === 'email' ? 1.1 : 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isHovered === 'email' && (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  <motion.div custom={3} variants={itemVariants}>
                    <motion.div
                      variants={buttonHoverVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 font-semibold text-base transition-all"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                            <span>Mengirim...</span>
                          </div>
                        ) : 'Kirim Kode OTP'}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              )}

              {/* Step 2: OTP */}
              {step === 2 && (
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <motion.div custom={2} variants={itemVariants} className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 text-center block">
                      Kode OTP
                    </Label>
                    <div className="flex justify-center gap-3">
                      {otp.map((digit, index) => (
                        <motion.input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-14 text-center text-2xl font-bold bg-white border-2 border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          whileFocus={{ scale: 1.05, borderColor: "#FBBF24" }}
                          required
                        />
                      ))}
                    </div>
                  </motion.div>

                  <motion.div custom={3} variants={itemVariants}>
                    <motion.div
                      variants={buttonHoverVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        id="submit-otp"
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 font-semibold text-base transition-all"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                            <span>Memverifikasi...</span>
                          </div>
                        ) : 'Verifikasi OTP'}
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div custom={4} variants={itemVariants} className="text-center">
                    <motion.button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={resendCountdown > 0}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-sm font-medium transition-all ${
                        resendCountdown > 0 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-blue-600 hover:text-blue-700 hover:underline'
                      }`}
                    >
                      {resendCountdown > 0 
                        ? `Kirim Ulang dalam ${resendCountdown}s` 
                        : 'Kirim Ulang Kode'}
                    </motion.button>
                  </motion.div>
                </form>
              )}

              {/* Step 3: New Password */}
              {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <motion.div custom={2} variants={itemVariants} className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password Baru
                    </Label>
                    <motion.div 
                      className="relative group"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Minimal 6 karakter dengan huruf kapital dan angka"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsHovered('password')}
                        onBlur={() => setIsHovered(null)}
                        className="pl-10 pr-10 h-12 border-gray-900 focus:border-blue-500 focus:ring-blue-500 transition-all"
                        required
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  <motion.div custom={3} variants={itemVariants} className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Konfirmasi Password
                    </Label>
                    <motion.div 
                      className="relative group"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Ulangi password baru"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setIsHovered('confirmPassword')}
                        onBlur={() => setIsHovered(null)}
                        className="pl-10 pr-10 h-12 border-gray-900 focus:border-blue-500 focus:ring-blue-500 transition-all"
                        required
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <motion.div 
                      custom={4} 
                      variants={itemVariants}
                      className="bg-blue-50 border border-blue-200 rounded-xl p-4"
                    >
                      <p className="text-sm text-blue-800">
                        <strong>Kekuatan Password:</strong>{' '}
                        {password.length < 6 && 'Terlalu pendek'}
                        {password.length >= 6 && !/(?=.*[A-Z])(?=.*[0-9])/.test(password) && 'Sedang'}
                        {password.length >= 6 && /(?=.*[A-Z])(?=.*[0-9])/.test(password) && 'Kuat âœ“'}
                      </p>
                    </motion.div>
                  )}

                  <motion.div custom={5} variants={itemVariants}>
                    <motion.div
                      variants={buttonHoverVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 font-semibold text-base transition-all"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                            <span>Menyimpan...</span>
                          </div>
                        ) : 'Reset Password'}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        variants={footerVariants}
        className="absolute bottom-6 left-0 right-0 text-center text-xs text-white/90 z-20"
      >
        Hak Cipta @danamasjid 2025 | Kebijakan Privasi
      </motion.div>
    </motion.div>
  );
}