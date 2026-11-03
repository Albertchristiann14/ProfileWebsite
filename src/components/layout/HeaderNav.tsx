'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useDoorTransition } from '../doors/DoorTransitionProvider';
import { useTheme } from '../providers/ThemeProvider';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Web Dev', href: '/web-developer' },
  { label: 'App Dev', href: '/app-developer' },
  { label: 'Business Systems', href: '/business-systems' },
  { label: 'AI & GIS', href: '/ai-gis' },
  { label: 'Event Ops', href: '/event-digital-ops' },
  { label: 'My Story', href: '/#story-timeline' },
  { label: 'Contact', href: '#contact-cta' },
];

export function HeaderNav({ onOpenContact }: { onOpenContact: () => void }) {
  const pathname = usePathname();
  const { isDark } = useTheme();
  const { triggerWalkThrough, triggerDoorReturn } = useDoorTransition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        month: 'short',
        year: 'numeric',
      });
      setTimeString(`${timePart} · ${datePart}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (href === '#contact-cta') {
      e.preventDefault();
      onOpenContact();
      return;
    }

    if (href === '/' && pathname !== '/') {
      e.preventDefault();
      triggerDoorReturn('/');
      return;
    }

    if (href === '/#story-timeline' && pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('story-timeline');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (href.startsWith('/') && href !== '/' && !href.includes('#')) {
      e.preventDefault();
      if (pathname !== href) {
        triggerWalkThrough(href);
      }
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-8 lg:px-14 py-3.5 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 pointer-events-auto">
        
        {/* MOBILE / TABLET BRAND PILL (Visible when full nav bar is collapsed) */}
        <a
          href="/"
          onClick={(e) => handleLinkClick('/', e)}
          className={`xl:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border text-xs font-semibold tracking-tight transition-all shadow-xs ${
            isDark
              ? 'bg-[#181920]/85 border-[#2E313D] text-[#FAF7F2]'
              : 'bg-[#FAF8F5]/85 border-[#D6CFC7] text-[#181615]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Albert Christian</span>
        </a>

        {/* DESKTOP FLOATING GLASS NAVIGATION PILL */}
        <nav
          aria-label="Main Navigation"
          className={`hidden xl:inline-flex items-center gap-1 p-1.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
            isDark
              ? scrolled
                ? 'bg-[#15171E]/90 border-[#2E313D] shadow-[0_10px_30px_rgba(0,0,0,0.45)]'
                : 'bg-[#181920]/65 border-[#2C2F3A]/80 shadow-sm'
              : scrolled
              ? 'bg-[#FAF8F5]/90 border-[#D5CEC6] shadow-[0_10px_30px_rgba(24,22,21,0.08)]'
              : 'bg-white/60 border-[#D8D1C9]/80 shadow-2xs'
          }`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const isContact = link.href === '#contact-cta';

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isContact
                    ? isDark
                      ? 'ml-1 bg-amber-300 text-[#14151B] font-semibold hover:bg-amber-200 shadow-2xs'
                      : 'ml-1 bg-[#181615] text-[#FAF8F5] font-semibold hover:bg-[#2E2A28] shadow-2xs'
                    : isActive
                    ? isDark
                      ? 'bg-white/12 text-white font-semibold shadow-2xs'
                      : 'bg-[#181615]/10 text-[#181615] font-semibold'
                    : isDark
                    ? 'text-[#A8A096] hover:text-white hover:bg-white/5'
                    : 'text-[#5C554E] hover:text-[#181615] hover:bg-black/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* RIGHT PILL: LOCAL TIME + MOBILE MENU TRIGGER */}
        <div className="flex items-center gap-2.5 ml-auto pr-12 sm:pr-16">
          <div
            suppressHydrationWarning
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border text-[11px] sm:text-xs font-mono transition-all duration-300 ${
              isDark
                ? scrolled
                  ? 'bg-[#15171E]/90 border-[#2E313D] text-[#C4BCB3] shadow-md'
                  : 'bg-[#181920]/65 border-[#2C2F3A] text-[#C4BCB3]'
                : scrolled
                ? 'bg-[#FAF8F5]/90 border-[#D5CEC6] text-[#5C554E] shadow-sm'
                : 'bg-white/60 border-[#D8D1C9] text-[#5C554E]'
            }`}
            aria-live="polite"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="hidden md:inline opacity-75">Pekanbaru</span>
            <span className="hidden md:inline opacity-40">·</span>
            <span className={`font-bold tabular-nums ${isDark ? 'text-amber-200' : 'text-[#181615]'}`}>
              {timeString ? timeString.split(' · ')[0] : '11:45am'}
            </span>
            <span className="hidden sm:inline opacity-40">·</span>
            <span className={`hidden sm:inline font-medium ${isDark ? 'text-[#DDD6CC]' : 'text-[#5C554E]'}`}>
              {timeString ? timeString.split(' · ')[1] : '3 Nov 2026'}
            </span>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className={`xl:hidden p-2 rounded-full border backdrop-blur-md transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#181920]/85 border-[#2E313D] text-white hover:bg-[#242630]'
                : 'bg-[#FAF8F5]/85 border-[#D6CFC7] text-[#181615] hover:bg-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`xl:hidden mt-2.5 max-w-md ml-auto mr-12 sm:mr-16 p-4 rounded-3xl border shadow-2xl backdrop-blur-xl flex flex-col gap-1.5 pointer-events-auto transition-colors duration-300 ${
            isDark
              ? 'bg-[#161820]/95 border-[#2E313D]'
              : 'bg-[#FAF8F5]/95 border-[#D6CFC7]'
          }`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                  isActive
                    ? isDark
                      ? 'bg-amber-300 text-[#14151B] font-bold'
                      : 'bg-[#181615] text-white font-bold'
                    : isDark
                    ? 'text-[#C4BCB3] hover:bg-white/10 hover:text-white'
                    : 'text-[#5C554E] hover:bg-black/5 hover:text-[#181615]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="text-[10px] opacity-75">ACTIVE</span>}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
