'use client';

import React, { useState, useRef } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);
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
    rotation = -22; // Swung open slightly ~22deg on hover like Screenshot 2
  }

  return (
    <div
      ref={doorRef}
      role="button"
      tabIndex={0}
      aria-label={`${door.plateText} door: ${door.title}`}
      aria-expanded={isActive}
      onClick={handleDoorClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onLeave();
      }}
      className={`group relative flex-shrink-0 cursor-pointer select-none transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6B3A3F] rounded-t-[135px] w-[200px] sm:w-[220px] md:w-[240px] lg:w-[255px] h-[410px] sm:h-[440px] md:h-[470px] lg:h-[490px] ${
        isGhosted
          ? 'opacity-10 scale-[0.98] pointer-events-auto'
          : 'opacity-100 scale-100 pointer-events-auto'
      }`}
    >
      {/* Warm Ambient Glow behind active door */}
      {isActive && (
        <div
          className="absolute -inset-6 -z-10 rounded-t-[150px] opacity-90 blur-2xl transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${door.glowColor}, rgba(255, 225, 140, 0.3) 45%, transparent 75%)`,
          }}
        />
      )}

      {/* OUTER ARCH FRAME (White sculpted plaster moulding like Screenshot 1 & 2) */}
      <div className="door-arch-outer relative w-full h-full p-2.5 flex flex-col items-center">
        {/* INNER ARCH FRAME (Recessed casing) */}
        <div className="door-arch-inner relative w-full h-full p-1.5 flex flex-col justify-end overflow-hidden">
          {/* DOORWAY INTERIOR / ROOM BEYOND (Revealed when door swings open) */}
          <div
            className="absolute inset-0 z-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 40% 50%, #FFF8E7 0%, #F5DE9B 45%, ${door.doorDepthColor} 100%)`,
            }}
          >
            {/* Warm room light spill */}
            <div className="w-full h-full opacity-30 flex flex-col items-center justify-center" />
          </div>

          {/* 3D DOOR LEAF (The physical swinging wooden door) */}
          <div
            className="door-perspective-card relative z-10 w-full h-full rounded-t-[120px] overflow-hidden transition-transform duration-500 ease-out"
            style={{
              backgroundColor: door.themeColor,
              transformOrigin: 'left center',
              transform: `perspective(1100px) rotateY(${rotation}deg)`,
              boxShadow: rotation < -5 ? '10px 14px 28px -4px rgba(0,0,0,0.5)' : 'none',
            }}
          >
            {/* Tactile Fluting / Vertical Wooden Ribs (Screenshot 1 & 2) */}
            <div className="door-fluting absolute inset-0 w-full h-full pointer-events-none" />

            {/* Perimeter door frame border */}
            <div className="absolute inset-2 rounded-t-[110px] border-2 border-white/10 pointer-events-none" />

            {/* BRASS NAMEPLATE (Centered on door) */}
            <div className="absolute top-28 left-1/2 -translate-x-1/2 w-40 px-3 py-2 rounded-xs brass-plate flex flex-col items-center justify-center select-none shadow-md">
              {/* 4 Brass Screws at Corners */}
              <div className="brass-screw absolute top-1 left-1" />
              <div className="brass-screw absolute top-1 right-1" />
              <div className="brass-screw absolute bottom-1 left-1" />
              <div className="brass-screw absolute bottom-1 right-1" />

              <span className="text-[10px] font-mono uppercase font-black tracking-widest text-[#3B290B] text-center leading-tight">
                {door.plateText}
              </span>
            </div>

            {/* "CLICK TO ENTER" PILL (Screenshot 2: Appears when door is active) */}
            {isActive && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect();
                  triggerWalkThrough(door.route);
                }}
                className="absolute top-48 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#1A1818]/90 hover:bg-black text-white text-[11px] font-mono tracking-wider shadow-xl backdrop-blur-xs flex items-center gap-1.5 transition-all duration-200 cursor-pointer border border-white/20 hover:scale-105 active:scale-95 z-20 whitespace-nowrap"
              >
                <span>Click to enter</span>
                <ArrowRight className="w-3 h-3 text-amber-300" />
              </button>
            )}

            {/* BRASS LEVER HANDLE & KEYHOLE (Right edge) */}
            <div className="absolute top-[260px] right-3.5 flex flex-col items-center pointer-events-none">
              {/* Brass escutcheon plate */}
              <div className="w-4 h-16 rounded-md gold-lever-base border border-[#5E4315] p-1 flex flex-col items-center justify-between shadow-md">
                {/* Upper screw */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#4A340D]" />

                {/* Lever Handle Arm pointing left */}
                <div className="relative w-7 h-2.5 -left-3 gold-lever-arm border border-[#523A0E] flex items-center justify-end px-1">
                  <div className="w-1.5 h-1 rounded-full bg-[#FFE39A]" />
                </div>

                {/* Vintage Keyhole */}
                <div className="w-2 h-3.5 bg-[#1A1205] rounded-t-full border-t border-black/80 relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1.5 bg-[#1A1205]" />
                </div>

                {/* Lower screw */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#4A340D]" />
              </div>
            </div>

            {/* Bottom kickplate */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 h-3 rounded-xs bg-gradient-to-r from-[#C29643] via-[#FBF2D5] to-[#A3792E] border border-[#7D5920]/60 opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
}
