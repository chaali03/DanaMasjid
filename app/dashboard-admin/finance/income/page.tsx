"use client"

import dynamicImport from "next/dynamic"

const Income = dynamicImport(() => import("../../dashboard-component/src/pages/Finance/Income"), {
  ssr: false,
  loading: () => <div className="p-8 text-center">Memuat...</div>
})

export default function IncomePage() {
  return <Income />
}
