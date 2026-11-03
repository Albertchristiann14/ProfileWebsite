import React from 'react';
import Image from 'next/image';

interface CoverProps {
  pattern: 'circuit' | 'code' | 'blueprint' | 'gis' | 'stage';
  title: string;
  accentColor: string;
  category?: string;
  year?: string;
  metrics?: string;
  tags?: string[];
  images?: string[];
  variant?: 'compact' | 'showcase';
}

export function ProjectCardCover({
  pattern,
  title,
  accentColor,
  category = 'ARCHITECTURE',
  year = '2026',
  metrics,
  tags = [],
  images,
  variant = 'compact',
}: CoverProps) {
  const isShowcase = variant === 'showcase';

  return (
    <div
      className={`relative w-full ${
        isShowcase ? 'h-64 sm:h-80 md:h-[340px]' : 'h-52 sm:h-56'
      } rounded-2xl overflow-hidden border border-white/15 shadow-inner flex flex-col justify-between p-4 select-none group/cover`}
      style={{
        backgroundColor: '#131722',
        backgroundImage: `
          radial-gradient(circle at 80% 15%, ${accentColor || '#1D3254'}66 0%, transparent 60%),
          radial-gradient(circle at 20% 85%, rgba(243, 215, 148, 0.16) 0%, transparent 55%),
          linear-gradient(160deg, #171C2B 0%, #0E111A 100%)
        `,
      }}
    >
      {/* Subtle Architectural Grid Backdrop */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Header Bar */}
      <div className="relative z-20 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-amber-200/95 font-bold bg-black/50 border border-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-md">
          {category}
        </span>
        <div className="flex items-center gap-1.5 bg-black/45 border border-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-md">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor || '#F3D794' }}
          />
          <span className="font-mono text-[10px] text-white/80 font-semibold">{year}</span>
        </div>
      </div>

      {/* =====================================================================
          CENTER STAGE: 3D OVERLAPPING / STACKING CARDS ("MENIMPA-NIMPA")
          ===================================================================== */}
      {images && images.length >= 2 ? (
        <div className="relative z-10 w-full flex-1 flex items-center justify-center my-1">
          {/* Back Overlapping Screenshot Card */}
          <div className="absolute w-[62%] h-[78%] rounded-xl overflow-hidden border border-white/25 shadow-2xl -translate-x-8 -translate-y-2 -rotate-6 group-hover:translate-x-[-42px] group-hover:-rotate-10 group-hover:scale-105 transition-all duration-500 ease-out bg-[#1A1D26]">
            <Image
              src={images[1]}
              alt={`${title} secondary view`}
              fill
              sizes="320px"
              className="object-cover object-top opacity-85"
            />
          </div>

          {/* Front Main Overlapping Screenshot Card */}
          <div className="relative z-10 w-[68%] h-[84%] rounded-xl overflow-hidden border-2 border-amber-200/40 shadow-[0_18px_40px_rgba(0,0,0,0.75)] translate-x-5 translate-y-2 rotate-3 group-hover:translate-x-7 group-hover:rotate-1 group-hover:scale-[1.06] transition-all duration-500 ease-out bg-[#12141B]">
            <Image
              src={images[0]}
              alt={title}
              fill
              sizes="360px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* Floating Badge Card Overlapping the Bottom-Left Corner */}
          <div className="absolute z-20 bottom-1 left-3 px-3 py-1.5 rounded-xl bg-[#181A22]/95 border border-amber-300/40 shadow-xl backdrop-blur-md -rotate-2 group-hover:rotate-0 group-hover:-translate-y-1 transition-all duration-300">
            <span className="font-mono text-[9px] uppercase tracking-wider text-amber-300 font-bold block">
              LIVE INTERFACE STACK
            </span>
            <span className="font-mono text-[10px] text-white font-semibold">
              {tags.slice(0, 2).join(' · ') || 'Production UI'}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full flex-1 flex items-center justify-center my-1">
          {/* LAYER 3 (Back Card — Tilted Left & Recessed) */}
          <div
            className={`absolute ${
              isShowcase ? 'w-48 sm:w-56 h-32 sm:h-36' : 'w-36 sm:w-40 h-24 sm:h-26'
            } rounded-xl bg-[#1E2436]/90 border border-white/15 p-3 shadow-xl -translate-x-9 -translate-y-3 -rotate-8 group-hover:-translate-x-12 group-hover:-translate-y-4 group-hover:-rotate-12 transition-all duration-500 ease-out flex flex-col justify-between`}
          >
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
              <span className="ml-auto text-[8px] font-mono text-white/40">SYS.01</span>
            </div>
            <div className="space-y-1.5 my-auto">
              <div className="w-3/4 h-2 rounded-full bg-white/15" />
              <div className="w-1/2 h-2 rounded-full bg-amber-300/30" />
              <div className="w-2/3 h-2 rounded-full bg-white/10" />
            </div>
            <div className="text-[8px] font-mono text-white/45 truncate">
              {tags[1] || 'Architecture Layer'}
            </div>
          </div>

          {/* LAYER 2 (Middle Card — Tilted Right & Overlapping Layer 3) */}
          <div
            className={`absolute ${
              isShowcase ? 'w-48 sm:w-56 h-32 sm:h-36' : 'w-36 sm:w-40 h-24 sm:h-26'
            } rounded-xl border border-white/25 p-3 shadow-2xl translate-x-9 translate-y-2 rotate-7 group-hover:translate-x-12 group-hover:translate-y-3 group-hover:rotate-11 transition-all duration-500 ease-out flex flex-col justify-between`}
            style={{
              background: `linear-gradient(135deg, ${accentColor || '#1D3254'}DD 0%, #161B28 100%)`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono uppercase tracking-wider text-amber-200 font-bold">
                TELEMETRY
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            {/* Pattern Graphic inside Middle Card */}
            <div className="grid grid-cols-3 gap-1 my-auto">
              <div className="h-6 rounded bg-white/15" />
              <div className="h-6 rounded bg-amber-300/25" />
              <div className="h-6 rounded bg-white/10" />
            </div>
            <div className="text-[8px] font-mono text-white/80 truncate font-semibold">
              {tags[2] || 'Verified Build'}
            </div>
          </div>

          {/* LAYER 1 (Front Hero Card — Overlapping Both with Deep Drop Shadow) */}
          <div
            className={`relative z-10 ${
              isShowcase ? 'w-56 sm:w-64 h-36 sm:h-40' : 'w-44 sm:w-48 h-28 sm:h-30'
            } rounded-2xl bg-[#FAF8F5] text-[#181615] border-2 border-white shadow-[0_20px_45px_rgba(0,0,0,0.65)] p-3.5 flex flex-col justify-between -rotate-1 group-hover:rotate-0 group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500 ease-out`}
          >
            {/* Window Top Bar */}
            <div className="flex items-center justify-between border-b border-[#E5DEC3] pb-1.5">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: accentColor || '#1D3254' }}
                />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#5C554E]">
                  {pattern.toUpperCase()} ENGINE
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#181615] text-amber-300 font-mono text-[8px] font-bold">
                ACTIVE
              </span>
            </div>

            {/* Center Content of Front Card */}
            <div className="my-auto py-1">
              <div className="text-xs sm:text-sm font-extrabold tracking-tight text-[#181615] line-clamp-1">
                {title}
              </div>
              <div className="mt-1 flex items-center gap-1 flex-wrap">
                {(tags.length > 0 ? tags.slice(0, 2) : ['Next.js', 'TypeScript']).map((t, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 rounded bg-[#EAE4DC] text-[#181615] font-mono text-[8px] font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Metric Strip inside Front Card */}
            <div className="flex items-center justify-between pt-1 border-t border-[#E5DEC3] text-[8px] font-mono text-[#6B3A3F] font-bold truncate">
              <span className="truncate">{metrics || 'Krevia System Architecture'}</span>
              <span className="ml-1 shrink-0">↗</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Caption Bar */}
      <div className="relative z-20 flex items-center justify-between pt-1 text-[10px] font-mono text-white/70">
        <span className="truncate max-w-[70%] font-semibold text-white/90">{title}</span>
        <span className="text-amber-300/90 font-bold tracking-wider">STACKED VIEW</span>
      </div>
    </div>
  );
}
