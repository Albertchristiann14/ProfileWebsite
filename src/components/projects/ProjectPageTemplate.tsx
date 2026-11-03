'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
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
import {
  ArrowLeft,
  Check,
  Filter,
  ExternalLink,
  ArrowUpRight,
  Layers,
  LayoutGrid,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');
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

  // ============================================================================
  // STICKY OVERLAPPING STACK ("MENIMPA-NIMPA") SCROLL ENGINE
  // ============================================================================
  const [activeStackIndex, setActiveStackIndex] = useState(0);
  const [coverProgress, setCoverProgress] = useState<number[]>([]);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateStackPhysics = useCallback(() => {
    if (viewMode !== 'stack') return;
    const vh = window.innerHeight || 800;
    const nextProgress: number[] = [];

    for (let i = 0; i < filteredProjects.length; i++) {
      if (i === filteredProjects.length - 1) {
        nextProgress.push(0);
        continue;
      }
      const nextSlot = slotRefs.current[i + 1];
      if (!nextSlot) {
        nextProgress.push(0);
        continue;
      }
      const nextRect = nextSlot.getBoundingClientRect();
      const stickyThreshold = 112 + (i + 1) * 18;
      // 0 when next card is at bottom of viewport, 1 when next card has fully stacked on top
      const raw = (vh - nextRect.top) / Math.max(1, vh - stickyThreshold);
      nextProgress.push(Math.max(0, Math.min(1, raw)));
    }

    setCoverProgress(nextProgress);

    let currentActive = filteredProjects.length - 1;
    for (let i = 0; i < nextProgress.length; i++) {
      if (nextProgress[i] < 0.55) {
        currentActive = i;
        break;
      }
    }
    setActiveStackIndex(Math.max(0, currentActive));
  }, [filteredProjects.length, viewMode]);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateStackPhysics);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    rafId = requestAnimationFrame(updateStackPhysics);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [updateStackPhysics]);

  const scrollToStackCard = (index: number) => {
    const slot = slotRefs.current[index];
    if (!slot) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const targetTop = slot.getBoundingClientRect().top + scrollTop - (96 + index * 16);
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  return (
    <>
      <HangingPullCord />
      <HeaderNav onOpenContact={() => setIsContactOpen(true)} />

      <div
        className={`relative min-h-screen pt-24 sm:pt-28 pb-24 px-4 sm:px-6 plaster-wall transition-colors duration-700 ${
          isDark ? 'text-[#FAF7F2]' : 'text-[#181615]'
        }`}
      >
        {/* Background Soft Plaster Warm Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[460px] pointer-events-none -z-10"
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
            className={`p-7 sm:p-10 md:p-12 rounded-3xl backdrop-blur-md border shadow-xl mb-10 relative overflow-hidden transition-colors duration-500 ${
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
                  <span>KREVIA SPECIALTY ROOM</span>
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

          {/* CONTROLS BAR: TECH FILTER CHIPS + VIEW MODE SWITCHER (STACK VS GRID) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={`flex items-center gap-1.5 text-xs font-mono mr-1 ${
                  isDark ? 'text-[#9E968C]' : 'text-[#6E645A]'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>TECH ({filteredProjects.length}):</span>
              </div>

              {filterTags.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
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

            {/* View Mode Toggle: Overlapping Stack vs Grid */}
            <div
              className={`inline-flex items-center p-1 rounded-full border self-start lg:self-auto shrink-0 ${
                isDark
                  ? 'bg-[#15171F] border-[#2A2D3A]'
                  : 'bg-white/80 border-[#D5CEC6]'
              }`}
            >
              <button
                type="button"
                onClick={() => setViewMode('stack')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  viewMode === 'stack'
                    ? isDark
                      ? 'bg-amber-300 text-[#14151B] shadow-xs'
                      : 'bg-[#181615] text-white shadow-xs'
                    : isDark
                    ? 'text-[#9E968C] hover:text-white'
                    : 'text-[#5C554E] hover:text-[#181615]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Stacked Deck</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? isDark
                      ? 'bg-amber-300 text-[#14151B] shadow-xs'
                      : 'bg-[#181615] text-white shadow-xs'
                    : isDark
                    ? 'text-[#9E968C] hover:text-white'
                    : 'text-[#5C554E] hover:text-[#181615]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>
          </div>

          {/* =================================================================
              MODE 1: 3D STICKY OVERLAPPING CARD DECK ("MENIMPA-NIMPA")
              ================================================================= */}
          {viewMode === 'stack' ? (
            <div className="relative w-full">
              {/* Quick Jump Pill Strip & Active Card Indicator */}
              <div
                className={`flex items-center justify-between gap-3 px-4 py-2.5 mb-8 rounded-2xl border backdrop-blur-md ${
                  isDark
                    ? 'bg-[#161821]/90 border-[#2A2D3A]'
                    : 'bg-[#FAF8F5]/90 border-[#D5CEC6] shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                  <Sparkles className="w-4 h-4 text-[#6B3A3F] dark:text-amber-300 shrink-0" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold shrink-0 mr-1">
                    Scroll to Stack:
                  </span>
                  {filteredProjects.map((p, idx) => {
                    const isCurrent = activeStackIndex === idx;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => scrollToStackCard(idx)}
                        className={`px-3 py-1 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                          isCurrent
                            ? isDark
                              ? 'bg-amber-300 text-[#14151B] border-amber-300 font-bold'
                              : 'bg-[#181615] text-white border-[#181615] font-bold'
                            : isDark
                            ? 'bg-white/5 hover:bg-white/10 text-[#ABA39A] border-white/10'
                            : 'bg-white hover:bg-[#EAE4DC] text-[#5C554E] border-[#DED7CE]'
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: p.accentColor }}
                        />
                        <span>{String(idx + 1).padStart(2, '0')}</span>
                        <span className="hidden md:inline max-w-[140px] truncate">{p.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Prev / Next Stepper */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => scrollToStackCard(Math.max(0, activeStackIndex - 1))}
                    disabled={activeStackIndex === 0}
                    aria-label="Previous project card"
                    className={`p-1.5 rounded-full border transition-colors disabled:opacity-30 cursor-pointer ${
                      isDark
                        ? 'bg-[#12141B] border-[#2C2F3C] text-white hover:bg-white/10'
                        : 'bg-white border-[#D6CFC7] text-[#181615] hover:bg-[#EAE4DC]'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono font-bold tabular-nums px-1">
                    {String(activeStackIndex + 1).padStart(2, '0')} /{' '}
                    {String(filteredProjects.length).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      scrollToStackCard(Math.min(filteredProjects.length - 1, activeStackIndex + 1))
                    }
                    disabled={activeStackIndex === filteredProjects.length - 1}
                    aria-label="Next project card"
                    className={`p-1.5 rounded-full border transition-colors disabled:opacity-30 cursor-pointer ${
                      isDark
                        ? 'bg-[#12141B] border-[#2C2F3C] text-white hover:bg-white/10'
                        : 'bg-white border-[#D6CFC7] text-[#181615] hover:bg-[#EAE4DC]'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* THE OVERLAPPING STICKY CARDS */}
              <div className="relative w-full space-y-10 pb-12">
                {filteredProjects.map((project, index) => {
                  const p = coverProgress[index] || 0;
                  // As the next card slides up over this card, scale down slightly & push back in 3D space
                  const scale = 1 - p * 0.045;
                  const translateY = -p * 12;
                  const brightness = 1 - p * 0.18;
                  const stickyTopPx = 88 + index * 20;

                  return (
                    <div
                      key={project.id}
                      ref={(el) => {
                        slotRefs.current[index] = el;
                      }}
                      className="relative w-full min-h-[60vh] sm:min-h-[64vh]"
                    >
                      <div
                        style={{
                          top: `${stickyTopPx}px`,
                          zIndex: index + 10,
                          transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                          filter: p > 0.02 ? `brightness(${brightness.toFixed(2)})` : 'none',
                          transformOrigin: 'top center',
                        }}
                        className="sticky w-full transition-transform duration-100 ease-out"
                      >
                        <article
                          onClick={() => setActiveModalProject(project)}
                          className={`group relative w-full rounded-[32px] border p-6 sm:p-8 lg:p-10 transition-colors duration-300 cursor-pointer overflow-hidden ${
                            isDark
                              ? 'bg-[#171922]/96 border-[#2E3240] hover:border-amber-300/45 shadow-[0_-10px_35px_rgba(0,0,0,0.45),0_28px_60px_rgba(0,0,0,0.65)]'
                              : 'bg-[#FAF8F5]/98 border-[#CFC6BC] hover:border-[#1D3254]/45 shadow-[0_-8px_28px_rgba(24,22,21,0.06),0_24px_55px_rgba(24,22,21,0.12)]'
                          }`}
                          style={{
                            borderTopWidth: '4px',
                            borderTopColor: project.accentColor || door.themeColor,
                          }}
                        >
                          {/* Subtle Ambient Corner Glow */}
                          <div
                            className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-15 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none blur-3xl"
                            style={{ backgroundColor: project.accentColor || door.themeColor }}
                          />

                          {/* TOP STRIP OF THE STACKED CARD (Remains visible when overlapped by the next card!) */}
                          <div
                            className={`flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b ${
                              isDark ? 'border-white/10' : 'border-[#E5DEC3]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-extrabold text-white shadow-2xs"
                                style={{ backgroundColor: project.accentColor || door.themeColor }}
                              >
                                <span>
                                  {String(index + 1).padStart(2, '0')} /{' '}
                                  {String(filteredProjects.length).padStart(2, '0')}
                                </span>
                              </span>

                              <span
                                className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                                  isDark
                                    ? 'bg-white/5 border-white/10 text-amber-200'
                                    : 'bg-white border-[#DED7CE] text-[#1D3254]'
                                }`}
                              >
                                {project.category}
                              </span>

                              <span
                                className={`text-xs font-mono font-semibold ${
                                  isDark ? 'text-[#9E968C]' : 'text-[#7A7067]'
                                }`}
                              >
                                {project.year}
                              </span>
                            </div>

                            {/* Quick Action Links */}
                            <div
                              className="flex items-center gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {project.links?.live && (
                                <a
                                  href={project.links.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold inline-flex items-center gap-1.5 transition-all ${
                                    isDark
                                      ? 'bg-white/8 hover:bg-amber-300 text-white hover:text-[#14151B] border-white/15'
                                      : 'bg-white hover:bg-[#1D3254] text-[#181615] hover:text-white border-[#D5CEC6]'
                                  }`}
                                >
                                  <span>Live Demo</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}

                              {project.links?.github && (
                                <a
                                  href={project.links.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`GitHub repository for ${project.title}`}
                                  className={`p-2 rounded-full border transition-colors ${
                                    isDark
                                      ? 'bg-[#12141B] hover:bg-white/10 text-white border-[#2C2F3C]'
                                      : 'bg-white hover:bg-[#EAE4DC] text-[#181615] border-[#D5CEC6]'
                                  }`}
                                >
                                  <GithubIcon className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>

                          {/* CARD BODY: 2-COLUMN SPLIT (Left Specs, Right Layered Overlapping Showcase) */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Left Column: Project Details */}
                            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                              <div>
                                <h2
                                  className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight flex items-center gap-2 transition-colors ${
                                    isDark
                                      ? 'text-[#FAF7F2] group-hover:text-amber-300'
                                      : 'text-[#181615] group-hover:text-[#1D3254]'
                                  }`}
                                >
                                  <span>{project.title}</span>
                                  <ArrowUpRight className="w-6 h-6 shrink-0 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5 translate-x-0.5" />
                                </h2>

                                <p
                                  className={`mt-3 text-sm sm:text-base leading-relaxed ${
                                    isDark ? 'text-[#B8B0A6]' : 'text-[#544E49]'
                                  }`}
                                >
                                  {project.detailedDescription}
                                </p>
                              </div>

                              {/* Architectural Highlights */}
                              {project.highlights && project.highlights.length > 0 && (
                                <div className="space-y-2 pt-1">
                                  {project.highlights.map((pt, hIdx) => (
                                    <div
                                      key={hIdx}
                                      className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                                        isDark ? 'text-[#DFD8CF]' : 'text-[#3A3530]'
                                      }`}
                                    >
                                      <CheckCircle2
                                        className="w-4 h-4 mt-0.5 shrink-0"
                                        style={{ color: project.accentColor || door.themeColor }}
                                      />
                                      <span>{pt}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Metrics & Tech Tags */}
                              <div className="pt-2 space-y-3">
                                {project.metrics && (
                                  <div
                                    className={`inline-flex items-center gap-2 py-1.5 px-3.5 rounded-xl border text-xs font-mono font-semibold ${
                                      isDark
                                        ? 'bg-[#12141B] border-[#2A2D3A] text-amber-300'
                                        : 'bg-white border-[#E4DDD4] text-[#6B3A3F]'
                                    }`}
                                  >
                                    <span>⚡ {project.metrics}</span>
                                  </div>
                                )}

                                <div className="flex flex-wrap gap-1.5">
                                  {project.tags.map((t, idx) => (
                                    <span
                                      key={idx}
                                      className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-medium ${
                                        isDark
                                          ? 'bg-white/5 border-white/10 text-[#D0C8BE]'
                                          : 'bg-white border-[#DED7CE] text-[#4A443E]'
                                      }`}
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Primary CTA Button */}
                              <div className="pt-2 flex flex-wrap items-center gap-3">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveModalProject(project);
                                  }}
                                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono font-bold inline-flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                                    isDark
                                      ? 'bg-amber-300 hover:bg-amber-200 text-[#14151B]'
                                      : 'bg-[#181615] hover:bg-[#2C2826] text-white'
                                  }`}
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>Inspect Full Specs</span>
                                </button>
                              </div>
                            </div>

                            {/* Right Column: Layered Overlapping Showcase Cover + Floating Spec Card */}
                            <div className="lg:col-span-5 relative pb-3 pr-2">
                              <ProjectCardCover
                                pattern={project.coverPattern}
                                title={project.title}
                                accentColor={project.accentColor}
                                category={project.category}
                                year={project.year}
                                metrics={project.metrics}
                                tags={project.tags}
                                images={project.images}
                                variant="showcase"
                              />

                              {/* Extra Overlapping Floating Telemetry Card at Bottom-Right */}
                              <div
                                className={`hidden sm:flex absolute -bottom-2 -right-1 z-30 px-4 py-2.5 rounded-2xl border shadow-2xl items-center gap-3 rotate-2 group-hover:rotate-0 group-hover:-translate-y-1 transition-all duration-300 ${
                                  isDark
                                    ? 'bg-[#12141B]/95 border-amber-300/40 text-white'
                                    : 'bg-white/95 border-[#1D3254]/30 text-[#181615]'
                                }`}
                              >
                                <span
                                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                                  style={{ backgroundColor: project.accentColor || door.themeColor }}
                                />
                                <div className="text-left">
                                  <div className="text-[9px] font-mono uppercase tracking-widest opacity-60 font-bold">
                                    STACK LAYER 0{index + 1}
                                  </div>
                                  <div className="text-xs font-mono font-extrabold">
                                    {project.tech.slice(0, 2).join(' + ')}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* =================================================================
               MODE 2: BENTO GRID VIEW (With Overlapping 3D Cover Cards)
               ================================================================= */
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
                    {/* 3D Overlapping Cover */}
                    <ProjectCardCover
                      pattern={project.coverPattern}
                      title={project.title}
                      accentColor={project.accentColor}
                      category={project.category}
                      year={project.year}
                      metrics={project.metrics}
                      tags={project.tags}
                      images={project.images}
                      variant="compact"
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
          )}
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
