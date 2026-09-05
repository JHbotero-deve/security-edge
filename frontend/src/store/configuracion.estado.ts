import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConfiguracionState {
  appName: string;
  primaryColor: string;
  isOfflineMode: boolean;
  globalBorders: 'normal' | 'thick' | 'none';

  // Acciones
  setAppName: (name: string) => void;
  setPrimaryColor: (color: string) => void;
  setOfflineMode: (status: boolean) => void;
  setGlobalBorders: (style: 'normal' | 'thick' | 'none') => void;
  resetAll: () => void;
}

export const useConfiguracion = create<ConfiguracionState>()(
  persist(
    (set) => ({
      appName: 'Security Edge Jorge H',
      primaryColor: '#0ea5e9',
      isOfflineMode: true,
      globalBorders: 'thick',

      setAppName: (name) => set({ appName: name }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setOfflineMode: (status) => set({ isOfflineMode: status }),
      setGlobalBorders: (style) => set({ globalBorders: style }),

      resetAll: () => set({
        appName: 'Security Edge Jorge H',
        primaryColor: '#0ea5e9',
        isOfflineMode: true,
        globalBorders: 'thick',
      }),
    }),
    {
      name: 'nexus_global_config',
    }
  )
);
