import { NextRequest, NextResponse } from "next/server"

/**
 * Proxy untuk Nominatim forward geocoding (alamat → koordinat)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")

  if (!q) {
    return NextResponse.json({ error: "Parameter q wajib diisi" }, { status: 400 })
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=id&limit=1&addressdetails=1`

    const res = await fetch(url, {
      headers: {
        "User-Agent": "DanaMasjid/1.0 (https://danamasjid.com; contact@danamasjid.com)",
        "Accept-Language": "id,en",
      },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `Nominatim error: ${res.status}` },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error("Geocode search proxy error:", err)
    return NextResponse.json({ error: "Gagal menghubungi layanan geocoding" }, { status: 500 })
  }
}
