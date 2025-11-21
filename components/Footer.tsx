
import React from 'react';
import { BuildingIcon, FacebookIcon, LinkedInIcon, TwitterIcon } from './Icons';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-2 text-white font-bold text-xl">
              <BuildingIcon className="h-8 w-8 text-accent" />
              Building Solution
            </a>
            <p className="text-gray-400 text-base">
              Your trusted partner for construction materials and labor sourcing in Dhaka.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#1877F2] transition-colors"><FacebookIcon className="h-6 w-6" /><span className="sr-only">Facebook</span></a>
              <a href="#" className="text-gray-400 hover:text-[#0A66C2] transition-colors"><LinkedInIcon className="h-6 w-6" /><span className="sr-only">LinkedIn</span></a>
              <a href="https://x.com/hopetheory_" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon className="h-6 w-6" /><span className="sr-only">Twitter</span></a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Links</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" onClick={(e) => handleNavClick(e, 'materials')} className="text-base text-gray-300 hover:text-white">Materials Catalog</a></li>
                  <li><a href="#" onClick={(e) => handleNavClick(e, 'checklist')} className="text-base text-gray-300 hover:text-white">Building Checklist</a></li>
                  <li><a href="#" onClick={(e) => handleNavClick(e, 'gallery')} className="text-base text-gray-300 hover:text-white">Gallery</a></li>
                  <li><a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('home'); document.getElementById('contact')?.scrollIntoView(); }} className="text-base text-gray-300 hover:text-white">Get a Quote</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
                 <ul className="mt-4 space-y-4 text-gray-300">
                   <li>Japan Garden City, Mohammadpur, Dhaka</li>
                   <li><a href="mailto:fahadibrahim@buildingsolution.com" className="hover:text-accent">fahadibrahim@buildingsolution.com</a></li>
                   <li><a href="tel:+8801670944800" className="hover:text-accent">+880 1670 944800</a></li>
                 </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 xl:text-center">&copy; 2025 Building Solution. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
