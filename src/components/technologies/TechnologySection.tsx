import React, { useState } from 'react'
import { technologiesData } from '@/data/technologiesData'
import { TechItem } from '@/types/portfolio'
import { Cpu, Layout, Server, Database, Wrench } from 'lucide-react'

export const TechnologySection: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>('All')

  const groups: TechItem['category'][] = [
    'Frontend',
    'Backend',
    'AI & Data',
    'Database & Mobile',
    'Dev Tools & Cloud'
  ]

  const getGroupIcon = (category: TechItem['category']) => {
    switch (category) {
      case 'Frontend':
        return <Layout className="w-4 h-4 text-emerald-600" />
      case 'Backend':
        return <Server className="w-4 h-4 text-teal-600" />
      case 'AI & Data':
        return <Cpu className="w-4 h-4 text-emerald-700" />
      case 'Database & Mobile':
        return <Database className="w-4 h-4 text-teal-700" />
      case 'Dev Tools & Cloud':
        return <Wrench className="w-4 h-4 text-amber-600" />
    }
  }

  const filtered =
    activeGroup === 'All'
      ? technologiesData
      : technologiesData.filter((t) => t.category === activeGroup)

  return (
    <section id="technologies" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div className="text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ecf4ee] border border-emerald-900/15 mb-4">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-mono text-emerald-800 font-medium">
              Verified Technical Stack
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-zinc-900 tracking-tight">
            Tools, Frameworks &amp; Systems
          </h2>

          <p className="mt-3 text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
            Technologies confirmed across my active codebases, repository manifests, dependency trees, and system architectures.
          </p>
        </div>

        {/* Group Selector */}
        <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveGroup('All')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeGroup === 'All'
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'bg-[#ecf4ee] text-zinc-700 hover:text-zinc-950 border border-emerald-900/15'
            }`}
          >
            All Categories
          </button>
          {groups.map((grp) => (
            <button
              key={grp}
              type="button"
              onClick={() => setActiveGroup(grp)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                activeGroup === grp
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'bg-[#ecf4ee] text-zinc-700 hover:text-zinc-950 border border-emerald-900/15'
              }`}
            >
              {grp}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        {filtered.map((item) => (
          <div
            key={item.name}
            className="group p-5 rounded-2xl bg-white/95 border border-emerald-900/15 hover:border-emerald-500/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="font-display font-semibold text-zinc-900 text-base group-hover:text-emerald-700 transition-colors">
                {item.name}
              </span>
              <div className="p-1.5 rounded-lg bg-[#ecf4ee] border border-emerald-900/15">
                {getGroupIcon(item.category)}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold">
                Category: <span className="text-zinc-700 font-normal">{item.category}</span>
              </span>
              <div className="text-[11px] text-zinc-600 leading-snug">
                <span>Verified in: </span>
                <span className="text-emerald-800 font-mono font-medium">
                  {item.repoEvidence.join(', ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
