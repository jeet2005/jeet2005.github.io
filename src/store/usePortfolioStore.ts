import { create } from 'zustand';

interface PortfolioState {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  soundEnabled: false,
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
