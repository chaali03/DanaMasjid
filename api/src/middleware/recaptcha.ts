import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

// Minimum score untuk dianggap human (0.0 = bot, 1.0 = human)
const MINIMUM_SCORE = 0.5;

export const verifyRecaptcha = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const recaptchaToken = req.body.recaptchaToken || req.headers['x-recaptcha-token'];

    // Skip verification in development if no token provided
    if (process.env.NODE_ENV === 'development' && !recaptchaToken) {
      console.warn('[RECAPTCHA] Skipping verification in development mode');
      next();
      return;
    }

    if (!recaptchaToken) {
      res.status(400).json({
        success: false,
        message: 'Token reCAPTCHA tidak ditemukan'
      });
      return;
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error('[RECAPTCHA] Secret key not configured');
      // Don't block request if secret key is not configured
      next();
      return;
    }

    // Verify token with Google reCAPTCHA API
    const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const response = await axios.post<RecaptchaResponse>(
      verificationUrl,
      null,
      {
        params: {
          secret: secretKey,
          response: recaptchaToken,
          remoteip: req.ip,
        },
      }
    );

    const { success, score, action } = response.data;

    // Log verification result
    console.log(`[RECAPTCHA] Verification - IP: ${req.ip} | Action: ${action} | Score: ${score} | Success: ${success}`);

    if (!success) {
      console.warn(`[RECAPTCHA] Verification failed for IP: ${req.ip}`);
      console.warn(`[RECAPTCHA] Error codes:`, response.data['error-codes']);
      
      res.status(403).json({
        success: false,
        message: 'Verifikasi keamanan gagal. Silakan coba lagi.'
      });
      return;
    }

    // Check score (v3 only)
    if (score !== undefined && score < MINIMUM_SCORE) {
      console.warn(`[RECAPTCHA] Low score detected - IP: ${req.ip} | Score: ${score}`);
      
      res.status(403).json({
        success: false,
        message: 'Aktivitas mencurigakan terdeteksi. Silakan coba lagi nanti.'
      });
      return;
    }

    // Verification successful
    console.log(`[RECAPTCHA] ✅ Verified - IP: ${req.ip} | Score: ${score}`);
    next();
  } catch (error) {
    console.error('[RECAPTCHA] Verification error:', error);
    
    // Don't block request on verification error (fail open)
    // In production, you might want to fail closed instead
    if (process.env.NODE_ENV === 'production') {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan verifikasi keamanan'
      });
      return;
    }
    
    next();
  }
};

// Optional: Stricter verification for sensitive operations
export const verifyRecaptchaStrict = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const STRICT_MINIMUM_SCORE = 0.7;
  
  try {
    const recaptchaToken = req.body.recaptchaToken || req.headers['x-recaptcha-token'];

    if (!recaptchaToken) {
      res.status(400).json({
        success: false,
        message: 'Token reCAPTCHA tidak ditemukan'
      });
      return;
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error('[RECAPTCHA] Secret key not configured');
      res.status(500).json({
        success: false,
        message: 'Konfigurasi keamanan tidak lengkap'
      });
      return;
    }

    const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const response = await axios.post<RecaptchaResponse>(
      verificationUrl,
      null,
      {
        params: {
          secret: secretKey,
          response: recaptchaToken,
          remoteip: req.ip,
        },
      }
    );

    const { success, score } = response.data;

    if (!success || (score !== undefined && score < STRICT_MINIMUM_SCORE)) {
      console.warn(`[RECAPTCHA] Strict verification failed - IP: ${req.ip} | Score: ${score}`);
      
      res.status(403).json({
        success: false,
        message: 'Verifikasi keamanan gagal. Silakan coba lagi.'
      });
      return;
    }

    console.log(`[RECAPTCHA] ✅ Strict verified - IP: ${req.ip} | Score: ${score}`);
    next();
  } catch (error) {
    console.error('[RECAPTCHA] Strict verification error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan verifikasi keamanan'
    });
  }
};
