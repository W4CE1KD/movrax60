"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  
  const logo = PlaceHolderImages.find(img => img.id === 'team-logo');

  const bootLogs = [
    "INITIALIZING CORE KERNEL...",
    "ESTABLISHING SECURE PROTOCOLS...",
    "LOADING NEURAL INTERFACE...",
    "BYPASSING ENCRYPTION LAYERS...",
    "SYNCHRONIZING PENTAGON GRID...",
    "OPERATIVES READY.",
    "SYSTEM BREACH SUCCESSFUL."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 40);

    let logIndex = 0;
    const logTimer = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logTimer);
      }
    }, 400);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-[#0D1117] flex flex-col items-center justify-between py-12 px-6 md:px-20 overflow-hidden"
        >
          {/* Immersive Background Grid */}
          <div className="absolute inset-0 pentagon-grid opacity-30 pointer-events-none" />
          
          {/* Fullscreen HUD Corners */}
          <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-secondary/40 z-20" />
          <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-secondary/40 z-20" />
          <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-secondary/40 z-20" />
          <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-secondary/40 z-20" />

          {/* Top Section: Branding & Progress */}
          <div className="w-full flex-grow flex flex-col items-center justify-center z-10 min-h-0">
            {logo && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-64 h-32 md:w-[800px] md:h-[320px] mb-4 md:mb-8"
              >
                <Image
                  src={logo.imageUrl}
                  alt="MOVRAX60 Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_60px_rgba(139,233,253,0.3)]"
                  priority
                />
              </motion.div>
            )}

            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-[60px] md:text-[140px] font-black text-white font-mono tracking-tighter leading-none">
                {progress.toString().padStart(2, '0')}
              </span>
              <span className="text-xl md:text-4xl font-black text-secondary font-mono">%</span>
            </div>
            
            <div className="w-full max-w-5xl h-[4px] bg-white/5 relative overflow-hidden mb-6">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-secondary shadow-[0_0_25px_rgba(139,233,253,1)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="w-full max-w-5xl flex justify-between">
              <span className="text-[10px] font-mono font-black text-secondary/60 tracking-[0.4em] uppercase">Kernel.v60.boot</span>
              <div className="flex gap-6">
                <span className="text-[10px] font-mono font-black text-secondary/60 tracking-[0.4em] uppercase">Net_Link: SECURE</span>
                <span className="text-[10px] font-mono font-black text-secondary/60 tracking-[0.4em] uppercase">Mem_Sync: OK</span>
              </div>
            </div>
          </div>

          {/* Bottom Section: Terminal logs */}
          <div className="w-full max-w-6xl bg-black/40 border border-white/5 backdrop-blur-md p-8 relative z-10 mt-12 flex-shrink-0">
            <div className="absolute -top-3 left-10 bg-[#0D1117] px-6 border border-white/10 z-20">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">System_Logs_v60.0.1</span>
            </div>
            
            <div className="space-y-3 h-28 overflow-hidden flex flex-col justify-end">
              {logs.slice(-4).map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[10px] md:text-[12px] text-primary font-bold tracking-[0.2em] uppercase whitespace-nowrap flex items-center gap-6"
                >
                  <span className="text-secondary font-mono opacity-50">
                    [ {new Date().toLocaleTimeString('en-GB', { hour12: false })} ]
                  </span>
                  <span className="text-secondary font-mono">{">"}</span>
                  <span className="text-white/80 font-mono">{log}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Grain/Noise Overlay */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};