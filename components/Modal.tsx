
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLElement>;
  ariaLabelledById: string;
  ariaDescribedById: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, triggerRef, ariaLabelledById, ariaDescribedById }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isMounted) {
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const onTransitionEnd = () => {
    if (!isVisible) {
      setIsMounted(false);
      onClose();
    }
  };

  useEffect(() => {
    if (!isMounted || !modalRef.current) return;

    const modalElement = modalRef.current;
    const focusableElements = modalElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
      
      if (event.key === 'Tab') {
        if (focusableElements.length <= 1) {
          event.preventDefault();
          return;
        }
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            event.preventDefault();
          }
        }
      }
    };
    
    // Focus the first element or the modal itself for accessibility
    const timer = setTimeout(() => {
      firstElement?.focus();
    }, 100);

    // Prevent scrolling on body and avoid layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      window.removeEventListener('keydown', handleKeyDown);
      // Return focus to trigger button when modal closes
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    };
  }, [isMounted, handleClose, triggerRef]);

  if (!isMounted) return null;

  const modalContent = (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledById}
      aria-describedby={ariaDescribedById}
      className={`fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto p-4 sm:p-8 bg-black transition-opacity duration-300 ease-in-out ${isVisible ? 'bg-opacity-80' : 'bg-opacity-0'}`}
      onClick={handleClose}
      onTransitionEnd={onTransitionEnd}
    >
      <div
        className={`bg-gray-800 rounded-lg shadow-xl relative max-w-5xl w-full mx-auto overflow-hidden transition-opacity duration-300 ease-in-out flex flex-col ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        {children}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 p-1.5 text-gray-300 hover:text-white rounded-full bg-black/30 hover:bg-black/50 transition-colors z-20"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );

  // Use React Portal to render modal outside of the parent DOM hierarchy
  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
