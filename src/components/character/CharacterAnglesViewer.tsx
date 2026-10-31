import React, { useState, useEffect, useRef } from 'react'
import { characterManifest, getAngleIndexFromCoords, getAngleFilename } from '@/data/characterManifest'

interface CharacterAnglesViewerProps {
  normX: number
  normY: number
  isLaughing?: boolean
  isWaving?: boolean
  useRealPhoto?: boolean
  reducedMotion?: boolean
  className?: string
}

export const CharacterAnglesViewer: React.FC<CharacterAnglesViewerProps> = ({
  normX,
  normY,
  isLaughing = false,
  isWaving = false,
  useRealPhoto = false,
  reducedMotion = false,
  className = ''
}) => {
  const [hasAngles, setHasAngles] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Derive angle directly from normalized coordinates
  const currentAngleIndex = reducedMotion ? 23 : getAngleIndexFromCoords(normX, normY)

  // Verify if 45 angles exist
  useEffect(() => {
    const testImg = new Image()
    testImg.src = getAngleFilename(1)
    testImg.onload = () => {
      setHasAngles(true)
    }
    testImg.onerror = () => {
      setHasAngles(false)
    }
  }, [])

  // Progressive background preload of all 45 angles for instant cursor response
  useEffect(() => {
    if (!hasAngles) return

    // Preload center and key angles first, then the remaining sequence
    const priority = [23, 22, 24, 14, 32, 13, 15, 31, 33]
    priority.forEach((idx) => {
      const img = new Image()
      img.src = getAngleFilename(idx)
    })

    const timer = setTimeout(() => {
      for (let i = 1; i <= 45; i++) {
        if (!priority.includes(i)) {
          const img = new Image()
          img.src = getAngleFilename(i)
        }
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [hasAngles])

  // 3D perspective tilt calculations for high-res portrait fallback
  const tiltX = reducedMotion ? 0 : -normY * 16 // degrees
  const tiltY = reducedMotion ? 0 : normX * 22 // degrees
  const lightX = ((normX + 1) / 2) * 100
  const lightY = ((normY + 1) / 2) * 100

  // Active image asset selection
  let currentSrc = characterManifest.idleAsset
  if (useRealPhoto) {
    currentSrc = characterManifest.photoAsset
  } else if (hasAngles && !isLaughing && !isWaving) {
    currentSrc = getAngleFilename(currentAngleIndex)
  } else if (isLaughing) {
    currentSrc = characterManifest.laughAsset
  } else if (isWaving) {
    currentSrc = characterManifest.waveAsset
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[460px] aspect-square flex items-center justify-center select-none ${className}`}
      style={{ perspective: '1000px' }}
      aria-label="Interactive character angle viewer"
    >
      {/* Ground Meadow Shadow */}
      <div className="absolute -bottom-4 w-4/5 h-8 rounded-[100%] bg-emerald-950/15 blur-lg pointer-events-none" />

      {/* Dynamic 3D Card / Portrait */}
      <div
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-transform duration-200 ease-out border border-emerald-900/15 bg-white"
        style={{
          transform: reducedMotion
            ? 'none'
            : `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Dynamic Specular Studio Lighting Glare */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-35 mix-blend-overlay transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(52, 211, 153, 0.42) 0%, rgba(16, 185, 129, 0.18) 35%, rgba(255, 255, 255, 0.1) 50%, transparent 75%)`
          }}
        />

        {/* Ambient Bottom Vignette & Edge Shading for depth */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        {/* Main Character Image */}
        <img
          src={currentSrc}
          alt="Albert Christian — Founder of Krevia Digital"
          className={`w-full h-full object-cover ${
            useRealPhoto ? 'object-[center_65%]' : 'object-center'
          } transition-opacity duration-100 transform scale-100`}
          loading="eager"
          decoding="async"
        />

        {/* Angle Coordinate HUD */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/20 text-[11px] font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {useRealPhoto
              ? 'Real Photo • Albert Christian (Founder)'
              : hasAngles
              ? `Angle ${String(currentAngleIndex).padStart(2, '0')} / 45 • Albert Christian`
              : isLaughing
              ? 'Reaction: Laugh'
              : isWaving
              ? 'Greeting: Hello!'
              : 'Interactive 3D Portrait'}
          </span>
        </div>
      </div>
    </div>
  )
}
