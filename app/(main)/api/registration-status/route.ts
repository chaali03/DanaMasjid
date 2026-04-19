import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email required' },
        { status: 400 }
      )
    }

    // Check if prisma model exists
    if (!prisma.registrationToken) {
      console.warn('[GET /api/registration-status] Prisma model registrationToken not found, returning 404')
      return NextResponse.json({
        success: false,
        message: 'Registration system not fully initialized'
      }, { status: 404 })
    }

    // Find the latest active and unused token for this email
    const latestToken = await prisma.registrationToken.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        isUsed: false,
        expiresAt: {
          gt: new Date()
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (latestToken) {
      return NextResponse.json({
        success: true,
        token: latestToken.token
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'No active token found'
      })
    }
  } catch (error: any) {
    console.error('[GET /api/registration-status]', error)
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error' },
      { status: 500 }
    )
  }
}
