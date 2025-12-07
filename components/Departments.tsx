
import React, { useState, useEffect } from 'react';
import Section from './ui/Section';
import { X, ArrowRight, Edit } from 'lucide-react';
import { Department } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { getIcon } from '../lib/iconMap';
import AdminModal from './ui/AdminModal';

const Departments: React.FC = () => {
  const { departments, user, updateDepartment } = useAdmin();
  const [activeDept, setActiveDept] = useState<Department | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Department>>({});

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleEdit = (dept: Department, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditForm(dept);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editForm.id) {
        await updateDepartment(editForm.id, editForm);
    }
    setIsEditing(false);
  };

  // Radius for the orbit
  const orbitRadius = 260;

  return (
    <Section id="departments" className="bg-slate-950 min-h-screen flex flex-col justify-center overflow-hidden relative py-20">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neon-orange/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-red/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="text-center mb-12 relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-neon-orange font-bold tracking-wider uppercase text-sm mb-2">Our Ecosystem</motion.h2>
        <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-display font-bold text-white">Departments</motion.h3>
      </div>

      {/* MOBILE LAYOUT: Horizontal Carousel (No Rotation) */}
      {isMobile ? (
        <div className="flex overflow-x-auto gap-4 p-4 pb-12 snap-x snap-mandatory z-20 mt-4 no-scrollbar scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {departments.map((dept) => {
                const Icon = getIcon(dept.icon);
                return (
                    <div key={dept.id} onClick={() => setActiveDept(dept)} className="relative min-w-[280px] w-[280px] snap-center bg-slate-900/80 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg backdrop-blur-sm active:scale-95 transition-transform flex-shrink-0 group">
                        {user && <button onClick={(e) => handleEdit(dept, e)} className="absolute top-2 right-2 p-2 bg-blue-600 rounded-full text-white z-10"><Edit size={14}/></button>}
                        <div className={`p-4 rounded-full bg-black mb-4 ${dept.color} border border-slate-800 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300`}>
                            <Icon size={32} />
                        </div>
                        <h4 className="text-xl font-bold mb-2 text-white">{dept.name}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{dept.description}</p>
                        <button className="mt-4 text-neon-orange text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">View Details <ArrowRight size={14} /></button>
                    </div>
                );
            })}
            {/* Spacer for better scrolling feel on right edge */}
            <div className="min-w-[20px] flex-shrink-0"></div>
        </div>
      ) : (
        /* DESKTOP LAYOUT: Flat Circular Orbit */
        <div className="relative h-[800px] w-full flex items-center justify-center -mt-24">
             {/* Center Core */}
             <div className="absolute z-20 w-48 h-48 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-[0_0_80px_rgba(255,87,34,0.3)]">
                 <div className="absolute inset-0 rounded-full border border-neon-orange/20 animate-ping"></div>
                 <div className="absolute inset-2 rounded-full border border-slate-600"></div>
                 
                 <div className="text-center z-10">
                    <span className="font-display font-bold text-xl tracking-[0.2em] text-slate-300">CORE</span>
                 </div>
             </div>

             {/* Decorative Outer Orbit Ring */}
             <div className="absolute w-[700px] h-[700px] rounded-full border border-slate-800/40 border-dashed animate-spin-reverse-slow opacity-60 pointer-events-none"></div>

             {/* Main Orbit Track (Visual only) */}
             <div className="absolute w-[520px] h-[520px] rounded-full border border-slate-800/80 shadow-[0_0_40px_rgba(0,0,0,0.4)] pointer-events-none"></div>

             {/* Rotating Container holding all items */}
             <div 
                className="absolute w-[520px] h-[520px] rounded-full"
                style={{ 
                    animation: `spin 40s linear infinite`,
                    animationPlayState: isHovering || activeDept ? 'paused' : 'running'
                }}
             >
                {departments.map((dept, index) => {
                    const angle = (index / departments.length) * 360;
                    const Icon = getIcon(dept.icon);
                    
                    return (
                        <div
                            key={dept.id}
                            className="absolute top-1/2 left-1/2 w-32 h-32 -ml-16 -mt-16" 
                            style={{
                                transform: `rotate(${angle}deg) translate(${orbitRadius}px) rotate(-${angle}deg)`,
                            }}
                        >
                             {/* Counter-rotation container to keep icons upright + Hover stop logic */}
                             <div 
                                className="w-full h-full flex items-center justify-center"
                                style={{ 
                                    animation: `spin-reverse 40s linear infinite`,
                                    animationPlayState: isHovering || activeDept ? 'paused' : 'running'
                                }}
                             >
                                 <motion.button
                                    whileHover={{ scale: 1.15 }}
                                    onMouseEnter={() => setIsHovering(true)}
                                    onMouseLeave={() => setIsHovering(false)}
                                    onClick={() => setActiveDept(dept)}
                                    className={`
                                        relative w-32 h-32 rounded-full 
                                        bg-slate-900/90 backdrop-blur-md 
                                        border-2 ${activeDept?.id === dept.id ? 'border-neon-orange bg-slate-800 scale-110 shadow-[0_0_40px_rgba(255,87,34,0.6)]' : 'border-slate-700 hover:border-neon-orange hover:shadow-[0_0_30px_rgba(255,87,34,0.5)]'}
                                        flex flex-col items-center justify-center 
                                        transition-all duration-300 z-30 group shadow-2xl
                                    `}
                                 >
                                    <Icon className={`${dept.color} transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`} size={40} />
                                    
                                    {/* Name Label */}
                                    <div className={`mt-3 text-xs font-bold text-white uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity`}>
                                        {dept.name.split(' ')[0]}
                                    </div>

                                    {/* Hover Description Tooltip */}
                                    <div className="absolute top-full mt-4 w-48 p-4 bg-slate-950/95 border border-slate-700 rounded-xl text-center shadow-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50">
                                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-950 border-t border-l border-slate-700 rotate-45"></div>
                                        <p className="text-xs text-slate-300 leading-snug">{dept.description}</p>
                                    </div>

                                    {user && (
                                        <div 
                                            onClick={(e) => handleEdit(dept, e)} 
                                            className="absolute -top-2 -right-2 bg-blue-600 p-1.5 rounded-full hover:bg-white hover:text-blue-600 transition-colors shadow-lg z-50"
                                        >
                                            <Edit size={12} fill="currentColor" />
                                        </div>
                                    )}
                                 </motion.button>
                             </div>
                        </div>
                    );
                })}
             </div>
        </div>
      )}

      {/* OVERLAY */}
      <AnimatePresence>
        {activeDept && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }} 
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg"
                onClick={() => setActiveDept(null)}
            >
                <div 
                    className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[80vh]" 
                    onClick={e => e.stopPropagation()}
                >
                    <button onClick={() => setActiveDept(null)} className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full hover:bg-neon-orange hover:text-black transition-colors">
                        <X size={24} />
                    </button>

                    {/* Left: Visual */}
                    <div className="w-full md:w-1/3 bg-gradient-to-br from-slate-900 to-black p-8 flex items-center justify-center relative overflow-hidden">
                        <div className={`absolute inset-0 opacity-20 bg-${activeDept.color.split('-')[1]}-500 blur-3xl`}></div>
                        <div className="relative z-10 text-center">
                            {React.createElement(getIcon(activeDept.icon), { size: 80, className: activeDept.color + " drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" })}
                            <h2 className="text-3xl font-display font-black text-white mt-6">{activeDept.name}</h2>
                            <div className="mt-2 inline-block px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-400 uppercase tracking-widest font-bold">Department</div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            What we do <span className="h-px flex-1 bg-slate-800 ml-4"></span>
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8">
                            {activeDept.description}
                        </p>
                        
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            Roles <span className="h-px flex-1 bg-slate-800 ml-4"></span>
                        </h3>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-3 text-slate-400">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-orange flex-shrink-0"></span>
                                <span>Collaborate on creative projects and shows.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-400">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-orange flex-shrink-0"></span>
                                <span>Gain hands-on experience with industry-standard equipment.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-400">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-orange flex-shrink-0"></span>
                                <span>Mentorship from senior board members.</span>
                            </li>
                        </ul>

                        <a href="#join" onClick={() => setActiveDept(null)} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-neon-orange transition-colors">
                            Apply for {activeDept.name} <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <AdminModal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Department">
          <form onSubmit={handleSave} className="space-y-4">
              <div>
                  <label className="block text-slate-400 text-sm mb-1">Description</label>
                  <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white h-32" />
              </div>
              <button type="submit" className="w-full py-2 bg-neon-orange text-black font-bold rounded">Save Changes</button>
          </form>
      </AdminModal>
    </Section>
  );
};

export default Departments;
