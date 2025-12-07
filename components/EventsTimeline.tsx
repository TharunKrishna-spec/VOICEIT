import React, { useRef } from 'react';
import Section from './ui/Section';
import { Calendar, ArrowRight, Mic, Sparkles, Music4 } from 'lucide-react';
import { EventItem } from '../types';
import { motion } from 'framer-motion';

const events: EventItem[] = [
  { id: '1', title: 'Auditions 2024', year: '2024', icon: Mic, description: 'The hunt for the next voice of VITC.' },
  { id: '2', title: 'Vibrance Radio', year: '2023', icon: Music4, description: 'Live radio booth during the cultural fest.' },
  { id: '3', title: 'Spooktober Podcast', year: '2023', icon: Sparkles, description: 'A horror special series released on Spotify.' },
  { id: '4', title: 'TechnoVIT Coverage', year: '2023', icon: Calendar, description: 'Media partners for the tech fest.' },
  { id: '5', title: 'Open Mic Night', year: '2022', icon: Mic, description: 'Showcasing raw talent from the campus.' },
];

const EventsTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Section id="events" className="bg-slate-900 border-y border-slate-800">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Journey</h2>
        <p className="text-slate-400">Milestones that defined our frequency.</p>
      </div>

      <div className="relative" ref={containerRef}>
        {/* Horizontal Scroll Container */}
        <div className="flex gap-8 overflow-x-auto pb-12 pt-4 px-4 snap-x snap-mandatory scrollbar-hide no-scrollbar">
            {events.map((event, index) => (
                <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-shrink-0 w-80 snap-center group"
                >
                    <div className="relative p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-neon-orange transition-all duration-300 h-full flex flex-col hover:shadow-[0_0_20px_rgba(255,87,34,0.15)]">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <event.icon size={64} />
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-neon-orange border border-slate-800">
                                {event.year}
                            </span>
                            <div className="h-[1px] flex-1 bg-slate-800"></div>
                        </div>

                        <h3 className="text-xl font-bold mb-2 group-hover:text-neon-orange transition-colors">{event.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{event.description}</p>
                        
                        <div className="mt-auto">
                            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-neon-orange group-hover:text-white transition-colors">
                                <ArrowRight size={14} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
            
             {/* "View All" Card */}
             <div className="flex-shrink-0 w-48 snap-center flex items-center justify-center">
                <button className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                    <div className="w-16 h-16 rounded-full border-2 border-slate-700 group-hover:border-white flex items-center justify-center transition-all">
                        <ArrowRight size={24} />
                    </div>
                    <span className="font-semibold text-sm">View All Events</span>
                </button>
            </div>
        </div>
      </div>
    </Section>
  );
};

export default EventsTimeline;