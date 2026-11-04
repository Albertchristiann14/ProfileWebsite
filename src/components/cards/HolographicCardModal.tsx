'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Sparkles, GraduationCap, Building2, ShieldCheck, Zap, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATS = [
  { label: 'Web Systems (Next.js / React)', val: 98, color: 'from-amber-400 to-amber-200' },
  { label: 'Native Android (Kotlin / Jetpack)', val: 94, color: 'from-emerald-400 to-emerald-200' },
  { label: 'ERP & Business Backends', val: 92, color: 'from-cyan-400 to-cyan-200' },
  { label: 'Creative UI / 3D & Shaders', val: 96, color: 'from-rose-400 to-amber-300' },
];

export function HolographicCardModal({ isOpen, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Albert Christian Holographic Ability Card"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Cinematic Dark Ambient Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Close Floating Pill */}
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={onClose}
            aria-label="Close card view"
            className="fixed top-5 right-5 sm:top-7 sm:right-8 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border border-white/20 backdrop-blur-md transition-all shadow-xl cursor-pointer"
          >
            <span className="text-xs font-mono font-medium">ESC</span>
            <X className="w-4 h-4" />
          </motion.button>

          {/* 3D Card Interactive Stage */}
          <CardContainer className="inter-var py-6 sm:py-10 max-h-[92vh]">
            <CardBody className="relative group/card w-[340px] sm:w-[410px] h-auto rounded-[32px] p-5 sm:p-6 bg-gradient-to-b from-[#1C1A22] via-[#131217] to-[#0B0A0E] border-2 border-[#D8B46E]/40 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95),0_0_40px_rgba(216,180,110,0.15)] flex flex-col justify-between overflow-hidden">
              
              {/* CORNER RIVETS / PHYSICAL COLLECTIBLE SCREWS */}
              <div className="absolute top-3 left-3 w-2 h-2 rounded-full border border-[#D8B46E]/60 bg-[#5A4016] shadow-inner" />
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full border border-[#D8B46E]/60 bg-[#5A4016] shadow-inner" />
              <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full border border-[#D8B46E]/60 bg-[#5A4016] shadow-inner" />
              <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full border border-[#D8B46E]/60 bg-[#5A4016] shadow-inner" />

              {/* HOLOGRAPHIC PRISMATIC SHIMMER OVERLAY (Reacts to hover) */}
              <div
                className="pointer-events-none absolute inset-0 z-30 opacity-30 group-hover/card:opacity-75 transition-opacity duration-700 mix-blend-color-dodge rounded-[32px]"
                style={{
                  background:
                    'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.15) 35%, rgba(245,158,11,0.25) 45%, rgba(56,189,248,0.25) 55%, rgba(236,72,153,0.2) 65%, transparent 80%)',
                  backgroundSize: '200% 200%',
                }}
              />

              {/* CARD HEADER (Z-Depth 40) */}
              <CardItem
                translateZ="40"
                className="w-full flex items-center justify-between border-b border-white/10 pb-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse ring-4 ring-amber-400/20" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                    ABILITY CARD
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-400/15 border border-amber-400/30 text-amber-300">
                    S-TIER
                  </span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#A9A296]">
                  <span className="text-amber-300 font-bold">LVL 99</span>
                  <span>·</span>
                  <span>#001/100</span>
                </div>
              </CardItem>

              {/* ART FRAME: High-end collectible portrait window (Z-Depth 65) */}
              <CardItem
                translateZ="65"
                className="w-full my-3.5"
              >
                <div className="relative w-full h-[220px] sm:h-[240px] rounded-2xl overflow-hidden border border-[#D8B46E]/40 bg-gradient-to-b from-[#22202A] to-[#0F0E13] shadow-2xl">
                  {/* Portrait photo */}
                  <Image
                    src="/character/albert_portrait.jpg"
                    alt="Albert Christian"
                    fill
                    sizes="420px"
                    className="object-cover object-top filter grayscale contrast-110 brightness-95 transition-transform duration-700 group-hover/card:scale-105"
                  />

                  {/* Vignette & Ambient Gold Floor Wash */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0E] via-transparent to-black/30" />
                  
                  {/* Top Right Holographic Chip */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-amber-400/40 text-[9px] font-mono font-bold text-amber-200">
                    <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                    <span>HOLO RARE</span>
                  </div>

                  {/* Character Nameplate Strip (Z-Depth 80) */}
                  <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 p-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15">
                    <div>
                      <h4 className="text-white font-extrabold text-base sm:text-lg tracking-tight leading-none mb-1">
                        Albert Christian
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-300/90 font-medium">
                        <Building2 className="w-3 h-3 text-amber-300" />
                        <span>Founder · Krevia Digital</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-md text-[9px] font-mono font-extrabold tracking-wider bg-amber-400 text-[#14151B] shadow-xs">
                      ARCHITECT
                    </span>
                  </div>
                </div>
              </CardItem>

              {/* ABILITIES & STATS MATRIX (Z-Depth 50) */}
              <CardItem
                translateZ="50"
                className="w-full space-y-2"
              >
                {/* 4 Core Dev Power Bars */}
                <div className="space-y-1.5 bg-white/[0.03] p-3 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#9E978D] mb-1">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-300" />
                      <span>Skill Attributes</span>
                    </span>
                    <span className="text-amber-300 font-bold">POWER INDEX 96</span>
                  </div>

                  {STATS.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#DDD6CC] font-medium truncate max-w-[240px]">{stat.label}</span>
                        <span className="text-amber-200 font-bold tabular-nums">{stat.val}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-700`}
                          style={{ width: `${stat.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Passive Perk Box */}
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-400/[0.06] border border-amber-400/20 text-xs">
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[11px] font-bold text-amber-200 tracking-wider uppercase block">
                      Perk: Tactile Engineering
                    </span>
                    <p className="text-[11px] text-[#C9C2B6] leading-snug">
                      High-precision full-stack builds, native responsiveness, and resilient clean architecture.
                    </p>
                  </div>
                </div>
              </CardItem>

              {/* COLLECTOR FOOTER: Credentials & Authentication Chip (Z-Depth 40) */}
              <CardItem
                translateZ="40"
                className="w-full pt-3 mt-1 border-t border-white/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-xs">
                  <GraduationCap className="w-4 h-4 text-amber-300 shrink-0" />
                  <div className="leading-tight">
                    <span className="block font-mono text-[10px] text-[#A69E92]">Politeknik Caltex Riau</span>
                    <span className="font-mono text-[11px] font-bold text-[#F3D794]">GPA 3.42 / 4.00</span>
                  </div>
                </div>

                {/* Microchip Hologram Security Seal */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/20 via-rose-500/15 to-cyan-500/20 border border-amber-400/40 text-[9px] font-mono text-amber-200 shadow-sm">
                  <Cpu className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '10s' }} />
                  <span className="font-bold">VERIFIED</span>
                </div>
              </CardItem>

              {/* Micro interactive hint */}
              <CardItem
                translateZ="20"
                className="w-full text-center pt-2 text-[9px] font-mono tracking-widest text-[#7D756A] uppercase"
              >
                ✦ Tilt cursor to inspect 3D holo sheen ✦
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      )}
    </AnimatePresence>
  );
}
