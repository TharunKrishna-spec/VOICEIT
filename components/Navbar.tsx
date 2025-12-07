import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-slate-800 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-orange to-neon-red flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,87,34,0.3)]">
                 <span className="font-black text-white text-xs">V</span>
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-neon-orange transition-colors">VOICEIT</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
                <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-orange transition-all group-hover:w-full box-shadow-[0_0_8px_rgba(255,87,34,0.8)]"></span>
                </a>
            ))}
            <a href="#join" className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-neon-orange hover:shadow-[0_0_20px_rgba(255,87,34,0.4)] transition-all shadow-lg">
                Join Us
            </a>
        </div>

        {/* Mobile Toggle */}
        <button 
            className="md:hidden text-white hover:text-neon-orange transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
            {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </motion.nav>

    {/* Mobile Menu */}
    <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: "tween" }}
                className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-center gap-8 md:hidden"
            >
                {navLinks.map((link) => (
                    <a 
                        key={link.name} 
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-2xl font-bold text-white hover:text-neon-orange transition-colors"
                    >
                        {link.name}
                    </a>
                ))}
                <a 
                    href="#join"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-8 py-3 rounded-full bg-white text-black font-bold text-xl mt-4 border border-transparent hover:border-neon-orange hover:text-neon-orange hover:bg-black transition-all"
                >
                    Join Us
                </a>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};

export default Navbar;