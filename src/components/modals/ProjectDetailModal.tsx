'use client';

import React, { useEffect, useRef } from 'react';
import { ProjectCard } from '@/data/doorsData';
import { X, ExternalLink, CheckCircle2, Calendar, Layers } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../providers/ThemeProvider';

interface ModalProps {
  project: ProjectCard | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ModalProps) {
  const { isDark } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

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
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 ${
              isDark
                ? 'bg-[#181A22] border-[#2C2F3C] text-[#FAF7F2]'
                : 'bg-[#FAF8F5] border-[#D8D1C7] text-[#181615]'
            }`}
          >
            {/* Top Bar */}
            <div
              className={`flex items-center justify-between border-b pb-4 mb-6 ${
                isDark ? 'border-white/10' : 'border-[#E6E0D6]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.accentColor }}
                />
                <span
                  className={`font-mono text-xs uppercase tracking-[0.18em] font-bold ${
                    isDark ? 'text-amber-300' : 'text-[#6B3A3F]'
                  }`}
                >
                  {project.category}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close modal dialog"
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#12141B] border-[#2C2F3C] text-white hover:bg-white/10'
                    : 'bg-white border-[#D8D1C7] text-[#181615] hover:bg-[#EAE4DC]'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Metadata */}
            <h3
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2"
            >
              {project.title}
            </h3>

            <div
              className={`flex flex-wrap items-center gap-3 text-xs font-mono mb-6 ${
                isDark ? 'text-[#ACA49A]' : 'text-[#544E49]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#6B3A3F] dark:text-amber-300" />
                {project.year}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#1D3254] dark:text-amber-200" />
                {project.tags.join(', ')}
              </span>
            </div>

            {/* Detailed Description */}
            <div className="mb-6">
              <h4
                className={`font-mono text-xs uppercase tracking-wider font-semibold mb-2 ${
                  isDark ? 'text-[#9E968C]' : 'text-[#7C6C5E]'
                }`}
              >
                Overview &amp; Architecture
              </h4>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-[#DFD8CF]' : 'text-[#181615]/90'
                }`}
              >
                {project.detailedDescription}
              </p>
            </div>

            {/* Metrics Callout */}
            {project.metrics && (
              <div
                className={`mb-6 p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-mono font-medium ${
                  isDark
                    ? 'bg-[#12141B] border-[#2C2F3C] text-amber-200'
                    : 'bg-white border-[#D8D1C7] text-[#1D3254]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  <strong>Key Metric / Impact:</strong> {project.metrics}
                </span>
              </div>
            )}

            {/* Tech Stack List */}
            <div className="mb-8">
              <h4
                className={`font-mono text-xs uppercase tracking-wider font-semibold mb-2.5 ${
                  isDark ? 'text-[#9E968C]' : 'text-[#7C6C5E]'
                }`}
              >
                Tech &amp; Tools Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-lg border text-xs font-mono font-medium ${
                      isDark
                        ? 'bg-[#12141B] border-[#2C2F3C] text-[#FAF7F2]'
                        : 'bg-white border-[#D8D1C7] text-[#181615]'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div
              className={`flex flex-wrap items-center gap-3 pt-4 border-t ${
                isDark ? 'border-white/10' : 'border-[#E6E0D6]'
              }`}
            >
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`py-2.5 px-5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
                    isDark
                      ? 'bg-amber-300 hover:bg-amber-200 text-[#14151B]'
                      : 'bg-[#1D3254] hover:bg-[#15223E] text-white'
                  }`}
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
                  className={`py-2.5 px-5 rounded-xl border text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-2 shadow-2xs cursor-pointer ${
                    isDark
                      ? 'bg-[#12141B] hover:bg-white/10 border-[#2C2F3C] text-white'
                      : 'bg-white hover:bg-[#EAE4DC] border-[#D8D1C7] text-[#181615]'
                  }`}
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className={`ml-auto py-2.5 px-5 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer ${
                  isDark
                    ? 'text-[#ACA49A] hover:text-white'
                    : 'text-[#544E49] hover:text-[#181615]'
                }`}
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
