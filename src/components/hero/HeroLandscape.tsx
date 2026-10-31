import React, { useEffect, useState } from 'react'

export const HeroLandscape: React.FC = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let animId: number
    const handleScroll = () => {
      cancelAnimationFrame(animId)
      animId = requestAnimationFrame(() => {
        // Clamp to hero transition range
        setScrollY(Math.min(window.scrollY, 800))
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Normalized scroll progress for hero transition (0 to 1)
  const progress = Math.min(1, scrollY / 600)

  // Dynamic parallax transformations
  const leftTreeStyle: React.CSSProperties = {
    transform: `translate3d(${-scrollY * 0.1}px, ${-scrollY * 0.18}px, 0) scale(${1 + progress * 0.04})`,
    willChange: 'transform'
  }

  const rightTreeStyle: React.CSSProperties = {
    transform: `translate3d(${scrollY * 0.1}px, ${-scrollY * 0.18}px, 0) scale(${1 + progress * 0.04})`,
    willChange: 'transform'
  }

  const midMeadowStyle: React.CSSProperties = {
    transform: `translate3d(0, ${-scrollY * 0.14}px, 0)`,
    willChange: 'transform'
  }

  const foreGrassStyle: React.CSSProperties = {
    transform: `translate3d(0, ${-scrollY * 0.22}px, 0)`,
    willChange: 'transform'
  }

  // Dynamic wind tilt on grass blades when scrolling
  const scrollWindSkew = Math.min(progress * 10, 10)

  const soilStyle: React.CSSProperties = {
    transform: `translate3d(0, ${-scrollY * 0.09}px, 0) scaleY(${1 + progress * 0.22})`,
    transformOrigin: 'bottom center',
    willChange: 'transform'
  }

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {/* 1. Atmospheric Sky Wash: Morning sunlight glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#eef7f0] via-[#f4faf5] to-[#f8faf7]" />

      {/* 2. Soft Morning Sun Glow (Centered-Left in Sky) */}
      <div
        className="absolute top-8 left-1/4 -translate-x-1/2 w-80 h-80 rounded-full bg-gradient-to-br from-amber-200/35 via-emerald-100/20 to-transparent blur-[70px] transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(0, ${-scrollY * 0.05}px, 0)` }}
      />
      <div
        className="absolute top-4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-bl from-teal-200/25 via-emerald-100/15 to-transparent blur-[80px] transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(0, ${-scrollY * 0.07}px, 0)` }}
      />

      {/* 3. Floating Morning Spores / Botanical Fireflies (Continuous Ambient Floating) */}
      <div className="absolute bottom-[280px] left-[15%] w-2 h-2 rounded-full bg-emerald-400/50 blur-[1px] animate-spore-1" />
      <div className="absolute bottom-[300px] left-[35%] w-2.5 h-2.5 rounded-full bg-amber-300/45 blur-[1px] animate-spore-2" />
      <div className="absolute bottom-[260px] right-[25%] w-2 h-2 rounded-full bg-emerald-300/50 blur-[1px] animate-spore-3" />
      <div className="absolute bottom-[320px] right-[40%] w-1.5 h-1.5 rounded-full bg-teal-300/50 blur-[0.5px] animate-spore-1" />

      {/* 4. Side Trees Framing (Left & Right Flanks) with Scroll Parallax & Sway */}
      {/* Left Tree Grove (Parts smoothly to the left on scroll) */}
      <div
        className="absolute bottom-[160px] sm:bottom-[180px] lg:bottom-[210px] left-0 w-36 sm:w-48 lg:w-60 h-[280px] sm:h-[340px] lg:h-[400px] transition-transform duration-75 ease-out"
        style={leftTreeStyle}
      >
        <svg viewBox="0 0 240 400" fill="none" preserveAspectRatio="xMinYMax meet" className="w-full h-full">
          <defs>
            <linearGradient id="lTreeOakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#68d391" />
              <stop offset="50%" stopColor="#2f855a" />
              <stop offset="100%" stopColor="#1c4532" />
            </linearGradient>
            <linearGradient id="lTreePineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#52b788" />
              <stop offset="40%" stopColor="#2d6a4f" />
              <stop offset="100%" stopColor="#1b4332" />
            </linearGradient>
            <linearGradient id="lTrunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3d2314" />
              <stop offset="50%" stopColor="#5a3721" />
              <stop offset="100%" stopColor="#3d2314" />
            </linearGradient>
          </defs>

          {/* Leafy Oak Tree on the left with subtle wind sway */}
          <g className="animate-tree-sway">
            <rect x="50" y="160" width="18" height="180" fill="url(#lTrunkGrad)" rx="3" />
            <circle cx="59" cy="120" r="58" fill="url(#lTreeOakGrad)" />
            <circle cx="32" cy="100" r="42" fill="#38a169" opacity="0.9" />
            <circle cx="86" cy="105" r="40" fill="url(#lTreeOakGrad)" opacity="0.95" />
            <circle cx="59" cy="72" r="38" fill="#48bb78" />
            <circle cx="59" cy="60" r="24" fill="#74c69d" opacity="0.7" />
          </g>

          {/* Tall Nordic Pine next to Oak */}
          <g>
            <rect x="140" y="190" width="12" height="150" fill="url(#lTrunkGrad)" rx="2" />
            <polygon points="146,40 105,130 187,130" fill="url(#lTreePineGrad)" />
            <polygon points="146,100 95,200 197,200" fill="url(#lTreePineGrad)" />
            <polygon points="146,170 85,280 207,280" fill="url(#lTreePineGrad)" />
            <polygon points="146,240 80,340 212,340" fill="url(#lTreePineGrad)" />
          </g>
        </svg>
      </div>

      {/* Right Tree Grove (Parts smoothly to the right on scroll) */}
      <div
        className="absolute bottom-[160px] sm:bottom-[180px] lg:bottom-[210px] right-0 w-36 sm:w-48 lg:w-64 h-[300px] sm:h-[360px] lg:h-[440px] transition-transform duration-75 ease-out"
        style={rightTreeStyle}
      >
        <svg viewBox="0 0 260 440" fill="none" preserveAspectRatio="xMaxYMax meet" className="w-full h-full">
          <defs>
            <linearGradient id="rTreePineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#52b788" />
              <stop offset="40%" stopColor="#2d6a4f" />
              <stop offset="100%" stopColor="#1b4332" />
            </linearGradient>
            <linearGradient id="rTreeOakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#68d391" />
              <stop offset="50%" stopColor="#2f855a" />
              <stop offset="100%" stopColor="#1c4532" />
            </linearGradient>
          </defs>

          {/* Stately Round Apple / Oak Tree with wind sway */}
          <g className="animate-tree-sway">
            <rect x="80" y="200" width="18" height="180" fill="url(#lTrunkGrad)" rx="3" />
            <circle cx="89" cy="150" r="65" fill="url(#rTreeOakGrad)" />
            <circle cx="62" cy="130" r="48" fill="#38a169" opacity="0.9" />
            <circle cx="118" cy="135" r="46" fill="url(#rTreeOakGrad)" opacity="0.95" />
            <circle cx="89" cy="100" r="42" fill="#48bb78" />
            {/* Red berries/apples */}
            <circle cx="68" cy="145" r="3.5" fill="#ef4444" />
            <circle cx="102" cy="160" r="3.5" fill="#ef4444" />
            <circle cx="85" cy="125" r="3.5" fill="#ef4444" />
            <circle cx="112" cy="115" r="3.5" fill="#ef4444" />
          </g>

          {/* Tall Majestic Pine on the far right */}
          <g>
            <rect x="180" y="160" width="14" height="220" fill="url(#lTrunkGrad)" rx="2" />
            <polygon points="187,20 142,110 232,110" fill="url(#rTreePineGrad)" />
            <polygon points="187,80 132,180 242,180" fill="url(#rTreePineGrad)" />
            <polygon points="187,150 120,260 254,260" fill="url(#rTreePineGrad)" />
            <polygon points="187,230 110,350 264,350" fill="url(#rTreePineGrad)" />
          </g>
        </svg>
      </div>

      {/* 5. Lower Ground Plane: Rolling Grass Meadow & Stratified Earth with Dynamic Scroll Parallax */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-[240px] sm:h-[280px] lg:h-[330px]">
        <svg
          viewBox="0 0 1440 330"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            {/* Distant Meadow Green */}
            <linearGradient id="lowDistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86efac" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0.7" />
            </linearGradient>

            {/* Lush Meadow Grass Gradient */}
            <linearGradient id="lowMeadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="45%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            {/* Foreground Grass Ridge Gradient */}
            <linearGradient id="lowForeGrassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#16a34a" />
              <stop offset="50%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>

            {/* Earth / Topsoil Loam Gradient */}
            <linearGradient id="lowTopsoilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#452715" />
              <stop offset="50%" stopColor="#58331b" />
              <stop offset="100%" stopColor="#6c3f22" />
            </linearGradient>

            {/* Deep Earth Strata Gradient */}
            <linearGradient id="lowDeepEarthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6c3f22" />
              <stop offset="50%" stopColor="#854d2a" />
              <stop offset="85%" stopColor="#9e5e34" />
              <stop offset="100%" stopColor="#f8faf7" />
            </linearGradient>
          </defs>

          {/* --- Layer A: Distant Horizon Hill (Slow Parallax) --- */}
          <path
            d="M 0 35 Q 360 5 740 30 T 1440 20 L 1440 330 L 0 330 Z"
            fill="url(#lowDistGrad)"
            style={{
              transform: `translate3d(0, ${-scrollY * 0.06}px, 0)`,
              transition: 'transform 0.08s ease-out'
            }}
          />

          {/* --- Layer B: Mid Rolling Grass Meadow (Medium Parallax) --- */}
          <path
            d="M 0 65 Q 340 25 730 55 T 1440 40 L 1440 330 L 0 330 Z"
            fill="url(#lowMeadowGrad)"
            style={midMeadowStyle}
          />

          {/* --- Layer C: Foreground Lush Grass Ridge ("Rumput") --- */}
          <g style={foreGrassStyle}>
            <path
              d="M 0 95 Q 380 50 760 90 T 1440 70 L 1440 330 L 0 330 Z"
              fill="url(#lowForeGrassGrad)"
            />

            {/* Animated Grass Tufts: Wind Sway & Scroll Velocity Skew */}
            <g
              fill="#4ade80"
              opacity="0.95"
              style={{
                transform: `skewX(${scrollWindSkew}deg)`,
                transformOrigin: 'bottom center',
                transition: 'transform 0.1s ease-out'
              }}
            >
              {/* Left Tufts */}
              <path d="M 60 90 Q 65 65 60 55 Q 72 70 76 90 Z" className="animate-grass-left" />
              <path d="M 74 92 Q 84 68 90 58 Q 88 75 82 92 Z" className="animate-grass-right" />
              <path d="M 140 82 Q 148 58 155 48 Q 152 70 148 82 Z" className="animate-grass-left" />
              <path d="M 220 72 Q 228 48 235 40 Q 234 62 228 72 Z" className="animate-grass-right" />
              <path d="M 310 65 Q 316 42 324 35 Q 322 55 318 65 Z" className="animate-grass-left" />

              {/* Center Tufts */}
              <path d="M 580 82 Q 588 58 596 50 Q 593 70 588 82 Z" className="animate-grass-right" />
              <path d="M 670 88 Q 676 65 684 55 Q 682 75 678 88 Z" className="animate-grass-left" />
              <path d="M 760 92 Q 768 68 776 58 Q 773 78 768 92 Z" className="animate-grass-right" />
              <path d="M 850 86 Q 858 62 866 52 Q 863 74 858 86 Z" className="animate-grass-left" />

              {/* Right Tufts */}
              <path d="M 980 80 Q 988 55 996 46 Q 993 68 988 80 Z" className="animate-grass-right" />
              <path d="M 1080 75 Q 1086 52 1094 44 Q 1092 64 1088 75 Z" className="animate-grass-left" />
              <path d="M 1180 70 Q 1188 46 1195 38 Q 1193 58 1188 70 Z" className="animate-grass-right" />
              <path d="M 1280 72 Q 1286 48 1294 40 Q 1292 62 1288 72 Z" className="animate-grass-left" />
              <path d="M 1370 72 Q 1378 48 1385 40 Q 1382 62 1378 72 Z" className="animate-grass-right" />
            </g>

            {/* Wildflowers / Daisies with Gentle Bobbing Sway */}
            <g id="wildflowers-low" className="animate-flower-sway">
              <g transform="translate(180, 75)">
                <circle cx="0" cy="-4" r="3" fill="#ffffff" />
                <circle cx="4" cy="0" r="3" fill="#ffffff" />
                <circle cx="0" cy="4" r="3" fill="#ffffff" />
                <circle cx="-4" cy="0" r="3" fill="#ffffff" />
                <circle cx="0" cy="0" r="2" fill="#f59e0b" />
              </g>
              <g transform="translate(280, 65)">
                <circle cx="0" cy="-4" r="3" fill="#ffffff" />
                <circle cx="4" cy="0" r="3" fill="#ffffff" />
                <circle cx="0" cy="4" r="3" fill="#ffffff" />
                <circle cx="-4" cy="0" r="3" fill="#ffffff" />
                <circle cx="0" cy="0" r="2" fill="#f59e0b" />
              </g>
              <g transform="translate(720, 85)">
                <circle cx="0" cy="-4" r="3" fill="#ffffff" />
                <circle cx="4" cy="0" r="3" fill="#ffffff" />
                <circle cx="0" cy="4" r="3" fill="#ffffff" />
                <circle cx="-4" cy="0" r="3" fill="#ffffff" />
                <circle cx="0" cy="0" r="2" fill="#f59e0b" />
              </g>
              <g transform="translate(1040, 72)">
                <circle cx="0" cy="-4" r="3" fill="#ffffff" />
                <circle cx="4" cy="0" r="3" fill="#ffffff" />
                <circle cx="0" cy="4" r="3" fill="#ffffff" />
                <circle cx="-4" cy="0" r="3" fill="#ffffff" />
                <circle cx="0" cy="0" r="2" fill="#f59e0b" />
              </g>
              <g transform="translate(1240, 68)">
                <circle cx="0" cy="-4" r="3" fill="#ffffff" />
                <circle cx="4" cy="0" r="3" fill="#ffffff" />
                <circle cx="0" cy="4" r="3" fill="#ffffff" />
                <circle cx="-4" cy="0" r="3" fill="#ffffff" />
                <circle cx="0" cy="0" r="2" fill="#f59e0b" />
              </g>
            </g>
          </g>

          {/* --- Layer D & E: Fertile Earth & Soil Cross-Section ("Tanah") with Downward Expansion --- */}
          <g style={soilStyle}>
            {/* Topsoil Loam */}
            <path
              d="M 0 130 Q 400 85 780 125 T 1440 105 L 1440 330 L 0 330 Z"
              fill="url(#lowTopsoilGrad)"
            />

            {/* Deep Earth & Mineral Clay */}
            <path
              d="M 0 185 Q 420 145 820 185 T 1440 160 L 1440 330 L 0 330 Z"
              fill="url(#lowDeepEarthGrad)"
            />

            {/* Organic Earth Stones, Pebbles & Roots */}
            <g id="soil-pebbles">
              {/* Topsoil Pebbles */}
              <ellipse cx="120" cy="155" rx="6" ry="4" fill="#8d5b38" />
              <ellipse cx="260" cy="165" rx="8" ry="5" fill="#a47148" />
              <circle cx="420" cy="150" r="4.5" fill="#7a4b2c" />
              <ellipse cx="610" cy="165" rx="7" ry="4.5" fill="#b08968" />
              <circle cx="790" cy="160" r="5" fill="#8d5b38" />
              <ellipse cx="960" cy="150" rx="9" ry="5" fill="#a47148" />
              <ellipse cx="1140" cy="155" rx="6" ry="4" fill="#7a4b2c" />
              <ellipse cx="1320" cy="150" rx="8" ry="5" fill="#b08968" />

              {/* Deep Strata Rocks */}
              <ellipse cx="210" cy="225" rx="11" ry="6.5" fill="#b08968" opacity="0.9" />
              <ellipse cx="510" cy="235" rx="13" ry="7.5" fill="#9c6644" opacity="0.95" />
              <ellipse cx="880" cy="230" rx="10" ry="6" fill="#b08968" opacity="0.9" />
              <ellipse cx="1240" cy="225" rx="12" ry="7" fill="#9c6644" opacity="0.95" />

              {/* Root Tendrils */}
              <g stroke="#3d2314" strokeWidth="2" strokeLinecap="round" opacity="0.75">
                <path d="M 90 95 Q 98 125 92 150 T 102 175" />
                <path d="M 230 72 Q 235 110 228 135 T 235 165" />
                <path d="M 680 88 Q 685 115 678 140" />
                <path d="M 1080 75 Q 1086 110 1080 135" />
                <path d="M 1280 72 Q 1288 105 1282 135 T 1290 165" />
              </g>
            </g>
          </g>
        </svg>

        {/* 6. Natural Bottom Dissolve: Softly dissolves soil into the About section below */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[#f8faf7]/85 to-[#f8faf7] pointer-events-none" />
      </div>
    </div>
  )
}
