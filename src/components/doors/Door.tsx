'use client';

import React, { useRef } from 'react';
import { DoorItem } from '@/data/doorsData';
import { useDoorTransition } from './DoorTransitionProvider';
import { ArrowRight } from 'lucide-react';

interface DoorProps {
  door: DoorItem;
  isActive: boolean;
  isGhosted: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
}

export function Door({
  door,
  isActive,
  isGhosted,
  onHover,
  onLeave,
  onSelect,
}: DoorProps) {
  const doorRef = useRef<HTMLDivElement>(null);
  const { triggerWalkThrough, activeDoorRoute, walkThroughPhase } = useDoorTransition();

  const isCurrentWalkingDoor = activeDoorRoute === door.route;

  const handleDoorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    triggerWalkThrough(door.route);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
      triggerWalkThrough(door.route);
    }
  };

  // Determine door rotation: open slightly on hover/active, or wide open on walkthrough
  let rotation = 0;
  if (
    isCurrentWalkingDoor &&
    (walkThroughPhase === 'swing' || walkThroughPhase === 'zoom' || walkThroughPhase === 'flash')
  ) {
    rotation = -82; // Fully swung open for walk-through
  } else if (isActive) {
    rotation = -24; // Swung open on hover/active
  }

  return (
    <div
      ref={doorRef}
      role="button"
      tabIndex={0}
      aria-label={`Door ${door.doorNumber} — ${door.plateText}: ${door.title}`}
      aria-expanded={isActive}
      onClick={handleDoorClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative flex-shrink-0 cursor-pointer select-none transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6B3A3F] rounded-t-[135px] w-[196px] sm:w-[208px] md:w-[216px] xl:w-[224px] h-[390px] sm:h-[420px] md:h-[445px] xl:h-[465px] snap-center ${
        isGhosted
          ? 'opacity-45 lg:opacity-15 lg:blur-[1px] scale-[0.97] pointer-events-auto'
          : isActive
          ? 'opacity-100 scale-[1.02] z-20 pointer-events-auto'
          : 'opacity-100 scale-100 pointer-events-auto'
      }`}
    >
      {/* Warm Ambient Sconce Glow behind active door */}
      <div
        className={`absolute -inset-6 -z-10 rounded-t-[150px] blur-2xl transition-opacity duration-500 pointer-events-none ${
          isActive ? 'opacity-95' : 'opacity-0 group-hover:opacity-60'
        }`}
        style={{
          background: `radial-gradient(circle at 50% 55%, ${door.glowColor}, rgba(255, 225, 140, 0.28) 45%, transparent 75%)`,
        }}
      />

      {/* OUTER ARCH FRAME (Sculpted plaster moulding) */}
      <div className="door-arch-outer relative w-full h-full p-2.5 flex flex-col items-center">
        {/* INNER ARCH FRAME (Recessed casing) */}
        <div className="door-arch-inner relative w-full h-full p-1.5 flex flex-col justify-end overflow-hidden">
          {/* DOORWAY INTERIOR / ROOM BEYOND (Revealed when door swings open) */}
          <div
            className="absolute inset-0 z-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 35% 45%, #FFFDF5 0%, #F5DE9B 42%, ${door.doorDepthColor} 100%)`,
            }}
          >
            {/* Warm room light spill */}
            <div className="w-full h-full opacity-35 bg-gradient-to-b from-amber-200/40 via-transparent to-black/40" />
          </div>

          {/* 3D DOOR LEAF (The physical swinging wooden door) */}
          <div
            className="door-perspective-card relative z-10 w-full h-full rounded-t-[120px] overflow-hidden transition-transform duration-500 ease-out"
            style={{
              backgroundColor: door.themeColor,
              transformOrigin: 'left center',
              transform: `perspective(1100px) rotateY(${rotation}deg)`,
              boxShadow: rotation < -5 ? '12px 14px 30px -4px rgba(0,0,0,0.55)' : 'none',
            }}
          >
            {/* Tactile Fluting / Vertical Wooden Ribs */}
            <div className="door-fluting absolute inset-0 w-full h-full pointer-events-none" />

            {/* Subtle top arch highlight sheen */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25 pointer-events-none" />

            {/* Perimeter door frame border */}
            <div className="absolute inset-2 rounded-t-[110px] border border-white/15 pointer-events-none" />

            {/* DOOR NUMBER BADGE IN ARCH */}
            <div className="absolute top-11 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/25 border border-white/15 backdrop-blur-2xs">
              <span className="font-mono text-[10px] font-bold tracking-widest text-amber-200/90">
                {door.doorNumber}
              </span>
            </div>

            {/* BRASS NAMEPLATE (Centered on door) */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-36 sm:w-40 px-2.5 py-2 rounded-xs brass-plate flex flex-col items-center justify-center select-none shadow-md">
              {/* 4 Brass Screws at Corners */}
              <div className="brass-screw absolute top-1 left-1" />
              <div className="brass-screw absolute top-1 right-1" />
              <div className="brass-screw absolute bottom-1 left-1" />
              <div className="brass-screw absolute bottom-1 right-1" />

              <span className="text-[9.5px] sm:text-[10px] font-mono uppercase font-black tracking-widest text-[#382609] text-center leading-tight">
                {door.plateText}
              </span>
            </div>

            {/* "CLICK TO ENTER" PILL (Appears when door is active) */}
            <div
              className={`absolute top-44 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-[#181615]/90 hover:bg-black text-white text-[11px] font-mono tracking-wider shadow-xl backdrop-blur-xs flex items-center gap-1.5 transition-all duration-200 border border-white/20 z-20 whitespace-nowrap ${
                isActive
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
              }`}
            >
              <span>Enter room</span>
              <ArrowRight className="w-3 h-3 text-amber-300" />
            </div>

            {/* BRASS LEVER HANDLE & KEYHOLE (Right edge) */}
            <div className="absolute top-[235px] sm:top-[250px] right-3 flex flex-col items-center pointer-events-none">
              {/* Brass escutcheon plate */}
              <div className="w-3.5 h-15 rounded-md gold-lever-base border border-[#5E4315] p-1 flex flex-col items-center justify-between shadow-md">
                {/* Upper screw */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#4A340D]" />

                {/* Lever Handle Arm pointing left */}
                <div
                  className="relative w-6.5 h-2.5 -left-2.5 gold-lever-arm border border-[#523A0E] flex items-center justify-end px-1 transition-transform duration-300 origin-right"
                  style={{
                    transform: isActive ? 'rotate(-14deg)' : 'rotate(0deg)',
                  }}
                >
                  <div className="w-1.5 h-1 rounded-full bg-[#FFE39A]" />
                </div>

                {/* Vintage Keyhole */}
                <div className="w-1.5 h-3 bg-[#1A1205] rounded-t-full border-t border-black/80 relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1.5 bg-[#1A1205]" />
                </div>

                {/* Lower screw */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#4A340D]" />
              </div>
            </div>

            {/* Bottom kickplate */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 h-3 rounded-xs bg-gradient-to-r from-[#C29643] via-[#FBF2D5] to-[#A3792E] border border-[#7D5920]/60 opacity-65" />
          </div>
        </div>
      </div>
    </div>
  );
}
