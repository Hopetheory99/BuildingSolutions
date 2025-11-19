
import React from 'react';
import { LinkedInIcon, TwitterIcon } from './Icons';

type TeamMemberCardProps = React.HTMLAttributes<HTMLDivElement> & {
  image: string;
  name: string;
  title: string;
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ image, name, title, className, ...props }) => {
  return (
    <div className={`group text-center p-6 rounded-xl transition-all duration-500 hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] hover:bg-gradient-to-b hover:from-gray-800 hover:to-gray-900 ${className}`} {...props}>
      <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-transparent group-hover:border-accent/50 transition-all duration-500">
        <img 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
          src={image} 
          alt={name}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center space-x-4 backdrop-blur-[2px] opacity-0 group-hover:opacity-100">
          <a
            href="#"
            aria-label={`View ${name}'s LinkedIn profile`}
            className="p-2 bg-white/10 hover:bg-accent rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
          >
            <LinkedInIcon className="h-5 w-5" title="LinkedIn" />
          </a>
          <a
            href="#"
            aria-label={`View ${name}'s Twitter profile`}
            className="p-2 bg-white/10 hover:bg-accent rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:scale-110"
          >
            <TwitterIcon className="h-5 w-5" title="Twitter" />
          </a>
        </div>
      </div>
      <h3 className="mt-6 text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">{name}</h3>
      <p className="mt-1 text-gray-400 font-medium">{title}</p>
    </div>
  );
};

export default TeamMemberCard;
