import React from 'react';
import Section from './ui/Section';
import { Mic2, Users, Globe, Music } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureItem = ({ icon: Icon, title, text }: { icon: any, title: string, text: string }) => (
  <div className="flex gap-4 items-start">
    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-neon-orange shadow-[0_0_10px_rgba(255,87,34,0.1)]">
        <Icon size={24} />
    </div>
    <div>
        <h4 className="text-xl font-bold mb-1 text-white">{title}</h4>
        <p className="text-slate-400 text-sm">{text}</p>
    </div>
  </div>
);

const About: React.FC = () => {
  return (
    <Section id="about" className="bg-slate-950">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Content Side */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
          <h2 className="text-neon-orange font-bold tracking-wider mb-2 uppercase text-sm">Who We Are</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">Amplifying Voices Across Campus</h3>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            VoiceIt is the premier media body of VIT Chennai, dedicated to the art of radio, podcasting, and audio storytelling. 
            We are a diverse community of creators who believe in the power of the spoken word.
          </p>

          <div className="grid sm:grid-cols-2 gap-8">
             <FeatureItem 
                icon={Globe} 
                title="Multilingual" 
                text="Podcasts in Tamil, English, Telugu, Malayalam, and Kannada."
             />
             <FeatureItem 
                icon={Users} 
                title="Vibrant Community" 
                text="A family of RJs, editors, writers, and designers."
             />
             <FeatureItem 
                icon={Music} 
                title="Campus Culture" 
                text="Setting the vibe for every major event at VIT Chennai."
             />
             <FeatureItem 
                icon={Mic2} 
                title="Professional Gear" 
                text="Hands-on experience with studio-grade audio equipment."
             />
          </div>
        </motion.div>

        {/* Visual Side - Collage */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
        >
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 translate-y-8">
                    <img src="https://picsum.photos/400/500?random=1" alt="RJ recording" className="rounded-2xl object-cover h-64 w-full opacity-80 hover:opacity-100 transition-opacity duration-300 border border-slate-800" />
                    <img src="https://picsum.photos/400/400?random=2" alt="Club event" className="rounded-2xl object-cover h-48 w-full opacity-80 hover:opacity-100 transition-opacity duration-300 border border-slate-800" />
                </div>
                <div className="space-y-4">
                    <img src="https://picsum.photos/400/400?random=3" alt="Team meeting" className="rounded-2xl object-cover h-48 w-full opacity-80 hover:opacity-100 transition-opacity duration-300 border border-slate-800" />
                    <img src="https://picsum.photos/400/500?random=4" alt="Live show" className="rounded-2xl object-cover h-64 w-full opacity-80 hover:opacity-100 transition-opacity duration-300 border border-slate-800" />
                </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-orange/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-red/20 rounded-full blur-3xl"></div>
        </motion.div>

      </div>
    </Section>
  );
};

export default About;