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
  const [lineHeightPercent, setLineHeightPercent] = useState(0); // 0 to 100
  const [dotTopPx, setDotTopPx] = useState(0);
  const { isDark } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeItem = STORY_TIMELINE[activeIndex] || STORY_TIMELINE[0];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !railRef.current) return;

      const railRect = railRef.current.getBoundingClientRect();
      const viewportMid = window.innerHeight * 0.45; // Focus line in viewport

      // Calculate which milestone is closest to viewportMid
      let closestIdx = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height * 0.3;
        const distance = Math.abs(itemCenter - viewportMid);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);

      // Calculate progress of the line moving down the rail
      // Start when rail top reaches viewportMid, end when rail bottom reaches viewportMid
      const totalRailHeight = railRect.height;
      if (totalRailHeight <= 0) return;

      const currentScrollOnRail = viewportMid - railRect.top;
      const progress = Math.min(Math.max(currentScrollOnRail / totalRailHeight, 0), 1);

      setLineHeightPercent(progress * 100);

      // Calculate exact pixel position for the green dot aligned with active milestone
      const activeEl = itemRefs.current[closestIdx];
      if (activeEl && railRef.current) {
        const itemRect = activeEl.getBoundingClientRect();
        // Dot aligned with the top of the active milestone heading
        const relativeTop = Math.max(itemRect.top - railRect.top + 6, 0);
        setDotTopPx(Math.min(relativeTop, totalRailHeight - 16));
      }
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
      className={`relative w-full py-28 px-6 border-t overflow-hidden transition-colors duration-700 ${
        isDark ? 'bg-[#131418] border-[#25272F]' : 'bg-[#FAF7F2] border-[#E8E2D9]'
      }`}
    >
      {/* Ambient background plaster gradient */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
        isDark ? 'opacity-20' : 'opacity-100'
      }`} style={{
        background: isDark
          ? 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 70%)'
          : 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.7) 0%, transparent 70%)'
      }} />

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        {/* LEFT COLUMN (STICKY PINNED - Screenshot 3) */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 relative">
          
          {/* Subtle Radar / Astronomical Clock SVG in background */}
          <div className="absolute -top-12 -left-12 w-96 h-96 pointer-events-none opacity-40 select-none">
            <svg viewBox="0 0 400 400" className={`w-full h-full transition-colors duration-500 ${isDark ? 'stroke-[#4A4742]' : 'stroke-[#DDD5CA]'}`}>
              {/* Concentric rings */}
              <circle cx="200" cy="200" r="60" fill="none" strokeWidth="1" />
              <circle cx="200" cy="200" r="110" fill="none" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="200" cy="200" r="150" fill="none" strokeWidth="1" />
              <circle cx="200" cy="200" r="185" fill="none" strokeWidth="0.75" strokeDasharray="6 6" />

              {/* Radial spoke lines */}
              <line x1="200" y1="15" x2="200" y2="385" strokeWidth="0.5" strokeOpacity="0.6" />
              <line x1="15" y1="200" x2="385" y2="200" strokeWidth="0.5" strokeOpacity="0.6" />
              <line x1="70" y1="70" x2="330" y2="330" strokeWidth="0.5" strokeOpacity="0.4" />
              <line x1="330" y1="70" x2="70" y2="330" strokeWidth="0.5" strokeOpacity="0.4" />

              {/* Minute ticks on outer perimeter */}
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
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#7A7167] mb-3">
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-amber-300' : 'bg-[#1A1818]'}`} />
              <span>My story</span>
            </div>

            {/* Headline */}
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight transition-colors duration-500 ${
              isDark ? 'text-[#FAF7F2]' : 'text-[#1A1818]'
            }`}>
              Let’s go back in time.
            </h2>

            {/* HUGE DYNAMIC YEAR (Screenshot 3: e.g. 2026, 2025, 2022) */}
            <div className="mt-8 mb-2 overflow-hidden h-28 sm:h-32 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`text-7xl sm:text-9xl font-extrabold tracking-tighter transition-colors duration-500 ${
                    isDark ? 'text-[#FAF7F2]' : 'text-[#1A1818]'
                  }`}
                >
                  {activeItem.year}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sub-label under year: Date range (Screenshot 3) */}
            <div className={`text-xs font-mono uppercase tracking-[0.2em] font-semibold mb-6 transition-colors duration-500 ${
              isDark ? 'text-[#A8A196]' : 'text-[#7A7167]'
            }`}>
              {activeItem.dateRange}
            </div>

            {/* Progress Counter & Horizontal Line Track: 01 / 05 (Screenshot 3) */}
            <div className="flex items-center gap-3">
              <span className={`font-mono text-xs font-bold tracking-wider ${isDark ? 'text-[#FAF7F2]' : 'text-[#1A1818]'}`}>
                {activeItem.number} <span className="text-[#8C8377] font-normal">/ 05</span>
              </span>

              {/* Horizontal Progress Track */}
              <div className={`w-24 h-0.5 relative rounded-full overflow-hidden ${isDark ? 'bg-[#3A3833]' : 'bg-[#DDD6CC]'}`}>
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-300 ${isDark ? 'bg-amber-300' : 'bg-[#1A1818]'}`}
                  style={{
                    width: `${((activeIndex + 1) / STORY_TIMELINE.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (TIMELINE TRACK + MILESTONES - Screenshot 3) */}
        <div className="lg:col-span-7 relative flex items-start pl-2 sm:pl-4">
          
          {/* THE VERTICAL RAIL & TRAVELING SCROLL LINE ("garisnya ikut turun ke bawah") */}
          <div
            ref={railRef}
            className={`absolute left-2 sm:left-4 top-2 bottom-8 w-[2px] transition-colors duration-500 ${
              isDark ? 'bg-[#2E303A]' : 'bg-[#E2DCD3]'
            }`}
          >
            {/* 1. Traveling dynamic line that grows downward as you scroll */}
            <div
              className={`absolute top-0 left-0 w-full transition-all duration-150 ease-out ${
                isDark ? 'bg-amber-300' : 'bg-[#1A1818]'
              }`}
              style={{
                height: `${Math.max(dotTopPx + 8, lineHeightPercent > 0 ? (lineHeightPercent / 100) * (railRef.current?.clientHeight || 0) : 0)}px`,
              }}
            />

            {/* 2. Traveling Green Indicator Dot (Screenshot 3: green dot on rail) */}
            <div
              className="absolute -left-[5px] w-3 h-3 rounded-full bg-[#529858] ring-4 ring-[#529858]/20 transition-all duration-200 ease-out shadow-xs"
              style={{
                top: `${dotTopPx}px`,
              }}
            />
          </div>

          {/* MILESTONES LIST */}
          <div className="w-full pl-8 sm:pl-12 space-y-24 py-4">
            {STORY_TIMELINE.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.number}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className={`transition-all duration-500 ease-out ${
                    isActive
                      ? 'opacity-100 scale-100'
                      : 'opacity-40 hover:opacity-75 scale-[0.99]'
                  }`}
                >
                  {/* Date Range / Timestamp (Screenshot 3: e.g. OCT 2026 — NOW) */}
                  <div className={`text-[11px] font-mono uppercase tracking-[0.2em] font-semibold mb-2 ${
                    isDark ? 'text-[#A8A196]' : 'text-[#7A7167]'
                  }`}>
                    {item.dateRange}
                  </div>

                  {/* Role Title (Screenshot 3: e.g. Independent freelancer) */}
                  <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors duration-500 ${
                    isDark ? 'text-[#FAF7F2]' : 'text-[#1A1818]'
                  }`}>
                    {item.role}
                  </h3>

                  {/* Subtitle / Company (Screenshot 3: e.g. Working for myself, remote-first) */}
                  <p className={`mt-1 text-sm sm:text-base font-normal leading-relaxed transition-colors duration-500 ${
                    isDark ? 'text-[#B8AEA3]' : 'text-[#6E645A]'
                  }`}>
                    {item.subtitle}
                    {item.company && (
                      <span className="text-[#8C8377] font-mono text-xs ml-2">
                        · {item.company}
                      </span>
                    )}
                  </p>

                  {/* Bullets List (Screenshot 3) */}
                  <div className="mt-4 space-y-2 max-w-xl">
                    {item.bullets.map((bullet, bIdx) => (
                      <div
                        key={bIdx}
                        className={`flex items-start gap-2 text-xs sm:text-sm leading-relaxed transition-colors duration-500 ${
                          isDark ? 'text-[#C9C3BA]' : 'text-[#4A443E]'
                        }`}
                      >
                        <span className="text-[#8C8377] font-bold select-none">—</span>
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
