'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X, Sparkles, GraduationCap, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HolographicCardModal({ isOpen, onClose }: ModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 16;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Albert Christian 3D Ability Card"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Dark Backdrop with Warm Ambient Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close card view"
            className="fixed top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 3D Tilted Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative z-10 select-none"
            style={{ perspective: '1200px' }}
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-[320px] sm:w-[380px] h-[520px] sm:h-[580px] rounded-[32px] p-6 bg-gradient-to-b from-[#252222] via-[#1A1818] to-[#110F0F] border-2 border-[#D4C8B8]/30 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Foil Specular Sheen */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[32px] transition-opacity duration-200"
                style={{
                  background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 230, 168, 0.45) 0%, rgba(255, 120, 180, 0.2) 30%, transparent 65%)`,
                  opacity: glare.opacity,
                  mixBlendMode: 'color-dodge',
                }}
              />

              {/* CARD TOP BAR */}
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6B3A3F]" />
                  <span className="font-mono text-xs uppercase tracking-widest font-bold text-white">
                    ABILITY CARD
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-200/80 font-semibold">
                  EDITION 01 · 2026
                </span>
              </div>

              {/* PHOTO FRAME */}
              <div className="relative w-full h-[260px] rounded-2xl overflow-hidden border border-white/20 bg-[#121111] shadow-inner">
                <Image
                  src="/character/albert_photo.jpg"
                  alt="Albert Christian"
                  fill
                  sizes="380px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-white font-mono font-bold text-sm tracking-wider bg-black/60 px-3 py-1 rounded-full border border-white/20">
                    Albert Christian
                  </span>
                  <span className="bg-[#6B3A3F] text-amber-200 text-xs font-mono font-bold px-2.5 py-1 rounded-full">
                    Founder
                  </span>
                </div>
              </div>

              {/* STATS & METRICS */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-white/70 font-mono">
                    <Building2 className="w-4 h-4 text-amber-300" />
                    <span>Company</span>
                  </div>
                  <span className="font-bold text-white">Krevia Digital</span>
                </div>

                <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-white/70 font-mono">
                    <GraduationCap className="w-4 h-4 text-amber-300" />
                    <span>Politeknik Caltex Riau</span>
                  </div>
                  <span className="font-bold text-[#E2BE76]">GPA 3.42 / 4.00</span>
                </div>

                <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-white/50">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Tactile Holographic Pass</span>
                  </div>
                  <span>MOVE CURSOR TO TILT</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
