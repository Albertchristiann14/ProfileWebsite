'use client';

import React, { useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { motion } from 'framer-motion';

// Play a realistic mechanical pull-switch "click-clack" using Web Audio API
function playPullSwitchSound() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // First crisp mechanical latch
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(650, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.035);
    gain1.gain.setValueAtTime(0.18, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.04);

    // Second mechanical spring release click
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(420, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.045);
      gain2.gain.setValueAtTime(0.22, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start();
      osc2.stop(ctx.currentTime + 0.05);
    }, 45);
  } catch {
    // AudioContext might be blocked before first user interaction
  }
}

export function HangingPullCord() {
  const { isDark, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  // Pull action: stretches cord down, plays sound, toggles theme, then springs back & sways
  const handlePull = () => {
    if (isPulling) return;
    setIsPulling(true);

    playPullSwitchSound();
    toggleTheme();

    setTimeout(() => {
      setIsPulling(false);
    }, 250);
  };

  return (
    <div
      className="fixed top-0 right-8 sm:right-12 z-50 pointer-events-none select-none flex flex-col items-center"
      style={{ width: '40px' }}
      aria-label="Interactive lamp pull-cord for dark/light mode"
    >
      {/* Ceiling anchor bracket */}
      <div className="w-4 h-2 bg-gradient-to-b from-[#8C6B2B] to-[#5C4113] rounded-b-xs shadow-md border-x border-b border-[#3E2A0A] shrink-0 z-10" />

      {/* PENDULUM SWING CONTAINER (The entire rope and bob swing together around the ceiling anchor) */}
      <motion.div
        className="flex flex-col items-center origin-top pointer-events-none -mt-0.5"
        animate={
          isPulling
            ? { rotate: [0, 8, -6, 3, 0] }
            : isHovered
            ? { rotate: [0, 4, -3, 1, 0] }
            : { rotate: 0 }
        }
        transition={{
          duration: isPulling ? 1.4 : 0.8,
          ease: 'easeOut',
        }}
      >
        {/* ELASTIC ROPE (Stretches smoothly when pulled) */}
        <motion.div
          className="w-[2px] bg-gradient-to-b from-[#E6E0D4] via-[#C8BCAB] to-[#8C8070] shadow-xs relative"
          animate={{
            height: isPulling ? 195 : isHovered ? 155 : 145,
          }}
          transition={{
            type: 'spring',
            stiffness: 450,
            damping: 18,
            mass: 0.6,
          }}
        >
          {/* Subtle rope braided highlight */}
          <div className="absolute inset-0 bg-white/20 w-[1px]" />
        </motion.div>

        {/* BRASS CONNECTOR COLLAR (Permanently joins rope to wooden bob) */}
        <div className="w-2.5 h-1.5 rounded-t-xs bg-gradient-to-r from-[#DFB668] via-[#F3D794] to-[#B88536] border border-[#7D5920] shadow-xs -mt-[1px] shrink-0 z-10" />

        {/* TURNED WOODEN BOB BUTTON */}
        <motion.button
          type="button"
          onClick={handlePull}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={
            isPulling
              ? { scale: [1, 0.95, 1.05, 1] }
              : isHovered
              ? { scale: 1.06 }
              : { scale: 1 }
          }
          transition={{ duration: 0.2 }}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="pointer-events-auto relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-full flex flex-col items-center group -mt-[1px]"
        >
          {/* Wooden Bob Body */}
          <div className="w-5 sm:w-6 h-10 sm:h-12 rounded-full bg-gradient-to-b from-[#8C5E37] via-[#5C3B1E] to-[#361E0A] border border-[#261506] shadow-[0_8px_18px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between p-1 group-hover:brightness-110 active:brightness-90 transition-all duration-150">
            {/* Upper lathe groove highlight */}
            <div className="w-3.5 h-1 rounded-full border-t border-white/25 mt-1" />

            {/* Subtle warm center sheen */}
            <div className="w-2 h-4 rounded-full bg-white/10 blur-[0.5px]" />

            {/* Bottom bead ring */}
            <div className="w-2.5 h-1 rounded-full bg-[#201104] mb-0.5" />
          </div>

          {/* Hover Tooltip: "Pull for Dark" / "Pull for Light" */}
          <div
            className={`absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full shadow-lg border pointer-events-none transition-all duration-200 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
            } ${
              isDark
                ? 'bg-[#1E2028] text-amber-200 border-[#383A46]'
                : 'bg-[#FAF7F2] text-[#4A443E] border-[#D9D4CE]'
            }`}
          >
            {isDark ? 'Pull for Light' : 'Pull for Dark'}
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}
