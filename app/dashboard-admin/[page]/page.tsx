import { notFound } from "next/navigation"

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

export default async function DashboardTailadminPage({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params

  if (!ALLOWED_PAGES.has(page)) {
    notFound()
  }

  return (
    <iframe
      src={`/tailadmin/${page}.html`}
      title={`TailAdmin ${page}`}
      className="w-full h-screen border-0"
    />
  )
}

