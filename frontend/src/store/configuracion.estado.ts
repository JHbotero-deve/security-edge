import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConfiguracionState {
  appName: string;
  primaryColor: string;
  isOfflineMode: boolean;
  globalBorders: 'normal' | 'thick' | 'none';
  showMockupByDefault: boolean;

  // Acciones
  setAppName: (name: string) => void;
  setPrimaryColor: (color: string) => void;
  setOfflineMode: (status: boolean) => void;
  setGlobalBorders: (style: 'normal' | 'thick' | 'none') => void;
  setMockupDefault: (status: boolean) => void;
  resetAll: () => void;
}

export const useConfiguracion = create<ConfiguracionState>()(
  persist(
    (set) => ({
      appName: 'Security Edge Jorge H',
      primaryColor: '#0ea5e9',
      isOfflineMode: true,
      globalBorders: 'thick',
      showMockupByDefault: true,

      setAppName: (name) => set({ appName: name }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setOfflineMode: (status) => set({ isOfflineMode: status }),
      setGlobalBorders: (style) => set({ globalBorders: style }),
      setMockupDefault: (status) => set({ showMockupByDefault: status }),

      resetAll: () => set({
        appName: 'Security Edge Jorge H',
        primaryColor: '#0ea5e9',
        isOfflineMode: true,
        globalBorders: 'thick',
        showMockupByDefault: true,
      }),
    }),
    {
      name: 'nexus_global_config',
    }
  )
);
