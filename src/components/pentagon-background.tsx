
"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const PentagonBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const pentagons = containerRef.current!.querySelectorAll('.pentagon-shape');
      
      pentagons.forEach((pentagon) => {
        // Random initial state with better visibility
        gsap.set(pentagon, {
          x: gsap.utils.random(0, window.innerWidth),
          y: gsap.utils.random(0, window.innerHeight),
          rotation: gsap.utils.random(0, 360),
          scale: gsap.utils.random(0.4, 1.4),
          opacity: 0
        });

        // Floating movement
        gsap.to(pentagon, {
          x: "+=" + gsap.utils.random(-400, 400),
          y: "+=" + gsap.utils.random(-400, 400),
          rotation: "+=" + gsap.utils.random(180, 360),
          duration: gsap.utils.random(25, 50),
          repeat: -1,
          yoyo: true,
          ease: "none",
        });

        // Opacity pulsing - high visibility for HUD effect
        gsap.to(pentagon, {
          opacity: gsap.utils.random(0.15, 0.35),
          duration: gsap.utils.random(3, 7),
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background Static Grid - More defined */}
      <div className="absolute inset-0 pentagon-grid opacity-60" />
      
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="pentagon-shape absolute">
          <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 5 L95 38 L78 92 H22 L5 38 Z"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-secondary/40"
            />
            <path
              d="M50 25 L82 48 L70 82 H30 L18 48 Z"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-primary/30"
            />
          </svg>
        </div>
      ))}
      
      {/* Soft Vignette to guide focus */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
    </div>
  );
};
