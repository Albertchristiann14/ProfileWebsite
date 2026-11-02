'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPECIALTIES = [
  { role: 'Web Developer', number: '01 / 05' },
  { role: 'App Developer', number: '02 / 05' },
  { role: 'Business Systems', number: '03 / 05' },
  { role: 'AI & GIS Specialist', number: '04 / 05' },
  { role: 'Event Tech Operator', number: '05 / 05' },
];

export function FlipCalendar({ onSelect }: { onSelect?: (index: number) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const triggerNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SPECIALTIES.length);
    if (onSelect) onSelect((currentIndex + 1) % SPECIALTIES.length);
  }, [currentIndex, onSelect]);

  // Auto flip every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      triggerNext();
    }, 3200);

    return () => clearInterval(timer);
  }, [triggerNext]);

  const currentItem = SPECIALTIES[currentIndex];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Current specialty: ${currentItem.role}. Click to flip to next.`}
      onClick={triggerNext}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerNext();
        }
      }}
      className="relative select-none cursor-pointer my-2 outline-none group"
      style={{
        perspective: '1200px',
        display: 'inline-block',
      }}
    >
      {/* 3D DESK STAND (Angled dark base underneath with deep drop shadow) */}
      <div
        className="relative rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
        style={{
          transform: 'rotateX(8deg) rotateY(-8deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dark wedge stand backing */}
        <div
          className="absolute -inset-x-2 -bottom-3 top-2 rounded-2xl bg-gradient-to-br from-[#383333] via-[#1A1818] to-[#0A0909] shadow-[0_20px_35px_-8px_rgba(0,0,0,0.5),0_8px_16px_-4px_rgba(0,0,0,0.3)] pointer-events-none"
          style={{ transform: 'translateZ(-16px)' }}
        />

        {/* PAPER PAD STACK (Layered paper edge shadows) */}
        <div
          className="relative w-[280px] sm:w-[350px] md:w-[420px] h-[95px] sm:h-[110px] md:h-[125px] rounded-2xl bg-[#FAF8F5] flex flex-col justify-between p-4 sm:p-5 shadow-[0_1px_0_#d8d4cb,0_3px_0_#f6f4ef,0_5px_0_#d0cbc1,0_7px_0_#f2f0ea,0_9px_0_#c8c3b8,0_12px_22px_-6px_rgba(0,0,0,0.35)] border border-[#E2DCD4] overflow-hidden"
        >
          {/* Top binder holes */}
          <div className="absolute top-2 left-6 right-6 flex justify-between pointer-events-none z-20">
            {Array.from({ length: 11 }).map((_, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-[#181616] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] block"
              />
            ))}
          </div>

          {/* SILVER WIRE SPIRAL RINGS (Looping into holes) */}
          <div className="absolute -top-3.5 left-6 right-6 flex justify-between pointer-events-none z-30">
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                className="relative w-2.5 h-7 rounded-full border-[2.5px] border-[#9E9B96] border-l-[#ECEAE6] border-t-white border-r-[#73706A] border-b-[#5C5955] drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]"
              />
            ))}
          </div>

          {/* FLIPPING LEAF CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.role}
              initial={{ rotateX: 65, opacity: 0, transformOrigin: 'top center' }}
              animate={{ rotateX: 0, opacity: 1, transformOrigin: 'top center' }}
              exit={{ rotateX: -75, opacity: 0, transformOrigin: 'top center' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full flex flex-col justify-between pt-3"
            >
              {/* Role Title */}
              <div className="flex items-center h-full">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#110F0F] tracking-tight leading-none">
                  {currentItem.role}
                </span>
              </div>

              {/* Counter: 01 / 05 */}
              <div className="flex justify-end items-end">
                <span className="font-mono text-xs font-semibold text-[#8C827A] tracking-wider">
                  {currentItem.number}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Subtle paper grain texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/[0.03] to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
