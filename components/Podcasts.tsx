
import React, { useState } from 'react';
import Section from './ui/Section';
import { motion } from 'framer-motion';
import { Play, Clock, Plus, Trash2, ExternalLink, Edit } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { Podcast } from '../types';
import AdminModal from './ui/AdminModal';

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM17.5 17.3C17.2 17.7 16.6 17.8 16.2 17.6C13.4 15.9 9.9 15.5 5.8 16.4C5.4 16.5 5 16.2 4.9 15.8C4.8 15.4 5.1 15 5.5 14.9C10 13.9 13.9 14.3 17.1 16.3C17.5 16.5 17.6 17 17.5 17.3ZM19 14C18.7 14.5 18.1 14.7 17.6 14.4C14.4 12.4 9.5 11.8 5.7 13C5.2 13.1 4.7 12.8 4.6 12.3C4.5 11.8 4.8 11.3 5.3 11.2C9.6 9.8 15 10.5 18.7 12.8C19.1 13 19.3 13.6 19 14ZM19.2 10.6C15.3 8.3 8.9 8.1 5.2 9.2C4.6 9.4 4 9.1 3.8 8.5C3.6 7.9 4 7.3 4.6 7.1C8.9 5.8 16 6.1 20.6 8.8C21.1 9.1 21.3 9.7 21 10.3C20.7 10.8 20 11 19.5 10.7L19.2 10.6Z" />
  </svg>
);

const Podcasts: React.FC = () => {
  const { podcasts, user, addPodcast, updatePodcast, deletePodcast } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState<Partial<Podcast>>({ title: '', host: '', duration: '', image: '', link: '' });

  const handleAddNew = () => {
    setCurrentPodcast({ title: '', host: '', duration: '', image: '', link: '' });
    setIsEditing(true);
  };

  const handleEdit = (podcast: Podcast) => {
    setCurrentPodcast(podcast);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPodcast.id) {
        // Update existing
        await updatePodcast(currentPodcast.id, currentPodcast);
    } else {
        // Add new
        // @ts-ignore
        await addPodcast(currentPodcast);
    }
    setIsEditing(false);
  };

  const openLink = (url?: string) => {
    if (url) window.open(url, '_blank');
  };

  return (
    <Section id="podcasts" className="bg-slate-950 border-t border-slate-900 py-16">
      <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4">
        <div>
            <h2 className="text-neon-orange font-bold tracking-wider uppercase text-xs mb-2">On Air</h2>
            <h3 className="text-2xl md:text-4xl font-display font-bold text-white flex items-center gap-3">
                Recent Broadcasts <SpotifyIcon className="w-6 h-6 md:w-8 md:h-8 text-[#1DB954]" />
            </h3>
        </div>
        <div className="flex gap-3">
            <a href="https://open.spotify.com/show/your-spotify-id" target="_blank" rel="noopener noreferrer" className="bg-[#1DB954] text-black px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                Visit Spotify <ExternalLink size={14} />
            </a>
            {user && (
                <button onClick={handleAddNew} className="bg-neon-orange text-black px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white transition-colors">
                    <Plus size={16} /> Add
                </button>
            )}
        </div>
      </div>

      {/* Horizontal Scroll Container - Compact Version */}
      <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory custom-scrollbar">
        {podcasts.map((podcast) => (
            <motion.div 
                key={podcast.id} 
                onClick={() => openLink(podcast.link)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative flex-shrink-0 w-[200px] md:w-[220px] snap-center group cursor-pointer"
            >
                {/* Image Container */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-slate-900 border border-slate-800 group-hover:border-[#1DB954] transition-colors duration-300">
                    <img src={podcast.image} alt={podcast.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <button className="w-12 h-12 rounded-full bg-[#1DB954] text-black flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-white hover:scale-110 shadow-lg">
                            <Play fill="currentColor" size={20} className="ml-1" />
                        </button>
                    </div>

                    {/* Admin Controls */}
                    {user && (
                        <div className="absolute top-2 right-2 flex gap-1 z-20">
                             <button 
                                onClick={(e) => { e.stopPropagation(); handleEdit(podcast); }} 
                                className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 shadow-md"
                            >
                                <Edit size={12} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); deletePodcast(podcast.id); }} 
                                className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-500 shadow-md"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div>
                    <h4 className="text-base font-bold text-white mb-0.5 group-hover:text-[#1DB954] transition-colors line-clamp-1">{podcast.title}</h4>
                    <div className="flex justify-between items-center text-slate-500 text-xs">
                        <span className="truncate max-w-[120px]">{podcast.host}</span>
                        <div className="flex items-center gap-1 bg-slate-900 px-1.5 py-0.5 rounded">
                            <Clock size={10} /> {podcast.duration}
                        </div>
                    </div>
                </div>
            </motion.div>
        ))}
      </div>

      <AdminModal isOpen={isEditing} onClose={() => setIsEditing(false)} title={currentPodcast.id ? "Edit Podcast" : "Add Podcast Episode"}>
          <form onSubmit={handleSave} className="space-y-4">
              <input required placeholder="Episode Title" value={currentPodcast.title} onChange={e => setCurrentPodcast({...currentPodcast, title: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <input required placeholder="Host Name" value={currentPodcast.host} onChange={e => setCurrentPodcast({...currentPodcast, host: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <input required placeholder="Duration (e.g. 24m)" value={currentPodcast.duration} onChange={e => setCurrentPodcast({...currentPodcast, duration: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <input required placeholder="Cover Image URL" value={currentPodcast.image} onChange={e => setCurrentPodcast({...currentPodcast, image: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <input placeholder="Spotify Link (Optional)" value={currentPodcast.link || ''} onChange={e => setCurrentPodcast({...currentPodcast, link: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              <button type="submit" className="w-full py-2 bg-[#1DB954] text-black font-bold rounded hover:bg-white transition-colors">
                  {currentPodcast.id ? "Save Changes" : "Add Podcast"}
              </button>
          </form>
      </AdminModal>
    </Section>
  );
};

export default Podcasts;
