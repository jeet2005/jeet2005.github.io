import React, { useEffect, useState } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function LoadingScreen() {
  const { isLoading } = usePortfolioStore();
  const [progress, setProgress] = useState(0);
  const [closed, setClosed] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // If global state says we are done loading, animate out
    if (!isLoading) {
      setProgress(100);
      setClosed(true);
      // Wait for 1s transition then unmount
      setTimeout(() => setShouldRender(false), 1000);
      return;
    }

    // Simulate asset loading while isLoading is true
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-void-black text-paper-base transition-transform duration-1000 ${closed ? 'opacity-0 pointer-events-none' : ''}`}
      style={{ perspective: '1000px' }}
    >
      <div className="relative w-32 h-32 mb-8">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full animate-pulse text-paper-shadow">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      </div>
      
      <div className="w-64 h-1 bg-ink-primary rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-paper-edge transition-all duration-200 ease-out"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
      
      <p className="special-elite text-xl tracking-widest mb-2">Turning to the last page...</p>
      <p className="font-sans text-xs text-ink-faded">Loading assets... {Math.min(100, Math.floor(progress))}%</p>
    </div>
  );
}
