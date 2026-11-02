'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useDoorTransition } from '../doors/DoorTransitionProvider';
import { useTheme } from '../providers/ThemeProvider';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Web Development', href: '/web-developer' },
  { label: 'App Development', href: '/app-developer' },
  { label: 'Business Systems', href: '/business-systems' },
  { label: 'AI & GIS', href: '/ai-gis' },
  { label: 'Event & Digital Ops', href: '/event-digital-ops' },
  { label: 'My story', href: '/#story-timeline' },
  { label: 'Contact', href: '#contact-cta' },
];

export function HeaderNav({ onOpenContact }: { onOpenContact: () => void }) {
  const pathname = usePathname();
  const { isDark } = useTheme();
  const { triggerWalkThrough } = useDoorTransition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live user timezone clock with minute interval, rendered after mount to prevent hydration mismatch
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timePart = now
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        .toLowerCase();
      const datePart = now.toLocaleDateString([], {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setTimeString(`${timePart} · ${datePart}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (href === '#contact-cta') {
      e.preventDefault();
      onOpenContact();
      return;
    }

    if (href.startsWith('/') && href !== '/' && !href.includes('#')) {
      e.preventDefault();
      triggerWalkThrough(href);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-6 sm:px-10 lg:px-16 py-4 pointer-events-none transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* CENTERED NAVIGATION LINKS */}
        <nav
          aria-label="Main Navigation"
          className="hidden xl:flex items-center gap-7 text-xs sm:text-[13px] font-medium"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className={`transition-colors cursor-pointer hover:text-[#6B3A3F] ${
                  isActive
                    ? isDark ? 'font-bold text-white' : 'font-bold text-[#1A1818]'
                    : isDark ? 'text-[#9E978F] hover:text-white' : 'text-[#6E6464] hover:text-[#1A1818]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* RIGHT PILL: LOCAL TIME */}
        <div className="flex items-center gap-3 ml-auto pr-16 sm:pr-24">
          <div
            suppressHydrationWarning
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-xs border text-xs font-mono shadow-2xs transition-colors duration-500 ${
              isDark
                ? 'bg-black/50 border-[#323440] text-[#C4BCB3]'
                : 'bg-white/45 border-[#D5CDCA] text-[#544E49]'
            }`}
            aria-live="polite"
          >
            <span className={isDark ? 'text-[#8C847C]' : 'text-[#857878]'}>Local time</span>
            <span className={`font-bold tabular-nums ${isDark ? 'text-amber-200' : 'text-[#1A1818]'}`}>
              {timeString ? timeString.split(' · ')[0] : '11:39am'}
            </span>
            <span className="text-[#857878]">·</span>
            <span className={`font-medium ${isDark ? 'text-[#DDD6CC]' : 'text-[#544E49]'}`}>
              {timeString ? timeString.split(' · ')[1] : '2 November, 2026'}
            </span>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className={`xl:hidden p-2 rounded-full border transition-colors cursor-pointer ${
              isDark
                ? 'bg-black/60 border-[#323440] text-white hover:bg-black'
                : 'bg-white/70 border-[#D5CDCA] text-[#1A1818] hover:bg-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`xl:hidden mt-3 p-5 rounded-3xl border shadow-2xl flex flex-col gap-2.5 pointer-events-auto transition-colors duration-500 ${
          isDark
            ? 'bg-[#181920] border-[#323440]'
            : 'bg-[#FAF8F5] border-[#D5CDCA]'
        }`}>
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? isDark ? 'bg-amber-300 text-black font-bold' : 'bg-[#1A1818] text-white font-bold'
                    : isDark ? 'text-[#A8A196] hover:bg-white/10 hover:text-white' : 'text-[#544E49] hover:bg-white hover:text-[#1A1818]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
