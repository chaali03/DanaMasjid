'use client'

import { useEffect } from 'react'

export function SuppressExtensionErrors() {
  useEffect(() => {
    // Suppress runtime.lastError from Chrome extensions
    if (typeof window !== 'undefined' && (window as any).chrome?.runtime) {
      const chromeRuntime = (window as any).chrome.runtime
      const originalSendMessage = chromeRuntime.sendMessage
      chromeRuntime.sendMessage = function (...args: any[]) {
        try {
          return originalSendMessage.apply(this, args)
        } catch (e) {
          // Silently ignore extension errors
          return Promise.resolve()
        }
      }
    }

    // Suppress console errors from extensions
    const originalError = console.error
    console.error = function (...args: any[]) {
      const message = args[0]?.toString() || ''
      if (
        message.includes('runtime.lastError') ||
        message.includes('Receiving end does not exist') ||
        message.includes('Extension context invalidated')
      ) {
        return // Suppress extension errors
      }
      originalError.apply(console, args)
    }
  }, [])

  return null
}
