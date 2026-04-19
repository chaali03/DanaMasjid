 "use client"

import { notFound } from "next/navigation"
import type { ComponentType } from "react"
import dynamicImport from "next/dynamic"
import { use } from "react"

const ALLOWED_PAGES = new Set([
  "alerts",
  "avatars",
  "badge",
  "bar-chart",
  "basic-tables",
  "blank",
  "buttons",
  "calendar",
  "form-elements",
  "images",
  "line-chart",
  "profile",
  "sidebar",
  "signin",
  "signup",
  "videos",
])

const DASHBOARD_COMPONENTS: Record<string, ComponentType> = {
  alerts: dynamicImport(() => import("../dashboard-component/src/pages/UiElements/Alerts"), { ssr: false }),
  avatars: dynamicImport(() => import("../dashboard-component/src/pages/UiElements/Avatars"), { ssr: false }),
  badge: dynamicImport(() => import("../dashboard-component/src/pages/UiElements/Badges"), { ssr: false }),
  "bar-chart": dynamicImport(() => import("../dashboard-component/src/pages/Charts/BarChart"), { ssr: false }),
  "basic-tables": dynamicImport(() => import("../dashboard-component/src/pages/Tables/BasicTables"), { ssr: false }),
  blank: dynamicImport(() => import("../dashboard-component/src/pages/Blank"), { ssr: false }),
  buttons: dynamicImport(() => import("../dashboard-component/src/pages/UiElements/Buttons"), { ssr: false }),
  calendar: dynamicImport(() => import("../dashboard-component/src/pages/Calendar"), { ssr: false }),
  "form-elements": dynamicImport(() => import("../dashboard-component/src/pages/Forms/FormElements"), { ssr: false }),
  images: dynamicImport(() => import("../dashboard-component/src/pages/UiElements/Images"), { ssr: false }),
  "line-chart": dynamicImport(() => import("../dashboard-component/src/pages/Charts/LineChart"), { ssr: false }),
  profile: dynamicImport(() => import("../dashboard-component/src/pages/UserProfiles"), { ssr: false }),
  sidebar: dynamicImport(() => import("../dashboard-component/src/pages/Blank"), { ssr: false }),
  signin: dynamicImport(() => import("../dashboard-component/src/pages/AuthPages/SignIn"), { ssr: false }),
  signup: dynamicImport(() => import("../dashboard-component/src/pages/AuthPages/SignUp"), { ssr: false }),
  videos: dynamicImport(() => import("../dashboard-component/src/pages/UiElements/Videos"), { ssr: false }),
}

export default function DashboardTailadminPage({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = use(params)
  if (!ALLOWED_PAGES.has(page)) {
    notFound()
  }

  const PageComponent = DASHBOARD_COMPONENTS[page]
  if (!PageComponent) {
    notFound()
  }

  return <PageComponent />
}
