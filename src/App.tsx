import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { Navigation } from '@/components/layout/Navigation'
import { HeroSection } from '@/components/hero/HeroSection'
import { AboutSection } from '@/components/about/AboutSection'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { TechnologySection } from '@/components/technologies/TechnologySection'
import { ContactSection } from '@/components/contact/ContactSection'
import { Footer } from '@/components/layout/Footer'

export function App() {
  const [isLaughing, setIsLaughing] = useState(false)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#f8faf7] text-[#0f1a14] selection:bg-emerald-500/20 selection:text-emerald-900 overflow-x-clip">
      {/* Global Ambient Glows (Gentle daylight sunlit meshes for seamless flow) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-400/10 blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 -left-48 w-[600px] h-[600px] bg-teal-300/10 blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-2/3 -right-48 w-[600px] h-[600px] bg-amber-200/15 blur-[160px] pointer-events-none -z-10" />

      {/* Top Header Navigation */}
      <Navigation
        onContactHover={setIsLaughing}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Interactive 3D Character */}
        <HeroSection
          isLaughing={isLaughing}
          onContactHover={setIsLaughing}
        />

        {/* About Section */}
        <AboutSection />

        {/* Selected Projects Portfolio (Featured & Grid) */}
        <ProjectGrid />

        {/* Verified Technical Stack */}
        <TechnologySection />

        {/* Contact & Collaboration Section */}
        <ContactSection
          onContactHover={setIsLaughing}
        />
      </main>

      {/* Global Editorial Footer */}
      <Footer />
    </div>
  )
}

export default App
