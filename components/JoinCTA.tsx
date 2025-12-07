import React from 'react';
import Section from './ui/Section';
import { Mic, ArrowRight } from 'lucide-react';

const JoinCTA: React.FC = () => {
  return (
    <Section id="join" className="bg-slate-950 py-32">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-orange-950 to-black border border-slate-700 p-8 md:p-20 text-center">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-neon-orange opacity-10 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-red opacity-10 blur-3xl rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 text-white">
                Find Your Voice.
            </h2>
            <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed">
                Whether you speak, edit, write, or design – there's a place for you in the studio.
                Recruitment for the 2025 batch opens soon.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-10 py-4 bg-white text-black text-lg font-bold rounded-full hover:scale-105 hover:bg-neon-orange transition-all shadow-[0_0_30px_rgba(255,87,34,0.3)] flex items-center gap-2">
                    Join VoiceIt <Mic size={20} />
                </button>
                <span className="text-slate-500 text-sm font-medium">Coming Soon</span>
            </div>
        </div>
      </div>
    </Section>
  );
};

export default JoinCTA;