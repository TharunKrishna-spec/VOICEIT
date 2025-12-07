import React, { useRef } from 'react';
import Section from './ui/Section';
import { Calendar, ArrowRight, Mic, Sparkles, Music4, Radio } from 'lucide-react';
import { EventItem } from '../types';
import { motion, useScroll, useTransform } from 'framer-motion';

const events: EventItem[] = [
  { id: '1', title: 'Auditions 2024', year: '2024', icon: Mic, description: 'The hunt for the next voice of VITC. Over 500 participants showcased their talent in a grueling 3-round process.' },
  { id: '2', title: 'Vibrance Radio', year: '2023', icon: Music4, description: 'Live radio booth during the cultural fest, streaming non-stop for 3 days with celebrity interviews and live jams.' },
  { id: '3', title: 'Spooktober Podcast', year: '2023', icon: Sparkles, description: 'A horror special series released on Spotify featuring student stories and soundscapes.' },
  { id: '4', title: 'TechnoVIT Coverage', year: '2023', icon: Calendar, description: 'Official media partners for the tech fest, covering 50+ events and providing live updates.' },
  { id: '5', title: 'Open Mic Night', year: '2022', icon: Radio, description: 'Showcasing raw talent from the campus in an intimate acoustic setting at the Amphitheatre.' },
];

interface TimelineCardProps {
  event: EventItem;
  index: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between md:justify-normal w-full group mb-12 ${isEven ? 'md:flex-row-reverse' : ''}`}>
        
        {/* MOBILE: Left Line Spacer */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-800 md:hidden"></div>

        {/* DESKTOP: Spacer for 50/50 split */}
        <div className="hidden md:block w-1/2" />

        {/* CENTER NODE */}
        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
            <motion.div 
                whileInView={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="w-4 h-4 rounded-full bg-black border-2 border-slate-600 group-hover:border-neon-orange group-hover:bg-neon-orange shadow-[0_0_0_4px_rgba(0,0,0,1)] transition-colors duration-300"
            />
        </div>

        {/* CONTENT SIDE */}
        <div className="w-full md:w-1/2 pl-16 md:pl-0">
            <motion.div
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
            >
                {/* Connector Line (Desktop) */}
                <div className={`hidden md:block w-16 h-px bg-slate-700 group-hover:bg-neon-orange transition-colors duration-300`} />
                
                {/* Card */}
                <div className={`relative flex-1 p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm group-hover:border-neon-orange/50 group-hover:bg-slate-900 group-hover:shadow-[0_0_30px_rgba(255,87,34,0.1)] transition-all duration-300 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    
                    {/* Year Badge */}
                    <div className={`inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 group-hover:text-neon-orange group-hover:border-neon-orange/30 transition-colors`}>
                        {event.year}
                    </div>

                    <div className={`flex items-center gap-4 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                         <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-neon-orange transition-colors">{event.title}</h3>
                         <div className="text-slate-500 group-hover:text-white transition-colors">
                             <event.icon size={20} />
                         </div>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{event.description}</p>

                    <div className={`flex items-center gap-2 text-xs font-bold text-slate-600 group-hover:text-neon-orange uppercase tracking-wider transition-colors ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <span>Read Recap</span>
                        <ArrowRight size={12} className={`transition-transform duration-300 ${isEven ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                    </div>
                </div>

            </motion.div>
        </div>
    </div>
  );
};

const EventsTimeline: React.FC = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });
    
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="events" className="bg-black relative overflow-hidden py-32">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-orange/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-neon-orange font-bold tracking-widest uppercase text-sm mb-3"
            >
                Milestones
            </motion.h2>
            <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-display font-black text-white"
            >
                Our Journey
            </motion.h3>
        </div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
            
            {/* Main Vertical Spine (Gray) */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2" />
            
            {/* Animated Fill Spine (Orange) */}
            <motion.div 
                style={{ height }}
                className="absolute left-6 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-neon-orange via-neon-red to-transparent -translate-x-1/2 shadow-[0_0_15px_rgba(255,87,34,0.8)] z-0 origin-top"
            />

            <div className="relative z-10 py-10">
                {events.map((event, index) => (
                    <TimelineCard key={event.id} event={event} index={index} />
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <button className="group px-8 py-3 bg-slate-900 border border-slate-800 rounded-full text-white font-bold hover:bg-neon-orange hover:text-black hover:border-neon-orange transition-all duration-300 flex items-center gap-2">
                    View Full Archive 
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      </div>
    </Section>
  );
};

export default EventsTimeline;