import React from 'react';
import { BarraLateral } from '@/components/BarraLateral';
import { Encabezado } from '@/components/Encabezado';
import { useSidebar } from '@/shared/providers/ProveedorBarraLateral';
import { cn } from '@/shared/utils/index';
import { AsistenteNexus } from './AsistenteNexus';
import { NexusCreatorCompass } from './NexusCreatorCompass';

interface DiseñoBaseProps {
  children: React.ReactNode;
}

export const DiseñoBase: React.FC<DiseñoBaseProps> = ({ children }) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-200 overflow-x-hidden">
      <BarraLateral />

      <div className={cn(
        "flex-1 flex flex-col transition-all duration-500 ease-in-out bg-slate-900/30 min-w-0",
        isCollapsed ? "lg:ml-24" : "lg:ml-80"
      )}>
        <Encabezado />
        <main className="flex-1 p-6 lg:p-12 xl:p-20 flex flex-col min-w-0">
          <div className="max-w-[1800px] mx-auto w-full flex-1">
            {children}
          </div>

          {/* Footer Global Refinado & Responsive */}
          <footer className="mt-20 pt-10 pb-8 border-t border-white/5 w-full">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Brand & Author */}
                <div className="text-center md:text-left space-y-2">
                  <h2 className="text-sm font-black text-white uppercase italic tracking-[0.2em]">
                    Security Edge <span className="text-primary-500">Infrastructure</span>
                  </h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Architected by <span className="text-slate-300">Jorge Devops</span>
                  </p>
                </div>

                {/* Contact Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 w-full md:w-auto">
                  <a href="tel:+573208071941" className="flex flex-col items-center md:items-start gap-1 group">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest group-hover:text-primary-500 transition-colors">Teléfono Directo</span>
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">+57 320 807 1941</span>
                  </a>
                  <a href="https://wa.me/573208071941" target="_blank" rel="noreferrer" className="flex flex-col items-center md:items-start gap-1 group">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">WhatsApp Business</span>
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">Enviar Mensaje</span>
                  </a>
                  <a href="mailto:jorgebotero190@gmail.com" className="flex flex-col items-center md:items-start gap-1 group">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest group-hover:text-primary-400 transition-colors">Email Corporativo</span>
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors truncate max-w-[200px]">jorgebotero190@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Bottom Copyright */}
              <div className="mt-10 pt-6 border-t border-white/[0.02] flex flex-col sm:flex-row justify-between items-center gap-4 text-[8px] font-black text-slate-700 uppercase tracking-[0.4em]">
                <p>© 2026 Security Edge Jorge H. All rights reserved.</p>
                <div className="flex gap-6 italic opacity-50">
                  <span>Privacy Policy</span>
                  <span>Terms of Service</span>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Floating Nexus AI Assistant */}
      <AsistenteNexus />
      <NexusCreatorCompass />
    </div>
  );
};
