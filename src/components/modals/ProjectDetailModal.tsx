'use client';

import React, { useEffect, useRef } from 'react';
import { ProjectCard } from '@/data/doorsData';
import { X, ExternalLink, CheckCircle2, Calendar, Layers } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  project: ProjectCard | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Esc key listener and focus trap
  useEffect(() => {
    if (!project) return;

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Simple focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1818]/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FAF8F5] border border-[#D9D4CE] shadow-2xl p-6 sm:p-8"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-[#E6E2DC] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.accentColor }}
                />
                <span className="font-mono text-xs uppercase tracking-widest text-[#6B3A3F] font-bold">
                  {project.category}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close modal dialog"
                className="p-2 rounded-full bg-white border border-[#D9D4CE] text-[#1A1818] hover:bg-[#E6E2DC] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#6B3A3F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Metadata */}
            <h3
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-extrabold text-[#1A1818] tracking-tight mb-2"
            >
              {project.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#544E49] mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#6B3A3F]" />
                {project.year}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#1F2F55]" />
                {project.tags.join(', ')}
              </span>
            </div>

            {/* Detailed Description */}
            <div className="mb-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#7C6C5E] font-semibold mb-2">
                Overview &amp; Architecture
              </h4>
              <p className="text-sm sm:text-base text-[#1A1818]/90 leading-relaxed">
                {project.detailedDescription}
              </p>
            </div>

            {/* Metrics Callout */}
            {project.metrics && (
              <div className="mb-6 p-3.5 rounded-xl bg-white border border-[#D9D4CE] flex items-center gap-2.5 text-xs font-mono font-medium text-[#1F2F55]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Key Metric / Impact:</strong> {project.metrics}
                </span>
              </div>
            )}

            {/* Tech Stack List */}
            <div className="mb-8">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#7C6C5E] font-semibold mb-2">
                Tech &amp; Tools Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-white border border-[#D9D4CE] text-xs font-mono font-medium text-[#1A1818]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E6E2DC]">
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 rounded-xl bg-[#1F2F55] hover:bg-[#15223E] text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Visit Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#D9D4CE] text-[#1A1818] text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="ml-auto py-2.5 px-5 rounded-xl text-xs font-mono uppercase tracking-wider text-[#544E49] hover:text-[#1A1818] cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
