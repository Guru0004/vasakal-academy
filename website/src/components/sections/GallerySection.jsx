import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight, Eye, Images } from "lucide-react";
import { GALLERY_ITEMS } from "../../data/academyData";

const categories = ["All", "Academy", "Classes", "Events", "Activities"];

// Helper to extract image list for any item (supporting single 'image' or multi-photo 'images' array)
const getItemImages = (item) => {
  if (!item) return [];
  if (Array.isArray(item.images) && item.images.length > 0) {
    return item.images;
  }
  return item.image ? [item.image] : [];
};

export const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const filteredItems = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const currentItem = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;
  const currentImages = currentItem ? getItemImages(currentItem) : [];

  const handleOpenItem = (idx) => {
    setSelectedImageIndex(idx);
    setActivePhotoIndex(0);
  };

  const handleClose = useCallback(() => {
    setSelectedImageIndex(null);
    setActivePhotoIndex(0);
  }, []);

  // Cycle to next photo in active album, or next item if single image
  const handleNextPhoto = useCallback(() => {
    if (selectedImageIndex === null || !currentItem) return;
    if (currentImages.length > 1) {
      setActivePhotoIndex((prev) => (prev + 1) % currentImages.length);
    } else {
      setSelectedImageIndex((prev) => (prev + 1) % filteredItems.length);
      setActivePhotoIndex(0);
    }
  }, [selectedImageIndex, currentItem, currentImages.length, filteredItems.length]);

  // Cycle to prev photo in active album, or prev item if single image
  const handlePrevPhoto = useCallback(() => {
    if (selectedImageIndex === null || !currentItem) return;
    if (currentImages.length > 1) {
      setActivePhotoIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
    } else {
      setSelectedImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      setActivePhotoIndex(0);
    }
  }, [selectedImageIndex, currentItem, currentImages.length, filteredItems.length]);

  // Navigate between gallery items
  const handleNextItem = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev + 1) % filteredItems.length);
    setActivePhotoIndex(0);
  }, [selectedImageIndex, filteredItems.length]);

  const handlePrevItem = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    setActivePhotoIndex(0);
  }, [selectedImageIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNextPhoto();
      if (e.key === "ArrowLeft") handlePrevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, handleClose, handleNextPhoto, handlePrevPhoto]);

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
                  setActivePhotoIndex(0);
                }}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
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
            {filteredItems.map((item, idx) => {
              const itemImages = getItemImages(item);
              const hasMultiple = itemImages.length > 1;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  key={item.id}
                  className="group relative glass-card overflow-hidden cursor-pointer flex flex-col"
                  onClick={() => handleOpenItem(idx)}
                >
                  {/* Image Box */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-navy-900">
                    <img
                      src={itemImages[0]}
                      alt={item.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-[#071A3D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <div className="p-3 rounded-full bg-white text-[#071A3D] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5 font-bold text-xs">
                        <Eye className="w-4 h-4" />
                        <span>{hasMultiple ? `View Album (${itemImages.length})` : "View Image"}</span>
                      </div>
                    </div>

                    {/* Album Badge for Multi-photo Items (Events / Activities) */}
                    {hasMultiple && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 shadow-md flex items-center gap-1.5 z-10">
                        <Images className="w-3.5 h-3.5" />
                        <span>{itemImages.length} Photos</span>
                      </div>
                    )}

                    {/* Category Pill */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 z-10">
                      {item.category}
                    </div>

                    {/* Photo Dots Indicator if multiple photos */}
                    {hasMultiple && (
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs z-10 pointer-events-none">
                        {itemImages.map((_, dotIdx) => (
                          <span
                            key={dotIdx}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              dotIdx === 0 ? "bg-white w-2.5" : "bg-white/40"
                            }`}
                          />
                        ))}
                      </div>
                    )}
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

                    <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-navy-700/60 text-[11px] text-blue-600 dark:text-blue-300 font-bold flex items-center justify-between">
                      {hasMultiple ? (
                        <span className="flex items-center gap-1.5">
                          <Images className="w-3.5 h-3.5" />
                          <span>View {itemImages.length} Photos Album</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <span>Click to expand</span>
                          <Maximize2 className="w-3 h-3" />
                        </span>
                      )}
                      <Maximize2 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal with Multi-photo Support */}
      <AnimatePresence>
        {selectedImageIndex !== null && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={handleClose}
          >
            <div
              className="relative max-w-5xl w-full max-h-[96vh] flex flex-col items-center my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                aria-label="Close modal"
                className="absolute -top-11 right-0 sm:right-1 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-30 cursor-pointer"
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* Prev Gallery Item Button (desktop sides) */}
              <button
                onClick={handlePrevItem}
                aria-label="Previous gallery item"
                title="Previous item"
                className="hidden lg:flex absolute -left-14 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 p-3 rounded-full backdrop-blur-xs transition-all hover:scale-110 z-20 cursor-pointer border border-white/10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Gallery Item Button (desktop sides) */}
              <button
                onClick={handleNextItem}
                aria-label="Next gallery item"
                title="Next item"
                className="hidden lg:flex absolute -right-14 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 p-3 rounded-full backdrop-blur-xs transition-all hover:scale-110 z-20 cursor-pointer border border-white/10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Main Photo Display Area */}
              <div className="relative w-full max-h-[64vh] sm:max-h-[68vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/60 border border-white/10 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${selectedImageIndex}-${activePhotoIndex}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    src={currentImages[activePhotoIndex] || currentItem.image}
                    alt={`${currentItem.title} - photo ${activePhotoIndex + 1}`}
                    className="max-h-[64vh] sm:max-h-[68vh] w-auto max-w-full object-contain"
                  />
                </AnimatePresence>

                {/* Photo album navigation arrows overlay on the image */}
                {currentImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      aria-label="Previous photo in album"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/65 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-xs transition-all hover:scale-110 z-10 cursor-pointer shadow-lg border border-white/10"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button
                      onClick={handleNextPhoto}
                      aria-label="Next photo in album"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/65 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-xs transition-all hover:scale-110 z-10 cursor-pointer shadow-lg border border-white/10"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Album Photo Counter Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-semibold border border-white/20 z-10 flex items-center gap-1.5 shadow-md">
                      <Images className="w-3.5 h-3.5 text-blue-400" />
                      <span>Photo {activePhotoIndex + 1} of {currentImages.length}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Strip for Multi-photo Albums */}
              {currentImages.length > 1 && (
                <div className="w-full mt-2.5 flex items-center justify-center gap-2 overflow-x-auto py-1 px-2 scrollbar-none">
                  {currentImages.map((imgUrl, thumbIdx) => (
                    <button
                      key={thumbIdx}
                      onClick={() => setActivePhotoIndex(thumbIdx)}
                      aria-label={`Switch to photo ${thumbIdx + 1}`}
                      className={`relative w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        thumbIdx === activePhotoIndex
                          ? "border-blue-400 scale-105 shadow-[0_0_12px_rgba(96,165,250,0.6)]"
                          : "border-white/20 opacity-55 hover:opacity-100 hover:border-white/50"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${thumbIdx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Lightbox Caption & Controls */}
              <div className="w-full mt-3 p-3.5 sm:p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-100 font-semibold">
                      {currentItem.category}
                    </span>
                    {currentImages.length > 1 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-medium">
                        Album: {activePhotoIndex + 1} / {currentImages.length} photos
                      </span>
                    )}
                    <span className="text-xs text-slate-300">
                      Item {selectedImageIndex + 1} of {filteredItems.length}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white truncate">
                    {currentItem.title}
                  </h4>
                  <p className="text-xs text-slate-200 mt-0.5 line-clamp-2">
                    {currentItem.description}
                  </p>
                </div>

                {/* Mobile / Quick Prev & Next Item Switchers */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={handlePrevItem}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors flex items-center gap-1 cursor-pointer"
                    title="Previous Item"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev Item</span>
                  </button>
                  <button
                    onClick={handleNextItem}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors flex items-center gap-1 cursor-pointer"
                    title="Next Item"
                  >
                    <span>Next Item</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
