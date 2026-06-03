import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TIMELINE_DATA = [
  {
    id: 1,
    year: '2023 →',
    title: 'B.Tech Computer Science',
    type: 'education',
    align: 'left',
    stamp: '',
    icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'
  },
  {
    id: 2,
    year: '2024',
    title: 'Softwisp-Atlas',
    type: 'work',
    align: 'right',
    stamp: 'CO-FOUNDER',
    image: '/softwisp.svg',
    imageClass: 'w-10 h-10'
  },
  {
    id: 3,
    year: '2024',
    title: 'Virtual Hand Controller',
    type: 'project',
    align: 'left',
    stamp: 'OPEN SOURCE',
    icon: ''
  },
  {
    id: 4,
    year: '2025',
    title: 'Eye-X launched',
    type: 'project',
    align: 'right',
    stamp: 'EDGE AI',
    image: '/eyex.svg',
    imageClass: 'w-16 h-16 -ml-2'
  },
  {
    id: 5,
    year: '2025',
    title: 'Nexora launched',
    type: 'project',
    align: 'left',
    stamp: 'DEPLOYED + OPEN SOURCE',
    image: '/nexora.svg',
    imageClass: 'w-32 h-10 -ml-2'
  },
  {
    id: 6,
    year: '2026',
    title: 'The story continues...',
    type: 'now',
    align: 'center',
    stamp: '',
    icon: ''
  }
];

export default function Chapter4Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !lineRef.current || !quillRef.current) return;

    // Line drawing animation
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        gsap.set(lineRef.current, { height: `${self.progress * 100}%` });
        gsap.set(quillRef.current, { top: `${self.progress * 100}%` });
      }
    });

    // Entries animation
    const entries = containerRef.current.querySelectorAll('.timeline-entry');
    entries.forEach((entry) => {
      const isLeft = entry.classList.contains('entry-left');
      const isRight = entry.classList.contains('entry-right');
      
      gsap.fromTo(entry,
        { 
          opacity: 0, 
          x: isLeft ? -60 : isRight ? 60 : 0,
          y: (!isLeft && !isRight) ? 30 : 0
        },
        {
          scrollTrigger: {
            trigger: entry,
            start: "top 70%",
          },
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-16 md:py-24 bg-transparent overflow-hidden">
      <div className="text-center mb-16 md:mb-24 relative z-10">
        <h2 className="text-4xl md:text-5xl playfair ink-bleed mb-4">The Journey</h2>
        <p className="special-elite text-ink-secondary">TIMELINE OF EVENTS</p>
      </div>

      <div className="relative max-w-4xl mx-auto min-h-[800px]">
        {/* Background dashed line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 border-l-2 border-dashed border-ink-faded opacity-30" />
        
        {/* Solid drawing line */}
        <div 
          ref={lineRef}
          className="absolute left-1/2 top-0 w-1 -translate-x-1/2 bg-ink-primary origin-top"
          style={{ height: '0%' }}
        />

        {/* Traveling Quill */}
        <div 
          ref={quillRef}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 z-20 transition-transform"
          style={{ top: '0%' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-sm -rotate-45">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
            <line x1="16" y1="8" x2="2" y2="22" />
            <line x1="17.5" y1="15" x2="9" y2="15" />
          </svg>
        </div>

        {/* Timeline Entries */}
        <div className="relative w-full py-12">
          {TIMELINE_DATA.map((item, index) => {
            const isLeft = item.align === 'left';
            const isRight = item.align === 'right';
            const isCenter = item.align === 'center';
            
            return (
              <div 
                key={item.id} 
                className={`timeline-entry relative flex items-center w-full mb-32 ${isLeft ? 'justify-start entry-left' : isRight ? 'justify-end entry-right' : 'justify-center entry-center'}`}
              >
                {!isCenter && (
                  <div className={`w-1/2 flex ${isLeft ? 'justify-end pr-4 md:pr-16' : 'justify-start pl-4 md:pl-16'}`}>
                    
                    {/* Connecting line (SVG) */}
                    <svg className={`absolute hidden md:block top-1/2 -translate-y-1/2 w-16 h-8 ${isLeft ? 'right-1/2' : 'left-1/2'}`} viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d={isLeft ? "M100 10 Q 50 20, 0 10" : "M0 10 Q 50 0, 100 10"} fill="none" stroke="var(--ink-faded)" strokeWidth="1.5" strokeDasharray="4 4" />
                    </svg>

                    {/* Entry Card */}
                    <div className={`relative bg-paper-base border border-ink-secondary p-3 md:p-4 max-w-[150px] sm:max-w-[200px] md:max-w-xs w-full shadow-sm transform ${isLeft ? 'rotate-1' : '-rotate-1'}`}>
                      <div className="special-elite text-ink-accent font-bold mb-2 text-lg">
                        {item.year}
                      </div>
                      
                      <div className="playfair text-xl font-bold text-ink-primary mb-2">
                        {item.title}
                      </div>

                      {item.icon && (
                        <svg className="w-8 h-8 text-ink-secondary mb-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d={item.icon} />
                        </svg>
                      )}

                      {item.image && (
                        <div className={`mb-3 opacity-60 ${item.imageClass || 'w-16 h-8'}`}>
                          <img 
                            src={item.image} 
                            alt={`${item.title} logo`} 
                            className="w-full h-full object-contain grayscale brightness-0 mix-blend-multiply" 
                          />
                        </div>
                      )}

                      {item.stamp && (
                        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full border-2 border-stamp-red flex items-center justify-center rotate-12 bg-paper-base shadow-sm">
                          <span className="special-elite text-[8px] text-stamp-red font-bold text-center leading-tight">
                            {item.stamp}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {isCenter && (
                  <div className="text-center mt-12">
                    <div className="special-elite text-ink-primary text-xl flex items-center justify-center gap-2">
                      {item.title} <span className="animate-pulse">█</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
