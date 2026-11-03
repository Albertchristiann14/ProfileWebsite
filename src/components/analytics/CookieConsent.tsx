'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Cookie, Check } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';

export function CookieConsent() {
  const { isDark } = useTheme();
  const [consentState, setConsentState] = useState<'pending' | 'allowed' | 'denied' | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('albert_portfolio_ga_consent');
    if (saved === 'allowed') {
      setConsentState('allowed');
    } else if (saved === 'denied') {
      setConsentState('denied');
    } else {
      setConsentState('pending');
    }
  }, []);

  const handleAllow = () => {
    localStorage.setItem('albert_portfolio_ga_consent', 'allowed');
    setConsentState('allowed');
  };

  const handleDeny = () => {
    localStorage.setItem('albert_portfolio_ga_consent', 'denied');
    setConsentState('denied');
  };

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {consentState === 'allowed' && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}

      {/* Cookie Banner UI */}
      {consentState === 'pending' && (
        <aside
          aria-label="Cookie consent banner"
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-auto sm:max-w-xl p-4 sm:p-5 rounded-2xl border shadow-2xl backdrop-blur-xl transition-colors ${
            isDark
              ? 'bg-[#181A22]/95 border-[#2C2F3C] text-[#FAF7F2]'
              : 'bg-[#FAF8F5]/95 border-[#D8D1C7] text-[#181615]'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                  isDark ? 'bg-amber-300/15 text-amber-300' : 'bg-[#1D3254]/10 text-[#6B3A3F]'
                }`}
              >
                <Cookie className="w-5 h-5" />
              </div>
              <div className="text-xs leading-relaxed">
                <span>
                  May I count your visit with Google Analytics? It sets cookies.{' '}
                </span>
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className={`underline font-semibold cursor-pointer ${
                    isDark ? 'text-amber-300 hover:text-white' : 'text-[#6B3A3F] hover:text-[#1D3254]'
                  }`}
                >
                  {showDetails ? 'Hide details' : 'Details'}
                </button>
                {showDetails && (
                  <p
                    className={`mt-2 text-[11px] border-t pt-1.5 ${
                      isDark ? 'text-[#ACA49A] border-white/10' : 'text-[#544E49] border-[#E6E0D6]'
                    }`}
                  >
                    We only collect anonymous page view counts and referrers to improve portfolio performance. No personal tracking or ad retargeting is executed.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                type="button"
                onClick={handleDeny}
                className={`py-1.5 px-3 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#12141B] border-[#2C2F3C] text-[#ACA49A] hover:text-white'
                    : 'bg-white border-[#D8D1C7] text-[#544E49] hover:text-[#181615]'
                }`}
              >
                No thanks
              </button>
              <button
                type="button"
                onClick={handleAllow}
                className={`py-1.5 px-4 rounded-xl text-xs font-mono font-bold transition-colors shadow-xs cursor-pointer flex items-center gap-1 ${
                  isDark
                    ? 'bg-amber-300 hover:bg-amber-200 text-[#14151B]'
                    : 'bg-[#1D3254] hover:bg-[#15223E] text-white'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Allow</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
