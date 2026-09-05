import React from 'react';
import { BarraLateral } from '@/components/BarraLateral';
import { Encabezado } from '@/components/Encabezado';
import { useSidebar } from '@/shared/providers/ProveedorBarraLateral';
import { cn } from '@/shared/utils/index';
import { AsistenteNexus } from './AsistenteNexus';
import { NexusCreatorCompass } from './NexusCreatorCompass';
import {
  Instagram,
  Facebook,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Twitter,
  Globe,
  ChevronRight
} from 'lucide-react';

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

          {/* Footer Global Majestuoso & Profesional */}
          <footer className="mt-32 pb-12 w-full relative overflow-hidden bg-slate-950">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

            <div className="max-w-[1800px] mx-auto px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 py-20">
                {/* Brand Column */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary-600 rounded-2xl shadow-glow-strong">
                      <ShieldCheck className="text-white w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                      Nexus <span className="text-primary-500">Edge</span>
                    </h2>
                  </div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed max-w-xs opacity-70">
                    Infraestructura de seguridad táctica para el despliegue de identidades y suministros de alta fidelidad en entornos corporativos.
                  </p>
                </div>

                {/* Ecosystem Column */}
                <div className="space-y-8">
                   <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] border-l-2 border-primary-500 pl-4">Ecosistema</h3>
                   <ul className="space-y-4">
                      <li><a href="/" className="text-[10px] font-bold text-slate-500 hover:text-primary-400 uppercase tracking-widest transition-all flex items-center gap-2 group"><ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-all" /> Laboratorio</a></li>
                      <li><a href="/builder" className="text-[10px] font-bold text-slate-500 hover:text-primary-400 uppercase tracking-widest transition-all flex items-center gap-2 group"><ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-all" /> Constructor</a></li>
                      <li><a href="/intelligence" className="text-[10px] font-bold text-slate-500 hover:text-primary-400 uppercase tracking-widest transition-all flex items-center gap-2 group"><ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-all" /> IA Nexus</a></li>
                   </ul>
                </div>

                {/* Support Column */}
                <div className="space-y-8">
                   <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] border-l-2 border-indigo-500 pl-4">Soporte Táctico</h3>
                   <div className="flex flex-wrap gap-4">
                      <a href="tel:+573208071941" className="p-4 bg-slate-900 border border-white/5 rounded-[1.5rem] text-slate-400 hover:text-white hover:bg-primary-600 transition-all shadow-2xl group" title="Llamada Directa">
                         <Phone size={20} className="group-hover:rotate-12 transition-transform" />
                      </a>
                      <a href="mailto:jorgebotero190@gmail.com" className="p-4 bg-slate-900 border border-white/5 rounded-[1.5rem] text-slate-400 hover:text-white hover:bg-primary-600 transition-all shadow-2xl group" title="Email de Seguridad">
                         <Mail size={20} className="group-hover:scale-110 transition-transform" />
                      </a>
                      <a href="https://wa.me/573208071941" target="_blank" rel="noreferrer" className="p-4 bg-slate-900 border border-white/5 rounded-[1.5rem] text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all shadow-2xl group" title="Enlace WhatsApp">
                         <MessageSquare size={20} className="group-hover:-translate-y-1 transition-transform" />
                      </a>
                   </div>
                </div>

                {/* Social Media Column */}
                <div className="space-y-8">
                   <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] border-l-2 border-emerald-500 pl-4">Canales Nexus</h3>
                   <div className="flex gap-4">
                      <a href="#" className="p-4 bg-slate-900 border border-white/5 rounded-[1.5rem] text-slate-400 hover:text-pink-500 hover:bg-pink-500/10 transition-all shadow-2xl group">
                         <Instagram size={20} className="group-hover:rotate-6 transition-transform" />
                      </a>
                      <a href="#" className="p-4 bg-slate-900 border border-white/5 rounded-[1.5rem] text-slate-400 hover:text-blue-600 hover:bg-blue-600/10 transition-all shadow-2xl group">
                         <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                      </a>
                      <a href="#" className="p-4 bg-slate-900 border border-white/5 rounded-[1.5rem] text-slate-400 hover:text-sky-400 hover:bg-sky-400/10 transition-all shadow-2xl group">
                         <Twitter size={20} className="group-hover:rotate-12 transition-transform" />
                      </a>
                   </div>
                </div>
              </div>

              {/* Legal & Compliance Section */}
              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-1">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.6em]">
                    © 2026 Security Edge Jorge H // All rights reserved.
                  </p>
                  <p className="text-[8px] font-bold text-slate-800 uppercase tracking-widest italic opacity-50">
                    Sincronizado con Nodo Global Alpha-7
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-10 text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] italic">
                  <a href="#" className="hover:text-primary-500 transition-colors">Privacy Protocol</a>
                  <a href="#" className="hover:text-primary-500 transition-colors">Terms of Operations</a>
                  <a href="#" className="hover:text-primary-500 transition-colors">Compliance SOC2</a>
                  <a href="#" className="hover:text-primary-500 transition-colors border border-primary-500/20 px-3 py-1 rounded-full">Auditoría CIO OK</a>
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
