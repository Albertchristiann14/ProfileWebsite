'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DOORS_DATA } from '@/data/doorsData';
import { Door } from './Door';
import { useDoorTransition } from './DoorTransitionProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function DoorsHallway() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { isDark } = useTheme();
  const { triggerWalkThrough } = useDoorTransition();

  // Primary 4 doors matching Screenshot 1 & 2
  const hallwayDoors = DOORS_DATA.slice(0, 4);
  const activeDoor = hoveredIndex !== null ? hallwayDoors[hoveredIndex] : null;

  // Keyboard navigation across doors (Left / Right arrow keys)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setHoveredIndex((prev) =>
          prev === null ? 0 : prev < hallwayDoors.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setHoveredIndex((prev) =>
          prev === null ? hallwayDoors.length - 1 : prev > 0 ? prev - 1 : hallwayDoors.length - 1
        );
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
      className={`relative w-full overflow-hidden transition-colors duration-700 select-none pt-20 pb-0 ${
        isDark ? 'bg-[#15161B]' : 'bg-[#E6E2DC]'
      }`}
    >
      {/* Plaster Wall Lighting Gradient */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isDark ? 'opacity-30' : 'opacity-100'
        }`}
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 90% 60% at 50% 30%, rgba(255, 210, 120, 0.2) 0%, rgba(21, 22, 27, 0) 75%), linear-gradient(180deg, rgba(30,32,38,0.5) 0%, rgba(18,19,23,0.95) 100%)'
            : 'radial-gradient(ellipse 90% 60% at 50% 30%, rgba(255, 245, 220, 0.55) 0%, rgba(230, 226, 220, 0) 75%), linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(217,212,206,0.85) 100%)',
        }}
      />

      {/* SECTION HEADER: "Magic happens behind the doors" */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-12 sm:mb-16 text-center">
        <h2
          className={`text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight transition-colors duration-500 ${
            isDark ? 'text-[#FAF7F2]' : 'text-[#1A1818]'
          }`}
        >
          Magic happens behind the doors
        </h2>
      </div>

      {/* MAIN HALLWAY STAGE */}
      <div className="relative max-w-7xl mx-auto px-4 z-10 flex items-end justify-center">
        
        {/* Horizontal Container for the 4 Doors */}
        <div
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative w-full flex items-end justify-center gap-4 sm:gap-6 md:gap-8 pb-0"
        >
          {hallwayDoors.map((door, index) => {
            const isActive = hoveredIndex === index;
            const isGhosted = hoveredIndex !== null && !isActive;

            return (
              <div key={door.id} className="relative shrink-0">
                <Door
                  door={door}
                  isActive={isActive}
                  isGhosted={isGhosted}
                  onHover={() => setHoveredIndex(index)}
                  onLeave={() => {}}
                  onSelect={() => triggerWalkThrough(door.route)}
                />
              </div>
            );
          })}

          {/* ACTIVE DOOR INFO OVERLAY ON WALL (Appears cleanly ONLY on hover) */}
          <AnimatePresence>
            {activeDoor && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={`absolute top-1/2 -translate-y-1/2 pointer-events-none z-30 max-w-lg w-full px-6 transition-all duration-300 ${
                  // Position opposite to hovered door to ensure zero collision
                  (hoveredIndex ?? 0) <= 1
                    ? 'right-4 md:right-12 lg:right-20 text-left'
                    : 'left-4 md:left-12 lg:left-20 text-left'
                }`}
              >
                <motion.div
                  key={activeDoor.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="p-6 sm:p-8 rounded-3xl backdrop-blur-md bg-white/60 dark:bg-black/60 border border-white/40 dark:border-white/10 shadow-2xl"
                >
                  {/* Category Title */}
                  <h3
                    className={`text-2xl sm:text-4xl font-extrabold tracking-tight transition-colors duration-500 ${
                      isDark ? 'text-[#FAF7F2]' : 'text-[#1A1818]'
                    }`}
                  >
                    {activeDoor.title}
                  </h3>

                  {/* Monospace Subtitle */}
                  <p
                    className={`mt-1.5 text-xs sm:text-sm font-mono uppercase tracking-[0.22em] font-semibold transition-colors duration-500 ${
                      isDark ? 'text-[#C4BCB3]' : 'text-[#6E645A]'
                    }`}
                  >
                    {activeDoor.subtitle}
                  </p>

                  {/* 5 Capability Checklist Items with Maroon Check Icons */}
                  <div className="mt-5 space-y-3.5">
                    {activeDoor.checklist.map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 text-xs sm:text-sm font-medium transition-colors duration-500 ${
                          isDark ? 'text-[#FAF7F2]' : 'text-[#1A1818]'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-[#6B3A3F] flex items-center justify-center text-white shrink-0 shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Action Button */}
                  <div className="mt-6 pt-5 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => triggerWalkThrough(activeDoor.route)}
                      className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1818] hover:bg-black dark:bg-white dark:hover:bg-amber-100 text-white dark:text-black font-mono text-xs font-bold tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer group"
                    >
                      <span>Explore {activeDoor.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-300 dark:text-amber-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <span className="text-[11px] font-mono text-[#7C6F6F] hidden sm:inline">
                      DOOR {activeDoor.doorNumber} OF 04
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ARCHITECTURAL BASEBOARD & FLOOR */}
      <div className="relative w-full">
        {/* White / wood molded baseboard */}
        <div className="hallway-baseboard w-full" />

        {/* Floor */}
        <div className="hallway-floor w-full flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between text-[11px] font-mono text-[#6E574B]">
            <span>PLASTER WALL & FLUTED TIMBER ARCHITECTURE</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>DOORS ACTIVE · HOVER TO EXPLORE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
