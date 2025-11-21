
import React, { useState, useEffect, useRef } from 'react';
import { BuildingIcon } from './Icons';
import RequestCallbackModal from './RequestCallbackModal';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (e: React.MouseEvent, page: string, sectionId?: string) => {
    e.preventDefault();
    onNavigate(page);
    closeMenu();
    
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isMaterialsActive = currentPage === 'materials' || currentPage === 'material-detail';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-md' : 'bg-gray-900/80 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
            <div className="flex items-center">
              <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="flex-shrink-0 flex items-center gap-2 text-white font-bold text-xl">
                <BuildingIcon className="h-8 w-8 text-accent" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Building Solution</span>
              </a>
            </div>
            <div className="hidden xl:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button onClick={(e) => handleNavClick(e, 'home')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-accent' : 'text-gray-300 hover:text-white'}`}>Home</button>
                <button onClick={(e) => handleNavClick(e, 'materials')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isMaterialsActive ? 'text-accent' : 'text-gray-300 hover:text-white'}`}>Materials Catalog</button>
                <button onClick={(e) => handleNavClick(e, 'checklist')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'checklist' ? 'text-accent' : 'text-gray-300 hover:text-white'}`}>Building Checklist</button>
                <button onClick={(e) => handleNavClick(e, 'gallery')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'gallery' ? 'text-accent' : 'text-gray-300 hover:text-white'}`}>Gallery</button>
                <button onClick={(e) => handleNavClick(e, 'home', 'about')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About Us</button>
                
                <button
                  ref={triggerRef}
                  onClick={() => setIsCallbackModalOpen(true)}
                  className="ml-4 px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-white rounded-md text-sm font-bold transition-all duration-300"
                >
                  Request Quote
                </button>
              </div>
            </div>
            <div className="-mr-2 flex xl:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                <span className="sr-only">Open menu</span>
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="xl:hidden bg-gray-900 shadow-xl border-t border-gray-800 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={(e) => handleNavClick(e, 'home')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Home</button>
              <button onClick={(e) => handleNavClick(e, 'materials')} className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 ${isMaterialsActive ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white'}`}>Materials Catalog</button>
              <button onClick={(e) => handleNavClick(e, 'checklist')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Building Checklist</button>
              <button onClick={(e) => handleNavClick(e, 'gallery')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Gallery</button>
              <button
                onClick={() => { setIsCallbackModalOpen(true); closeMenu(); }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-bold text-accent border border-accent/30 hover:bg-accent hover:text-white mt-4"
              >
                Request Quote
              </button>
            </div>
          </div>
        )}
      </header>
      <RequestCallbackModal 
        isOpen={isCallbackModalOpen} 
        onClose={() => setIsCallbackModalOpen(false)} 
        triggerRef={triggerRef}
      />
    </>
  );
};

export default Header;
