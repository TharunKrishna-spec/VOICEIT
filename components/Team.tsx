
import React, { useState } from 'react';
import Section from './ui/Section';
import { BoardMember } from '../types';
import { useAdmin } from '../context/AdminContext';
import { Plus, Trash2, History, ChevronDown, ChevronUp, Edit, X, Quote } from 'lucide-react';
import AdminModal from './ui/AdminModal';
// Fix: Systemic type issues with framer-motion in this environment
import { motion as _motion, AnimatePresence } from 'framer-motion';
const motion = _motion as any;

const Team: React.FC = () => {
  const { boardMembers, pastTenures, user, addBoardMember, updateBoardMember, deleteBoardMember, archiveBoard, deletePastTenure } = useAdmin();
  
  // States for Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPastTenures, setShowPastTenures] = useState(false);
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);
  
  // State for Editing
  const [editingMember, setEditingMember] = useState<Partial<BoardMember>>({ name: '', role: '', tagline: '', image: '' });
  
  // State for Archive
  const [archiveYear, setArchiveYear] = useState('');
  const [expandedTenureId, setExpandedTenureId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingMember({ name: '', role: '', tagline: '', image: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e: React.MouseEvent, m: BoardMember) => {
    e.stopPropagation(); 
    setEditingMember(m);
    setIsModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this board member?")) {
      deleteBoardMember(id);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember.id) {
        await updateBoardMember(editingMember.id, editingMember);
    } else {
        // @ts-ignore
        await addBoardMember(editingMember);
    }
    setIsModalOpen(false);
    setEditingMember({ name: '', role: '', tagline: '', image: '' });
  };

  const handleArchive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (archiveYear) {
        await archiveBoard(archiveYear);
        setArchiveYear('');
    }
  };

  const toggleTenure = (id: string) => {
    if (expandedTenureId === id) setExpandedTenureId(null);
    else setExpandedTenureId(id);
  };

  return (
    <Section id="team" className="bg-black py-32 relative">
      {/* Background decoration to anchor the layers */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-neon-orange/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-neon-red/10 to-transparent blur-3xl"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 relative z-10">
        <div className="max-w-2xl">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-neon-orange mb-4"
            >
                <div className="w-8 h-px bg-neon-orange"></div>
                <span className="font-black tracking-[0.3em] uppercase text-[10px]">Leadership</span>
            </motion.div>
            <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-6xl font-display font-black mb-4 text-white leading-none"
            >
                The <span className="text-neon-orange">Board</span>
            </motion.h2>
            <p className="text-slate-400 text-lg font-light max-w-md">Meet the creative minds steering the frequency of VIT Chennai for the 2024-25 tenure.</p>
        </div>
        
        <div className="flex gap-3">
            <button 
                onClick={() => setShowPastTenures(true)} 
                className="bg-slate-900 border border-slate-800 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-slate-800 transition-all text-sm group active:scale-95"
            >
                <History size={16} className="group-hover:rotate-[-45deg] transition-transform" /> 
                History
            </button>
            {user && (
                <button 
                    onClick={handleOpenAdd} 
                    className="bg-neon-orange text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white hover:shadow-[0_0_30px_rgba(255,87,34,0.4)] transition-all text-sm active:scale-95"
                >
                    <Plus size={16} /> Add Member
                </button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {boardMembers.map((member, idx) => (
            <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onClick={() => setSelectedMember(member)}
                className="group relative cursor-pointer"
            >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#0a0a0a] border border-slate-800 group-hover:border-neon-orange/40 transition-all duration-500 shadow-2xl">
                    {/* Admin Controls Layer */}
                    {user && (
                        <div className="absolute top-4 right-4 z-40 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={(e) => handleOpenEdit(e, member)} 
                                className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 shadow-lg transition-transform active:scale-90"
                            >
                                <Edit size={14} />
                            </button>
                            <button 
                                onClick={(e) => handleDelete(e, member.id)} 
                                className="p-2.5 bg-red-600 text-white rounded-full hover:bg-red-500 shadow-lg transition-transform active:scale-90"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    )}

                    {/* Image Layer */}
                    <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105" 
                    />

                    {/* Gradient & Vignette Layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>

                    {/* Content Layer */}
                    <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="mb-3">
                             <span className="text-[9px] font-black tracking-[0.3em] uppercase text-black bg-neon-orange px-2.5 py-1 rounded-sm shadow-sm">
                                {member.role}
                             </span>
                        </div>
                        <h3 className="text-2xl font-display font-black text-white group-hover:text-neon-orange transition-colors">
                            {member.name}
                        </h3>
                        
                        {/* Preview of tagline on hover */}
                        <p className="text-slate-400 text-xs mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 line-clamp-2 font-light italic leading-relaxed">
                            "{member.tagline || 'Click to view profile'}"
                        </p>
                    </div>
                </div>

                {/* Outer Glow on hover */}
                <div className="absolute -inset-1 bg-gradient-to-b from-neon-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10"></div>
            </motion.div>
        ))}
      </div>

      {/* Member Spotlight Modal Layer - Highest Z-Index */}
      <AnimatePresence>
        {selectedMember && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedMember(null)}
                    className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 50 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="relative w-full max-w-5xl bg-[#050505] border border-slate-800 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(255,87,34,0.1)] flex flex-col md:flex-row min-h-[500px]"
                    onClick={e => e.stopPropagation()}
                >
                    <button 
                        onClick={() => setSelectedMember(null)}
                        className="absolute top-8 right-8 z-[1010] p-4 bg-white/5 hover:bg-neon-orange hover:text-black rounded-full transition-all text-white backdrop-blur-md active:scale-90"
                    >
                        <X size={24} />
                    </button>

                    {/* Image Column */}
                    <div className="w-full md:w-5/12 relative bg-slate-900 overflow-hidden h-72 md:h-auto">
                        <motion.img 
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            src={selectedMember.image} 
                            alt={selectedMember.name} 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050505] hidden md:block"></div>
                    </div>

                    {/* Text Column */}
                    <div className="w-full md:w-7/12 p-8 md:p-20 flex flex-col justify-center relative">
                        {/* Large Background Quote Symbol */}
                        <div className="absolute top-10 right-10 opacity-[0.03] select-none pointer-events-none">
                            <Quote size={280} className="text-neon-orange" />
                        </div>

                        <div className="relative z-10">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block px-5 py-2 rounded-full bg-neon-orange/10 border border-neon-orange/20 text-neon-orange text-[10px] font-black tracking-widest uppercase mb-8"
                            >
                                {selectedMember.role}
                            </motion.div>
                            
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-7xl font-display font-black text-white mb-10 leading-none"
                            >
                                {selectedMember.name}
                            </motion.h2>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-8"
                            >
                                <div className="relative">
                                    <Quote size={32} className="text-neon-orange opacity-40 absolute -top-8 -left-8" />
                                    <p className="text-xl md:text-3xl text-slate-200 font-light italic leading-relaxed font-serif">
                                        {selectedMember.tagline || 'Leading the frequency with passion and purpose.'}
                                    </p>
                                </div>
                                
                                <div className="pt-10 border-t border-slate-900 flex items-center gap-4">
                                    <div className="w-16 h-px bg-slate-800"></div>
                                    <span className="text-slate-600 font-bold uppercase tracking-[0.4em] text-[10px]">Tenure 2024-25</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Admin Editor Modal Layer */}
      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingMember.id ? "Edit Profile" : "Add Board Profile"}>
          <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">Member Name</label>
                    <input 
                        required 
                        placeholder="e.g., Arjun Das" 
                        value={editingMember.name} 
                        onChange={e => setEditingMember({...editingMember, name: e.target.value})} 
                        className="w-full bg-black border border-slate-800 p-4 rounded-xl text-white text-sm focus:border-neon-orange transition-colors outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">Role</label>
                    <input 
                        required 
                        placeholder="e.g., President" 
                        value={editingMember.role} 
                        onChange={e => setEditingMember({...editingMember, role: e.target.value})} 
                        className="w-full bg-black border border-slate-800 p-4 rounded-xl text-white text-sm focus:border-neon-orange transition-colors outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">Personal Tagline</label>
                    <textarea 
                        required 
                        placeholder="A quote or philosophy that defines them..." 
                        value={editingMember.tagline || ''} 
                        onChange={e => setEditingMember({...editingMember, tagline: e.target.value})} 
                        className="w-full bg-black border border-slate-800 p-4 rounded-xl text-white text-sm focus:border-neon-orange transition-colors outline-none h-28 resize-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">Portrait Image URL</label>
                    <input 
                        required 
                        placeholder="https://..." 
                        value={editingMember.image} 
                        onChange={e => setEditingMember({...editingMember, image: e.target.value})} 
                        className="w-full bg-black border border-slate-800 p-4 rounded-xl text-white text-sm focus:border-neon-orange transition-colors outline-none" 
                    />
                  </div>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-neon-orange text-black font-black rounded-xl hover:bg-white transition-all shadow-xl active:scale-95"
              >
                  {editingMember.id ? "UPDATE PROFILE" : "POST PROFILE"}
              </button>
          </form>
      </AdminModal>

      {/* History Modal Layer */}
      <AdminModal isOpen={showPastTenures} onClose={() => setShowPastTenures(false)} title="Historical Archives">
          <div className="space-y-6">
              {user && (
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                      <h4 className="text-[10px] font-black text-neon-orange uppercase tracking-widest mb-2">Archive Current Board</h4>
                      <p className="text-xs text-slate-500 mb-5 leading-relaxed">Snapshot the current team into history before recruiting the new batch.</p>
                      <form onSubmit={handleArchive} className="flex gap-3">
                          <input 
                              required 
                              placeholder="Year (e.g., 2023-24)" 
                              value={archiveYear} 
                              onChange={e => setArchiveYear(e.target.value)} 
                              className="flex-1 bg-black border border-slate-800 p-3 rounded-xl text-white text-sm outline-none focus:border-neon-orange"
                          />
                          <button type="submit" className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neon-orange transition-all text-sm active:scale-95">
                              Snapshot
                          </button>
                      </form>
                  </div>
              )}

              <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
                  {pastTenures.length === 0 && <p className="text-slate-500 text-center py-12">History is still being written...</p>}
                  
                  {pastTenures.map((tenure) => (
                      <div key={tenure.id} className="border border-slate-800 rounded-2xl bg-[#080808] overflow-hidden">
                          <div 
                              onClick={() => toggleTenure(tenure.id)}
                              className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/5 transition-colors"
                          >
                              <div className="flex items-center gap-4">
                                  <h3 className="font-black text-white text-lg">{tenure.year}</h3>
                                  <span className="text-[9px] bg-slate-900 text-slate-500 border border-slate-800 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{tenure.members.length} Members</span>
                              </div>
                              <div className="flex items-center gap-3">
                                  {user && (
                                      <button 
                                          onClick={(e) => { e.stopPropagation(); deletePastTenure(tenure.id); }}
                                          className="p-1.5 text-slate-600 hover:text-red-500 transition-colors"
                                      >
                                          <Trash2 size={16} />
                                      </button>
                                  )}
                                  {expandedTenureId === tenure.id ? <ChevronUp size={20} className="text-neon-orange" /> : <ChevronDown size={20} className="text-slate-600" />}
                              </div>
                          </div>

                          <AnimatePresence>
                              {expandedTenureId === tenure.id && (
                                  <motion.div 
                                      initial={{ height: 0 }}
                                      animate={{ height: 'auto' }}
                                      exit={{ height: 0 }}
                                      className="overflow-hidden bg-black/40"
                                  >
                                      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-900">
                                          {tenure.members.map((member) => (
                                              <div key={member.id} className="flex items-center gap-4 bg-slate-900/40 p-3 rounded-2xl border border-slate-800/50">
                                                  <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover bg-slate-800" />
                                                  <div className="overflow-hidden">
                                                      <div className="text-xs font-bold text-white truncate">{member.name}</div>
                                                      <div className="text-[9px] text-neon-orange font-black uppercase tracking-widest truncate">{member.role}</div>
                                                  </div>
                                              </div>
                                          ))}
                                      </div>
                                  </motion.div>
                              )}
                          </AnimatePresence>
                      </div>
                  ))}
              </div>
          </div>
      </AdminModal>
    </Section>
  );
};

export default Team;
