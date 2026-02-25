import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Email tidak valid" },
        { status: 400 }
      )
    }

    // Send email via backend API
    const response = await fetch("http://localhost:3001/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (data.success) {
      return NextResponse.json({
        success: true,
        message: "Email berhasil dikirim! Silakan cek inbox Anda.",
      })
    } else {
      return NextResponse.json(
        { success: false, message: data.message || "Gagal mengirim email" },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Subscribe error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
