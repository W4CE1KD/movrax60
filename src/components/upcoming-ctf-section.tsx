
"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Target, Trophy, Info, ChevronRight } from 'lucide-react';
import missionsData from '@/data/missions.json';

interface MissionData {
  name: string;
  date: string;
  status: 'live' | 'upcoming';
  url?: string;
  id: number;
}

interface MissionProps extends MissionData {
  index: number;
}

const MissionBanner = ({ name, date, index, status, url }: MissionProps) => {
  const isLive = status === 'live';

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="relative w-full group overflow-hidden mb-3"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isLive ? 'bg-primary shadow-[0_0_15px_rgba(189,147,249,0.8)]' : 'bg-secondary'} z-20`} />
      
      <a 
        href={url || '#'} 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative bg-white/[0.02] backdrop-blur-md py-5 px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 border-l-0 hover:bg-white/[0.08] transition-all duration-300 z-10 block cursor-pointer group"
      >
        <div className="flex items-center gap-5 relative z-10">
          <div className={`p-2.5 rounded-none border ${isLive ? 'bg-primary/10 border-primary/20' : 'bg-secondary/10 border-secondary/20'}`}>
            {isLive ? (
              <Trophy className="w-5 h-5 text-primary animate-pulse" />
            ) : (
              <Target className="w-5 h-5 text-secondary" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className={`block text-[9px] font-bold uppercase tracking-widest ${isLive ? 'text-primary' : 'text-secondary'} font-mono`}>
                {isLive ? 'OP: ACTIVE' : 'INTEL: BRIEF'}
              </span>
              {isLive && (
                <span className="flex items-center gap-1.5 bg-primary text-primary-foreground text-[8px] font-black uppercase tracking-widest px-1.5 animate-pulse font-mono">
                  LIVE
                </span>
              )}
            </div>
            <h3 className="text-lg md:text-xl font-black text-white group-hover:text-secondary transition-colors duration-300 uppercase tracking-tight">
              {name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 text-white/30 mb-0.5">
              <Calendar className="w-3 h-3" />
              <span className="text-[8px] uppercase font-bold tracking-widest font-mono">
                {isLive ? 'STATUS' : 'DEPLOYMENT'}
              </span>
            </div>
            <span className="text-base font-bold text-white/80 font-mono tracking-tighter">{date}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
        </div>
      </a>
    </motion.div>
  );
};

const EmptyMissionState = ({ message }: { message: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    className="relative w-full border border-dashed border-white/10 bg-white/[0.01] py-12 px-6 flex flex-col items-center justify-center text-center overflow-hidden group"
  >
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 group-hover:border-primary/40 transition-colors" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/10 group-hover:border-primary/40 transition-colors" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/10 group-hover:border-primary/40 transition-colors" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-primary/40 transition-colors" />
    
    <div className="p-3 rounded-none border border-white/5 bg-white/[0.02] mb-4">
      <Info className="w-6 h-6 text-white/10" />
    </div>
    
    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 font-mono mb-2">STATUS: IDLE</span>
    <p className="text-lg md:text-xl font-black text-white/30 uppercase tracking-[0.05em] italic">
      {message}
    </p>
  </motion.div>
);

export const UpcomingCTFSection = () => {
  const currentMissions = (missionsData.current || []) as MissionData[];
  const upcomingMissions = (missionsData.upcoming || []) as MissionData[];

  return (
    <section id="missions" className="py-20 px-4 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Current Missions */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase">
                Current <span className="text-primary italic">Missions</span>
              </h2>
              <div className="h-0.5 w-16 bg-primary mt-1.5" />
            </motion.div>
          </div>

          <div className="flex flex-col min-h-[100px]">
            <AnimatePresence mode="popLayout">
              {currentMissions.length > 0 ? (
                currentMissions.map((event, i) => (
                  <MissionBanner key={`current-${event.id}`} {...event} index={i} status="live" />
                ))
              ) : (
                <EmptyMissionState message="present no ctfs are going on" />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Upcoming Machines */}
        <div>
          <div className="flex items-center justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase">
                Upcoming <span className="text-secondary italic">Machines</span>
              </h2>
              <div className="h-0.5 w-16 bg-secondary mt-1.5" />
            </motion.div>
          </div>

          <div className="flex flex-col min-h-[100px]">
            <AnimatePresence mode="popLayout">
              {upcomingMissions.length > 0 ? (
                upcomingMissions.map((event, i) => (
                  <MissionBanner key={`upcoming-${event.id}`} {...event} index={i} status="upcoming" />
                ))
              ) : (
                <EmptyMissionState message="present no ctfs are going on" />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
