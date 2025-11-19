import React from 'react';
import TeamMemberCard from './TeamMemberCard';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const teamData = [
  {
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    name: 'John Carter',
    title: 'Founder & CEO',
  },
  {
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    name: 'Sarah Chen',
    title: 'Lead Architect',
  },
  {
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=400&auto=format&fit=crop',
    name: 'David Lee',
    title: 'Project Manager',
  },
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    name: 'Maria Garcia',
    title: 'Head of Operations',
  },
];

const Team: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
  const isVisible = !!entry?.isIntersecting;

  return (
    <section id="team" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Meet Our Expert Team</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            The dedicated professionals who turn your vision into reality.
          </p>
        </div>
        <div ref={ref} className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamData.map((member, index) => (
            <TeamMemberCard 
              key={index} 
              image={member.image} 
              name={member.name} 
              title={member.title}
              className={`opacity-0 ${isVisible ? 'animate-fade-in-up animate-delay' : ''}`}
              style={{ '--animation-delay': `${index * 150}ms`} as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;