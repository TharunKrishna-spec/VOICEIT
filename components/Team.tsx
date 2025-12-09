
import React, { useState } from 'react';
import Section from './ui/Section';
import { BoardMember } from '../types';
import { useAdmin } from '../context/AdminContext';
import { Plus, Trash2, History, ChevronDown, ChevronUp } from 'lucide-react';
import AdminModal from './ui/AdminModal';
import { motion, AnimatePresence } from 'framer-motion';

const Team: React.FC = () => {
  const { boardMembers, pastTenures, user, addBoardMember, deleteBoardMember, archiveBoard, deletePastTenure } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState<Partial<BoardMember>>({ name: '', role: '', image: '' });
  
  // Past Tenures State
  const [showPastTenures, setShowPastTenures] = useState(false);
  const [archiveYear, setArchiveYear] = useState('');
  const [expandedTenureId, setExpandedTenureId] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    await addBoardMember(newMember);
    setIsAdding(false);
    setNewMember({ name: '', role: '', image: '' });
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
    <Section id="team" className="bg-black">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 relative">
        <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">The Board</h2>
            <p className="text-slate-400 text-lg">Leading the frequency for 2024-25.</p>
        </div>
        <div className="flex gap-4 absolute top-0 right-0 md:relative">
            <button 
                onClick={() => setShowPastTenures(true)} 
                className="bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors text-sm md:text-base"
            >
                <History size={16} /> <span className="hidden sm:inline">Past Tenures</span>
            </button>
            {user && (
                <button onClick={() => setIsAdding(true)} className="bg-neon-orange text-black px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-colors text-sm md:text-base">
                    <Plus size={16} /> Add Member
                </button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {boardMembers.map((member) => (
            <div key={member.id} className="group relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 hover:border-neon-orange/50 transition-colors duration-300">
                {user && (
                    <button onClick={() => deleteBoardMember(member.id)} className="absolute top-2 right-2 z-20 p-2 bg-red-600 text-white rounded-full hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                    </button>
                )}
                <div className="aspect-square overflow-hidden">
                    <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100">
                    <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-neon-orange text-sm font-medium tracking-wide uppercase">{member.role}</p>
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* Add Member Modal */}
      <AdminModal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add Board Member">
          <form onSubmit={handleAdd} className="space-y-4">
              <input required placeholder="Name" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <input required placeholder="Role" value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <input required placeholder="Image URL" value={newMember.image} onChange={e => setNewMember({...newMember, image: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <button type="submit" className="w-full py-2 bg-neon-orange text-black font-bold rounded">Add Member</button>
          </form>
      </AdminModal>

      {/* Past Tenures Modal */}
      <AdminModal isOpen={showPastTenures} onClose={() => setShowPastTenures(false)} title="Archive: Past Tenures">
          <div className="space-y-6">
              {user && (
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                      <h4 className="text-sm font-bold text-neon-orange uppercase tracking-wider mb-2">Admin: Archive Current Board</h4>
                      <p className="text-xs text-slate-400 mb-3">This will copy the currently displayed board members into a new Past Tenure entry.</p>
                      <form onSubmit={handleArchive} className="flex gap-2">
                          <input 
                              required 
                              placeholder="Year (e.g., 2023-24)" 
                              value={archiveYear} 
                              onChange={e => setArchiveYear(e.target.value)} 
                              className="flex-1 bg-black border border-slate-600 p-2 rounded text-white text-sm"
                          />
                          <button type="submit" className="px-4 py-2 bg-white text-black font-bold rounded text-sm hover:bg-neon-orange transition-colors">
                              Archive
                          </button>
                      </form>
                  </div>
              )}

              <div className="space-y-2">
                  {pastTenures.length === 0 && <p className="text-slate-500 text-center py-4">No past records found.</p>}
                  
                  {pastTenures.sort((a,b) => b.year.localeCompare(a.year)).map((tenure) => (
                      <div key={tenure.id} className="border border-slate-800 rounded-xl bg-slate-900/50 overflow-hidden">
                          <div 
                              onClick={() => toggleTenure(tenure.id)}
                              className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800 transition-colors"
                          >
                              <h3 className="font-bold text-white text-lg">{tenure.year} <span className="text-slate-500 text-sm font-normal ml-2">({tenure.members.length} members)</span></h3>
                              <div className="flex items-center gap-3">
                                  {user && (
                                      <button 
                                          onClick={(e) => { e.stopPropagation(); deletePastTenure(tenure.id); }}
                                          className="p-1.5 bg-red-900/30 text-red-500 rounded hover:bg-red-600 hover:text-white transition-colors"
                                      >
                                          <Trash2 size={14} />
                                      </button>
                                  )}
                                  {expandedTenureId === tenure.id ? <ChevronUp size={20} className="text-neon-orange" /> : <ChevronDown size={20} className="text-slate-500" />}
                              </div>
                          </div>

                          <AnimatePresence>
                              {expandedTenureId === tenure.id && (
                                  <motion.div 
                                      initial={{ height: 0 }}
                                      animate={{ height: 'auto' }}
                                      exit={{ height: 0 }}
                                      className="overflow-hidden"
                                  >
                                      <div className="p-4 pt-0 grid grid-cols-2 gap-3 border-t border-slate-800/50">
                                          {tenure.members.map((member) => (
                                              <div key={member.id} className="flex items-center gap-3 bg-black p-2 rounded-lg border border-slate-800">
                                                  <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover bg-slate-800" />
                                                  <div>
                                                      <div className="text-sm font-bold text-white">{member.name}</div>
                                                      <div className="text-xs text-slate-500">{member.role}</div>
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
