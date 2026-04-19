"use client"

import dynamicImport from "next/dynamic"

const FinanceDashboard = dynamicImport(
  () =>
    import("@/app/(main)/dashboard-admin/components/finance-dashboard").then((mod) => mod.FinanceDashboard),
  {
    ssr: false,
    loading: () => <div className="p-8 text-center">Memuat...</div>
  }
)

export default function FinancePage() {
  return <FinanceDashboard />
}
