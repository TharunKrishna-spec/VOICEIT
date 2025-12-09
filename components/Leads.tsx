
import React, { useState } from 'react';
import Section from './ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { Plus, History, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import AdminModal from './ui/AdminModal';
import { Lead } from '../types';
import { LeadSlider } from './ui/LeadSlider';

const Leads: React.FC = () => {
  const { leads, pastLeadTenures, user, addLead, deleteLead, archiveLeads, deletePastLeadTenure } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);
  const [newLead, setNewLead] = useState<Partial<Lead>>({ name: '', designation: '', department: '', image: '', quote: '' });
  
  // Past Tenures State
  const [showPastTenures, setShowPastTenures] = useState(false);
  const [archiveYear, setArchiveYear] = useState('');
  const [expandedTenureId, setExpandedTenureId] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    await addLead(newLead);
    setIsAdding(false);
    setNewLead({ name: '', designation: '', department: '', image: '', quote: '' });
  };

  const handleArchive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (archiveYear) {
        await archiveLeads(archiveYear);
        setArchiveYear('');
    }
  };

  const toggleTenure = (id: string) => {
    if (expandedTenureId === id) setExpandedTenureId(null);
    else setExpandedTenureId(id);
  };

  return (
    <Section id="leads" className="bg-black py-24 flex flex-col justify-center relative">
      
       <div className="text-center mb-16 relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-neon-orange font-bold tracking-wider uppercase text-sm mb-2">The Core</motion.h2>
        <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-display font-black text-white">Department Leads</motion.h3>
        
        <div className="absolute top-0 right-4 md:right-0 flex gap-2">
            <button 
                onClick={() => setShowPastTenures(true)} 
                className="bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors text-sm"
            >
                <History size={16} /> Past Tenures
            </button>
            {user && (
                <button onClick={() => setIsAdding(true)} className="bg-neon-orange text-black px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white transition-colors shadow-[0_0_20px_rgba(255,87,34,0.4)]">
                    <Plus size={16} /> Add Lead
                </button>
            )}
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto">
         <LeadSlider leads={leads} onDelete={deleteLead} isAdmin={!!user} />
      </div>

      <AdminModal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add Lead">
          <form onSubmit={handleAdd} className="space-y-4">
              <input required placeholder="Name" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <input required placeholder="Designation (e.g. Head of Events)" value={newLead.designation} onChange={e => setNewLead({...newLead, designation: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <input required placeholder="Department (e.g. Events)" value={newLead.department} onChange={e => setNewLead({...newLead, department: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <textarea placeholder="Quote / Bio (Optional)" value={newLead.quote || ''} onChange={e => setNewLead({...newLead, quote: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white h-24" />
              <input required placeholder="Image URL" value={newLead.image} onChange={e => setNewLead({...newLead, image: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <button type="submit" className="w-full py-2 bg-neon-orange text-black font-bold rounded">Add Lead</button>
          </form>
      </AdminModal>

      {/* Past Tenures Modal */}
      <AdminModal isOpen={showPastTenures} onClose={() => setShowPastTenures(false)} title="Archive: Past Leads">
          <div className="space-y-6">
              {user && (
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                      <h4 className="text-sm font-bold text-neon-orange uppercase tracking-wider mb-2">Admin: Archive Current Leads</h4>
                      <p className="text-xs text-slate-400 mb-3">This will copy the currently displayed leads into a new Past Tenure entry.</p>
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
                  {pastLeadTenures.length === 0 && <p className="text-slate-500 text-center py-4">No past records found.</p>}
                  
                  {pastLeadTenures.sort((a,b) => b.year.localeCompare(a.year)).map((tenure) => (
                      <div key={tenure.id} className="border border-slate-800 rounded-xl bg-slate-900/50 overflow-hidden">
                          <div 
                              onClick={() => toggleTenure(tenure.id)}
                              className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800 transition-colors"
                          >
                              <h3 className="font-bold text-white text-lg">{tenure.year} <span className="text-slate-500 text-sm font-normal ml-2">({tenure.leads.length} leads)</span></h3>
                              <div className="flex items-center gap-3">
                                  {user && (
                                      <button 
                                          onClick={(e) => { e.stopPropagation(); deletePastLeadTenure(tenure.id); }}
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
                                          {tenure.leads.map((lead) => (
                                              <div key={lead.id} className="flex items-center gap-3 bg-black p-2 rounded-lg border border-slate-800">
                                                  <img src={lead.image} alt={lead.name} className="w-10 h-10 rounded-full object-cover bg-slate-800" />
                                                  <div>
                                                      <div className="text-sm font-bold text-white">{lead.name}</div>
                                                      <div className="text-xs text-slate-500">{lead.designation}</div>
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

export default Leads;
