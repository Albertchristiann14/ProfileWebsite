'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#1A1818] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#6B3A3F]"
    >
      {/* Circular Progress Ring */}
      <svg className="w-12 h-12 -rotate-90 pointer-events-none absolute inset-0">
        <circle
          cx="24"
          cy="24"
          r={radius}
          className="text-white/20"
          strokeWidth="2.5"
          stroke="currentColor"
          fill="transparent"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          className="text-amber-300 transition-all duration-75"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
        />
      </svg>

      <ArrowUp className="w-4 h-4 text-white relative z-10" />
    </button>
  );
}
