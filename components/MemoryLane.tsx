
import React, { useState, useRef } from 'react';
import Section from './ui/Section';
// Fix: Systemic type issues with framer-motion in this environment
import { motion as _motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
const motion = _motion as any;
import { useAdmin } from '../context/AdminContext';
// Added Calendar icon to imports
import { Plus, Trash2, Camera, Sparkles, Edit, Image as ImageIcon, Calendar } from 'lucide-react';
import AdminModal from './ui/AdminModal';
import { Memory } from '../types';

const MemoryCard = ({ memory, index, isAdmin, onDelete, onEdit }: { memory: Memory, index: number, isAdmin: boolean, onDelete: (id: string) => void, onEdit: (m: Memory) => void }) => {
  const cardRef = useRef(null);
  
  // Random-ish initial rotations for that "scattered photo" look
  const rotations = [-12, 8, -5, 15, -8, 10, -15, 6];
  const initialRotation = rotations[index % rotations.length];
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Smoother, more subtle parallax values
  const yMove = useTransform(scrollYProgress, [0, 1], [60 * ((index % 3) - 1), -60 * ((index % 3) - 1)]);
  const rotateMove = useTransform(scrollYProgress, [0, 1], [initialRotation - 5, initialRotation + 5]);
  const opacityMove = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Spring physics for "smoothness"
  const springY = useSpring(yMove, { stiffness: 60, damping: 25 });
  const springRotate = useSpring(rotateMove, { stiffness: 60, damping: 25 });

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        y: springY, 
        rotate: springRotate,
        opacity: opacityMove
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1, 
        transition: { type: "spring", stiffness: 100, damping: 20, delay: (index % 4) * 0.1 }
      }}
      viewport={{ once: false, margin: "-100px" }}
      whileHover={{ 
        rotate: 0, 
        scale: 1.1, 
        zIndex: 50,
        y: -15,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="relative p-3 pb-10 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] group cursor-pointer"
    >
      {/* Flash effect on entry */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-white z-50 pointer-events-none"
      />

      {isAdmin && (
          <div className="absolute top-4 right-4 z-[60] flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(memory); }}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 shadow-xl"
              >
                <Edit size={14} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(memory.id); }}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-500 shadow-xl"
              >
                <Trash2 size={14} />
              </button>
          </div>
      )}

      <div className="relative aspect-[4/5] overflow-hidden bg-slate-200 mb-4 rounded-sm">
        <motion.img 
            src={memory.image} 
            alt={memory.description} 
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-neon-orange/0 group-hover:bg-neon-orange/5 transition-colors duration-500"></div>
      </div>

      <div className="px-1">
        <p className="text-slate-900 font-display font-bold text-sm leading-snug line-clamp-2 italic mb-2">
            {memory.description}
        </p>
        {memory.date && (
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <Calendar size={10} className="text-neon-orange" /> {memory.date}
            </div>
        )}
      </div>

      {/* Polaroid Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm border border-white/20 rotate-1 skew-x-12 opacity-80 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
};

const MemoryLane: React.FC = () => {
  const { memories, user, addMemory, deleteMemory, updateMemory } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState<Partial<Memory>>({ image: '', description: '', date: '' });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animated line offset
  const pathOffset = useTransform(scrollYProgress, [0, 1], [1000, 0]);
  const springPath = useSpring(pathOffset, { stiffness: 40, damping: 20 });

  const handleOpenAdd = () => {
    setEditingMemory({ image: '', description: '', date: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m: Memory) => {
    setEditingMemory(m);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMemory.id) {
        await updateMemory(editingMemory.id, editingMemory);
    } else {
        // @ts-ignore
        await addMemory(editingMemory);
    }
    setIsModalOpen(false);
    setEditingMemory({ image: '', description: '', date: '' });
  };

  return (
    <Section id="memories" className="bg-[#050505] py-40 overflow-visible relative border-b border-slate-900">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-orange/10 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute top-20 left-10 w-96 h-96 bg-neon-orange/5 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-red/5 blur-[150px] rounded-full"></div>
      </div>

      <div ref={containerRef} className="container mx-auto px-6 relative">
        
        {/* Animated Lane Path SVG */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 hidden lg:block">
            <svg width="100%" height="100%" viewBox="0 0 1200 1600" fill="none" className="w-full">
                <motion.path
                    d="M600 0 C600 400 100 200 100 600 C100 1000 1100 800 1100 1200 C1100 1600 600 1400 600 2000"
                    stroke="#FF5722"
                    strokeWidth="2"
                    strokeDasharray="10 10"
                    style={{ pathLength: 1, strokeDashoffset: springPath }}
                />
            </svg>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start mb-40 gap-8 relative z-10">
            <div>
                <motion.div
                   initial={{ opacity: 0, scale: 0.5 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   className="flex items-center gap-3 text-neon-orange mb-4"
                >
                    <Sparkles size={20} className="animate-pulse" />
                    <span className="font-bold tracking-[0.4em] uppercase text-xs">THE CHRONICLES</span>
                </motion.div>
                
                <motion.h3 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-6xl md:text-8xl font-display font-black text-white leading-[0.9] mb-6"
                >
                    Memory <br/> <span className="text-transparent stroke-text">Lane</span>
                </motion.h3>
                <p className="text-slate-500 max-w-sm text-lg font-light leading-relaxed">
                    Scroll through our highlights. A visual diary of the people and events that make VoiceIt home.
                </p>
            </div>

            {user && (
                <button 
                    onClick={handleOpenAdd}
                    className="mt-8 md:mt-0 group px-8 py-4 bg-white text-black font-black rounded-full flex items-center gap-3 hover:bg-neon-orange transition-all shadow-xl active:scale-95"
                >
                    <Plus size={24} /> ADD MOMENT
                </button>
            )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-32 relative z-10">
            {memories.map((memory, index) => (
                <div 
                    key={memory.id} 
                    className={`
                        flex justify-center
                        ${index % 3 === 1 ? 'md:pt-40' : ''} 
                        ${index % 3 === 2 ? 'md:pt-20' : ''}
                    `}
                >
                    <MemoryCard 
                        memory={memory} 
                        index={index} 
                        isAdmin={!!user} 
                        onDelete={deleteMemory}
                        onEdit={handleOpenEdit}
                    />
                </div>
            ))}
        </div>

        {/* Floating End Piece */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-60 flex flex-col items-center justify-center text-center"
        >
            <div className="w-16 h-16 rounded-full border border-slate-800 flex items-center justify-center mb-6 text-slate-800">
                <ImageIcon size={24} />
            </div>
            <h4 className="text-slate-800 font-bold tracking-widest uppercase text-xs">More moments coming soon</h4>
        </motion.div>
      </div>

      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingMemory.id ? "Edit Moment" : "Post a Memory"}>
          <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-4">
                  <div>
                    <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Description</label>
                    <textarea 
                        required 
                        placeholder="What happened in this photo?" 
                        value={editingMemory.description} 
                        onChange={e => setEditingMemory({...editingMemory, description: e.target.value})} 
                        className="w-full bg-black border border-slate-700 p-4 rounded-xl text-white text-sm focus:border-neon-orange outline-none h-28" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Date (Optional)</label>
                    <input 
                        type="text" 
                        placeholder="e.g., Feb 2024" 
                        value={editingMemory.date} 
                        onChange={e => setEditingMemory({...editingMemory, date: e.target.value})} 
                        className="w-full bg-black border border-slate-700 p-4 rounded-xl text-white text-sm focus:border-neon-orange outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Image URL</label>
                    <input 
                        required 
                        type="text" 
                        placeholder="https://images.unsplash.com/..." 
                        value={editingMemory.image} 
                        onChange={e => setEditingMemory({...editingMemory, image: e.target.value})} 
                        className="w-full bg-black border border-slate-700 p-4 rounded-xl text-white text-sm focus:border-neon-orange outline-none" 
                    />
                  </div>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-neon-orange text-black font-black rounded-xl hover:bg-white transition-all shadow-lg"
              >
                  {editingMemory.id ? "UPDATE MOMENT" : "SAVE TO MEMORY LANE"}
              </button>
          </form>
      </AdminModal>

      <style>{`
        .stroke-text {
            -webkit-text-stroke: 1px rgba(255,255,255,0.3);
            color: transparent;
        }
      `}</style>
    </Section>
  );
};

export default MemoryLane;
