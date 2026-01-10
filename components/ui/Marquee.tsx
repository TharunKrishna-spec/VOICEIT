
import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';

const Marquee: React.FC = () => {
  const { siteConfig } = useAdmin();
  const text = siteConfig.marqueeText || "VOICEIT • THE OFFICIAL RADIO CLUB OF VIT CHENNAI • ";
  
  return (
    <div className="bg-neon-orange text-black py-1.5 overflow-hidden border-b border-orange-600 relative z-[60]">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex whitespace-nowrap font-bold text-xs tracking-widest uppercase"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          <span className="mr-4">{text}</span>
          <span className="mr-4">{text}</span>
          <span className="mr-4">{text}</span>
          <span className="mr-4">{text}</span>
          <span className="mr-4">{text}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
