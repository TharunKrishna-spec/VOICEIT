
import React, { useState } from 'react';
import Section from './ui/Section';
import { motion as _motion, AnimatePresence } from 'framer-motion';
const motion = _motion as any;
import { ShoppingBag, Plus, Trash2, Edit, ExternalLink, Sparkles, Tag, ArrowRight, ShoppingCart, Info, Activity } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { MerchItem } from '../types';
import AdminModal from './ui/AdminModal';

const Merch: React.FC = () => {
  const { merch, user, addMerch, updateMerch, deleteMerch } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MerchItem>>({ name: '', price: '', image: '', description: '', category: '', isAvailable: true, link: '' });

  const handleOpenAdd = () => {
    setEditingItem({ name: '', price: '', image: '', description: '', category: '', isAvailable: true, link: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e: React.MouseEvent, item: MerchItem) => {
    e.stopPropagation();
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem.id) {
        await updateMerch(editingItem.id, editingItem);
    } else {
        // @ts-ignore
        await addMerch(editingItem);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (window.confirm("Are you sure you want to permanently delete this product?")) {
        try {
            await deleteMerch(id);
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Delete failed. Please check console for errors.");
        }
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-black">
      <Section id="merch-header" className="py-12 md:py-20 relative overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-orange/30 to-transparent blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-10 relative z-10">
            <div className="max-w-2xl">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-neon-orange mb-6"
                >
                    <div className="p-2 rounded-lg bg-neon-orange/10 border border-neon-orange/20">
                        <ShoppingCart size={20} className="animate-pulse" />
                    </div>
                    <span className="font-black tracking-[0.4em] uppercase text-[10px]">Wear the Frequency</span>
                </motion.div>
                <motion.h1 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-6xl md:text-8xl font-display font-black mb-6 text-white leading-[0.85] tracking-tighter"
                >
                    The <span className="text-neon-orange">Shop.</span>
                </motion.h1>
                <p className="text-slate-400 text-xl font-light leading-relaxed max-w-lg">
                    Premium apparel designed for the creators. Grab official VoiceIt merchandise and support the campus radio.
                </p>
            </div>
            
            <div className="flex gap-4">
                {user && (
                    <button 
                        onClick={handleOpenAdd} 
                        className="bg-white text-black px-10 py-5 rounded-2xl font-black flex items-center gap-2 hover:bg-neon-orange transition-all shadow-xl active:scale-95 group"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" /> NEW LISTING
                    </button>
                )}
            </div>
        </div>
      </Section>

      <Section id="merch-grid" className="py-0 min-h-[40vh]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 relative z-10">
            {merch.length === 0 ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="col-span-full py-40 flex flex-col items-center justify-center text-center space-y-8"
                >
                    <div className="relative">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-0 bg-neon-orange/20 rounded-full blur-3xl"
                        />
                        <div className="w-24 h-24 rounded-full border-2 border-slate-800 flex items-center justify-center text-slate-700 relative z-10">
                             <Activity size={40} className="animate-pulse" />
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-4xl font-display font-black text-white mb-4">Static Silence.</h2>
                        <p className="text-slate-500 text-lg max-w-md mx-auto font-light leading-relaxed">
                            The warehouse is currently empty as we curate the next limited-edition drop. <br/>
                            <span className="text-neon-orange font-bold uppercase tracking-widest text-xs mt-4 block">New frequencies dropping soon.</span>
                        </p>
                    </div>
                </motion.div>
            ) : (
                merch.map((item, idx) => (
                    <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-slate-800 group-hover:border-neon-orange/50 transition-all duration-700 shadow-2xl">
                            
                            {/* Admin Controls - Increased Z Index and ensuring click events reach */}
                            {user && (
                                <div className="absolute top-6 right-6 z-[60] flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto">
                                    <button 
                                        onClick={(e) => handleOpenEdit(e, item)} 
                                        className="p-3 bg-blue-600/90 text-white rounded-full hover:bg-blue-500 shadow-xl active:scale-90 transition-transform backdrop-blur-md"
                                        title="Edit Listing"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button 
                                        onClick={(e) => handleDelete(e, item.id)} 
                                        className="p-3 bg-red-600/90 text-white rounded-full hover:bg-red-500 shadow-xl active:scale-90 transition-transform backdrop-blur-md"
                                        title="Delete Listing"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            )}

                            {!item.isAvailable && (
                                <div className="absolute top-6 left-6 z-30 px-5 py-2 bg-black/80 text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-full backdrop-blur-xl border border-white/10">
                                    Out of Stock
                                </div>
                            )}

                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${!item.isAvailable ? 'grayscale opacity-20' : 'grayscale group-hover:grayscale-0'}`} 
                            />
                            
                            {/* Overlay Interaction - Ensure z-index is lower than admin buttons */}
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 pointer-events-none group-hover:pointer-events-auto">
                                <button 
                                    disabled={!item.isAvailable || !item.link}
                                    onClick={() => item.link && window.open(item.link, '_blank')}
                                    className={`w-full py-4 ${item.isAvailable && item.link ? 'bg-neon-orange text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,87,34,0.4)]' : 'bg-slate-900 text-slate-600 cursor-not-allowed'} rounded-2xl font-black text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95`}
                                >
                                    {item.isAvailable ? (item.link ? 'PURCHASE NOW' : 'COMING SOON') : 'WAITLIST ONLY'} 
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 px-4 flex justify-between items-start">
                            <div className="flex-1 pr-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[8px] text-neon-orange font-black uppercase tracking-[0.4em] bg-neon-orange/10 px-3 py-1 rounded-sm">{item.category}</span>
                                </div>
                                <h3 className="text-2xl font-display font-black text-white group-hover:text-neon-orange transition-colors leading-tight">{item.name}</h3>
                                <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed font-light">{item.description}</p>
                            </div>
                            <div className="text-2xl font-black text-white tabular-nums">
                                {item.price}
                            </div>
                        </div>
                    </motion.div>
                ))
            )}
        </div>
      </Section>

      {/* Product Editor Modal */}
      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem.id ? "Modify Product" : "Create New Product"}>
          <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                      <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Product Name</label>
                      <input required value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-black border border-slate-800 p-4 rounded-xl text-white text-sm focus:border-neon-orange outline-none transition-colors" placeholder="e.g. 'Freq.' Hoodie" />
                  </div>
                  <div className="space-y-1">
                      <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Price Point</label>
                      <input required value={editingItem.price} onChange={e => setEditingItem({...editingItem, price: e.target.value})} className="w-full bg-black border border-slate-800 p-4 rounded-xl text-white text-sm focus:border-neon-orange outline-none transition-colors" placeholder="e.g. ₹799" />
                  </div>
              </div>
              <div className="space-y-1">
                  <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Department / Category</label>
                  <input required value={editingItem.category} onChange={e => setEditingItem({...editingItem, category: e.target.value})} className="w-full bg-black border border-slate-800 p-4 rounded-xl text-white text-sm focus:border-neon-orange outline-none transition-colors" placeholder="e.g. Apparel / Limited" />
              </div>
              <div className="space-y-1">
                  <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Product Bio</label>
                  <textarea required value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="w-full bg-black border border-slate-800 p-4 rounded-xl text-white text-sm h-32 focus:border-neon-orange outline-none resize-none transition-colors" placeholder="Material info, sizing, or story..." />
              </div>
              <div className="space-y-1">
                  <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Hero Image URL</label>
                  <input required value={editingItem.image} onChange={e => setEditingItem({...editingItem, image: e.target.value})} className="w-full bg-black border border-slate-800 p-4 rounded-xl text-white text-sm focus:border-neon-orange outline-none transition-colors" placeholder="https://unsplash.com/..." />
              </div>
              <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">External Link (Purchase/Form)</label>
                    <div className="group relative">
                        <Info size={12} className="text-slate-600 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-slate-800 text-[10px] text-white rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 leading-relaxed">
                            Link to your Google Form, Instagram DM, or custom store page.
                        </div>
                    </div>
                  </div>
                  <input value={editingItem.link || ''} onChange={e => setEditingItem({...editingItem, link: e.target.value})} className="w-full bg-black border border-slate-800 p-4 rounded-xl text-white text-sm focus:border-neon-orange outline-none transition-colors" placeholder="https://..." />
              </div>
              <div className="flex items-center gap-4 bg-slate-900/30 p-5 rounded-2xl border border-slate-800/50">
                  <div className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="availabilitySwitch"
                        className="sr-only peer"
                        checked={editingItem.isAvailable} 
                        onChange={e => setEditingItem({...editingItem, isAvailable: e.target.checked})} 
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-orange"></div>
                      <label htmlFor="availabilitySwitch" className="ml-3 text-white font-bold text-sm cursor-pointer select-none">Product is currently In Stock</label>
                  </div>
              </div>
              <button type="submit" className="w-full py-5 bg-neon-orange text-black font-black rounded-2xl hover:bg-white hover:shadow-[0_0_30px_rgba(255,87,34,0.3)] transition-all shadow-xl active:scale-95">
                  {editingItem.id ? 'UPDATE PRODUCT LISTING' : 'RELEASE PRODUCT'}
              </button>
          </form>
      </AdminModal>
    </div>
  );
};

export default Merch;
