"use client"

import { useState, useMemo, Suspense } from "react"
import Link from "next/link"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowRight,
  Eye,
  Wallet,
  Filter,
  Users,
  PieChart,
  Download,
  FileText,
  AlertCircle,
  Clock,
  Plus,
  Send,
  BarChart3,
  Target,
  Zap,
  Bell,
  Activity,
  CheckCircle2,
  Info,
  Sparkles,
} from "lucide-react"
import { StatsCard } from "./stats-card"
import { Button } from "@/components/ui/button"
import { useChartColors } from "../contexts/chart-color-context"
import { ModernChart } from "./modern-chart"

// Loading component
const ChartSkeleton = () => (
  <div className="rounded-lg border bg-card p-6 dark:bg-gray-800 dark:border-gray-700 animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
    <div className="h-[300px] bg-gray-100 dark:bg-gray-800 rounded"></div>
  </div>
)

// Filter options
type PeriodFilter = "week1" | "week2" | "week3" | "week4" | "month" | "2months" | "3months" | "6months" | "year"

const periodOptions: { value: PeriodFilter; label: string }[] = [
  { value: "week1", label: "Minggu 1" },
  { value: "week2", label: "Minggu 2" },
  { value: "week3", label: "Minggu 3" },
  { value: "week4", label: "Minggu 4" },
  { value: "month", label: "Bulan Ini" },
  { value: "2months", label: "2 Bulan" },
  { value: "3months", label: "3 Bulan" },
  { value: "6months", label: "6 Bulan" },
  { value: "year", label: "Tahun Ini" },
]

// Data berdasarkan periode dengan data periode sebelumnya untuk perbandingan trend
const getDataByPeriod = (period: PeriodFilter) => {
  const dataMap = {
    week1: {
      saldoAwal: 125000000,
      saldoAkhir: 128500000,
      pemasukan: 4200000,
      pengeluaran: 700000,
      change: 2.8,
      // Data minggu sebelumnya untuk perbandingan
      prevPemasukan: 3800000,
      prevPengeluaran: 650000,
    },
    week2: {
      saldoAwal: 128500000,
      saldoAkhir: 132800000,
      pemasukan: 5100000,
      pengeluaran: 800000,
      change: 3.3,
      prevPemasukan: 4200000,
      prevPengeluaran: 700000,
    },
    week3: {
      saldoAwal: 132800000,
      saldoAkhir: 137200000,
      pemasukan: 5300000,
      pengeluaran: 900000,
      change: 3.3,
      prevPemasukan: 5100000,
      prevPengeluaran: 800000,
    },
    week4: {
      saldoAwal: 137200000,
      saldoAkhir: 141200000,
      pemasukan: 4200000,
      pengeluaran: 200000,
      change: 2.9,
      prevPemasukan: 5300000,
      prevPengeluaran: 900000,
    },
    month: {
      saldoAwal: 125000000,
      saldoAkhir: 141200000,
      pemasukan: 18800000,
      pengeluaran: 2600000,
      change: 12.5,
      // Data bulan sebelumnya
      prevPemasukan: 16500000,
      prevPengeluaran: 2400000,
    },
    "2months": {
      saldoAwal: 110000000,
      saldoAkhir: 141200000,
      pemasukan: 36500000,
      pengeluaran: 5300000,
      change: 28.4,
      // Data 2 bulan sebelumnya
      prevPemasukan: 32000000,
      prevPengeluaran: 4800000,
    },
    "3months": {
      saldoAwal: 95000000,
      saldoAkhir: 141200000,
      pemasukan: 54200000,
      pengeluaran: 8000000,
      change: 48.6,
      prevPemasukan: 48000000,
      prevPengeluaran: 7200000,
    },
    "6months": {
      saldoAwal: 75000000,
      saldoAkhir: 141200000,
      pemasukan: 98500000,
      pengeluaran: 32300000,
      change: 88.3,
      prevPemasukan: 85000000,
      prevPengeluaran: 28000000,
    },
    year: {
      saldoAwal: 50000000,
      saldoAkhir: 141200000,
      pemasukan: 185000000,
      pengeluaran: 94000000,
      change: 182.4,
      // Data tahun sebelumnya
      prevPemasukan: 165000000,
      prevPengeluaran: 88000000,
    },
  }
  return dataMap[period]
}

// Fungsi untuk menghitung persentase perubahan trend
const calculateTrendPercentage = (current: number, previous: number): number => {
  if (previous === 0) return 0
  return Number((((current - previous) / previous) * 100).toFixed(1))
}

// Fungsi untuk menentukan arah trend
const getTrendDirection = (percentage: number): "up" | "down" | "neutral" => {
  if (percentage > 0) return "up"
  if (percentage < 0) return "down"
  return "neutral"
}

const incomeChartData = [
  { name: "Jan", value: 15500000 },
  { name: "Feb", value: 18200000 },
  { name: "Mar", value: 16800000 },
  { name: "Apr", value: 19500000 },
  { name: "Mei", value: 17300000 },
  { name: "Jun", value: 18800000 },
]

const expenseChartData = [
  { name: "Jan", value: 42000000 },
  { name: "Feb", value: 45000000 },
  { name: "Mar", value: 43500000 },
  { name: "Apr", value: 48000000 },
  { name: "Mei", value: 46500000 },
  { name: "Jun", value: 49200000 },
]

// Recent transactions summary
const recentSummary = [
  {
    title: "Pemasukan Terbaru",
    items: [
      { name: "Donasi Jumat", amount: "Rp 500.000", date: "15 Jun 2024" },
      { name: "Infaq Pembangunan", amount: "Rp 1.000.000", date: "15 Jun 2024" },
      { name: "Zakat Fitrah", amount: "Rp 2.500.000", date: "14 Jun 2024" },
    ],
    link: "/dashboard-admin/finance/income",
    color: "green",
  },
  {
    title: "Pengeluaran Terbaru",
    items: [
      { name: "Listrik Juni 2024", amount: "Rp 2.500.000", date: "15 Jun 2024" },
      { name: "Air PDAM Juni", amount: "Rp 750.000", date: "14 Jun 2024" },
      { name: "Gaji Marbot", amount: "Rp 4.500.000", date: "13 Jun 2024" },
    ],
    link: "/dashboard-admin/finance/expense",
    color: "red",
  },
]

const upcomingPrograms = [
  { name: "Kajian Ahad Pagi", date: "18 Jun 2024", participants: 100 },
  { name: "TPA Sore", date: "Setiap Hari", participants: 45 },
  { name: "Renovasi Toilet", date: "20 Jun - 30 Jun", participants: 0 },
]

// Kategori Pemasukan
const incomeCategories = [
  { name: "Infaq Jumat", value: 8500000, percentage: 45, color: "#10b981" },
  { name: "Zakat", value: 5200000, percentage: 28, color: "#3b82f6" },
  { name: "Donasi Program", value: 3100000, percentage: 16, color: "#8b5cf6" },
  { name: "Lainnya", value: 2000000, percentage: 11, color: "#f59e0b" },
]

// Kategori Pengeluaran
const expenseCategories = [
  { name: "Operasional", value: 1200000, percentage: 46, color: "#ef4444" },
  { name: "Listrik & Air", value: 800000, percentage: 31, color: "#f97316" },
  { name: "Kebersihan", value: 400000, percentage: 15, color: "#ec4899" },
  { name: "Lainnya", value: 200000, percentage: 8, color: "#a855f7" },
]

// Transaksi Pending
const pendingTransactions = [
  { id: "TRX001", type: "income", name: "Donasi Pembangunan", amount: 5000000, status: "pending", date: "16 Jun 2024" },
  { id: "TRX002", type: "expense", name: "Renovasi Mihrab", amount: 15000000, status: "pending", date: "16 Jun 2024" },
  { id: "TRX003", type: "income", name: "Infaq Tarawih", amount: 2500000, status: "pending", date: "15 Jun 2024" },
]

// Laporan Keuangan
const financialReports = [
  { name: "Laporan Bulanan Juni 2024", date: "30 Jun 2024", size: "2.4 MB", type: "PDF" },
  { name: "Laporan Bulanan Mei 2024", date: "31 Mei 2024", size: "2.1 MB", type: "PDF" },
  { name: "Laporan Tahunan 2023", date: "31 Des 2023", size: "5.8 MB", type: "PDF" },
]

// Chart Perbandingan Pemasukan vs Pengeluaran
const comparisonChartData = [
  { name: "Jan", pemasukan: 15500000, pengeluaran: 12000000 },
  { name: "Feb", pemasukan: 18200000, pengeluaran: 13500000 },
  { name: "Mar", pemasukan: 16800000, pengeluaran: 14200000 },
  { name: "Apr", pemasukan: 19500000, pengeluaran: 15800000 },
  { name: "Mei", pemasukan: 17300000, pengeluaran: 13900000 },
  { name: "Jun", pemasukan: 18800000, pengeluaran: 14600000 },
]

// Quick Actions
const quickActions = [
  { 
    title: "Tambah Pemasukan", 
    description: "Catat pemasukan baru",
    icon: Plus, 
    color: "green",
    link: "/dashboard-admin/finance/income"
  },
  { 
    title: "Tambah Pengeluaran", 
    description: "Catat pengeluaran baru",
    icon: Send, 
    color: "red",
    link: "/dashboard-admin/finance/expense"
  },
  { 
    title: "Buat Laporan", 
    description: "Generate laporan keuangan",
    icon: FileText, 
    color: "blue",
    link: "/dashboard-admin/finance"
  },
  { 
    title: "Kelola Program", 
    description: "Tambah atau edit program",
    icon: Calendar, 
    color: "purple",
    link: "/dashboard-admin/programs"
  },
]

// Target Keuangan
const financialTargets = [
  { 
    name: "Target Pemasukan Bulanan", 
    current: 18800000, 
    target: 25000000, 
    percentage: 75,
    color: "#10b981"
  },
  { 
    name: "Batas Pengeluaran Bulanan", 
    current: 2600000, 
    target: 5000000, 
    percentage: 52,
    color: "#ef4444"
  },
  { 
    name: "Dana Pembangunan", 
    current: 45000000, 
    target: 100000000, 
    percentage: 45,
    color: "#3b82f6"
  },
]

// Real-time Notifications
const notifications = [
  { 
    id: 1,
    type: "success",
    title: "Pemasukan Baru",
    message: "Donasi Jumat sebesar Rp 500.000 telah diverifikasi",
    time: "2 menit yang lalu",
    icon: CheckCircle2,
    color: "green"
  },
  { 
    id: 2,
    type: "warning",
    title: "Menunggu Approval",
    message: "Pengeluaran renovasi mihrab Rp 15.000.000 menunggu persetujuan",
    time: "15 menit yang lalu",
    icon: AlertCircle,
    color: "yellow"
  },
  { 
    id: 3,
    type: "info",
    title: "Laporan Tersedia",
    message: "Laporan keuangan bulan Juni 2024 siap diunduh",
    time: "1 jam yang lalu",
    icon: Info,
    color: "blue"
  },
]

// Activity Feed
const activityFeed = [
  {
    id: 1,
    user: "Admin Keuangan",
    action: "menambahkan pemasukan",
    target: "Infaq Jumat - Rp 500.000",
    time: "5 menit yang lalu",
    type: "income"
  },
  {
    id: 2,
    user: "Bendahara",
    action: "menyetujui pengeluaran",
    target: "Listrik Juni 2024 - Rp 2.500.000",
    time: "30 menit yang lalu",
    type: "expense"
  },
  {
    id: 3,
    user: "Ketua Takmir",
    action: "membuat program baru",
    target: "Kajian Ahad Pagi",
    time: "2 jam yang lalu",
    type: "program"
  },
  {
    id: 4,
    user: "Admin",
    action: "mengunduh laporan",
    target: "Laporan Bulanan Juni 2024",
    time: "3 jam yang lalu",
    type: "report"
  },
]

// Statistik Harian
const dailyStats = [
  { label: "Transaksi Hari Ini", value: 12, change: +3, icon: Activity },
  { label: "Pending Approval", value: 3, change: -1, icon: Clock },
  { label: "Laporan Dibuat", value: 2, change: 0, icon: FileText },
]

export function ModernDashboard() {
  const { colors } = useChartColors()
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>("month")
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  // Get data based on selected period
  const periodData = useMemo(() => getDataByPeriod(selectedPeriod), [selectedPeriod])

  // Format currency
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `Rp ${(value / 1000000).toFixed(1)}M`
    }
    return `Rp ${(value / 1000).toFixed(0)}K`
  }

  // Hitung trend dinamis untuk pemasukan dan pengeluaran
  const incomeTrendPercentage = useMemo(
    () => calculateTrendPercentage(periodData.pemasukan, periodData.prevPemasukan),
    [periodData.pemasukan, periodData.prevPemasukan]
  )
  
  const expenseTrendPercentage = useMemo(
    () => calculateTrendPercentage(periodData.pengeluaran, periodData.prevPengeluaran),
    [periodData.pengeluaran, periodData.prevPengeluaran]
  )

  // Stats data with dynamic values and links
  const statsData = useMemo(() => [
    {
      title: "Saldo Awal",
      value: formatCurrency(periodData.saldoAwal),
      change: 0,
      icon: Wallet,
      description: periodOptions.find(p => p.value === selectedPeriod)?.label || "",
      trend: "neutral" as const,
      color: "blue",
      link: "/dashboard-admin/finance",
    },
    {
      title: "Saldo Akhir",
      value: formatCurrency(periodData.saldoAkhir),
      change: periodData.change,
      icon: Wallet,
      description: periodOptions.find(p => p.value === selectedPeriod)?.label || "",
      trend: "up" as const,
      color: "green",
      link: "/dashboard-admin/finance",
    },
    {
      title: "Total Pemasukan",
      value: formatCurrency(periodData.pemasukan),
      change: Math.abs(incomeTrendPercentage),
      icon: TrendingUp,
      description: periodOptions.find(p => p.value === selectedPeriod)?.label || "",
      trend: getTrendDirection(incomeTrendPercentage),
      color: "green",
      link: "/dashboard-admin/finance/income",
    },
    {
      title: "Total Pengeluaran",
      value: formatCurrency(periodData.pengeluaran),
      change: Math.abs(expenseTrendPercentage),
      icon: TrendingDown,
      description: periodOptions.find(p => p.value === selectedPeriod)?.label || "",
      trend: getTrendDirection(expenseTrendPercentage),
      color: "red",
      link: "/dashboard-admin/finance/expense",
    },
  ], [periodData, selectedPeriod, incomeTrendPercentage, expenseTrendPercentage])

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard Masjid</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Selamat datang! Berikut ringkasan keuangan dan kegiatan masjid.
          </p>
        </div>
        
        {/* Period Filter */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Periode:</span>
            <span className="font-semibold">
              {periodOptions.find(p => p.value === selectedPeriod)?.label}
            </span>
          </Button>
          
          {showFilterDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowFilterDropdown(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-20 py-2">
                {periodOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedPeriod(option.value)
                      setShowFilterDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      selectedPeriod === option.value
                        ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/30 dark:text-blue-400"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards with Detail Links */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <div key={index} className="relative group">
            <StatsCard {...stat} />
            <Link href={stat.link}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Eye className="h-4 w-4 mr-1" />
                <span className="text-xs">Detail</span>
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, index) => (
          <Link key={index} href={action.link}>
            <div className="rounded-xl border bg-card p-4 sm:p-5 dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
              <div className="flex flex-col items-center text-center gap-3">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                  action.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                  action.color === 'red' ? 'bg-red-100 dark:bg-red-900/30' :
                  action.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  'bg-purple-100 dark:bg-purple-900/30'
                }`}>
                  <action.icon className={`h-6 w-6 ${
                    action.color === 'green' ? 'text-green-600 dark:text-green-400' :
                    action.color === 'red' ? 'text-red-600 dark:text-red-400' :
                    action.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                    'text-purple-600 dark:text-purple-400'
                  }`} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Chart Perbandingan & Target Keuangan */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Chart Perbandingan */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">Perbandingan Pemasukan vs Pengeluaran</h2>
              </div>
              <Link href="/dashboard-admin/finance">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex-1">
              <ModernChart
                key={`comparison-${colors.barChart.primary}-${colors.barChart.secondary}`}
                data={comparisonChartData}
                type="bar"
                dataKey="pemasukan"
                secondaryDataKey="pengeluaran"
                xAxisKey="name"
                title=""
                color={colors.barChart.primary}
                secondaryColor={colors.barChart.secondary}
              />
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.barChart.primary }}></div>
                <span className="text-sm text-muted-foreground">Pemasukan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.barChart.secondary }}></div>
                <span className="text-sm text-muted-foreground">Pengeluaran</span>
              </div>
            </div>
          </div>
        </div>

        {/* Target Keuangan */}
        <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[400px] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Target Keuangan</h2>
          </div>
          <div className="space-y-4 flex-1">
            {financialTargets.map((target, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{target.name}</span>
                  <span className="text-muted-foreground">{target.percentage}%</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${target.percentage}%`,
                        backgroundColor: target.color 
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatCurrency(target.current)}</span>
                    <span>Target: {formatCurrency(target.target)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard-admin/finance">
            <Button variant="outline" className="w-full mt-4" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Kelola Target
            </Button>
          </Link>
        </div>
      </div>

      {/* Program Aktif Card */}
      <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Program Aktif</p>
            <p className="text-2xl sm:text-3xl font-bold mt-1">8</p>
            <p className="text-xs text-muted-foreground mt-1">Program berjalan</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <Link href="/dashboard-admin/programs">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Lihat Detail
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Suspense fallback={<ChartSkeleton />}>
          <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Tren Pemasukan</h2>
              <Link href="/dashboard-admin/finance/income">
                <Button variant="ghost" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Lihat Detail</span>
                </Button>
              </Link>
            </div>
            <div className="flex-1">
              <ModernChart
                key={`income-${colors.lineChart.primary}`}
                data={incomeChartData}
                type="area"
                dataKey="value"
                xAxisKey="name"
                title=""
                color={colors.lineChart.primary}
              />
            </div>
          </div>
        </Suspense>
        
        <Suspense fallback={<ChartSkeleton />}>
          <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Tren Pengeluaran</h2>
              <Link href="/dashboard-admin/finance/expense">
                <Button variant="ghost" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Lihat Detail</span>
                </Button>
              </Link>
            </div>
            <div className="flex-1">
              <ModernChart
                key={`expense-${colors.barChart.primary}`}
                data={expenseChartData}
                type="bar"
                dataKey="value"
                xAxisKey="name"
                title=""
                color={colors.barChart.primary}
              />
            </div>
          </div>
        </Suspense>
      </div>

      {/* Kategori Pemasukan & Pengeluaran */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Kategori Pemasukan */}
        <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[320px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-green-600" />
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Kategori Pemasukan</h2>
            </div>
            <Link href="/dashboard-admin/finance/income">
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3 flex-1">
            {incomeCategories.map((category, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-muted-foreground">{category.percentage}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: category.color 
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold min-w-[80px] text-right">
                    {formatCurrency(category.value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kategori Pengeluaran */}
        <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[320px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-red-600" />
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Kategori Pengeluaran</h2>
            </div>
            <Link href="/dashboard-admin/finance/expense">
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3 flex-1">
            {expenseCategories.map((category, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-muted-foreground">{category.percentage}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: category.color 
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold min-w-[80px] text-right">
                    {formatCurrency(category.value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaksi Pending & Laporan Keuangan */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Transaksi Pending */}
        <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[420px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Transaksi Pending</h2>
            </div>
            <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">
              {pendingTransactions.length}
            </span>
          </div>
          <div className="space-y-3">
            {pendingTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-yellow-200 dark:border-yellow-900/30">
                <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  transaction.type === 'income' 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-red-100 dark:bg-red-900/30'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{transaction.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-sm ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatCurrency(transaction.amount)}
                      </p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full mt-1">
                        <AlertCircle className="h-3 w-3" />
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard-admin/finance">
            <Button variant="outline" className="w-full mt-4" size="sm">
              Lihat Semua Transaksi
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Laporan Keuangan */}
        <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[420px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Laporan Keuangan</h2>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
          <div className="space-y-3">
            {financialReports.map((report, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors cursor-pointer">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{report.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{report.date}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{report.size}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" size="sm">
            Lihat Semua Laporan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Recent Transactions Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        {recentSummary.map((section, idx) => (
          <div key={idx} className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[360px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">{section.title}</h2>
              <Link href={section.link}>
                <Button variant="ghost" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Lihat Semua</span>
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                  <div className="flex-1">
                    <p className="font-medium text-sm sm:text-base">{item.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.date}</p>
                  </div>
                  <div className={`font-bold text-sm sm:text-base ${section.color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.amount}
                  </div>
                </div>
              ))}
            </div>
            <Link href={section.link}>
              <Button variant="outline" className="w-full mt-4" size="sm">
                Lihat Detail Lengkap
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Notifications, Activity Feed & Daily Stats */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Real-time Notifications */}
        <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[380px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Notifikasi</h2>
            </div>
            <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
              {notifications.length}
            </span>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {notifications.map((notif) => (
              <div key={notif.id} className={`p-3 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                notif.color === 'green' ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900/30' :
                notif.color === 'yellow' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-900/30' :
                'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-900/30'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notif.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                    notif.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    <notif.icon className={`h-4 w-4 ${
                      notif.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      notif.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" size="sm">
            Lihat Semua Notifikasi
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Activity Feed */}
        <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[380px] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Aktivitas Terkini</h2>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {activityFeed.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors">
                <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                  activity.type === 'income' ? 'bg-green-500' :
                  activity.type === 'expense' ? 'bg-red-500' :
                  activity.type === 'program' ? 'bg-blue-500' :
                  'bg-purple-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold">{activity.user}</span>
                    {' '}<span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <p className="text-xs font-medium mt-0.5">{activity.target}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" size="sm">
            Lihat Riwayat Lengkap
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Daily Stats */}
        <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700 min-h-[380px] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-yellow-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Statistik Hari Ini</h2>
          </div>
          <div className="space-y-4 flex-1">
            {dailyStats.map((stat, i) => (
              <div key={i} className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <stat.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold">{stat.value}</span>
                  {stat.change !== 0 && (
                    <span className={`text-sm font-semibold flex items-center gap-1 ${
                      stat.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change > 0 ? '+' : ''}{stat.change}
                      {stat.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard-admin/finance">
            <Button variant="outline" className="w-full mt-4" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Lihat Detail Statistik
            </Button>
          </Link>
        </div>
      </div>

      {/* Upcoming Programs */}
      <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Program & Kegiatan</h2>
          <Link href="/dashboard-admin/programs">
            <Button variant="ghost" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Lihat Semua</span>
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {upcomingPrograms.map((program, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
              <div className="flex-1">
                <p className="font-medium text-sm sm:text-base">{program.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{program.date}</p>
              </div>
              {program.participants > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{program.participants}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <Link href="/dashboard-admin/programs">
          <Button variant="outline" className="w-full mt-4" size="sm">
            Lihat Semua Program
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
