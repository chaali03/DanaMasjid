"use client"

import dynamicImport from "next/dynamic"

const ProgramsPage = dynamicImport(
  () =>
    import("@/app/(main)/dashboard-admin/components/programs-page").then((mod) => mod.ProgramsPage),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 text-center bg-muted animate-pulse rounded-lg text-sm text-muted-foreground">
        Memuat data...
      </div>
    )
  }
)

export default function ProgramsPageRoute() {
  return <ProgramsPage />
}
