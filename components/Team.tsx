import React, { useState } from 'react';
import Section from './ui/Section';
import { BoardMember } from '../types';
import { useAdmin } from '../context/AdminContext';
import { Plus, Trash2 } from 'lucide-react';
import AdminModal from './ui/AdminModal';

const Team: React.FC = () => {
  const { boardMembers, user, addBoardMember, deleteBoardMember } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState<Partial<BoardMember>>({ name: '', role: '', image: '' });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    await addBoardMember(newMember);
    setIsAdding(false);
    setNewMember({ name: '', role: '', image: '' });
  };

  return (
    <Section id="team" className="bg-black">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 relative">
        <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">The Board</h2>
            <p className="text-slate-400 text-lg">Leading the frequency for 2024-25.</p>
        </div>
        {user && (
            <button onClick={() => setIsAdding(true)} className="absolute top-0 right-0 md:relative bg-neon-orange text-black px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-colors">
                <Plus size={16} /> Add Member
            </button>
        )}
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

      <AdminModal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add Board Member">
          <form onSubmit={handleAdd} className="space-y-4">
              <input required placeholder="Name" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <input required placeholder="Role" value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <input required placeholder="Image URL" value={newMember.image} onChange={e => setNewMember({...newMember, image: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <button type="submit" className="w-full py-2 bg-neon-orange text-black font-bold rounded">Add Member</button>
          </form>
      </AdminModal>
    </Section>
  );
};

export default Team;