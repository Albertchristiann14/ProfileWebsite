import React from 'react';

interface CoverProps {
  pattern: 'circuit' | 'code' | 'blueprint' | 'gis' | 'stage';
  title: string;
  accentColor: string;
}

export function ProjectCardCover({ pattern, title, accentColor }: CoverProps) {
  return (
    <div
      className="relative w-full h-44 rounded-2xl overflow-hidden border border-[#D9D4CE] shadow-inner flex flex-col justify-between p-4 select-none"
      style={{
        backgroundColor: '#1F2F55',
        backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)',
      }}
    >
      {/* Pattern Overlay */}
      {pattern === 'circuit' && (
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="circuit-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
              <circle cx="15" cy="15" r="2" fill="#F3D794" />
              <path d="M 15 15 L 30 15 M 15 15 L 15 30" stroke="#F3D794" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-grid)" />
        </svg>
      )}

      {pattern === 'code' && (
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="code-pattern" width="100" height="24" patternUnits="userSpaceOnUse">
              <rect x="10" y="4" width="28" height="4" rx="2" fill="#38BDF8" />
              <rect x="42" y="4" width="36" height="4" rx="2" fill="#A855F7" />
              <rect x="82" y="4" width="12" height="4" rx="2" fill="#34D399" />
              <rect x="16" y="14" width="40" height="4" rx="2" fill="#F3D794" />
              <rect x="60" y="14" width="24" height="4" rx="2" fill="#F87171" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#code-pattern)" />
        </svg>
      )}

      {pattern === 'blueprint' && (
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
          {/* Blueprint drafting elements */}
          <circle cx="50" cy="50" r="30" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="#60A5FA" strokeWidth="0.7" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#60A5FA" strokeWidth="0.7" />
        </svg>
      )}

      {pattern === 'gis' && (
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="gis-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 20 Q 20 0, 40 20 T 80 20" fill="none" stroke="#2DD4BF" strokeWidth="0.8" opacity="0.6" />
              <circle cx="20" cy="20" r="2.5" fill="#F87171" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gis-grid)" />
          <polygon points="40,20 100,50 80,120 20,80" fill="rgba(45,212,191,0.12)" stroke="#2DD4BF" strokeWidth="1" />
        </svg>
      )}

      {pattern === 'stage' && (
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="spotlight" cx="50%" cy="0%" r="90%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#spotlight)" />
          {/* Sound bars */}
          <line x1="20" y1="130" x2="20" y2="90" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="28" y1="130" x2="28" y2="70" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="36" y1="130" x2="36" y2="105" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="44" y1="130" x2="44" y2="80" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}

      {/* Top Header Label */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-widest text-amber-200/90 font-bold bg-black/40 px-2 py-0.5 rounded-sm backdrop-blur-xs">
          ARCHITECTURE
        </span>
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: accentColor || '#F3D794' }}
        />
      </div>

      {/* Title Stamp */}
      <div className="relative z-10">
        <span className="text-white font-mono text-xs font-bold tracking-tight line-clamp-1 text-shadow-sm">
          {title}
        </span>
        <span className="text-[10px] font-mono text-white/60 tracking-widest block">
          KREVIA SYSTEM ARCHIVE
        </span>
      </div>
    </div>
  );
}
