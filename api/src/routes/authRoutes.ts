import express from 'express';
import * as authController from '../controllers/authController';
import authMiddleware from '../middleware/auth';
import { 
  loginLimiter, 
  loginSpeedLimiter,
  otpLimiter, 
  registerLimiter,
  passwordResetLimiter,
  logAuthAttempt,
  preventTimingAttack
} from '../middleware/security';
import { verifyRecaptcha, verifyRecaptchaStrict } from '../middleware/recaptcha';
import {
  validateRegisterStep1,
  validateOTP,
  validateCompleteRegistration,
  validateLogin,
  validateForgotPassword,
  validateResetPassword
} from '../middleware/validation';

const router = express.Router();

// ============================================
// PUBLIC ROUTES - With Enhanced Security + reCAPTCHA
// ============================================

// Registration Step 1 - Send OTP
router.post(
  '/register/step1', 
  verifyRecaptcha,        // Verify reCAPTCHA first
  registerLimiter,        // Limit registration attempts per IP
  otpLimiter,             // Limit OTP requests
  logAuthAttempt,         // Log all attempts
  validateRegisterStep1,  // Validate input
  authController.registerStep1
);

// Registration Step 2 - Verify OTP
router.post(
  '/register/verify-otp', 
  verifyRecaptcha,        // Verify reCAPTCHA
  preventTimingAttack,    // Prevent timing attacks
  logAuthAttempt,
  validateOTP,
  authController.verifyOTP
);

// Registration Step 3 - Complete Registration
router.post(
  '/register/complete', 
  verifyRecaptcha,        // Verify reCAPTCHA
  logAuthAttempt,
  validateCompleteRegistration,
  authController.completeRegistration
);

// Login - Most protected endpoint with strict reCAPTCHA
router.post(
  '/login', 
  verifyRecaptchaStrict,  // Strict reCAPTCHA verification (score >= 0.7)
  loginSpeedLimiter,      // Slow down repeated attempts
  loginLimiter,           // Hard limit on attempts
  preventTimingAttack,    // Prevent timing attacks
  logAuthAttempt,         // Log all login attempts
  validateLogin,          // Validate credentials format
  authController.login
);

// Forgot Password - Send OTP
router.post(
  '/forgot-password', 
  verifyRecaptcha,        // Verify reCAPTCHA
  passwordResetLimiter,   // Limit password reset attempts
  otpLimiter,             // Limit OTP requests
  logAuthAttempt,
  validateForgotPassword,
  authController.forgotPassword
);

// Verify Reset OTP
router.post(
  '/verify-reset-otp', 
  verifyRecaptcha,        // Verify reCAPTCHA
  preventTimingAttack,
  logAuthAttempt,
  validateOTP,
  authController.verifyResetOTP
);

// Reset Password
router.post(
  '/reset-password', 
  verifyRecaptchaStrict,  // Strict verification for password reset
  preventTimingAttack,
  logAuthAttempt,
  validateResetPassword,
  authController.resetPassword
);

// ============================================
// PROTECTED ROUTES - Require Authentication
// ============================================

// Get user profile
router.get(
  '/profile', 
  authMiddleware,         // Verify JWT token
  authController.getProfile
);

// Refresh token endpoint (optional - for future use)
router.post(
  '/refresh-token',
  authMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Token refresh endpoint - to be implemented'
    });
  }
);

// Logout endpoint (optional - for token blacklisting)
router.post(
  '/logout',
  authMiddleware,
  (req, res) => {
    // In future: Add token to blacklist/redis
    res.status(200).json({
      success: true,
      message: 'Logout berhasil'
    });
  }
);

export default router;
