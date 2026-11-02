'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Cookie, Check } from 'lucide-react';

export function CookieConsent() {
  const [consentState, setConsentState] = useState<'pending' | 'allowed' | 'denied' | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check localStorage
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
      {/* Conditionally Inject Google Analytics ONLY AFTER user clicks Allow */}
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
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-auto sm:max-w-xl p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#D9D4CE] shadow-2xl backdrop-blur-md"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#1F2F55]/10 text-[#1F2F55] shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-[#6B3A3F]" />
              </div>
              <div className="text-xs text-[#1A1818] leading-relaxed">
                <span>
                  May I count your visit with Google Analytics? It sets cookies.{' '}
                </span>
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="underline text-[#6B3A3F] font-semibold hover:text-[#1F2F55] cursor-pointer"
                >
                  {showDetails ? 'Hide details' : 'Details'}
                </button>
                {showDetails && (
                  <p className="mt-2 text-[11px] text-[#544E49] border-t border-[#E6E2DC] pt-1.5">
                    We only collect anonymous page view counts and referrers to improve portfolio performance. No personal tracking or ad retargeting is executed.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                type="button"
                onClick={handleDeny}
                className="py-1.5 px-3 rounded-lg bg-white border border-[#D9D4CE] text-xs font-mono text-[#544E49] hover:bg-[#E6E2DC] hover:text-[#1A1818] transition-colors cursor-pointer"
              >
                No thanks
              </button>
              <button
                type="button"
                onClick={handleAllow}
                className="py-1.5 px-4 rounded-lg bg-[#1F2F55] text-white text-xs font-mono font-bold hover:bg-[#15223E] transition-colors shadow-xs cursor-pointer flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5 text-amber-300" />
                <span>Allow</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
