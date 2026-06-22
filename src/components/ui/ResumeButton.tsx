import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const TEXTS = ['View Resume', 'Download CV', 'Hire Me!', 'My Background'];

export default function ResumeButton() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TEXTS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <a
      href="/Jeet%20Patel.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[90] h-12 px-5 bg-ink-primary text-paper-base rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-300 special-elite tracking-wider text-xs sm:text-sm uppercase overflow-hidden"
    >
      {/* Icon */}
      <svg 
        className="w-4 h-4 sm:w-5 sm:h-5 mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <div className="relative flex items-center justify-center w-28 sm:w-32 h-full">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute whitespace-nowrap"
          >
            {TEXTS[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </a>
  );
}
