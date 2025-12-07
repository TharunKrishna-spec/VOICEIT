import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EventsTimeline from './components/EventsTimeline';
import Departments from './components/Departments';
import Team from './components/Team';
import JoinCTA from './components/JoinCTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-slate-200 selection:bg-neon-orange selection:text-black font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <EventsTimeline />
        <Departments />
        <Team />
        <JoinCTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;