import React, { useState, useRef } from 'react';
import { ShieldCheckIcon, TruckIcon, CalculatorIcon, PackageIcon, PlayIcon, PauseIcon, VolumeUpIcon, VolumeOffIcon } from './Icons';

const benefits = [
  {
    icon: <PackageIcon className="h-8 w-8 text-accent group-hover/item:animate-wiggle" />,
    text: 'Established Supplier Network',
  },
  {
    icon: <CalculatorIcon className="h-8 w-8 text-accent group-hover/item:animate-wiggle" />,
    text: 'Competitive 10-15% Markup',
  },
  {
    icon: <TruckIcon className="h-8 w-8 text-accent group-hover/item:animate-wiggle" />,
    text: 'Technology-Driven Efficiency',
  },
  {
    icon: <ShieldCheckIcon className="h-8 w-8 text-accent group-hover/item:animate-wiggle" />,
    text: 'Quality Guaranteed',
  },
];

const Hero: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center text-white pt-20 overflow-hidden group">
      {/* Background Media Container */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {/* Fallback Image: Visible initially, fades out when video loads */}
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop"
          alt="Construction Site Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
          loading="eager"
          fetchPriority="high"
        />
        
        {/* Background Video: Invisible initially, fades in when loaded */}
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted={isMuted}
          playsInline
          role="presentation"
          aria-hidden="true"
          onLoadedData={() => setIsVideoLoaded(true)}
          onTimeUpdate={handleTimeUpdate}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="https://cdn.coverr.co/videos/coverr-construction-site-in-the-city-4835/1080p.webm" type="video/webm" />
          <source src="https://cdn.coverr.co/videos/coverr-construction-site-in-the-city-4835/1080p.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gray-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fade-in animate-delay" style={{ '--animation-delay': '0.2s', animationDuration: '0.8s' } as React.CSSProperties}>
          Your Trusted Construction Supply Partner
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-up animate-delay" style={{ '--animation-delay': '0.4s' } as React.CSSProperties}>
          Streamlined sourcing, competitive pricing, and reliable delivery for your construction projects in Dhaka, Bangladesh.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up animate-delay" style={{ '--animation-delay': '0.6s' } as React.CSSProperties}>
          {benefits.map((benefit, index) => (
            <div key={index} className="group/item flex items-center gap-3 bg-gray-800/50 hover:bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg transition-all duration-300 cursor-default hover:scale-105">
              <span aria-hidden="true">{benefit.icon}</span>
              <span className="font-semibold text-sm">{benefit.text}</span>
            </div>
          ))}
        </div>
        <div className="space-x-4 animate-fade-in-up animate-delay" style={{ '--animation-delay': '0.8s' } as React.CSSProperties}>
          <a
            href="#contact"
            className="inline-block bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg transform transition-all duration-300 hover:bg-accent-hover hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
          >
            Get Your Quote
          </a>
          <a
            href="#projects"
            className="inline-block bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg transform transition-all duration-300 hover:bg-gray-600 hover:scale-105 hover:shadow-lg"
          >
            View Our Projects
          </a>
        </div>
      </div>

      {/* Video Controls */}
      {isVideoLoaded && (
        <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8 z-20 flex flex-col items-end gap-3">
          {/* Progress Bar */}
          <div className="w-24 md:w-32 h-1.5 bg-gray-800/60 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
             <div 
               className="h-full bg-accent shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-200 ease-linear"
               style={{ width: `${progress}%` }}
               role="progressbar" 
               aria-valuenow={Math.round(progress)} 
               aria-valuemin={0} 
               aria-valuemax={100}
               aria-label="Video playback progress"
             />
          </div>

          <div className="flex gap-2">
            <button
              onClick={togglePlay}
              className="p-2 bg-gray-900/50 hover:bg-gray-900/80 text-white rounded-full backdrop-blur-sm border border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent opacity-70 hover:opacity-100"
              aria-label={isPlaying ? "Pause background video" : "Play background video"}
            >
              {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 bg-gray-900/50 hover:bg-gray-900/80 text-white rounded-full backdrop-blur-sm border border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent opacity-70 hover:opacity-100"
              aria-label={isMuted ? "Unmute background video" : "Mute background video"}
            >
              {isMuted ? <VolumeOffIcon className="h-5 w-5" /> : <VolumeUpIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;