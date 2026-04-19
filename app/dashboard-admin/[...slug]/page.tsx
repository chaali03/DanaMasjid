"use client"

import { notFound } from "next/navigation"

export default function CatchAllPage() {
  // Immediately trigger 404 for any undefined routes
  notFound()
}
