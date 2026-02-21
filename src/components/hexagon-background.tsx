
"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const HexagonBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const hexagons = containerRef.current!.querySelectorAll('.hexagon-floating');
      
      hexagons.forEach((hex) => {
        // Initial random placement
        gsap.set(hex, {
          x: gsap.utils.random(0, window.innerWidth),
          y: gsap.utils.random(0, window.innerHeight),
          rotation: gsap.utils.random(0, 360),
          scale: gsap.utils.random(0.4, 1.2),
          opacity: 0
        });

        // Floating movement
        gsap.to(hex, {
          x: "+=" + gsap.utils.random(-200, 200),
          y: "+=" + gsap.utils.random(-200, 200),
          rotation: "+=" + gsap.utils.random(180, 360),
          duration: gsap.utils.random(20, 40),
          repeat: -1,
          yoyo: true,
          ease: "none",
        });

        // Opacity pulsing
        gsap.to(hex, {
          opacity: gsap.utils.random(0.05, 0.2),
          duration: gsap.utils.random(3, 8),
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-black">
      {/* Background Grid Pattern - Static High Density */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='90' viewBox='0 0 52 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M26 0l26 15v30L26 60 0 45V15L26 0zm0 90l26-15V45L26 30 0 45v30l26 15z' fill='none' stroke='%237DF9FF' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '52px 90px'
        }}
      />
      
      {/* Floating Animated Hexagons */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} className="hexagon-floating absolute">
          <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary/20"
            />
          </svg>
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
    </div>
  );
};
