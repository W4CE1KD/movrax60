"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const logo = PlaceHolderImages.find(img => img.id === 'team-logo');
  
  const loadingStates = [
    "Connecting to Grid...",
    "Authenticating Agent...",
    "Decrypting Protocols...",
    "Interface Initialized",
  ];
  const [currentState, setCurrentState] = useState(loadingStates[0]);

  useEffect(() => {
    let stateIndex = 0;
    const stateInterval = setInterval(() => {
      stateIndex++;
      if (stateIndex < loadingStates.length) {
        setCurrentState(loadingStates[stateIndex]);
      } else {
        clearInterval(stateInterval);
      }
    }, 850);

    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(stateInterval);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
      }
    },
  };
  
  const textVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' }},
    exit: { opacity: 0, y: -15, transition: { duration: 0.4, ease: 'easeIn' }},
  };


  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          exit="exit"
          className="fixed inset-0 z-[9999] bg-[#0D1117] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background and Overlays */}
          <div className="absolute inset-0 pentagon-grid opacity-5 pointer-events-none" />
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2, ease: "circOut" }}
            className="absolute w-[50vw] h-[50vw] max-w-lg max-h-lg bg-primary/20 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,1)]" />

          {/* Main Content */}
          <motion.div 
            className="flex flex-col items-center"
            variants={logoVariants}
            initial="initial"
            animate="animate"
          >
            {logo && (
              <div className="relative w-64 h-32 md:w-[600px] md:h-[300px]">
                <Image
                  src={logo.imageUrl}
                  alt="MOVRAX60 Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_60px_rgba(139,233,253,0.3)]"
                  priority
                />
              </div>
            )}

            <div className="mt-8 text-center h-8">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentState}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-secondary"
                >
                  {currentState}
                </motion.h2>
              </AnimatePresence>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
