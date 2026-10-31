import { useRef, useState } from 'react'
import { Project } from '@/types/portfolio'
import { Globe, ExternalLink, Code2, Layers, Cpu, Smartphone } from 'lucide-react'
import { GithubIcon } from '@/components/icons/GithubIcon'

interface ProjectCardProps {
  project: Project
  onSelect: (project: Project) => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotX, setRotX] = useState(0)
  const [rotY, setRotY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // 3D tilt interaction on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max 10 deg tilt
    const newRotX = ((y - centerY) / centerY) * -8
    const newRotY = ((x - centerX) / centerX) * 8

    setRotX(newRotX)
    setRotY(newRotY)
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotX(0)
    setRotY(0)
  }

  // Get category icon
  const getCategoryIcon = (category: Project['category']) => {
    switch (category) {
      case 'Full-Stack':
        return <Layers className="w-3.5 h-3.5" />
      case 'AI & ML':
        return <Cpu className="w-3.5 h-3.5" />
      case 'Mobile & GIS':
        return <Smartphone className="w-3.5 h-3.5" />
      default:
        return <Code2 className="w-3.5 h-3.5" />
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{
        perspective: '1000px',
        transform: isHovered
          ? `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`
          : 'rotateX(0deg) rotateY(0deg) translateY(0px)'
      }}
      className="group relative rounded-2xl bg-white/95 border border-emerald-900/15 hover:border-emerald-500/50 transition-all duration-300 ease-out cursor-pointer shadow-[0_4px_20px_rgba(20,45,30,0.06)] hover:shadow-[0_12px_32px_rgba(20,45,30,0.12)] text-left focus-within:ring-2 focus-within:ring-emerald-500"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(project)
        }
      }}
      role="button"
      aria-label={`View details for ${project.displayTitle}`}
    >
      {/* Ambient Top Glow on Hover */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none blur-2xl"
        style={{ backgroundColor: project.accentColor }}
      />

      <div>
        {/* Top Header: Category Tag & Links */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ecf4ee] border border-emerald-900/15 text-[11px] font-mono text-emerald-800 font-medium">
            {getCategoryIcon(project.category)}
            <span>{project.category}</span>
          </span>

          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-[#ecf4ee] border border-emerald-900/15 text-zinc-600 hover:text-emerald-700 hover:border-emerald-500 transition-colors"
                title="Open Live Application"
                aria-label={`Open live application for ${project.displayTitle}`}
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-[#ecf4ee] border border-emerald-900/15 text-zinc-600 hover:text-emerald-700 hover:border-emerald-500 transition-colors"
              title="View GitHub Repository"
              aria-label={`View GitHub repository for ${project.displayTitle}`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Project Visual Preview */}
        {project.previewType === 'screenshot' && project.screenshotUrl ? (
          <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5 border border-emerald-950/10 bg-[#e8f0eb]">
            <img
              src={project.screenshotUrl}
              alt={`${project.displayTitle} interface`}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5 border border-emerald-950/10 bg-[#f0f6f2] p-4 flex flex-col justify-between font-mono">
            {/* Technical Blueprint Design */}
            <div className="flex items-center justify-between text-[11px] text-zinc-600 border-b border-emerald-900/10 pb-2">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-900">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: project.accentColor }}
                />
                SYSTEM ARCHITECTURE
              </span>
              <span className="text-emerald-700 text-[10px] font-medium">Verified Codebase</span>
            </div>

            <div className="space-y-1.5 my-auto text-[11px] text-zinc-700">
              <div className="text-zinc-600 truncate">
                ARCH: <span className="text-zinc-900 font-medium">{project.techStack.backend || 'Micro-service / SPA'}</span>
              </div>
              <div className="text-zinc-600 truncate">
                UI: <span className="text-zinc-900 font-medium">{project.techStack.frontend || 'React / TypeScript'}</span>
              </div>
              <div className="text-zinc-600 truncate">
                STORAGE: <span className="text-zinc-900 font-medium">{project.techStack.database || 'Cloud / Persistent'}</span>
              </div>
            </div>

            <div className="text-[10px] text-zinc-500 flex items-center justify-between pt-2 border-t border-emerald-900/10">
              <span>Production Ready</span>
              <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform">
                View Architecture →
              </span>
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-display font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
          <span>{project.displayTitle}</span>
          <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-emerald-700 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-zinc-600 leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Technology Tags */}
      <div className="mt-6 pt-4 border-t border-emerald-900/10 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-md bg-[#ecf4ee] text-[11px] font-mono text-emerald-900 font-medium border border-emerald-900/15"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="px-2 py-1 rounded-md bg-[#ecf4ee] text-[11px] font-mono text-emerald-800 font-semibold border border-emerald-900/15">
            +{project.tags.length - 4}
          </span>
        )}
      </div>
    </div>
  )
}
