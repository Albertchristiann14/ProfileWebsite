import React from 'react'
import { InteractiveCharacter } from '@/components/character/InteractiveCharacter'
import { HeroLandscape } from './HeroLandscape'
import { ArrowDown, MousePointerClick, ArrowUpRight } from 'lucide-react'

interface HeroSectionProps {
  isLaughing: boolean
  onContactHover: (hovering: boolean) => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isLaughing,
  onContactHover
}) => {
  return (
    <section
      id="home"
      className="relative isolate min-h-[92vh] lg:min-h-screen pt-28 pb-20 md:py-0 flex items-center justify-center overflow-hidden"
    >
      {/* Daylight Botanical Landscape Artwork: Trees, Hills, Grass, Earth, & Mist */}
      <HeroLandscape />

      {/* Subtle Ambient Dot Grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-25 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Personal Editorial Identity & Intro */}
        <div className="lg:col-span-6 flex flex-col z-20 text-left">
          {/* Founder of Krevia Digital Badge */}
          <a
            href="https://kreviadigitalid.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-emerald-900/15 text-emerald-950 hover:border-emerald-500 hover:bg-emerald-50/90 w-fit mb-6 transition-all group shadow-sm backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-xs font-mono font-medium">
              Founder of <span className="font-bold text-emerald-950">Krevia Digital</span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Large Name Display */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#0a120c] leading-[1.05]">
            Albert <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800">
              Christian
            </span>
          </h1>

          {/* Primary Professional Title */}
          <p className="mt-4 text-lg sm:text-xl font-display font-bold text-[#064e3b] flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Founder at Krevia Digital</span>
            <span className="text-emerald-950/40 hidden sm:inline">•</span>
            <span className="text-zinc-800 font-semibold">Developer &amp; Product Builder</span>
          </p>

          {/* Verified Supporting Description */}
          <p className="mt-4 text-base sm:text-lg text-zinc-900 leading-relaxed max-w-xl font-medium">
            Founder of{' '}
            <a
              href="https://kreviadigitalid.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-900 hover:text-emerald-950 underline decoration-emerald-600/70 underline-offset-4 transition-colors font-bold"
            >
              Krevia Digital
            </a>
            . I engineer modular enterprise ERP platforms, intelligent digital solutions, and practical software experiences across full-stack and applied AI systems.
          </p>

          {/* Actions Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-full bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-xl shadow-emerald-900/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="https://kreviadigitalid.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-white/95 border border-emerald-900/20 hover:border-emerald-600 text-zinc-950 font-semibold text-sm hover:bg-emerald-50/60 transition-all flex items-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 backdrop-blur-md"
            >
              <span>Krevia Digital</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-800" />
            </a>

            <a
              href="#contact"
              onMouseEnter={() => onContactHover(true)}
              onMouseLeave={() => onContactHover(false)}
              className="px-6 py-3.5 rounded-full bg-white/95 border border-emerald-900/20 hover:border-emerald-600 text-zinc-950 font-semibold text-sm hover:bg-emerald-50/60 transition-all flex items-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 backdrop-blur-md"
            >
              <span>Contact Me</span>
              <span className="text-xs text-emerald-700">✦</span>
            </a>
          </div>

          {/* Microcopy Interaction Hint */}
          <div className="mt-8 flex items-center gap-2 text-xs font-mono text-zinc-800 font-semibold select-none">
            <MousePointerClick className="w-4 h-4 text-emerald-800 animate-bounce" />
            <span>Move your cursor. The character follows.</span>
          </div>
        </div>

        {/* Right Column: Prominent 3D Interactive Character */}
        <div className="lg:col-span-6 flex items-center justify-center relative w-full h-[480px] md:h-[580px] lg:h-[640px]">
          <InteractiveCharacter isLaughing={isLaughing} className="w-full h-full" />
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-zinc-500 text-xs font-mono opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-medium">Scroll Down</span>
        <div className="w-4 h-7 rounded-full border border-emerald-800/30 flex items-start justify-center p-1 bg-white/50 backdrop-blur-sm">
          <div className="w-1 h-2 rounded-full bg-emerald-600 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
