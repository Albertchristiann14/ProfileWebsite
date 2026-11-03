'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPECIALTIES = [
  { role: 'Web Developer', number: '01 / 05', accent: '#1D3254' },
  { role: 'App Developer', number: '02 / 05', accent: '#46293B' },
  { role: 'Business Systems', number: '03 / 05', accent: '#576F5B' },
  { role: 'AI & GIS Specialist', number: '04 / 05', accent: '#1E464B' },
  { role: 'Event Tech Operator', number: '05 / 05', accent: '#9E4F25' },
];

export function FlipCalendar({ onSelect }: { onSelect?: (index: number) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const triggerNext = React.useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % SPECIALTIES.length;
      if (onSelect) onSelect(next);
      return next;
    });
  }, [onSelect]);

  // Auto flip every 3.4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      triggerNext();
    }, 3400);

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
      className="relative select-none cursor-pointer my-3 outline-none group"
      style={{
        perspective: '1200px',
        display: 'inline-block',
      }}
    >
      {/* 3D DESK STAND (Angled dark base underneath with deep drop shadow) */}
      <div
        className="relative rounded-2xl transition-transform duration-300 group-hover:scale-[1.015]"
        style={{
          transform: 'rotateX(7deg) rotateY(-6deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dark wedge stand backing */}
        <div
          className="absolute -inset-x-2 -bottom-3 top-2 rounded-2xl bg-gradient-to-br from-[#383333] via-[#1A1818] to-[#0A0909] shadow-[0_22px_38px_-10px_rgba(0,0,0,0.48),0_8px_16px_-4px_rgba(0,0,0,0.28)] pointer-events-none"
          style={{ transform: 'translateZ(-16px)' }}
        />

        {/* SILVER WIRE SPIRAL RINGS (Placed outside overflow-hidden so top loops are never clipped) */}
        <div className="absolute -top-3 left-6 right-6 flex justify-between pointer-events-none z-30">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className="relative w-2.5 h-6 rounded-full border-[2.5px] border-[#A39F99] border-l-[#F2F0EC] border-t-white border-r-[#73706A] border-b-[#5C5955] drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]"
            />
          ))}
        </div>

        {/* PAPER PAD STACK (Layered paper edge shadows) */}
        <div
          className="relative w-[290px] sm:w-[370px] md:w-[440px] h-[100px] sm:h-[116px] md:h-[130px] rounded-2xl bg-[#FAF8F5] flex flex-col justify-between p-4 sm:p-5 shadow-[0_1px_0_#d8d4cb,0_3px_0_#f6f4ef,0_5px_0_#d0cbc1,0_7px_0_#f2f0ea,0_9px_0_#c8c3b8,0_14px_24px_-6px_rgba(0,0,0,0.35)] border border-[#E2DCD4] overflow-hidden"
        >
          {/* Top binder holes */}
          <div className="absolute top-2 left-6 right-6 flex justify-between pointer-events-none z-20">
            {Array.from({ length: 11 }).map((_, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-[#1C1918] shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] block"
              />
            ))}
          </div>

          {/* Subtle tear perforation line under binder holes */}
          <div className="absolute top-6 inset-x-4 border-b border-dashed border-[#DFD9D0] pointer-events-none z-10" />

          {/* FLIPPING LEAF CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.role}
              initial={{ rotateX: 65, opacity: 0, transformOrigin: 'top center' }}
              animate={{ rotateX: 0, opacity: 1, transformOrigin: 'top center' }}
              exit={{ rotateX: -75, opacity: 0, transformOrigin: 'top center' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full flex flex-col justify-between pt-4"
            >
              {/* Role Title */}
              <div className="flex items-center h-full">
                <span className="text-2xl sm:text-3xl md:text-[38px] font-extrabold text-[#141211] tracking-tight leading-none">
                  {currentItem.role}
                </span>
              </div>

              {/* Bottom bar: Dots + Counter 01 / 05 */}
              <div className="flex justify-between items-center pt-1">
                <div className="flex items-center gap-1.5">
                  {SPECIALTIES.map((item, idx) => (
                    <span
                      key={item.number}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'w-4 bg-[#6B3A3F]' : 'w-1.5 bg-[#D5CEC5]'
                      }`}
                    />
                  ))}
                  <span className="ml-1.5 font-mono text-[10px] uppercase tracking-wider text-[#9A9087] opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to flip
                  </span>
                </div>

                <span className="font-mono text-xs font-bold text-[#7C7269] tracking-wider tabular-nums">
                  {currentItem.number}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Subtle paper grain texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/[0.025] via-transparent to-black/[0.02] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
