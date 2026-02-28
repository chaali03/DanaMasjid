// @ts-nocheck
import { Users, Upload, CheckCircle2, User, Mail, Phone, MapPin, CreditCard } from "lucide-react"

interface Step3Props {
  formData: any
  setFormData: (data: any) => void
  handleFileChange: (field: string, file: File | null) => void
}

export default function Step3PerwakilanResmi({ formData, setFormData, handleFileChange }: Step3Props) {
  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2 sm:gap-3">
          <Users className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 flex-shrink-0" />
          <span>Perwakilan Resmi</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Anda harus memiliki otorisasi untuk membuat tindakan dan keputusan penting atas nama masjid Anda
        </p>
      </div>

      {/* Data Pribadi Section */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-purple-100">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2 mb-3 sm:mb-4">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
          <span>Data Pribadi</span>
        </h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Nama Depan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.namaDepan}
                onChange={(e) => setFormData({...formData, namaDepan: e.target.value})}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-900 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Nama Belakang <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.namaBelakang}
                onChange={(e) => setFormData({...formData, namaBelakang: e.target.value})}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-900 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.jenisKelamin}
                onChange={(e) => setFormData({...formData, jenisKelamin: e.target.value})}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-900 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              >
                <option value="">Pilih</option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Pekerjaan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.pekerjaan}
                onChange={(e) => setFormData({...formData, pekerjaan: e.target.value})}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-900 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Contoh: Pengusaha, Pegawai, dll"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-purple-100 rounded-lg sm:rounded-xl">
            <input
              type="checkbox"
              id="isPemilik"
              checked={formData.isPemilikBisnis}
              onChange={(e) => setFormData({...formData, isPemilikBisnis: e.target.checked})}
              className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 flex-shrink-0"
            />
            <label htmlFor="isPemilik" className="text-xs sm:text-sm font-medium text-gray-700 cursor-pointer">
              Saya juga pengurus masjid ini
            </label>
          </div>
        </div>
      </div>

      {/* Kontak Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-blue-100">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2 mb-3 sm:mb-4">
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
          <span>Informasi Kontak</span>
        </h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.emailPerwakilan}
                onChange={(e) => setFormData({...formData, emailPerwakilan: e.target.value})}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-900 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Tanggal Lahir <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.tanggalLahir}
                onChange={(e) => setFormData({...formData, tanggalLahir: e.target.value})}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-900 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
              Nomor Handphone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.nomorHandphone}
              onChange={(e) => setFormData({...formData, nomorHandphone: e.target.value})}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-900 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="08xxxxxxxxxx"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
              Alamat Tempat Tinggal <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.alamatTempat}
              onChange={(e) => setFormData({...formData, alamatTempat: e.target.value})}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-900 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              rows={3}
              placeholder="Alamat lengkap tempat tinggal"
              required
            />
          </div>
        </div>
      </div>

      {/* Identitas Section */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-orange-100">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2 mb-3 sm:mb-4">
          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
          <span>Dokumen Identitas</span>
        </h3>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pilih ID <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.jenisID}
              onChange={(e) => setFormData({...formData, jenisID: e.target.value})}
              className="w-full px-4 py-3 bg-white border-2 border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              required
            >
              <option value="KTP">KTP</option>
              <option value="Paspor">Paspor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Foto {formData.jenisID} <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-all bg-white">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                onChange={(e) => handleFileChange('fotoKTP', e.target.files?.[0] || null)}
                className="hidden"
                id="fotoKTP"
                required
              />
              <label htmlFor="fotoKTP" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700 mb-1">Unggah atau seret file ke sini</p>
                <p className="text-xs text-gray-500">Format File: .jpeg, .jpg, .png, .pdf (Max 2MB)</p>
              </label>
            </div>
            {formData.fotoKTP && (
              <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {formData.fotoKTP.name} ({(formData.fotoKTP.size / 1024).toFixed(0)} KB)
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nomor {formData.jenisID} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.nomorKTP}
              onChange={(e) => setFormData({...formData, nomorKTP: e.target.value})}
              className="w-full px-4 py-3 bg-white border-2 border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="16 digit"
              maxLength={16}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Surat Kuasa <span className="text-gray-400">(Opsional)</span>
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Jika Anda belum memilikinya, Anda dapat mengunduh templat ini
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-all bg-white">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                onChange={(e) => handleFileChange('suratKuasa', e.target.files?.[0] || null)}
                className="hidden"
                id="suratKuasa"
              />
              <label htmlFor="suratKuasa" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700 mb-1">Unggah atau seret file ke sini</p>
                <p className="text-xs text-gray-500">Format File: .jpeg, .jpg, .png, .pdf (Max 2MB)</p>
              </label>
            </div>
            {formData.suratKuasa && (
              <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {formData.suratKuasa.name} ({(formData.suratKuasa.size / 1024).toFixed(0)} KB)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Kontak Person Section */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-cyan-200">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Kontak Person Utama</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Kami akan mengirim semua notifikasi ke orang ini</p>
        <div className="flex items-start sm:items-center gap-2 sm:gap-3">
          <input
            type="checkbox"
            id="kontakSama"
            checked={formData.kontakPersonSama}
            onChange={(e) => setFormData({...formData, kontakPersonSama: e.target.checked})}
            className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0 mt-0.5 sm:mt-0"
          />
          <label htmlFor="kontakSama" className="text-xs sm:text-sm font-medium text-gray-700 cursor-pointer">
            Kontak person utama sama dengan Perwakilan Resmi
          </label>
        </div>
      </div>
    </div>
  )
}
