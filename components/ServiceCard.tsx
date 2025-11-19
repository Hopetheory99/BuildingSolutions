
import React from 'react';

type ServiceCardProps = React.HTMLAttributes<HTMLDivElement> & {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, className, ...props }) => {
  return (
    <div 
      className={`group bg-gray-800 p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-750 h-full flex flex-col ${className}`}
      {...props}
    >
      <div aria-hidden="true" className="flex justify-center items-center mb-6 transition-all duration-300 group-hover:text-white">
        <div className="transform transition-transform duration-500 group-hover:animate-float group-hover:scale-110">
          {icon}
        </div>
      </div>
      <h3 className="mt-4 text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">{title}</h3>
      <p className="mt-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300 flex-grow">{description}</p>
    </div>
  );
};

export default ServiceCard;