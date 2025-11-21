
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
    title: 'Gulshan Skyline Tower',
    location: 'Gulshan Avenue, Dhaka',
    category: 'Commercial',
    description: 'A 20-story LEED-certified corporate headquarters featuring double-glazed glass facades for heat reduction and a rooftop garden.',
    caseStudy: 'Constructing in the heart of Gulshan-2 required strict adherence to RAJUK safety protocols and traffic management. We supplied high-grade BSRM Xtreme steel and Holcim cement to ensure structural integrity against seismic activity. The project features a modern HVAC system optimized for Dhaka\'s humidity, reducing energy costs by 30%.'
  },
  {
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80&auto=format&fit=crop' }
    ],
    title: 'Bashundhara Luxury Heights',
    location: 'Block I, Bashundhara R/A',
    category: 'Residential',
    description: 'A premium 12-unit apartment complex featuring imported marble flooring, smart home integration, and community amenities.',
    caseStudy: 'For this high-end project in Bashundhara Residential Area, the client demanded flawless finishing. We sourced Italian marble and premium RAK sanitary ware directly to cut syndicate costs. Our team coordinated the supply of 500 tons of rod and 20,000 bags of Shah Cement, ensuring zero downtime during the casting phase.'
  },
  {
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1590234732101-a82a7a402c5e?w=800&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1581092448348-a5737b8830b5?w=1200&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=1200&q=80&auto=format&fit=crop' }
    ],
    title: 'Gazipur Textile Hub',
    location: 'Konabari, Gazipur',
    category: 'Industrial',
    description: 'A massive 50,000 sqft steel-structure factory floor designed for heavy textile machinery and automated logistics.',
    caseStudy: 'Speed was critical for this export-oriented factory. We utilized pre-engineered steel buildings (PEB) technology to erect the structure 40% faster than traditional methods. We supplied industrial-grade flooring solutions capable of withstanding heavy forklift traffic and ensured a steady supply of Sylhet sand and stone chips for the foundation work.'
  },
  {
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1559902213-1a206a43e493?w=800&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80&auto=format&fit=crop' }
    ],
    title: 'Uttara Community Center',
    location: 'Sector 4, Uttara',
    category: 'Commercial',
    description: 'A multi-purpose community hall with acoustic treatment, underground parking, and a rooftop convention center.',
    caseStudy: 'Located in a dense residential sector of Uttara, noise control during construction was a priority. We implemented strict work-hour schedules and used sound-dampening scaffolding curtains. The building utilizes local AAC blocks to reduce structural load and improve thermal insulation, a sustainable choice for Dhaka\'s climate.'
  },
  {
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1605276374104-5de67d216b04?w=1200&q=80&auto=format&fit=crop' }
    ],
    title: 'Dhanmondi Duplex Renovation',
    location: 'Road 27, Dhanmondi',
    category: 'Residential',
    description: 'Transforming a 1990s residence into a modern duplex with open floor plans and smart lighting systems.',
    caseStudy: 'Renovating an old structure in Dhanmondi presents unique structural challenges. We conducted thorough digital scans of the existing columns before retrofitting. We supplied premium teak wood from Chittagong for the interior finishes and replaced the old plumbing with durable CPVC pipes to ensure longevity for the next generation.'
  },
  {
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1551842369-1e2f7514a22b?w=800&q=80&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1526733986429-9c5b742523a7?w=1200&q=80&auto=format&fit=crop' }
    ],
    title: 'Puran Dhaka Heritage Restoration',
    location: 'Lalbagh, Old Dhaka',
    category: 'Industrial',
    description: 'Careful restoration of a colonial-era warehouse, preserving the original brickwork while upgrading utilities for modern commercial use.',
    caseStudy: 'Working in the narrow lanes of Old Dhaka required specialized logistics. We used small pickup trucks (Laguna size) to transport materials at night to avoid traffic. The restoration involved sourcing specialized lime-surki mortar to match the original construction materials, preserving the historical authenticity of the building.'
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
            Building the future of Dhaka, one structure at a time.
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
