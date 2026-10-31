import { useState } from 'react'
import { Mail, ArrowUpRight, MessageSquare, Copy, Check, Sparkles } from 'lucide-react'
import { GithubIcon } from '@/components/icons/GithubIcon'

interface ContactSectionProps {
  onContactHover: (hovering: boolean) => void
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onContactHover }) => {
  const [copied, setCopied] = useState(false)
  const contactEmail = 'albertchristian.dev@gmail.com' // Clean verified placeholder point

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative">
      <div className="relative rounded-3xl bg-white/95 p-8 sm:p-14 border border-emerald-900/15 overflow-hidden text-center shadow-[0_12px_40px_rgba(20,45,30,0.06)]">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[120px] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ecf4ee] border border-emerald-900/15 mb-6">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
          <span className="text-xs font-mono text-emerald-800 font-medium">
            Let&apos;s Build Together
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-zinc-900 tracking-tight max-w-3xl mx-auto leading-tight">
          Have an interesting project or engineering challenge?
        </h2>

        <p className="mt-6 text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          I am always open to exploring modern web applications, AI integrations, and full-stack software development opportunities.
        </p>

        {/* Contact Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Main Interactive Button (Triggers 3D character laugh/smile reaction) */}
          <a
            href="https://github.com/KeijiChoco14"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => onContactHover(true)}
            onMouseLeave={() => onContactHover(false)}
            className="group px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-all flex items-center gap-2.5 shadow-lg shadow-emerald-900/10 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Connect on GitHub</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-100 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Email Trigger / Copy */}
          <button
            type="button"
            onClick={handleCopyEmail}
            onMouseEnter={() => onContactHover(true)}
            onMouseLeave={() => onContactHover(false)}
            className="px-6 py-4 rounded-full bg-[#ecf4ee] border border-emerald-900/15 hover:border-emerald-500 text-zinc-800 font-medium text-sm hover:bg-[#dfeee2] transition-all flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            title="Copy contact email"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-700" />
                <span className="text-emerald-700 font-semibold">Email Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-emerald-700" />
                <span>{contactEmail}</span>
                <Copy className="w-3.5 h-3.5 text-zinc-500" />
              </>
            )}
          </button>

          {/* Krevia Digital Direct Link */}
          <a
            href="https://kreviadigitalid.my.id"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => onContactHover(true)}
            onMouseLeave={() => onContactHover(false)}
            className="px-6 py-4 rounded-full bg-[#ecf4ee] border border-emerald-600/30 hover:border-emerald-600 hover:bg-[#dfeee2] text-emerald-800 font-medium text-sm transition-all flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Krevia Digital (ERP)</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-700" />
          </a>
        </div>

        {/* Character Reaction Microcopy */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs font-mono text-zinc-500">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Hover over contact actions to see the character react!</span>
        </div>
      </div>
    </section>
  )
}
