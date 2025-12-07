import React from 'react';
import Section from './ui/Section';
import { BoardMember } from '../types';

const boardMembers: BoardMember[] = [
  { id: '1', name: 'Arjun Das', role: 'President', image: 'https://picsum.photos/300/300?random=10' },
  { id: '2', name: 'Sara Khan', role: 'Vice President', image: 'https://picsum.photos/300/300?random=11' },
  { id: '3', name: 'Vikram R', role: 'General Secretary', image: 'https://picsum.photos/300/300?random=12' },
  { id: '4', name: 'Priya S', role: 'Design Head', image: 'https://picsum.photos/300/300?random=13' },
];

const Team: React.FC = () => {
  return (
    <Section id="team" className="bg-black">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">The Board</h2>
            <p className="text-slate-400 text-lg">Leading the frequency for 2024-25.</p>
        </div>
        <button className="px-6 py-2 rounded-full border border-slate-700 hover:bg-slate-900 transition-colors text-sm font-semibold hover:border-neon-orange hover:text-neon-orange">
            View Past Tenures
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {boardMembers.map((member) => (
            <div key={member.id} className="group relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 hover:border-neon-orange/50 transition-colors duration-300">
                <div className="aspect-square overflow-hidden">
                    <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100">
                    <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-neon-orange text-sm font-medium tracking-wide uppercase">{member.role}</p>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </Section>
  );
};

export default Team;