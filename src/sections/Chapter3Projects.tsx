import React, { useEffect, useRef } from 'react';
import { PROJECTS } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Chapter3Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const cards = containerRef.current.querySelectorAll('.project-card');
    
    cards.forEach((card, i) => {
      gsap.fromTo(card, 
        { 
          opacity: 0, 
          y: 50,
          rotation: (Math.random() - 0.5) * 10
        },
        { 
          opacity: 1,
          y: 0,
          rotation: (Math.random() - 0.5) * 6,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          delay: (i % 3) * 0.1
        }
      );
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen py-16 md:py-24 flex flex-col bg-[#8B5A2B]/10">
      <div className="text-center mb-10 md:mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl playfair ink-bleed mb-4">The Chronicles</h2>
        <p className="special-elite text-ink-secondary">CASE FILES & MANUSCRIPTS</p>
      </div>

      <div ref={containerRef} className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 relative z-10 flex flex-wrap justify-center gap-6 md:gap-8 pb-20">
        {PROJECTS.map((project, i) => (
          <a 
            href={project.links.live || project.links.github}
            target="_blank" 
            rel="noreferrer"
            key={project.id}
            className="project-card relative w-full sm:w-80 bg-paper-base border border-paper-edge p-5 flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300 group block cursor-pointer"
          >
            {/* Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl z-20 transform -rotate-12 group-hover:rotate-12 transition-transform drop-shadow-sm">
              📌
            </div>

            {/* Paper fold effect pseudo-element is tricky in inline styles, we simulate it with a border box */}
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-paper-shadow opacity-50" />
            
            {/* Logo Icon */}
            {project.icon && (
              <div className={`absolute top-4 right-4 opacity-40 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none ${project.iconClass || 'w-12 h-12'}`}>
                <img src={project.icon} alt={`${project.title} logo`} className="w-full h-full object-contain grayscale brightness-0 mix-blend-multiply" />
              </div>
            )}
            
            <h3 className="special-elite text-ink-primary font-bold text-lg uppercase truncate pr-12 mt-2 mb-2">{project.title}</h3>
            
            <div className="border-b-2 border-ink-primary w-full mb-3 opacity-30" />
            
            <div className="special-elite text-xs text-ink-secondary mb-1">
              Class: {project.classification}
            </div>
            <div className="special-elite text-xs text-ink-secondary mb-4 flex items-center">
              Status: <span className={`w-2 h-2 mx-2 rounded-full ${project.status === 'LIVE' ? 'bg-green-600 animate-pulse' : 'bg-ink-secondary'}`}></span>
              <span>{project.status}</span>
            </div>
            
            <p className="font-serif italic text-base text-ink-primary mb-3">
              "{project.tagline}"
            </p>
            
            <p className="font-sans text-sm leading-relaxed text-ink-secondary mb-6 flex-1">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto mb-6">
              {project.stack.slice(0, 4).map((tech: string) => (
                <span key={tech} className="special-elite text-[10px] border border-ink-faded px-2 py-1 rounded-sm bg-paper-shadow/30">
                  {tech}
                </span>
              ))}
              {project.stack.length > 4 && <span className="special-elite text-[10px] text-ink-faded self-center">+{project.stack.length - 4}</span>}
            </div>
            
            <div className="flex justify-between items-center border-t border-ink-faded pt-3 mt-auto">
              {project.links.live ? (
                <span className="special-elite text-xs text-ink-primary group-hover:text-ink-accent transition-colors underline decoration-wavy decoration-ink-faded underline-offset-4">
                  [VIEW PROJECT]
                </span>
              ) : (
                <span className="special-elite text-xs text-ink-primary group-hover:text-ink-accent transition-colors underline decoration-wavy decoration-ink-faded underline-offset-4">
                  [GITHUB]
                </span>
              )}
              {project.stars > 0 && (
                <span className="special-elite text-xs text-ink-secondary">⭐ {project.stars}</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
