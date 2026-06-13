import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JEET } from '../data/portfolio';
import { FlutterIcon, PythonIcon } from '../components/canvas/MiniIcons';
import LiveStats from '../components/ui/LiveStats';

export default function Chapter1About() {
  const containerRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<SVGSVGElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !portraitRef.current || !stampRef.current || !textRef.current) return;

    // Portrait SVG Draw Animation
    const paths = portraitRef.current.querySelectorAll('path, circle, rect');
    paths.forEach(p => {
      const length = (p as SVGGeometryElement).getTotalLength();
      gsap.set(p, { strokeDasharray: length, strokeDashoffset: length });
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%",
      onEnter: () => {
        // Draw portrait
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.1
        });
        
        // Stamp animation
        gsap.fromTo(stampRef.current, 
          { scale: 2, opacity: 0, rotation: 15 },
          { scale: 1, opacity: 1, rotation: -8, duration: 0.5, ease: "back.out(2)", delay: 1 }
        );
      },
      once: true
    });

    // Text Reveal Animation - Just fade the paragraphs in so HTML isn't destroyed
    const paragraphs = textRef.current.querySelectorAll('p');
    gsap.fromTo(paragraphs, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
        }
      }
    );

  }, []);

  return (
    <section id="about" ref={containerRef} className="relative w-full min-h-screen py-16 md:py-24 -rotate-[0.5deg]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 px-4 md:px-6">
        
        {/* LEFT PAGE */}
        <div className="relative flex flex-col items-center">
          {/* Portrait Image */}
          <div className="relative w-64 h-80 mb-8 border-4 border-paper-base shadow-lg rotate-2 group">
            <img 
              src="/portrait.png" 
              alt="Jeet Patel" 
              className="w-full h-full object-cover transition-all duration-700 filter contrast-125 sepia-[0.3]"
              style={{ mixBlendMode: 'multiply' }}
              onError={(e) => {
                // Fallback to placeholder if missing
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Vintage overlay texture */}
            <div className="absolute inset-0 bg-ink-primary opacity-10 pointer-events-none mix-blend-overlay"></div>
            
            {/* Corner tape */}
            <div className="absolute -top-3 -left-3 w-12 h-4 bg-paper-shadow opacity-60 -rotate-45" style={{ mixBlendMode: 'multiply' }} />
            <div className="absolute -bottom-3 -right-3 w-12 h-4 bg-paper-shadow opacity-60 -rotate-45" style={{ mixBlendMode: 'multiply' }} />
          </div>

          {/* Stamp */}
          <div ref={stampRef} className="opacity-0 absolute top-64 right-12 w-24 h-24 rounded-full border-4 border-stamp-red text-stamp-red flex items-center justify-center -rotate-8 z-20">
            <div className="w-[88px] h-[88px] rounded-full border-2 border-stamp-red flex items-center justify-center text-center p-2">
              <span className="special-elite text-xs leading-tight font-bold tracking-tighter">AHMEDABAD<br/>INDIA 🇮🇳</span>
            </div>
          </div>

          {/* Stats */}
          <div className="special-elite text-sm tracking-widest text-ink-secondary text-center space-y-2 mb-4">
            <p>AGE: 20 YRS | STATUS: ARCHITECTING SYSTEMS</p>
            <p>LOCATION: GUJARAT</p>
          </div>

          <LiveStats />

          {/* ORCID Badge */}
          <div className="mt-4 bg-paper-base border border-ink-faded p-3 rounded shadow-sm flex flex-col">
            <span className="special-elite text-[10px] text-ink-faded mb-1 uppercase">Library Catalog / ORCID</span>
            <span className="special-elite text-sm font-bold text-ink-primary">{JEET.orcid}</span>
          </div>
        </div>

        {/* RIGHT PAGE */}
        <div className="relative flex flex-col justify-center">
          <div ref={textRef} className="prose-lg max-w-lg relative z-10">
            <p className="text-2xl leading-relaxed mb-6 italic">
              <span className="float-left text-7xl playfair font-bold mt-2 mr-3 border border-ink-secondary p-2 bg-paper-base shadow-sm">I</span>
              n the bustling city of Ahmedabad — where heritage walls meet relentless startup energy — 
              there is a student who refuses to build ordinary things. Jeet Patel is not just 
              studying artificial intelligence and mobile craftsmanship; he is actively engineering 
              the future from his dorm room.
            </p>
            <p className="text-2xl leading-relaxed italic">
              Driven by an insatiable ambition, he builds systems that think, apps that adapt, 
              and platforms that predict. While others read about the next big thing, Jeet is 
              already writing its source code, proving that real innovation doesn't wait for a degree.
            </p>
          </div>

          {/* Margin Annotations */}
          <div className="absolute top-12 -right-16 transform rotate-6 hidden lg:block pointer-events-none">
            <span className="special-elite text-ink-faded text-sm block mb-1">→ see Nexora</span>
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="var(--ink-faded)">
              <path d="M2 10 Q 20 2, 38 10 L 30 5 M 38 10 L 32 16" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="absolute bottom-32 -left-16 transform -rotate-3 hidden lg:block pointer-events-none">
            <span className="special-elite text-ink-accent text-sm block">remarkable!</span>
            <svg width="80" height="10" viewBox="0 0 80 10" fill="none" stroke="var(--ink-accent)">
              <path d="M0 5 Q 10 0, 20 5 T 40 5 T 60 5 T 80 5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Page Number */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 special-elite text-ink-faded">
            · 1908-2005 ·
          </div>
        </div>

      </div>
    </section>
  );
}
