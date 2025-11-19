import React from 'react';
import { PackageIcon, CalculatorIcon, TruckIcon, ShieldCheckIcon } from './Icons';
import ServiceCard from './ServiceCard';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const servicesData = [
  {
    icon: <PackageIcon className="h-12 w-12 text-accent mb-4" />,
    title: 'Material Sourcing',
    description: 'Comprehensive sourcing of materials including cement, sand, rods, and bricks from our verified supplier network.'
  },
  {
    icon: <CalculatorIcon className="h-12 w-12 text-accent mb-4" />,
    title: 'Project Consultation',
    description: 'Expert consultation to plan material requirements, optimize costs, and ensure project success from the start.'
  },
  {
    icon: <TruckIcon className="h-12 w-12 text-accent mb-4" />,
    title: 'Supply Chain Management',
    description: 'End-to-end supply chain management for timely delivery, inventory optimization, and seamless project execution.'
  },
  {
    icon: <ShieldCheckIcon className="h-12 w-12 text-accent mb-4" />,
    title: 'Quality Assurance',
    description: 'Rigorous quality control to ensure all materials meet industry standards and your project specifications.'
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
            Comprehensive construction supply solutions designed to streamline your projects, reduce costs, and ensure quality delivery every time.
          </p>
        </div>
        <div ref={ref} className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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