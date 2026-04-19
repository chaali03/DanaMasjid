import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token tidak valid' },
        { status: 400 }
      )
    }

    // Get and validate token from Prisma
    const { prisma } = await import('@/lib/prisma')
    
    if (!prisma.registrationToken) {
      return NextResponse.json(
        { success: false, message: 'Sistem verifikasi belum siap' },
        { status: 503 }
      )
    }

    const tokenRecord = await prisma.registrationToken.findUnique({
      where: { token }
    })

    if (!tokenRecord) {
      return NextResponse.json(
        { success: false, message: 'Link verifikasi tidak valid' },
        { status: 404 }
      )
    }

    // Check if token is already used
    if (tokenRecord.isUsed) {
      return NextResponse.json(
        { success: false, message: 'Link verifikasi sudah pernah digunakan' },
        { status: 400 }
      )
    }

    const now = new Date()

    // 1. Check if token is totally expired (7 days)
    const expiresAt = new Date(tokenRecord.expiresAt)
    if (expiresAt < now) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Token sudah hangus (melebihi 7 hari). Silakan verifikasi perangkat ulang.',
          action: 'VERIFY_DEVICE'
        },
        { status: 403 }
      )
    }

    // 2. Check if session is expired (1 hour)
    if (tokenRecord.sessionExpiry) {
      const sessionExpiry = new Date(tokenRecord.sessionExpiry)
      if (sessionExpiry < now) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Sesi pengisian formulir berakhir (melebihi 1 jam). Silakan login ulang.',
            action: 'LOGIN'
          },
          { status: 401 }
        )
      }
    }

    // Update session expiry for next hour activity (optional but good for active session)
    await prisma.registrationToken.update({
      where: { id: tokenRecord.id },
      data: {
        sessionExpiry: new Date(Date.now() + 1 * 60 * 60 * 1000)
      }
    })

    // Return user data
    return NextResponse.json({
      success: true,
      data: {
        name: tokenRecord.name,
        nickname: tokenRecord.nickname,
        email: tokenRecord.email,
        isVerified: tokenRecord.isVerified
      },
    })
  } catch (error: any) {
    console.error('[POST /api/register-verify-token]', error)
    return NextResponse.json(
      { success: false, message: error?.message || 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
