import React, { useState, useEffect, useRef } from 'react';
import { BuildingIcon } from './Icons';
import RequestCallbackModal from './RequestCallbackModal';

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void; className?: string; }> = ({ href, children, onClick, className }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick();
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);

      if (targetId === 'home' || !targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (history.pushState) {
          // Clean URL without adding encoded space
          history.pushState(null, "", window.location.pathname);
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
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className ?? "text-gray-300 hover:text-accent transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"}
    >
      {children}
    </a>
  );
};

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About Us' },
  { href: '#projects', label: 'Projects' },
  { href: '#team', label: 'Team' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#clients', label: 'Clients' },
  { href: '#contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const lastScrollY = useRef(0);
  
  // Ref for the button that triggers the modal to manage focus
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = 5; // Prevent flicker on minor scroll adjustments

      // Update scrolled state for styling (background, height)
      setIsScrolled(currentScrollY > 10);

      // Ignore minor scrolls to prevent UI flickering
      if (Math.abs(currentScrollY - lastScrollY.current) < threshold) {
        return;
      }
      
      // Determine visibility: always visible at top, otherwise show on scroll up, hide on scroll down
      if (currentScrollY <= 10) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY < lastScrollY.current);
      }

      // Update the last scroll position
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);
  
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (history.pushState) {
      history.pushState(null, "", window.location.pathname);
    }
  };
  
  const openCallbackModal = () => {
    setIsCallbackModalOpen(true);
    closeMenu();
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-md' : 'bg-transparent'} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
            <div className="flex items-center">
              <a href="#home" onClick={handleLogoClick} className="flex-shrink-0 flex items-center gap-2 text-white font-bold text-xl">
                <BuildingIcon className="h-8 w-8 text-accent" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Building Solution</span>
              </a>
            </div>
            <div className="hidden xl:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
                ))}
                <button
                  ref={triggerRef}
                  onClick={openCallbackModal}
                  className="ml-4 px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-white rounded-md text-sm font-bold transition-all duration-300"
                >
                  Request Callback
                </button>
              </div>
            </div>
            <div className="-mr-2 flex xl:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isOpen && (
          <div className="xl:hidden bg-gray-900/95 backdrop-blur-lg shadow-xl border-t border-gray-800 animate-fade-in" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                 <NavLink key={link.href} href={link.href} onClick={closeMenu} className="text-gray-300 hover:text-accent transition-colors duration-300 block px-3 py-2 rounded-md text-base font-medium">{link.label}</a>
              ))}
              <button
                onClick={openCallbackModal}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-bold text-accent border border-accent/30 hover:bg-accent hover:text-white transition-all duration-300 mt-4"
              >
                Request Callback
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