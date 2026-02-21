
import React from 'react';
import { HeroSection } from '@/components/hero-section';
import { StatsSection } from '@/components/stats-section';
import { RankSection } from '@/components/rank-section';
import { TeamSection } from '@/components/team-section';
import { Footer } from '@/components/footer';
import { ParticleBackground } from '@/components/particle-background';
import { PentagonBackground } from '@/components/pentagon-background';

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen">
      {/* Cinematic Animated Background Layers */}
      <ParticleBackground />
      <PentagonBackground />
      
      {/* Main Content Overlay */}
      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
        <RankSection />
        <TeamSection />
        <Footer />
      </div>
      
      {/* Cinematic Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
      
      {/* Side Energy Aura */}
      <div className="fixed top-0 left-0 w-32 h-screen bg-gradient-to-r from-primary/5 to-transparent pointer-events-none -z-1" />
      <div className="fixed top-0 right-0 w-32 h-screen bg-gradient-to-l from-secondary/5 to-transparent pointer-events-none -z-1" />
    </main>
  );
}
