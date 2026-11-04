'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react';
import { FlipCalendar } from './FlipCalendar';
import { HolographicCardModal } from '../cards/HolographicCardModal';
import { useTheme } from '../providers/ThemeProvider';
import { CloudShader } from '@/components/ui/cloud-shader';

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
        isDark ? 'bg-[#121318]' : 'bg-[#8cbfe8]'
      }`}
    >
      {/* ACETERNITY WEBGL CLOUD SHADER BACKGROUND */}
      <CloudShader
        speed={1}
        count={6}
        cloudColor={isDark ? '#2E354B' : '#fbf8f2'}
        skyTopColor={isDark ? '#0B0E17' : '#3876ba'}
        skyBottomColor={isDark ? '#1A2238' : '#8cbfe8'}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Soft Atmospheric Readability Veil + Bottom Horizon Blend into Hallway */}
      <div
        className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-700 ${
          isDark
            ? 'bg-gradient-to-r from-[#0D0F17]/65 via-[#0D0F17]/25 to-transparent'
            : 'bg-gradient-to-r from-[#FAF8F5]/55 via-[#FAF8F5]/20 to-transparent'
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-40 z-[1] pointer-events-none bg-gradient-to-t transition-colors duration-700 ${
          isDark
            ? 'from-[#14161D] via-[#14161D]/75 to-transparent'
            : 'from-[#E6E1DA] via-[#E6E1DA]/70 to-transparent'
        }`}
      />

      {/* MAIN HERO GRID: 2 COLUMNS (Left content, Right portrait) */}
      <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10 pt-4 pb-8">
        
        {/* LEFT COLUMN: Greeting, Headline, Flip Desk Calendar, Bio & CTA Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center text-left">
          
          {/* Eyebrow Pill */}
          <div
            className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-md text-xs font-mono tracking-wide mb-5 transition-colors duration-500 ${
              isDark
                ? 'bg-[#14161E]/75 border-white/15 text-[#E5DEC3] shadow-sm'
                : 'bg-white/80 border-white/90 text-[#181615] shadow-sm'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-amber-300' : 'bg-[#6B3A3F]'}`} />
            <span className="font-semibold">Founder, Krevia Digital</span>
            <span className="opacity-40">·</span>
            <span className="opacity-80">Creative Engineer</span>
          </div>

          {/* Large Headline */}
          <h1
            className={`text-4xl sm:text-6xl md:text-[68px] font-extrabold tracking-[-0.03em] leading-[1.02] transition-colors duration-500 ${
              isDark
                ? 'text-[#FAF7F2] drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]'
                : 'text-[#181615] drop-shadow-[0_2px_18px_rgba(255,255,255,0.65)]'
            }`}
          >
            Hi, I’m Albert.{' '}
            <span
              className={`font-semibold text-3xl sm:text-5xl md:text-[54px] block mt-1.5 transition-colors duration-500 ${
                isDark ? 'text-[#C4BCB3]' : 'text-[#2C2825]'
              }`}
            >
              I am a
            </span>
          </h1>

          {/* 3D FLIP DESK CALENDAR WIDGET */}
          <div className="mt-2 mb-4">
            <FlipCalendar />
          </div>

          {/* Concise Value Proposition */}
          <p
            className={`max-w-xl text-sm sm:text-base font-medium leading-relaxed mb-7 transition-colors duration-500 ${
              isDark
                ? 'text-[#D8D0C6] drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]'
                : 'text-[#1F1C1A] drop-shadow-[0_1px_10px_rgba(255,255,255,0.75)]'
            }`}
          >
            Engineering performant web platforms, native Kotlin Android apps, ERP systems, and live event technology with tactile precision.
          </p>

          {/* CALL TO ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-3.5">
            {/* Primary Pill CTA */}
            <button
              type="button"
              onClick={onOpenContact}
              className={`inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer group ${
                isDark
                  ? 'bg-amber-300 hover:bg-amber-200 text-[#14151B]'
                  : 'bg-[#181615] hover:bg-[#2C2826] text-[#FAF8F5]'
              }`}
            >
              <span>Start a project</span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5 ${
                  isDark ? 'bg-[#14151B] text-amber-300' : 'bg-[#FAF8F5] text-[#181615]'
                }`}
              >
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </button>

            {/* Secondary Pill CTA */}
            <button
              type="button"
              onClick={scrollToDoors}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border backdrop-blur-md text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 cursor-pointer ${
                isDark
                  ? 'bg-[#14161E]/75 hover:bg-[#1E212D] border-white/20 text-[#FAF7F2]'
                  : 'bg-white/85 hover:bg-white border-white text-[#181615]'
              }`}
            >
              <span>Explore the 5 Doors</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Albert Architectural Arch Portrait with "My ability card" pill */}
        <div className="lg:col-span-5 relative flex items-end justify-center lg:justify-end h-[400px] sm:h-[470px] lg:h-[540px] pointer-events-auto">
          
          {/* Portrait Container */}
          <div className="relative w-[290px] sm:w-[360px] lg:w-[410px] h-full flex items-end justify-center">
            
            {/* Subtle warm background glow behind the portrait */}
            <div
              className={`absolute -inset-6 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
                isDark
                  ? 'bg-radial from-amber-300/15 via-transparent to-transparent'
                  : 'bg-radial from-white/75 via-transparent to-transparent'
              }`}
            />

            {/* Sculpted Arch Frame echoing the Hallway Doors */}
            <div
              className={`relative w-full h-[96%] rounded-t-[180px] p-2 transition-colors duration-500 shadow-2xl ${
                isDark
                  ? 'bg-gradient-to-b from-[#2A2D3A] via-[#1E202A] to-transparent border border-white/15'
                  : 'bg-gradient-to-b from-[#FAF8F5] via-[#EAE4DC] to-transparent border border-white/90'
              }`}
            >
              <div className="relative w-full h-full rounded-t-[172px] overflow-hidden grayscale contrast-[1.08] brightness-[0.97]">
                <Image
                  src="/character/albert_portrait.jpg"
                  alt="Albert Christian — Founder & Engineer"
                  fill
                  priority
                  sizes="(max-width: 768px) 340px, 420px"
                  className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                />
                {/* Theme-aware bottom fade into the baseline */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t transition-colors duration-700 ${
                    isDark
                      ? 'from-[#14161D] via-[#14161D]/65 to-transparent'
                      : 'from-[#E6E1DA] via-[#E6E1DA]/60 to-transparent'
                  }`}
                />
              </div>
            </div>

            {/* FLOATING "MY ABILITY CARD" PILL BUTTON */}
            <button
              type="button"
              onClick={() => setIsCardModalOpen(true)}
              aria-label="Open 3D Ability Card"
              className="absolute -left-2 sm:left-4 bottom-16 z-20 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#181615]/90 hover:bg-[#181615] text-[#FAF8F5] text-xs font-mono font-semibold tracking-wide border border-white/20 shadow-[0_12px_30px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 active:scale-95 cursor-pointer group"
            >
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
              <span>My ability card</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 transition-transform group-hover:rotate-12" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM HAIRLINE STATUS STRIP */}
      <div
        className={`relative z-20 w-full border-t py-4 text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] transition-colors duration-500 ${
          isDark ? 'border-white/10 text-[#ABA39A]' : 'border-black/10 text-[#4A433D]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">AVAILABLE FOR SELECT PROJECTS</span>
          </div>
          <div className={isDark ? 'text-amber-200 font-bold' : 'text-[#181615] font-bold'}>
            BASED IN PEKANBARU · REMOTE-FRIENDLY
          </div>
          <button
            type="button"
            onClick={scrollToDoors}
            className={`inline-flex items-center gap-1.5 cursor-pointer font-semibold transition-colors ${
              isDark ? 'hover:text-white' : 'hover:text-[#181615]'
            }`}
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
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
