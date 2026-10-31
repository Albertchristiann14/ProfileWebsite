import { useEffect } from 'react'
import { Project } from '@/types/portfolio'
import { X, Globe, CheckCircle2, Cpu, Database, Server, Smartphone, ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/icons/GithubIcon'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/40 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white/95 p-6 sm:p-8 border border-emerald-900/15 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#ecf4ee] border border-emerald-900/15 text-zinc-600 hover:text-zinc-950 hover:bg-[#dfeee2] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Close project details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Status */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-[#ecf4ee] border border-emerald-900/15 text-xs font-mono text-emerald-800 font-semibold">
            {project.category}
          </span>
          <span className="text-xs font-mono text-zinc-500">
            repo: {project.title}
          </span>
        </div>

        {/* Title */}
        <h2
          id="modal-project-title"
          className="text-2xl sm:text-3xl font-display font-bold text-zinc-900 tracking-tight"
        >
          {project.displayTitle}
        </h2>

        {/* Screenshot if available */}
        {project.previewType === 'screenshot' && project.screenshotUrl && (
          <div className="mt-5 rounded-2xl overflow-hidden border border-emerald-950/10 bg-[#e8f0eb] max-h-72">
            <img
              src={project.screenshotUrl}
              alt={project.displayTitle}
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}

        {/* Detailed Narrative */}
        <div className="mt-6">
          <h4 className="text-xs uppercase font-mono tracking-wider text-emerald-800 font-bold mb-2">
            Overview &amp; Purpose
          </h4>
          <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
            {project.detailedDescription}
          </p>
        </div>

        {/* Architecture & Feature Highlights */}
        <div className="mt-6">
          <h4 className="text-xs uppercase font-mono tracking-wider text-emerald-800 font-bold mb-3">
            Core Features &amp; Architecture
          </h4>
          <div className="space-y-2">
            {project.architecturePoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Breakdown */}
        <div className="mt-6 p-4 rounded-2xl bg-[#f0f6f2] border border-emerald-900/15">
          <h4 className="text-xs uppercase font-mono tracking-wider text-emerald-900 font-bold mb-3">
            Technical Implementation Breakdown
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {project.techStack.frontend && (
              <div className="flex items-start gap-2 text-zinc-700">
                <Smartphone className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-emerald-900">Frontend: </span>
                  {project.techStack.frontend}
                </div>
              </div>
            )}
            {project.techStack.backend && (
              <div className="flex items-start gap-2 text-zinc-700">
                <Server className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-emerald-900">Backend: </span>
                  {project.techStack.backend}
                </div>
              </div>
            )}
            {project.techStack.database && (
              <div className="flex items-start gap-2 text-zinc-700">
                <Database className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-emerald-900">Database: </span>
                  {project.techStack.database}
                </div>
              </div>
            )}
            {project.techStack.ai && (
              <div className="flex items-start gap-2 text-zinc-700">
                <Cpu className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-emerald-900">AI / ML: </span>
                  {project.techStack.ai}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-4 border-t border-emerald-900/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-emerald-600 text-white font-medium text-xs sm:text-sm hover:bg-emerald-700 transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Inspect on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#ecf4ee] border border-emerald-900/20 text-zinc-800 font-medium text-xs sm:text-sm hover:bg-[#dfeee2] hover:border-emerald-600 transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <Globe className="w-4 h-4 text-emerald-700" />
                <span>Launch Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-full text-zinc-600 hover:text-zinc-950 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
