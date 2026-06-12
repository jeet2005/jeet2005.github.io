import React, { useRef, useEffect } from 'react';
import { JEET } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Chapter7Contact() {
  const telegramRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!telegramRef.current) return;
    
    // Typewriter effect on telegram block
    const lines = telegramRef.current.querySelectorAll('.telegram-line');
    
    ScrollTrigger.create({
      trigger: telegramRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(lines, 
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.1, stagger: 0.2, ease: "steps(1)" }
        );
      },
      once: true
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen py-16 md:py-32 flex flex-col items-center justify-center bg-transparent">
      {/* Heavy Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.95)] mix-blend-multiply z-10" />
      
      {/* Repeated THE END background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-[0.03] z-[-1] flex flex-wrap content-start -rotate-12 scale-150">
        {Array.from({ length: 200 }).map((_, i) => (
          <span key={i} className="text-xl playfair whitespace-nowrap mr-12 mb-8 uppercase font-bold text-ink-primary">
            THE END
          </span>
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center max-w-2xl w-full px-6 text-center">
        
        <span className="special-elite tracking-widest text-xs mb-8 border-b border-ink-faded pb-2 text-ink-faded">
          COLOPHON — HOW TO REACH THE AUTHOR
        </span>
        
        {/* Ornamental Divider */}
        <svg className="w-32 h-8 text-ink-primary mb-8" viewBox="0 0 100 20" fill="none" stroke="currentColor">
          <path d="M50 2 C 20 2, 20 18, 50 18 C 80 18, 80 2, 50 2 Z" strokeWidth="1" />
          <path d="M0 10 L40 10 M60 10 L100 10" strokeWidth="1" />
          <circle cx="50" cy="10" r="4" fill="currentColor" />
        </svg>

        <h2 className="text-4xl sm:text-5xl md:text-6xl playfair ink-bleed mb-6">
          Let's write the<br/>next chapter.
        </h2>
        
        <p className="font-serif italic text-lg md:text-xl text-ink-faded mb-12 max-w-lg leading-relaxed">
          Every great story needs collaborators. If you're building 
          something intelligent, something that matters — 
          Jeet would like to hear about it.
        </p>
        
        {/* Telegram Block */}
        <div 
          ref={telegramRef}
          className="bg-paper-base border border-ink-secondary text-ink-primary p-6 text-left mb-16 shadow-md transform -rotate-1 relative"
        >
          {/* Vintage tape top center */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-paper-shadow opacity-60 transform rotate-2 border border-ink-faded" style={{ mixBlendMode: 'multiply' }} />

          <div className="special-elite text-sm telegram-line opacity-0 mb-3 border-b border-ink-faded pb-1 border-dashed flex items-center">
            <span className="w-16 inline-block">TO:</span>
            <a href="https://github.com/jeet2005" target="_blank" rel="noreferrer" className="hover:text-ink-accent transition-colors hover:underline decoration-wavy underline-offset-4">jeet2005@github</a>
          </div>
          <div className="special-elite text-sm telegram-line opacity-0 mb-3 border-b border-ink-faded pb-1 border-dashed flex items-center">
            <span className="w-16 inline-block">VIA:</span>
            <a href="https://linkedin.com/in/jeet-patel-903772257" target="_blank" rel="noreferrer" className="hover:text-ink-accent transition-colors hover:underline decoration-wavy underline-offset-4">linkedin.com/in/jeet-patel-903772257</a>
          </div>
          <div className="special-elite text-sm telegram-line opacity-0 mb-3 border-b border-ink-faded pb-1 border-dashed flex items-center">
            <span className="w-16 inline-block">WIRE:</span>
            <a href="https://instagram.com/sjeet1908" target="_blank" rel="noreferrer" className="hover:text-ink-accent transition-colors hover:underline decoration-wavy underline-offset-4">instagram @sjeet1908</a>
          </div>
          <div className="special-elite text-sm telegram-line opacity-0 flex items-center">
            <span className="w-16 inline-block">WIRE:</span>
            <a href="https://github.com/jeet2005" target="_blank" rel="noreferrer" className="hover:text-ink-accent transition-colors hover:underline decoration-wavy underline-offset-4">github.com/jeet2005</a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 mb-24">
          <a 
            href="mailto:jeetsavaliya1908@gmail.com"
            className="group relative inline-block border-2 border-ink-primary bg-paper-base px-8 py-4 shadow-[4px_4px_0_var(--ink-primary)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#8B1A1A] text-paper-base flex items-center justify-center rotate-12 shadow-sm text-xs font-serif italic border border-[#5E1010]">
              J
            </div>
            <span className="special-elite text-sm sm:text-base md:text-xl text-ink-primary tracking-wider break-all">
              jeetsavaliya1908@gmail.com
            </span>
          </a>
          
          <div className="special-elite text-xs tracking-widest text-ink-secondary">
            [ SEND A MESSAGE ]
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-2 mt-auto">
          <p className="special-elite text-[10px] text-ink-faded uppercase">Designed & Developed by {JEET.name} · {JEET.location.split(',')[0]} · 2025–2026</p>
          <p className="special-elite text-[10px] text-ink-faded uppercase">This portfolio was built with React, Three.js, and unreasonable ambition.</p>
          <p className="special-elite text-[10px] text-ink-faded uppercase">ORCID: {JEET.orcid}</p>
          <div className="text-ink-faded text-xs mt-4 tracking-[0.5em]">✦ ✦ ✦</div>
        </div>
      </div>
    </section>
  );
}
