
import React, { useState } from 'react';
import Section from './ui/Section';
import { motion, Variants } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { Edit } from 'lucide-react';
import AdminModal from './ui/AdminModal';
import { AboutData } from '../types';
import { getIcon, IconMap } from '../lib/iconMap';

const FeatureItem = ({ iconName, title, text }: { iconName: string, title: string, text: string }) => {
  const Icon = getIcon(iconName);
  return (
    <div className="flex gap-4 items-start h-full">
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-neon-orange shadow-[0_0_10px_rgba(255,87,34,0.1)] flex-shrink-0">
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

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "circOut" }
    }
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
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={itemVariants} className="text-neon-orange font-bold tracking-wider mb-2 uppercase text-sm">
            {aboutData.sectionTitle}
          </motion.h2>
          <motion.h3 variants={itemVariants} className="text-4xl md:text-5xl font-display font-bold mb-6">
            {aboutData.mainTitle}
          </motion.h3>
          <motion.p variants={itemVariants} className="text-slate-400 text-lg leading-relaxed mb-8">
            {aboutData.description}
          </motion.p>

          <motion.div 
            variants={containerVariants}
            className="grid sm:grid-cols-2 gap-8"
          >
             {aboutData.features.map((feature) => (
                 <motion.div key={feature.id} variants={cardVariants}>
                    <FeatureItem 
                        iconName={feature.icon} 
                        title={feature.title} 
                        text={feature.text}
                    />
                 </motion.div>
             ))}
          </motion.div>
        </motion.div>

        {/* Visual Side - Collage */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
        >
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 translate-y-8">
                    <motion.img 
                        variants={imageVariants} 
                        src={aboutData.images[0]} 
                        alt="Gallery 1" 
                        className="rounded-2xl object-cover h-64 w-full opacity-90 hover:opacity-100 transition-opacity duration-300 border border-slate-800 shadow-xl" 
                    />
                    <motion.img 
                        variants={imageVariants} 
                        src={aboutData.images[1]} 
                        alt="Gallery 2" 
                        className="rounded-2xl object-cover h-48 w-full opacity-90 hover:opacity-100 transition-opacity duration-300 border border-slate-800 shadow-xl" 
                    />
                </div>
                <div className="space-y-4">
                    <motion.img 
                        variants={imageVariants} 
                        src={aboutData.images[2]} 
                        alt="Gallery 3" 
                        className="rounded-2xl object-cover h-48 w-full opacity-90 hover:opacity-100 transition-opacity duration-300 border border-slate-800 shadow-xl" 
                    />
                    <motion.img 
                        variants={imageVariants} 
                        src={aboutData.images[3]} 
                        alt="Gallery 4" 
                        className="rounded-2xl object-cover h-64 w-full opacity-90 hover:opacity-100 transition-opacity duration-300 border border-slate-800 shadow-xl" 
                    />
                </div>
            </div>
            
            {/* Decorative Elements */}
            <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-neon-orange/20 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-red/20 rounded-full blur-3xl pointer-events-none"
            />
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
