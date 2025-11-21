
import React, { useState, useEffect, useRef } from 'react';
import { QuoteIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

const testimonialsData = [
  {
    quote: "Building Solution's transparency with material pricing is a game-changer in Dhaka. They delivered 500 bags of Shah Cement to our Mirpur site within 24 hours. Highly recommended!",
    client: "Engr. Anisur Rahman",
    project: "MD, Urban Heights Ltd."
  },
  {
    quote: "I was worried about managing construction from abroad. Fahad and his team handled everything for my house in Bashundhara—from rod supply to finding skilled masons. Trustworthy service.",
    client: "Mrs. Nasreen Akter",
    project: "Homeowner, Bashundhara R/A"
  },
  {
    quote: "The quality of Sylhet sand and stone chips supplied for our factory in Gazipur was top-notch. No adulteration, full measurement, and professional billing.",
    client: "Mr. Shafiqul Islam",
    project: "Project Director, Apex Textiles"
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  
  const startTimeout = () => {
     timeoutRef.current = window.setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
        ),
      5000 // Change slide every 5 seconds
    );
  }

  useEffect(() => {
    resetTimeout();
    startTimeout();

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);
  
  const handleMouseEnter = () => resetTimeout();
  const handleMouseLeave = () => startTimeout();


  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  
  const goToPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonialsData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = () => {
    const isLastSlide = currentIndex === testimonialsData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };


  return (
    <section 
      id="testimonials" 
      className="py-20 md:py-28 bg-gray-800"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">What Our Clients Say</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Building trust across Dhaka with every bag of cement and every rod of steel.
          </p>
        </div>
        <div 
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="mt-12 max-w-3xl mx-auto relative group"
        >
          <div 
            className="relative h-80 md:h-72 overflow-hidden"
            aria-live="polite" // Announce slide changes to screen readers
          >
            {testimonialsData.map((testimonial, index) => (
              <div
                key={index}
                id={`testimonial-panel-${index}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden={index !== currentIndex} // Hide non-visible slides from screen readers
              >
                <div className="bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col h-full text-center">
                  <QuoteIcon className="h-8 w-8 text-accent mx-auto mb-4" />
                  <p className="text-gray-400 flex-grow italic">"{testimonial.quote}"</p>
                  <div className="mt-6">
                    <p className="font-bold text-white text-lg">{testimonial.client}</p>
                    <p className="text-sm text-gray-500">{testimonial.project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button onClick={goToPrev} aria-label="Previous testimonial" className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button onClick={goToNext} aria-label="Next testimonial" className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonialsData.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial from ${testimonial.client}`}
                aria-controls={`testimonial-panel-${index}`}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentIndex === index ? 'bg-accent' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
