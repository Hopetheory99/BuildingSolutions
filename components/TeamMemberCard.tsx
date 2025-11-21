
import React from 'react';
import { LinkedInIcon, TwitterIcon } from './Icons';

type TeamMemberCardProps = React.HTMLAttributes<HTMLDivElement> & {
  image: string;
  name: string;
  title: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  isFeatured?: boolean;
  credentials?: string;
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ image, name, title, twitterUrl, linkedinUrl, isFeatured, credentials, className, ...props }) => {
  return (
    <div className={`group text-center p-6 rounded-xl transition-all duration-500 hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-3 hover:bg-gradient-to-b hover:from-gray-800 hover:to-gray-900 ${isFeatured ? 'bg-gray-800/50 border border-accent/20 transform scale-105 shadow-xl' : ''} ${className}`} {...props}>
      <div className={`relative mx-auto rounded-full overflow-hidden shadow-lg border-4 transition-all duration-500 ${isFeatured ? 'w-56 h-56 border-accent shadow-accent/20' : 'w-40 h-40 border-transparent group-hover:border-accent/50'}`}>
        <img 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
          src={image} 
          alt={name}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center space-x-4 backdrop-blur-[2px] opacity-0 group-hover:opacity-100">
          {linkedinUrl && linkedinUrl !== '#' && (
            <a
              href={linkedinUrl}
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`View ${name}'s LinkedIn profile`}
              className="p-2 bg-white/10 hover:bg-accent rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
            >
              <LinkedInIcon className="h-5 w-5" title="LinkedIn" />
            </a>
          )}
          {twitterUrl && (
            <a
              href={twitterUrl}
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`View ${name}'s Twitter profile`}
              className="p-2 bg-white/10 hover:bg-accent rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:scale-110"
            >
              <TwitterIcon className="h-5 w-5" title="Twitter" />
            </a>
          )}
        </div>
      </div>
      <h3 className={`mt-6 text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 ${isFeatured ? 'text-2xl text-accent' : ''}`}>{name}</h3>
      <p className="mt-1 text-gray-400 font-medium">{title}</p>
      {credentials && (
        <p className="text-xs text-gray-500 mt-2 border-t border-gray-700 pt-2 mx-auto max-w-[200px]">
          {credentials}
        </p>
      )}
    </div>
  );
};

export default TeamMemberCard;
