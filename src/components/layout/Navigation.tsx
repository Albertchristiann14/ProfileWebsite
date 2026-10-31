import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/icons/GithubIcon'

interface NavigationProps {
  onContactClick?: () => void
  onContactHover?: (hovering: boolean) => void
}

export const Navigation: React.FC<NavigationProps> = ({
  onContactClick,
  onContactHover
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Stack', href: '#technologies' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/85 backdrop-blur-xl border-b border-emerald-950/10 shadow-lg shadow-emerald-950/5'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Wordmark Logo with Status Indicator */}
        <a
          href="#home"
          className="group flex items-center gap-3 text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
        >
          <div className="flex flex-col">
            <span className="font-display font-semibold text-lg tracking-tight group-hover:text-emerald-700 transition-colors">
              Albert Christian
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Founder @ Krevia Digital</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/80 border border-emerald-900/15 backdrop-blur-md shadow-sm"
          aria-label="Main menu"
        >
          {navLinks.map((link) => {
            const isContact = link.href === '#contact'
            return (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={isContact ? () => onContactHover?.(true) : undefined}
                onMouseLeave={isContact ? () => onContactHover?.(false) : undefined}
                onClick={isContact ? onContactClick : undefined}
                className="px-4 py-1.5 text-xs font-medium text-zinc-700 hover:text-emerald-900 hover:bg-emerald-50/80 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* External Actions & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://kreviadigitalid.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-600/25 hover:border-emerald-500 hover:bg-emerald-100/90 text-xs font-mono text-emerald-900 transition-all shadow-sm"
            aria-label="Visit Krevia Digital"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Krevia Digital</span>
            <ArrowUpRight className="w-3 h-3 text-emerald-700" />
          </a>

          <a
            href="https://github.com/KeijiChoco14"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-emerald-900/15 hover:border-emerald-500 text-xs font-medium text-zinc-800 hover:text-zinc-950 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="GitHub profile of KeijiChoco14"
          >
            <GithubIcon className="w-3.5 h-3.5 text-zinc-800" />
            <span className="hidden sm:inline">KeijiChoco14</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-emerald-900/15 text-zinc-800 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-sm"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[70px] bg-white/95 backdrop-blur-2xl border-b border-emerald-950/10 px-6 py-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-800 hover:text-emerald-900 hover:bg-emerald-50 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <a
              href="https://kreviadigitalid.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-between px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-600/25 text-sm font-medium text-emerald-900"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Krevia Digital (kreviadigitalid.my.id)
              </span>
              <ArrowUpRight className="w-4 h-4 text-emerald-700" />
            </a>

            <a
              href="https://github.com/KeijiChoco14"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-sm font-medium text-zinc-800"
            >
              <span className="flex items-center gap-2">
                <GithubIcon className="w-4 h-4 text-zinc-800" />
                GitHub — KeijiChoco14
              </span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500" />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
