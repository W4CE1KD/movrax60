
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import teamData from '@/data/team.json';

const MemberCard = ({ name, role, index, image, links, htbIcon, thmIcon, webIcon }: { 
    name: string; 
    role: string; 
    index: number; 
    image: string; 
    links: { htb: string; thm: string; web: string; };
    htbIcon: ImagePlaceholder | undefined;
    thmIcon: ImagePlaceholder | undefined;
    webIcon: ImagePlaceholder | undefined;
}) => {
  const isVideo = image.toLowerCase().endsWith('.mp4');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-[540px] w-full"
    >
      <div className="relative h-full border border-white/10 overflow-hidden flex flex-col transition-all duration-500 rounded-none bg-black/40 group">
        {/* Profile Image/Video Container */}
        <div className="h-[65%] relative overflow-hidden bg-white/[0.02]">
          {/* HUD Corners - Tighter Fit */}
          <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-secondary/40 z-20 group-hover:border-secondary transition-colors duration-500" />
          <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-secondary/40 z-20 group-hover:border-secondary transition-colors duration-500" />
          <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-secondary/40 z-20 group-hover:border-secondary transition-colors duration-500" />
          <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-secondary/40 z-20 group-hover:border-secondary transition-colors duration-500" />

          {isVideo ? (
            <video
              src={image}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
            />
          ) : (
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain p-8 grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              data-ai-hint="team member profile"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </div>
        
        <div className="flex-1 p-8 flex flex-col items-center justify-between text-center relative z-10">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 px-4 py-1 border border-primary/20 mb-4">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em] font-mono">{role}</span>
            </div>
            <h3 className="text-3xl font-black text-white group-hover:text-secondary transition-all duration-300 uppercase tracking-tight">{name}</h3>
            <div className="h-[2px] bg-secondary mt-5 w-8 group-hover:w-32 transition-all duration-700" />
          </div>

          <div className="w-full mt-6 flex items-center justify-center gap-4">
            {htbIcon && links.htb && links.htb !== '#' && (
              <Link href={links.htb} target="_blank" className="group/icon" title="Hack The Box Profile">
                <div className="relative w-10 h-10 p-2 rounded-full border border-white/10 bg-black/30 group-hover/icon:bg-white/5 transition-colors">
                  <Image src={htbIcon.imageUrl} alt="Hack The Box" fill className="object-contain invert group-hover/icon:invert-0 transition-all" />
                </div>
              </Link>
            )}
            {thmIcon && links.thm && links.thm !== '#' && (
              <Link href={links.thm} target="_blank" className="group/icon" title="TryHackMe Profile">
                <div className="relative w-10 h-10 p-2.5 rounded-full border border-white/10 bg-black/30 group-hover/icon:bg-white/5 transition-colors">
                  <Image src={thmIcon.imageUrl} alt="TryHackMe" fill className="object-contain" />
                </div>
              </Link>
            )}
            {webIcon && links.web && links.web !== '#' && (
              <Link href={links.web} target="_blank" className="group/icon" title="Personal Website">
                <div className="relative w-10 h-10 p-2 rounded-full border border-white/10 bg-black/30 group-hover/icon:bg-white/5 transition-colors">
                  <Image src={webIcon.imageUrl} alt="Website" fill className="object-contain" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TeamSection = () => {
  const team = teamData.map(member => ({
    ...member,
    image: PlaceHolderImages.find(img => img.id === member.imageId)?.imageUrl || ""
  }));
  
  const htbIcon = PlaceHolderImages.find(img => img.id === 'htb-icon');
  const thmIcon = PlaceHolderImages.find(img => img.id === 'thm-icon');
  const webIcon = PlaceHolderImages.find(img => img.id === 'web-icon');


  return (
    <section id="team" className="py-32 px-4 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-secondary font-bold uppercase tracking-[0.5em] text-xs font-mono">Guild Personnel</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase mt-3">
            Active <span className="text-primary italic">Members</span>
          </h2>
          <div className="h-1.5 w-40 bg-secondary mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member: any, i: number) => (
            <MemberCard 
              key={i} 
              index={i}
              name={member.name}
              role={member.role}
              image={member.image}
              links={member.links}
              htbIcon={htbIcon}
              thmIcon={thmIcon}
              webIcon={webIcon} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
