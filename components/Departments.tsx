import React, { useState, useEffect } from 'react';
import Section from './ui/Section';
import { Mic, Video, Edit, PenTool, Share2, Languages, Radio, Activity } from 'lucide-react';
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
  { id: 'tech', name: 'Tech & Sound', icon: Activity, color: 'text-blue-400', description: 'Managing the live streams, equipment, and audio engineering.' },
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

  // Radius for the layout
  const circleRadius = isMobile ? 140 : 280;

  return (
    <Section id="departments" className="bg-slate-950 min-h-screen flex flex-col justify-center overflow-hidden relative">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neon-orange/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-red/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="text-center mb-12 relative z-10">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-neon-orange font-bold tracking-wider uppercase text-sm mb-2"
        >
            Our Ecosystem
        </motion.h2>
        <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white"
        >
            Departments
        </motion.h3>
      </div>

      {/* MOBILE LAYOUT (Slider) */}
      {isMobile ? (
        <div className="flex overflow-x-auto gap-4 p-4 pb-12 snap-x snap-mandatory no-scrollbar z-20">
            {departments.map((dept) => (
                <div key={dept.id} className="min-w-[280px] snap-center bg-slate-900/80 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg backdrop-blur-sm">
                    <div className={`p-4 rounded-2xl bg-black mb-4 ${dept.color} border border-slate-800 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                        <dept.icon size={32} />
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-white">{dept.name}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{dept.description}</p>
                </div>
            ))}
        </div>
      ) : (
        /* DESKTOP LAYOUT (Enhanced Circular Animation) */
        <div className="relative h-[800px] w-full flex items-center justify-center -mt-20 scale-90 xl:scale-100 transition-transform perspective-1000">
          
          {/* Central Hub */}
          <div className="absolute z-20 w-40 h-40 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-[0_0_60px_rgba(255,87,34,0.2)]">
             <div className="absolute inset-0 rounded-full border border-neon-orange/20 animate-ping"></div>
             <div className="absolute inset-2 rounded-full border border-slate-600"></div>
             
             <div className="text-center z-10">
                <div className="w-full flex justify-center mb-1">
                     <Radio className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </div>
                <span className="font-display font-bold text-lg tracking-[0.2em] text-slate-300">CORE</span>
             </div>
          </div>

          {/* Decorative Outer Orbit Ring (Counter-Rotating) */}
          <div className="absolute w-[750px] h-[750px] rounded-full border border-slate-800/30 border-dashed animate-spin-reverse-slow opacity-50 pointer-events-none"></div>

          {/* Main Orbit Track (Visual only) */}
          <div className="absolute w-[600px] h-[600px] rounded-full border border-slate-800/60 shadow-[0_0_40px_rgba(0,0,0,0.2)] pointer-events-none"></div>

          {/* Rotating Container holding all items */}
          <div 
            className={`absolute w-[600px] h-[600px] rounded-full transition-all duration-700 ease-out`}
            style={{ 
                animation: `spin 50s linear infinite`,
                animationPlayState: isHovering || activeDept ? 'paused' : 'running'
            }}
          >
            {departments.map((dept, index) => {
                const angle = (index / departments.length) * 360;
                
                return (
                    <div
                        key={dept.id}
                        className="absolute top-1/2 left-1/2 w-28 h-28 -ml-14 -mt-14"
                        style={{
                            transform: `rotate(${angle}deg) translate(${circleRadius}px) rotate(-${angle}deg)`,
                        }}
                    >
                         {/* Counter-rotation container to keep icons upright + Hover stop logic */}
                         <div 
                            className="w-full h-full flex items-center justify-center"
                            style={{ 
                                animation: `spin-reverse 50s linear infinite`,
                                animationPlayState: isHovering || activeDept ? 'paused' : 'running'
                            }}
                         >
                             {/* Individual Floating Animation */}
                             <motion.button
                                animate={{ y: [0, -8, 0] }}
                                transition={{ 
                                    duration: 3, 
                                    repeat: Infinity, 
                                    ease: "easeInOut",
                                    delay: index * 0.5 // Stagger the float effect
                                }}
                                onMouseEnter={() => { setIsHovering(true); setActiveDept(dept); }}
                                onMouseLeave={() => { setIsHovering(false); }}
                                onClick={() => setActiveDept(dept)}
                                className={`
                                    relative w-28 h-28 rounded-2xl 
                                    bg-slate-900/90 backdrop-blur-md 
                                    border-2 ${activeDept?.id === dept.id ? 'border-neon-orange bg-slate-800 scale-110 shadow-[0_0_30px_rgba(255,87,34,0.4)]' : 'border-slate-700 hover:border-white hover:bg-slate-800'}
                                    flex flex-col items-center justify-center 
                                    transition-all duration-300 z-30 group
                                `}
                             >
                                <dept.icon className={`${dept.color} transition-all duration-300 ${activeDept?.id === dept.id ? 'scale-110' : ''}`} size={36} />
                                
                                {/* Mini Label on Hover */}
                                <div className={`absolute -bottom-8 whitespace-nowrap bg-black/80 px-3 py-1 rounded text-xs font-bold text-white opacity-0 ${activeDept?.id === dept.id ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-300 pointer-events-none`}>
                                    {dept.name}
                                </div>
                             </motion.button>
                         </div>
                    </div>
                );
            })}
          </div>

           {/* Active Department Info Card (Center Overlay or Bottom) */}
           <AnimatePresence mode="wait">
            {activeDept && (
                <motion.div 
                    key={activeDept.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute z-40 top-[65%] md:top-auto md:bottom-12 bg-slate-900/95 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 max-w-md text-center shadow-[0_10px_50px_rgba(0,0,0,0.5)]"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-slate-950 rounded-full border border-slate-800">
                        <div className={`p-3 rounded-2xl bg-slate-800 ${activeDept.color} shadow-lg`}>
                            <activeDept.icon size={24} />
                        </div>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-white mb-3 mt-4">{activeDept.name}</h4>
                    <p className="text-slate-300 leading-relaxed mb-6">{activeDept.description}</p>
                    
                    <div className="flex justify-center gap-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                            VoiceIt Department
                        </span>
                    </div>
                </motion.div>
            )}
           </AnimatePresence>
        </div>
      )}
    </Section>
  );
};

export default Departments;