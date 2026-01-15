
import React, { useState, useRef } from 'react';
import Section from './ui/Section';
// Fix: Systemic type issues with framer-motion in this environment
import { motion as _motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
const motion = _motion as any;
import { useAdmin } from '../context/AdminContext';
import { Plus, Trash2, Camera, Calendar, Sparkles, Edit } from 'lucide-react';
import AdminModal from './ui/AdminModal';
import { Memory } from '../types';

const MemoryCard = ({ memory, index, isAdmin, onDelete, onEdit }: { memory: Memory, index: number, isAdmin: boolean, onDelete: (id: string) => void, onEdit: (m: Memory) => void }) => {
  const cardRef = useRef(null);
  
  const rotations = [-12, 8, -5, 15, -8, 10, -15, 6];
  const initialRotation = rotations[index % rotations.length];
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const yMove = useTransform(scrollYProgress, [0, 1], [100 * ((index % 3) - 1), -100 * ((index % 3) - 1)]);
  const rotateMove = useTransform(scrollYProgress, [0, 1], [initialRotation - 10, initialRotation + 10]);
  const scaleMove = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const springY = useSpring(yMove, { stiffness: 100, damping: 30 });
  const springRotate = useSpring(rotateMove, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        y: springY, 
        rotate: springRotate,
        scale: scaleMove
      }}
      initial={{ opacity: 0, scale: 0, x: index % 2 === 0 ? -200 : 200 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1, 
        x: 0,
        transition: { type: "spring", stiffness: 50, damping: 15, delay: (index % 5) * 0.1 }
      }}
      viewport={{ once: false, margin: "-50px" }}
      whileHover={{ 
        rotate: 0, 
        scale: 1.15, 
        zIndex: 100,
        y: -20,
        transition: { type: "spring", stiffness: 400, damping: 20 }
      }}
      className="relative p-3 pb-12 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] group cursor-pointer perspective-1000"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.4, ease: "easeOut" }}
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

      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 mb-4">
        <motion.img 
            src={memory.image} 
            alt={memory.description} 
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-neon-orange/0 group-hover:bg-neon-orange/10 transition-colors duration-500"></div>
      </div>

      <div className="px-2">
        <p className="text-slate-800 font-display font-bold text-sm leading-tight line-clamp-2 italic mb-2">
            {memory.description}
        </p>
        {memory.date && (
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                <Sparkles size={10} className="text-neon-orange" /> {memory.date}
            </div>
        )}
      </div>

      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/30 backdrop-blur-md border border-white/20 rotate-2 z-10 skew-x-12 opacity-80 shadow-sm group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/40 blur-xl -z-10 group-hover:bg-neon-orange/20 transition-colors"></div>
    </motion.div>
  );
};

const MemoryLane: React.FC = () => {
  const { memories, user, addMemory, deleteMemory, updateMemory } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState<Partial<Memory>>({ image: '', description: '', date: '' });

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
    <Section id="memories" className="bg-black py-40 overflow-visible relative border-b border-slate-900">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent opacity-50"></div>
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-orange/10 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-red/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-32 gap-8 text-center md:text-left">
            <div className="relative group">
                <motion.div
                   initial={{ scale: 0.8, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   className="absolute -top-16 -left-16 text-white/5 group-hover:text-neon-orange/10 transition-colors duration-1000"
                >
                    <Camera size={240} strokeWidth={1} />
                </motion.div>

                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-neon-orange font-bold tracking-[0.4em] uppercase text-xs mb-4"
                >
                    The Vault
                </motion.h2>
                <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-8xl font-display font-black text-white leading-none"
                >
                    Walking Down <br/> 
                    <span className="relative inline-block mt-2">
                        Memory Lane
                        <motion.div 
                            className="absolute -bottom-2 left-0 h-2 bg-neon-orange/30"
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ delay: 0.5, duration: 1 }}
                        />
                    </span>
                </motion.h3>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-500 mt-6 max-w-md text-lg font-light"
                >
                    A collection of moments that defined us. Frozen in time, echoing forever.
                </motion.p>
            </div>

            {user && (
                <button 
                    onClick={handleOpenAdd}
                    className="group px-8 py-4 bg-white text-black font-black rounded-full flex items-center gap-3 hover:bg-neon-orange hover:text-black transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95"
                >
                    <Plus size={24} className="group-hover:rotate-90 transition-transform" /> 
                    NEW MEMORY
                </button>
            )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24 md:gap-y-32">
            {memories.map((memory, index) => (
                <div 
                    key={memory.id} 
                    className={`
                        flex justify-center
                        ${index % 3 === 1 ? 'md:pt-32' : ''} 
                        ${index % 3 === 2 ? 'md:pt-16' : ''}
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

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-40 text-center"
        >
            <div className="inline-flex items-center gap-2 text-slate-700 text-xs font-bold tracking-widest uppercase">
                <div className="w-12 h-px bg-slate-800"></div>
                Scroll to create your own
                <div className="w-12 h-px bg-slate-800"></div>
            </div>
        </motion.div>
      </div>

      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingMemory.id ? "Edit Moment" : "Freeze a Moment"}>
          <form onSubmit={handleSave} className="space-y-6">
              <div className="p-4 bg-black rounded-2xl border border-slate-800">
                  <label className="block text-slate-500 text-[10px] mb-2 uppercase font-black tracking-widest">Story Snapshot</label>
                  <textarea 
                    required 
                    placeholder="Capture the vibe in a few words..." 
                    value={editingMemory.description} 
                    onChange={e => setEditingMemory({...editingMemory, description: e.target.value})} 
                    className="w-full bg-transparent border-none p-0 text-white text-lg focus:ring-0 resize-none h-24 placeholder:text-slate-800" 
                  />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-slate-500 text-[10px] uppercase font-black tracking-widest">When did it happen?</label>
                    <input 
                        type="text" 
                        placeholder="e.g., Vibrance '23" 
                        value={editingMemory.date} 
                        onChange={e => setEditingMemory({...editingMemory, date: e.target.value})} 
                        className="w-full bg-black border border-slate-700 p-3 rounded-xl text-white text-sm focus:border-neon-orange outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-slate-500 text-[10px] uppercase font-black tracking-widest">Photo URL / Base64</label>
                    <input 
                        required 
                        type="text" 
                        placeholder="https://..." 
                        value={editingMemory.image} 
                        onChange={e => setEditingMemory({...editingMemory, image: e.target.value})} 
                        className="w-full bg-black border border-slate-700 p-3 rounded-xl text-white text-sm focus:border-neon-orange outline-none" 
                    />
                  </div>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-neon-orange text-black font-black text-lg rounded-2xl hover:bg-white transition-all shadow-[0_0_30px_rgba(255,87,34,0.3)]"
              >
                  {editingMemory.id ? "UPDATE MOMENT" : "POST TO MEMORY LANE"}
              </button>
          </form>
      </AdminModal>
    </Section>
  );
};

export default MemoryLane;
