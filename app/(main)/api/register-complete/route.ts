import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = body

    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: 'Data tidak lengkap' },
        { status: 400 }
      )
    }

    // Get and validate token from Prisma
    const { prisma } = await import('@/lib/prisma')
    
    if (!prisma.registrationToken) {
      return NextResponse.json(
        { success: false, message: 'Sistem pendaftaran belum siap' },
        { status: 503 }
      )
    }

    const tokenRecord = await prisma.registrationToken.findUnique({
      where: { token }
    })

    if (!tokenRecord) {
      return NextResponse.json(
        { success: false, message: 'Token tidak valid' },
        { status: 404 }
      )
    }

    // Validate token
    if (tokenRecord.isUsed) {
      return NextResponse.json(
        { success: false, message: 'Token sudah digunakan' },
        { status: 400 }
      )
    }

    const now = new Date()
    const expiresAt = new Date(tokenRecord.expiresAt)
    if (expiresAt < now) {
      return NextResponse.json(
        { success: false, message: 'Token sudah kadaluarsa (melebihi 7 hari)' },
        { status: 400 }
      )
    }

    // Mark token as verified (but not used yet, until mosque registration is done)
    await prisma.registrationToken.update({
      where: { id: tokenRecord.id },
      data: {
        isVerified: true,
        updatedAt: now
      }
    })

    // Mark as verified in Firestore fallback
    try {
      const { getFirestore } = await import('@/lib/firebase-admin')
      const db = getFirestore()
      await db.collection('registrationTokens').doc(token).update({
        isVerified: true,
        updatedAt: now.toISOString(),
      })
    } catch (e) {
      console.warn('Firestore update fallback failed')
    }

    // Return user data for Firebase Auth registration
    return NextResponse.json({
      success: true,
      data: {
        name: tokenRecord.name,
        nickname: tokenRecord.nickname,
        email: tokenRecord.email,
      },
    })
  } catch (error: any) {
    console.error('[POST /api/register-complete]', error)
    return NextResponse.json(
      { success: false, message: error?.message || 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
