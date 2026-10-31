import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Project } from '@/types/portfolio'
import { Globe, ArrowUpRight, CheckCircle2, Layers, Cpu, Smartphone, Code2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { SlideDeckBackground } from './SlideDeckBackground'

interface ProjectSlideDeckProps {
  projects: Project[]
  onSelectProject: (project: Project) => void
}

export const ProjectSlideDeck: React.FC<ProjectSlideDeckProps> = ({
  projects,
  onSelectProject
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  // Store the exit progress [0..1] for each card (how much it is covered by the next card)
  const [exitProgress, setExitProgress] = useState<number[]>(() => projects.map(() => 0))
  const slotRefs = useRef<(HTMLDivElement | null)[]>([])

  const updateCardTransitions = useCallback(() => {
    const windowHeight = window.innerHeight || 800
    const stickyTop = 112 // 7rem (matches top-28)

    const newProgress: number[] = []

    for (let i = 0; i < projects.length; i++) {
      if (i === projects.length - 1) {
        // Last card never exits
        newProgress.push(0)
        continue
      }

      const nextSlot = slotRefs.current[i + 1]
      if (!nextSlot) {
        newProgress.push(0)
        continue
      }

      const nextRect = nextSlot.getBoundingClientRect()
      // When nextRect.top >= windowHeight: next card is below viewport, card i is 100% visible (progress = 0)
      // When nextRect.top <= stickyTop: next card has reached sticky position, card i has 100% disappeared (progress = 1)
      const raw = (windowHeight - nextRect.top) / (windowHeight - stickyTop)
      const clamped = Math.max(0, Math.min(1, raw))
      newProgress.push(clamped)
    }

    setExitProgress(newProgress)

    // Determine active index: find first card with progress < 0.5
    let currentActive = projects.length - 1
    for (let i = 0; i < newProgress.length; i++) {
      if (newProgress[i] < 0.5) {
        currentActive = i
        break
      }
    }
    setActiveIndex(currentActive)
  }, [projects.length])

  useEffect(() => {
    let animFrame: number

    const onScroll = () => {
      cancelAnimationFrame(animFrame)
      animFrame = requestAnimationFrame(updateCardTransitions)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    animFrame = requestAnimationFrame(updateCardTransitions)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(animFrame)
    }
  }, [updateCardTransitions])

  // Direct smooth navigation to a specific project slot
  const scrollToProject = (targetIndex: number) => {
    const slot = slotRefs.current[targetIndex]
    if (!slot) return
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const slotTop = slot.getBoundingClientRect().top + scrollTop
    window.scrollTo({
      top: slotTop - 110,
      behavior: 'smooth'
    })
  }

  const getCategoryIcon = (category: Project['category']) => {
    switch (category) {
      case 'Full-Stack':
        return <Layers className="w-3.5 h-3.5 text-emerald-700" />
      case 'AI & ML':
        return <Cpu className="w-3.5 h-3.5 text-emerald-600" />
      case 'Mobile & GIS':
        return <Smartphone className="w-3.5 h-3.5 text-teal-700" />
      default:
        return <Code2 className="w-3.5 h-3.5 text-emerald-700" />
    }
  }

  return (
    <div className="relative w-full">
      {/* Dynamic Animated Background: Morphing Aurora, Rotating Schematics, and Floating Telemetry */}
      {projects[activeIndex] && (
        <SlideDeckBackground
          activeProject={projects[activeIndex]}
          activeIndex={activeIndex}
          total={projects.length}
        />
      )}

      {/* Top Deck Status Bar: Indicator & Navigation */}
      <div className="sticky top-20 z-30 flex items-center justify-between gap-4 mb-8 px-4 py-2.5 rounded-full bg-white/90 border border-emerald-900/15 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-emerald-950 font-semibold">
            Interactive Showcase ({projects.length})
          </h3>
        </div>

        {/* Stepper Navigation & Dots */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollToProject(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="p-1 rounded-full bg-white border border-emerald-900/15 text-zinc-700 hover:text-emerald-900 hover:border-emerald-500 disabled:opacity-30 disabled:pointer-events-none transition-colors shadow-sm"
              title="Previous Project"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToProject(Math.min(projects.length - 1, activeIndex + 1))}
              disabled={activeIndex === projects.length - 1}
              className="p-1 rounded-full bg-white border border-emerald-900/15 text-zinc-700 hover:text-emerald-900 hover:border-emerald-500 disabled:opacity-30 disabled:pointer-events-none transition-colors shadow-sm"
              title="Next Project"
              aria-label="Next Project"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-xs font-mono text-zinc-600">
            Project <span className="text-emerald-700 font-semibold">{String(activeIndex + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')}
          </span>

          {/* Clickable Progress Pills */}
          <div className="hidden sm:flex items-center gap-1.5 ml-1">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => scrollToProject(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? 'w-7 bg-emerald-600 shadow-sm shadow-emerald-700/40'
                    : 'w-2 bg-emerald-100 hover:bg-emerald-300'
                }`}
                title={`Jump to ${p.displayTitle}`}
                aria-label={`Jump to project ${idx + 1}: ${p.displayTitle}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Project Thumbnail Strip (All 8 projects visible at a glance) */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
        {projects.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            onClick={() => scrollToProject(idx)}
            className={`px-3.5 py-2 rounded-xl text-left border transition-all shrink-0 flex items-center gap-2.5 ${
              activeIndex === idx
                ? 'bg-emerald-50 border-emerald-600/40 shadow-sm ring-2 ring-emerald-500/30'
                : 'bg-white/90 border-emerald-900/10 hover:border-emerald-500/40 text-zinc-700'
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: p.accentColor }}
            />
            <div className="text-xs font-bold text-zinc-900 whitespace-nowrap">
              {p.displayTitle}
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 font-semibold">
              {p.category}
            </span>
          </button>
        ))}
      </div>

      {/* Slots List: Each project has a slot in the document flow */}
      <div className="relative w-full">
        {projects.map((project, index) => {
          const paddedIndex = String(index + 1).padStart(2, '0')
          const paddedTotal = String(projects.length).padStart(2, '0')

          // How much this card is covered by the NEXT card (0 = fully visible, 1 = covered)
          const p = exitProgress[index] || 0

          // Smooth disappearing formula:
          const opacity = Math.max(0, 1 - p * 1.25)
          const scale = 1 - p * 0.08
          const translateY = -p * 40
          const blur = p * 8
          const isHidden = p >= 0.95

          return (
            <div
              key={project.id}
              ref={(el) => {
                slotRefs.current[index] = el
              }}
              className="relative w-full min-h-[72vh] sm:min-h-[76vh] pb-8 sm:pb-12"
            >
              <div
                className="sticky top-28 sm:top-32 w-full transition-[filter] duration-75"
                style={{
                  zIndex: index + 10,
                  opacity,
                  transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                  filter: blur > 0.5 ? `blur(${blur.toFixed(1)}px)` : 'none',
                  pointerEvents: isHidden ? 'none' : 'auto',
                  visibility: isHidden ? 'hidden' : 'visible',
                  willChange: 'transform, opacity, filter'
                }}
              >
                <div
                  onClick={() => onSelectProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelectProject(project)
                    }
                  }}
                  className="group relative w-full max-w-5xl rounded-3xl bg-white/95 backdrop-blur-2xl border border-emerald-900/15 hover:border-emerald-500/40 p-6 sm:p-8 lg:p-9 shadow-[0_20px_50px_rgba(20,45,30,0.08)] transition-colors duration-300 text-left overflow-hidden cursor-pointer"
                  style={{
                    borderTopColor: project.accentColor,
                    borderTopWidth: '3px'
                  }}
                  aria-label={`View detailed project architecture for ${project.displayTitle}`}
                >
                  {/* Subtle Ambient Glow matching project accent color */}
                  <div
                    className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none blur-3xl"
                    style={{ backgroundColor: project.accentColor }}
                  />

                  {/* Card Header: Index Pill, Category Tag, Repo Tag, Live/GitHub Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-emerald-900/10 mb-5">
                    <div className="flex items-center gap-3">
                      {/* Card Index Pill */}
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border"
                        style={{
                          backgroundColor: `${project.accentColor}15`,
                          borderColor: `${project.accentColor}40`,
                          color: '#0d1912'
                        }}
                      >
                        <span
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: project.accentColor }}
                        />
                        <span>
                          {paddedIndex} / {paddedTotal}
                        </span>
                      </span>

                      {/* Category Tag */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-600/20 text-xs font-mono text-emerald-900 font-medium">
                        {getCategoryIcon(project.category)}
                        <span>{project.category}</span>
                      </span>

                      <span className="hidden sm:inline text-xs font-mono text-zinc-500">
                        repo: <span className="text-emerald-800 font-medium">{project.title}</span>
                      </span>
                    </div>

                    {/* Quick Action Badges */}
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full bg-white border border-emerald-900/15 hover:border-emerald-500 text-xs font-mono text-emerald-900 hover:text-emerald-950 transition-all flex items-center gap-1.5 shadow-sm"
                          title="Launch Live Application"
                          aria-label={`Launch live application for ${project.displayTitle}`}
                        >
                          <Globe className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="hidden md:inline">Live Demo</span>
                          <ArrowUpRight className="w-3 h-3 text-emerald-700" />
                        </a>
                      )}

                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-white border border-emerald-900/15 hover:border-emerald-500 text-zinc-700 hover:text-zinc-950 transition-colors shadow-sm"
                        title="View GitHub Repository"
                        aria-label={`View GitHub repository for ${project.displayTitle}`}
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Card Body: Split Grid on Desktop */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
                    {/* Left Column: Project Identity, Overview, Specs, Actions */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0d1912] group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                          <span>{project.displayTitle}</span>
                          <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-emerald-700 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
                        </h3>

                        <p className="mt-2.5 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                          {project.description}
                        </p>
                      </div>

                      {/* Architecture Highlights Bullets */}
                      <div className="space-y-2 pt-1">
                        {project.architecturePoints.slice(0, 2).map((pt, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                            <CheckCircle2
                              className="w-4 h-4 mt-0.5 shrink-0"
                              style={{ color: project.accentColor }}
                            />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50/80 text-[11px] font-mono text-emerald-900 border border-emerald-600/20 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Interactive Card Action Buttons */}
                      <div className="pt-3 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectProject(project)
                          }}
                          className="px-5 py-2.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-800/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                          <span>View Full Architecture &amp; Specs</span>
                        </button>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-4 py-2.5 rounded-full bg-white border border-emerald-900/15 hover:border-emerald-500 text-zinc-800 hover:text-emerald-900 text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 shadow-sm"
                          >
                            <Globe className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Launch Live</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Visual Preview or Live Architecture Terminal */}
                    <div className="lg:col-span-5">
                      {project.previewType === 'screenshot' && project.screenshotUrl ? (
                        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-emerald-900/15 bg-emerald-50 group-hover:border-emerald-500/40 transition-all shadow-md">
                          <img
                            src={project.screenshotUrl}
                            alt={`${project.displayTitle} interface`}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                          {/* Live Preview Label */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-emerald-950 border border-emerald-900/15 flex items-center gap-1.5 font-medium shadow-sm">
                              <span
                                className="w-2 h-2 rounded-full animate-pulse"
                                style={{ backgroundColor: project.accentColor }}
                              />
                              Live Interface
                            </span>
                            <span className="text-white/80">Click to expand</span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-emerald-900/15 bg-[#f0f6f2] p-5 flex flex-col justify-between font-mono shadow-md">
                          {/* Technical Blueprint Header */}
                          <div className="flex items-center justify-between text-[11px] text-zinc-600 border-b border-emerald-900/10 pb-2.5">
                            <span className="flex items-center gap-2">
                              <span
                                className="w-2.5 h-2.5 rounded-full animate-pulse"
                                style={{ backgroundColor: project.accentColor }}
                              />
                              <span className="text-zinc-900 font-semibold tracking-wide">SYSTEM ARCHITECTURE</span>
                            </span>
                            <span className="text-emerald-700 font-medium text-[10px]">Verified Production</span>
                          </div>

                          {/* Telemetry Stack Rows */}
                          <div className="space-y-2 my-auto text-xs text-zinc-700">
                            <div className="flex items-center justify-between gap-2 border-b border-emerald-900/10 pb-1.5">
                              <span className="text-emerald-800 font-medium text-[11px]">BACKEND:</span>
                              <span className="text-zinc-900 truncate font-semibold">
                                {project.techStack.backend || 'Micro-service / Node API'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-2 border-b border-emerald-900/10 pb-1.5">
                              <span className="text-emerald-800 font-medium text-[11px]">FRONTEND:</span>
                              <span className="text-zinc-900 truncate font-semibold">
                                {project.techStack.frontend || 'React / TypeScript'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-2 border-b border-emerald-900/10 pb-1.5">
                              <span className="text-emerald-800 font-medium text-[11px]">STORAGE:</span>
                              <span className="text-zinc-900 truncate font-semibold">
                                {project.techStack.database || 'Cloud / Persistent Store'}
                              </span>
                            </div>
                            {project.techStack.ai && (
                              <div className="flex items-center justify-between gap-2 pb-1">
                                <span className="text-emerald-800 font-medium text-[11px]">AI ENGINE:</span>
                                <span className="text-zinc-900 truncate font-semibold">
                                  {project.techStack.ai}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Footer Status */}
                          <div className="text-[11px] text-zinc-600 flex items-center justify-between pt-2.5 border-t border-emerald-900/10">
                            <span className="text-emerald-800 font-medium">Pekanbaru, Indonesia</span>
                            <span
                              className="font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                              style={{ color: project.accentColor }}
                            >
                              <span>Detailed Breakdown</span>
                              <span>→</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
