
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EventsTimeline from './components/EventsTimeline';
import Podcasts from './components/Podcasts';
import Departments from './components/Departments';
import Leads from './components/Leads';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import JoinCTA from './components/JoinCTA';
import Footer from './components/Footer';
import { AdminProvider } from './context/AdminContext';
import AdminLogin from './components/AdminLogin';
import Particles from './components/ui/Particles';
import { LOGO_IMAGE } from './lib/initialData';

const App: React.FC = () => {
  
  // Dynamically set Favicon if LOGO_IMAGE is present
  useEffect(() => {
    if (LOGO_IMAGE) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = LOGO_IMAGE;
    }
  }, []);

  return (
    <AdminProvider>
      <div className="bg-black min-h-screen text-slate-200 selection:bg-neon-orange selection:text-black font-sans">
        <Particles />
        <Navbar />
        <main>
          <Hero />
          <About />
          <EventsTimeline />
          <Podcasts />
          <Departments />
          <Team />
          <Leads />
          <Testimonials />
          <JoinCTA />
        </main>
        <Footer />
        <AdminLogin />
      </div>
    </AdminProvider>
  );
};

export default App;
