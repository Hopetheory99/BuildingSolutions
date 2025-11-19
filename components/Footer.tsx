import React from 'react';
import { BuildingIcon, FacebookIcon, LinkedInIcon, TwitterIcon } from './Icons';

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (!href.startsWith('#')) return;

  e.preventDefault();
  const targetId = href.substring(1);
  
  if (targetId === 'home' || !targetId) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (history.pushState) {
      history.pushState(null, "", ' ');
    }
    return;
  }
  
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
    });
    if (history.pushState) {
      history.pushState(null, "", href);
    }
  }
};

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#team', label: 'Team' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#clients', label: 'Clients' },
  { href: '#contact', label: 'Contact' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="flex items-center gap-2 text-white font-bold text-xl">
              <BuildingIcon className="h-8 w-8 text-accent" />
              Building Solution
            </a>
            <p className="text-gray-400 text-base">
              Your trusted partner for construction materials and labor sourcing in Dhaka.
            </p>
            <div className="flex space-x-6">
               <a href="https://twitter.com/buildingsolution" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2] transition-colors">
                <span className="sr-only">Twitter</span>
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com/company/buildingsolution" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <LinkedInIcon className="h-6 w-6" />
              </a>
              <a href="https://facebook.com/buildingsolution" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors">
                <span className="sr-only">Facebook</span>
                <FacebookIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navigation</h3>
                <ul className="mt-4 space-y-4">
                  {navLinks.map(link => (
                    <li key={link.label}>
                      <a href={link.href} onClick={(e) => handleSmoothScroll(e, link.href)} className="text-base text-gray-300 hover:text-white">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
                 <ul className="mt-4 space-y-4 text-gray-300">
                   <li>123 Construction Ave</li>
                   <li>Dhaka, Bangladesh</li>
                   <li>contact@buildingsolution.com</li>
                   <li>+1 (234) 567-890</li>
                 </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 xl:text-center">&copy; {new Date().getFullYear()} Building Solution. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;