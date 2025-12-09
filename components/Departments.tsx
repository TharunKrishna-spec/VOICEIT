
import React, { useState, useEffect } from 'react';
import Section from './ui/Section';
import { X, ArrowRight, Edit } from 'lucide-react';
import { Department } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { getIcon } from '../lib/iconMap';
import AdminModal from './ui/AdminModal';
import { RadioJockey3D } from './ui/RadioJockey3D';

// Map tailwind text classes to Hex values for the 3D glow effects
const HexColorMap: Record<string, string> = {
  'text-neon-orange': '#FF5722',
  'text-neon-red': '#FF3D00',
  'text-neon-amber': '#FFC107',
  'text-white': '#FFFFFF',
  'text-orange-400': '#FB923C',
  'text-yellow-200': '#FEF08A',
  'text-red-400': '#F87171',
  'text-blue-400': '#60A5FA',
};

const DeptIcon3D = ({ 
  iconName, 
  colorClass, 
  isHovered, 
  layoutId,
  className = "w-28 h-28"
}: { 
  iconName: string, 
  colorClass: string, 
  isHovered: boolean, 
  layoutId?: string,
  className?: string
}) => {
    const Icon = getIcon(iconName);
    const colorHex = HexColorMap[colorClass] || '#ffffff';
    
    return (
        <motion.div 
            layoutId={layoutId}
            className={`relative ${className} [perspective:1000px]`}
        >
            <motion.div 
                className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
                animate={{ 
                    rotateX: isHovered ? 15 : 0, 
                    rotateY: isHovered ? 15 : 0,
                    scale: isHovered ? 1.1 : 1,
                    z: isHovered ? 50 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Layer 1: Base Shadow/Reflection */}
                <div 
                    className="absolute inset-2 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-white/5 [transform:translateZ(-10px)]"
                    style={{ boxShadow: `0 20px 40px -10px rgba(0,0,0,0.8)` }}
                />

                {/* Layer 2: Colored Glow Volume */}
                <div 
                    className="absolute inset-0 rounded-3xl opacity-20 blur-xl transition-opacity duration-300"
                    style={{ 
                        backgroundColor: colorHex,
                        opacity: isHovered ? 0.4 : 0.2,
                        transform: 'translateZ(-5px)'
                    }}
                />

                {/* Layer 3: Glass Surface */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-[2px] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] [transform:translateZ(0px)] overflow-hidden">
                    {/* Corner Highlight */}
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                </div>

                {/* Layer 4: The Icon (Floating) */}
                <div className="relative z-10 [transform:translateZ(30px)]">
                     <Icon 
                        size={48} 
                        color={colorHex} 
                        className={`transition-all duration-300 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]`} 
                        style={{ filter: isHovered ? `drop-shadow(0 0 15px ${colorHex})` : '' }}
                     />
                </div>
                
                {/* Layer 5: Top Specular Highlight */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-md [transform:translateZ(35px)] opacity-60"></div>
            </motion.div>
        </motion.div>
    );
};

const Departments: React.FC = () => {
  const { departments, user, updateDepartment } = useAdmin();
  const [activeDept, setActiveDept] = useState<Department | null>(null);
  const [hoveredDeptId, setHoveredDeptId] = useState<string | null>(null);
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

      {/* MOBILE LAYOUT: Horizontal Carousel */}
      {isMobile ? (
        <div className="flex overflow-x-auto gap-6 p-6 pb-12 snap-x snap-mandatory z-20 mt-4 no-scrollbar scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {departments.map((dept) => {
                return (
                    <div key={dept.id} onClick={() => setActiveDept(dept)} className="relative min-w-[280px] w-[280px] snap-center bg-slate-900/40 border border-slate-800 p-8 rounded-3xl flex flex-col items-center text-center backdrop-blur-sm active:scale-95 transition-transform flex-shrink-0 group">
                        {user && <button onClick={(e) => handleEdit(dept, e)} className="absolute top-2 right-2 p-2 bg-blue-600 rounded-full text-white z-10"><Edit size={14}/></button>}
                        
                        <div className="mb-6 scale-110">
                            <DeptIcon3D 
                                iconName={dept.icon} 
                                colorClass={dept.color} 
                                isHovered={true}
                                layoutId={`dept-icon-${dept.id}`}
                            />
                        </div>

                        <h4 className="text-xl font-bold mb-2 text-white">{dept.name}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{dept.description}</p>
                        <button className="mt-4 text-neon-orange text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">View Details <ArrowRight size={14} /></button>
                    </div>
                );
            })}
            <div className="min-w-[20px] flex-shrink-0"></div>
        </div>
      ) : (
        /* DESKTOP LAYOUT: Flat Circular Orbit */
        <div className="relative h-[800px] w-full flex items-center justify-center -mt-24">
             {/* Center Core */}
             <div className="absolute z-20 w-48 h-48 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-[0_0_80px_rgba(255,87,34,0.15)]">
                 <div className="absolute inset-0 rounded-full border border-neon-orange/20 animate-ping"></div>
                 <div className="absolute inset-2 rounded-full border border-slate-600 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-black"></div>
                 
                 <div className="z-10 relative w-full h-full flex items-center justify-center pb-2 pl-1">
                    <RadioJockey3D className="w-32 h-44 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
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
                    animationPlayState: hoveredDeptId || activeDept ? 'paused' : 'running'
                }}
             >
                {departments.map((dept, index) => {
                    const angle = (index / departments.length) * 360;
                    
                    return (
                        <div
                            key={dept.id}
                            className="absolute top-1/2 left-1/2 w-32 h-32 -ml-16 -mt-16" 
                            style={{
                                transform: `rotate(${angle}deg) translate(${orbitRadius}px) rotate(-${angle}deg)`,
                            }}
                        >
                             {/* Counter-rotation container */}
                             <div 
                                className="w-full h-full flex items-center justify-center"
                                style={{ 
                                    animation: `spin-reverse 40s linear infinite`,
                                    animationPlayState: hoveredDeptId || activeDept ? 'paused' : 'running'
                                }}
                             >
                                 <button
                                    onMouseEnter={() => setHoveredDeptId(dept.id)}
                                    onMouseLeave={() => setHoveredDeptId(null)}
                                    onClick={() => setActiveDept(dept)}
                                    className="relative z-30 group outline-none"
                                 >
                                    <DeptIcon3D 
                                        iconName={dept.icon} 
                                        colorClass={dept.color} 
                                        isHovered={hoveredDeptId === dept.id}
                                        layoutId={`dept-icon-${dept.id}`}
                                    />
                                    
                                    {/* Name Label */}
                                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs font-bold text-white uppercase tracking-wider transition-opacity duration-300 ${hoveredDeptId === dept.id ? 'opacity-100' : 'opacity-60'}`}>
                                        {dept.name.split(' ')[0]}
                                    </div>

                                    {/* Hover Description Tooltip */}
                                    <div className={`absolute top-full mt-8 w-48 p-4 bg-slate-950/95 border border-slate-700 rounded-xl text-center shadow-2xl transition-all duration-300 pointer-events-none z-50 left-1/2 -translate-x-1/2 ${hoveredDeptId === dept.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-950 border-t border-l border-slate-700 rotate-45"></div>
                                        <p className="text-xs text-slate-300 leading-snug">{dept.description}</p>
                                    </div>

                                    {user && (
                                        <div 
                                            onClick={(e) => handleEdit(dept, e)} 
                                            className="absolute -top-4 -right-4 bg-blue-600 p-1.5 rounded-full hover:bg-white hover:text-blue-600 transition-colors shadow-lg z-50 pointer-events-auto"
                                        >
                                            <Edit size={12} fill="currentColor" />
                                        </div>
                                    )}
                                 </button>
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
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
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
                            <DeptIcon3D 
                                iconName={activeDept.icon} 
                                colorClass={activeDept.color} 
                                isHovered={true}
                                layoutId={`dept-icon-${activeDept.id}`}
                                className="w-40 h-40 mx-auto"
                            />
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl font-display font-black text-white mt-6"
                            >
                                {activeDept.name}
                            </motion.h2>
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
