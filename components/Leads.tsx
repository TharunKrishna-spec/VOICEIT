import React, { useState } from 'react';
import Section from './ui/Section';
import { motion } from 'framer-motion';
import { AnimatedTooltip } from './ui/AnimatedTooltip';
import { useAdmin } from '../context/AdminContext';
import { Plus, Trash2 } from 'lucide-react';
import AdminModal from './ui/AdminModal';
import { Lead } from '../types';

const Leads: React.FC = () => {
  const { leads, user, addLead, deleteLead } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);
  const [newLead, setNewLead] = useState<Partial<Lead>>({ name: '', designation: '', department: '', image: '' });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    await addLead(newLead);
    setIsAdding(false);
    setNewLead({ name: '', designation: '', department: '', image: '' });
  };

  return (
    <Section id="leads" className="bg-black py-24 min-h-[60vh] flex flex-col justify-center relative">
       <div className="text-center mb-16 relative">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-neon-orange font-bold tracking-wider uppercase text-sm mb-2">The Core</motion.h2>
        <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-display font-black text-white">Department Leads</motion.h3>
        
        {user && (
            <div className="absolute top-0 right-0 flex gap-2">
                <button onClick={() => setIsAdding(true)} className="bg-neon-orange text-black p-2 rounded-full hover:bg-white transition-colors">
                    <Plus size={20} />
                </button>
            </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-8">
        <AnimatedTooltip items={leads} />
        
        {/* Admin Delete List (Since tooltip doesn't support delete buttons easily) */}
        {user && (
            <div className="mt-8 w-full max-w-2xl bg-slate-900 rounded p-4 border border-slate-800">
                <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase">Manage Leads</h4>
                <div className="grid grid-cols-2 gap-2">
                    {leads.map(lead => (
                        <div key={lead.id} className="flex justify-between items-center bg-black p-2 rounded border border-slate-800">
                            <span className="text-sm text-white">{lead.name}</span>
                            <button onClick={() => deleteLead(lead.id)} className="text-red-500 hover:text-red-400"><Trash2 size={14}/></button>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>

      <AdminModal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add Lead">
          <form onSubmit={handleAdd} className="space-y-4">
              <input required placeholder="Name" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <input required placeholder="Designation" value={newLead.designation} onChange={e => setNewLead({...newLead, designation: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <input required placeholder="Department" value={newLead.department} onChange={e => setNewLead({...newLead, department: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <input required placeholder="Image URL" value={newLead.image} onChange={e => setNewLead({...newLead, image: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <button type="submit" className="w-full py-2 bg-neon-orange text-black font-bold rounded">Add Lead</button>
          </form>
      </AdminModal>
    </Section>
  );
};

export default Leads;