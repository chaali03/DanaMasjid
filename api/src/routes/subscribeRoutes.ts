import express, { Request, Response } from 'express';
import { sendSubscriptionEmail } from '../utils/email';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Test endpoint
router.get('/test', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Subscribe route is working!' });
});

router.post(
  '/',
  [
    body('email').isEmail().withMessage('Email tidak valid'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg
        });
      }

      const { email } = req.body;

      console.log(`[SUBSCRIBE] Attempting to send email to: ${email}`);

      // Send subscription email
      const result = await sendSubscriptionEmail(email);

      if (!result.success) {
        console.error('[SUBSCRIBE] Email send failed:', result.error);
        return res.status(500).json({
          success: false,
          message: 'Gagal mengirim email. Silakan coba lagi.'
        });
      }

      console.log(`[SUBSCRIBE] Email sent successfully to: ${email}`);

      res.status(200).json({
        success: true,
        message: 'Email berhasil dikirim! Silakan cek inbox Anda.'
      });
    } catch (error) {
      console.error('[SUBSCRIBE] Error:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal mengirim email. Silakan coba lagi.'
      });
    }
  }
);

export default router;
