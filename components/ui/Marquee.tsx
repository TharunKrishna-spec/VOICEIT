import React from 'react';
import { motion } from 'framer-motion';

const Marquee: React.FC = () => {
  const text = "VOICEIT • RECRUITMENTS OPENING SOON • LISTEN TO THE NEW EPISODE ON SPOTIFY • THE OFFICIAL RADIO CLUB OF VIT CHENNAI • ";
  
  return (
    <div className="bg-neon-orange text-black py-1.5 overflow-hidden border-b border-orange-600 relative z-[60]">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex whitespace-nowrap font-bold text-xs tracking-widest uppercase"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
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