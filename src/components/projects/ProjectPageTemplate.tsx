'use client';

import React, { useState, useMemo } from 'react';
import { DoorItem, ProjectCard, DOORS_DATA } from '@/data/doorsData';
import { useDoorTransition } from '../doors/DoorTransitionProvider';
import { useTheme } from '../providers/ThemeProvider';
import { HeaderNav } from '../layout/HeaderNav';
import { HangingPullCord } from '../layout/HangingPullCord';
import { Footer } from '../layout/Footer';
import { ContactModal } from '../modals/ContactModal';
import { ScrollProgress } from '../layout/ScrollProgress';
import { ProjectCardCover } from './ProjectCardCover';
import { ProjectDetailModal } from '../modals/ProjectDetailModal';
import { ArrowLeft, Check, Filter, ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { motion } from 'framer-motion';

interface PageTemplateProps {
  door: DoorItem;
  projects: ProjectCard[];
}

export function ProjectPageTemplate({ door, projects }: PageTemplateProps) {
  const { triggerDoorReturn, triggerWalkThrough } = useDoorTransition();
  const { isDark } = useTheme();
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectCard | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Extract unique filter tags
  const filterTags = useMemo(() => {
    const tagsSet = new Set<string>();
    tagsSet.add('All');
    projects.forEach((p) => {
      p.tags.forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet).slice(0, 8);
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedTag === 'All') return projects;
    return projects.filter((p) => p.tags.includes(selectedTag));
  }, [projects, selectedTag]);

  return (
    <>
      <HangingPullCord />
      <HeaderNav onOpenContact={() => setIsContactOpen(true)} />

      <div
        className={`relative min-h-screen pt-24 sm:pt-28 pb-24 px-6 plaster-wall transition-colors duration-700 ${
          isDark ? 'text-[#FAF7F2]' : 'text-[#181615]'
        }`}
      >
        {/* Background Soft Plaster Warm Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[420px] pointer-events-none -z-10"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${door.glowColor}, transparent 70%)`,
          }}
        />

        <div className="max-w-7xl mx-auto">
          {/* TOP BAR: BACK TO HALLWAY + ROOM-TO-ROOM SWITCHER */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => triggerDoorReturn('/')}
              className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 shadow-2xs hover:shadow-md active:scale-95 cursor-pointer group self-start ${
                isDark
                  ? 'bg-[#191B24]/90 hover:bg-[#222532] border-[#2E313D] text-[#FAF7F2]'
                  : 'bg-white/85 hover:bg-white border-[#D5CEC6] text-[#181615]'
              }`}
            >
              <ArrowLeft className="w-4 h-4 text-[#6B3A3F] dark:text-amber-300 group-hover:-translate-x-1 transition-transform" />
              <span>Return to Hallway</span>
            </button>

            {/* Quick Room Switcher */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              <span
                className={`text-[11px] font-mono uppercase tracking-wider mr-1.5 shrink-0 ${
                  isDark ? 'text-[#8E867E]' : 'text-[#7A7067]'
                }`}
              >
                Switch Room:
              </span>
              {DOORS_DATA.map((d) => {
                const isCurrent = d.id === door.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      if (!isCurrent) triggerWalkThrough(d.route);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                      isCurrent
                        ? isDark
                          ? 'bg-amber-300 text-[#14151B] border-amber-300 font-bold shadow-xs'
                          : 'bg-[#181615] text-white border-[#181615] font-bold shadow-xs'
                        : isDark
                        ? 'bg-[#181A22]/80 hover:bg-[#222530] text-[#B8B0A6] border-[#2C2F3B]'
                        : 'bg-white/70 hover:bg-white text-[#5C554E] border-[#D5CEC6]'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: d.themeColor }}
                    />
                    <span>{d.doorNumber}</span>
                    <span className="hidden sm:inline">{d.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* HERO BANNER FOR THE DOOR */}
          <div
            className={`p-7 sm:p-10 md:p-12 rounded-3xl backdrop-blur-md border shadow-xl mb-12 relative overflow-hidden transition-colors duration-500 ${
              isDark
                ? 'bg-[#181A22]/90 border-[#2A2D3A]'
                : 'bg-[#FAF8F5]/90 border-white/80'
            }`}
          >
            {/* Top color ribbon */}
            <div
              className="absolute top-0 left-0 right-0 h-2"
              style={{ backgroundColor: door.themeColor }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-xs font-bold mb-4 ${
                    isDark
                      ? 'bg-amber-300/10 border-amber-300/20 text-amber-300'
                      : 'bg-[#1D3254]/10 border-[#1D3254]/15 text-[#1D3254]'
                  }`}
                >
                  <span>DOOR {door.doorNumber}</span>
                  <span>·</span>
                  <span>KREVIA SPECIALTY</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                  {door.title}
                </h1>

                <p
                  className={`mt-2 font-mono text-xs sm:text-sm uppercase tracking-[0.18em] font-bold ${
                    isDark ? 'text-amber-200/90' : 'text-[#6B3A3F]'
                  }`}
                >
                  {door.subtitle}
                </p>

                <p
                  className={`mt-4 text-sm sm:text-base leading-relaxed max-w-2xl ${
                    isDark ? 'text-[#B8B0A6]' : 'text-[#544E49]'
                  }`}
                >
                  {door.description}
                </p>

                {door.quote && (
                  <div
                    className={`mt-4 p-3.5 rounded-xl border-l-3 border-[#6B3A3F] text-xs font-mono italic ${
                      isDark ? 'bg-white/5 text-[#D0C8BE]' : 'bg-white text-[#544E49]'
                    }`}
                  >
                    {door.quote}
                  </div>
                )}
              </div>

              {/* Checklist Column */}
              <div
                className={`lg:col-span-5 p-6 rounded-2xl border transition-colors ${
                  isDark
                    ? 'bg-[#13151C] border-[#262936]'
                    : 'bg-white/85 border-[#DFD8CE]'
                }`}
              >
                <span
                  className={`font-mono text-xs uppercase tracking-[0.18em] font-bold block mb-3.5 ${
                    isDark ? 'text-amber-300' : 'text-[#6B3A3F]'
                  }`}
                >
                  Deliverables &amp; Methodology
                </span>
                <div className="space-y-2.5">
                  {door.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <div className="mt-0.5 w-4.5 h-4.5 rounded-full bg-[#6B3A3F] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
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
            <div
              className={`flex items-center gap-1.5 text-xs font-mono mr-2 ${
                isDark ? 'text-[#9E968C]' : 'text-[#6E645A]'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>FILTER BY TECH ({filteredProjects.length}):</span>
            </div>

            {filterTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                    isSelected
                      ? isDark
                        ? 'bg-amber-300 text-[#14151B] border-amber-300 font-bold shadow-xs'
                        : 'bg-[#1D3254] text-white border-[#1D3254] font-bold shadow-xs'
                      : isDark
                      ? 'bg-[#181A22] hover:bg-[#222530] text-[#B8B0A6] border-[#2A2D3A]'
                      : 'bg-white/80 hover:bg-white text-[#544E49] border-[#D6CFC7]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* PROJECT CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveModalProject(project)}
                className={`group p-5 sm:p-6 rounded-3xl backdrop-blur-xs border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isDark
                    ? 'bg-[#181A22]/90 border-[#282B38] hover:border-amber-300/40'
                    : 'bg-[#FAF8F5]/95 border-[#D8D1C7] hover:border-[#1D3254]/40'
                }`}
              >
                <div>
                  {/* SVG/CSS Generated Cover */}
                  <ProjectCardCover
                    pattern={project.coverPattern}
                    title={project.title}
                    accentColor={project.accentColor}
                  />

                  {/* Card Header info */}
                  <div className="mt-4 flex items-center justify-between text-xs font-mono">
                    <span className={isDark ? 'text-[#9E968C]' : 'text-[#7C6C5E]'}>
                      {project.year}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-semibold ${
                        isDark
                          ? 'bg-white/8 text-amber-200'
                          : 'bg-[#1D3254]/10 text-[#1D3254]'
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`mt-2.5 text-xl font-bold tracking-tight transition-colors flex items-start justify-between gap-2 ${
                      isDark
                        ? 'text-[#FAF7F2] group-hover:text-amber-300'
                        : 'text-[#181615] group-hover:text-[#1D3254]'
                    }`}
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </h3>

                  {/* Short Description */}
                  <p
                    className={`mt-2 text-sm line-clamp-3 leading-relaxed ${
                      isDark ? 'text-[#ACA49A]' : 'text-[#544E49]'
                    }`}
                  >
                    {project.shortDescription}
                  </p>

                  {/* Metrics Highlight if present */}
                  {project.metrics && (
                    <div
                      className={`mt-3.5 py-1.5 px-3 rounded-xl border text-[11px] font-mono font-medium ${
                        isDark
                          ? 'bg-[#12141B] border-[#262936] text-amber-300'
                          : 'bg-white border-[#E4DDD4] text-[#6B3A3F]'
                      }`}
                    >
                      ⚡ {project.metrics}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-0.5 rounded-md border text-[10px] font-mono ${
                          isDark
                            ? 'bg-white/5 border-white/10 text-[#C4BCB3]'
                            : 'bg-white border-[#E4DDD4] text-[#544E49]'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span
                        className={`px-1.5 py-0.5 text-[10px] font-mono ${
                          isDark ? 'text-[#8E867E]' : 'text-[#7C6C5E]'
                        }`}
                      >
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div
                  className={`mt-6 pt-4 border-t flex items-center justify-between ${
                    isDark ? 'border-white/10' : 'border-[#E6E0D6]'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className={`py-2 px-4 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                      isDark
                        ? 'bg-amber-300/15 hover:bg-amber-300 text-amber-300 hover:text-[#14151B]'
                        : 'bg-[#1D3254]/10 hover:bg-[#1D3254] text-[#1D3254] hover:text-white'
                    }`}
                  >
                    View Specs
                  </button>

                  <div className="flex items-center gap-2">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repository for ${project.title}`}
                        className={`p-2 rounded-full border transition-colors ${
                          isDark
                            ? 'bg-[#12141B] hover:bg-white/10 text-white border-[#2A2D3A]'
                            : 'bg-white hover:bg-[#EAE4DC] text-[#181615] border-[#D6CFC7]'
                        }`}
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
                        className={`p-2 rounded-full border transition-colors ${
                          isDark
                            ? 'bg-[#12141B] hover:bg-white/10 text-white border-[#2A2D3A]'
                            : 'bg-white hover:bg-[#EAE4DC] text-[#181615] border-[#D6CFC7]'
                        }`}
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

      <Footer onOpenContact={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ScrollProgress />
    </>
  );
}
