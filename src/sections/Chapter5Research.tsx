import React, { useEffect, useRef } from 'react';
import { RESEARCH_POSTERS } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Chapter5Research() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const posters = containerRef.current.querySelectorAll('.research-poster');
    
    posters.forEach((poster, i) => {
      gsap.fromTo(poster, 
        { 
          opacity: 0, 
          y: 100,
          scale: 0.95
        },
        { 
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: poster,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  return (
    <section id="research" className="relative w-full min-h-screen py-16 md:py-32 flex flex-col bg-paper-base overflow-hidden">
      {/* Background texture / styling */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_center,_var(--ink-primary)_1px,_transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="text-center mb-16 md:mb-24 relative z-10">
        <h2 className="text-4xl md:text-6xl playfair ink-bleed mb-4">Research Lab</h2>
        <p className="special-elite text-ink-secondary tracking-widest uppercase">ACADEMIC POSTERS & PUBLICATIONS</p>
        <div className="w-24 h-1 bg-ink-primary mx-auto mt-8 opacity-20"></div>
      </div>

      <div ref={containerRef} className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col gap-24 md:gap-32 pb-20">
        {RESEARCH_POSTERS.map((poster, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={poster.id}
              className={`research-poster flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-16 items-center`}
            >
              {/* Poster Image / Placeholder */}
              <div className="w-full lg:w-1/2 relative group perspective-1000">
                <a 
                  href={poster.fileUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block relative transform transition-transform duration-700 hover:rotate-y-2 hover:scale-[1.02] shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white border border-paper-edge p-2 md:p-4"
                >
                  <div className="absolute -inset-4 border border-ink-faded opacity-30 pointer-events-none transform -rotate-1"></div>
                  
                  {/* Decorative corner tapes */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-paper-shadow opacity-50 rotate-45 z-10"></div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-paper-shadow opacity-50 -rotate-45 z-10"></div>
                  
                  {poster.previewImage ? (
                    <div className="w-full aspect-[3/4] md:aspect-[4/3] bg-ink-primary/5 flex items-center justify-center overflow-hidden relative">
                      <img 
                        src={poster.previewImage} 
                        alt={poster.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const fallback = document.createElement('div');
                            fallback.className = 'text-center p-6 absolute inset-0 flex flex-col items-center justify-center';
                            fallback.innerHTML = '<span class="playfair text-2xl md:text-4xl opacity-20 text-ink-primary block mb-4">POSTER PREVIEW</span><span class="special-elite text-sm text-ink-secondary">Click to view full PDF</span>';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/3] bg-ink-primary/5 flex items-center justify-center">
                      <span className="special-elite text-ink-secondary">Poster visual</span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 right-4 bg-ink-primary text-paper-base px-4 py-2 special-elite text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    VIEW PDF →
                  </div>
                </a>
              </div>

              {/* Poster Details */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="special-elite text-ink-accent mb-4 text-sm border-l-2 border-ink-accent pl-3">
                  PUBLISHED {poster.year}
                </div>
                
                <h3 className="playfair text-2xl md:text-4xl font-bold text-ink-primary mb-6 leading-tight">
                  {poster.title}
                </h3>
                
                <div className="font-sans text-base md:text-lg leading-relaxed text-ink-secondary mb-8 text-justify">
                  {poster.description}
                </div>
                
                <a 
                  href={poster.fileUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border border-ink-primary px-6 py-3 special-elite hover:bg-ink-primary hover:text-paper-base transition-colors self-start"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  DOWNLOAD POSTER (PDF)
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
