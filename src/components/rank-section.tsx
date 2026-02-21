"use client"

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrambleDigit = ({ target, delay = 0 }: { target: string, delay?: number }) => {
  const [display, setDisplay] = useState("0");
  const chars = "0123456789";
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplay(chars[Math.floor(Math.random() * 10)]);
        iteration++;

        if (iteration > 20) {
          clearInterval(interval);
          setDisplay(target);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [target, delay, isInView]);

  return <span ref={ref} className="font-mono">{display}</span>;
};

export const RankSection = () => {
  return (
    <section className="py-48 relative flex items-center justify-center overflow-hidden">
      {/* Background Aura Ring */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-dashed border-primary/30 z-0"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border-2 border-secondary/20 z-0"
      />
      
      {/* Core Glow */}
      <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
        >
          <span className="block text-sm md:text-xl font-bold text-secondary uppercase tracking-[1em] mb-4">Current CTFTime Rank</span>
          <div className="relative inline-block">
            <h2 className="text-[120px] md:text-[220px] font-black text-white leading-none font-headline tracking-tighter drop-shadow-[0_0_30px_rgba(189,147,249,0.6)]">
              <ScrambleDigit target="2" delay={0.5} />
              <ScrambleDigit target="2" delay={0.6} />
              <ScrambleDigit target="1" delay={0.7} />
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary to-primary"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="text-xl md:text-2xl font-black text-white italic uppercase tracking-widest font-headline">
              D - Class Team
            </span>
            <div className="w-12 h-[1px] bg-white/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
