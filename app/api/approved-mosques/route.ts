import { NextResponse } from 'next/server'
import { Pool } from 'pg'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const globalForPg = globalThis as unknown as { pgPool?: Pool }
const pool: Pool = globalForPg.pgPool ?? new Pool({ connectionString: process.env.DATABASE_URL })
if (process.env.NODE_ENV !== 'production') globalForPg.pgPool = pool

export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT id, "mosqueName", "mosqueAddress", province, regency, district, village, "mosqueImage"
       FROM masjid_registrations
       WHERE status = 'approved'
       ORDER BY "approvedAt" DESC`
    )
    return NextResponse.json({ data: rows })
  } catch (err) {
    // Return empty array instead of 500 — section will just stay hidden
    return NextResponse.json({ data: [] })
  }
}
