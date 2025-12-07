import React, { useState } from 'react';
import Section from './ui/Section';
import { Mic, ArrowRight, Settings, CheckCircle, XCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import AdminModal from './ui/AdminModal';
import { RecruitmentData } from '../types';

const JoinCTA: React.FC = () => {
  const { user, recruitment, updateRecruitment } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<RecruitmentData>({ isOpen: false, link: '' });

  // Load current data when opening modal
  const handleOpenEdit = () => {
    setEditForm(recruitment);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateRecruitment(editForm);
    setIsEditing(false);
  };

  const handleApply = () => {
    if (recruitment.isOpen && recruitment.link) {
        window.open(recruitment.link, '_blank');
    }
  };

  return (
    <Section id="join" className="bg-slate-950 py-32 relative">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-orange-950 to-black border border-slate-700 p-8 md:p-20 text-center">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-neon-orange opacity-10 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-red opacity-10 blur-3xl rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        
        {/* Admin Edit Button */}
        {user && (
            <button onClick={handleOpenEdit} className="absolute top-6 right-6 z-20 bg-slate-800 text-white p-2 rounded-full hover:bg-neon-orange hover:text-black transition-colors">
                <Settings size={20} />
            </button>
        )}

        <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 text-white">
                Find Your Voice.
            </h2>
            <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed">
                Whether you speak, edit, write, or design – there's a place for you in the studio.
                {recruitment.isOpen ? " Applications are currently OPEN!" : " Recruitment for the next batch opens soon."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                    onClick={handleApply}
                    disabled={!recruitment.isOpen}
                    className={`
                        px-10 py-4 text-lg font-bold rounded-full flex items-center gap-2 shadow-[0_0_30px_rgba(255,87,34,0.3)] transition-all
                        ${recruitment.isOpen 
                            ? 'bg-white text-black hover:scale-105 hover:bg-neon-orange cursor-pointer' 
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-75'
                        }
                    `}
                >
                    {recruitment.isOpen ? "Apply Now" : "Recruitment Closed"} <Mic size={20} />
                </button>
                
                {!recruitment.isOpen && <span className="text-slate-500 text-sm font-medium">Stay tuned for updates</span>}
            </div>
        </div>
      </div>

      {/* Admin Modal */}
      <AdminModal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Manage Recruitment">
          <form onSubmit={handleSave} className="space-y-6">
              
              {/* Toggle Status */}
              <div className="flex items-center justify-between bg-black p-4 rounded border border-slate-700">
                  <span className="text-white font-bold">Registration Status</span>
                  <button 
                    type="button"
                    onClick={() => setEditForm({...editForm, isOpen: !editForm.isOpen})}
                    className={`flex items-center gap-2 px-4 py-2 rounded font-bold transition-colors ${editForm.isOpen ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                  >
                      {editForm.isOpen ? <><CheckCircle size={16}/> Open</> : <><XCircle size={16}/> Closed</>}
                  </button>
              </div>

              {/* Form Link */}
              <div>
                  <label className="block text-slate-400 text-sm mb-2">Google Form Link (Registration URL)</label>
                  <input 
                    type="text" 
                    placeholder="https://forms.google.com/..." 
                    value={editForm.link} 
                    onChange={e => setEditForm({...editForm, link: e.target.value})} 
                    className="w-full bg-black border border-slate-700 p-3 rounded text-white" 
                  />
                  <p className="text-xs text-slate-500 mt-2">Paste the shareable link to your Google Form or registration page here.</p>
              </div>

              <button type="submit" className="w-full py-3 bg-neon-orange text-black font-bold rounded hover:bg-white transition-colors">
                  Save Settings
              </button>
          </form>
      </AdminModal>
    </Section>
  );
};

export default JoinCTA;