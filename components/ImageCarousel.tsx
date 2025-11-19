import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, WarningIcon } from './Icons';
import { MediaItem } from './Projects';

interface ImageCarouselProps {
  media: MediaItem[];
  title: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ media, title }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goToPrev = useCallback(() => {
    setIsMediaLoaded(false);
    setVideoError(false);
    setCurrentMediaIndex(prevIndex => 
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  }, [media.length]);

  const goToNext = useCallback(() => {
    setIsMediaLoaded(false);
    setVideoError(false);
    setCurrentMediaIndex(prevIndex =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
  }, [media.length]);

  const goToIndex = (index: number) => {
    if (index !== currentMediaIndex) {
      setIsMediaLoaded(false);
      setVideoError(false);
      setCurrentMediaIndex(index);
    }
  };
  
  // Reset video playback when slide changes if it's a video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setVideoError(false);
      // Optional: videoRef.current.play();
    }
  }, [currentMediaIndex]);

  useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (media.length <= 1) return;
        
        // Ensure keyboard nav for carousel doesn't conflict with tab navigation
        const activeElement = document.activeElement as HTMLElement;
        const isControllingTabs = activeElement && activeElement.closest('[role="tablist"]');
        if (isControllingTabs) return;

        if (event.key === 'ArrowLeft') goToPrev();
        if (event.key === 'ArrowRight') goToNext();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext, media.length]);

  const currentItem = media[currentMediaIndex];

  return (
    <>
      <div className="relative bg-transparent flex-shrink-0 flex items-center justify-center h-[55vh] bg-black/20">
        {/* Shimmer effect while content loads */}
        {!isMediaLoaded && !videoError && (
          <div 
            className="absolute inset-0 animate-shimmer flex items-center justify-center z-0"
            style={{ background: 'linear-gradient(to right, #4a5568 8%, #606c80 18%, #4a5568 33%)', backgroundSize: '1000px 100%' }}
            aria-hidden="true"
          >
          </div>
        )}
        
        <div className={`relative w-full h-full flex items-center justify-center transition-opacity duration-500 ${isMediaLoaded || videoError ? 'opacity-100' : 'opacity-0'}`}>
          {currentItem.type === 'video' ? (
            videoError ? (
               <div className="flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                 <WarningIcon className="w-12 h-12 mb-2 text-yellow-500" />
                 <p>Video unavailable</p>
               </div>
            ) : (
              <video
                ref={videoRef}
                src={currentItem.url}
                poster={currentItem.poster}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
                onLoadedData={() => setIsMediaLoaded(true)}
                onError={() => {
                  setVideoError(true);
                  setIsMediaLoaded(true);
                }}
              >
                Your browser does not support the video tag.
              </video>
            )
          ) : (
            <img 
              src={currentItem.url} 
              alt={`Showcasing ${title}, item ${currentMediaIndex + 1} of ${media.length}`}
              className="w-full h-full object-contain"
              loading={currentMediaIndex === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={currentMediaIndex === 0 ? "high" : "auto"}
              onLoad={() => setIsMediaLoaded(true)}
            />
          )}
        </div>

         {media.length > 1 && (
          <>
            <button onClick={goToPrev} aria-label="Previous media" className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors z-10">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button onClick={goToNext} aria-label="Next media" className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors z-10">
              <ChevronRightIcon className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-10">
              {currentMediaIndex + 1} / {media.length}
            </div>
          </>
        )}
      </div>

      {media.length > 1 && (
        <div className="bg-transparent p-2 flex-shrink-0 border-t border-gray-700/50">
          <div className="flex justify-center space-x-2">
            {media.map((item, idx) => {
              const thumbUrl = item.type === 'video' && item.poster ? item.poster : item.url;
              return (
                <button 
                  key={idx} 
                  onClick={() => goToIndex(idx)}
                  aria-label={`Go to item ${idx + 1}`}
                  className={`relative w-16 h-12 rounded-md overflow-hidden transition-all duration-200 flex-shrink-0 ${currentMediaIndex === idx ? 'ring-2 ring-accent' : 'opacity-60 hover:opacity-100'}`}
                  >
                  <img 
                    src={thumbUrl.split('?')[0] + '?w=100&h=100&fit=crop&q=75'} 
                    alt={`Thumbnail of ${title}, item ${idx + 1}`} 
                    className="w-full h-full object-cover" 
                    loading="lazy" 
                    decoding="async" 
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <PlayIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;