import React, { useEffect, useRef, useState } from 'react';

export default function QuillCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  
  const [dots, setDots] = useState<{ x: number, y: number, id: number }[]>([]);
  let dotId = 0;

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Randomly drop ink dots
      if (Math.random() > 0.9) {
        dotId++;
        setDots(prev => {
          const newDots = [...prev, { x: mouseX, y: mouseY, id: dotId }];
          if (newDots.length > 12) newDots.shift();
          return newDots;
        });
      }
    };
    
    const updateCursor = () => {
      // Lerp for smooth trailing effect
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }
      
      requestAnimationFrame(updateCursor);
    };
    
    window.addEventListener('mousemove', onMouseMove);
    const rafId = requestAnimationFrame(updateCursor);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Ink Trail Dots */}
      <div ref={trailRef} className="fixed inset-0 pointer-events-none z-[100]">
        {dots.map(dot => (
          <div 
            key={dot.id}
            className="absolute bg-ink-primary rounded-full animate-pulse-fade"
            style={{
              left: dot.x,
              top: dot.y,
              width: 3 + Math.random() * 4 + 'px',
              height: 3 + Math.random() * 4 + 'px',
              opacity: 0.6,
              transform: 'translate(-50%, -50%)',
              transition: 'opacity 0.8s ease-out'
            }}
          />
        ))}
      </div>

      {/* Main Cursor (Feather SVG) */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 pointer-events-none z-[101] w-8 h-8"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="var(--ink-primary)" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="w-full h-full drop-shadow-md origin-bottom-left transition-transform duration-200"
        >
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
          <line x1="16" y1="8" x2="2" y2="22"></line>
          <line x1="17.5" y1="15" x2="9" y2="15"></line>
        </svg>
      </div>
    </>
  );
}
