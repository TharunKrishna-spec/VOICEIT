import React from 'react';
import { Instagram, Youtube, Mail, Music, LogOut, Settings } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Footer: React.FC = () => {
  const { user, openLoginModal, logout } = useAdmin();

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

  return (
    <footer className="bg-black border-t border-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                     <div className="w-8 h-8 rounded-full bg-neon-orange flex items-center justify-center">
                        <span className="font-bold text-black text-xs">V</span>
                     </div>
                     <span className="text-2xl font-display font-bold tracking-tight">VOICEIT</span>
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
                <h4 className="text-white font-bold mb-4">Connect</h4>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-neon-orange transition-all">
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 transition-all">
                        <Youtube size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-green-500 transition-all">
                        <Music size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-500 transition-all">
                        <Mail size={18} />
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
    </footer>
  );
};

export default Footer;