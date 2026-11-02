'use client';

import React, { useState, useMemo } from 'react';
import { DoorItem, ProjectCard } from '@/data/doorsData';
import { useDoorTransition } from '../doors/DoorTransitionProvider';
import { ProjectCardCover } from './ProjectCardCover';
import { ProjectDetailModal } from '../modals/ProjectDetailModal';
import { ArrowLeft, Check, Filter, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { motion } from 'framer-motion';

interface PageTemplateProps {
  door: DoorItem;
  projects: ProjectCard[];
}

export function ProjectPageTemplate({ door, projects }: PageTemplateProps) {
  const { triggerDoorReturn } = useDoorTransition();
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectCard | null>(null);

  // Extract unique filter tags
  const filterTags = useMemo(() => {
    const tagsSet = new Set<string>();
    tagsSet.add('All');
    projects.forEach((p) => {
      p.tags.forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet).slice(0, 8); // Top tags
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedTag === 'All') return projects;
    return projects.filter((p) => p.tags.includes(selectedTag));
  }, [projects, selectedTag]);

  return (
    <div className="relative min-h-screen bg-[#E6E2DC] text-[#1A1818] pt-24 pb-24 px-6 plaster-wall">
      {/* Background Soft Plaster Warm Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] pointer-events-none -z-10"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${door.glowColor}, rgba(230, 226, 220, 0) 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* TOP NAV: BACK TO HALLWAY BUTTON */}
        <div className="mb-10">
          <button
            type="button"
            onClick={() => triggerDoorReturn('/')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white border border-[#D9D4CE] text-[#1A1818] text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#6B3A3F] group-hover:-translate-x-1 transition-transform" />
            <span>Return to Hallway of Doors</span>
          </button>
        </div>

        {/* HERO BANNER FOR THE DOOR */}
        <div className="p-8 md:p-12 rounded-3xl bg-white/80 backdrop-blur-md border border-white/60 shadow-xl mb-12 relative overflow-hidden">
          {/* Top color ribbon */}
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{ backgroundColor: door.themeColor }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F2F55]/10 border border-[#1F2F55]/15 text-[#1F2F55] font-mono text-xs font-bold mb-4">
                <span>DOOR {door.doorNumber}</span>
                <span>·</span>
                <span>KREVIA SPECIALTY</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1A1818] leading-tight">
                {door.title}
              </h1>

              <p className="mt-2 font-mono text-sm uppercase tracking-widest text-[#6B3A3F] font-bold">
                {door.subtitle}
              </p>

              <p className="mt-4 text-base text-[#544E49] leading-relaxed max-w-2xl">
                {door.description}
              </p>

              {door.quote && (
                <div className="mt-4 p-3 rounded-lg bg-[#FAF8F5] border-l-3 border-[#6B3A3F] text-xs font-mono text-[#544E49] italic">
                  {door.quote}
                </div>
              )}
            </div>

            {/* Checklist Column */}
            <div className="lg:col-span-5 bg-[#FAF8F5] p-6 rounded-2xl border border-[#D9D4CE]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#7C6C5E] font-semibold block mb-3">
                Deliverables &amp; Methodology
              </span>
              <div className="space-y-2.5">
                {door.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1A1818]">
                    <div className="mt-0.5 p-0.5 rounded-full bg-[#6B3A3F]/10 text-[#6B3A3F] shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#6B3A3F] stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FILTER CHIPS */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#7C6C5E] mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>FILTER BY TECH:</span>
          </div>

          {filterTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F2F55] text-white shadow-xs font-bold'
                    : 'bg-white/80 hover:bg-white text-[#544E49] border border-[#D9D4CE]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* PROJECT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group p-5 rounded-3xl bg-white/90 backdrop-blur-xs border border-[#D9D4CE] hover:border-[#1F2F55]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* SVG/CSS Generated Cover */}
                <ProjectCardCover
                  pattern={project.coverPattern}
                  title={project.title}
                  accentColor={project.accentColor}
                />

                {/* Card Header info */}
                <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#7C6C5E]">
                  <span>{project.year}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#1F2F55]/8 text-[#1F2F55] font-semibold">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-2 text-xl font-bold text-[#1A1818] tracking-tight group-hover:text-[#1F2F55] transition-colors">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="mt-2 text-sm text-[#544E49] line-clamp-3 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Metrics Highlight if present */}
                {project.metrics && (
                  <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-[#FAF8F5] border border-[#E6E2DC] text-[11px] font-mono text-[#6B3A3F] font-medium">
                    ⚡ {project.metrics}
                  </div>
                )}

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E6E2DC] text-[10px] font-mono text-[#544E49]"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#7C6C5E]">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-6 pt-4 border-t border-[#E6E2DC] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(project)}
                  className="py-2 px-3.5 rounded-xl bg-[#1F2F55]/10 hover:bg-[#1F2F55] text-[#1F2F55] hover:text-white text-xs font-mono font-semibold transition-all cursor-pointer"
                >
                  View Details &amp; Specs
                </button>

                <div className="flex items-center gap-2">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub repository for ${project.title}`}
                      className="p-2 rounded-full bg-white hover:bg-[#E6E2DC] text-[#1A1818] border border-[#D9D4CE] transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live site for ${project.title}`}
                      className="p-2 rounded-full bg-white hover:bg-[#E6E2DC] text-[#1A1818] border border-[#D9D4CE] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}
