import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { SplitText } from 'gsap/SplitText'; // Requires Club GreenSock, will mock if needed

import { usePortfolioStore } from './store/usePortfolioStore';
import GlobalCanvas from './components/canvas/GlobalCanvas';
import QuillCursor from './components/cursor/QuillCursor';
import ChapterDivider from './components/ui/ChapterDivider';
import LoadingScreen from './components/ui/LoadingScreen';
import Chapter0Hero from './sections/Chapter0Hero';
import Chapter1About from './sections/Chapter1About';
import Chapter2Skills from './sections/Chapter2Skills';
import Chapter3Projects from './sections/Chapter3Projects';
import Chapter4Timeline from './sections/Chapter4Timeline';
import Chapter5Contact from './sections/Chapter5Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { isLoading, setIsLoading } = usePortfolioStore();

  useEffect(() => {
    // 1. Init Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease out
      smoothWheel: true,
    });

    // 2. Connect Lenis → GSAP ticker
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Mock loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [setIsLoading]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-ink-primary">
      <GlobalCanvas />
      <QuillCursor />
      
      <LoadingScreen />
      
      {!isLoading && (
        <div className="relative z-10 w-full">
          <Chapter0Hero />
          
          <ChapterDivider chapterNumber={1} />
          
          <Chapter1About />

          <ChapterDivider chapterNumber={2} />
          
          <Chapter2Skills />

          <ChapterDivider chapterNumber={3} />
          
          <Chapter3Projects />

          <ChapterDivider chapterNumber={4} />
          
          <Chapter4Timeline />

          <ChapterDivider chapterNumber={5} />
          
          <Chapter5Contact />
        </div>
      )}
    </div>
  );
}
