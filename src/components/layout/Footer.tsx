import React from 'react'
import { GithubIcon } from '@/components/icons/GithubIcon'

const CURRENT_YEAR = 2026

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#f8faf7] text-zinc-600 text-xs relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-emerald-950/10 pt-8">
        {/* Left: Branding */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span className="font-display font-semibold text-zinc-900 text-base">
            Albert Christian
          </span>
          <p className="text-zinc-600">
            Founder of{' '}
            <a
              href="https://kreviadigitalid.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-medium underline decoration-emerald-500/40"
            >
              Krevia Digital
            </a>{' '}
            • Developer &amp; Product Builder • Pekanbaru, ID
          </p>
        </div>

        {/* Center: Nav links */}
        <div className="flex items-center gap-6 font-mono text-xs">
          <a href="#home" className="hover:text-emerald-700 transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-emerald-700 transition-colors">
            About
          </a>
          <a href="#projects" className="hover:text-emerald-700 transition-colors">
            Projects
          </a>
          <a href="#technologies" className="hover:text-emerald-700 transition-colors">
            Stack
          </a>
          <a href="#contact" className="hover:text-emerald-700 transition-colors">
            Contact
          </a>
        </div>

        {/* Right: GitHub & Copyright */}
        <div className="flex items-center gap-4 text-center md:text-right">
          <a
            href="https://github.com/KeijiChoco14"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#ecf4ee] border border-emerald-900/15 text-zinc-700 hover:text-emerald-800 hover:border-emerald-600 transition-colors"
            aria-label="GitHub profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <span className="font-mono text-zinc-500">
            © {CURRENT_YEAR} Albert Christian
          </span>
        </div>
      </div>
    </footer>
  )
}
