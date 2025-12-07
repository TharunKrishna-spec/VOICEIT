import React, { useState, useEffect } from 'react';
import Section from './ui/Section';
import { Mic, Video, Edit, PenTool, Share2, Languages, Radio } from 'lucide-react';
import { Department } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const departments: Department[] = [
  { id: 'rj-eng', name: 'RJ English', icon: Mic, color: 'text-neon-orange', description: 'The English voice of the club, hosting flagship shows and interviews.' },
  { id: 'rj-tam', name: 'RJ Tamil', icon: Radio, color: 'text-neon-red', description: 'Bringing local flavor and energy through Tamil commentary and shows.' },
  { id: 'rj-reg', name: 'RJ Regional', icon: Languages, color: 'text-neon-amber', description: 'Celebrating diversity with Telugu, Malayalam, and Kannada content.' },
  { id: 'media', name: 'Camera Team', icon: Video, color: 'text-white', description: 'Capturing moments and producing high-quality video coverage.' },
  { id: 'edit', name: 'Editing', icon: Edit, color: 'text-orange-400', description: 'The wizards behind the seamless audio and video cuts.' },
  { id: 'content', name: 'Content', icon: PenTool, color: 'text-yellow-200', description: 'Scripting stories, planning shows, and crafting narratives.' },
  { id: 'social', name: 'Social Media', icon: Share2, color: 'text-red-400', description: 'Managing our digital presence and engaging the audience.' },
];

const Departments: React.FC = () => {
  const [activeDept, setActiveDept] = useState<Department | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const circleRadius = 280; // Radius of the circle

  return (
    <Section id="departments" className="bg-slate-950 min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-neon-orange font-bold tracking-wider uppercase text-sm mb-2">Our Pillars</h2>
        <h3 className="text-4xl md:text-5xl font-display font-bold">Departments</h3>
      </div>

      {/* MOBILE LAYOUT (Slider) */}
      {isMobile ? (
        <div className="flex overflow-x-auto gap-4 p-4 pb-12 snap-x snap-mandatory no-scrollbar">
            {departments.map((dept) => (
                <div key={dept.id} className="min-w-[280px] snap-center bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center shadow-lg">
                    <div className={`p-4 rounded-full bg-slate-950 mb-4 ${dept.color} border border-slate-800`}>
                        <dept.icon size={32} />
                    </div>
                    <h4 className="text-xl font-bold mb-2">{dept.name}</h4>
                    <p className="text-slate-400 text-sm">{dept.description}</p>
                </div>
            ))}
        </div>
      ) : (
        /* DESKTOP LAYOUT (Circular Interactive) */
        <div className="relative h-[800px] w-full flex items-center justify-center -mt-20 scale-75 xl:scale-100 transition-transform">
          
          {/* Central Hub */}
          <div className="absolute z-20 w-48 h-48 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center shadow-[0_0_50px_rgba(255,87,34,0.15)]">
             <div className="text-center">
                <div className="w-full flex justify-center mb-2">
                     <Radio className="w-10 h-10 text-white animate-pulse-fast" />
                </div>
                <span className="font-display font-bold text-xl tracking-widest text-slate-300">VOICEIT</span>
             </div>
             {/* Radar ping effect */}
             <div className="absolute inset-0 rounded-full border border-neon-orange opacity-20 animate-ping"></div>
          </div>

          {/* Rotating Ring Container */}
          <div 
            className={`absolute w-[600px] h-[600px] rounded-full border border-slate-800/50 transition-all duration-500 ${isHovering ? 'paused' : ''}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ animation: isHovering ? 'none' : 'spin 40s linear infinite' }}
          >
            {departments.map((dept, index) => {
                const angle = (index / departments.length) * 360;
                
                return (
                    <div
                        key={dept.id}
                        className="absolute top-1/2 left-1/2 w-24 h-24 -ml-12 -mt-12 cursor-pointer group"
                        style={{
                            transform: `rotate(${angle}deg) translate(${circleRadius}px) rotate(-${angle}deg)`,
                        }}
                    >
                         {/* The content container that counters the MAIN rotation to stay upright */}
                         <div 
                            className="w-full h-full"
                            style={{ animation: isHovering ? 'none' : 'spin-reverse 40s linear infinite' }}
                         >
                             {/* Actual Card */}
                             <motion.button
                                whileHover={{ scale: 1.2 }}
                                onClick={() => setActiveDept(dept)}
                                className={`w-24 h-24 rounded-full bg-slate-900 border-2 border-slate-700 hover:border-neon-orange hover:shadow-[0_0_20px_rgba(255,87,34,0.3)] flex flex-col items-center justify-center transition-all duration-300 relative z-30 group-hover:bg-slate-800`}
                             >
                                <dept.icon className={`${dept.color} mb-1 transition-colors`} size={24} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">{dept.name.split(' ')[0]}</span>
                             </motion.button>
                         </div>
                    </div>
                );
            })}
          </div>

           {/* Active Department Info Modal/Overlay */}
           <AnimatePresence>
            {activeDept && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-20 z-30 bg-slate-900/95 backdrop-blur-md p-6 rounded-2xl border border-neon-orange/50 max-w-sm text-center shadow-[0_0_30px_rgba(255,87,34,0.2)]"
                >
                    <div className="flex justify-center mb-4">
                        <div className={`p-3 rounded-full bg-slate-800 ${activeDept.color}`}>
                            <activeDept.icon size={32} />
                        </div>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">{activeDept.name}</h4>
                    <p className="text-slate-300">{activeDept.description}</p>
                    <button 
                        onClick={() => setActiveDept(null)}
                        className="mt-4 text-sm text-neon-orange hover:text-white underline font-semibold"
                    >
                        Close
                    </button>
                </motion.div>
            )}
           </AnimatePresence>
        </div>
      )}
    </Section>
  );
};

export default Departments;