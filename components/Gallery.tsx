
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { SearchIcon, ZoomInIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
  location: string;
}

const images: GalleryImage[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80', title: 'High Rise Foundation', category: 'Site Work', location: 'Gulshan Avenue' },
  { id: 2, url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80', title: 'Industrial Welding', category: 'Labor', location: 'Gazipur Industrial Zone' },
  { id: 3, url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80', title: 'Modern Facade', category: 'Completed', location: 'Bashundhara R/A' },
  { id: 4, url: 'https://images.unsplash.com/photo-1590224354705-a60679827b6c?w=1200&q=80', title: 'Brick Laying', category: 'Labor', location: 'Mirpur DOHS' },
  { id: 5, url: 'https://images.unsplash.com/photo-1624304701680-a0602d808357?w=1200&q=80', title: 'Sylhet Sand Stockpile', category: 'Materials', location: 'Keraniganj Depot' },
  { id: 6, url: 'https://images.unsplash.com/photo-1535160974756-452595df0040?w=1200&q=80', title: 'BSRM Steel Rebar', category: 'Materials', location: 'Uttara Sector 4' },
  { id: 7, url: 'https://images.unsplash.com/photo-1590234732101-a82a7a402c5e?w=1200&q=80', title: 'Warehouse Interior', category: 'Completed', location: 'Tejgaon Industrial Area' },
  { id: 8, url: 'https://images.unsplash.com/photo-1551842369-1e2f7514a22b?w=1200&q=80', title: 'Site Planning', category: 'Management', location: 'Dhanmondi 27' },
];

const Gallery: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
  const isVisible = !!entry?.isIntersecting;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Filter Logic
  const filteredImages = useMemo(() => {
    if (!searchTerm) return images;
    const lowerTerm = searchTerm.toLowerCase();
    return images.filter(img => 
      img.title.toLowerCase().includes(lowerTerm) ||
      img.category.toLowerCase().includes(lowerTerm) ||
      img.location.toLowerCase().includes(lowerTerm)
    );
  }, [searchTerm]);

  // Lightbox Navigation
  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const navigateImage = useCallback((direction: 'next' | 'prev') => {
    if (selectedImageIndex === null) return;
    const total = filteredImages.length;
    if (direction === 'next') {
      setSelectedImageIndex((selectedImageIndex + 1) % total);
    } else {
      setSelectedImageIndex((selectedImageIndex - 1 + total) % total);
    }
  }, [selectedImageIndex, filteredImages.length]);

  // Keyboard Support for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, navigateImage]);

  return (
    <section className="py-24 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Project Gallery
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our diverse portfolio of materials, active sites, and completed landmarks across Dhaka.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10 relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400 group-focus-within:text-accent transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search by project, location, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-full leading-5 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 sm:text-sm shadow-lg"
          />
        </div>

        {/* Gallery Grid */}
        <div ref={ref} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img, idx) => (
            <button 
              key={img.id} 
              onClick={() => openLightbox(idx)}
              className={`group relative break-inside-avoid rounded-xl overflow-hidden shadow-xl w-full text-left focus:outline-none focus:ring-2 focus:ring-accent transform transition-all duration-500 hover:scale-[1.02] opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${idx * 100}ms` }}
              aria-label={`View details of ${img.title}`}
            >
              <img 
                srcSet={`${img.url}&w=400 400w, ${img.url}&w=800 800w`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={`${img.url}&w=800`}
                alt={img.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                   <div className="flex justify-between items-end">
                      <div>
                        <span className="text-accent text-xs font-bold uppercase tracking-wider">{img.category}</span>
                        <h3 className="text-white font-bold text-lg mt-1">{img.title}</h3>
                        <p className="text-gray-300 text-sm mt-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block"></span> {img.location}
                        </p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                        <ZoomInIcon className="w-5 h-5 text-white" />
                      </div>
                   </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No images found matching "{searchTerm}"</p>
            <button onClick={() => setSearchTerm('')} className="mt-4 text-accent hover:underline">Clear search</button>
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Image Detail View"
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-20 p-2 bg-gray-800/50 hover:bg-gray-700 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Close gallery"
          >
            <CloseIcon className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center">
             <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={`${filteredImages[selectedImageIndex].url}&w=1600`}
                  alt={filteredImages[selectedImageIndex].title}
                  className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm"
                />
             </div>
             
             <div className="mt-6 text-center max-w-2xl">
                <h2 className="text-2xl font-bold text-white mb-1">{filteredImages[selectedImageIndex].title}</h2>
                <div className="flex items-center justify-center gap-3 text-gray-400 text-sm">
                   <span className="px-2 py-0.5 bg-gray-800 rounded text-accent font-semibold">{filteredImages[selectedImageIndex].category}</span>
                   <span>&bull;</span>
                   <span>{filteredImages[selectedImageIndex].location}</span>
                </div>
             </div>

             {/* Navigation Buttons */}
             <button 
                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 p-3 bg-gray-800/50 hover:bg-accent text-white rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous image"
             >
                <ChevronLeftIcon className="w-8 h-8" />
             </button>
             <button 
                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 p-3 bg-gray-800/50 hover:bg-accent text-white rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next image"
             >
                <ChevronRightIcon className="w-8 h-8" />
             </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
