'use client';

import React, { useState } from 'react';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { HangingPullCord } from '@/components/layout/HangingPullCord';
import { HeroRishiStyle } from '@/components/hero/HeroRishiStyle';
import { DoorsHallway } from '@/components/doors/DoorsHallway';
import { StoryTimeline } from '@/components/timeline/StoryTimeline';
import { Footer } from '@/components/layout/Footer';
import { ContactModal } from '@/components/modals/ContactModal';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { CookieConsent } from '@/components/analytics/CookieConsent';
import { StackPreloader } from '@/components/preloader/StackPreloader';

export default function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      {/* 1. Preloader Screen (Image 2: Stack of 6 colored pills + 100 counter) */}
      <StackPreloader onFinish={() => {}} />

      {/* Skip link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#6B3A3F] text-white rounded-lg text-xs font-mono shadow-xl"
      >
        Skip to main content
      </a>

      {/* Hanging Pull-Cord in Top Right (Image 1) */}
      <HangingPullCord />

      {/* Global Header Navigation */}
      <HeaderNav onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Content Area */}
      <main id="main-content" className="relative flex flex-col w-full">
        {/* Hero Section (Image 1: Flip Desk Calendar + Cutout Portrait + Ability Card Pill + Status Bar) */}
        <HeroRishiStyle onOpenContact={() => setIsContactOpen(true)} />

        {/* The Hallway of 5 Arched Doors */}
        <DoorsHallway />

        {/* Story Section: Let's go back in time */}
        <StoryTimeline />
      </main>

      {/* Footer & CTA Section */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Modals & Persistent Global UI */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ScrollProgress />
      <CookieConsent />
    </>
  );
}
