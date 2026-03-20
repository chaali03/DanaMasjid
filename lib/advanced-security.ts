/**
 * Advanced Security Utilities
 * Protection against XSS, CSRF, Clickjacking, and other attacks
 */

// Allowed HTML tags whitelist for sanitization
const ALLOWED_TAGS = /^(b|i|em|strong|p|br|ul|ol|li|span|div|h[1-6]|blockquote|pre|code)$/i

/**
 * DOMPurify-like sanitization for HTML content
 * Uses allowlist approach instead of blocklist to avoid incomplete sanitization
 */
export function sanitizeHTML(html: string): string {
  if (!html) return ''

  // Strip ALL tags first, then re-allow safe ones via text encoding
  // Safest approach: encode everything, no partial tag stripping
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/**
 * Prevent clickjacking by checking if page is in iframe
 */
export function preventClickjacking(): void {
  if (typeof window === 'undefined') return

  try {
    if (window.self !== window.top) {
      window.top!.location.href = window.self.location.href
    }
  } catch {
    document.body.innerHTML = ''
    window.location.href = 'about:blank'
  }
}

/**
 * Secure cookie settings
 */
export function setSecureCookie(name: string, value: string, days: number = 7): void {
  if (typeof document === 'undefined') return

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)

  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict${secure}`
}

/**
 * Get cookie value securely
 */
export function getSecureCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const nameEQ = name + '='
  const ca = document.cookie.split(';')

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trimStart()
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length))
    }
  }

  return null
}

/**
 * Delete cookie securely
 */
export function deleteSecureCookie(name: string): void {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

/**
 * Validate and sanitize URL to prevent open redirect
 * Only allows same-origin relative paths
 */
export function sanitizeURL(url: string): string {
  if (!url) return '/'

  // Only allow relative paths starting with /
  // Reject anything with a protocol or authority
  if (!/^\/[^/\\]/.test(url) && url !== '/') {
    return '/'
  }

  // Block javascript: data: vbscript: and protocol-relative URLs
  const lower = url.toLowerCase().trimStart()
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('//')
  ) {
    return '/'
  }

  // Only allow safe characters in path
  try {
    const parsed = new URL(url, 'https://example.com')
    return parsed.pathname + parsed.search + parsed.hash
  } catch {
    return '/'
  }
}

/**
 * Content Security Policy violation reporter
 */
export function setupCSPReporting(): void {
  if (typeof window === 'undefined') return

  document.addEventListener('securitypolicyviolation', (e) => {
    console.error('CSP Violation:', {
      blockedURI: e.blockedURI,
      violatedDirective: e.violatedDirective,
      originalPolicy: e.originalPolicy,
      sourceFile: e.sourceFile,
      lineNumber: e.lineNumber,
    })
  })
}

/**
 * Detect and prevent prototype pollution
 */
export function sanitizeObjectKeys(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj

  const sanitized: any = Array.isArray(obj) ? [] : {}

  for (const key of Object.keys(obj)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue
    sanitized[key] = sanitizeObjectKeys(obj[key])
  }

  return sanitized
}

/**
 * Secure random token generation
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Timing-safe string comparison to prevent timing attacks
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return result === 0
}

/**
 * Input validation with whitelist approach
 */
export function validateInput(
  input: string,
  type: 'alphanumeric' | 'email' | 'phone' | 'url' | 'text'
): boolean {
  const patterns: Record<string, RegExp> = {
    alphanumeric: /^[a-zA-Z0-9_-]+$/,
    email: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
    phone: /^(\+62|62|0)[0-9]{9,13}$/,
    url: /^https?:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+$/,
    text: /^[a-zA-Z0-9\s.,!?'\-]+$/,
  }

  return patterns[type]?.test(input) ?? false
}

/**
 * Prevent tabnabbing attack
 */
export function secureExternalLink(url: string): { href: string; rel: string; target: string } {
  return {
    href: url,
    rel: 'noopener noreferrer',
    target: '_blank',
  }
}

/**
 * Rate limiting with exponential backoff
 */
export class AdvancedRateLimiter {
  private attempts: Map<string, { count: number; resetTime: number; backoffMs: number }> = new Map()

  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000,
    private baseBackoffMs: number = 1000
  ) {}

  check(identifier: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now()
    const record = this.attempts.get(identifier)

    if (!record) {
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs, backoffMs: this.baseBackoffMs })
      return { allowed: true }
    }

    if (now < record.resetTime) {
      if (record.count >= this.maxAttempts) {
        return { allowed: false, retryAfter: Math.ceil((record.resetTime - now) / 1000) }
      }
      record.count++
      record.backoffMs = Math.min(record.backoffMs * 2, 60000)
      record.resetTime = now + record.backoffMs
      this.attempts.set(identifier, record)
      return { allowed: true }
    }

    this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs, backoffMs: this.baseBackoffMs })
    return { allowed: true }
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier)
  }
}

/**
 * Detect suspicious patterns in user input
 */
export function detectSuspiciousPatterns(input: string): { isSuspicious: boolean; reasons: string[] } {
  const reasons: string[] = []

  if (/\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC)\b/i.test(input)) {
    reasons.push('SQL injection pattern detected')
  }
  if (/<script|javascript:|onerror=|onload=/i.test(input)) {
    reasons.push('XSS pattern detected')
  }
  if (/\.\.[/\\]/.test(input)) {
    reasons.push('Path traversal pattern detected')
  }
  if (/[;&|`$()]/.test(input)) {
    reasons.push('Command injection pattern detected')
  }

  return { isSuspicious: reasons.length > 0, reasons }
}

/**
 * Initialize all security measures
 */
export function initializeSecurity(): void {
  if (typeof window === 'undefined') return

  preventClickjacking()
  setupCSPReporting()

  document.addEventListener('drop', (e) => {
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') return
    e.preventDefault()
  })

  document.addEventListener('dragover', (e) => {
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') return
    e.preventDefault()
  })
}
