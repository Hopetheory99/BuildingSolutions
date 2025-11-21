
import React from 'react';
import { PackageIcon, CalculatorIcon, TruckIcon, ShieldCheckIcon, HardHatIcon, LightningBoltIcon } from './Icons';
import ServiceCard from './ServiceCard';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const servicesData = [
  {
    icon: <PackageIcon className="h-12 w-12 text-accent mb-4" />,
    title: 'Material Sourcing & Supply',
    description: 'Direct sourcing of cement, steel, sand, and stones from trusted manufacturers with transparent pricing.'
  },
  {
    icon: <HardHatIcon className="h-12 w-12 text-accent mb-4" />,
    title: 'Skilled Labor Supply',
    description: 'Providing vetted masons, electricians, plumbers, and site supervisors for daily or contract basis.'
  },
  {
    icon: <CalculatorIcon className="h-12 w-12 text-accent mb-4" />,
    title: 'Quote Comparison',
    description: 'We analyze market rates to negotiate the best deals for you, ensuring a flat 10-15% service markup.'
  },
  {
    icon: <TruckIcon className="h-12 w-12 text-accent mb-4" />,
    title: 'On-Time Logistics',
    description: 'Reliable fleet management to ensure materials reach your Dhaka construction site exactly when needed.'
  },
  {
    icon: <ShieldCheckIcon className="h-12 w-12 text-accent mb-4" />,
    title: 'Project Coordination',
    description: 'End-to-end oversight of supply schedules to prevent work stoppages and material wastage.'
  },
  {
    icon: <LightningBoltIcon className="h-12 w-12 text-accent mb-4" />,
    title: 'Equipment & Backup Power',
    description: 'Rental and supply of heavy machinery, passenger lifts, and diesel generators for uninterrupted work.'
  }
];

const Services: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
  const isVisible = !!entry?.isIntersecting;

  return (
    <section id="services" className="py-20 md:py-28 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Our Services</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-400">
            From raw materials to skilled hands, we provide everything you need to build in Dhaka.
          </p>
        </div>
        <div ref={ref} className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description}
              className={`opacity-0 ${isVisible ? 'animate-fade-in-up animate-delay' : ''}`}
              style={{ '--animation-delay': `${index * 150}ms`} as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
