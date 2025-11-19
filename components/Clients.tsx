import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const clientLogos = [
  { name: 'NexaBuild', url: '#', logo: <svg viewBox="0 0 100 40"><text x="50" y="25" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">NexaBuild</text></svg> },
  { name: 'Apex Structures', url: '#', logo: <svg viewBox="0 0 100 40"><text x="50" y="25" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">APEX</text><rect x="25" y="30" width="50" height="2" fill="currentColor"></rect></svg> },
  { name: 'Urban Edge', url: '#', logo: <svg viewBox="0 0 100 40"><path d="M10 30 L20 10 L30 30 L40 10 L50 30 L60 10 L70 30 L80 10 L90 30" stroke="currentColor" strokeWidth="2" fill="none"></path></svg> },
  { name: 'Terra Firma', url: '#', logo: <svg viewBox="0 0 100 40"><text x="50" y="25" dominantBaseline="middle" textAnchor="middle" fontSize="14" fill="currentColor" fontFamily="serif">Terra Firma</text></svg> },
  { name: 'Keystone Co.', url: '#', logo: <svg viewBox="0 0 100 40"><path d="M40 30 L50 10 L60 30 Z" stroke="currentColor" strokeWidth="2" fill="none"></path><text x="50" y="26" dominantBaseline="middle" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor">K</text></svg> },
  { name: 'Pinnacle Group', url: '#', logo: <svg viewBox="0 0 100 40"><path d="M50 10 L60 30 L40 30 Z" stroke="currentColor" strokeWidth="2" fill="currentColor"></path><text x="50" y="25" dominantBaseline="middle" textAnchor="middle" fontSize="8" fontWeight="bold" fill="black">Pinnacle</text></svg> },
  { name: 'Skyline Corp', url: '#', logo: <svg viewBox="0 0 100 40"><rect x="20" y="25" width="60" height="5" fill="currentColor"></rect><rect x="30" y="20" width="40" height="5" fill="currentColor"></rect><rect x="40" y="15" width="20" height="5" fill="currentColor"></rect></svg> },
];

const Logo: React.FC<{ name: string; url: string; logo: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ name, url, logo, className, style }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`group flex-shrink-0 w-[180px] h-24 flex items-center justify-center transform transition-all duration-300 hover:scale-105 filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 ${className}`}
    style={style}
    aria-label={`Visit ${name}`}
  >
    <div className="w-32 h-16 text-gray-400 group-hover:text-white transition-colors duration-300">
      {logo}
    </div>
  </a>
);

const Clients: React.FC = () => {
  const [sectionRef, entry] = useIntersectionObserver({ threshold: 0.2 });
  const isVisible = !!entry?.isIntersecting;

  return (
    <section id="clients" className="py-20 md:py-28 bg-gray-900" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            We are proud to partner with companies that are shaping the future of construction.
          </p>
        </div>
        <div
          className="relative mt-12 w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="flex" onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')} onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}>
            <div className="flex space-x-16 animate-scroll">
              {[...clientLogos, ...clientLogos].map((client, index) => (
                <Logo
                  key={`${client.name}-${index}`}
                  name={client.name}
                  url={client.url}
                  logo={client.logo}
                  className={`opacity-0 ${isVisible ? 'animate-fade-in-up animate-delay' : ''}`}
                  style={isVisible ? { '--animation-delay': `${(index % clientLogos.length) * 100}ms` } as React.CSSProperties : {}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;