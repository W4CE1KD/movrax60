"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const HeroSection = () => {
  const logo = PlaceHolderImages.find(img => img.id === 'team-logo');

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-start pt-28 md:pt-36 overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80 z-0 pointer-events-none" />
      
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-7xl"
      >
        <div className="relative flex flex-col items-center">
          {logo && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="relative w-[340px] h-[170px] md:w-[840px] md:h-[420px] mb-2 flex items-start justify-center group"
            >
              {/* HUD Corners - Precise Framing */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-secondary/60 z-20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-secondary/60 z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-secondary/60 z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-secondary/60 z-20 pointer-events-none" />

              <Image
                src={logo.imageUrl}
                alt="MOVRAX60 Logo"
                fill
                className="object-contain object-top drop-shadow-[0_0_40px_rgba(139,233,253,0.3)] p-4"
                priority
                data-ai-hint={logo.imageHint}
              />
            </motion.div>
          )}
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col items-center mb-12 -mt-4 md:-mt-8"
          >
            <div className="flex items-center gap-4">
              <div className="hidden md:block w-24 h-[1px] bg-gradient-to-r from-transparent to-secondary/50" />
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white">
                MOVRAX<span className="text-secondary drop-shadow-[0_0_20px_rgba(139,233,253,0.5)] font-mono">60</span>
              </h1>
              <div className="hidden md:block w-24 h-[1px] bg-gradient-to-l from-transparent to-secondary/50" />
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-sm md:text-lg text-white font-bold tracking-[0.6em] uppercase mt-6"
            >
              Beyond The Digital Horizon
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col items-center w-full"
          >
            <div className="relative w-full max-w-4xl flex flex-col items-center">
              <div className="absolute top-[26px] w-full h-[1px] bg-white/20">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-secondary shadow-[0_0_10px_rgba(139,233,253,1)]" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-secondary shadow-[0_0_10px_rgba(139,233,253,1)]" />
              </div>

              <div className="flex items-center justify-center w-full gap-4 md:gap-12 relative pt-1">
                <div className="px-4 md:px-8 py-2 border border-primary/60 bg-primary/10 backdrop-blur-sm rounded-none z-20">
                  <span className="text-[10px] md:text-xs text-primary font-black uppercase tracking-[0.4em]">S-Rank Guild</span>
                </div>

                <div className="px-4 md:px-8 py-2 border border-secondary/60 bg-secondary/10 backdrop-blur-sm rounded-none z-20">
                  <span className="text-[10px] md:text-xs text-secondary font-black uppercase tracking-[0.4em]">Global Elite</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="mt-16"
              >
                <span className="text-[10px] md:text-xs uppercase tracking-[1em] font-black text-white/60 bg-black/80 px-4 py-1.5 font-mono">System Initialized</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};