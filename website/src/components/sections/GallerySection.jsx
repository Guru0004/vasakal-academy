import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight, Eye, Filter } from "lucide-react";
import { GALLERY_ITEMS } from "../../data/academyData";

const categories = ["All", "Academy", "Classes", "Events", "Students", "Activities"];

export const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const filteredItems = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleNext = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev + 1) % filteredItems.length);
  }, [selectedImageIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [selectedImageIndex, filteredItems.length]);

  const handleClose = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, handleClose, handleNext, handlePrev]);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#12366B] dark:text-blue-300">
            Academy Glimpses
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#071A3D] dark:text-white mt-2 mb-3 sm:mb-4">
            Academy Gallery & Learning Artifacts
          </h2>
          <p className="text-sm sm:text-base text-[#475569] dark:text-slate-100 font-medium">
            Explore moments, official seminars, pedagogical designs, and classroom experiences at Vasakal Academy.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 sm:mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedImageIndex(null);
                }}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#071A3D] text-white dark:bg-white dark:text-[#071A3D] shadow-md"
                    : "glass-card text-[#475569] dark:text-slate-100 hover:text-[#071A3D] dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                key={item.id}
                className="group relative glass-card overflow-hidden cursor-pointer flex flex-col"
                onClick={() => setSelectedImageIndex(idx)}
              >
                {/* Image Box */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-navy-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#071A3D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 rounded-full bg-white text-[#071A3D] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                    {item.category}
                  </div>
                </div>

                {/* Caption */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#071A3D] dark:text-white mb-1 font-heading line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#475569] dark:text-slate-100 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-navy-700/60 text-[11px] text-blue-600 dark:text-blue-300 font-bold flex items-center gap-1">
                    <span>Click to expand</span>
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={handleClose}
          >
            <div
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                aria-label="Close modal"
                className="absolute -top-12 right-0 sm:right-2 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-7 h-7" />
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/90 p-3 rounded-full backdrop-blur-xs transition-colors z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/90 p-3 rounded-full backdrop-blur-xs transition-colors z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Image */}
              <div className="w-full max-h-[72vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/50 border border-white/10 shadow-2xl">
                <img
                  src={filteredItems[selectedImageIndex].image}
                  alt={filteredItems[selectedImageIndex].title}
                  className="max-h-[72vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Lightbox Caption */}
              <div className="w-full mt-4 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-100">
                      {filteredItems[selectedImageIndex].category}
                    </span>
                    <span className="text-xs text-slate-300">
                      {selectedImageIndex + 1} of {filteredItems.length}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {filteredItems[selectedImageIndex].title}
                  </h4>
                  <p className="text-xs text-slate-200">
                    {filteredItems[selectedImageIndex].description}
                  </p>
                </div>
                <div className="text-[11px] text-slate-300 shrink-0">
                  Use ← / → keys or swipe
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
