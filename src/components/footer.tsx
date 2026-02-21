
"use client"

import React from 'react';
import { Github } from 'lucide-react';
import Link from 'next/link';

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 127.14 96.36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.78,56.63.48,80.05a105.73,105.73,0,0,0,32.22,16.29,122.09,122.09,0,0,0,7.75-12.58,74.1,74.1,0,0,1-12.43-5.93c1,0.77,2,1.51,3,2.23a114.36,114.36,0,0,0,65,0c1.07-.73,2.12-1.46,3.13-2.23a74.1,74.1,0,0,1-12.43,5.93,122.09,122.09,0,0,0,7.75,12.58,105.73,105.73,0,0,0,32.22-16.29C129.66,51.12,125,27.15,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.07-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-sm py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white/40 text-[10px] md:text-xs font-medium tracking-wider">
          © 2026 <span className="text-white/60">MOVRAX60 CTF Team.</span> All rights reserved.
        </div>
        
        <div className="flex items-center gap-10">
          <Link href="https://github.com" target="_blank" className="flex items-center gap-2 group transition-all">
            <Github className="w-5 h-5 text-white/40 group-hover:text-secondary" />
            <span className="sr-only">GitHub</span>
          </Link>
          
          <Link href="https://discord.com" target="_blank" className="flex items-center gap-2 group transition-all">
            <DiscordIcon className="w-5 h-5 text-white/40 group-hover:text-secondary" />
            <span className="sr-only">Discord</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
