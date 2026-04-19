"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Calendar,
  Filter,
  Plus,
  Send,
  FileText,
  BarChart3,
  PieChart,
  Eye,
  ArrowRight,
} from "lucide-react"
import { StatsCard } from "./stats-card"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useChartColors } from "../contexts/chart-color-context"

const ModernChart = dynamic(() => import("./modern-chart").then(m => m.ModernChart), { 
  ssr: false,
  loading: () => <ChartSkeleton />
})
const DataTable = dynamic(() => import("./data-table").then(m => m.DataTable), { 
  ssr: false,
  loading: () => <div className="p-8 text-center bg-muted animate-pulse rounded-lg text-sm text-muted-foreground">Memuat data...</div>
})

const ChartSkeleton = () => (
  <div className="rounded-lg border bg-card p-6 dark:bg-gray-800 dark:border-gray-700 animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
    <div className="h-[300px] bg-gray-100 dark:bg-gray-800 rounded"></div>
  </div>
)

// Filter options
type PeriodFilter = "today" | "week" | "month" | "3months" | "6months" | "year" | "custom"

const periodOptions: { value: PeriodFilter; label: string }[] = [
  { value: "today", label: "Hari Ini" },
  { value: "week", label: "Minggu Ini" },
  { value: "month", label: "Bulan Ini" },
  { value: "3months", label: "3 Bulan" },
  { value: "6months", label: "6 Bulan" },
  { value: "year", label: "Tahun Ini" },
  { value: "custom", label: "Custom" },
]

// Data berdasarkan periode
const getDataByPeriod = (period: PeriodFilter) => {
  const dataMap = {
    today: {
      saldoAwal: 140000000,
      saldoAkhir: 141200000,
      pemasukan: 1500000,
      pengeluaran: 300000,
      selisih: 1200000,
      change: 0.9,
    },
    week: {
      saldoAwal: 137200000,
      saldoAkhir: 141200000,
      pemasukan: 4200000,
      pengeluaran: 200000,
      selisih: 4000000,
      change: 2.9,
    },
    month: {
      saldoAwal: 125000000,
      saldoAkhir: 141200000,
      pemasukan: 18800000,
      pengeluaran: 2600000,
      selisih: 16200000,
      change: 12.5,
    },
    "3months": {
      saldoAwal: 95000000,
      saldoAkhir: 141200000,
      pemasukan: 54200000,
      pengeluaran: 8000000,
      selisih: 46200000,
      change: 48.6,
    },
    "6months": {
      saldoAwal: 75000000,
      saldoAkhir: 141200000,
      pemasukan: 98500000,
      pengeluaran: 32300000,
      selisih: 66200000,
      change: 88.3,
    },
    year: {
      saldoAwal: 50000000,
      saldoAkhir: 141200000,
      pemasukan: 185000000,
      pengeluaran: 94000000,
      selisih: 91000000,
      change: 182.4,
    },
    custom: {
      saldoAwal: 125000000,
      saldoAkhir: 141200000,
      pemasukan: 18800000,
      pengeluaran: 2600000,
      selisih: 16200000,
      change: 12.5,
    },
  }
  return dataMap[period]
}

// Chart data
const comparisonChartData = [
  { name: "Jan", pemasukan: 15500000, pengeluaran: 12000000 },
  { name: "Feb", pemasukan: 18200000, pengeluaran: 13500000 },
  { name: "Mar", pemasukan: 16800000, pengeluaran: 14200000 },
  { name: "Apr", pemasukan: 19500000, pengeluaran: 15800000 },
  { name: "Mei", pemasukan: 17300000, pengeluaran: 13900000 },
  { name: "Jun", pemasukan: 18800000, pengeluaran: 14600000 },
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

type Transaction = {
  id: string
  date: string
  description: string
  category: string
  amount: number
  type: "income" | "expense"
  status: "completed" | "pending"
}

const recentTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-06-15",
    description: "Infaq Jumat",
    category: "Pemasukan Rutin",
    amount: 15500000,
    type: "income",
    status: "completed",
  },
  {
    id: "2",
    date: "2024-06-14",
    description: "Listrik & Air",
    category: "Operasional",
    amount: 3200000,
    type: "expense",
    status: "completed",
  },
  {
    id: "3",
    date: "2024-06-13",
    description: "Donasi Pembangunan",
    category: "Pembangunan",
    amount: 25000000,
    type: "income",
    status: "completed",
  },
  {
    id: "4",
    date: "2024-06-12",
    description: "Gaji Marbot",
    category: "SDM",
    amount: 4500000,
    type: "expense",
    status: "completed",
  },
  {
    id: "5",
    date: "2024-06-11",
    description: "Infaq Tarawih",
    category: "Pemasukan Rutin",
    amount: 8750000,
    type: "income",
    status: "pending",
  },
]

export function FinanceDashboard() {
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

  // Stats data with dynamic values
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
      change: periodData.change,
      icon: TrendingUp,
      description: periodOptions.find(p => p.value === selectedPeriod)?.label || "",
      trend: "up" as const,
      color: "green",
      link: "/dashboard-admin/finance/income",
    },
    {
      title: "Total Pengeluaran",
      value: formatCurrency(periodData.pengeluaran),
      change: 8.3,
      icon: TrendingDown,
      description: periodOptions.find(p => p.value === selectedPeriod)?.label || "",
      trend: "up" as const,
      color: "red",
      link: "/dashboard-admin/finance/expense",
    },
    {
      title: periodData.selisih >= 0 ? "Surplus" : "Defisit",
      value: formatCurrency(Math.abs(periodData.selisih)),
      change: periodData.change,
      icon: periodData.selisih >= 0 ? TrendingUp : TrendingDown,
      description: periodOptions.find(p => p.value === selectedPeriod)?.label || "",
      trend: periodData.selisih >= 0 ? "up" as const : "down" as const,
      color: periodData.selisih >= 0 ? "green" : "red",
      link: "/dashboard-admin/finance",
    },
  ], [periodData, selectedPeriod])
  const columns: ColumnDef<Transaction>[] = useMemo(() => [
    {
      accessorKey: "date",
      header: "Tanggal",
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"))
        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      },
    },
    {
      accessorKey: "description",
      header: "Keterangan",
    },
    {
      accessorKey: "category",
      header: "Kategori",
      cell: ({ row }) => (
        <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          {row.getValue("category")}
        </span>
      ),
    },
    {
      accessorKey: "type",
      header: "Tipe",
      cell: ({ row }) => {
        const type = row.getValue("type") as string
        return (
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
              type === "income"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {type === "income" ? "Masuk" : "Keluar"}
          </span>
        )
      },
    },
    {
      accessorKey: "amount",
      header: "Jumlah",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
        const type = row.original.type
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(amount)
        return (
          <div
            className={`font-semibold ${
              type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}
          >
            {type === "income" ? "+" : "-"} {formatted}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
              status === "completed"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            }`}
          >
            {status === "completed" ? "Selesai" : "Pending"}
          </span>
        )
      },
    },
  ], [])

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Transparansi Keuangan Masjid</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Laporan keuangan dan transaksi masjid secara real-time
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
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
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

      {/* Chart Perbandingan */}
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

      {/* Recent Transactions */}
      <div className="rounded-lg border bg-card p-4 sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Transaksi Terbaru</h2>
          <div className="flex gap-2">
            <Link href="/dashboard-admin/finance/income">
              <Button variant="outline" size="sm">
                Pemasukan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard-admin/finance/expense">
              <Button variant="outline" size="sm">
                Pengeluaran
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <DataTable
          columns={columns as any}
          data={recentTransactions}
          searchKey="description"
        />
      </div>
    </div>
  )
}
