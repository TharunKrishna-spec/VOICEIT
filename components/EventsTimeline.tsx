
import React, { useRef, useState } from 'react';
import Section from './ui/Section';
import { ArrowRight, Plus, Trash2, Edit, Search, ArrowLeft, Calendar, X, MapPin } from 'lucide-react';
import { EventItem } from '../types';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { getIcon, IconMap } from '../lib/iconMap';
import AdminModal from './ui/AdminModal';

interface TimelineCardProps {
  event: EventItem;
  index: number;
  isAdmin: boolean;
  onEdit: (e: EventItem) => void;
  onDelete: (id: string) => void;
  onRecap: (e: EventItem) => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event, index, isAdmin, onEdit, onDelete, onRecap }) => {
  const isEven = index % 2 === 0;
  const Icon = getIcon(event.icon);

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
                    
                    {/* Admin Controls */}
                    {isAdmin && (
                        <div className={`absolute top-2 ${isEven ? 'left-2' : 'right-2'} flex gap-2 z-20`}>
                            <button onClick={() => onEdit(event)} className="p-1 bg-blue-600 rounded text-white hover:bg-blue-500"><Edit size={14}/></button>
                            <button onClick={() => onDelete(event.id)} className="p-1 bg-red-600 rounded text-white hover:bg-red-500"><Trash2 size={14}/></button>
                        </div>
                    )}

                    {/* Year Badge */}
                    <div className={`inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 group-hover:text-neon-orange group-hover:border-neon-orange/30 transition-colors`}>
                        {event.year}
                    </div>

                    <div className={`flex items-center gap-4 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                         <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-neon-orange transition-colors">{event.title}</h3>
                         <div className="text-slate-500 group-hover:text-white transition-colors">
                             <Icon size={20} />
                         </div>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{event.description}</p>

                    <button 
                        onClick={() => onRecap(event)}
                        className={`flex items-center gap-2 text-xs font-bold text-slate-600 group-hover:text-neon-orange uppercase tracking-wider transition-colors hover:underline ${isEven ? 'md:flex-row-reverse' : ''}`}
                    >
                        <span>Read Recap</span>
                        <ArrowRight size={12} className={`transition-transform duration-300 ${isEven ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                    </button>
                </div>

            </motion.div>
        </div>
    </div>
  );
};

interface ArchiveViewProps {
    events: EventItem[];
    onBack: () => void;
    isAdmin: boolean;
    onEdit: (e: EventItem) => void;
    onDelete: (id: string) => void;
    onRecap: (e: EventItem) => void;
}

const ArchiveView = ({ events, onBack, isAdmin, onEdit, onDelete, onRecap }: ArchiveViewProps) => {
    const [filter, setFilter] = useState('');
    
    const filteredEvents = events.filter(e => 
        e.title.toLowerCase().includes(filter.toLowerCase()) || 
        e.year.includes(filter) ||
        e.description.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 relative z-10 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onBack}
                        className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:bg-neon-orange hover:text-black transition-all group"
                    >
                        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform"/>
                    </button>
                    <div>
                        <h2 className="text-3xl font-display font-bold text-white">Full Event Archive</h2>
                        <p className="text-slate-400 text-sm">Explore our history from the very beginning.</p>
                    </div>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search events, years, or descriptions..." 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-3 pl-12 pr-6 text-white focus:border-neon-orange outline-none transition-colors backdrop-blur-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {filteredEvents.map(event => {
                    const Icon = getIcon(event.icon);
                    return (
                        <motion.div 
                            key={event.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:bg-slate-900 hover:border-neon-orange/30 transition-all duration-300 flex flex-col h-full group relative"
                        >
                            {/* Admin Controls */}
                            {isAdmin && (
                                <div className="absolute top-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onEdit(event); }} 
                                        className="p-1.5 bg-blue-600 rounded text-white hover:bg-blue-500 shadow-lg"
                                    >
                                        <Edit size={14}/>
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onDelete(event.id); }} 
                                        className="p-1.5 bg-red-600 rounded text-white hover:bg-red-500 shadow-lg"
                                    >
                                        <Trash2 size={14}/>
                                    </button>
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-neon-orange group-hover:scale-110 transition-transform">
                                    <Icon size={24} />
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                                    {event.year}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-orange transition-colors">{event.title}</h3>
                            <p className="text-slate-400 text-sm line-clamp-4 mb-4 flex-grow leading-relaxed">{event.description}</p>
                            
                            <button 
                                onClick={() => onRecap(event)}
                                className="pt-4 border-t border-slate-800/50 flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors hover:underline"
                            >
                                Read Recap <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )
                })}
            </div>
            
            {filteredEvents.length === 0 && (
                <div className="text-center py-20 flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-slate-600 mb-4">
                        <Search size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white">No events found</h3>
                    <p className="text-slate-500">Try adjusting your search query.</p>
                </div>
            )}
        </div>
    );
}

const RecapModal = ({ event, onClose }: { event: EventItem | null, onClose: () => void }) => {
    if (!event) return null;
    const Icon = getIcon(event.icon);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 50 }}
                    className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-neon-orange hover:text-black transition-colors backdrop-blur-sm">
                        <X size={20} />
                    </button>

                    {/* Header Image */}
                    <div className="relative h-48 md:h-64 bg-slate-900 overflow-hidden">
                        {event.image ? (
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-80" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-900 to-black flex items-center justify-center">
                                <Icon size={64} className="text-slate-800" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                        
                        <div className="absolute bottom-6 left-6 md:left-8">
                             <div className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-bold bg-neon-orange text-black">
                                {event.year}
                             </div>
                             <h2 className="text-3xl md:text-4xl font-display font-black text-white">{event.title}</h2>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                        <p className="text-lg text-slate-300 leading-relaxed mb-6 font-light">
                            {event.longDescription || event.description}
                        </p>
                        
                        {!event.longDescription && (
                             <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-500 text-sm italic text-center">
                                Detailed recap coming soon...
                             </div>
                        )}

                        <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-slate-800/50">
                             <div className="flex items-center gap-2 text-slate-400 text-sm">
                                 <Calendar size={16} className="text-neon-orange" />
                                 <span>Event Date: {event.year}</span>
                             </div>
                             <div className="flex items-center gap-2 text-slate-400 text-sm">
                                 <MapPin size={16} className="text-neon-orange" />
                                 <span>VIT Chennai Campus</span>
                             </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

const EventsTimeline: React.FC = () => {
    const { events, user, addEvent, deleteEvent, updateEvent } = useAdmin();
    const [isEditing, setIsEditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<Partial<EventItem>>({});
    const [showArchive, setShowArchive] = useState(false);
    const [selectedRecapEvent, setSelectedRecapEvent] = useState<EventItem | null>(null);
    
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });
    
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const handleEdit = (event: EventItem) => {
        setCurrentEvent(event);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentEvent({ title: '', year: '2024', description: '', icon: 'Mic', image: '', longDescription: '' });
        setIsEditing(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentEvent.id) {
            await updateEvent(currentEvent.id, currentEvent);
        } else {
            // @ts-ignore
            await addEvent(currentEvent);
        }
        setIsEditing(false);
    };

  return (
    <Section id="events" className="bg-black relative overflow-hidden py-32 min-h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-orange/5 blur-[120px] rounded-full pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {!showArchive ? (
            <motion.div 
                key="timeline"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="container mx-auto px-4 relative z-10"
            >
                <div className="text-center mb-24 relative">
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

                    {user && (
                        <button onClick={handleAddNew} className="absolute top-0 right-0 flex items-center gap-2 bg-neon-orange text-black font-bold px-4 py-2 rounded-full hover:bg-white transition-colors">
                            <Plus size={18} /> Add Event
                        </button>
                    )}
                </div>

                <div ref={containerRef} className="relative max-w-5xl mx-auto">
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2" />
                    <motion.div 
                        style={{ height }}
                        className="absolute left-6 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-neon-orange via-neon-red to-transparent -translate-x-1/2 shadow-[0_0_15px_rgba(255,87,34,0.8)] z-0 origin-top"
                    />

                    <div className="relative z-10 py-10">
                        {events.slice(0, 5).map((event, index) => (
                            <TimelineCard 
                                key={event.id} 
                                event={event} 
                                index={index} 
                                isAdmin={!!user}
                                onEdit={handleEdit}
                                onDelete={deleteEvent}
                                onRecap={setSelectedRecapEvent}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center mt-12">
                        <button 
                            onClick={() => setShowArchive(true)}
                            className="group px-8 py-3 bg-slate-900 border border-slate-800 rounded-full text-white font-bold hover:bg-neon-orange hover:text-black hover:border-neon-orange transition-all duration-300 flex items-center gap-2"
                        >
                            View Full Archive 
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </motion.div>
        ) : (
            <motion.div
                key="archive"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
            >
                <ArchiveView 
                    events={events} 
                    onBack={() => setShowArchive(false)} 
                    isAdmin={!!user}
                    onEdit={handleEdit}
                    onDelete={deleteEvent}
                    onRecap={setSelectedRecapEvent}
                />
            </motion.div>
        )}
      </AnimatePresence>

      {selectedRecapEvent && (
          <RecapModal event={selectedRecapEvent} onClose={() => setSelectedRecapEvent(null)} />
      )}

      {/* ADMIN MODAL */}
      <AdminModal isOpen={isEditing} onClose={() => setIsEditing(false)} title={currentEvent.id ? 'Edit Event' : 'Add New Event'}>
          <form onSubmit={handleSave} className="space-y-4">
              <div>
                  <label className="block text-slate-400 text-sm mb-1">Title</label>
                  <input required type="text" value={currentEvent.title} onChange={e => setCurrentEvent({...currentEvent, title: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-slate-400 text-sm mb-1">Year</label>
                    <input required type="text" value={currentEvent.year} onChange={e => setCurrentEvent({...currentEvent, year: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
                </div>
                <div>
                    <label className="block text-slate-400 text-sm mb-1">Icon</label>
                    <select value={currentEvent.icon} onChange={e => setCurrentEvent({...currentEvent, icon: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white">
                        {Object.keys(IconMap).map(iconName => (
                            <option key={iconName} value={iconName}>{iconName}</option>
                        ))}
                    </select>
                </div>
              </div>
              <div>
                  <label className="block text-slate-400 text-sm mb-1">Short Description</label>
                  <textarea required value={currentEvent.description} onChange={e => setCurrentEvent({...currentEvent, description: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white h-20" />
              </div>
               <div>
                  <label className="block text-slate-400 text-sm mb-1">Full Recap (Long Description)</label>
                  <textarea value={currentEvent.longDescription || ''} onChange={e => setCurrentEvent({...currentEvent, longDescription: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white h-32" />
              </div>
               <div>
                  <label className="block text-slate-400 text-sm mb-1">Image URL (Optional)</label>
                  <input type="text" value={currentEvent.image || ''} onChange={e => setCurrentEvent({...currentEvent, image: e.target.value})} className="w-full bg-black border border-slate-700 p-2 rounded text-white" />
              </div>
              <button type="submit" className="w-full py-2 bg-neon-orange text-black font-bold rounded">Save Event</button>
          </form>
      </AdminModal>
    </Section>
  );
};

export default EventsTimeline;
