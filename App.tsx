
import React from 'react';
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
import MemoryLane from './components/MemoryLane';
import Footer from './components/Footer';
import { AdminProvider, useAdmin } from './context/AdminContext';
import AdminLogin from './components/AdminLogin';
import Particles from './components/ui/Particles';
import CustomCursor from './components/ui/CustomCursor';
import Marquee from './components/ui/Marquee';

const AppContent: React.FC = () => {
  const { siteConfig } = useAdmin();
  
  return (
    <div className="bg-black min-h-screen text-slate-200 selection:bg-neon-orange selection:text-black font-sans">
      <CustomCursor />
      {siteConfig.showMarquee && <Marquee />}
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
        {/* Memory Lane now comes before the Join/Recruitment CTA */}
        <MemoryLane />
        <JoinCTA />
      </main>
      <Footer />
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
