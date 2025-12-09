
import React, { useState, useEffect } from 'react';
import { X, Edit, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const { user, privacyData, updatePrivacy } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  // Sync data when opening
  useEffect(() => {
    if (isOpen) {
        setContent(privacyData.content);
        setLastUpdated(privacyData.lastUpdated);
        setIsEditing(false);
    }
    // Prevent body scroll
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, privacyData]);

  const handleSave = async () => {
    await updatePrivacy({ content, lastUpdated });
    setIsEditing(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
              <div>
                  <h3 className="text-xl font-bold text-white">Privacy Policy</h3>
                  {!isEditing && <p className="text-xs text-slate-500 mt-1">Last Updated: {lastUpdated}</p>}
              </div>
              <div className="flex gap-2">
                  {user && !isEditing && (
                      <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-neon-orange rounded-full text-xs font-bold hover:bg-white hover:text-black transition-colors">
                          <Edit size={12} /> Edit
                      </button>
                  )}
                  {isEditing && (
                       <button onClick={handleSave} className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-full text-xs font-bold hover:bg-green-500 transition-colors">
                          <Save size={12} /> Save
                      </button>
                  )}
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-400">
                    <X size={20} />
                  </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
                {isEditing ? (
                    <div className="space-y-4 h-full flex flex-col">
                        <div>
                            <label className="block text-slate-400 text-xs mb-1">Last Updated Date</label>
                            <input 
                                type="text" 
                                value={lastUpdated} 
                                onChange={e => setLastUpdated(e.target.value)}
                                className="w-full bg-black border border-slate-700 p-2 rounded text-white text-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-slate-400 text-xs mb-1">Policy Content</label>
                            <textarea 
                                value={content} 
                                onChange={e => setContent(e.target.value)}
                                className="w-full h-full min-h-[400px] bg-black border border-slate-700 p-4 rounded text-white text-sm font-mono leading-relaxed resize-none"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="prose prose-invert prose-sm md:prose-base max-w-none text-slate-300">
                        <div className="whitespace-pre-wrap leading-relaxed">
                            {content}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-slate-800 text-center text-xs text-slate-600">
                VoiceIt Radio Club • VIT Chennai
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyModal;
