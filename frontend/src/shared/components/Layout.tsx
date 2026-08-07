import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useSidebar } from '@/shared/providers/SidebarProvider';
import { cn } from '@/shared/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar is fixed, so we need a placeholder or margin */}
      <Sidebar />

      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "lg:ml-20" : "lg:ml-72"
      )}>
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
