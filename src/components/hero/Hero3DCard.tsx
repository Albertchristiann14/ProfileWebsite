'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  Mail,
  Sparkles,
  MapPin,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/icons/SocialIcons';

interface HeroProps {
  onOpenContact: () => void;
}

const ROTATING_PHRASES = [
  'web applications.',
  'Android apps.',
  'business systems.',
  'event tech & operations.',
];

export function Hero3DCard({ onOpenContact }: HeroProps) {
  // Rotating typed headline index
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // 3D Card Tilt State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = ROTATING_PHRASES[phraseIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        if (displayedText.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex]);

  // Card Mouse Move Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const scrollToDoors = () => {
    const doorsElement = document.getElementById('doors-hallway');
    if (doorsElement) {
      doorsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background Soft Plaster Warm Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-100/40 via-orange-50/30 to-blue-50/20 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEFT COLUMN: Bio & Headline */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-mono font-medium shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Open for freelance &amp; internships</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F2F55]/8 border border-[#1F2F55]/15 text-[#1F2F55] text-xs font-mono font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#6B3A3F]" />
              <span>Based in Pekanbaru, remote-friendly</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1A1818] leading-[1.1] mb-5">
            Hi, I’m Albert Christian. <br />
            <span className="text-[#1A1818]/80 font-bold text-3xl sm:text-4xl md:text-5xl block mt-2">
              I build{' '}
              <span className="text-[#1F2F55] border-b-3 border-[#6B3A3F]">
                {displayedText}
              </span>
              <span className="animate-pulse text-[#6B3A3F]">|</span>
            </span>
          </h1>

          {/* Role line */}
          <p className="text-lg md:text-xl text-[#544E49] font-medium max-w-xl leading-relaxed mb-4">
            Web &amp; mobile developer. Founder,{' '}
            <a
              href="https://kreviadigitalid.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1F2F55] font-semibold underline decoration-[#6B3A3F] decoration-2 underline-offset-4 hover:text-[#6B3A3F] transition-colors inline-flex items-center gap-1"
            >
              Krevia Digital
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            .
          </p>

          {/* Education pill */}
          <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-white/70 border border-[#D9D4CE] text-xs text-[#1A1818] mb-8 shadow-xs">
            <GraduationCap className="w-4 h-4 text-[#6B3A3F] shrink-0" />
            <span>
              <strong>Politeknik Caltex Riau</strong> · Informatics Engineering (GPA 3.42 / 4.00)
            </span>
          </div>

          {/* Core Tech Stack Tags */}
          <div className="mb-8">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#7C6C5E] font-semibold block mb-2">
              Core Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'Python', 'Kotlin', 'Firebase', 'TypeScript', 'PostgreSQL'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white/80 border border-[#D9D4CE] text-xs font-mono font-medium text-[#1A1818] shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              type="button"
              onClick={onOpenContact}
              className="py-3.5 px-7 rounded-xl bg-[#1F2F55] hover:bg-[#15223E] text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-amber-300" />
              <span>Start a project</span>
            </button>

            <button
              type="button"
              onClick={scrollToDoors}
              className="py-3.5 px-6 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#D9D4CE] hover:border-[#1F2F55] text-[#1A1818] font-medium text-sm transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>See my work</span>
              <ArrowDown className="w-4 h-4 text-[#6B3A3F]" />
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/KeijiChoco14"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Albert's GitHub Profile"
              className="p-2.5 rounded-full bg-white/80 border border-[#D9D4CE] text-[#1A1818] hover:text-[#1F2F55] hover:border-[#1F2F55] hover:bg-white shadow-xs transition-all active:scale-95"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com/in/albert-christiann"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Albert's LinkedIn Profile"
              className="p-2.5 rounded-full bg-white/80 border border-[#D9D4CE] text-[#1A1818] hover:text-[#1F2F55] hover:border-[#1F2F55] hover:bg-white shadow-xs transition-all active:scale-95"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href="https://instagram.com/__nybertx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Albert's Instagram Profile"
              className="p-2.5 rounded-full bg-white/80 border border-[#D9D4CE] text-[#1A1818] hover:text-[#1F2F55] hover:border-[#1F2F55] hover:bg-white shadow-xs transition-all active:scale-95"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <a
              href="mailto:albertchristian.dev@gmail.com"
              aria-label="Send email to Albert"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/80 border border-[#D9D4CE] text-xs font-mono text-[#1A1818] hover:border-[#1F2F55] shadow-xs transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-[#6B3A3F]" />
              <span>albertchristian.dev@gmail.com</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Tilting Ability Card */}
        <div className="lg:col-span-5 flex justify-center items-center py-4">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="door-perspective-card relative w-[320px] sm:w-[360px] h-[490px] rounded-3xl cursor-grab active:cursor-grabbing transition-transform duration-150 ease-out select-none shadow-2xl"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* CARD BODY (High-finish collector card aesthetic) */}
            <div className="relative w-full h-full rounded-3xl p-6 bg-gradient-to-b from-[#FAF8F5] via-[#EDE9E3] to-[#D9D4CE] border-2 border-[#D4C8B8] shadow-2xl flex flex-col justify-between overflow-hidden">
              
              {/* Foil Glare Overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 218, 133, 0.25) 35%, transparent 70%)`,
                  opacity: glare.opacity,
                }}
              />

              {/* CARD HEADER */}
              <div className="flex items-center justify-between border-b border-[#C8BEB2] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6B3A3F]" />
                  <span className="font-mono text-[11px] uppercase tracking-widest font-black text-[#1A1818]">
                    CREATIVE ENGINEER
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#7C6C5E] font-bold">
                  CARD 01 · 2026
                </span>
              </div>

              {/* CARD PORTRAIT PHOTO */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-[#C5BBAE] shadow-inner bg-[#1F2F55]">
                <Image
                  src="/character/albert_photo.jpg"
                  alt="Albert Christian — Web & Mobile Developer, Founder of Krevia Digital"
                  fill
                  sizes="360px"
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                
                {/* Floating pill over image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    <span className="text-white text-xs font-mono font-bold tracking-wider">
                      Albert Christian
                    </span>
                  </div>
                  <div className="bg-[#6B3A3F] px-2.5 py-1 rounded-full text-[10px] font-mono text-amber-100 font-bold">
                    Pekanbaru
                  </div>
                </div>
              </div>

              {/* CARD STATS & ATTRIBUTES */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between bg-white/70 p-2.5 rounded-xl border border-[#D9D4CE]">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#544E49]">
                    Primary Venture
                  </span>
                  <span className="text-xs font-bold text-[#1F2F55]">
                    Krevia Digital (Founder)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/70 p-2 rounded-xl border border-[#D9D4CE] text-center">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#7C6C5E] block">
                      Education
                    </span>
                    <span className="text-[11px] font-bold text-[#1A1818]">
                      Politeknik Caltex Riau
                    </span>
                  </div>

                  <div className="bg-white/70 p-2 rounded-xl border border-[#D9D4CE] text-center">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#7C6C5E] block">
                      GPA Score
                    </span>
                    <span className="text-[11px] font-bold text-[#6B3A3F]">
                      3.42 / 4.00
                    </span>
                  </div>
                </div>

                {/* Card Footer Badge */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#544E49]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C29643]" />
                    <span>Hallway of Doors Pass</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#7C6C5E]">
                    TILT WITH CURSOR
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
