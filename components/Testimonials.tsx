import React, { useState } from 'react';
import Section from './ui/Section';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import AdminModal from './ui/AdminModal';
import { Testimonial } from '../types';
import { AnimatedTestimonials } from './ui/AnimatedTestimonials';

const Testimonials: React.FC = () => {
  const { testimonials, user, addTestimonial, deleteTestimonial } = useAdmin();
  const [isManaging, setIsManaging] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({ name: '', designation: '', quote: '', src: '' });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    await addTestimonial(newTestimonial);
    setNewTestimonial({ name: '', designation: '', quote: '', src: '' });
  };

  return (
    <Section id="testimonials" className="bg-black py-20 relative">
      <div className="text-center mb-0 relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-neon-orange font-bold tracking-wider uppercase text-sm mb-2">
            Voices of VoiceIt
        </motion.h2>
        <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-5xl font-display font-black text-white">
            What They Say
        </motion.h3>

        {user && (
            <button onClick={() => setIsManaging(true)} className="absolute top-0 right-4 md:right-20 bg-slate-800 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-slate-700 transition-colors">
                <Edit2 size={14} /> Manage
            </button>
        )}
      </div>

      <div className="w-full">
        <AnimatedTestimonials 
            testimonials={testimonials} 
            autoplay={true}
        />
      </div>

      {/* Admin Modal for Managing Testimonials */}
      <AdminModal isOpen={isManaging} onClose={() => setIsManaging(false)} title="Manage Testimonials">
          <div className="space-y-8">
              {/* Add New */}
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <h4 className="text-sm font-bold text-neon-orange mb-3">Add New Testimonial</h4>
                  <form onSubmit={handleAdd} className="space-y-3">
                      <input required placeholder="Name" value={newTestimonial.name} onChange={e => setNewTestimonial({...newTestimonial, name: e.target.value})} className="w-full bg-black border border-slate-600 p-2 rounded text-white text-sm" />
                      <input required placeholder="Designation (e.g., Alumni)" value={newTestimonial.designation} onChange={e => setNewTestimonial({...newTestimonial, designation: e.target.value})} className="w-full bg-black border border-slate-600 p-2 rounded text-white text-sm" />
                      <textarea required placeholder="Quote" value={newTestimonial.quote} onChange={e => setNewTestimonial({...newTestimonial, quote: e.target.value})} className="w-full bg-black border border-slate-600 p-2 rounded text-white text-sm h-20" />
                      <input required placeholder="Image URL" value={newTestimonial.src} onChange={e => setNewTestimonial({...newTestimonial, src: e.target.value})} className="w-full bg-black border border-slate-600 p-2 rounded text-white text-sm" />
                      <button type="submit" className="w-full py-2 bg-neon-orange text-black font-bold rounded text-sm hover:bg-white transition-colors">Add</button>
                  </form>
              </div>

              {/* List Existing (Fallback list if slider management isn't enough) */}
              <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white mb-2">Existing Testimonials</h4>
                  {testimonials.map(t => (
                      <div key={t.id} className="flex items-center justify-between bg-black p-3 rounded border border-slate-800">
                          <div className="flex items-center gap-3">
                              <img src={t.src} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                              <div>
                                  <div className="text-sm font-bold text-white">{t.name}</div>
                                  <div className="text-xs text-slate-500 truncate max-w-[150px]">{t.quote}</div>
                              </div>
                          </div>
                          <button onClick={() => deleteTestimonial(t.id)} className="text-red-500 hover:text-red-400 p-2">
                              <Trash2 size={16} />
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      </AdminModal>
    </Section>
  );
};

export default Testimonials;
