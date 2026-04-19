"use client"

import dynamicImport from "next/dynamic"

const Expense = dynamicImport(() => import("../../dashboard-component/src/pages/Finance/Expense"), {
  ssr: false,
  loading: () => <div className="p-8 text-center">Memuat...</div>
})

export default function ExpensePage() {
  return <Expense />
}
