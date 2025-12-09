
import React, { useState } from 'react';
import { Instagram, Youtube, Linkedin, LogOut, Settings, Edit } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { LOGO_IMAGE } from '../lib/initialData';
import AdminModal from './ui/AdminModal';
import { SocialLinks } from '../types';

const Footer: React.FC = () => {
  const { user, openLoginModal, logout, socialLinks, updateSocialLinks } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<SocialLinks>(socialLinks);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        // Offset for the fixed navbar
        const yOffset = -100; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleEditClick = () => {
    setEditForm(socialLinks);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSocialLinks(editForm);
    setIsEditing(false);
  };

  return (
    <footer className="bg-black border-t border-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-full border border-slate-800 overflow-hidden flex items-center justify-center">
                        {LOGO_IMAGE ? (
                            <img src={LOGO_IMAGE} alt="VoiceIt Logo" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-neon-orange flex items-center justify-center">
                                <span className="font-bold text-black text-sm">V</span>
                            </div>
                        )}
                     </div>
                     <span className="text-2xl font-display font-bold tracking-tight text-white">VOICEIT</span>
                </div>
                <p className="text-slate-500 max-w-xs">
                    The Official Radio Club of VIT Chennai. <br/>
                    Entertaining, engaging, and enlightening the campus since 2013.
                </p>
            </div>
            
            <div>
                <h4 className="text-white font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-slate-500">
                    <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-neon-orange transition-colors cursor-pointer">About</a></li>
                    <li><a href="#events" onClick={(e) => scrollToSection(e, 'events')} className="hover:text-neon-orange transition-colors cursor-pointer">Events</a></li>
                    <li><a href="#departments" onClick={(e) => scrollToSection(e, 'departments')} className="hover:text-neon-orange transition-colors cursor-pointer">Departments</a></li>
                    <li><a href="#team" onClick={(e) => scrollToSection(e, 'team')} className="hover:text-neon-orange transition-colors cursor-pointer">Team</a></li>
                </ul>
            </div>

            <div>
                <div className="flex items-center gap-3 mb-4">
                    <h4 className="text-white font-bold">Connect</h4>
                    {user && (
                        <button onClick={handleEditClick} className="text-slate-500 hover:text-neon-orange transition-colors">
                            <Edit size={14} />
                        </button>
                    )}
                </div>
                <div className="flex gap-4">
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-br from-purple-600 to-orange-500 transition-all">
                        <Instagram size={18} />
                    </a>
                    <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 transition-all">
                        <Youtube size={18} />
                    </a>
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                        <Linkedin size={18} />
                    </a>
                </div>
            </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
            <p>&copy; 2024 VoiceIt VIT Chennai. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-slate-400">Privacy Policy</a>
                
                {user ? (
                   <button onClick={logout} className="flex items-center gap-2 text-neon-orange hover:text-white transition-colors font-bold">
                      <LogOut size={14} /> Logout
                   </button>
                ) : (
                   <button onClick={openLoginModal} className="flex items-center gap-2 hover:text-neon-orange transition-colors">
                      <Settings size={14} /> Admin Login
                   </button>
                )}
            </div>
        </div>
      </div>

      {/* Admin Modal for Social Links */}
      <AdminModal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Manage Social Links">
          <form onSubmit={handleSave} className="space-y-4">
              <div>
                  <label className="block text-slate-400 text-sm mb-1 flex items-center gap-2">
                      <Instagram size={14} /> Instagram URL
                  </label>
                  <input 
                    type="text" 
                    value={editForm.instagram} 
                    onChange={e => setEditForm({...editForm, instagram: e.target.value})} 
                    className="w-full bg-black border border-slate-700 p-2 rounded text-white text-sm" 
                  />
              </div>
              <div>
                  <label className="block text-slate-400 text-sm mb-1 flex items-center gap-2">
                      <Youtube size={14} /> YouTube URL
                  </label>
                  <input 
                    type="text" 
                    value={editForm.youtube} 
                    onChange={e => setEditForm({...editForm, youtube: e.target.value})} 
                    className="w-full bg-black border border-slate-700 p-2 rounded text-white text-sm" 
                  />
              </div>
              <div>
                  <label className="block text-slate-400 text-sm mb-1 flex items-center gap-2">
                      <Linkedin size={14} /> LinkedIn URL
                  </label>
                  <input 
                    type="text" 
                    value={editForm.linkedin} 
                    onChange={e => setEditForm({...editForm, linkedin: e.target.value})} 
                    className="w-full bg-black border border-slate-700 p-2 rounded text-white text-sm" 
                  />
              </div>
              <button type="submit" className="w-full py-2 bg-neon-orange text-black font-bold rounded">Save Links</button>
          </form>
      </AdminModal>
    </footer>
  );
};

export default Footer;
