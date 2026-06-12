import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function TerminalButton() {
  const { setIsTerminalOpen } = usePortfolioStore();

  return (
    <button
      onClick={() => setIsTerminalOpen(true)}
      className="fixed bottom-6 right-6 z-[90] w-12 h-12 bg-ink-primary text-paper-base rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
      title="Open Developer Terminal (Ctrl + \`)"
    >
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17l6-6-6-6M12 19h8" />
      </svg>
      {/* Tooltip */}
      <div className="absolute right-14 bottom-2 bg-ink-primary text-paper-base text-xs py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none special-elite">
        jeetOS Terminal
      </div>
    </button>
  );
}
