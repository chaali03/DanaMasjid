/**
 * Advanced Security Utilities
 * Provides comprehensive security functions for the application
 */

// XSS Protection - Sanitize user input
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

// SQL Injection Protection - Escape special characters
export function escapeSql(input: string): string {
  return input
    .replace(/'/g, "''")
    .replace(/;/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
}

// CSRF Token Generation
export function generateCsrfToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Validate CSRF Token
export function validateCsrfToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false
  if (token.length !== storedToken.length) return false
  
  // Constant-time comparison to prevent timing attacks
  let result = 0
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ storedToken.charCodeAt(i)
  }
  return result === 0
}

// Password Strength Validator
export function validatePasswordStrength(password: string): {
  isValid: boolean
  score: number
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0
  
  // Length check
  if (password.length >= 8) score++
  else feedback.push('Password harus minimal 8 karakter')
  
  if (password.length >= 12) score++
  
  // Complexity checks
  if (/[a-z]/.test(password)) score++
  else feedback.push('Tambahkan huruf kecil')
  
  if (/[A-Z]/.test(password)) score++
  else feedback.push('Tambahkan huruf besar')
  
  if (/[0-9]/.test(password)) score++
  else feedback.push('Tambahkan angka')
  
  if (/[^a-zA-Z0-9]/.test(password)) score++
  else feedback.push('Tambahkan karakter khusus (!@#$%^&*)')
  
  // Common patterns check
  const commonPatterns = [
    /^123456/,
    /^password/i,
    /^qwerty/i,
    /^admin/i,
    /^letmein/i,
  ]
  
  if (commonPatterns.some(pattern => pattern.test(password))) {
    score = Math.max(0, score - 2)
    feedback.push('Hindari password yang umum digunakan')
  }
  
  return {
    isValid: score >= 4,
    score: Math.min(score, 6),
    feedback,
  }
}

// Email Validation with comprehensive checks
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  if (!emailRegex.test(email)) return false
  
  // Additional checks
  const [localPart, domain] = email.split('@')
  
  // Local part checks
  if (localPart.length > 64) return false
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false
  if (localPart.includes('..')) return false
  
  // Domain checks
  if (domain.length > 255) return false
  if (domain.startsWith('-') || domain.endsWith('-')) return false
  
  return true
}

// Phone Number Validation (Indonesian format)
export function validatePhoneNumber(phone: string): boolean {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Indonesian phone number patterns
  // Mobile: 08xx-xxxx-xxxx (10-13 digits)
  // With country code: +62 or 62
  const patterns = [
    /^08\d{8,11}$/, // 08xx format
    /^628\d{8,11}$/, // 628xx format
    /^\+628\d{8,11}$/, // +628xx format
  ]
  
  return patterns.some(pattern => pattern.test(cleaned))
}

// Secure Random String Generator
export function generateSecureRandomString(length: number = 32): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Hash String (for client-side hashing)
export async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
}

// Detect suspicious patterns in input
export function detectSuspiciousInput(input: string): {
  isSuspicious: boolean
  reasons: string[]
} {
  const reasons: string[] = []
  
  // SQL Injection patterns
  if (/(\bUNION\b|\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b)/i.test(input)) {
    reasons.push('Possible SQL injection attempt')
  }
  
  // XSS patterns
  if (/<script|javascript:|onerror=|onload=/i.test(input)) {
    reasons.push('Possible XSS attempt')
  }
  
  // Path traversal
  if (/\.\.[\/\\]/.test(input)) {
    reasons.push('Possible path traversal attempt')
  }
  
  // Command injection
  if (/[;&|`$()]/.test(input)) {
    reasons.push('Possible command injection attempt')
  }
  
  // LDAP injection
  if (/[*()\\]/.test(input)) {
    reasons.push('Possible LDAP injection attempt')
  }
  
  return {
    isSuspicious: reasons.length > 0,
    reasons,
  }
}

// Rate Limiting Helper (client-side)
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map()
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000 // 1 minute
  ) {}
  
  isAllowed(key: string): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs)
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false
    }
    
    recentAttempts.push(now)
    this.attempts.set(key, recentAttempts)
    
    return true
  }
  
  reset(key: string): void {
    this.attempts.delete(key)
  }
  
  getRemainingAttempts(key: string): number {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []
    const recentAttempts = attempts.filter(time => now - time < this.windowMs)
    return Math.max(0, this.maxAttempts - recentAttempts.length)
  }
}

// Content Security Policy Nonce Generator
export function generateCspNonce(): string {
  return generateSecureRandomString(16)
}

// Secure Headers Helper
export const secureHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

// Input Sanitization for different contexts
export const sanitize = {
  html: (input: string): string => {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  },
  
  url: (input: string): string => {
    try {
      const url = new URL(input)
      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(url.protocol)) {
        return ''
      }
      return url.toString()
    } catch {
      return ''
    }
  },
  
  filename: (input: string): string => {
    return input
      .replace(/[^a-zA-Z0-9._-]/g, '')
      .substring(0, 255)
  },
}
