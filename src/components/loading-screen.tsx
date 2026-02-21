"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [showText, setShowText] = useState(false);
  const logo = PlaceHolderImages.find(img => img.id === 'team-logo');
  const loadingText = "INITIALIZING SYSTEM INTERFACE...";

  useEffect(() => {
    // Show text after a short delay
    const textTimer = setTimeout(() => setShowText(true), 500);

    // Finish loading after a set duration
    const loadingTimer = setTimeout(() => setLoading(false), 3500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(loadingTimer);
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
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: [0, 1, 0.9, 1],
      scale: 1,
      transition: { 
        duration: 1.5,
        ease: 'easeOut',
      }
    },
  };
  
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const textCharVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
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
            initial={{ y: '-100vh' }}
            animate={{ y: '100vh' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatType: 'reverse', delay: 0.5 }}
            className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none"
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

            {showText && (
              <motion.div
                className="mt-8 text-center"
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-secondary">
                  {loadingText.split('').map((char, index) => (
                    <motion.span key={index} variants={textCharVariants}>
                      {char}
                    </motion.span>
                  ))}
                </h2>
              </motion.div>
            )}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
