import React from 'react'
import { Project } from '@/types/portfolio'
import { ProjectCard } from './ProjectCard'
import { Star } from 'lucide-react'

interface FeaturedProjectsProps {
  projects: Project[]
  onSelectProject: (project: Project) => void
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  onSelectProject
}) => {
  const featured = projects.filter((p) => p.featured)

  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
        <h3 className="text-sm font-mono uppercase tracking-widest text-emerald-950 font-semibold">
          Featured Engineering Highlights
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={onSelectProject}
          />
        ))}
      </div>
    </div>
  )
}
