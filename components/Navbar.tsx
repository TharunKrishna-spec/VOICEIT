import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSpy = () => {
        const sections = ['about', 'events', 'podcasts', 'departments', 'team'];
        let current = '';
        
        // Find the section that is currently most visible in the viewport
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                // If top is near top of viewport OR bottom is still in view
                if (rect.top <= 200 && rect.bottom >= 200) {
                    current = section;
                }
            }
        }
        setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSpy);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('scroll', handleSpy);
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Podcasts', href: '#podcasts' },
    { name: 'Departments', href: '#departments' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <>
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
            ? 'bg-black/80 backdrop-blur-xl border-slate-800 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group relative z-50">
            {/* Logo Container with Glow */}
            <div className="relative">
                <div className="absolute inset-0 bg-neon-orange blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-neon-orange to-neon-red flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    <span className="font-black text-white text-xs">V</span>
                </div>
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-neon-orange transition-colors duration-300">VOICEIT</span>
        </a>

        {/* Desktop Nav - Floating Glass Pill */}
        <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center bg-slate-900/40 rounded-full px-6 py-2 border border-slate-800/50 backdrop-blur-md shadow-lg">
                {navLinks.map((link) => (
                    <a 
                        key={link.name} 
                        href={link.href} 
                        className={`text-sm font-bold px-4 py-1 transition-colors relative group ${activeSection === link.href.substring(1) ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        {link.name}
                        {/* Active Indicator */}
                        {activeSection === link.href.substring(1) && (
                            <motion.span 
                                layoutId="activeSection"
                                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-neon-orange shadow-[0_0_8px_rgba(255,87,34,0.8)] mx-2 rounded-full"
                            />
                        )}
                    </a>
                ))}
            </div>
            
            <a href="#join" className="group relative px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-white">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">Join Us</span>
                <div className="absolute inset-0 bg-neon-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </a>
        </div>

        {/* Mobile Toggle */}
        <button 
            className="md:hidden text-white hover:text-neon-orange transition-colors relative z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </motion.nav>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 md:hidden"
            >
                {/* Background Decor */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-orange/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-red/10 blur-[100px] rounded-full"></div>

                {navLinks.map((link, index) => (
                    <motion.a 
                        key={link.name} 
                        href={link.href}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-4xl font-display font-black transition-colors ${activeSection === link.href.substring(1) ? 'text-neon-orange' : 'text-white hover:text-slate-300'}`}
                    >
                        {link.name}
                    </motion.a>
                ))}
                <motion.a 
                    href="#join"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-8 py-3 rounded-full bg-neon-orange text-black font-bold text-xl mt-8 shadow-[0_0_30px_rgba(255,87,34,0.5)] active:scale-95 transition-transform"
                >
                    Join Us
                </motion.a>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};

export default Navbar;