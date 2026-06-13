import React, { useEffect, useRef } from 'react';
import { CERTIFICATES } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Chapter4Certificates() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const cards = containerRef.current.querySelectorAll('.cert-card');
    
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
    <section id="certificates" className="relative w-full min-h-screen py-16 md:py-24 flex flex-col bg-[#8B5A2B]/5">
      <div className="text-center mb-10 md:mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl playfair ink-bleed mb-4">Credentials</h2>
        <p className="special-elite text-ink-secondary">CERTIFICATES & AWARDS</p>
      </div>

      <div ref={containerRef} className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 relative z-10 flex flex-wrap justify-center gap-6 md:gap-8 pb-20">
        {CERTIFICATES.map((cert) => (
          <a 
            href={cert.credentialUrl || '#'}
            target={cert.credentialUrl ? "_blank" : "_self"}
            rel="noreferrer"
            key={cert.id}
            className={`cert-card relative w-full sm:w-80 bg-paper-base border border-paper-edge p-5 flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300 group block ${cert.credentialUrl ? 'cursor-pointer' : 'cursor-default'}`}
          >
            {/* Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl z-20 transform -rotate-12 group-hover:rotate-12 transition-transform drop-shadow-sm">
              📌
            </div>

            {/* Paper fold effect */}
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-paper-shadow opacity-50" />
            
            {/* Logo Icon */}
            {cert.logo && (
              <div className="absolute top-4 right-4 opacity-40 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none w-12 h-12">
                <img src={cert.logo} alt={`${cert.issuer} logo`} className="w-full h-full object-contain grayscale brightness-0 mix-blend-multiply" />
              </div>
            )}
            
            <h3 className="special-elite text-ink-primary font-bold text-lg uppercase pr-12 mt-2 mb-2 leading-tight min-h-[3rem]">{cert.title}</h3>
            
            <div className="border-b-2 border-ink-primary w-full mb-4 opacity-30" />
            
            <div className="special-elite text-sm text-ink-secondary mb-1">
              Issuer: {cert.issuer}
            </div>
            <div className="special-elite text-sm text-ink-secondary mb-6">
              Date: {cert.date}
            </div>
            
            <div className="flex justify-between items-center border-t border-ink-faded pt-3 mt-auto">
              {cert.credentialUrl ? (
                <span className="special-elite text-xs text-ink-primary group-hover:text-ink-accent transition-colors underline decoration-wavy decoration-ink-faded underline-offset-4">
                  [VIEW CREDENTIAL]
                </span>
              ) : (
                <span className="special-elite text-xs text-ink-faded">
                  [CREDENTIAL PENDING]
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
