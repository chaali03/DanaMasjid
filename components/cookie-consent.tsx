'use client';

import { useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import { Cookie } from 'lucide-react';

const COOKIE_NAME = 'parantara-cookie-consent';
const COOKIE_EXPIRES = 365; // 1 year

export function CookieConsentBanner() {
  const [isDark, setIsDark] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const consentCookie = getCookie(COOKIE_NAME);
    
    // Only show if no consent has been given yet
    if (!consentCookie) {
      setShouldShow(true);
    }

    // Check initial dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Don't render if user already made a choice
  if (!shouldShow) {
    return null;
  }

  const handleAccept = () => {
    console.log('✅ Cookies accepted by user');
    setShouldShow(false);
    
    // Set cookie manually to ensure it persists
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRES);
    document.cookie = `${COOKIE_NAME}=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    
    // Initialize analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
  };

  const handleDecline = () => {
    console.log('❌ Cookies declined by user');
    setShouldShow(false);
    
    // Set cookie to remember decline choice
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRES);
    document.cookie = `${COOKIE_NAME}=false; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    
    // Disable analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
    
    // Clear any existing analytics cookies
    const cookiesToClear = ['_ga', '_gid', '_gat', '_gat_gtag'];
    cookiesToClear.forEach(cookieName => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Terima Semua"
      declineButtonText="Tolak"
      enableDeclineButton
      cookieName={COOKIE_NAME}
      expires={COOKIE_EXPIRES}
      containerClasses="cookie-consent-container"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.98) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(249, 250, 251, 0.98) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: isDark
          ? '0 -4px 20px rgba(0, 0, 0, 0.5)'
          : '0 -4px 20px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        alignItems: 'center',
        borderTop: isDark
          ? '1px solid rgba(55, 65, 81, 0.8)'
          : '1px solid rgba(229, 231, 235, 0.8)',
        borderLeft: isDark
          ? '1px solid rgba(55, 65, 81, 0.8)'
          : '1px solid rgba(229, 231, 235, 0.8)',
        borderRight: isDark
          ? '1px solid rgba(55, 65, 81, 0.8)'
          : '1px solid rgba(229, 231, 235, 0.8)',
        borderBottom: 'none',
        zIndex: 9999,
        pointerEvents: 'auto',
      }}
      buttonStyle={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        pointerEvents: 'auto',
      }}
      declineButtonStyle={{
        background: 'transparent',
        color: isDark ? '#9ca3af' : '#6b7280',
        fontSize: '14px',
        fontWeight: '600',
        padding: '12px 24px',
        borderRadius: '8px',
        border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        pointerEvents: 'auto',
      }}
      contentStyle={{
        flex: '1 0 300px',
        margin: '0 20px',
        color: isDark ? '#e5e7eb' : '#374151',
      }}
      onAccept={handleAccept}
      onDecline={handleDecline}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
          <Cookie className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            🍪 Kami menggunakan cookies untuk meningkatkan pengalaman Anda
          </p>
          <p className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Dengan melanjutkan, Anda menyetujui penggunaan cookies kami.{' '}
            <a
              href="https://www.cookiesandyou.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-medium hover:underline ${
                isDark
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              Pelajari lebih lanjut →
            </a>
          </p>
        </div>
      </div>
    </CookieConsent>
  );
}
