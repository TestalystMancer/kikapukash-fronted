import React, { useEffect, useRef, useState } from 'react';

const TestimonialsSection = () => {
  const scrollRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  
  const testimonials = [
    {
      id: 1,
      text: "KikapuKash has revolutionized how our community savings group operates. The transparency and ease of tracking has eliminated all the confusion we used to have.",
      author: "Jane Mwangi",
      position: "Group Leader, Nairobi",
      initials: "JM"
    },
    {
      id: 2,
      text: "I've been part of savings groups for years, but KikapuKash makes everything so much easier. I can see my contributions, track group progress, and request withdrawals all in one place.",
      author: "David Ochieng",
      position: "Group Member, Kisumu",
      initials: "DO"
    },
    {
      id: 3,
      text: "As a group administrator, KikapuKash has saved me countless hours of bookkeeping and made managing withdrawal requests much more organized. Highly recommended!",
      author: "Faith Kamau",
      position: "Group Admin, Mombasa",
      initials: "FK"
    }
  ];

  // Clone the testimonials for continuous scrolling effect
  const extendedTestimonials = [...testimonials, ...testimonials];
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !isAutoScrolling) return;
    
    let animationId;
    let scrollPosition = scrollContainer.scrollLeft;
    const scrollSpeed = 0.5; // Pixels per frame
    
    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled through the first set of testimonials
      const firstSetWidth = testimonials.length * (scrollContainer.children[0].offsetWidth + 24); // width + gap
      if (scrollPosition >= firstSetWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };
    
    // Start the animation
    animationId = requestAnimationFrame(scroll);
    
    // Pause animation on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
      setIsAutoScrolling(false);
    };
    
    const handleMouseLeave = () => {
      if (isAutoScrolling) {
        scrollPosition = scrollContainer.scrollLeft;
        animationId = requestAnimationFrame(scroll);
      }
    };
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer?.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [testimonials.length, isAutoScrolling]);

  const scrollLeft = () => {
    setIsAutoScrolling(false);
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const cardWidth = scrollContainer.querySelector('div[class*="flex-none"]').offsetWidth + 24; // width + gap
      scrollContainer.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    setIsAutoScrolling(false);
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const cardWidth = scrollContainer.querySelector('div[class*="flex-none"]').offsetWidth + 24; // width + gap
      scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const resumeAutoScroll = () => {
    setIsAutoScrolling(true);
  };

  return (
    <section id="testimonials" className="bg-white mx-4 sm:mx-6 md:mx-8 lg:mx-auto w-full rounded-xl shadow-md py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 sm:mb-12 lg:mb-16 text-green-600">
          What Our Users Say
        </h2>
        
        <div className="relative">
          {/* Left scroll button */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 -ml-4 hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Outer container with overflow handling */}
          <div 
            className="overflow-x-hidden pb-6" 
            ref={scrollRef}
            style={{ scrollBehavior: 'smooth' }}
          >
            {/* Inner container that forces single row */}
            <div className="flex flex-nowrap gap-6 min-w-min">
              {extendedTestimonials.map((testimonial, index) => (
                <div 
                  key={`${testimonial.id}-${index}`} 
                  className="bg-gray-100 p-6 rounded-lg relative hover:shadow-lg transition-shadow duration-300 flex-none w-full sm:w-80 md:w-96"
                >
                  <div className="absolute top-4 right-4 text-amber-800 opacity-20 text-4xl">
                    <i className="fas fa-quote-right"></i>
                  </div>
                  
                  <p className="mb-6 italic text-gray-700">{testimonial.text}</p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-500 flex justify-center items-center text-white font-bold mr-4">
                      {testimonial.initials}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-600 mb-1">{testimonial.author}</h4>
                      <p className="text-sm text-amber-700">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right scroll button */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 -mr-4 hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Auto-scroll resume button (only visible when auto-scroll is disabled) */}
          {!isAutoScrolling && (
            <button
              onClick={resumeAutoScroll}
              className="mt-4 text-green-600 hover:text-green-700 text-sm flex items-center mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Resume Auto-Scroll
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;