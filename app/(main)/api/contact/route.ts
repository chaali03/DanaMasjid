import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Mohon isi semua field yang wajib (Nama, Email, Pesan)' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[CONTACT] RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'RESEND_API_KEY belum dikonfigurasi di .env' },
        { status: 500 }
      );
    }

    if (!process.env.RESEND_API_KEY.startsWith('re_')) {
      console.error('[CONTACT] Invalid RESEND_API_KEY format');
      return NextResponse.json(
        { error: 'Format RESEND_API_KEY tidak valid (harus diawali dengan re_)' },
        { status: 500 }
      );
    }

    console.log('[CONTACT] Initializing Resend with key:', process.env.RESEND_API_KEY.substring(0, 5) + '...');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Prepare attachments if file exists
    let attachments = [];
    if (file && typeof file !== 'string' && file.size > 0) {
      try {
        console.log('[CONTACT] Processing attachment:', file.name, file.type, file.size);
        const arrayBuffer = await file.arrayBuffer();
        const base64Content = Buffer.from(arrayBuffer).toString('base64');
        attachments.push({
          filename: file.name,
          content: base64Content,
        });
      } catch (fileError: any) {
        console.error('[CONTACT] Error processing attachment:', fileError);
      }
    }

    console.log('[CONTACT] Sending email via Resend API (fetch)...');
    
    const resendPayload = {
      from: 'onboarding@resend.dev',
      to: ['danamasjid48@gmail.com'],
      subject: `[Kontak] ${subject} - ${fullName}`,
      reply_to: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #2563eb; color: white; padding: 24px; text-align: center;">
            <h2 style="margin: 0;">Pesan Kontak Baru</h2>
          </div>
          <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
            <p><strong>Nama Lengkap:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Nomor Telepon:</strong> ${phone || '-'}</p>
            <p><strong>Subjek:</strong> ${subject}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
            <p><strong>Pesan:</strong></p>
            <div style="background: #f8fafc; padding: 16px; border-radius: 8px; white-space: pre-wrap;">
              ${message}
            </div>
          </div>
          <div style="background: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
            Pesan ini dikirim melalui formulir kontak DanaMasjid.
          </div>
        </div>
      `,
      attachments: attachments.length > 0 ? attachments : undefined
    };

    console.log('[CONTACT] To:', resendPayload.to);
    console.log('[CONTACT] From:', resendPayload.from);
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[CONTACT] Resend API error:');
      console.dir(errorData, { depth: null });
      
      let errorMsg = errorData.message || response.statusText;
      if (response.status === 403) {
        errorMsg = 'Forbidden (403): API Key mungkin salah atau Anda mencoba mengirim email ke alamat yang belum diverifikasi di Resend (Free tier hanya bisa kirim ke email akun sendiri).';
      }

      return NextResponse.json(
        { 
          error: errorMsg,
          details: errorData 
        },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('[CONTACT] Email sent successfully, ID:', result.id);
    return NextResponse.json({
      success: true,
      message: 'Pesan berhasil dikirim!'
    });

  } catch (error: any) {
    console.error('[CONTACT] Critical Error:', error);
    return NextResponse.json(
      { 
        error: 'Terjadi kesalahan sistem.',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
