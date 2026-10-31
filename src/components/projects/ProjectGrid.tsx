import React, { useState, useMemo } from 'react'
import { projectsData } from '@/data/projectsData'
import { Project } from '@/types/portfolio'
import { ProjectCard } from './ProjectCard'
import { ProjectSlideDeck } from './ProjectSlideDeck'
import { ProjectModal } from './ProjectModal'
import {
  FolderGit2,
  Layers,
  LayoutGrid,
  Globe,
  Cpu,
  Sparkles,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react'
import { GithubIcon } from '@/components/icons/GithubIcon'

export const ProjectGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)
  const [viewMode, setViewMode] = useState<'slide' | 'grid'>('slide')

  const categories = ['All', 'Full-Stack', 'AI & ML', 'Mobile & GIS', 'Productivity']

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projectsData
    return projectsData.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  // Flagship spotlight project (HRMS Swiss-Belinn)
  const flagshipProject = projectsData[0]

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      {/* 1. Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-emerald-900/10 pb-8">
        <div className="text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-600/25 mb-4 shadow-sm">
            <FolderGit2 className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-xs font-mono font-medium text-emerald-900">
              Verified GitHub Portfolio &amp; Systems
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0a120c] tracking-tight">
            Selected Works &amp; Software
          </h2>

          <p className="mt-3 text-sm sm:text-base text-zinc-700 max-w-2xl leading-relaxed font-normal">
            Every project listed is grounded directly in verified source code, architecture specifications, and production implementations from my GitHub repository.
          </p>
        </div>

        {/* Controls: View Mode Switcher & Category Filter Pills */}
        <div className="mt-6 md:mt-0 flex flex-col sm:flex-row sm:items-center gap-3">
          {/* View Mode Switcher (Grid vs Slide-Over Deck) */}
          <div className="inline-flex p-1 rounded-full bg-white/95 border border-emerald-900/20 shadow-sm self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-emerald-700 text-white shadow-sm font-semibold'
                  : 'text-zinc-700 hover:text-emerald-900'
              }`}
              title="Grid View (All cards side by side)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('slide')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === 'slide'
                  ? 'bg-emerald-700 text-white shadow-sm font-semibold'
                  : 'text-zinc-700 hover:text-emerald-900'
              }`}
              title="Slide-Over Showcase (Single card sticky presentation)"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Slide-Over</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? projectsData.length
                  : projectsData.filter((p) => p.category === cat).length

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-900/20'
                      : 'bg-white/95 text-zinc-700 hover:text-emerald-900 border border-emerald-900/15 shadow-sm'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      selectedCategory === cat
                        ? 'bg-emerald-900 text-emerald-100'
                        : 'bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 2. Portfolio Impact Metrics Bar (Fills the section with rich telemetry) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-emerald-900/15 shadow-sm text-left hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-display font-extrabold text-zinc-900">8+</span>
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-600/20 text-emerald-700">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xs sm:text-sm font-bold text-zinc-900">Verified Repositories</div>
          <div className="text-[11px] text-zinc-600 font-mono mt-0.5">Full-Stack, AI, GIS &amp; Mobile</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-emerald-900/15 shadow-sm text-left hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-display font-extrabold text-emerald-800">4</span>
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-600/20 text-emerald-700">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xs sm:text-sm font-bold text-zinc-900">Live Web Deployments</div>
          <div className="text-[11px] text-zinc-600 font-mono mt-0.5">Vercel, Railway, On-Premise</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-emerald-900/15 shadow-sm text-left hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-display font-extrabold text-zinc-900">ERP</span>
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-600/20 text-emerald-700">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xs sm:text-sm font-bold text-zinc-900">Enterprise Systems</div>
          <div className="text-[11px] text-zinc-600 font-mono mt-0.5">Swiss-Belinn Hotel &amp; Krevia</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-emerald-900/15 shadow-sm text-left hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-display font-extrabold text-emerald-800">ML / AI</span>
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-600/20 text-emerald-700">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xs sm:text-sm font-bold text-zinc-900">Applied Intelligence</div>
          <div className="text-[11px] text-zinc-600 font-mono mt-0.5">Forecasting &amp; Neural RecSys</div>
        </div>
      </div>

      {/* 3. View Mode: Grid View vs Slide-Over Deck */}
      {viewMode === 'slide' ? (
        <ProjectSlideDeck
          projects={filteredProjects}
          onSelectProject={(p) => setActiveModalProject(p)}
        />
      ) : (
        <div className="space-y-12">
          {/* Flagship Spotlight Banner (Only when All category selected) */}
          {selectedCategory === 'All' && flagshipProject && (
            <div
              onClick={() => setActiveModalProject(flagshipProject)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveModalProject(flagshipProject)
                }
              }}
              className="group relative w-full rounded-3xl bg-white/95 border border-emerald-900/15 hover:border-emerald-500/50 p-6 sm:p-8 lg:p-10 shadow-[0_12px_40px_rgba(20,45,30,0.06)] hover:shadow-[0_20px_50px_rgba(20,45,30,0.12)] transition-all duration-300 text-left cursor-pointer overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Spotlight Info */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-mono font-bold flex items-center gap-1.5 border border-emerald-600/20">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      FLAGSHIP SYSTEM
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-medium border border-emerald-600/20">
                      Hospitality ERP
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-zinc-900 group-hover:text-emerald-700 transition-colors flex items-center gap-3">
                      <span>{flagshipProject.displayTitle}</span>
                      <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-emerald-700 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
                      {flagshipProject.description}
                    </p>
                  </div>

                  {/* Highlights Bullets */}
                  <div className="space-y-2 pt-1">
                    {flagshipProject.architecturePoints.slice(0, 3).map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {flagshipProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-emerald-50 text-xs font-mono text-emerald-900 font-semibold border border-emerald-600/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveModalProject(flagshipProject)
                      }}
                      className="px-5 py-2.5 rounded-full bg-emerald-700 text-white hover:bg-emerald-600 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md focus:outline-none"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Inspect Full Architecture</span>
                    </button>

                    <a
                      href={flagshipProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2.5 rounded-full bg-white border border-emerald-900/20 hover:border-emerald-600 text-zinc-900 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub Repository</span>
                    </a>
                  </div>
                </div>

                {/* Right Blueprint Architecture Terminal */}
                <div className="lg:col-span-5">
                  <div className="relative w-full rounded-2xl overflow-hidden border border-emerald-900/15 bg-[#f0f6f2] p-5 flex flex-col justify-between font-mono shadow-md">
                    <div className="flex items-center justify-between text-xs text-zinc-700 border-b border-emerald-900/10 pb-3">
                      <span className="flex items-center gap-2 font-bold text-zinc-900">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                        HOTEL ENTERPRISE SPECIFICATION
                      </span>
                      <span className="text-emerald-800 text-[11px] font-semibold">Production Ready</span>
                    </div>

                    <div className="space-y-2.5 my-4 text-xs text-zinc-800">
                      <div className="flex items-center justify-between gap-2 border-b border-emerald-900/10 pb-2">
                        <span className="text-emerald-900 font-semibold">CLIENT:</span>
                        <span className="text-zinc-900 font-bold">Swiss-Belinn SKA Pekanbaru</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 border-b border-emerald-900/10 pb-2">
                        <span className="text-emerald-900 font-semibold">BACKEND:</span>
                        <span className="text-zinc-900 font-bold">Laravel 11, PHP 8.2+</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 border-b border-emerald-900/10 pb-2">
                        <span className="text-emerald-900 font-semibold">FRONTEND:</span>
                        <span className="text-zinc-900 font-bold">React 18, Inertia.js, TypeScript</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pb-1">
                        <span className="text-emerald-900 font-semibold">DATABASE:</span>
                        <span className="text-zinc-900 font-bold">PostgreSQL / MySQL</span>
                      </div>
                    </div>

                    <div className="text-xs text-zinc-600 flex items-center justify-between pt-3 border-t border-emerald-900/10">
                      <span className="text-emerald-800 font-semibold">6 Granular RBAC Roles</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Click for details</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Full Grid of All Projects */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base sm:text-lg font-display font-bold text-zinc-900 flex items-center gap-2">
                <span>All Verified Engineering Projects</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                  {filteredProjects.length}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(p) => setActiveModalProject(p)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  )
}
