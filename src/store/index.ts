import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  address: string | null;
  chainId: number;
  theme: 'light' | 'dark';
  setAddress: (address: string | null) => void;
  setChainId: (chainId: number) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      address: null,
      chainId: 1,
      theme: 'light',
      setAddress: (address) => set({ address }),
      setChainId: (chainId) => set({ chainId }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'app-storage',
    }
  )
); 