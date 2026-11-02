'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export function SitePreloader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    // Check if preloader was already viewed this session
    const alreadyViewed = sessionStorage.getItem('albert_portfolio_preloader_seen');
    if (alreadyViewed) {
      setHasEntered(true);
      onFinish();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 8;
        return Math.min(100, prev + increment);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onFinish]);

  const handleEnter = () => {
    sessionStorage.setItem('albert_portfolio_preloader_seen', 'true');
    setHasEntered(true);
    onFinish();
  };

  if (hasEntered) return null;

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#E6E2DC] select-none p-6 text-center"
        >
          {/* Subtle architectural frame */}
          <div className="w-full max-w-sm p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-[#D9D4CE] shadow-2xl flex flex-col items-center">
            
            {/* Skeuomorphic Miniature Arch Door Icon */}
            <div className="w-16 h-28 rounded-t-full bg-[#1F2F55] border-2 border-[#FAF8F5] shadow-lg relative flex flex-col items-center justify-center mb-6 overflow-hidden">
              <div className="absolute inset-1 rounded-t-full border border-white/20" />
              <div className="w-8 h-3 rounded-xs bg-[#E2BE76] border border-[#7D5920] shadow-xs flex items-center justify-center">
                <span className="text-[6px] font-mono font-bold text-[#3B290B]">ALBERT</span>
              </div>
              <div className="absolute top-1/2 right-2 w-1.5 h-3 rounded-full bg-[#E2BE76]" />
            </div>

            <h2 className="text-xl font-extrabold text-[#1A1818] tracking-tight mb-1">
              Albert Christian
            </h2>
            <p className="text-xs font-mono text-[#544E49] uppercase tracking-widest mb-6">
              Hallway of Doors Portfolio
            </p>

            {/* Progress Bar or Click to Enter Button */}
            {!isReady ? (
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#544E49]">
                  <span>Loading the card...</span>
                  <span className="font-bold text-[#1F2F55]">{progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E6E2DC] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1F2F55] via-[#6B3A3F] to-amber-500 rounded-full transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEnter}
                autoFocus
                className="w-full py-3 px-6 rounded-xl bg-[#1F2F55] hover:bg-[#15223E] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Click to enter</span>
                <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            <div className="mt-6 flex items-center gap-1.5 text-[10px] font-mono text-[#7C6C5E]">
              <Sparkles className="w-3 h-3 text-[#C29643]" />
              <span>Pekanbaru · Founder, Krevia Digital</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
