import { NextRequest, NextResponse } from "next/server"

/**
 * Proxy untuk Nominatim reverse geocoding dengan in-memory cache
 * Cache berlaku di dev maupun production
 */

// In-memory cache: key = "lat,lng,zoom" (dibulatkan 4 desimal), value = { data, ts }
const cache = new Map<string, { data: unknown; ts: number }>()
const CACHE_TTL = 10 * 60 * 1000 // 10 menit

// Pembulatan koordinat ke 4 desimal (~11m presisi) untuk cache hit yang lebih sering
const round4 = (n: number) => Math.round(n * 10000) / 10000

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const zoom = searchParams.get("zoom") || "16"

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat dan lng wajib diisi" }, { status: 400 })
  }

  const latNum = parseFloat(lat)
  const lngNum = parseFloat(lng)
  if (isNaN(latNum) || isNaN(lngNum)) {
    return NextResponse.json({ error: "lat/lng tidak valid" }, { status: 400 })
  }

  // Cek cache dulu
  const cacheKey = `${round4(latNum)},${round4(lngNum)},${zoom}`
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data, {
      headers: { "X-Cache": "HIT", "Cache-Control": "public, max-age=600" },
    })
  }

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${round4(latNum)}&lon=${round4(lngNum)}&zoom=${zoom}&addressdetails=1&accept-language=id,en&countrycodes=id`

    const res = await fetch(url, {
      headers: {
        "User-Agent": "DanaMasjid/1.0 (https://danamasjid.com; contact@danamasjid.com)",
        "Accept-Language": "id,en",
      },
    })

    if (res.status === 429) {
      // Kalau ada cache lama (expired), kembalikan daripada error
      if (cached) {
        return NextResponse.json(cached.data, {
          headers: { "X-Cache": "STALE", "Cache-Control": "public, max-age=60" },
        })
      }
      return NextResponse.json(
        { error: "Rate limit. Coba lagi dalam beberapa detik." },
        { status: 429, headers: { "Retry-After": "3" } }
      )
    }

    if (!res.ok) {
      return NextResponse.json({ error: `Nominatim error: ${res.status}` }, { status: res.status })
    }

    const data = await res.json()

    // Simpan ke cache
    cache.set(cacheKey, { data, ts: Date.now() })

    // Bersihkan cache lama jika terlalu besar (>500 entry)
    if (cache.size > 500) {
      const now = Date.now()
      for (const [k, v] of cache.entries()) {
        if (now - v.ts > CACHE_TTL) cache.delete(k)
      }
    }

    return NextResponse.json(data, {
      headers: { "X-Cache": "MISS", "Cache-Control": "public, max-age=600" },
    })
  } catch (err) {
    console.error("Reverse geocode proxy error:", err)
    if (cached) {
      return NextResponse.json(cached.data, { headers: { "X-Cache": "STALE-ERROR" } })
    }
    return NextResponse.json({ error: "Gagal menghubungi layanan geocoding" }, { status: 500 })
  }
}
