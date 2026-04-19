"use client"

import { useMemo, useState } from "react"
import { FileText, Download, Calendar, TrendingUp, TrendingDown, DollarSign, Filter, BarChart3, PieChart, ArrowUpRight, ArrowDownRight, Printer, Share2, FileSpreadsheet, FileJson } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModernChart } from "@/app/(main)/dashboard-admin/components/modern-chart"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedYear, setSelectedYear] = useState("2024")
  const [activeTab, setActiveTab] = useState("summary")

  // Mock data - replace with real data from API
  const financialSummary = {
    totalIncome: 125000000,
    totalExpense: 85000000,
    balance: 40000000,
    incomeGrowth: 12.5,
    expenseGrowth: -5.3,
  }

  const monthlyData = [
    { name: "Jan", income: 28000000, expense: 21000000 },
    { name: "Feb", income: 22000000, expense: 19000000 },
    { name: "Mar", income: 25000000, expense: 18000000 },
    { name: "Apr", income: 30000000, expense: 22000000 },
    { name: "Mei", income: 27000000, expense: 20000000 },
    { name: "Jun", income: 32000000, expense: 23000000 },
  ]

  const categoryData = [
    { name: "Zakat", value: 45000000, color: "#10b981" },
    { name: "Infaq", value: 35000000, color: "#3b82f6" },
    { name: "Sedekah", value: 25000000, color: "#8b5cf6" },
    { name: "Wakaf", value: 20000000, color: "#f59e0b" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Laporan Keuangan</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Analisis mendalam dan transparansi dana masjid
          </p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Ekspor
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="gap-2">
                <FileText className="h-4 w-4 text-red-500" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <FileSpreadsheet className="h-4 w-4 text-green-500" />
                Export Excel (XLSX)
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <FileJson className="h-4 w-4 text-yellow-500" />
                Export JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="gap-2">
            <Printer className="h-4 w-4" />
            Cetak
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="summary">Ringkasan</TabsTrigger>
          <TabsTrigger value="analysis">Analisis</TabsTrigger>
          <TabsTrigger value="history">Riwayat</TabsTrigger>
        </TabsList>

        {/* --- SUMMARY TAB --- */}
        <TabsContent value="summary" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-green-500 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center justify-between">
                  Pemasukan Total
                  <Badge variant="outline" className="text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {financialSummary.incomeGrowth}%
                  </Badge>
                </CardDescription>
                <CardTitle className="text-2xl font-bold">{formatCurrency(financialSummary.totalIncome)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Periode {selectedYear}</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center justify-between">
                  Pengeluaran Total
                  <Badge variant="outline" className="text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    {Math.abs(financialSummary.expenseGrowth)}%
                  </Badge>
                </CardDescription>
                <CardTitle className="text-2xl font-bold">{formatCurrency(financialSummary.totalExpense)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Periode {selectedYear}</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500 shadow-sm bg-blue-50/30 dark:bg-blue-900/10">
              <CardHeader className="pb-2">
                <CardDescription>Saldo Kas Masjid</CardDescription>
                <CardTitle className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  {formatCurrency(financialSummary.balance)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-2">
                  <div className="bg-blue-600 h-1.5 rounded-full w-[65%]" />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">65% dari target cadangan kas</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart Perbandingan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Tren Keuangan Bulanan
                </CardTitle>
                <CardDescription>Pemasukan vs Pengeluaran per bulan</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ModernChart 
                  data={monthlyData}
                  xAxisKey="name"
                  dataKey="income"
                  secondaryDataKey="expense"
                  type="bar"
                  color="#10b981"
                  secondaryColor="#ef4444"
                />
              </CardContent>
            </Card>

            {/* Alokasi Dana */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-600" />
                  Alokasi Dana Donasi
                </CardTitle>
                <CardDescription>Distribusi pemasukan berdasarkan kategori</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryData.map((cat, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{cat.name}</span>
                      <span className="font-bold">{formatCurrency(cat.value)}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${(cat.value / 125000000) * 100}%`,
                          backgroundColor: cat.color 
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- ANALYSIS TAB --- */}
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Analisis Kinerja Keuangan</CardTitle>
              <CardDescription>Insight otomatis berdasarkan data transaksi terakhir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                <h4 className="font-bold text-green-800 dark:text-green-300 flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4" />
                  Surplus Meningkat
                </h4>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Pemasukan dari Infaq Jumat meningkat 15% dibandingkan bulan lalu. Disarankan untuk menambah kotak amal di area parkir.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4" />
                  Efisiensi Operasional
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Biaya listrik menurun 10% setelah pemasangan lampu LED di seluruh area masjid.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- HISTORY TAB --- */}
        <TabsContent value="history">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Periode</th>
                      <th className="px-6 py-4 text-left font-semibold">Pemasukan</th>
                      <th className="px-6 py-4 text-left font-semibold">Pengeluaran</th>
                      <th className="px-6 py-4 text-left font-semibold">Saldo Akhir</th>
                      <th className="px-6 py-4 text-center font-semibold">Status</th>
                      <th className="px-6 py-4 text-right font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      { month: "Juni 2024", inc: 32000000, exp: 23000000, bal: 9000000 },
                      { month: "Mei 2024", inc: 27000000, exp: 20000000, bal: 7000000 },
                      { month: "April 2024", inc: 30000000, exp: 22000000, bal: 8000000 },
                      { month: "Maret 2024", inc: 25000000, exp: 18000000, bal: 7000000 },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{row.month}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">{formatCurrency(row.inc)}</td>
                        <td className="px-6 py-4 text-red-600 font-semibold">{formatCurrency(row.exp)}</td>
                        <td className="px-6 py-4 font-bold">{formatCurrency(row.bal)}</td>
                        <td className="px-6 py-4 text-center">
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Final</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
