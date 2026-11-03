'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, ArrowUp, MapPin, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/icons/SocialIcons';
import { DOORS_DATA } from '@/data/doorsData';
import { useDoorTransition } from '../doors/DoorTransitionProvider';
import { useTheme } from '../providers/ThemeProvider';

interface FooterProps {
  onOpenContact: () => void;
}

export function Footer({ onOpenContact }: FooterProps) {
  const { triggerWalkThrough } = useDoorTransition();
  const { isDark } = useTheme();
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) +
          ' · ' +
          now.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact-cta"
      className={`relative w-full pt-20 pb-12 px-6 border-t transition-colors duration-700 ${
        isDark
          ? 'bg-[#0E1015] text-[#FAF7F2] border-[#222530]'
          : 'bg-[#DFD9D0] text-[#181615] border-[#C9C1B6]'
      }`}
    >
      {/* BIG CTA BANNER */}
      <div className="max-w-7xl mx-auto mb-20">
        <div
          className={`p-8 sm:p-12 md:p-16 rounded-3xl text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border ${
            isDark
              ? 'bg-gradient-to-br from-[#1B2845] via-[#151E34] to-[#101626] border-white/10'
              : 'bg-gradient-to-br from-[#1D3254] via-[#182844] to-[#121E34] border-white/15'
          }`}
        >
          {/* Subtle architectural door silhouette in background */}
          <div className="absolute right-6 -bottom-10 w-64 h-80 opacity-10 pointer-events-none flex items-center justify-center">
            <div className="w-48 h-72 rounded-t-full border-4 border-amber-200" />
          </div>

          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-300 font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
              <span>START A CONVERSATION</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.08]">
              Got a project in mind? <br />
              <span className="text-amber-200">Let’s build it together.</span>
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-white/80 leading-relaxed">
              Available for full-stack web engineering, native Kotlin Android apps, custom ERP &amp; hospitality systems, and technical event operations.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={onOpenContact}
              className="w-full sm:w-auto py-4 px-7 rounded-2xl bg-amber-300 hover:bg-amber-200 text-[#14151B] font-mono text-xs uppercase tracking-wider font-extrabold transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2.5"
            >
              <Mail className="w-4 h-4" />
              <span>Start Project Inquiry</span>
            </button>

            <a
              href="mailto:albertchristian.dev@gmail.com"
              className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/18 border border-white/20 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all text-center"
            >
              Direct Email
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER MULTI-COLUMN DIRECTORY */}
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b ${
          isDark ? 'border-[#222530]' : 'border-[#C8C0B5]'
        }`}
      >
        {/* Column 1: Work (The 5 Doors) */}
        <div>
          <span
            className={`font-mono text-xs uppercase tracking-[0.18em] font-bold block mb-4 ${
              isDark ? 'text-amber-300' : 'text-[#6B3A3F]'
            }`}
          >
            The 5 Doors
          </span>
          <ul className="space-y-2.5">
            {DOORS_DATA.map((door) => (
              <li key={door.id}>
                <button
                  type="button"
                  onClick={() => triggerWalkThrough(door.route)}
                  className={`text-xs font-mono transition-colors text-left flex items-center gap-2 cursor-pointer group ${
                    isDark
                      ? 'text-[#ABA39A] hover:text-white'
                      : 'text-[#544E49] hover:text-[#181615]'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0 transition-transform group-hover:scale-125"
                    style={{ backgroundColor: door.themeColor }}
                  />
                  <span className="opacity-65 font-bold">{door.doorNumber}</span>
                  <span className="font-medium">{door.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Navigate */}
        <div>
          <span
            className={`font-mono text-xs uppercase tracking-[0.18em] font-bold block mb-4 ${
              isDark ? 'text-amber-300' : 'text-[#6B3A3F]'
            }`}
          >
            Navigate
          </span>
          <ul
            className={`space-y-2.5 text-xs font-mono ${
              isDark ? 'text-[#ABA39A]' : 'text-[#544E49]'
            }`}
          >
            <li>
              <Link
                href="/"
                className={isDark ? 'hover:text-white transition-colors' : 'hover:text-[#181615] transition-colors'}
              >
                Home (Introduction)
              </Link>
            </li>
            <li>
              <a
                href="/#doors-hallway"
                className={isDark ? 'hover:text-white transition-colors' : 'hover:text-[#181615] transition-colors'}
              >
                The Hallway of 5 Doors
              </a>
            </li>
            <li>
              <a
                href="/#story-timeline"
                className={isDark ? 'hover:text-white transition-colors' : 'hover:text-[#181615] transition-colors'}
              >
                My Story &amp; Experience
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenContact}
                className={`transition-colors cursor-pointer ${
                  isDark ? 'hover:text-white' : 'hover:text-[#181615]'
                }`}
              >
                Start A Project Modal
              </button>
            </li>
            <li>
              <a
                href="https://kreviadigitalid.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors inline-flex items-center gap-1 font-semibold ${
                  isDark ? 'text-amber-200/90 hover:text-amber-200' : 'text-[#1D3254] hover:text-[#6B3A3F]'
                }`}
              >
                <span>Krevia Digital Platform</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Status & Live Local Time */}
        <div>
          <span
            className={`font-mono text-xs uppercase tracking-[0.18em] font-bold block mb-4 ${
              isDark ? 'text-amber-300' : 'text-[#6B3A3F]'
            }`}
          >
            Current Status
          </span>
          <div className="space-y-3 text-xs">
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark
                  ? 'bg-[#161821] border-[#262936]'
                  : 'bg-[#FAF8F5]/80 border-[#C8C0B5]'
              }`}
            >
              <div
                className={`flex items-center gap-2 font-bold mb-1 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open for freelance &amp; internships</span>
              </div>
              <p
                className={`text-[11px] leading-relaxed ${
                  isDark ? 'text-[#9E968C]' : 'text-[#5C554E]'
                }`}
              >
                Accepting new software &amp; digital operations engagements for 2026.
              </p>
            </div>

            <div
              className={`flex items-center gap-1.5 text-xs font-mono ${
                isDark ? 'text-[#ABA39A]' : 'text-[#544E49]'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-amber-300' : 'text-[#6B3A3F]'}`} />
              <span>Pekanbaru, Riau, Indonesia</span>
            </div>

            {timeString && (
              <div className={`text-[11px] font-mono ${isDark ? 'text-[#857D74]' : 'text-[#7A7067]'}`}>
                Local time: {timeString}
              </div>
            )}
          </div>
        </div>

        {/* Column 4: Social Channels & Direct Contact */}
        <div>
          <span
            className={`font-mono text-xs uppercase tracking-[0.18em] font-bold block mb-4 ${
              isDark ? 'text-amber-300' : 'text-[#6B3A3F]'
            }`}
          >
            Connect &amp; Social
          </span>
          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/KeijiChoco14"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 text-xs font-mono transition-colors ${
                isDark ? 'text-[#ABA39A] hover:text-white' : 'text-[#544E49] hover:text-[#181615]'
              }`}
            >
              <GithubIcon className={`w-4 h-4 ${isDark ? 'text-white' : 'text-[#181615]'}`} />
              <span>github.com/KeijiChoco14</span>
            </a>

            <a
              href="https://linkedin.com/in/albert-christiann"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 text-xs font-mono transition-colors ${
                isDark ? 'text-[#ABA39A] hover:text-white' : 'text-[#544E49] hover:text-[#181615]'
              }`}
            >
              <LinkedinIcon className={`w-4 h-4 ${isDark ? 'text-white' : 'text-[#181615]'}`} />
              <span>linkedin.com/in/albert-christiann</span>
            </a>

            <a
              href="https://instagram.com/__nybertx"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 text-xs font-mono transition-colors ${
                isDark ? 'text-[#ABA39A] hover:text-white' : 'text-[#544E49] hover:text-[#181615]'
              }`}
            >
              <InstagramIcon className={`w-4 h-4 ${isDark ? 'text-white' : 'text-[#181615]'}`} />
              <span>instagram.com/__nybertx</span>
            </a>

            <a
              href="mailto:albertchristian.dev@gmail.com"
              className={`inline-flex items-center gap-2.5 text-xs font-mono font-bold hover:underline pt-1 ${
                isDark ? 'text-amber-300' : 'text-[#6B3A3F]'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>albertchristian.dev@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM BAR */}
      <div
        className={`max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono ${
          isDark ? 'text-[#8C847B]' : 'text-[#5C554E]'
        }`}
      >
        <div>
          <span>© 2026 Albert Christian · Krevia Digital. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={scrollToTop}
            className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer font-semibold ${
              isDark ? 'hover:text-white' : 'hover:text-[#181615]'
            }`}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
