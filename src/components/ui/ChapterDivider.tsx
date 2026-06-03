import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ChapterDividerProps {
  chapterNumber: number;
}

export default function ChapterDivider({ chapterNumber }: ChapterDividerProps) {
  const pathRef = useRef<SVGPathElement>(null);

  // Generate a random torn paper path
  const generateTornEdge = (width: number, points = 25) => {
    const step = width / points;
    let d = `M 0 40`;
    for (let i = 0; i <= points; i++) {
      const x = i * step;
      const y = 40 + (Math.random() - 0.5) * 30;
      d += ` L ${x} ${y}`;
    }
    d += ` L ${width} 80 L 0 80 Z`;
    return d;
  };

  useEffect(() => {
    if (!pathRef.current) return;
    
    // Animate the path drawing on scroll
    const path = pathRef.current;
    const length = path.getTotalLength();
    
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    
    ScrollTrigger.create({
      trigger: path,
      start: "top 80%",
      onEnter: () => {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out"
        });
      },
      once: true
    });
  }, []);

  // Use a fixed width for the SVG generation to avoid window resize issues during SSR
  const pathData = typeof window !== 'undefined' ? generateTornEdge(window.innerWidth, 30) : '';

  return (
    <div className="relative w-full h-20 overflow-hidden flex items-center justify-center my-12">
      <svg 
        className="absolute inset-0 w-full h-full text-paper-edge" 
        preserveAspectRatio="none"
      >
        <path 
          ref={pathRef}
          d={pathData} 
          fill="var(--paper-shadow)" 
          stroke="var(--ink-secondary)" 
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>
      <div className="z-10 bg-paper-base px-6 py-2 border border-ink-secondary transform -rotate-2 rounded shadow-sm">
        <span className="special-elite text-ink-primary tracking-widest text-sm">
          ✦ CHAPTER {chapterNumber} ✦
        </span>
      </div>
    </div>
  );
}
