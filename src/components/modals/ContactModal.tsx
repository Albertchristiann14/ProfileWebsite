'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
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

    // If honeypot is filled, silent reject (bot detected)
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

    // Trigger user's mail client
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
            className="fixed inset-0 bg-[#1A1818]/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-lg rounded-3xl bg-[#FAF8F5] border border-[#D9D4CE] shadow-2xl p-6 sm:p-8 overflow-hidden"
          >
            {/* Close Button */}
            <div className="flex items-center justify-between border-b border-[#E6E2DC] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6B3A3F]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#1F2F55] font-bold">
                  PROJECT ENGAGEMENT
                </span>
              </div>

              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close contact dialog"
                className="p-2 rounded-full bg-white border border-[#D9D4CE] text-[#1A1818] hover:bg-[#E6E2DC] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#6B3A3F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isSubmitted ? (
              <>
                <h3
                  id="contact-modal-title"
                  className="text-2xl sm:text-3xl font-extrabold text-[#1A1818] tracking-tight mb-2"
                >
                  Got a project? <br />
                  <span className="text-[#1F2F55]">Let’s build it together.</span>
                </h3>

                <p className="text-sm text-[#544E49] mb-6">
                  Whether you need custom ERP business systems, a performant web platform, or a native Android app.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (hidden from real users) */}
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
                      className="block text-xs font-mono uppercase tracking-wider text-[#7C6C5E] font-semibold mb-1.5"
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
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D9D4CE] text-sm text-[#1A1818] placeholder-[#9C9288] focus-visible:ring-2 focus-visible:ring-[#6B3A3F] focus-visible:outline-none"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="client-email"
                      className="block text-xs font-mono uppercase tracking-wider text-[#7C6C5E] font-semibold mb-1.5"
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
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D9D4CE] text-sm text-[#1A1818] placeholder-[#9C9288] focus-visible:ring-2 focus-visible:ring-[#6B3A3F] focus-visible:outline-none"
                    />
                  </div>

                  {/* Project Scope Textarea */}
                  <div>
                    <label
                      htmlFor="client-project"
                      className="block text-xs font-mono uppercase tracking-wider text-[#7C6C5E] font-semibold mb-1.5"
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
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D9D4CE] text-sm text-[#1A1818] placeholder-[#9C9288] focus-visible:ring-2 focus-visible:ring-[#6B3A3F] focus-visible:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#544E49] font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#6B3A3F]" />
                      <span>I reply within one business day.</span>
                    </div>

                    <button
                      type="submit"
                      className="py-3 px-6 rounded-xl bg-[#1F2F55] hover:bg-[#15223E] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                      <span>Send Project Brief</span>
                      <Send className="w-3.5 h-3.5 text-amber-300" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success / "Almost there" fallback state */
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-extrabold text-[#1A1818]">Almost there!</h3>
                <p className="text-sm text-[#544E49] max-w-sm mx-auto leading-relaxed">
                  Your mail client has been opened with your prefilled project message. If it didn’t open automatically, click the direct fallback link below:
                </p>

                <div className="pt-2">
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F2F55] text-white text-xs font-mono uppercase tracking-wider font-bold shadow-md hover:bg-[#15223E]"
                  >
                    <span>Click to open Mail Client</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </a>
                </div>

                <div className="pt-4 border-t border-[#E6E2DC] text-xs font-mono text-[#7C6C5E]">
                  Or email directly:{' '}
                  <a
                    href="mailto:albertchristian.dev@gmail.com"
                    className="font-bold text-[#1F2F55] underline"
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
