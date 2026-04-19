"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { Calendar, Users, DollarSign, Plus, Filter, Download, Search, MoreVertical, Eye, Edit2, Trash2, Printer, Share2, TrendingUp, TrendingDown, Target, Clock, CheckCircle } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { StatsCard } from "./stats-card"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

const DataTable = dynamic(() => import("./data-table").then(m => m.DataTable), { 
  ssr: false,
  loading: () => <div className="p-8 text-center bg-muted animate-pulse rounded-lg text-sm text-muted-foreground">Memuat data...</div>
})

type Program = {
  id: string
  name: string
  category: string
  startDate: string
  endDate: string
  budget: number
  spent: number
  participants: number
  status: "planned" | "ongoing" | "completed"
  description: string
}

const programsData: Program[] = [
  {
    id: "1",
    name: "Renovasi Musholla",
    category: "Pembangunan",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    budget: 150000000,
    spent: 75000000,
    participants: 0,
    status: "ongoing",
    description: "Renovasi total musholla lantai 2",
  },
  {
    id: "2",
    name: "Kajian Rutin Ahad Pagi",
    category: "Kegiatan Rutin",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    budget: 24000000,
    spent: 12000000,
    participants: 150,
    status: "ongoing",
    description: "Kajian setiap Ahad pagi jam 06:00",
  },
  {
    id: "3",
    name: "Santunan Anak Yatim",
    category: "Sosial",
    startDate: "2024-07-15",
    endDate: "2024-07-15",
    budget: 25000000,
    spent: 0,
    participants: 100,
    status: "planned",
    description: "Santunan bulanan anak yatim",
  },
  {
    id: "4",
    name: "Pelatihan Tahfidz",
    category: "Pendidikan",
    startDate: "2024-06-01",
    endDate: "2024-12-31",
    budget: 18000000,
    spent: 9000000,
    participants: 45,
    status: "ongoing",
    description: "Program tahfidz untuk anak-anak",
  },
  {
    id: "5",
    name: "Buka Puasa Bersama Ramadan",
    category: "Kegiatan Khusus",
    startDate: "2024-03-15",
    endDate: "2024-04-10",
    budget: 35000000,
    spent: 35000000,
    participants: 500,
    status: "completed",
    description: "Buka puasa bersama selama Ramadan",
  },
  {
    id: "6",
    name: "Qurban Idul Adha",
    category: "Kegiatan Khusus",
    startDate: "2024-06-16",
    endDate: "2024-06-17",
    budget: 85000000,
    spent: 0,
    participants: 300,
    status: "planned",
    description: "Penyembelihan dan distribusi hewan qurban",
  },
  {
    id: "7",
    name: "Pengajian Malam Jumat",
    category: "Kegiatan Rutin",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    budget: 12000000,
    spent: 6000000,
    participants: 80,
    status: "ongoing",
    description: "Pengajian rutin malam Jumat",
  },
  {
    id: "8",
    name: "Bantuan Warga Kurang Mampu",
    category: "Sosial",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    budget: 15000000,
    spent: 15000000,
    participants: 50,
    status: "completed",
    description: "Bantuan sembako bulanan",
  },
]

const statsData = [
  {
    title: "Total Program Aktif",
    value: "12",
    change: 20.0,
    icon: Calendar,
    description: "Program berjalan",
    trend: "up" as const,
    color: "blue",
  },
  {
    title: "Total Anggaran",
    value: "Rp 364M",
    change: 15.3,
    icon: DollarSign,
    description: "Tahun 2024",
    trend: "up" as const,
    color: "green",
  },
  {
    title: "Anggaran Terpakai",
    value: "Rp 152M",
    change: 8.7,
    icon: DollarSign,
    description: "41.8% dari total",
    trend: "up" as const,
    color: "purple",
  },
  {
    title: "Total Peserta",
    value: "1,225",
    change: 12.5,
    icon: Users,
    description: "Jamaah aktif",
    trend: "up" as const,
    color: "yellow",
  },
]

export function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>(programsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)

  // Form state for new program
  const [newProgram, setNewProgram] = useState<Partial<Program>>({
    name: "",
    category: "Kegiatan Rutin",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    budget: 0,
    status: "planned",
    description: "",
  })

  const handleAddProgram = () => {
    const id = String(programs.length + 1)
    const programToAdd = { ...newProgram, id, spent: 0, participants: 0 } as Program
    setPrograms([programToAdd, ...programs])
    setIsAddOpen(false)
    setNewProgram({
      name: "",
      category: "Kegiatan Rutin",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      budget: 0,
      status: "planned",
      description: "",
    })
  }

  const handleDeleteProgram = (id: string) => {
    setPrograms(programs.filter(p => p.id !== id))
  }

  const columns: ColumnDef<Program>[] = useMemo(() => [
    {
      accessorKey: "name",
      header: "Nama Program",
      cell: ({ row }) => (
        <div className="flex flex-col max-w-[200px]">
          <span className="font-semibold truncate text-sm">{row.getValue("name")}</span>
          <span className="text-[10px] text-muted-foreground truncate">{row.original.description}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Kategori",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-[10px] font-normal py-0">
          {row.getValue("category")}
        </Badge>
      ),
    },
    {
      accessorKey: "budget",
      header: "Anggaran",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("budget"))
        return <div className="font-medium text-xs">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount)}</div>
      },
    },
    {
      accessorKey: "spent",
      header: "Realisasi",
      cell: ({ row }) => {
        const spent = parseFloat(row.getValue("spent"))
        const budget = row.original.budget
        const percentage = Math.min(100, Math.round((spent / budget) * 100))
        return (
          <div className="flex flex-col gap-1 w-[100px]">
            <div className="flex justify-between text-[10px]">
              <span>{percentage}%</span>
              <span className="text-muted-foreground">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", notation: "compact" }).format(spent)}</span>
            </div>
            <Progress value={percentage} className="h-1" />
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const statusMap = {
          planned: { label: "Rencana", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
          ongoing: { label: "Aktif", color: "bg-green-500/10 text-green-600 border-green-200" },
          completed: { label: "Selesai", color: "bg-gray-500/10 text-gray-600 border-gray-200" },
        }
        const config = statusMap[status as keyof typeof statusMap]
        return (
          <Badge className={`text-[10px] px-2 py-0 font-medium ${config.color}`} variant="outline">
            {config.label}
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
              setSelectedProgram(row.original)
              setIsDetailsOpen(true)
            }}>
              <Eye className="mr-2 h-4 w-4" /> Detail
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit2 className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600"
              onClick={() => handleDeleteProgram(row.original.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [programs])

  const filteredData = useMemo(() => {
    return programs.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === "all" || item.category === filterCategory
      return matchesSearch && matchesCategory
    })
  }, [programs, searchTerm, filterCategory])

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Program & Kegiatan</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Kelola agenda dan alokasi anggaran masjid
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex-1 sm:flex-none">
                <Plus className="mr-2 h-4 w-4" />
                <span>Buat Program</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Tambah Program Baru</DialogTitle>
                <DialogDescription>
                  Rencanakan kegiatan atau pembangunan masjid.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Program</Label>
                  <Input 
                    id="name" 
                    placeholder="Contoh: Renovasi Tempat Wudhu" 
                    value={newProgram.name || ""}
                    onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select 
                      value={newProgram.category} 
                      onValueChange={(v) => setNewProgram({...newProgram, category: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pembangunan">Pembangunan</SelectItem>
                        <SelectItem value="Kegiatan Rutin">Kegiatan Rutin</SelectItem>
                        <SelectItem value="Sosial">Sosial</SelectItem>
                        <SelectItem value="Pendidikan">Pendidikan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Anggaran (Rp)</Label>
                    <Input 
                      id="budget" 
                      type="number" 
                      placeholder="0"
                      value={newProgram.budget || ""}
                      onChange={(e) => setNewProgram({...newProgram, budget: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start">Tanggal Mulai</Label>
                    <Input 
                      id="start" 
                      type="date"
                      value={newProgram.startDate}
                      onChange={(e) => setNewProgram({...newProgram, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end">Tanggal Selesai</Label>
                    <Input 
                      id="end" 
                      type="date"
                      value={newProgram.endDate}
                      onChange={(e) => setNewProgram({...newProgram, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi Program</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Jelaskan tujuan dan detail program..."
                    value={newProgram.description || ""}
                    onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Batal</Button>
                <Button onClick={handleAddProgram}>Simpan Rencana</Button>
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

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Cari nama program..." 
            className="pl-10 h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full md:w-[200px] h-10">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            <SelectItem value="Pembangunan">Pembangunan</SelectItem>
            <SelectItem value="Kegiatan Rutin">Kegiatan Rutin</SelectItem>
            <SelectItem value="Sosial">Sosial</SelectItem>
            <SelectItem value="Pendidikan">Pendidikan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Programs Table */}
      <div className="rounded-xl border bg-card shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
          <h2 className="font-semibold text-foreground">Daftar Program Kerja</h2>
        </div>
        <div className="p-0">
          <DataTable
            columns={columns as any}
            data={filteredData}
            searchKey="name"
          />
        </div>
      </div>

      {/* Budget Progress & Upcoming */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Anggaran per Kategori</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { label: "Pembangunan", used: 75000000, total: 150000000, color: "bg-blue-600" },
              { label: "Kegiatan Rutin", used: 18000000, total: 24000000, color: "bg-green-600" },
              { label: "Sosial", used: 15000000, total: 40000000, color: "bg-purple-600" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", notation: "compact" }).format(item.used)} / 
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", notation: "compact" }).format(item.total)}
                  </span>
                </div>
                <Progress value={(item.used / item.total) * 100} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Agenda Terdekat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {programs.filter(p => p.status === "planned").slice(0, 3).map((p, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg border bg-muted/30">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold">{p.name}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                    <Clock className="h-3 w-3" />
                    {new Date(p.startDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })}
                    <span>•</span>
                    <Target className="h-3 w-3" />
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", notation: "compact" }).format(p.budget)}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detail Program</DialogTitle>
          </DialogHeader>
          
          {selectedProgram && (
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{selectedProgram.name}</h3>
                  <Badge className={
                    selectedProgram.status === "ongoing" ? "bg-green-500" : 
                    selectedProgram.status === "planned" ? "bg-blue-500" : "bg-gray-500"
                  }>
                    {selectedProgram.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{selectedProgram.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <p className="text-[10px] text-muted-foreground uppercase">Anggaran</p>
                  <p className="font-bold text-sm">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", notation: "compact" }).format(selectedProgram.budget)}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <p className="text-[10px] text-muted-foreground uppercase">Realisasi</p>
                  <p className="font-bold text-sm text-orange-600">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", notation: "compact" }).format(selectedProgram.spent)}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <p className="text-[10px] text-muted-foreground uppercase">Peserta</p>
                  <p className="font-bold text-sm">{selectedProgram.participants} orang</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>Progress Penyerapan Anggaran</span>
                  <span>{Math.round((selectedProgram.spent / selectedProgram.budget) * 100)}%</span>
                </div>
                <Progress value={(selectedProgram.spent / selectedProgram.budget) * 100} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Mulai: <strong>{new Date(selectedProgram.startDate).toLocaleDateString("id-ID")}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Selesai: <strong>{new Date(selectedProgram.endDate).toLocaleDateString("id-ID")}</strong></span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Tutup</Button>
            <Button className="gap-2">
              <Printer className="h-4 w-4" />
              Cetak Laporan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
