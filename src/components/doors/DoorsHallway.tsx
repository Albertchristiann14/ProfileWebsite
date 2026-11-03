'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DOORS_DATA } from '@/data/doorsData';
import { Door } from './Door';
import { useDoorTransition } from './DoorTransitionProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function DoorsHallway() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileSelectedIndex, setMobileSelectedIndex] = useState<number>(0);
  const { isDark } = useTheme();
  const { triggerWalkThrough } = useDoorTransition();

  // All 5 specialty doors
  const hallwayDoors = DOORS_DATA;
  const activeDoor = hoveredIndex !== null ? hallwayDoors[hoveredIndex] : null;
  const mobileActiveDoor = hallwayDoors[mobileSelectedIndex] || hallwayDoors[0];

  // Keyboard navigation across doors (Left / Right arrow keys)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setHoveredIndex((prev) => {
          const next = prev === null ? 0 : prev < hallwayDoors.length - 1 ? prev + 1 : 0;
          setMobileSelectedIndex(next);
          return next;
        });
      } else if (e.key === 'ArrowLeft') {
        setHoveredIndex((prev) => {
          const next =
            prev === null ? hallwayDoors.length - 1 : prev > 0 ? prev - 1 : hallwayDoors.length - 1;
          setMobileSelectedIndex(next);
          return next;
        });
      } else if (e.key === 'Escape') {
        setHoveredIndex(null);
      }
    },
    [hallwayDoors.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section
      id="doors-hallway"
      aria-label="Hallway of Doors: Magic happens behind the doors"
      className={`relative w-full overflow-hidden transition-colors duration-700 select-none pt-20 sm:pt-24 pb-0 ${
        isDark ? 'bg-[#14161D]' : 'bg-[#E6E1DA]'
      }`}
    >
      {/* Plaster Wall Lighting Gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 90% 60% at 50% 28%, rgba(255, 210, 125, 0.08) 0%, rgba(20, 22, 29, 0) 75%), linear-gradient(180deg, rgba(26,28,36,0.5) 0%, rgba(16,18,24,0.95) 100%)'
            : 'radial-gradient(ellipse 90% 60% at 50% 28%, rgba(255, 250, 240, 0.65) 0%, rgba(230, 225, 218, 0) 75%), linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(217,211,203,0.88) 100%)',
        }}
      />

      {/* SECTION HEADER & QUICK-SELECT PILLS */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-10 sm:mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono uppercase tracking-[0.18em] mb-3 transition-colors duration-500 border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 text-[#6B3A3F] dark:text-amber-300 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Hallway · 5 Specialties</span>
        </div>

        <h2
          className={`text-3xl sm:text-5xl md:text-[54px] font-extrabold tracking-tight leading-tight transition-colors duration-500 ${
            isDark ? 'text-[#FAF7F2]' : 'text-[#181615]'
          }`}
        >
          Magic happens behind the doors
        </h2>

        <p
          className={`mt-2.5 text-sm sm:text-base max-w-xl mx-auto transition-colors duration-500 ${
            isDark ? 'text-[#9E968C]' : 'text-[#5C554E]'
          }`}
        >
          Hover a door to peek inside, or click any doorway to step into the full project room.
        </p>

        {/* Quick-Select Specialty Pill Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {hallwayDoors.map((door, idx) => {
            const isSelected = hoveredIndex === idx || (hoveredIndex === null && mobileSelectedIndex === idx);
            return (
              <button
                key={door.id}
                type="button"
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  setMobileSelectedIndex(idx);
                }}
                onClick={() => {
                  setMobileSelectedIndex(idx);
                  setHoveredIndex(idx);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                  hoveredIndex === idx
                    ? isDark
                      ? 'bg-amber-300 text-[#14151B] border-amber-300 font-bold shadow-md'
                      : 'bg-[#181615] text-[#FAF8F5] border-[#181615] font-bold shadow-md'
                    : isSelected
                    ? isDark
                      ? 'bg-white/12 text-white border-white/25 font-semibold'
                      : 'bg-white/90 text-[#181615] border-[#BDB4AA] font-semibold shadow-2xs'
                    : isDark
                    ? 'bg-white/5 hover:bg-white/10 text-[#A8A096] border-white/10'
                    : 'bg-white/55 hover:bg-white/85 text-[#5C554E] border-[#D5CEC6]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: door.themeColor }}
                />
                <span className="opacity-65">{door.doorNumber}</span>
                <span>{door.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN HALLWAY STAGE */}
      <div
        onMouseLeave={() => setHoveredIndex(null)}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10 flex items-end justify-center"
      >
        {/* Horizontal Container for the 5 Doors (Swipeable on mobile, centered row on desktop) */}
        <div className="relative w-full flex items-end justify-start lg:justify-center gap-3.5 sm:gap-4 xl:gap-5 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory pt-6 pb-0 px-2">
          {hallwayDoors.map((door, index) => {
            const isActive = hoveredIndex === index;
            const isGhosted = hoveredIndex !== null && !isActive;

            return (
              <div key={door.id} className="relative shrink-0">
                <Door
                  door={door}
                  isActive={isActive}
                  isGhosted={isGhosted}
                  onHover={() => {
                    setHoveredIndex(index);
                    setMobileSelectedIndex(index);
                  }}
                  onLeave={() => {}}
                  onSelect={() => {
                    setMobileSelectedIndex(index);
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* DESKTOP ACTIVE DOOR INFO OVERLAY ON WALL */}
        <AnimatePresence>
          {activeDoor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`hidden lg:block absolute top-1/2 -translate-y-1/2 z-30 max-w-md w-full px-4 transition-all duration-300 pointer-events-auto ${
                // Position opposite to hovered door to guarantee zero collision with the active door
                (hoveredIndex ?? 0) <= 2
                  ? 'right-6 xl:right-12 text-left'
                  : 'left-6 xl:left-12 text-left'
              }`}
            >
              <motion.div
                key={activeDoor.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className={`p-6 sm:p-7 rounded-3xl backdrop-blur-xl border shadow-[0_24px_60px_rgba(0,0,0,0.28)] ${
                  isDark
                    ? 'bg-[#181A22]/90 border-white/15 text-[#FAF7F2]'
                    : 'bg-[#FAF8F5]/92 border-white/80 text-[#181615]'
                }`}
              >
                {/* Top badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#6B3A3F]/15 text-[#6B3A3F] dark:bg-amber-300/15 dark:text-amber-300">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activeDoor.themeColor }}
                    />
                    Door {activeDoor.doorNumber} of 05
                  </span>
                  <span className="text-[11px] font-mono opacity-60">Click door to enter</span>
                </div>

                {/* Category Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {activeDoor.title}
                </h3>

                {/* Monospace Subtitle */}
                <p
                  className={`mt-1 text-xs font-mono uppercase tracking-[0.18em] font-semibold ${
                    isDark ? 'text-[#B8B0A6]' : 'text-[#6E645A]'
                  }`}
                >
                  {activeDoor.subtitle}
                </p>

                {/* 5 Capability Checklist Items with Maroon Check Icons */}
                <div className="mt-4 space-y-2.5">
                  {activeDoor.checklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-medium"
                    >
                      <div className="w-4.5 h-4.5 rounded-full bg-[#6B3A3F] flex items-center justify-center text-white shrink-0 shadow-2xs">
                        <Check className="w-3 h-3 stroke-[2.8]" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Action Button */}
                <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => triggerWalkThrough(activeDoor.route)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider hover:scale-103 active:scale-95 transition-all shadow-md cursor-pointer group ${
                      isDark
                        ? 'bg-amber-300 hover:bg-amber-200 text-[#14151B]'
                        : 'bg-[#181615] hover:bg-black text-white'
                    }`}
                  >
                    <span>Explore {activeDoor.title}</span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${
                        isDark ? 'text-[#14151B]' : 'text-amber-300'
                      }`}
                    />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ARCHITECTURAL BASEBOARD & FLOOR */}
      <div className="relative w-full">
        {/* Molded Baseboard */}
        <div className="hallway-baseboard w-full" />

        {/* Hallway Floor */}
        <div className="hallway-floor w-full flex items-center justify-center">
          <div
            className={`max-w-7xl mx-auto px-6 w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono ${
              isDark ? 'text-[#9E8C80]' : 'text-[#5E493E]'
            }`}
          >
            <span>ARCHITECTURAL HALLWAY · 5 SPECIALTY ROOMS</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>CLICK ANY DOOR TO WALK THROUGH</span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET SELECTED DOOR CARD (Visible on < lg screens for effortless touch browsing) */}
      <div className="lg:hidden px-6 py-8 border-t border-black/10 dark:border-white/10">
        <div
          className={`max-w-xl mx-auto p-6 rounded-3xl border shadow-lg transition-colors ${
            isDark
              ? 'bg-[#1A1C24] border-[#2C2F3C] text-[#FAF7F2]'
              : 'bg-[#FAF8F5] border-[#D6CFC7] text-[#181615]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B3A3F] dark:text-amber-300">
              Door {mobileActiveDoor.doorNumber} · {mobileActiveDoor.subtitle}
            </span>
          </div>
          <h3 className="text-2xl font-extrabold tracking-tight mb-3">
            {mobileActiveDoor.title}
          </h3>
          <div className="space-y-2 mb-5">
            {mobileActiveDoor.checklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                <div className="w-4 h-4 rounded-full bg-[#6B3A3F] flex items-center justify-center text-white shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[2.8]" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => triggerWalkThrough(mobileActiveDoor.route)}
            className={`w-full py-3 px-5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer ${
              isDark
                ? 'bg-amber-300 text-[#14151B]'
                : 'bg-[#181615] text-white'
            }`}
          >
            <span>Enter {mobileActiveDoor.title} Room</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
