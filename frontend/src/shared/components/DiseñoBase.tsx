import React from 'react';
import { BarraLateral } from '@/components/BarraLateral';
import { Encabezado } from '@/components/Encabezado';
import { useSidebar } from '@/shared/providers/ProveedorBarraLateral';
import { cn } from '@/shared/utils';

interface DiseñoBaseProps {
  children: React.ReactNode;
}

export const DiseñoBase: React.FC<DiseñoBaseProps> = ({ children }) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <BarraLateral />

      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "lg:ml-20" : "lg:ml-72"
      )}>
        <Encabezado />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
