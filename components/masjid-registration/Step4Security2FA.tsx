"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Smartphone, Mail, Key, Check, AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface Step4Security2FAProps {
  onNext: () => void
  onBack: () => void
}

export function Step4Security2FA({ onNext, onBack }: Step4Security2FAProps) {
  const [enable2FA, setEnable2FA] = useState(false)
  const [method2FA, setMethod2FA] = useState<"email" | "sms" | "app">("email")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [showBackupCodes, setShowBackupCodes] = useState(false)

  const generateBackupCodes = () => {
    const codes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 10).toUpperCase()
    )
    setBackupCodes(codes)
    setShowBackupCodes(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (enable2FA && !showBackupCodes) {
      generateBackupCodes()
    } else {
      onNext()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Keamanan Akun</h2>
        <p className="text-slate-600">
          Tingkatkan keamanan akun dengan Two-Factor Authentication (2FA)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Enable 2FA Toggle */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Two-Factor Authentication</h3>
              </div>
              <p className="text-sm text-slate-600">
                Tambahkan lapisan keamanan ekstra untuk melindungi akun masjid Anda
              </p>
            </div>
            <Switch
              checked={enable2FA}
              onCheckedChange={setEnable2FA}
              className="ml-4"
            />
          </div>

          {enable2FA && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="space-y-4 mt-4 pt-4 border-t border-blue-200"
            >
              {/* 2FA Method Selection */}
              <div>
                <Label className="text-sm font-semibold mb-3 block">
                  Pilih Metode Verifikasi
                </Label>
                <div className="grid gap-3">
                  {/* Email Method */}
                  <button
                    type="button"
                    onClick={() => setMethod2FA("email")}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
                      method2FA === "email"
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <Mail className={`w-5 h-5 mt-0.5 ${method2FA === "email" ? "text-blue-600" : "text-slate-400"}`} />
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Email OTP</span>
                        {method2FA === "email" && <Check className="w-4 h-4 text-blue-600" />}
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        Kode verifikasi akan dikirim ke email terdaftar
                      </p>
                    </div>
                  </button>

                  {/* SMS Method */}
                  <button
                    type="button"
                    onClick={() => setMethod2FA("sms")}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
                      method2FA === "sms"
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <Smartphone className={`w-5 h-5 mt-0.5 ${method2FA === "sms" ? "text-blue-600" : "text-slate-400"}`} />
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">SMS OTP</span>
                        {method2FA === "sms" && <Check className="w-4 h-4 text-blue-600" />}
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        Kode verifikasi akan dikirim via SMS
                      </p>
                    </div>
                  </button>

                  {/* Authenticator App Method */}
                  <button
                    type="button"
                    onClick={() => setMethod2FA("app")}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
                      method2FA === "app"
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <Key className={`w-5 h-5 mt-0.5 ${method2FA === "app" ? "text-blue-600" : "text-slate-400"}`} />
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Authenticator App</span>
                        {method2FA === "app" && <Check className="w-4 h-4 text-blue-600" />}
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                          Recommended
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        Gunakan Google Authenticator atau Microsoft Authenticator
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Phone Number Input for SMS */}
              {method2FA === "sms" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <Label htmlFor="phone2fa">Nomor Telepon</Label>
                  <input
                    id="phone2fa"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="08123456789"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </motion.div>
              )}

              {/* Backup Codes Display */}
              {showBackupCodes && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4"
                >
                  <div className="flex items-start gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900">Backup Codes</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Simpan kode-kode ini di tempat aman. Gunakan jika Anda kehilangan akses ke metode 2FA.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {backupCodes.map((code, index) => (
                      <div
                        key={index}
                        className="bg-white px-3 py-2 rounded border border-yellow-200 font-mono text-sm text-center"
                      >
                        {code}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const text = backupCodes.join("\n")
                      navigator.clipboard.writeText(text)
                    }}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Copy All Codes
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">Mengapa 2FA Penting?</p>
              <ul className="space-y-1 text-blue-800">
                <li>• Melindungi akun dari akses tidak sah</li>
                <li>• Mencegah pencurian data donasi</li>
                <li>• Meningkatkan kepercayaan donatur</li>
                <li>• Dapat dinonaktifkan kapan saja dari dashboard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            {enable2FA && !showBackupCodes ? "Generate Backup Codes" : "Lanjutkan"}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
