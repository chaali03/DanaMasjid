"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Shield,
  Key,
  Edit,
  Save,
  X,
  Users,
  FileText,
  Camera,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  QrCode,
} from "lucide-react"

// Data Masjid (dari registrasi - sesuai dengan Step1DataMasjid)
const mosqueData = {
  name: "Masjid Al-Ikhlas",
  address: "Jl. Raya Bogor No. 123",
  province: "DKI Jakarta",
  city: "Jakarta Timur",
  district: "Cakung",
  village: "Cakung Barat",
  postalCode: "13910",
  phone: "021-12345678",
  email: "masjid.alikhlas@gmail.com",
  established: "1995",
  capacity: "500 jamaah",
  landArea: "1000 m²",
  buildingArea: "600 m²",
  latitude: "-6.2088",
  longitude: "106.8456",
  facilities: ["Tempat Wudhu", "Toilet", "Parkir", "Sound System", "AC", "Perpustakaan"],
  description: "Masjid Al-Ikhlas adalah masjid yang terletak di kawasan Cakung, Jakarta Timur. Masjid ini aktif dalam kegiatan dakwah dan pembinaan umat.",
}

// Data Pengurus
const managementData = [
  {
    id: 1,
    name: "H. Ahmad Dahlan",
    position: "Ketua Takmir",
    phone: "0812-3456-7890",
    email: "ahmad.dahlan@gmail.com",
    photo: "/images/user-1.jpg",
    joinDate: "2020-01-15",
  },
  {
    id: 2,
    name: "Drs. Budi Santoso",
    position: "Bendahara",
    phone: "0813-4567-8901",
    email: "budi.santoso@gmail.com",
    photo: "/images/user-2.jpg",
    joinDate: "2020-01-15",
  },
  {
    id: 3,
    name: "Ir. Chandra Wijaya",
    position: "Sekretaris",
    phone: "0814-5678-9012",
    email: "chandra.wijaya@gmail.com",
    photo: "/images/user-3.jpg",
    joinDate: "2020-02-01",
  },
  {
    id: 4,
    name: "Hj. Dewi Sartika",
    position: "Koordinator Kegiatan",
    phone: "0815-6789-0123",
    email: "dewi.sartika@gmail.com",
    photo: "/images/user-4.jpg",
    joinDate: "2020-03-10",
  },
]

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [show2FASetup, setShow2FASetup] = useState(false)
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const handle2FAToggle = () => {
    if (is2FAEnabled) {
      // Disable 2FA
      setIs2FAEnabled(false)
      alert("2FA berhasil dinonaktifkan")
    } else {
      // Show 2FA setup
      setShow2FASetup(true)
    }
  }

  const handleVerify2FA = () => {
    if (verificationCode.length === 6) {
      setIs2FAEnabled(true)
      setShow2FASetup(false)
      setVerificationCode("")
      alert("2FA berhasil diaktifkan!")
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Profil Masjid</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Kelola informasi masjid dan pengurus
          </p>
        </div>
        <Button
          variant={isEditing ? "destructive" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Batal
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profil
            </>
          )}
        </Button>
      </div>

      {/* Mosque Profile Card */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="rounded-lg border bg-card p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Informasi Masjid</h2>
                <p className="text-sm text-muted-foreground">Data dasar masjid</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nama Masjid</label>
                <p className="mt-1 text-base font-semibold">{mosqueData.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tahun Berdiri</label>
                <p className="mt-1 text-base font-semibold">{mosqueData.established}</p>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Alamat Lengkap</label>
                <p className="mt-1 text-base">{mosqueData.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Provinsi</label>
                <p className="mt-1 text-base">{mosqueData.province}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Kota/Kabupaten</label>
                <p className="mt-1 text-base">{mosqueData.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Kecamatan</label>
                <p className="mt-1 text-base">{mosqueData.district}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Kelurahan</label>
                <p className="mt-1 text-base">{mosqueData.village}</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="rounded-lg border bg-card p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Kontak</h2>
                <p className="text-sm text-muted-foreground">Informasi kontak masjid</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telepon</label>
                  <p className="text-base font-semibold">{mosqueData.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-base font-semibold">{mosqueData.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-lg border bg-card p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Deskripsi Masjid</h2>
                <p className="text-sm text-muted-foreground">Tentang masjid</p>
              </div>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed">
              {mosqueData.description}
            </p>
          </div>

          {/* Location */}
          <div className="rounded-lg border bg-card p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Lokasi</h2>
                <p className="text-sm text-muted-foreground">Koordinat GPS</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Latitude</label>
                <p className="mt-1 text-base font-mono">{mosqueData.latitude}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Longitude</label>
                <p className="mt-1 text-base font-mono">{mosqueData.longitude}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              <MapPin className="h-4 w-4 mr-2" />
              Lihat di Peta
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Security Settings */}
          <div className="rounded-lg border bg-card p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Keamanan</h2>
                <p className="text-sm text-muted-foreground">Pengaturan keamanan akun</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* 2FA Toggle */}
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Two-Factor Authentication</span>
                  </div>
                  {is2FAEnabled && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Tambahkan lapisan keamanan ekstra dengan 2FA
                </p>
                <Button
                  variant={is2FAEnabled ? "destructive" : "default"}
                  size="sm"
                  className="w-full"
                  onClick={handle2FAToggle}
                >
                  {is2FAEnabled ? "Nonaktifkan 2FA" : "Aktifkan 2FA"}
                </Button>
              </div>

              {/* Change Password */}
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Key className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold">Ubah Password</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Update password secara berkala
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Ubah Password
                </Button>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="rounded-lg border bg-card p-6 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-semibold mb-4">Fasilitas</h3>
            <div className="flex flex-wrap gap-2">
              {mosqueData.facilities.map((facility, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full"
                >
                  {facility}
                </span>
              ))}
            </div>
          </div>

          {/* Capacity */}
          <div className="rounded-lg border bg-card p-6 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-semibold mb-4">Kapasitas & Luas</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">Kapasitas</label>
                <p className="font-semibold">{mosqueData.capacity}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Luas Tanah</label>
                <p className="font-semibold">{mosqueData.landArea}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Luas Bangunan</label>
                <p className="font-semibold">{mosqueData.buildingArea}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Management Team */}
      <div className="rounded-lg border bg-card p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Users className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Pengurus Masjid</h2>
              <p className="text-sm text-muted-foreground">Daftar pengurus dan takmir</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Kelola Pengurus
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {managementData.map((person) => (
            <div
              key={person.id}
              className="p-4 rounded-lg border bg-gray-50 dark:bg-gray-900/50 dark:border-gray-700 hover:shadow-md transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-3">
                  {person.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-base">{person.name}</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">
                  {person.position}
                </p>
                <div className="mt-3 space-y-1 w-full">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{person.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{person.email}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Bergabung: {new Date(person.joinDate).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2FA Setup Modal */}
      {show2FASetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Setup Two-Factor Authentication</h3>
              <button
                onClick={() => setShow2FASetup(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Step 1: Scan QR */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    1
                  </div>
                  <h4 className="font-semibold">Scan QR Code</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Gunakan aplikasi authenticator (Google Authenticator, Authy, dll) untuk scan QR code ini:
                </p>
                <div className="flex justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="h-48 w-48 bg-white rounded-lg flex items-center justify-center">
                    <QrCode className="h-32 w-32 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Step 2: Enter Code */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    2
                  </div>
                  <h4 className="font-semibold">Masukkan Kode Verifikasi</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Masukkan 6 digit kode dari aplikasi authenticator:
                </p>
                <input
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full px-4 py-3 text-center text-2xl font-mono tracking-widest border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShow2FASetup(false)}
                >
                  Batal
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleVerify2FA}
                  disabled={verificationCode.length !== 6}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Verifikasi & Aktifkan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            <X className="h-4 w-4 mr-2" />
            Batal
          </Button>
          <Button onClick={() => setIsEditing(false)}>
            <Save className="h-4 w-4 mr-2" />
            Simpan Perubahan
          </Button>
        </div>
      )}
    </div>
  )
}
