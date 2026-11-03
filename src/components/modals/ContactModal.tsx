'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../providers/ThemeProvider';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    honeypot: '', // Hidden bot trap
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState('');
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setTimeout(() => closeBtnRef.current?.focus(), 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      onClose();
      return;
    }

    const recipient = 'albertchristian.dev@gmail.com';
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nProject Scope & Goals:\n${formData.project}\n\nSent via albertchristian.dev portfolio.`
    );

    const generatedMailto = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setMailtoUrl(generatedMailto);
    setIsSubmitted(true);

    window.location.href = generatedMailto;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
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
            className={`relative z-10 w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-8 overflow-hidden ${
              isDark
                ? 'bg-[#181A22] border-[#2C2F3C] text-[#FAF7F2]'
                : 'bg-[#FAF8F5] border-[#D8D1C7] text-[#181615]'
            }`}
          >
            {/* Close Button */}
            <div
              className={`flex items-center justify-between border-b pb-4 mb-6 ${
                isDark ? 'border-white/10' : 'border-[#E6E0D6]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6B3A3F] dark:bg-amber-300" />
                <span
                  className={`font-mono text-xs uppercase tracking-[0.18em] font-bold ${
                    isDark ? 'text-amber-300' : 'text-[#1D3254]'
                  }`}
                >
                  PROJECT ENGAGEMENT
                </span>
              </div>

              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close contact dialog"
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#12141B] border-[#2C2F3C] text-white hover:bg-white/10'
                    : 'bg-white border-[#D8D1C7] text-[#181615] hover:bg-[#EAE4DC]'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isSubmitted ? (
              <>
                <h3
                  id="contact-modal-title"
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2"
                >
                  Got a project? <br />
                  <span className={isDark ? 'text-amber-300' : 'text-[#1D3254]'}>
                    Let’s build it together.
                  </span>
                </h3>

                <p className={`text-sm mb-6 ${isDark ? 'text-[#ACA49A]' : 'text-[#544E49]'}`}>
                  Whether you need custom ERP business systems, a performant web platform, or a native Android app.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website-hp">Leave this empty</label>
                    <input
                      id="website-hp"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </div>

                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="client-name"
                      className={`block text-xs font-mono uppercase tracking-wider font-semibold mb-1.5 ${
                        isDark ? 'text-[#B8B0A6]' : 'text-[#6E645A]'
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      placeholder="e.g., Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus-visible:ring-2 focus-visible:ring-[#6B3A3F] focus-visible:outline-none ${
                        isDark
                          ? 'bg-[#12141B] border-[#2C2F3C] text-white placeholder-[#6E6A64]'
                          : 'bg-white border-[#D8D1C7] text-[#181615] placeholder-[#9C9288]'
                      }`}
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="client-email"
                      className={`block text-xs font-mono uppercase tracking-wider font-semibold mb-1.5 ${
                        isDark ? 'text-[#B8B0A6]' : 'text-[#6E645A]'
                      }`}
                    >
                      Your Email Address
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      required
                      placeholder="sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus-visible:ring-2 focus-visible:ring-[#6B3A3F] focus-visible:outline-none ${
                        isDark
                          ? 'bg-[#12141B] border-[#2C2F3C] text-white placeholder-[#6E6A64]'
                          : 'bg-white border-[#D8D1C7] text-[#181615] placeholder-[#9C9288]'
                      }`}
                    />
                  </div>

                  {/* Project Scope Textarea */}
                  <div>
                    <label
                      htmlFor="client-project"
                      className={`block text-xs font-mono uppercase tracking-wider font-semibold mb-1.5 ${
                        isDark ? 'text-[#B8B0A6]' : 'text-[#6E645A]'
                      }`}
                    >
                      Project Details &amp; Timeline
                    </label>
                    <textarea
                      id="client-project"
                      required
                      rows={3}
                      placeholder="Tell me about what you are looking to build, target timeline, or tech requirements..."
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus-visible:ring-2 focus-visible:ring-[#6B3A3F] focus-visible:outline-none resize-none ${
                        isDark
                          ? 'bg-[#12141B] border-[#2C2F3C] text-white placeholder-[#6E6A64]'
                          : 'bg-white border-[#D8D1C7] text-[#181615] placeholder-[#9C9288]'
                      }`}
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div
                      className={`flex items-center gap-1.5 text-xs font-mono ${
                        isDark ? 'text-[#ACA49A]' : 'text-[#544E49]'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-[#6B3A3F] dark:text-amber-300" />
                      <span>Replies within 1 business day.</span>
                    </div>

                    <button
                      type="submit"
                      className={`py-3 px-6 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                        isDark
                          ? 'bg-amber-300 hover:bg-amber-200 text-[#14151B]'
                          : 'bg-[#1D3254] hover:bg-[#15223E] text-white'
                      }`}
                    >
                      <span>Send Project Brief</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-extrabold">Almost there!</h3>
                <p
                  className={`text-sm max-w-sm mx-auto leading-relaxed ${
                    isDark ? 'text-[#ACA49A]' : 'text-[#544E49]'
                  }`}
                >
                  Your mail client has been opened with your prefilled project message. If it didn’t open automatically, click the direct fallback link below:
                </p>

                <div className="pt-2">
                  <a
                    href={mailtoUrl}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold shadow-md ${
                      isDark
                        ? 'bg-amber-300 text-[#14151B]'
                        : 'bg-[#1D3254] text-white'
                    }`}
                  >
                    <span>Click to open Mail Client</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div
                  className={`pt-4 border-t text-xs font-mono ${
                    isDark ? 'border-white/10 text-[#9E968C]' : 'border-[#E6E0D6] text-[#7C6C5E]'
                  }`}
                >
                  Or email directly:{' '}
                  <a
                    href="mailto:albertchristian.dev@gmail.com"
                    className={`font-bold underline ${
                      isDark ? 'text-amber-300' : 'text-[#1D3254]'
                    }`}
                  >
                    albertchristian.dev@gmail.com
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
