'use client';

import React, { useState, useEffect } from 'react';

const PILLS = [
  { label: 'Albert Christian', bg: '#252222', text: '#E8E4E0', dir: -1 },
  { label: 'Web development', bg: '#203354', text: '#E8E4E0', dir: 1 },
  { label: 'App development', bg: '#442E3D', text: '#E8E4E0', dir: -1 },
  { label: 'Business systems', bg: '#596B5B', text: '#E8E4E0', dir: 1 },
  { label: 'AI & GIS', bg: '#A6562E', text: '#E8E4E0', dir: -1 },
  { label: 'Event & Digital Ops', bg: '#8C7382', text: '#E8E4E0', dir: 1 },
];

export function StackPreloader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [activePills, setActivePills] = useState<number[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Check if user already saw the loader in this session
    const seen = sessionStorage.getItem('albert_stack_loader_seen');
    if (seen) {
      setIsRemoved(true);
      onFinish();
      return;
    }

    // Sequentially activate the pills
    PILLS.forEach((_, idx) => {
      setTimeout(() => {
        setActivePills((prev) => [...prev, idx]);
      }, 100 + idx * 110);
    });

    // Smoothly increment progress to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            sessionStorage.setItem('albert_stack_loader_seen', 'true');
            setTimeout(() => {
              setIsRemoved(true);
              onFinish();
            }, 850);
          }, 350);
          return 100;
        }
        const delta = Math.floor(Math.random() * 5) + 3;
        return Math.min(100, prev + delta);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onFinish]);

  if (isRemoved) return null;

  return (
    <aside
      aria-label="Portfolio Loading Screen"
      className={`fixed inset-0 z-50 overflow-hidden text-[#E8E4E0] select-none transition-transform duration-[850ms] ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
        backgroundColor: '#0D0C0C',
        backgroundImage: `
          radial-gradient(38% 55% at 0% 72%, rgba(164,85,44,0.26), transparent 70%),
          radial-gradient(40% 58% at 100% 70%, rgba(196,176,176,0.16), transparent 72%),
          radial-gradient(70% 60% at 50% 0%, rgba(107,92,92,0.3), transparent 70%)
        `,
      }}
    >
      {/* TOP HUD BAR */}
      <div className="absolute top-0 inset-x-0 p-6 sm:p-10 flex items-center justify-between text-xs sm:text-sm font-medium z-20">
        <div>
          <span className="font-semibold text-white">Albert Christian</span>
          <span className="text-white/60"> · Portfolio</span>
        </div>
        <div className="hidden sm:block text-white/60 font-mono text-xs">
          Web · App · Business Systems · AI &amp; GIS · Event Ops
        </div>
      </div>

      {/* CENTER STACK OF 6 ROUNDED PILL CARDS */}
      <div
        className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 w-[min(82vw,400px)] pointer-events-none z-10"
        style={{ height: '300px' }}
      >
        {PILLS.map((pill, idx) => {
          const isPillActive = activePills.includes(idx);
          const topOffset = idx * 38; // Cascading vertical step

          return (
            <div
              key={pill.label}
              className={`absolute left-0 w-full h-[58px] rounded-full flex items-center pl-10 sm:pl-14 text-xs sm:text-sm font-semibold tracking-wide shadow-2xl transition-all duration-700 ease-out ${
                isPillActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 scale-95'
              } ${isExiting ? 'opacity-0 scale-90' : ''}`}
              style={{
                top: `${topOffset}px`,
                zIndex: idx,
                backgroundColor: pill.bg,
                color: pill.text,
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.22), 0 -1px 0 rgba(0,0,0,0.3), 0 -8px 20px -4px rgba(0,0,0,0.6)',
                transform: isExiting
                  ? `translateX(${pill.dir * 120}vw) rotate(${pill.dir * 4}deg)`
                  : undefined,
              }}
            >
              <span>{pill.label}</span>
            </div>
          );
        })}
      </div>

      {/* BOTTOM HUD: NUMBER + PROGRESS LINE */}
      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 flex items-end justify-between z-20">
        {/* Left: OPENING UP THE WORK & 100 Counter */}
        <div>
          <span className="block font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white/60 font-semibold mb-1">
            OPENING UP THE WORK
          </span>
          <span className="font-extrabold text-6xl sm:text-8xl md:text-9xl text-white tracking-tight tabular-nums leading-none">
            {progress}
          </span>
        </div>

        {/* Right: Thin Linear Progress Bar */}
        <div className="mb-3">
          <div className="w-[120px] sm:w-[180px] md:w-[240px] h-[2px] rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8C7A7A] via-[#C4B0B0] to-[#E2BE76] transition-transform duration-75 origin-left"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
