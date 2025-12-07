import React from 'react';
import { Mic, Radio, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-neon-orange mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-neon-red mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-neon-amber mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
        >
            <div className="p-4 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-md shadow-[0_0_15px_rgba(255,87,34,0.3)]">
                <Radio className="w-8 h-8 text-neon-orange animate-pulse" />
            </div>
        </motion.div>

        <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-9xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-neon-orange to-neon-red"
        >
          VOICE IT
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto font-light"
        >
          Voices. Stories. <span className="text-neon-orange font-semibold">Creativity.</span>
          <br/>
          The Official Radio & Podcasting Club of VIT Chennai
        </motion.p>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#about" className="group relative px-8 py-4 bg-slate-900 rounded-full border border-slate-700 hover:border-neon-orange transition-all duration-300 overflow-hidden">
             <span className="relative z-10 flex items-center gap-2 font-semibold">
                Explore Club <Play size={18} className="group-hover:translate-x-1 transition-transform text-neon-orange" />
             </span>
             <div className="absolute inset-0 bg-neon-orange/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>

          <a href="#join" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300">
             <span className="relative z-10 flex items-center gap-2">
                Join Us <Mic size={18} className="text-neon-orange" />
             </span>
          </a>
        </motion.div>
      </div>

      {/* Audio visualizer effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center gap-1 opacity-30">
        {[...Array(40)].map((_, i) => (
            <div 
                key={i} 
                className="w-2 md:w-4 bg-neon-orange rounded-t-lg animate-pulse"
                style={{
                    height: `${Math.random() * 100}%`,
                    animationDuration: `${0.5 + Math.random()}s`
                }}
            ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;