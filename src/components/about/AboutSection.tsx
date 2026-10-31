import React from 'react'
import { Terminal, Lightbulb, Compass, Award, Building2, ArrowUpRight } from 'lucide-react'

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Authentic Founder Profile Card */}
        <div className="lg:col-span-5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/90 border border-emerald-600/25 mb-4 shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-xs font-mono font-medium text-emerald-900">About Me</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0d1912] tracking-tight leading-tight">
            Founder &amp; Software Builder.
          </h2>

          {/* Founder Photo & Krevia Digital Card */}
          <div className="mt-6 rounded-2xl glass-panel p-5 border border-emerald-900/15 relative overflow-hidden group shadow-lg">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 border border-emerald-900/15 bg-emerald-50">
              <img
                src="/character/albert_photo.jpg"
                alt="Albert Christian — Founder of Krevia Digital"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div>
                  <span className="text-white font-display font-semibold text-sm">
                    Albert Christian
                  </span>
                  <p className="text-[11px] font-mono text-emerald-300 font-medium">
                    Founder @ Krevia Digital
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-emerald-200 border border-white/20">
                  Pekanbaru, ID
                </span>
              </div>
            </div>

            {/* Krevia Digital Link Card */}
            <a
              href="https://kreviadigitalid.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-600/25 hover:border-emerald-500 hover:bg-emerald-100/90 transition-all flex items-center justify-between text-left group/krevia shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-emerald-950 group-hover/krevia:text-emerald-800 transition-colors">
                    Krevia Digital Platform
                  </div>
                  <div className="text-[11px] font-mono text-emerald-700">
                    kreviadigitalid.my.id
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-700 group-hover/krevia:translate-x-0.5 group-hover/krevia:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Quick Stats / Authenticated Attributes */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/90 border border-emerald-900/15 shadow-sm">
              <span className="text-2xl font-display font-bold text-emerald-700">8</span>
              <p className="text-xs font-mono text-zinc-600 mt-1">Verified Public Repositories</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-emerald-900/15 shadow-sm">
              <span className="text-2xl font-display font-bold text-teal-700">Modular ERP</span>
              <p className="text-xs font-mono text-zinc-600 mt-1">Platform Architecture</p>
            </div>
          </div>
        </div>

        {/* Right Column: Key Areas of Exploration */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Pillar 0: Krevia Digital Focus */}
          <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-emerald-500/30 bg-emerald-50/80 shadow-md">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-600 text-white shrink-0 shadow-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-display font-semibold text-emerald-950">
                    Founder of Krevia Digital
                  </h3>
                  <a
                    href="https://kreviadigitalid.my.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-medium"
                  >
                    <span>kreviadigitalid.my.id</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <p className="mt-1.5 text-sm text-zinc-700 leading-relaxed">
                  As the founder of <strong>Krevia Digital</strong>, I architect modular ERP software platforms engineered to unify fragmented operations, inventory tracking, field workflows, and financial oversight for growing businesses—spanning construction, project contractors, retail, and hospitality.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 1: Full-Stack Enterprise Architecture */}
          <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-emerald-900/15 bg-white/90 shadow-md">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-teal-100 text-teal-800 border border-teal-200 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-zinc-900">
                  Full-Stack Enterprise Systems
                </h3>
                <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
                  Engineered and deployed operational software suites including the <strong>SIPU Management System</strong> and <strong>IT Helpdesk</strong> for Swiss-Belinn SKA Pekanbaru. Built with Laravel 11, React, Inertia.js, and PostgreSQL to streamline daily shift attendance, geolocation verification, Kanban task assignment, hardware maintenance logs, and payroll.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 2: Applied AI & Deep Learning */}
          <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-emerald-900/15 bg-white/90 shadow-md">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-zinc-900">
                  Applied Machine Learning &amp; AI
                </h3>
                <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
                  Developed sequential deep learning recommendation models in <strong>FashionAI (ProjectDL)</strong> using Gated Recurrent Unit (GRU) neural networks with FastAPI serving, and decision intelligence algorithms for food waste reduction and demand forecasting in <strong>StockSense AI</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 3: Interactive & Civic WebGIS */}
          <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-emerald-900/15 bg-white/90 shadow-md">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-100 text-amber-800 border border-amber-200 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-zinc-900">
                  Smart City &amp; Spatial Platforms
                </h3>
                <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
                  Frontend developer for <strong>WebGIS Sampah</strong> with Kelompok FFAC (Politeknik Caltex Riau) using OpenLayers and Next.js 14, alongside the <strong>Kota Pekanbaru</strong> digital portal with inertial Lenis scrolling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
