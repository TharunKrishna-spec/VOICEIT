
import React, { useState } from 'react';
import Section from './ui/Section';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { Edit } from 'lucide-react';
import AdminModal from './ui/AdminModal';
import { AboutData } from '../types';
import { getIcon, IconMap } from '../lib/iconMap';

const FeatureItem = ({ iconName, title, text }: { iconName: string, title: string, text: string }) => {
  const Icon = getIcon(iconName);
  return (
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
};

const About: React.FC = () => {
  const { user, aboutData, updateAbout } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<AboutData>(aboutData);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAbout(editForm);
    setIsEditing(false);
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...editForm.features];
    // @ts-ignore
    newFeatures[index][field] = value;
    setEditForm({ ...editForm, features: newFeatures });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...editForm.images];
    newImages[index] = value;
    setEditForm({ ...editForm, images: newImages });
  };

  return (
    <Section id="about" className="bg-slate-950 relative">
      {user && (
         <button 
             onClick={() => { setEditForm(aboutData); setIsEditing(true); }}
             className="absolute top-6 right-6 z-40 p-2 bg-slate-800 text-white rounded-full hover:bg-neon-orange hover:text-black transition-colors"
         >
             <Edit size={20} />
         </button>
      )}

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Content Side */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
          <h2 className="text-neon-orange font-bold tracking-wider mb-2 uppercase text-sm">{aboutData.sectionTitle}</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">{aboutData.mainTitle}</h3>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            {aboutData.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-8">
             {aboutData.features.map((feature) => (
                 <FeatureItem 
                    key={feature.id}
                    iconName={feature.icon} 
                    title={feature.title} 
                    text={feature.text}
                 />
             ))}
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
                    <img src={aboutData.images[0]} alt="Gallery 1" className="rounded-2xl object-cover h-64 w-full opacity-80 hover:opacity-100 transition-opacity duration-300 border border-slate-800" />
                    <img src={aboutData.images[1]} alt="Gallery 2" className="rounded-2xl object-cover h-48 w-full opacity-80 hover:opacity-100 transition-opacity duration-300 border border-slate-800" />
                </div>
                <div className="space-y-4">
                    <img src={aboutData.images[2]} alt="Gallery 3" className="rounded-2xl object-cover h-48 w-full opacity-80 hover:opacity-100 transition-opacity duration-300 border border-slate-800" />
                    <img src={aboutData.images[3]} alt="Gallery 4" className="rounded-2xl object-cover h-64 w-full opacity-80 hover:opacity-100 transition-opacity duration-300 border border-slate-800" />
                </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-orange/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-red/20 rounded-full blur-3xl"></div>
        </motion.div>

      </div>

      {/* Admin Modal */}
      <AdminModal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Who We Are">
          <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-4 pb-6 border-b border-slate-800">
                  <h4 className="text-neon-orange font-bold uppercase text-xs tracking-wider">Main Content</h4>
                  <div>
                      <label className="block text-slate-400 text-sm mb-1">Section Title</label>
                      <input type="text" value={editForm.sectionTitle} onChange={e => setEditForm({...editForm, sectionTitle: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
                  </div>
                  <div>
                      <label className="block text-slate-400 text-sm mb-1">Main Heading</label>
                      <input type="text" value={editForm.mainTitle} onChange={e => setEditForm({...editForm, mainTitle: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
                  </div>
                  <div>
                      <label className="block text-slate-400 text-sm mb-1">Description</label>
                      <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white h-24" />
                  </div>
              </div>

              <div className="space-y-4 pb-6 border-b border-slate-800">
                  <h4 className="text-neon-orange font-bold uppercase text-xs tracking-wider">Features</h4>
                  {editForm.features.map((feature, idx) => (
                      <div key={feature.id} className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                           <div className="flex gap-2">
                               <input 
                                    type="text" 
                                    placeholder="Title" 
                                    value={feature.title} 
                                    onChange={e => handleFeatureChange(idx, 'title', e.target.value)} 
                                    className="w-1/2 bg-black border border-slate-700 p-2 rounded text-white text-sm" 
                                />
                                <select 
                                    value={feature.icon} 
                                    onChange={e => handleFeatureChange(idx, 'icon', e.target.value)}
                                    className="w-1/2 bg-black border border-slate-700 p-2 rounded text-white text-sm"
                                >
                                    {Object.keys(IconMap).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                </select>
                           </div>
                           <input 
                                type="text" 
                                placeholder="Description text" 
                                value={feature.text} 
                                onChange={e => handleFeatureChange(idx, 'text', e.target.value)} 
                                className="w-full bg-black border border-slate-700 p-2 rounded text-white text-sm" 
                            />
                      </div>
                  ))}
              </div>

              <div className="space-y-4">
                  <h4 className="text-neon-orange font-bold uppercase text-xs tracking-wider">Collage Images</h4>
                  <div className="grid grid-cols-2 gap-2">
                      {editForm.images.map((img, idx) => (
                          <input 
                            key={idx}
                            type="text" 
                            value={img} 
                            onChange={e => handleImageChange(idx, e.target.value)} 
                            className="w-full bg-black border border-slate-700 p-2 rounded text-white text-xs" 
                          />
                      ))}
                  </div>
              </div>

              <button type="submit" className="w-full py-3 bg-neon-orange text-black font-bold rounded sticky bottom-0">Save Changes</button>
          </form>
      </AdminModal>
    </Section>
  );
};

export default About;
