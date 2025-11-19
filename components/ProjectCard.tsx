import React, { useState, useRef, useCallback, useMemo } from 'react';
import Modal from './Modal';
import ImageCarousel from './ImageCarousel';
import Tabs from './Tabs';
import { PlayIcon } from './Icons';
import { MediaItem } from './Projects';

interface ProjectCardProps {
  media: MediaItem[];
  title: string;
  location: string;
  description: string;
  caseStudy: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ media, title, location, description, caseStudy, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  // Determine thumbnail URL: use poster if video, otherwise use url
  const firstMedia = media[0];
  const thumbnailUrl = firstMedia.type === 'video' && firstMedia.poster ? firstMedia.poster : firstMedia.url;
  const baseImageUrl = thumbnailUrl.split('?')[0];
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const tabContent = useMemo(() => [
    {
      id: `desc-${index}`,
      label: 'Description',
      content: <p className="text-gray-400">{description}</p>,
    },
    {
      id: `case-${index}`,
      label: 'Case Study',
      content: (
        <>
          <h4 className="text-xl font-bold text-accent mb-3">Case Study</h4>
          <p className="text-gray-400">{caseStudy}</p>
          <div className="mt-8 text-center">
            <button
              disabled
              className="inline-block bg-accent text-white font-bold py-2 px-6 rounded-lg text-base transition-all duration-300 opacity-50 cursor-not-allowed"
              aria-label={`Full case study for ${title} (coming soon)`}
              title="Full case study coming soon!"
            >
              View Full Case Study
            </button>
          </div>
        </>
      ),
    }
  ], [index, description, caseStudy, title]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={openModal}
        className="group rounded-lg overflow-hidden shadow-lg bg-gray-900 relative transform hover:-translate-y-2 transition-transform duration-300 text-left w-full animate-fade-in-up animate-delay"
        style={{ '--animation-delay': `${index * 100}ms` } as React.CSSProperties}
        aria-label={`View details for ${title}`}
        aria-haspopup="dialog"
      >
        <div className="relative w-full h-60 overflow-hidden">
          {!isImageLoaded && (
             <div 
               className="absolute inset-0 bg-gray-700 animate-shimmer"
               style={{ background: 'linear-gradient(to right, #4a5568 8%, #606c80 18%, #4a5568 33%)', backgroundSize: '1000px 100%' }}
             ></div>
          )}
          <picture>
            <source 
              srcSet={`${baseImageUrl}?w=400&q=75&auto=format&fit=crop`}
              media="(max-width: 640px)"
            />
             <source 
              srcSet={`${baseImageUrl}?w=600&q=75&auto=format&fit=crop`}
              media="(max-width: 1024px)"
            />
            <img
              src={baseImageUrl}
              alt={title} 
              className={`w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setIsImageLoaded(true)}
            />
          </picture>
          
          {/* Overlay Icon for Video */}
          {firstMedia.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="bg-black/50 rounded-full p-3 backdrop-blur-sm border border-white/20">
                 <PlayIcon className="w-8 h-8 text-white opacity-90" />
              </div>
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="p-6 absolute bottom-0 left-0 right-0">
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-gray-300 text-sm">{location}</p>
        </div>
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        triggerRef={triggerRef}
        ariaLabelledById={`modal-title-${index}`}
        ariaDescribedById={`modal-desc-${index}`}
      >
        <div className="absolute inset-0 z-0 opacity-30">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          >
            <source src="https://cdn.coverr.co/videos/coverr-a-man-working-on-an-architecture-project-7452/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gray-900/60"></div>
        </div>
        <div className="relative z-10 flex flex-col w-full flex-1">
          <ImageCarousel media={media} title={title} />
          
          <div className="p-6 bg-transparent flex-shrink-0">
            <h3 id={`modal-title-${index}`} className="text-2xl font-bold text-white">{title}</h3>
            <p id={`modal-desc-${index}`} className="text-gray-400 mt-1">{location}</p>
          </div>

          <Tabs tabs={tabContent} />
        </div>
      </Modal>
    </>
  );
};

export default ProjectCard;