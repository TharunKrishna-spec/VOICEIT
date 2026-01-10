
import React, { useState } from 'react';
import { Instagram, Youtube, Linkedin, LogOut, Settings, Edit, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { LOGO_IMAGE } from '../lib/initialData';
import AdminModal from './ui/AdminModal';
import { SocialLinks, SiteConfig } from '../types';

const Footer: React.FC = () => {
  const { user, openLoginModal, logout, socialLinks, updateSocialLinks, siteConfig, updateSiteConfig } = useAdmin();
  const [isEditingSocials, setIsEditingSocials] = useState(false);
  const [isEditingConfig, setIsEditingConfig] = useState(false);
  const [socialEditForm, setSocialEditForm] = useState<SocialLinks>(socialLinks);
  const [configEditForm, setConfigEditForm] = useState<SiteConfig>(siteConfig);

  // Prefers siteConfig logo from DB, falls back to initialData
  const activeLogo = siteConfig.logo || LOGO_IMAGE;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        const yOffset = -100; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleEditSocials = () => {
    setSocialEditForm(socialLinks);
    setIsEditingSocials(true);
  };

  const handleEditConfig = () => {
    setConfigEditForm(siteConfig);
    setIsEditingConfig(true);
  };

  const handleSaveSocials = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSocialLinks(socialEditForm);
    setIsEditingSocials(false);
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteConfig(configEditForm);
    setIsEditingConfig(false);
  };

  return (
    <footer className="bg-black border-t border-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-full border border-slate-800 overflow-hidden flex items-center justify-center bg-slate-900">
                        {activeLogo ? (
                            <img src={activeLogo} alt="VoiceIt Logo" className="w-full h-full object-cover" />
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
                        <button onClick={handleEditSocials} className="text-slate-500 hover:text-neon-orange transition-colors">
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
                   <div className="flex items-center gap-4">
                       <button onClick={handleEditConfig} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold">
                          <Settings size={14} /> Site Settings
                       </button>
                       <button onClick={logout} className="flex items-center gap-2 text-neon-orange hover:text-white transition-colors font-bold">
                          <LogOut size={14} /> Logout
                       </button>
                   </div>
                ) : (
                   <button onClick={openLoginModal} className="flex items-center gap-2 hover:text-neon-orange transition-colors">
                      <Settings size={14} /> Admin Login
                   </button>
                )}
            </div>
        </div>
      </div>

      {/* Admin Modal for Social Links */}
      <AdminModal isOpen={isEditingSocials} onClose={() => setIsEditingSocials(false)} title="Manage Social Links">
          <form onSubmit={handleSaveSocials} className="space-y-4">
              <div>
                  <label className="block text-slate-400 text-sm mb-1 flex items-center gap-2">
                      <Instagram size={14} /> Instagram URL
                  </label>
                  <input 
                    type="text" 
                    value={socialEditForm.instagram} 
                    onChange={e => setSocialEditForm({...socialEditForm, instagram: e.target.value})} 
                    className="w-full bg-black border border-slate-700 p-2 rounded text-white text-sm" 
                  />
              </div>
              <div>
                  <label className="block text-slate-400 text-sm mb-1 flex items-center gap-2">
                      <Youtube size={14} /> YouTube URL
                  </label>
                  <input 
                    type="text" 
                    value={socialEditForm.youtube} 
                    onChange={e => setSocialEditForm({...socialEditForm, youtube: e.target.value})} 
                    className="w-full bg-black border border-slate-700 p-2 rounded text-white text-sm" 
                  />
              </div>
              <div>
                  <label className="block text-slate-400 text-sm mb-1 flex items-center gap-2">
                      <Linkedin size={14} /> LinkedIn URL
                  </label>
                  <input 
                    type="text" 
                    value={socialEditForm.linkedin} 
                    onChange={e => setSocialEditForm({...socialEditForm, linkedin: e.target.value})} 
                    className="w-full bg-black border border-slate-700 p-2 rounded text-white text-sm" 
                  />
              </div>
              <button type="submit" className="w-full py-2 bg-neon-orange text-black font-bold rounded">Save Links</button>
          </form>
      </AdminModal>

      {/* Admin Modal for Site Config (Marquee & Logo) */}
      <AdminModal isOpen={isEditingConfig} onClose={() => setIsEditingConfig(false)} title="Site Global Settings">
          <form onSubmit={handleSaveConfig} className="space-y-6">
              
              {/* Logo Management */}
              <div className="space-y-4 pb-6 border-b border-slate-800">
                  <h4 className="text-white font-bold flex items-center gap-2"><ImageIcon size={18} className="text-neon-orange" /> Brand Logo</h4>
                  <div className="flex gap-4 items-start">
                      <div className="w-20 h-20 rounded-xl bg-black border border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {configEditForm.logo ? (
                              <img src={configEditForm.logo} alt="Logo Preview" className="w-full h-full object-cover" />
                          ) : (
                              <div className="text-slate-600 text-[10px] text-center p-1 uppercase font-bold">No Custom Logo</div>
                          )}
                      </div>
                      <div className="flex-1 space-y-2">
                          <label className="block text-slate-400 text-xs uppercase font-bold tracking-widest">Logo Base64 String / URL</label>
                          <textarea 
                              value={configEditForm.logo || ''} 
                              onChange={e => setConfigEditForm({...configEditForm, logo: e.target.value})} 
                              className="w-full bg-black border border-slate-700 p-2 rounded text-white text-[10px] h-16 font-mono"
                              placeholder="Paste your data:image/png;base64,... string here"
                          />
                      </div>
                  </div>
                  <p className="text-[10px] text-slate-500 italic leading-tight">Paste your club's square logo here. Transparent background recommended.</p>
              </div>

              {/* Marquee Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-black border border-slate-700 rounded-xl">
                    <div>
                        <h4 className="text-white font-bold">Announcement Marquee</h4>
                        <p className="text-xs text-slate-500">Enable/disable the scrolling ticker.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setConfigEditForm({...configEditForm, showMarquee: !configEditForm.showMarquee})}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${configEditForm.showMarquee ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]' : 'bg-red-600 text-white opacity-60'}`}
                    >
                        {configEditForm.showMarquee ? <><CheckCircle size={16}/> Active</> : <><XCircle size={16}/> Disabled</>}
                    </button>
                </div>

                {configEditForm.showMarquee && (
                  <div className="space-y-2">
                      <label className="block text-slate-400 text-sm mb-1">Marquee Text Content</label>
                      <textarea 
                          value={configEditForm.marqueeText || ''} 
                          onChange={e => setConfigEditForm({...configEditForm, marqueeText: e.target.value})} 
                          className="w-full bg-black border border-slate-700 p-3 rounded-xl text-white text-sm h-24"
                          placeholder="Add your announcement text here..."
                      />
                  </div>
                )}
              </div>

              <button type="submit" className="w-full py-3 bg-neon-orange text-black font-bold rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(255,87,34,0.3)]">
                  Save All Changes
              </button>
          </form>
      </AdminModal>
    </footer>
  );
};

export default Footer;
