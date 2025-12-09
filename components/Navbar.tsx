
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { LOGO_IMAGE } from '../lib/initialData';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSpy = () => {
        const sections = ['hero', 'about', 'events', 'podcasts', 'departments', 'team'];
        
        // Find the current section
        const current = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                // Check if the top of the section is within the viewport (with some offset)
                return rect.top <= 200 && rect.bottom >= 200;
            }
            return false;
        });

        if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSpy);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('scroll', handleSpy);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        // Offset for the fixed navbar
        const yOffset = -100; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({ top: y, behavior: 'smooth' });
        setActiveSection(id);
        setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Events', href: '#events', id: 'events' },
    { name: 'Podcasts', href: '#podcasts', id: 'podcasts' },
    { name: 'Depts', href: '#departments', id: 'departments' },
    { name: 'Team', href: '#team', id: 'team' },
  ];

  return (
    <>
    {/* Desktop Fixed Logo - Left Aligned */}
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-6 left-8 z-50 hidden md:block"
    >
        <button onClick={scrollToTop} className="block group">
            <div className="w-12 h-12 rounded-full border border-slate-700 bg-black/50 backdrop-blur-md overflow-hidden shadow-[0_0_15px_rgba(255,87,34,0.1)] group-hover:shadow-[0_0_25px_rgba(255,87,34,0.4)] transition-all duration-300">
                {LOGO_IMAGE ? (
                    <img src={LOGO_IMAGE} alt="VoiceIt Logo" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neon-orange to-red-600 flex items-center justify-center">
                        <span className="font-bold text-black text-lg">V</span>
                    </div>
                )}
            </div>
        </button>
    </motion.div>

    {/* Desktop Floating Dock - Right Aligned */}
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
      className={cn(
        "fixed top-6 right-8 z-50 hidden md:flex items-center gap-2 px-2 py-2 rounded-full border transition-all duration-300 origin-right",
        isScrolled 
            ? "bg-black/80 backdrop-blur-xl border-slate-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]" 
            : "bg-black/40 backdrop-blur-md border-white/10"
      )}
    >
        {/* Links */}
        <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                    <li key={link.name} className="relative">
                        <a 
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.id)}
                            className={cn(
                                "relative z-10 block px-5 py-2 text-sm font-bold transition-colors duration-300",
                                isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                            )}
                        >
                            {link.name}
                        </a>
                        {isActive && (
                            <motion.div
                                layoutId="activePill"
                                className="absolute inset-0 bg-slate-800/80 rounded-full border border-slate-600"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </li>
                );
            })}
        </ul>

        <div className="w-px h-6 bg-slate-700 mx-2"></div>

        {/* CTA */}
        <a 
            href="#join"
            onClick={(e) => scrollToSection(e, 'join')}
            className="group relative flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-black font-bold text-sm overflow-hidden hover:bg-neon-orange transition-colors duration-300"
        >
            <span className="relative z-10">Join</span>
            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </a>
    </motion.nav>

    {/* Mobile Bar */}
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-black/90 backdrop-blur-lg border-b border-slate-800">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border border-slate-700">
                 {LOGO_IMAGE ? (
                    <img src={LOGO_IMAGE} alt="Logo" className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neon-orange to-red-600 flex items-center justify-center">
                        <span className="font-bold text-white text-xs">V</span>
                    </div>
                 )}
            </div>
            <span className="font-display font-bold text-white">VOICEIT</span>
        </div>
        <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-white hover:text-neon-orange transition-colors"
        >
            <Menu />
        </button>
    </div>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center"
            >
                <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white"
                >
                    <X size={32} />
                </button>

                <div className="flex flex-col gap-8 text-center">
                    {navLinks.map((link, index) => (
                        <motion.a 
                            key={link.name} 
                            href={link.href}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * index }}
                            onClick={(e) => scrollToSection(e, link.id)}
                            className={cn(
                                "text-4xl font-display font-black tracking-tight hover:text-neon-orange transition-colors",
                                activeSection === link.id ? "text-neon-orange" : "text-white"
                            )}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                    
                    <motion.a 
                        href="#join"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        onClick={(e) => scrollToSection(e, 'join')}
                        className="mt-8 px-8 py-3 bg-neon-orange text-black font-bold text-xl rounded-full"
                    >
                        Join The Club
                    </motion.a>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};

export default Navbar;