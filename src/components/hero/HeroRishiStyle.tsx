'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { FlipCalendar } from './FlipCalendar';
import { HolographicCardModal } from '../cards/HolographicCardModal';
import { useTheme } from '../providers/ThemeProvider';

interface HeroProps {
  onOpenContact: () => void;
}

export function HeroRishiStyle({ onOpenContact }: HeroProps) {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const { isDark } = useTheme();

  const scrollToDoors = () => {
    const doorsElement = document.getElementById('doors-hallway');
    if (doorsElement) {
      doorsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      aria-label="Introduction: Albert Christian Portfolio"
      className={`relative w-full min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-0 px-6 sm:px-10 lg:px-16 overflow-hidden select-none transition-colors duration-700 ${
        isDark ? 'bg-[#14151B]' : 'bg-[#EEEAE6]'
      }`}
      style={{
        background: isDark
          ? 'radial-gradient(120% 90% at 62% 30%, #1A1C24 0%, #14151A 48%, #0E0F13 100%)'
          : 'radial-gradient(120% 90% at 62% 30%, #EEEAE6 0%, #E8E4E0 48%, #D8CDCA 100%)',
      }}
    >
      {/* Soft Vignette Overlay */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
        isDark ? 'bg-gradient-to-b from-black/40 via-transparent to-black/60' : 'bg-gradient-to-b from-[#FAF8F5]/40 via-transparent to-[#D8CDCA]/40'
      }`} />

      {/* MAIN HERO GRID: 2 COLUMNS (Left content, Right portrait) */}
      <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 pt-4 pb-6">
        
        {/* LEFT COLUMN: Greeting, Headline, Flip Desk Calendar, CTA Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center text-left">
          
          {/* Eyebrow Label */}
          <div className={`inline-flex items-center gap-2 text-xs sm:text-sm font-medium mb-3 transition-colors duration-500 ${
            isDark ? 'text-[#A89F97]' : 'text-[#6E6464]'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-amber-300' : 'bg-[#1A1818]/60'}`} />
            <span>Founder, Krevia Digital</span>
          </div>

          {/* Large Headline */}
          <h1 className={`text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.98] transition-colors duration-500 ${
            isDark ? 'text-[#FAF7F2]' : 'text-[#1A1818]'
          }`}>
            Hi, I’m Albert. <br />
            <span className={`font-semibold text-3xl sm:text-5xl md:text-6xl block mt-1 transition-colors duration-500 ${
              isDark ? 'text-[#8E867E]' : 'text-[#857878]'
            }`}>
              I am a
            </span>
          </h1>

          {/* 3D FLIP DESK CALENDAR WIDGET */}
          <div className="mt-2 mb-6">
            <FlipCalendar />
          </div>

          {/* CALL TO ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Start a project black pill with circular arrow badge */}
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-[#1A1818] hover:bg-[#2C2828] text-[#E8E4E0] text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-xl active:scale-95 cursor-pointer group"
            >
              <span>Start a project</span>
              <div className="w-8 h-8 rounded-full bg-[#E8E4E0] text-[#1A1818] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </button>

            {/* See my work light pill */}
            <button
              type="button"
              onClick={scrollToDoors}
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#DED8D4]/70 hover:bg-[#DED8D4] border border-[#D5CDCA] text-[#1A1818] text-sm font-semibold transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
            >
              See my work
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Albert Portrait with "My ability card" pill */}
        <div className="lg:col-span-5 relative flex items-end justify-center lg:justify-end h-[420px] sm:h-[500px] lg:h-[580px] pointer-events-auto">
          
          {/* Portrait Container */}
          <div className="relative w-[300px] sm:w-[380px] lg:w-[440px] h-full flex items-end justify-center">
            
            {/* Subtle background glow behind the portrait */}
            <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Portrait Image (Cutout style in black suit) */}
            <div className="relative w-full h-[95%] rounded-t-[140px] overflow-hidden grayscale contrast-110 brightness-95 shadow-2xl border-b-0 border border-white/40">
              <Image
                src="/character/albert_portrait.jpg"
                alt="Albert Christian — Founder & Engineer"
                fill
                priority
                sizes="(max-width: 768px) 340px, 440px"
                className="object-cover object-top"
              />
              {/* Bottom fade into the baseline */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#D8CDCA] via-[#D8CDCA]/60 to-transparent" />
            </div>

            {/* FLOATING "MY ABILITY CARD" PILL BUTTON */}
            <button
              type="button"
              onClick={() => setIsCardModalOpen(true)}
              aria-label="Open 3D Ability Card"
              className="absolute left-6 sm:left-10 bottom-24 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1818]/80 hover:bg-[#1A1818] text-[#F3EEEC] text-xs font-mono font-semibold tracking-wide border border-white/25 shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-1 active:scale-95 cursor-pointer group"
            >
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
              <span>My ability card</span>
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM HAIRLINE STATUS STRIP */}
      <div className={`relative z-20 w-full border-t py-4 text-xs font-mono uppercase tracking-widest transition-colors duration-500 ${
        isDark ? 'border-[#282A34] text-[#8C847C]' : 'border-[#D5CDCA] text-[#7C6F6F]'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>AVAILABLE FOR WORK</div>
          <div className={isDark ? 'text-amber-200 font-bold' : 'text-[#544E49] font-bold'}>
            BASED IN PEKANBARU, REMOTE-FRIENDLY
          </div>
          <div
            onClick={scrollToDoors}
            className={`inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
              isDark ? 'hover:text-white' : 'hover:text-[#1A1818]'
            }`}
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Holographic 3D Card Modal */}
      <HolographicCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />
    </section>
  );
}
