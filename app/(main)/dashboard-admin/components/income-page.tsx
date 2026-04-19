"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { TrendingUp, Download, Filter, Plus, Calendar, Search, FileText, CheckCircle, Clock, AlertCircle, Eye, Trash2, Edit2, MoreVertical, Printer, Share2 } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { StatsCard } from "./stats-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const DataTable = dynamic(() => import("./data-table").then(m => m.DataTable), { 
  ssr: false,
  loading: () => <div className="p-8 text-center bg-muted animate-pulse rounded-lg text-sm text-muted-foreground">Memuat data...</div>
})

type Income = {
  id: string
  date: string
  time: string
  donor: string
  donorPhone: string
  category: string
  subcategory: string
  amount: number
  method: string
  referenceNumber: string
  notes: string
  status: "verified" | "pending" | "rejected"
  verifiedBy?: string
  verifiedAt?: string
  receiptUrl?: string
}

// Data pemasukan yang lebih lengkap dan realistis
const incomeData: Income[] = [
  {
    id: "INC-2024-001",
    date: "2024-06-15",
    time: "14:30",
    donor: "Ahmad Yani",
    donorPhone: "081234567890",
    category: "Donasi Rutin",
    subcategory: "Jumat",
    amount: 500000,
    method: "Transfer Bank BCA",
    referenceNumber: "TRF20240615143001",
    notes: "Donasi rutin Jumat minggu ke-2",
    status: "verified",
    verifiedBy: "Admin Keuangan",
    verifiedAt: "2024-06-15 15:00",
    receiptUrl: "/receipts/001.pdf",
  },
  {
    id: "INC-2024-002",
    date: "2024-06-15",
    time: "10:15",
    donor: "Siti Nurhaliza",
    donorPhone: "082345678901",
    category: "Infaq",
    subcategory: "Pembangunan",
    amount: 1000000,
    method: "Tunai",
    referenceNumber: "CASH20240615101501",
    notes: "Infaq untuk renovasi musholla",
    status: "verified",
    verifiedBy: "Admin Keuangan",
    verifiedAt: "2024-06-15 10:30",
  },
  {
    id: "INC-2024-003",
    date: "2024-06-14",
    time: "16:45",
    donor: "Budi Santoso",
    donorPhone: "083456789012",
    category: "Zakat",
    subcategory: "Zakat Fitrah",
    amount: 2500000,
    method: "Transfer Bank Mandiri",
    referenceNumber: "TRF20240614164501",
    notes: "Zakat fitrah untuk 5 orang keluarga @ Rp 500.000",
    status: "verified",
    verifiedBy: "Admin Keuangan",
    verifiedAt: "2024-06-14 17:00",
    receiptUrl: "/receipts/003.pdf",
  },
  {
    id: "INC-2024-004",
    date: "2024-06-14",
    time: "09:20",
    donor: "Rina Wijaya",
    donorPhone: "084567890123",
    category: "Sedekah",
    subcategory: "Sedekah Jariyah",
    amount: 750000,
    method: "GoPay",
    referenceNumber: "GP20240614092001",
    notes: "Sedekah jariyah untuk operasional masjid",
    status: "pending",
  },
  {
    id: "INC-2024-005",
    date: "2024-06-13",
    time: "11:30",
    donor: "Hendra Kusuma",
    donorPhone: "085678901234",
    category: "Donasi Pembangunan",
    subcategory: "Renovasi",
    amount: 5000000,
    method: "Transfer Bank BNI",
    referenceNumber: "TRF20240613113001",
    notes: "Donasi renovasi musholla lantai 2",
    status: "verified",
    verifiedBy: "Ketua Takmir",
    verifiedAt: "2024-06-13 12:00",
    receiptUrl: "/receipts/005.pdf",
  },
  {
    id: "INC-2024-006",
    date: "2024-06-13",
    time: "13:00",
    donor: "Dewi Lestari",
    donorPhone: "086789012345",
    category: "Donasi Rutin",
    subcategory: "Jumat",
    amount: 300000,
    method: "Tunai",
    referenceNumber: "CASH20240613130001",
    notes: "Donasi Jumat",
    status: "verified",
    verifiedBy: "Admin Keuangan",
    verifiedAt: "2024-06-13 13:15",
  },
  {
    id: "INC-2024-007",
    date: "2024-06-12",
    time: "15:45",
    donor: "Agus Setiawan",
    donorPhone: "087890123456",
    category: "Infaq",
    subcategory: "Operasional",
    amount: 1500000,
    method: "Transfer Bank BRI",
    referenceNumber: "TRF20240612154501",
    notes: "Infaq untuk operasional masjid bulan Juni",
    status: "verified",
    verifiedBy: "Admin Keuangan",
    verifiedAt: "2024-06-12 16:00",
    receiptUrl: "/receipts/007.pdf",
  },
  {
    id: "INC-2024-008",
    date: "2024-06-12",
    time: "12:00",
    donor: "Anonim",
    donorPhone: "-",
    category: "Sedekah",
    subcategory: "Kotak Amal",
    amount: 200000,
    method: "Kotak Amal",
    referenceNumber: "BOX20240612120001",
    notes: "Kotak amal masjid - perhitungan harian",
    status: "verified",
    verifiedBy: "Admin Keuangan",
    verifiedAt: "2024-06-12 12:30",
  },
  {
    id: "INC-2024-009",
    date: "2024-06-11",
    time: "08:30",
    donor: "Fajar Ramadhan",
    donorPhone: "088901234567",
    category: "Zakat",
    subcategory: "Zakat Mal",
    amount: 3500000,
    method: "Transfer Bank BCA",
    referenceNumber: "TRF20240611083001",
    notes: "Zakat mal 2.5% dari harta",
    status: "verified",
    verifiedBy: "Admin Keuangan",
    verifiedAt: "2024-06-11 09:00",
    receiptUrl: "/receipts/009.pdf",
  },
  {
    id: "INC-2024-010",
    date: "2024-06-11",
    time: "17:20",
    donor: "Lina Marlina",
    donorPhone: "089012345678",
    category: "Donasi Pembangunan",
    subcategory: "Pengadaan",
    amount: 2000000,
    method: "OVO",
    referenceNumber: "OVO20240611172001",
    notes: "Donasi pengadaan sound system masjid",
    status: "pending",
  },
  {
    id: "INC-2024-011",
    date: "2024-06-10",
    time: "14:15",
    donor: "Yusuf Ibrahim",
    donorPhone: "081123456789",
    category: "Infaq",
    subcategory: "Pendidikan",
    amount: 1200000,
    method: "Transfer Bank Mandiri",
    referenceNumber: "TRF20240610141501",
    notes: "Infaq untuk program TPA dan kajian",
    status: "verified",
    verifiedBy: "Admin Keuangan",
    verifiedAt: "2024-06-10 14:45",
    receiptUrl: "/receipts/011.pdf",
  },
  {
    id: "INC-2024-012",
    date: "2024-06-10",
    time: "10:00",
    donor: "Anonim",
    donorPhone: "-",
    category: "Sedekah",
    subcategory: "Kotak Amal",
    amount: 350000,
    method: "Kotak Amal",
    referenceNumber: "BOX20240610100001",
    notes: "Kotak amal masjid - perhitungan harian",
    status: "verified",
    verifiedBy: "Admin Keuangan",
    verifiedAt: "2024-06-10 10:30",
  },
]

const statsData = [
  {
    title: "Total Pemasukan Bulan Ini",
    value: "Rp 18.8M",
    change: 12.5,
    icon: TrendingUp,
    description: "Juni 2024 (12 transaksi)",
    trend: "up" as const,
    color: "green",
  },
  {
    title: "Donasi Rutin & Infaq",
    value: "Rp 4.5M",
    change: 8.3,
    icon: TrendingUp,
    description: "Jumat, Infaq, Operasional",
    trend: "up" as const,
    color: "blue",
  },
  {
    title: "Donasi Pembangunan",
    value: "Rp 8.0M",
    change: 15.7,
    icon: TrendingUp,
    description: "Renovasi & Pengadaan",
    trend: "up" as const,
    color: "purple",
  },
  {
    title: "Zakat & Sedekah",
    value: "Rp 6.3M",
    change: 5.2,
    icon: TrendingUp,
    description: "Zakat Fitrah, Mal, Sedekah",
    trend: "up" as const,
    color: "yellow",
  },
]

export function IncomePage() {
  const [incomes, setIncomes] = useState<Income[]>(incomeData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)

  // Form state for new income
  const [newIncome, setNewIncome] = useState<Partial<Income>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    category: "Infaq",
    status: "verified",
    method: "Tunai",
  })

  const handleAddIncome = () => {
    const id = `INC-${new Date().getFullYear()}-${String(incomes.length + 1).padStart(3, '0')}`
    const incomeToAdd = { ...newIncome, id } as Income
    setIncomes([incomeToAdd, ...incomes])
    setIsAddOpen(false)
    setNewIncome({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      category: "Infaq",
      status: "verified",
      method: "Tunai",
    })
  }

  const handleDeleteIncome = (id: string) => {
    setIncomes(incomes.filter(inc => inc.id !== id))
  }

  const columns: ColumnDef<Income>[] = useMemo(() => [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-mono text-[10px] text-muted-foreground">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "date",
      header: "Waktu",
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"))
        return (
          <div className="flex flex-col">
            <span className="font-medium text-xs">
              {date.toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
            </span>
            <span className="text-[10px] text-muted-foreground">{row.original.time}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "donor",
      header: "Donatur",
      cell: ({ row }) => (
        <div className="flex flex-col max-w-[150px]">
          <span className="font-semibold truncate text-sm">{row.getValue("donor")}</span>
          <span className="text-[10px] text-muted-foreground truncate">{row.original.donorPhone}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Kategori",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <Badge variant="outline" className="w-fit text-[10px] font-normal py-0">
            {row.getValue("category")}
          </Badge>
          <span className="text-[10px] text-muted-foreground mt-0.5">{row.original.subcategory}</span>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Jumlah",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(amount)
        return <div className="font-bold text-green-600 dark:text-green-400 text-sm">{formatted}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge 
            className={`text-[10px] px-2 py-0 font-medium ${
              status === "verified" 
                ? "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200" 
                : status === "pending"
                ? "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-200"
                : "bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-200"
            }`}
            variant="outline"
          >
            {status === "verified" ? "Sukses" : status === "pending" ? "Proses" : "Gagal"}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {
              setSelectedIncome(row.original)
              setIsDetailsOpen(true)
            }}>
              <Eye className="mr-2 h-4 w-4" /> Detail
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit2 className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Printer className="mr-2 h-4 w-4" /> Cetak Kwitansi
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600"
              onClick={() => handleDeleteIncome(row.original.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [incomes])

  const filteredData = useMemo(() => {
    return incomes.filter(item => {
      const matchesSearch = 
        item.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.donorPhone.includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = filterCategory === "all" || item.category === filterCategory
      const matchesStatus = filterStatus === "all" || item.status === filterStatus
      
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [incomes, searchTerm, filterCategory, filterStatus])

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Pemasukan Keuangan</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manajemen dan monitoring seluruh pemasukan masjid
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export Excel</span>
          </Button>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex-1 sm:flex-none">
                <Plus className="mr-2 h-4 w-4" />
                <span>Tambah Pemasukan</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Tambah Pemasukan Baru</DialogTitle>
                <DialogDescription>
                  Masukkan detail pemasukan atau donasi yang diterima.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="donor">Nama Donatur</Label>
                    <Input 
                      id="donor" 
                      placeholder="Contoh: H. Ahmad" 
                      value={newIncome.donor || ""}
                      onChange={(e) => setNewIncome({...newIncome, donor: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor HP</Label>
                    <Input 
                      id="phone" 
                      placeholder="0812..." 
                      value={newIncome.donorPhone || ""}
                      onChange={(e) => setNewIncome({...newIncome, donorPhone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select 
                      value={newIncome.category} 
                      onValueChange={(v) => setNewIncome({...newIncome, category: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Infaq">Infaq</SelectItem>
                        <SelectItem value="Zakat">Zakat</SelectItem>
                        <SelectItem value="Sedekah">Sedekah</SelectItem>
                        <SelectItem value="Wakaf">Wakaf</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Jumlah (Rp)</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      placeholder="0"
                      value={newIncome.amount || ""}
                      onChange={(e) => setNewIncome({...newIncome, amount: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Keterangan</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Contoh: Infaq pembangunan lantai 2"
                    value={newIncome.notes || ""}
                    onChange={(e) => setNewIncome({...newIncome, notes: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Batal</Button>
                <Button onClick={handleAddIncome}>Simpan Pemasukan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Advanced Filters & Search */}
      <div className="rounded-xl border bg-card p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari donatur, ID transaksi, atau nomor HP..." 
              className="pl-10 h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[160px] h-10">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Donasi Rutin">Donasi Rutin</SelectItem>
                <SelectItem value="Infaq">Infaq</SelectItem>
                <SelectItem value="Zakat">Zakat</SelectItem>
                <SelectItem value="Sedekah">Sedekah</SelectItem>
                <SelectItem value="Donasi Pembangunan">Pembangunan</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px] h-10">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="sm" onClick={() => {
              setSearchTerm("")
              setFilterCategory("all")
              setFilterStatus("all")
            }}>
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Income Table */}
      <div className="rounded-xl border bg-card shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/50">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            Riwayat Transaksi
            <Badge variant="secondary" className="font-normal">{filteredData.length}</Badge>
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Total Filtered:</span>
            <span className="font-bold text-green-600">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(filteredData.reduce((sum, item) => sum + item.amount, 0))}
            </span>
          </div>
        </div>
        <div className="p-0">
          <DataTable
            columns={columns as any}
            data={filteredData}
            searchKey="donor"
          />
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Detail Transaksi
              {selectedIncome && (
                <Badge variant="outline" className="font-mono text-[10px]">
                  {selectedIncome.id}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedIncome && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                <div>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium uppercase tracking-wider">Jumlah Pemasukan</p>
                  <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(selectedIncome.amount)}
                  </h3>
                </div>
                <Badge className={
                  selectedIncome.status === "verified" ? "bg-green-500" : 
                  selectedIncome.status === "pending" ? "bg-yellow-500" : "bg-red-500"
                }>
                  {selectedIncome.status.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs text-gray-500">Donatur</p>
                  <p className="font-semibold">{selectedIncome.donor}</p>
                  <p className="text-xs text-muted-foreground">{selectedIncome.donorPhone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs text-gray-500">Waktu Transaksi</p>
                  <p className="font-semibold">
                    {new Date(selectedIncome.date).toLocaleDateString("id-ID", {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">{selectedIncome.time} WIB</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs text-gray-500">Kategori</p>
                  <p className="font-semibold">{selectedIncome.category}</p>
                  <p className="text-xs text-muted-foreground">{selectedIncome.subcategory}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs text-gray-500">Metode Pembayaran</p>
                  <p className="font-semibold">{selectedIncome.method}</p>
                  <p className="text-xs text-muted-foreground font-mono">{selectedIncome.referenceNumber}</p>
                </div>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border">
                <p className="text-xs font-medium text-gray-500">Keterangan / Catatan</p>
                <p className="text-sm italic">"{selectedIncome.notes || 'Tidak ada catatan'}"</p>
              </div>

              {selectedIncome.verifiedBy && (
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground border-t pt-4">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Diverifikasi oleh <span className="font-bold">{selectedIncome.verifiedBy}</span> pada {selectedIncome.verifiedAt}
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Tutup</Button>
            <Button className="gap-2">
              <Printer className="h-4 w-4" />
              Cetak Bukti
            </Button>
            <Button variant="secondary" className="gap-2">
              <Share2 className="h-4 w-4" />
              Bagikan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
