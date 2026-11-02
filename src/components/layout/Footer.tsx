'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, ArrowUp, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/icons/SocialIcons';
import { DOORS_DATA } from '@/data/doorsData';
import { useDoorTransition } from '../doors/DoorTransitionProvider';

interface FooterProps {
  onOpenContact: () => void;
}

export function Footer({ onOpenContact }: FooterProps) {
  const { triggerWalkThrough } = useDoorTransition();
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
    <footer id="contact-cta" className="relative w-full bg-[#D4CEC6] text-[#1A1818] pt-20 pb-12 px-6 border-t border-[#C0B9AF]">
      {/* BIG CTA BANNER */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-r from-[#1F2F55] via-[#1A2645] to-[#161F38] text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Subtle architectural door silhouette in background */}
          <div className="absolute right-0 top-0 bottom-0 w-80 opacity-10 pointer-events-none flex items-center justify-center">
            <div className="w-56 h-80 rounded-t-full border-4 border-white" />
          </div>

          <div className="relative z-10 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-300 font-bold block mb-2">
              START A CONVERSATION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Got a project? <br />
              <span className="text-amber-200">Let’s build it together.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
              Available for contract software development, full-stack web builds, native Android applications, and technical event operations.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenContact}
              className="w-full sm:w-auto py-4 px-8 rounded-xl bg-amber-300 hover:bg-amber-400 text-[#1F2F55] font-mono text-xs uppercase tracking-wider font-extrabold transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Inquire About A Project</span>
            </button>

            <a
              href="mailto:albertchristian.dev@gmail.com"
              className="w-full sm:w-auto py-4 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all text-center"
            >
              Direct Email
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER MULTI-COLUMN DIRECTORY */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-[#C0B9AF]">
        
        {/* Column 1: Work (The 5 Doors) */}
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#6B3A3F] font-bold block mb-4">
            The 5 Doors
          </span>
          <ul className="space-y-2.5">
            {DOORS_DATA.map((door) => (
              <li key={door.id}>
                <button
                  type="button"
                  onClick={() => triggerWalkThrough(door.route)}
                  className="text-xs font-mono text-[#544E49] hover:text-[#1F2F55] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#7C6C5E] font-bold">{door.doorNumber}</span>
                  <span>{door.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Navigate */}
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#6B3A3F] font-bold block mb-4">
            Navigate
          </span>
          <ul className="space-y-2.5 text-xs font-mono text-[#544E49]">
            <li>
              <Link href="/" className="hover:text-[#1F2F55] transition-colors">
                Home (Hallway of Doors)
              </Link>
            </li>
            <li>
              <a href="#doors-hallway" className="hover:text-[#1F2F55] transition-colors">
                Doors Carousel
              </a>
            </li>
            <li>
              <a href="#story-section" className="hover:text-[#1F2F55] transition-colors">
                My Story Timeline
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenContact}
                className="hover:text-[#1F2F55] transition-colors cursor-pointer"
              >
                Start A Project Modal
              </button>
            </li>
            <li>
              <a
                href="https://kreviadigitalid.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1F2F55] transition-colors inline-flex items-center gap-1"
              >
                <span>Krevia Digital Platform</span>
                <span className="text-[10px] text-[#6B3A3F]">↗</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Status & Live Local Time */}
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#6B3A3F] font-bold block mb-4">
            Current Status
          </span>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-white/60 border border-[#C5BDB2]">
              <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Open for freelance &amp; internships</span>
              </div>
              <p className="text-[11px] text-[#544E49] leading-tight">
                Accepting new client engagements for Q1 &amp; Q2 2026.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-[#544E49]">
              <MapPin className="w-3.5 h-3.5 text-[#6B3A3F]" />
              <span>Pekanbaru, Riau, Indonesia (Remote-friendly)</span>
            </div>

            {timeString && (
              <div className="text-[11px] font-mono text-[#7C6C5E]">
                Local time {timeString}
              </div>
            )}
          </div>
        </div>

        {/* Column 4: Social Channels & Direct Contact */}
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#6B3A3F] font-bold block mb-4">
            Connect &amp; Social
          </span>
          <div className="flex flex-col gap-2.5">
            <a
              href="https://github.com/KeijiChoco14"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#544E49] hover:text-[#1F2F55] transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-[#1A1818]" />
              <span>github.com/KeijiChoco14</span>
            </a>

            <a
              href="https://linkedin.com/in/albert-christiann"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#544E49] hover:text-[#1F2F55] transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-[#1A1818]" />
              <span>linkedin.com/in/albert-christiann</span>
            </a>

            <a
              href="https://instagram.com/__nybertx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#544E49] hover:text-[#1F2F55] transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-[#1A1818]" />
              <span>instagram.com/__nybertx</span>
            </a>

            <a
              href="mailto:albertchristian.dev@gmail.com"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#6B3A3F] font-bold hover:underline"
            >
              <Mail className="w-4 h-4" />
              <span>albertchristian.dev@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM BAR */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#544E49]">
        <div>
          <span>© 2026 Albert. Designed and built by Albert.</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="hover:text-[#1A1818] transition-colors">
            Privacy &amp; Credits
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-[#1A1818] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
