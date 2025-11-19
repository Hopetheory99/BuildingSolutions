import React, { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';

export type MediaType = 'image' | 'video';

export interface MediaItem {
  type: MediaType;
  url: string;
  poster?: string;
}

export interface Project {
  media: MediaItem[];
  title: string;
  location: string;
  category: string;
  description: string;
  caseStudy: string;
}

const projectsData: Project[] = [
  {
    media: [
      { 
        type: 'video', 
        url: 'https://cdn.coverr.co/videos/coverr-architect-working-on-a-project-5628/1080p.mp4', 
        poster: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80&auto=format&fit=crop'
      },
      { type: 'image', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80&auto=format&fit=crop' }
    ],
    title: 'Modern Corporate Headquarters',
    location: 'Downtown, Metropolis',
    category: 'Commercial',
    description: 'A state-of-the-art corporate campus featuring sustainable design, open-concept workspaces, and cutting-edge technology infrastructure to foster innovation and collaboration.',
    caseStudy: 'The primary challenge for the Modern Corporate Headquarters was to create a building that was not only aesthetically pleasing but also a leader in energy efficiency. We implemented a passive solar design, a green roof, and a state-of-the-art HVAC system, resulting in a 40% reduction in energy consumption compared to buildings of similar size. The project was completed two months ahead of schedule and under budget, setting a new standard for commercial construction in Metropolis.'
  },
  {
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80&auto=format&fit=crop' }
    ],
    title: 'Luxury Residential Tower',
    location: 'Oceanview Drive, Coast City',
    category: 'Residential',
    description: 'An iconic residential skyscraper offering breathtaking ocean views, premium amenities including a rooftop infinity pool, a private cinema, and bespoke concierge services.',
    caseStudy: 'Constructing the Luxury Residential Tower on a tight urban footprint with minimal disruption to the surrounding high-end neighborhood was a key challenge. Our team employed advanced just-in-time material delivery logistics and off-site prefabrication for key components. This strategy not only accelerated the construction timeline by 15% but also significantly reduced on-site noise and traffic, earning praise from the local community and stakeholders.'
  },
  {
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1559902213-1a206a43e493?w=800&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80&auto=format&fit=crop' }
    ],
    title: 'Community Arts Center',
    location: 'Cultural District, Star City',
    category: 'Commercial',
    description: 'A vibrant cultural hub designed to inspire creativity. The center includes a modern art gallery, performance theater, and workshop spaces for local artists and the community.',
    caseStudy: 'The Community Arts Center required a unique blend of acoustic engineering and versatile space design. We collaborated with sound engineers to create a concert hall with world-class acoustics while ensuring adjacent workshop spaces remained soundproof. The use of modular wall systems allows the main gallery to be reconfigured for different exhibitions, providing a truly flexible and future-proof venue for the arts.'
  },
  {
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1605276374104-5de67d216b04?w=1200&q=80&auto=format&fit=crop' }
    ],
    title: 'Suburban Family Home Renovation',
    location: 'Maple Street, Suburbia',
    category: 'Residential',
    description: 'A complete transformation of a classic suburban house into a modern, energy-efficient family home with a spacious open-plan living area and seamless indoor-outdoor flow.',
    caseStudy: 'The goal of this renovation was to modernize a 1970s home while preserving its original character. We uncovered and restored original hardwood floors and integrated them with a new, open-concept kitchen and living area. A major structural change involved installing a 25-foot steel beam to remove load-bearing walls, creating the seamless indoor-outdoor flow the clients desired. The result is a home that respects its history while embracing modern living.'
  },
  {
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1590234732101-a82a7a402c5e?w=800&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1581092448348-a5737b8830b5?w=1200&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=1200&q=80&auto=format&fit=crop' }
    ],
    title: 'Industrial Warehouse & Logistics Hub',
    location: 'Industrial Park, Central City',
    category: 'Industrial',
    description: 'A massive, high-ceiling warehouse built for optimal logistics, featuring automated sorting systems, extensive loading docks, and strategic access to major transport routes.',
    caseStudy: 'This project\'s success hinged on the precise execution of pouring a 500,000-square-foot high-tolerance concrete slab, essential for the automated robotics that would operate within the facility. Using laser-guided screeds and a specialized concrete mix, we achieved a floor flatness rating that exceeded industry standards. This precision engineering ensures the long-term operational efficiency of the client\'s automated logistics systems.'
  },
  {
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1551842369-1e2f7514a22b?w=800&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1526733986429-9c5b742523a7?w=1200&q=80&auto=format&fit=crop' }
    ],
    title: 'Historic Building Restoration',
    location: 'Old Town, Gotham',
    category: 'Industrial',
    description: 'A meticulous restoration project that preserved the architectural integrity of a landmark building while upgrading its structural and functional systems for contemporary use.',
    caseStudy: 'Restoring the facade of this 19th-century landmark involved sourcing period-accurate materials and using traditional masonry techniques. Our artisans painstakingly repointed the original brickwork and custom-milled replacements for damaged ornate woodwork. Internally, we integrated modern electrical and plumbing systems with minimal intrusion on the historic interior, a delicate balance that successfully preserved the building\'s soul for future generations.'
  }
];

const categories = ['All', 'Commercial', 'Residential', 'Industrial'];

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projectsData;
    }
    return projectsData.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="py-20 md:py-28 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Our Projects</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            A glimpse into our commitment to quality, craftsmanship, and client satisfaction.
          </p>
        </div>

        <div className="flex justify-center space-x-2 md:space-x-4 my-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-accent ${
                activeFilter === category
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 transform hover:scale-105 active:scale-95'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              media={project.media} 
              title={project.title} 
              location={project.location}
              description={project.description}
              caseStudy={project.caseStudy}
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;