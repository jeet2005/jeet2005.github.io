import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { JEET } from '../data/portfolio';

export default function Chapter0Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const { isLoading } = usePortfolioStore();

  const hasRun = useRef(false);

  useEffect(() => {
    if (isLoading || !nameRef.current || !subtitleRef.current || hasRun.current) return;
    hasRun.current = true;

    // Split name into letters
    const letters = nameRef.current.innerText.split('');
    nameRef.current.innerHTML = '';
    
    letters.forEach(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'inline-block opacity-0 translate-y-8';
      nameRef.current?.appendChild(span);
    });

    const tl = gsap.timeline({ delay: 0.5 }); // Wait for loading screen to close

    // 1200ms: CHAPTER FINAL label fades in
    tl.to('.chapter-label', { opacity: 1, duration: 1, ease: 'power2.out' }, 0.5);

    // 1600ms: Name letters drop in
    tl.to(nameRef.current.children, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.08,
      ease: 'back.out(1.7)'
    }, 0.9);

    // 2600ms: Subtitle typewriter
    const subtitleText = JEET.subtitle;
    subtitleRef.current.innerText = '';
    
    tl.add(() => {
      let i = 0;
      let timeoutId: any;
      const typeChar = () => {
        if (i < subtitleText.length) {
          const char = subtitleText.charAt(i);
          subtitleRef.current!.innerHTML += char === ' ' ? '&nbsp;' : char;
          i++;
          const jitter = 5 + Math.random() * 35;
          timeoutId = setTimeout(typeChar, 60 + jitter);
        } else {
          // Blinking cursor
          const cursor = document.createElement('span');
          cursor.innerText = '█';
          cursor.className = 'animate-pulse ml-1';
          subtitleRef.current?.appendChild(cursor);
          
          setTimeout(() => {
            if (cursor && cursor.parentNode) cursor.remove();
          }, 3000);
        }
      };
      typeChar();
    }, 1.9);

    // 3800ms: Scroll prompt
    tl.to('.scroll-prompt', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 3.1);

  }, [isLoading]);

  return (
    <section id="home" ref={containerRef} className="relative w-full min-h-[100svh] flex flex-col items-center justify-center pt-20 pb-32">
      {/* Background Watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-[0.03] z-[-1] flex flex-wrap content-start">
        {Array.from({ length: 150 }).map((_, i) => (
          <span key={i} className="text-xl playfair whitespace-nowrap mr-8 mb-4">
            {JEET.subtitle}
          </span>
        ))}
      </div>

      <div className="flex flex-col items-center z-10 text-center max-w-4xl px-4">
        <span className="chapter-label opacity-0 special-elite tracking-widest text-sm mb-8 border-b border-ink-faded pb-2">
          THE ONGOING STORY OF
        </span>
        
        <h1 
          ref={nameRef}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-[120px] playfair ink-bleed uppercase mb-8 font-bold tracking-tight"
        >
          {JEET.name}
        </h1>
        
        <div className="h-12 flex items-center justify-center mb-8">
          <p ref={subtitleRef} className="special-elite text-lg md:text-xl text-ink-secondary"></p>
        </div>

      </div>

      <div className="scroll-prompt opacity-0 translate-y-4 absolute bottom-12 flex flex-col items-center gap-2 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 animate-bounce text-ink-secondary">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
        <span className="special-elite text-xs uppercase tracking-widest text-ink-faded">Turn the page</span>
      </div>
    </section>
  );
}
