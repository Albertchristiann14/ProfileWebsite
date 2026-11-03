'use client';

import React, { useState, useEffect, useRef } from 'react';
import { STORY_TIMELINE } from '@/data/doorsData';
import { useTheme } from '@/components/providers/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

// Precomputed static radial ticks with fixed 2-decimal precision to prevent SSR / Client floating point hydration discrepancies
const RADIAL_TICKS = Array.from({ length: 24 }).map((_, i) => {
  const angle = (i * 360) / 24;
  const rad = (angle * Math.PI) / 180;
  return {
    x1: Number((200 + Math.cos(rad) * 175).toFixed(2)),
    y1: Number((200 + Math.sin(rad) * 175).toFixed(2)),
    x2: Number((200 + Math.cos(rad) * 185).toFixed(2)),
    y2: Number((200 + Math.sin(rad) * 185).toFixed(2)),
  };
});

export function StoryTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineHeightPx, setLineHeightPx] = useState(24);
  const [dotTopPx, setDotTopPx] = useState(24);
  const { isDark } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeItem = STORY_TIMELINE[activeIndex] || STORY_TIMELINE[0];

  const scrollToMilestone = (index: number) => {
    const el = itemRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - window.innerHeight * 0.32;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !railRef.current) return;

      const railRect = railRef.current.getBoundingClientRect();
      const viewportMid = window.innerHeight * 0.42;

      let closestIdx = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height * 0.35;
        const distance = Math.abs(itemCenter - viewportMid);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);

      const totalRailHeight = railRect.height;
      if (totalRailHeight <= 0) return;

      const currentScrollOnRail = viewportMid - railRect.top;
      const progress = Math.min(Math.max(currentScrollOnRail / totalRailHeight, 0), 1);

      const activeEl = itemRefs.current[closestIdx];
      let nextDotTop = 24;
      if (activeEl && railRef.current) {
        const itemRect = activeEl.getBoundingClientRect();
        const relativeTop = Math.max(itemRect.top - railRect.top + 28, 12);
        nextDotTop = Math.min(relativeTop, totalRailHeight - 16);
        setDotTopPx(nextDotTop);
      }

      setLineHeightPx(Math.max(nextDotTop, progress * totalRailHeight));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      id="story-timeline"
      ref={containerRef}
      aria-label="Story Section: Let's go back in time"
      className={`relative w-full py-24 sm:py-32 px-6 border-t overflow-hidden transition-colors duration-700 ${
        isDark ? 'bg-[#111217] border-[#232530]' : 'bg-[#FAF8F5] border-[#DFD8CE]'
      }`}
    >
      {/* Ambient background plaster gradient */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isDark ? 'opacity-25' : 'opacity-100'
        }`}
        style={{
          background: isDark
            ? 'radial-gradient(circle at 30% 30%, rgba(255, 220, 145, 0.06) 0%, transparent 65%)'
            : 'radial-gradient(circle at 30% 30%, rgba(235, 228, 218, 0.7) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
        
        {/* LEFT COLUMN (STICKY PINNED) */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 relative">
          
          {/* Subtle Radar / Astronomical Clock SVG in background */}
          <div className="absolute -top-10 -left-10 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none opacity-35 select-none">
            <svg
              viewBox="0 0 400 400"
              className={`w-full h-full transition-colors duration-500 ${
                isDark ? 'stroke-[#3A3C48]' : 'stroke-[#DDD4C8]'
              }`}
            >
              <circle cx="200" cy="200" r="60" fill="none" strokeWidth="1" />
              <circle cx="200" cy="200" r="110" fill="none" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="200" cy="200" r="150" fill="none" strokeWidth="1" />
              <circle cx="200" cy="200" r="185" fill="none" strokeWidth="0.75" strokeDasharray="6 6" />

              <line x1="200" y1="15" x2="200" y2="385" strokeWidth="0.5" strokeOpacity="0.6" />
              <line x1="15" y1="200" x2="385" y2="200" strokeWidth="0.5" strokeOpacity="0.6" />
              <line x1="70" y1="70" x2="330" y2="330" strokeWidth="0.5" strokeOpacity="0.4" />
              <line x1="330" y1="70" x2="70" y2="330" strokeWidth="0.5" strokeOpacity="0.4" />

              {RADIAL_TICKS.map((tick, i) => (
                <line
                  key={i}
                  x1={tick.x1}
                  y1={tick.y1}
                  x2={tick.x2}
                  y2={tick.y2}
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
              ))}
            </svg>
          </div>

          {/* Sticky Header Content */}
          <div className="relative z-10">
            {/* Pill Eyebrow */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-[0.18em] mb-4 ${
                isDark
                  ? 'bg-white/5 border-white/10 text-amber-300'
                  : 'bg-[#F0ECE6] border-[#DDD5CA] text-[#6B3A3F]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-amber-300' : 'bg-[#6B3A3F]'}`} />
              <span className="font-semibold">My Story &amp; Experience</span>
            </div>

            {/* Headline */}
            <h2
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight transition-colors duration-500 ${
                isDark ? 'text-[#FAF7F2]' : 'text-[#181615]'
              }`}
            >
              Let’s go back in time.
            </h2>

            {/* HUGE DYNAMIC YEAR (e.g. 2026, 2025, 2022) */}
            <div className="mt-6 mb-2 overflow-hidden h-24 sm:h-32 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.year}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -26 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter tabular-nums transition-colors duration-500 ${
                    isDark ? 'text-[#FAF7F2]' : 'text-[#181615]'
                  }`}
                >
                  {activeItem.year}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sub-label under year: Date range & Active role */}
            <div
              className={`text-xs font-mono uppercase tracking-[0.18em] font-semibold mb-5 transition-colors duration-500 ${
                isDark ? 'text-amber-200/90' : 'text-[#6B3A3F]'
              }`}
            >
              {activeItem.dateRange} · {activeItem.company}
            </div>

            {/* Interactive Milestone Stepper Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <span
                className={`font-mono text-xs font-bold tracking-wider mr-2 tabular-nums ${
                  isDark ? 'text-[#FAF7F2]' : 'text-[#181615]'
                }`}
              >
                {activeItem.number} <span className="text-[#8C8377] font-normal">/ 05</span>
              </span>

              <div className="flex items-center gap-1.5">
                {STORY_TIMELINE.map((step, idx) => (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => scrollToMilestone(idx)}
                    aria-label={`Jump to milestone ${step.number}: ${step.role}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeIndex
                        ? isDark
                          ? 'w-8 bg-amber-300'
                          : 'w-8 bg-[#6B3A3F]'
                        : isDark
                        ? 'w-2.5 bg-white/15 hover:bg-white/30'
                        : 'w-2.5 bg-[#D8CFC4] hover:bg-[#B5A99B]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (TIMELINE TRACK + MILESTONE CARDS) */}
        <div className="lg:col-span-7 relative flex items-start pl-2 sm:pl-4">
          
          {/* THE VERTICAL RAIL & TRAVELING SCROLL LINE */}
          <div
            ref={railRef}
            className={`absolute left-2 sm:left-4 top-4 bottom-8 w-[2px] transition-colors duration-500 ${
              isDark ? 'bg-[#282B36]' : 'bg-[#E2DBD1]'
            }`}
          >
            {/* 1. Traveling dynamic line that grows downward as you scroll */}
            <div
              className={`absolute top-0 left-0 w-full transition-all duration-150 ease-out ${
                isDark ? 'bg-amber-300' : 'bg-[#6B3A3F]'
              }`}
              style={{
                height: `${lineHeightPx}px`,
              }}
            />

            {/* 2. Traveling Green Indicator Dot */}
            <div
              className="absolute -left-[5px] w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 transition-all duration-200 ease-out shadow-xs"
              style={{
                top: `${dotTopPx}px`,
              }}
            />
          </div>

          {/* MILESTONES LIST */}
          <div className="w-full pl-7 sm:pl-11 space-y-8 sm:space-y-10 py-2">
            {STORY_TIMELINE.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.number}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  onClick={() => scrollToMilestone(index)}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-[#191B24] border-amber-300/35 shadow-[0_18px_40px_rgba(0,0,0,0.45)] opacity-100'
                        : 'bg-white border-[#C8BEB2] shadow-[0_16px_38px_rgba(24,22,21,0.07)] opacity-100'
                      : isDark
                      ? 'bg-[#15171E]/60 border-[#242732] opacity-70 hover:opacity-95'
                      : 'bg-[#F3EFE9]/70 border-[#E5DEC3]/80 opacity-75 hover:opacity-100 hover:bg-white/75'
                  }`}
                >
                  {/* Top Metadata Row: Date Range & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div
                      className={`text-[11px] font-mono uppercase tracking-[0.18em] font-bold ${
                        isActive
                          ? isDark
                            ? 'text-amber-300'
                            : 'text-[#6B3A3F]'
                          : isDark
                          ? 'text-[#9A9288]'
                          : 'text-[#7A7167]'
                      }`}
                    >
                      {item.dateRange}
                    </div>

                    {item.badge && (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                          isDark
                            ? 'bg-white/5 border-white/10 text-[#C9C2B8]'
                            : 'bg-[#FAF8F5] border-[#DED7CE] text-[#5C554E]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Role Title */}
                  <h3
                    className={`text-xl sm:text-2xl md:text-[26px] font-extrabold tracking-tight leading-snug transition-colors duration-300 ${
                      isDark ? 'text-[#FAF7F2]' : 'text-[#181615]'
                    }`}
                  >
                    {item.role}
                  </h3>

                  {/* Subtitle & Company */}
                  <p
                    className={`mt-1 text-xs sm:text-sm font-medium leading-relaxed transition-colors duration-300 ${
                      isDark ? 'text-[#ACA49A]' : 'text-[#5C554E]'
                    }`}
                  >
                    {item.subtitle}
                    {item.company && (
                      <span
                        className={`font-mono text-xs ml-2 font-semibold ${
                          isDark ? 'text-amber-200/80' : 'text-[#1D3254]'
                        }`}
                      >
                        · {item.company}
                      </span>
                    )}
                  </p>

                  {/* Bullets List */}
                  <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 space-y-2.5">
                    {item.bullets.map((bullet, bIdx) => (
                      <div
                        key={bIdx}
                        className={`flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
                          isDark ? 'text-[#D0C9C0]' : 'text-[#443E39]'
                        }`}
                      >
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                            isActive
                              ? isDark
                                ? 'bg-amber-300'
                                : 'bg-[#6B3A3F]'
                              : 'bg-[#8C8377]'
                          }`}
                        />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
