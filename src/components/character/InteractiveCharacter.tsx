import { useState, useEffect, useCallback } from 'react'
import { Character3DCanvas } from './Character3DCanvas'
import { CharacterAnglesViewer } from './CharacterAnglesViewer'
import { Sparkles, HelpCircle, X, CheckCircle2 } from 'lucide-react'

interface InteractiveCharacterProps {
  isLaughing?: boolean
  className?: string
}

export const InteractiveCharacter: React.FC<InteractiveCharacterProps> = ({
  isLaughing = false,
  className = ''
}) => {
  const [engineMode, setEngineMode] = useState<'3d' | 'photo'>('photo')
  const [normX, setNormX] = useState(0)
  const [normY, setNormY] = useState(0)
  const [isWaving, setIsWaving] = useState(true)
  const [showAssetModal, setShowAssetModal] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  // Detect prefers-reduced-motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Greeting wave: auto-plays for the first 3 seconds then settles to idle
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaving(false)
    }, 3200)
    return () => clearTimeout(timer)
  }, [])

  // Global cursor tracking with smoothing
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion) return
      // Calculate normalized position relative to window center (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setNormX(Math.max(-1, Math.min(1, x)))
      setNormY(Math.max(-1, Math.min(1, y)))
    },
    [reducedMotion]
  )

  // Touch tracking for mobile devices
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (reducedMotion || e.touches.length === 0) return
      const touch = e.touches[0]
      const x = (touch.clientX / window.innerWidth) * 2 - 1
      const y = (touch.clientY / window.innerHeight) * 2 - 1
      setNormX(Math.max(-1, Math.min(1, x)))
      setNormY(Math.max(-1, Math.min(1, y)))
    },
    [reducedMotion]
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleMouseMove, handleTouchMove])

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center ${className}`}
    >
      {/* Visual Backlight Glow */}
      <div className="absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full bg-emerald-400/20 blur-[110px] pointer-events-none z-0" />

      {/* Main Character Viewport */}
      <div className="relative w-full flex items-center justify-center">
        {engineMode === '3d' ? (
          <Character3DCanvas
            normX={normX}
            normY={normY}
            isLaughing={isLaughing}
            isWaving={isWaving}
            reducedMotion={reducedMotion}
          />
        ) : (
          <CharacterAnglesViewer
            normX={normX}
            normY={normY}
            isLaughing={isLaughing}
            isWaving={isWaving}
            useRealPhoto={true}
            reducedMotion={reducedMotion}
          />
        )}
      </div>

      {/* Subtle Interactive HUD Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 z-20">
        <div className="inline-flex p-1 rounded-full bg-white/90 border border-emerald-900/15 backdrop-blur-md shadow-md">
          <button
            type="button"
            onClick={() => setEngineMode('photo')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 ${
              engineMode === 'photo'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/30'
                : 'text-zinc-700 hover:text-emerald-900'
            }`}
          >
            <span>👔 Real Portrait (3D Tilt)</span>
          </button>

          <button
            type="button"
            onClick={() => setEngineMode('3d')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 ${
              engineMode === '3d'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/30'
                : 'text-zinc-700 hover:text-emerald-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>WebGL 3D</span>
          </button>
        </div>

        {/* Asset Manifest & Integration Info Button */}
        <button
          type="button"
          onClick={() => setShowAssetModal(true)}
          className="p-2 rounded-full bg-white/90 border border-emerald-900/15 text-emerald-800 hover:text-emerald-950 transition-colors shadow-sm"
          title="Character Asset Configuration"
          aria-label="Character Asset Configuration"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Asset Architecture & Calibration Modal */}
      {showAssetModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-md"
        >
          <div className="relative w-full max-w-lg rounded-2xl glass-panel p-6 border border-emerald-900/20 shadow-2xl text-left bg-white/95">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-display text-zinc-900 font-semibold">
                  Character Asset Integration Architecture
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAssetModal(false)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-emerald-50 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs text-zinc-700">
              <p>
                Inspired by the <strong>Ludgi Character Set Generator</strong> and <strong>Hi I&apos;m Noh</strong> portfolio, this character supports both a real-time 3D WebGL shader bust and a pre-rendered 45-angles sprite matrix.
              </p>

              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-600/20 space-y-2">
                <p className="font-mono text-emerald-800 text-[11px] font-semibold">
                  📂 Asset Directory Structure:
                </p>
                <div className="font-mono text-[11px] text-zinc-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>/public/character/albert_photo.jpg — Albert Christian Portrait</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>/public/character/idle.jpg — Base resting portrait</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>/public/character/laugh.jpg — Contact hover reaction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>/public/character/angles/angle-001.webp ... angle-045.webp (45 Active Frames)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-zinc-600">
                <p className="font-semibold text-zinc-800">How 45 Angles Map to Cursor:</p>
                <p>
                  5 vertical rows (pitch) × 9 horizontal columns (yaw). The cursor coordinates normalizes to X [-1..1] and Y [-1..1], calculating the exact pre-rendered head angle with smooth damping.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAssetModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-sm"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
