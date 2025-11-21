
import React from 'react';
import TeamMemberCard from './TeamMemberCard';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const teamData = [
  {
    // Updated to a more professional headshot fitting the description
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop', 
    name: 'Fahad Ibrahim',
    title: 'Founder & CEO',
    twitterUrl: 'https://x.com/hopetheory_',
    linkedinUrl: '#',
    isFeatured: true,
    credentials: 'B.Sc. in CSE | Building Solutions & 3BHA.net'
  },
  {
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    name: 'Ayesha Rahman',
    title: 'Lead Architect',
    linkedinUrl: '#'
  },
  {
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    name: 'Karim Hossain',
    title: 'Senior Project Manager',
    linkedinUrl: '#'
  },
  {
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    name: 'Fatima Khan',
    title: 'Head of Operations',
    linkedinUrl: '#'
  },
];

const Team: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
  const isVisible = !!entry?.isIntersecting;

  return (
    <section id="team" className="py-20 md:py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Meet Our Expert Team</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Led by <strong>Fahad Ibrahim</strong>, our dedicated professionals turn your vision into reality.
          </p>
        </div>
        <div ref={ref} className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-start">
          {teamData.map((member, index) => (
            <TeamMemberCard 
              key={index} 
              image={member.image} 
              name={member.name} 
              title={member.title}
              twitterUrl={member.twitterUrl}
              linkedinUrl={member.linkedinUrl}
              className={`opacity-0 ${isVisible ? 'animate-fade-in-up animate-delay' : ''}`}
              style={{ '--animation-delay': `${index * 150}ms`} as React.CSSProperties}
              isFeatured={member.isFeatured}
              credentials={member.credentials}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
