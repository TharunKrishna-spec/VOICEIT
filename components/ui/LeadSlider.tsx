import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { Lead } from "../../types";

interface LeadSliderProps {
  leads: Lead[];
  className?: string;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export const LeadSlider = ({
  leads,
  className,
  onDelete,
  isAdmin
}: LeadSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Safety check
  if (!leads || leads.length === 0) {
    return <div className="text-center text-slate-500 py-10">No leads found.</div>;
  }

  const activeLead = leads[currentIndex];

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % leads.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + leads.length) % leads.length);
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Get next 3 for thumbnail, filtering out current
  const thumbnailLeads = leads
    .filter((_, i) => i !== currentIndex)
    .slice(0, 3);

  // Animation variants
  const imageVariants = {
    enter: (direction: "left" | "right") => ({
      y: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      y: direction === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const textVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className={`relative w-full min-h-[600px] overflow-hidden bg-slate-950 text-white p-4 md:p-12 rounded-3xl border border-slate-800 ${className}`}>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-neon-orange/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2"></div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full relative z-10">
        
        {/* === Left Column: Meta and Thumbnails === */}
        <div className="md:col-span-3 flex flex-col justify-between order-2 md:order-1">
          <div className="flex flex-row md:flex-col justify-between md:justify-start space-x-4 md:space-x-0 md:space-y-4">
            <span className="text-sm text-neon-orange font-mono font-bold">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(leads.length).padStart(2, "0")}
            </span>
            <h2 className="text-sm font-bold tracking-widest uppercase [writing-mode:vertical-rl] md:rotate-180 hidden md:block text-slate-500">
              Department Leads
            </h2>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex space-x-3 mt-8 md:mt-0">
            {thumbnailLeads.map((lead) => {
              const originalIndex = leads.findIndex((l) => l.id === lead.id);
              return (
                <button
                  key={lead.id}
                  onClick={() => handleThumbnailClick(originalIndex)}
                  className="relative overflow-hidden rounded-lg w-16 h-20 md:w-20 md:h-24 opacity-60 hover:opacity-100 transition-all duration-300 border border-slate-700 hover:border-neon-orange"
                >
                  <img
                    src={lead.image}
                    alt={lead.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* === Center Column: Main Image === */}
        <div className="md:col-span-4 relative h-80 min-h-[400px] md:min-h-[500px] order-1 md:order-2 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={activeLead.image}
              alt={activeLead.name}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          
          {/* Admin Delete Button Overlay */}
          {isAdmin && onDelete && (
            <button 
                onClick={(e) => { e.stopPropagation(); onDelete(activeLead.id); }}
                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-500 shadow-lg z-20"
                title="Delete this lead"
            >
                <Trash2 size={18} />
            </button>
          )}
        </div>

        {/* === Right Column: Text and Navigation === */}
        <div className="md:col-span-5 flex flex-col justify-between md:pl-8 order-3 md:order-3">
          {/* Text Content */}
          <div className="relative overflow-hidden pt-4 md:pt-20 min-h-[250px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="text-sm font-bold text-neon-orange tracking-wider uppercase mb-2">
                  {activeLead.department} • {activeLead.designation}
                </p>
                <h3 className="text-4xl font-display font-black text-white mb-6">
                  {activeLead.name}
                </h3>
                <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-slate-300 italic border-l-4 border-neon-orange pl-6">
                  "{activeLead.quote || "Empowering the club with vision and voice."}"
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4 mt-8 md:mt-0">
            <button
              className="w-12 h-12 rounded-full border border-slate-600 hover:border-neon-orange hover:text-neon-orange text-white flex items-center justify-center transition-colors"
              onClick={handlePrev}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              className="w-12 h-12 rounded-full bg-neon-orange text-black font-bold flex items-center justify-center hover:bg-white transition-colors"
              onClick={handleNext}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
