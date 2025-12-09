
import React, { useState } from 'react';
import { Play, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import AdminModal from './ui/AdminModal';
import { RadioJockey3D } from './ui/RadioJockey3D';

const Hero: React.FC = () => {
  const { user, heroData, updateHero } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(heroData);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHero(editForm);
    setIsEditing(false);
  };

  return (
    <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20 md:pt-0">
      
      {/* Edit Trigger - Moved to left to avoid right-aligned nav */}
      {user && (
        <button 
            onClick={() => { setEditForm(heroData); setIsEditing(true); }}
            className="absolute top-24 left-6 z-40 p-2 bg-neon-orange text-black rounded-full hover:bg-white transition-colors"
        >
            <Edit size={20} />
        </button>
      )}

      {/* Admin Modal */}
      <AdminModal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Hero Section">
          <form onSubmit={handleSave} className="space-y-4">
              <div>
                  <label className="block text-slate-400 text-sm mb-1">Main Title</label>
                  <input type="text" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                  <div>
                      <label className="block text-slate-400 text-sm mb-1">Subtitle First Part</label>
                      <input type="text" value={editForm.subtitle_p1} onChange={e => setEditForm({...editForm, subtitle_p1: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
                  </div>
                  <div>
                      <label className="block text-slate-400 text-sm mb-1">Highlighted Part</label>
                      <input type="text" value={editForm.subtitle_highlight} onChange={e => setEditForm({...editForm, subtitle_highlight: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
                  </div>
              </div>
              <div>
                  <label className="block text-slate-400 text-sm mb-1">Description</label>
                  <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white h-24" />
              </div>
              <button type="submit" className="w-full py-2 bg-neon-orange text-black font-bold rounded">Save Changes</button>
          </form>
      </AdminModal>

      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-orange mix-blend-screen filter blur-[100px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-red mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Content */}
        <div className="text-left z-20 order-2 lg:order-1">
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-neon-orange to-neon-red leading-[0.9]"
            >
              {heroData.title}
            </motion.h1>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-10"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {heroData.subtitle_p1} <span className="text-neon-orange italic">{heroData.subtitle_highlight}</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-400 font-light max-w-lg">
                {heroData.description}
              </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#about" className="group relative px-8 py-4 bg-slate-900 rounded-full border border-slate-700 hover:border-neon-orange transition-all duration-300 overflow-hidden text-center sm:text-left">
                 <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2 font-semibold">
                    Explore Club <Play size={18} className="group-hover:translate-x-1 transition-transform text-neon-orange" />
                 </span>
                 <div className="absolute inset-0 bg-neon-orange/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>

              <a href="#join" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 text-center sm:text-left">
                 <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2">
                    Join Us <div className="w-2 h-2 rounded-full bg-neon-orange animate-pulse"></div>
                 </span>
              </a>
            </motion.div>
        </div>

        {/* Right Column: Visuals/Animation */}
        <div className="relative flex items-center justify-center h-[400px] lg:h-[600px] order-1 lg:order-2">
            
            {/* Radio Waves Animation */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute border border-neon-orange/20 rounded-full box-border z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={{ width: '100px', height: '100px', opacity: 0.5 }}
                    animate={{
                        width: ['150px', '650px'],
                        height: ['150px', '650px'],
                        opacity: [0.5, 0],
                        borderWidth: ['2px', '0px']
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        delay: i * 1.1,
                        ease: "easeOut"
                    }}
                />
            ))}

            <motion.div 
                className="relative z-20"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="drop-shadow-[0_10px_40px_rgba(255,87,34,0.2)]">
                     <RadioJockey3D className="w-48 h-80 lg:w-64 lg:h-96" />
                </div>
            </motion.div>

            {/* Sound Bars */}
            <div className="absolute bottom-10 lg:bottom-10 flex gap-2 items-end z-30 h-16 pointer-events-none mix-blend-overlay">
                 {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-2 md:w-3 bg-neon-orange rounded-full"
                        animate={{ height: [10, 30 + Math.random() * 50, 10] }}
                        transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity }}
                    />
                 ))}
            </div>

        </div>

      </div>
    </div>
  );
};

export default Hero;
