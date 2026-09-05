import { motion } from 'framer-motion';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import {
  Sparkles,
  Globe,
  Eye,
  Mic,
  Bot
} from 'lucide-react';

export const PaginaInteligencia = () => {
  return (
    <DiseñoBase>
      <div className="min-h-[85vh] flex flex-col items-center justify-center p-8 md:p-20 text-center relative overflow-hidden bg-white/50 backdrop-blur-xl rounded-[4rem] border border-slate-100 shadow-sm">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-designer-grid" />
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-100 blur-[150px] rounded-full opacity-50" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-50 blur-[150px] rounded-full opacity-50" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl space-y-12 relative z-10"
        >
          <div className="relative mx-auto w-32 h-32">
             <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse" />
             <div className="w-full h-full bg-white border border-slate-200 rounded-[3rem] flex items-center justify-center shadow-2xl relative z-10">
                <Sparkles size={60} className="text-indigo-600" />
             </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">
              Inteligencia <br /> <span className="text-indigo-600">Sincronizada</span>
            </h1>
            <p className="text-base text-slate-500 font-bold uppercase tracking-[0.4em] leading-relaxed max-w-xl mx-auto">
              El núcleo de procesamiento Nexus ahora reside en su entorno de trabajo persistente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
             {[
               { title: 'Búsqueda Global', desc: 'Protocolo /web para datos de red.', icon: Globe },
               { title: 'Visión de Nodo', desc: 'Análisis visual de infraestructura.', icon: Eye },
               { title: 'Control Vocal', desc: 'Comandos rápidos por audio.', icon: Mic }
             ].map((f, i) => (
               <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors mb-6 mx-auto">
                     <f.icon size={22} />
                  </div>
                  <h3 className="text-slate-900 font-black text-[11px] uppercase italic mb-3 tracking-tighter">{f.title}</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">{f.desc}</p>
               </div>
             ))}
          </div>

          <div className="pt-12">
             <div className="inline-flex items-center gap-4 px-8 py-4 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-transform cursor-help">
                <Bot size={18} className="text-indigo-400" />
                Inicia una consulta en la burbuja inferior
             </div>
          </div>
        </motion.div>

        {/* Footer Technical Line */}
        <div className="absolute bottom-12 w-full px-20 flex justify-between items-center opacity-20 hidden md:flex">
           <span className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-900">Nexus Intelligence Engine // 2026</span>
           <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-slate-900" />
              <div className="w-2 h-2 rounded-full bg-indigo-600" />
              <div className="w-2 h-2 rounded-full bg-primary-500" />
           </div>
        </div>
      </div>
    </DiseñoBase>
  );
};
