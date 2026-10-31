import React from 'react'
import { Project } from '@/types/portfolio'
import { Sparkles, Terminal, Activity, ShieldCheck, Database, Cpu } from 'lucide-react'

interface SlideDeckBackgroundProps {
  activeProject: Project
  activeIndex: number
  total: number
}

export const SlideDeckBackground: React.FC<SlideDeckBackgroundProps> = ({
  activeProject,
  activeIndex,
  total
}) => {
  const paddedIndex = String(activeIndex + 1).padStart(2, '0')
  const paddedTotal = String(total).padStart(2, '0')
  const accent = activeProject.accentColor || '#10b981'

  return (
    <div className="sticky top-24 inset-x-0 h-0 pointer-events-none select-none z-0 overflow-visible">
      {/* 1. Dynamic Morphing Ambient Aurora Mesh (Reacts to active project color) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full blur-[140px] opacity-25 transition-colors duration-1000 ease-out"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ease-out"
        style={{ backgroundColor: '#10b981' }}
      />
      <div
        className="absolute top-2/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ease-out"
        style={{ backgroundColor: '#0d9488' }}
      />

      {/* 2. Giant Editorial Watermark Index & Category (Left / Center Background) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-4 flex items-center justify-between">
        {/* Giant Number Watermark */}
        <div className="text-[180px] sm:text-[260px] lg:text-[360px] font-display font-black tracking-tighter leading-none text-emerald-950/[0.035] transition-all duration-700 select-none">
          {paddedIndex}
        </div>

        {/* Giant Category Watermark on Right */}
        <div className="hidden lg:block text-right">
          <div className="text-[80px] xl:text-[110px] font-display font-black tracking-tighter uppercase leading-none text-emerald-950/[0.03] select-none">
            {activeProject.category}
          </div>
          <div className="text-xs font-mono text-emerald-950/20 tracking-widest mt-2 uppercase">
            SPECIFICATION • {paddedIndex} / {paddedTotal}
          </div>
        </div>
      </div>

      {/* 3. Rotating Architectural Radar Rings & Concentric Schematics (Centered Behind Card) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[750px] lg:w-[900px] aspect-square flex items-center justify-center opacity-30">
        {/* Outer Ring Clockwise */}
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full animate-spin-slow transition-all duration-700"
        >
          <circle
            cx="300"
            cy="300"
            r="280"
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeDasharray="8 12"
            opacity="0.6"
          />
          <circle
            cx="300"
            cy="300"
            r="220"
            fill="none"
            stroke={accent}
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity="0.5"
          />
          {/* Cardinal Ticks */}
          <line x1="300" y1="10" x2="300" y2="30" stroke={accent} strokeWidth="2" />
          <line x1="300" y1="570" x2="300" y2="590" stroke={accent} strokeWidth="2" />
          <line x1="10" y1="300" x2="30" y2="300" stroke={accent} strokeWidth="2" />
          <line x1="570" y1="300" x2="590" y2="300" stroke={accent} strokeWidth="2" />
        </svg>

        {/* Inner Counter-Clockwise Orbital Ring */}
        <svg
          viewBox="0 0 400 400"
          className="w-2/3 h-2/3 absolute animate-spin-slow-reverse transition-all duration-700"
        >
          <circle
            cx="200"
            cy="200"
            r="170"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="16 16"
            opacity="0.5"
          />
          <circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="#0d9488"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.4"
          />
          {/* Orbital nodes */}
          <circle cx="200" cy="30" r="4" fill={accent} />
          <circle cx="370" cy="200" r="4" fill="#10b981" />
          <circle cx="200" cy="370" r="4" fill={accent} />
          <circle cx="30" cy="200" r="4" fill="#0d9488" />
        </svg>

        {/* Center Pulsing Radar Core */}
        <div
          className="w-32 h-32 rounded-full border border-emerald-600/30 animate-radar-pulse absolute"
          style={{ borderColor: `${accent}60` }}
        />
      </div>

      {/* 4. Floating Engineering Capsules (Fills the Left & Right Empty Spaces) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-4 flex justify-between pointer-events-none">
        {/* Left Floating Badges */}
        <div className="hidden xl:flex flex-col gap-6 -translate-x-8">
          <div className="animate-float-1 px-4 py-2 rounded-2xl bg-white/90 border border-emerald-900/15 shadow-sm backdrop-blur-md flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-zinc-900">Live Telemetry</div>
              <div className="text-[10px] font-mono text-emerald-800">Production Ready</div>
            </div>
          </div>

          <div className="animate-float-2 ml-4 px-4 py-2 rounded-2xl bg-white/90 border border-emerald-900/15 shadow-sm backdrop-blur-md flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-zinc-900">Granular Security</div>
              <div className="text-[10px] font-mono text-zinc-600">Multi-Role RBAC</div>
            </div>
          </div>

          <div className="animate-float-1 px-4 py-2 rounded-2xl bg-white/90 border border-emerald-900/15 shadow-sm backdrop-blur-md flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Database className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-zinc-900">Cloud Persistence</div>
              <div className="text-[10px] font-mono text-emerald-800">PostgreSQL / Cloud</div>
            </div>
          </div>
        </div>

        {/* Right Floating Badges */}
        <div className="hidden xl:flex flex-col gap-6 translate-x-8 items-end">
          <div className="animate-float-2 px-4 py-2 rounded-2xl bg-white/90 border border-emerald-900/15 shadow-sm backdrop-blur-md flex items-center gap-2.5">
            <div className="text-right">
              <div className="text-[11px] font-bold text-zinc-900">Clean Architecture</div>
              <div className="text-[10px] font-mono text-emerald-800">Verified Codebase</div>
            </div>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Terminal className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="animate-float-1 mr-4 px-4 py-2 rounded-2xl bg-white/90 border border-emerald-900/15 shadow-sm backdrop-blur-md flex items-center gap-2.5">
            <div className="text-right">
              <div className="text-[11px] font-bold text-zinc-900">Applied Intelligence</div>
              <div className="text-[10px] font-mono text-zinc-600">Deep Learning &amp; AI</div>
            </div>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Cpu className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="animate-float-2 px-4 py-2 rounded-2xl bg-white/90 border border-emerald-900/15 shadow-sm backdrop-blur-md flex items-center gap-2.5">
            <div className="text-right">
              <div className="text-[11px] font-bold text-zinc-900">Global Accessibility</div>
              <div className="text-[10px] font-mono text-emerald-800">Responsive UI / UX</div>
            </div>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
