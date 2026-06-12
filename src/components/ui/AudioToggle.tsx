import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function AudioToggle() {
  const { soundEnabled, setSoundEnabled } = usePortfolioStore();

  return (
    <button
      onClick={() => setSoundEnabled(!soundEnabled)}
      className="fixed bottom-20 right-6 z-[90] w-12 h-12 bg-paper-base border border-ink-primary text-ink-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
      title="Toggle Audio"
    >
      {soundEnabled ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 14H3a1 1 0 01-1-1v-2a1 1 0 011-1h2l4-4v12l-4-4z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
      
      {/* Tooltip */}
      <div className="absolute right-14 bottom-3 bg-ink-primary text-paper-base text-xs py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none special-elite">
        {soundEnabled ? 'Audio: ON' : 'Audio: OFF'}
      </div>
    </button>
  );
}
