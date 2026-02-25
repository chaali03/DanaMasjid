import { EmailService } from '../utils/emailService';

// Contoh penggunaan di route atau controller
export async function sendMasjidWelcomeEmail(email: string) {
  try {
    // Generate email template
    const emailTemplate = EmailService.getMasjidRegistrationWelcomeEmail({
      email,
      registrationUrl: 'https://danamasjid.com/masjid/register',
      helpUrl: 'https://danamasjid.com/bantuan',
      privacyUrl: 'https://danamasjid.com/privacy',
      termsUrl: 'https://danamasjid.com/terms',
    });

    // Send email
    await EmailService.sendEmail(email, emailTemplate);

    console.log('Welcome email sent successfully to:', email);
    return { success: true };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
}

// Contoh integrasi di route subscribe
/*
import express from 'express';

router.post('/subscribe/masjid', async (req, res) => {
  const { email } = req.body;

  try {
    // Simpan email ke database
    // await saveSubscription(email);

    // Kirim welcome email
    await sendMasjidWelcomeEmail(email);

    res.json({ 
      success: true, 
      message: 'Email pendaftaran telah dikirim!' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Gagal mengirim email' 
    });
  }
});
*/
