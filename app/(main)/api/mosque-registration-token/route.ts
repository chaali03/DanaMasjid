import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function generateToken(): string {
  return randomBytes(32).toString('hex')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email required' },
        { status: 400 }
      )
    }

    // 1. Try to find an existing active token for this email
    const existingToken = await prisma.registrationToken.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        isUsed: false,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    })

    if (existingToken) {
      return NextResponse.json({
        success: true,
        token: existingToken.token
      })
    }

    // 2. Generate unique token for this session if none found
    const token = generateToken()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days total expiry
    const sessionExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour session

    // Create a new registration token in Prisma
    const newToken = await prisma.registrationToken.create({
      data: {
        token,
        email: email.toLowerCase().trim(),
        name: name || 'User',
        nickname: (name || 'user').toLowerCase().trim(),
        expiresAt,
        sessionExpiry,
        isVerified: true, // Already logged in, so verified
        isUsed: false
      }
    })

    return NextResponse.json({
      success: true,
      token: newToken.token
    })
  } catch (error: any) {
    console.error('[POST /api/mosque-registration-token]', error)
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error' },
      { status: 500 }
    )
  }
}
