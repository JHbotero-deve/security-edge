import React from 'react';
import { BarraLateral } from '@/components/BarraLateral';
import { Encabezado } from '@/components/Encabezado';
import { useSidebar } from '@/shared/providers/ProveedorBarraLateral';
import { cn } from '@/shared/utils/index';

interface DiseñoBaseProps {
  children: React.ReactNode;
}

export const DiseñoBase: React.FC<DiseñoBaseProps> = ({ children }) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-white flex">
      <BarraLateral />

      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out bg-slate-50/50",
        isCollapsed ? "lg:ml-20" : "lg:ml-72"
      )}>
        <Encabezado />
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>

          {/* Firma Minimalista */}
          <footer className="mt-auto pt-12 pb-4 text-center">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] italic">
              Powered by Nexus Infrastructure <span className="mx-2">|</span> Assisted by <span className="text-primary-400/50">jorgedevop</span>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};
