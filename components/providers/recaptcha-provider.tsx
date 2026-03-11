'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ReactNode } from 'react';

interface RecaptchaProviderProps {
  children: ReactNode;
}

export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  // reCAPTCHA v3 Site Key (public key - aman untuk di frontend)
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  // Disable reCAPTCHA in development or if no valid key
  if (!recaptchaSiteKey || recaptchaSiteKey === 'your_recaptcha_site_key_here' || process.env.NODE_ENV === 'development') {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaSiteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
      container={{
        parameters: {
          badge: 'bottomright', // Position of reCAPTCHA badge
          theme: 'light',
        },
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
