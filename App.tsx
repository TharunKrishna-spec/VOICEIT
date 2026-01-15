
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EventsTimeline from './components/EventsTimeline';
import Podcasts from './components/Podcasts';
import Departments from './components/Departments';
import Leads from './components/Leads';
import Team from './components/Team';
import Merch from './components/Merch';
import Testimonials from './components/Testimonials';
import JoinCTA from './components/JoinCTA';
import MemoryLane from './components/MemoryLane';
import Footer from './components/Footer';
import { AdminProvider, useAdmin } from './context/AdminContext';
import AdminLogin from './components/AdminLogin';
import Particles from './components/ui/Particles';
import CustomCursor from './components/ui/CustomCursor';
import Marquee from './components/ui/Marquee';

const AppContent: React.FC = () => {
  const { siteConfig } = useAdmin();
  const [currentPage, setCurrentPage] = useState<'home' | 'shop'>('home');

  // Handle browser back button or direct link feel
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#shop') {
        setCurrentPage('shop');
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'shop') => {
    window.location.hash = page === 'shop' ? 'shop' : '';
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-black min-h-screen text-slate-200 selection:bg-neon-orange selection:text-black font-sans">
      <CustomCursor />
      {siteConfig.showMarquee && <Marquee />}
      <Particles />
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      
      <main className="pt-0">
        {currentPage === 'home' ? (
          <>
            <Hero />
            <About />
            <EventsTimeline />
            <Podcasts />
            <Departments />
            <Team />
            <Leads />
            <Testimonials />
            <MemoryLane />
            <JoinCTA />
          </>
        ) : (
          <Merch />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
      <AdminLogin />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
};

export default App;
