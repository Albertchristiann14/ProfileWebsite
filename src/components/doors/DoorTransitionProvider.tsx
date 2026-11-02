'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface DoorTransitionContextType {
  isWalkingThrough: boolean;
  activeDoorRoute: string | null;
  walkThroughPhase: 'idle' | 'swing' | 'zoom' | 'flash' | 'exiting';
  triggerWalkThrough: (route: string) => void;
  triggerDoorReturn: (targetRoute?: string) => void;
}

const DoorTransitionContext = createContext<DoorTransitionContextType>({
  isWalkingThrough: false,
  activeDoorRoute: null,
  walkThroughPhase: 'idle',
  triggerWalkThrough: () => {},
  triggerDoorReturn: () => {},
});

export const useDoorTransition = () => useContext(DoorTransitionContext);

export function DoorTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isWalkingThrough, setIsWalkingThrough] = useState(false);
  const [activeDoorRoute, setActiveDoorRoute] = useState<string | null>(null);
  const [walkThroughPhase, setWalkThroughPhase] = useState<'idle' | 'swing' | 'zoom' | 'flash' | 'exiting'>('idle');

  // Reset transition state once navigation finishes
  useEffect(() => {
    if (isWalkingThrough) {
      const timer = setTimeout(() => {
        setIsWalkingThrough(false);
        setWalkThroughPhase('idle');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [pathname, isWalkingThrough]);

  const triggerWalkThrough = useCallback((route: string) => {
    if (isWalkingThrough) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setActiveDoorRoute(route);
    setIsWalkingThrough(true);

    if (prefersReducedMotion) {
      router.push(route);
      return;
    }

    // Sequence: Swing (300ms) -> Zoom (400ms) -> Flash (250ms) -> Navigate
    setWalkThroughPhase('swing');

    setTimeout(() => {
      setWalkThroughPhase('zoom');
    }, 280);

    setTimeout(() => {
      setWalkThroughPhase('flash');
    }, 600);

    setTimeout(() => {
      router.push(route);
    }, 850);
  }, [isWalkingThrough, router]);

  const triggerDoorReturn = useCallback((targetRoute = '/') => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      router.push(targetRoute);
      return;
    }

    setWalkThroughPhase('exiting');
    setIsWalkingThrough(true);

    setTimeout(() => {
      router.push(targetRoute);
    }, 450);
  }, [router]);

  return (
    <DoorTransitionContext.Provider
      value={{
        isWalkingThrough,
        activeDoorRoute,
        walkThroughPhase,
        triggerWalkThrough,
        triggerDoorReturn,
      }}
    >
      {children}

      {/* Cinematic Walk-Through Overlay */}
      <AnimatePresence>
        {isWalkingThrough && walkThroughPhase === 'zoom' && (
          <motion.div
            key="walk-zoom"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 0.8, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 pointer-events-none bg-gradient-to-b from-[#FAF7F2]/40 to-[#1F2F55]/60 backdrop-blur-[2px]"
          />
        )}

        {isWalkingThrough && walkThroughPhase === 'flash' && (
          <motion.div
            key="walk-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 pointer-events-none bg-[#FAF7F2]"
          />
        )}

        {isWalkingThrough && walkThroughPhase === 'exiting' && (
          <motion.div
            key="walk-exit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 pointer-events-none bg-[#E6E2DC]"
          />
        )}
      </AnimatePresence>
    </DoorTransitionContext.Provider>
  );
}
