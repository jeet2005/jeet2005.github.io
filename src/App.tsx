import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { usePortfolioStore } from './store/usePortfolioStore';
import { audioManager } from './store/AudioManager';
import GlobalCanvas from './components/canvas/GlobalCanvas';
import QuillCursor from './components/cursor/QuillCursor';
import ChapterDivider from './components/ui/ChapterDivider';
import LoadingScreen from './components/ui/LoadingScreen';
import TerminalOverlay from './components/ui/TerminalOverlay';
import TerminalButton from './components/ui/TerminalButton';
import ResumeButton from './components/ui/ResumeButton';
import AudioToggle from './components/ui/AudioToggle';
import Chapter0Hero from './sections/Chapter0Hero';
import Chapter1About from './sections/Chapter1About';
import Chapter2Skills from './sections/Chapter2Skills';
import Chapter3Projects from './sections/Chapter3Projects';
import Chapter4Certificates from './sections/Chapter4Certificates';
import Chapter5Research from './sections/Chapter5Research';
import Chapter6Timeline from './sections/Chapter6Timeline';
import Chapter7Contact from './sections/Chapter7Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { isLoading, setIsLoading, setIsTerminalOpen } = usePortfolioStore();

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
      audioManager.init();
      // Need a global interaction listener to start ambient sound due to browser autoplay policies
      const startAudio = () => {
        audioManager.startAmbient();
        window.removeEventListener('click', startAudio);
      };
      window.addEventListener('click', startAudio);
    }, 2000);

    // Global Hover Sound Listener
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        audioManager.playHover();
      }
    };
    window.addEventListener('mouseover', handleMouseOver);

    // Scroll Boundary logic
    const handleScroll = (e: any) => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Global Terminal Hotkey Listener
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + \ or Backtick
      if ((e.ctrlKey && e.key === '\\') || e.key === '`') {
        e.preventDefault();
        const state = usePortfolioStore.getState();
        state.setIsTerminalOpen(!state.isTerminalOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsLoading, setIsTerminalOpen]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-ink-primary">
      <GlobalCanvas />
      <QuillCursor />
      
      <LoadingScreen />
      <TerminalOverlay />
      
      {!isLoading && (
        <>
          <TerminalButton />
          <ResumeButton />
          <AudioToggle />
          <div className="relative z-10 w-full">
          <Chapter0Hero />
          
          <ChapterDivider chapterNumber={1} />
          
          <Chapter1About />

          <ChapterDivider chapterNumber={2} />
          
          <Chapter2Skills />

          <ChapterDivider chapterNumber={3} />
          
          <Chapter3Projects />

          <ChapterDivider chapterNumber={4} />
          
          <Chapter4Certificates />

          <ChapterDivider chapterNumber={5} />
          
          <Chapter5Research />

          <ChapterDivider chapterNumber={6} />
          
          <Chapter6Timeline />

          <ChapterDivider chapterNumber={7} />
          
          <Chapter7Contact />
        </div>
        </>
      )}
    </div>
  );
}
