"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { TrendingDown, Download, Filter, Plus, Calendar, FileText, CheckCircle, Clock, AlertCircle, Receipt, Eye, Trash2, Edit2, MoreVertical, Printer, Share2, Search } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { StatsCard } from "./stats-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
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

type Expense = {
  id: string
  date: string
  time: string
  description: string
  category: string
  subcategory: string
  amount: number
  recipient: string
  recipientAccount: string
  paymentMethod: string
  referenceNumber: string
  notes: string
  status: "approved" | "pending" | "rejected"
  approvedBy?: string
  approvedAt?: string
  invoiceUrl?: string
  receiptUrl?: string
}

// Data pengeluaran yang lengkap dan realistis
const expenseData: Expense[] = [
  {
    id: "EXP-2024-001",
    date: "2024-06-15",
    time: "09:00",
    description: "Listrik Bulan Juni 2024",
    category: "Operasional",
    subcategory: "Utilitas",
    amount: 2500000,
    recipient: "PLN",
    recipientAccount: "ID PLN 123456789",
    paymentMethod: "Transfer Bank BCA",
    referenceNumber: "PLN20240615090001",
    notes: "Pembayaran listrik masjid bulan Juni 2024 - Daya 33.000 VA",
    status: "approved",
    approvedBy: "Bendahara",
    approvedAt: "2024-06-15 09:30",
    invoiceUrl: "/invoices/pln-001.pdf",
    receiptUrl: "/receipts/exp-001.pdf",
  },
  {
    id: "EXP-2024-002",
    date: "2024-06-14",
    time: "10:30",
    description: "Air PDAM Juni 2024",
    category: "Operasional",
    subcategory: "Utilitas",
    amount: 750000,
    recipient: "PDAM Kota",
    recipientAccount: "ID PDAM 987654321",
    paymentMethod: "Transfer Bank Mandiri",
    referenceNumber: "PDAM20240614103001",
    notes: "Pembayaran air bersih bulan Juni 2024",
    status: "approved",
    approvedBy: "Bendahara",
    approvedAt: "2024-06-14 11:00",
    invoiceUrl: "/invoices/pdam-001.pdf",
    receiptUrl: "/receipts/exp-002.pdf",
  },
  {
    id: "EXP-2024-003",
    date: "2024-06-13",
    time: "14:00",
    description: "Gaji Marbot Bulan Juni",
    category: "SDM",
    subcategory: "Gaji Tetap",
    amount: 4500000,
    recipient: "Pak Usman bin Ahmad",
    recipientAccount: "BCA 1234567890",
    paymentMethod: "Transfer Bank BCA",
    referenceNumber: "SAL20240613140001",
    notes: "Gaji marbot bulan Juni 2024 + tunjangan",
    status: "approved",
    approvedBy: "Ketua Takmir",
    approvedAt: "2024-06-13 14:30",
    receiptUrl: "/receipts/exp-003.pdf",
  },
  {
    id: "EXP-2024-004",
    date: "2024-06-13",
    time: "14:15",
    description: "Gaji Imam Bulan Juni",
    category: "SDM",
    subcategory: "Gaji Tetap",
    amount: 6000000,
    recipient: "Ustadz Ahmad Fauzi, S.Ag",
    recipientAccount: "Mandiri 9876543210",
    paymentMethod: "Transfer Bank Mandiri",
    referenceNumber: "SAL20240613141501",
    notes: "Gaji imam bulan Juni 2024 + tunjangan keluarga",
    status: "approved",
    approvedBy: "Ketua Takmir",
    approvedAt: "2024-06-13 14:45",
    receiptUrl: "/receipts/exp-004.pdf",
  },
  {
    id: "EXP-2024-005",
    date: "2024-06-12",
    time: "11:00",
    description: "Gaji Guru TPA (3 Orang)",
    category: "SDM",
    subcategory: "Gaji Honorer",
    amount: 4500000,
    recipient: "Tim Pengajar TPA",
    recipientAccount: "Multiple Accounts",
    paymentMethod: "Transfer Bank",
    referenceNumber: "SAL20240612110001",
    notes: "Gaji 3 guru TPA @ Rp 1.500.000 bulan Juni",
    status: "approved",
    approvedBy: "Ketua Takmir",
    approvedAt: "2024-06-12 11:30",
    receiptUrl: "/receipts/exp-005.pdf",
  },
  {
    id: "EXP-2024-006",
    date: "2024-06-11",
    time: "15:30",
    description: "Renovasi Toilet Masjid",
    category: "Pembangunan",
    subcategory: "Renovasi",
    amount: 15000000,
    recipient: "CV Berkah Jaya Konstruksi",
    recipientAccount: "BNI 5555666677",
    paymentMethod: "Transfer Bank BNI",
    referenceNumber: "CONS20240611153001",
    notes: "Renovasi 2 toilet masjid - Tahap pembayaran 1 dari 2",
    status: "approved",
    approvedBy: "Ketua Takmir",
    approvedAt: "2024-06-11 16:00",
    invoiceUrl: "/invoices/renovasi-001.pdf",
    receiptUrl: "/receipts/exp-006.pdf",
  },
  {
    id: "EXP-2024-007",
    date: "2024-06-10",
    time: "13:45",
    description: "Pembelian Karpet Sajadah",
    category: "Perlengkapan",
    subcategory: "Peralatan Ibadah",
    amount: 8500000,
    recipient: "Toko Karpet Madinah",
    recipientAccount: "BCA 3333444455",
    paymentMethod: "Transfer Bank BCA",
    referenceNumber: "SUPP20240610134501",
    notes: "Karpet sajadah turki 100 lembar @ Rp 85.000",
    status: "approved",
    approvedBy: "Bendahara",
    approvedAt: "2024-06-10 14:15",
    invoiceUrl: "/invoices/karpet-001.pdf",
    receiptUrl: "/receipts/exp-007.pdf",
  },
  {
    id: "EXP-2024-008",
    date: "2024-06-09",
    time: "16:00",
    description: "Konsumsi Kajian Ahad Pagi",
    category: "Kegiatan",
    subcategory: "Kajian Rutin",
    amount: 1200000,
    recipient: "Catering Barokah",
    recipientAccount: "BRI 7777888899",
    paymentMethod: "Transfer Bank BRI",
    referenceNumber: "CAT20240609160001",
    notes: "Konsumsi 100 porsi untuk kajian Ahad pagi",
    status: "approved",
    approvedBy: "Bendahara",
    approvedAt: "2024-06-09 16:30",
    invoiceUrl: "/invoices/catering-001.pdf",
    receiptUrl: "/receipts/exp-008.pdf",
  },
  {
    id: "EXP-2024-009",
    date: "2024-06-08",
    time: "10:20",
    description: "Alat Kebersihan Bulanan",
    category: "Operasional",
    subcategory: "Kebersihan",
    amount: 450000,
    recipient: "Toko Sumber Rezeki",
    recipientAccount: "Tunai",
    paymentMethod: "Tunai",
    referenceNumber: "CASH20240608102001",
    notes: "Sapu, pel, pembersih lantai, pewangi ruangan",
    status: "pending",
  },
  {
    id: "EXP-2024-010",
    date: "2024-06-07",
    time: "14:30",
    description: "Service AC Masjid (5 Unit)",
    category: "Pemeliharaan",
    subcategory: "Perawatan Rutin",
    amount: 2500000,
    recipient: "CV Dingin Sejahtera",
    recipientAccount: "Mandiri 2222333344",
    paymentMethod: "Transfer Bank Mandiri",
    referenceNumber: "MAINT20240607143001",
    notes: "Service rutin 5 unit AC @ Rp 500.000",
    status: "approved",
    approvedBy: "Bendahara",
    approvedAt: "2024-06-07 15:00",
    invoiceUrl: "/invoices/service-ac-001.pdf",
    receiptUrl: "/receipts/exp-010.pdf",
  },
  {
    id: "EXP-2024-011",
    date: "2024-06-06",
    time: "11:15",
    description: "Pembelian Al-Quran (20 Eksemplar)",
    category: "Perlengkapan",
    subcategory: "Peralatan Ibadah",
    amount: 3000000,
    recipient: "Toko Buku Islami Berkah",
    recipientAccount: "BCA 6666777788",
    paymentMethod: "Transfer Bank BCA",
    referenceNumber: "BOOK20240606111501",
    notes: "Al-Quran terjemahan ukuran A5 @ Rp 150.000",
    status: "approved",
    approvedBy: "Bendahara",
    approvedAt: "2024-06-06 11:45",
    invoiceUrl: "/invoices/alquran-001.pdf",
    receiptUrl: "/receipts/exp-011.pdf",
  },
  {
    id: "EXP-2024-012",
    date: "2024-06-05",
    time: "09:30",
    description: "Internet & Telepon Bulan Juni",
    category: "Operasional",
    subcategory: "Komunikasi",
    amount: 850000,
    recipient: "PT Telkom Indonesia",
    recipientAccount: "ID Telkom 111222333",
    paymentMethod: "Transfer Bank BCA",
    referenceNumber: "TELKOM20240605093001",
    notes: "Paket internet 100 Mbps + telepon",
    status: "approved",
    approvedBy: "Bendahara",
    approvedAt: "2024-06-05 10:00",
    invoiceUrl: "/invoices/telkom-001.pdf",
    receiptUrl: "/receipts/exp-012.pdf",
  },
]

const statsData = [
  {
    title: "Total Pengeluaran Bulan Ini",
    value: "Rp 49.2M",
    change: 8.3,
    icon: TrendingDown,
    description: "Juni 2024 (12 transaksi)",
    trend: "up" as const,
    color: "red",
  },
  {
    title: "Operasional & Pemeliharaan",
    value: "Rp 7.0M",
    change: 5.2,
    icon: TrendingDown,
    description: "Listrik, Air, Kebersihan, dll",
    trend: "up" as const,
    color: "orange",
  },
  {
    title: "SDM & Gaji",
    value: "Rp 15.0M",
    change: 2.1,
    icon: TrendingDown,
    description: "Imam, Marbot, Guru TPA",
    trend: "up" as const,
    color: "purple",
  },
  {
    title: "Pembangunan & Perlengkapan",
    value: "Rp 26.5M",
    change: 12.8,
    icon: TrendingDown,
    description: "Renovasi, Pengadaan",
    trend: "up" as const,
    color: "blue",
  },
]

export function ExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>(expenseData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)

  // Form state for new expense
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    category: "Operasional",
    status: "approved",
    paymentMethod: "Tunai",
  })

  const handleAddExpense = () => {
    const id = `EXP-${new Date().getFullYear()}-${String(expenses.length + 1).padStart(3, '0')}`
    const expenseToAdd = { ...newExpense, id } as Expense
    setExpenses([expenseToAdd, ...expenses])
    setIsAddOpen(false)
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      category: "Operasional",
      status: "approved",
      paymentMethod: "Tunai",
    })
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const columns: ColumnDef<Expense>[] = useMemo(() => [
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
      accessorKey: "description",
      header: "Keterangan",
      cell: ({ row }) => (
        <div className="flex flex-col max-w-[150px]">
          <span className="font-semibold truncate text-sm">{row.getValue("description")}</span>
          <span className="text-[10px] text-muted-foreground truncate">{row.original.recipient}</span>
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
        return <div className="font-bold text-red-600 dark:text-red-400 text-sm">{formatted}</div>
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
              status === "approved" 
                ? "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200" 
                : status === "pending"
                ? "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-200"
                : "bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-200"
            }`}
            variant="outline"
          >
            {status === "approved" ? "Selesai" : status === "pending" ? "Proses" : "Ditolak"}
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
              setSelectedExpense(row.original)
              setIsDetailsOpen(true)
            }}>
              <Eye className="mr-2 h-4 w-4" /> Detail
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit2 className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Receipt className="mr-2 h-4 w-4" /> Lihat Nota
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600"
              onClick={() => handleDeleteExpense(row.original.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [expenses])

  const filteredData = useMemo(() => {
    return expenses.filter(item => {
      const matchesSearch = 
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = filterCategory === "all" || item.category === filterCategory
      const matchesStatus = filterStatus === "all" || item.status === filterStatus
      
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [expenses, searchTerm, filterCategory, filterStatus])

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Pengeluaran Keuangan</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manajemen dan monitoring seluruh pengeluaran masjid
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
                <span>Tambah Pengeluaran</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Catat Pengeluaran Baru</DialogTitle>
                <DialogDescription>
                  Masukkan detail pengeluaran dana masjid.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Keterangan Pengeluaran</Label>
                  <Input 
                    id="description" 
                    placeholder="Contoh: Pembayaran Listrik Juni" 
                    value={newExpense.description || ""}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Penerima / Vendor</Label>
                    <Input 
                      id="recipient" 
                      placeholder="Contoh: PLN" 
                      value={newExpense.recipient || ""}
                      onChange={(e) => setNewExpense({...newExpense, recipient: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Jumlah (Rp)</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      placeholder="0"
                      value={newExpense.amount || ""}
                      onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select 
                      value={newExpense.category} 
                      onValueChange={(v) => setNewExpense({...newExpense, category: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Operasional">Operasional</SelectItem>
                        <SelectItem value="SDM">SDM</SelectItem>
                        <SelectItem value="Pembangunan">Pembangunan</SelectItem>
                        <SelectItem value="Pemeliharaan">Pemeliharaan</SelectItem>
                        <SelectItem value="Kegiatan">Kegiatan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="method">Metode Bayar</Label>
                    <Select 
                      value={newExpense.paymentMethod} 
                      onValueChange={(v) => setNewExpense({...newExpense, paymentMethod: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Metode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tunai">Tunai</SelectItem>
                        <SelectItem value="Transfer Bank">Transfer Bank</SelectItem>
                        <SelectItem value="Cek">Cek / Giro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan Tambahan</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Detail tambahan mengenai pengeluaran ini..."
                    value={newExpense.notes || ""}
                    onChange={(e) => setNewExpense({...newExpense, notes: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Batal</Button>
                <Button onClick={handleAddExpense}>Simpan Pengeluaran</Button>
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

      {/* Filters & Search */}
      <div className="rounded-xl border bg-card p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari keterangan, penerima, atau ID transaksi..." 
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
                <SelectItem value="Operasional">Operasional</SelectItem>
                <SelectItem value="SDM">SDM</SelectItem>
                <SelectItem value="Pembangunan">Pembangunan</SelectItem>
                <SelectItem value="Perlengkapan">Perlengkapan</SelectItem>
                <SelectItem value="Pemeliharaan">Pemeliharaan</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px] h-10">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
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

      {/* Expense Table */}
      <div className="rounded-xl border bg-card shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/50">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            Riwayat Pengeluaran
            <Badge variant="secondary" className="font-normal">{filteredData.length}</Badge>
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Total Filtered:</span>
            <span className="font-bold text-red-600">
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
            searchKey="description"
          />
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Detail Pengeluaran
              {selectedExpense && (
                <Badge variant="outline" className="font-mono text-[10px]">
                  {selectedExpense.id}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedExpense && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
                <div>
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium uppercase tracking-wider">Total Pengeluaran</p>
                  <h3 className="text-2xl font-bold text-red-700 dark:text-red-300">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(selectedExpense.amount)}
                  </h3>
                </div>
                <Badge className={
                  selectedExpense.status === "approved" ? "bg-green-500" : 
                  selectedExpense.status === "pending" ? "bg-yellow-500" : "bg-red-500"
                }>
                  {selectedExpense.status.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs text-gray-500">Keterangan</p>
                  <p className="font-semibold">{selectedExpense.description}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs text-gray-500">Penerima / Vendor</p>
                  <p className="font-semibold">{selectedExpense.recipient}</p>
                  <p className="text-[10px] text-muted-foreground">{selectedExpense.recipientAccount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs text-gray-500">Kategori</p>
                  <p className="font-semibold">{selectedExpense.category}</p>
                  <p className="text-xs text-muted-foreground">{selectedExpense.subcategory}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs text-gray-500">Waktu & Metode</p>
                  <p className="font-semibold">
                    {new Date(selectedExpense.date).toLocaleDateString("id-ID", {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })} - {selectedExpense.time}
                  </p>
                  <p className="text-xs text-muted-foreground">{selectedExpense.paymentMethod}</p>
                </div>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border">
                <p className="text-xs font-medium text-gray-500">Catatan Internal</p>
                <p className="text-sm italic">"{selectedExpense.notes || 'Tidak ada catatan'}"</p>
              </div>

              {selectedExpense.approvedBy && (
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground border-t pt-4">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Disetujui oleh <span className="font-bold">{selectedExpense.approvedBy}</span> pada {selectedExpense.approvedAt}
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Tutup</Button>
            <Button variant="secondary" className="gap-2">
              <Receipt className="h-4 w-4" />
              Lihat Nota / Invoice
            </Button>
            <Button className="gap-2">
              <Printer className="h-4 w-4" />
              Cetak Form Pengeluaran
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
