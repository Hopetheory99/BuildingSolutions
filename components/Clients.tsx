
import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const clientLogos = [
  { name: 'Navana Real Estate', url: '#', logo: <svg viewBox="0 0 120 40"><text x="60" y="25" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor" fontFamily="sans-serif">NAVANA</text></svg> },
  { name: 'Bashundhara Group', url: '#', logo: <svg viewBox="0 0 120 40"><path d="M40 30 L60 10 L80 30 Z" stroke="currentColor" strokeWidth="2" fill="none"></path><text x="60" y="28" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">BG</text></svg> },
  { name: 'BSRM Steels', url: '#', logo: <svg viewBox="0 0 120 40"><text x="60" y="25" dominantBaseline="middle" textAnchor="middle" fontSize="16" fontWeight="900" fill="currentColor" letterSpacing="2">BSRM</text></svg> },
  { name: 'Sheltech', url: '#', logo: <svg viewBox="0 0 120 40"><text x="60" y="25" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor" fontFamily="serif">Sheltech</text></svg> },
  { name: 'Shah Cement', url: '#', logo: <svg viewBox="0 0 120 40"><text x="60" y="20" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">SHAH</text><text x="60" y="32" dominantBaseline="middle" textAnchor="middle" fontSize="8" fill="currentColor">CEMENT</text></svg> },
  { name: 'Concord Group', url: '#', logo: <svg viewBox="0 0 120 40"><text x="60" y="25" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">CONCORD</text></svg> },
  { name: 'Shanta Holdings', url: '#', logo: <svg viewBox="0 0 120 40"><rect x="20" y="18" width="80" height="2" fill="currentColor"></rect><text x="60" y="15" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">SHANTA</text></svg> },
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
    <div className="w-32 h-16 text-gray-400 group-hover:text-white transition-colors duration-300 flex items-center justify-center">
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
            Trusted by Top Developers
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            We partner with the leading construction and real estate firms in Bangladesh.
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
