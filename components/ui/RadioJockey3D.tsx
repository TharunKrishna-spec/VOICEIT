import React from 'react';
import { motion } from 'framer-motion';

export const RadioJockey3D = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <motion.svg
        viewBox="0 0 300 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="silverMetal" x1="0" y1="0" x2="300" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#F1F5F9" />
            <stop offset="0.4" stopColor="#94A3B8" />
            <stop offset="1" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="silverDark" x1="150" y1="0" x2="150" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#334155" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="neonVisor" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FF5722" />
            <stop offset="0.5" stopColor="#FF8A65" />
            <stop offset="1" stopColor="#FF5722" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Neck/Base */}
        <path d="M110 320 L190 320 L200 400 L100 400 Z" fill="url(#silverDark)" />

        {/* Head Base */}
        <path 
          d="M75 100 C75 40 225 40 225 100 L225 280 C225 320 75 320 75 280 Z" 
          fill="url(#silverMetal)" 
        />
        
        {/* Face Plate Detail */}
        <path d="M90 280 L210 280 L210 300 C210 310 90 310 90 300 Z" fill="#334155" />

        {/* Visor Area (The "Eyes") */}
        <motion.path 
          d="M85 140 C85 140 150 120 215 140 L215 180 C150 200 85 180 85 180 Z" 
          fill="url(#neonVisor)"
          filter="url(#glow)"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Headphones: Left Cup */}
        <path 
            d="M50 120 L75 120 L75 240 L50 240 C30 240 30 120 50 120 Z" 
            fill="#1e293b" 
            stroke="#475569" 
            strokeWidth="2"
        />
        {/* Headphones: Right Cup */}
        <path 
            d="M250 120 L225 120 L225 240 L250 240 C270 240 270 120 250 120 Z" 
            fill="#1e293b" 
            stroke="#475569" 
            strokeWidth="2"
        />
        {/* Headphones: Band */}
        <path 
            d="M55 120 C55 -20 245 -20 245 120" 
            fill="none" 
            stroke="#334155" 
            strokeWidth="20" 
            strokeLinecap="round"
        />
        
        {/* Mic Boom */}
        <path d="M75 240 L40 280" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
        <circle cx="35" cy="285" r="12" fill="#FF5722" filter="url(#glow)" />

        {/* Highlights / Reflections */}
        <ellipse cx="110" cy="80" rx="20" ry="10" fill="white" opacity="0.3" transform="rotate(-20 110 80)" />
      </motion.svg>
    </div>
  );
};