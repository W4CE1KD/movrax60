
"use client"

import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Users, Trophy, ExternalLink, Loader2 } from 'lucide-react';
import Image from 'next/image';
import statsData from '@/data/stats.json';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ScrambleNumber = ({ target, delay = 0 }: { target: string, delay?: number }) => {
  const [display, setDisplay] = useState("0");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    const finalValue = parseInt(target.replace(/\D/g, '')) || 0;
    const suffix = target.replace(/[0-9]/g, '');

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        const randomNum = Math.floor(Math.random() * (finalValue + 10));
        setDisplay(randomNum.toString() + suffix);
        iteration++;

        if (iteration > 20) {
          clearInterval(interval);
          setDisplay(target);
        }
      }, 50);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [target, delay, isInView]);

  return <span ref={ref} className="font-mono">{display}</span>;
};

const LeaderboardDialog = ({ eventTitle }: { eventTitle: string }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const teamLogos: Record<string, string> = {
    "WUBBA LUBBA DUB DUB": "https://t3.ftcdn.net/jpg/06/28/41/90/360_F_628419033_DhXsL6BKRjAfsmunFSGKXXjnnccJddno.jpg",
    "MOVRAX60": "https://ctftime.org/media/cache/89/8b/898b3889d05134df537f3a9fda434a46.png",
    "ROOTRUNNERS": "https://ctftime.org/media/cache/af/db/afdbce2383e1d090ecfc283e77eb41cf.png",
  };

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      // Simulation of focused Nullcon rankings (Silver League style)
      const scoreboard = [
        { team_name: "Wubba Lubba Dub Dub", points: "5262.000", rating: "25.440", pos: 9 },
        { team_name: "MOVRAX60", points: "5262.000", rating: "25.165", pos: 10 },
        { team_name: "RootRunners", points: "5262.000", rating: "24.940", pos: 11 }
      ];
      setResults(scoreboard);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (teamName: string) => {
    if (teamName.toUpperCase() === 'MOVRAX60') {
      window.open('https://ctftime.org/event/3066', '_blank');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={loadLeaderboard}
          className="flex items-center gap-3 px-6 py-2.5 border border-emerald-500/30 bg-emerald-500/5 text-[10px] font-black text-emerald-500 hover:text-white hover:bg-emerald-500/10 hover:border-emerald-500/60 transition-all duration-300 uppercase tracking-widest font-mono group/btn"
        >
          <Trophy className="w-3.5 h-3.5" />
          INTEL SCOREBOARD
          <ExternalLink className="w-3 h-3 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#0D1117] border-white/10 text-white max-w-2xl p-0 overflow-hidden flex flex-col rounded-none shadow-2xl">
        {/* Leaderboard HUD Header */}
        <div className="p-8 pt-10 pb-6 border-b border-white/5 relative bg-[#0D1117]">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] font-mono">Leaderboard</span>
              <DialogTitle className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase font-mono mt-1">
                {eventTitle}
              </DialogTitle>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-widest font-mono">Status</span>
              <p className="text-emerald-500 font-black font-mono">Ended</p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-8 pb-10 pt-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-6">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
              <span className="text-[10px] font-mono text-emerald-500/40 uppercase tracking-[0.6em] animate-pulse">
                Syncing League Data...
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((team, i) => {
                const isMovrax = team.team_name?.toUpperCase() === 'MOVRAX60';

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleRowClick(team.team_name)}
                    className={`flex items-center gap-6 px-6 py-5 border transition-all duration-300 group/row ${
                      isMovrax
                        ? 'bg-emerald-500/5 border-emerald-500/60 shadow-[0_0_40px_rgba(16,185,129,0.2)] py-7 cursor-pointer hover:bg-emerald-500/10'
                        : 'bg-black/40 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="w-12 text-center font-black text-xl text-white font-mono">
                      {team.pos}
                    </div>

                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-black/60">
                      <Image
                        src={teamLogos[team.team_name.toUpperCase()] || "https://picsum.photos/seed/team/200/200"}
                        alt={team.team_name}
                        fill
                        className="object-cover grayscale group-hover/row:grayscale-0 transition-all"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className={`font-black tracking-tight font-mono ${isMovrax ? 'text-2xl text-white' : 'text-lg text-white/70'}`}>
                        {team.team_name}
                      </h4>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <span className={`font-black text-white font-mono ${isMovrax ? 'text-2xl' : 'text-lg'}`}>
                        {team.points} <span className="text-[10px] text-white/30 ml-1 uppercase">pts</span>
                      </span>
                      <span className="text-[9px] font-black text-emerald-500/50 font-mono uppercase tracking-widest mt-0.5">
                        Rating: {team.rating}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const RecordCard = ({ title, rank, members }: any) => {
  return (
    <motion.div layout className="w-full">
      <div className="relative group bg-black/80 border border-white/10 p-8 min-h-[300px] flex flex-col justify-between">
        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tighter font-mono">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-white/40">
          <Users className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] font-black uppercase tracking-widest font-mono">
            {members} Operatives Played
          </span>
        </div>

        <LeaderboardDialog eventTitle={title} />

        <span className="text-2xl md:text-4xl font-black text-emerald-400 font-mono">
          <ScrambleNumber target={rank} delay={0.2} />
        </span>
      </div>
    </motion.div>
  );
};

export const StatsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const initialItems = 1;
  const hasMore = statsData.length > initialItems;
  const displayItems = showAll ? statsData : statsData.slice(0, initialItems);

  return (
    <section id="records" className="py-32 px-4 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {displayItems.map((record, i) => (
              <RecordCard key={i} {...record} />
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-4 px-12 py-4 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              {showAll ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
