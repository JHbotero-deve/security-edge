import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Lightbulb, Zap, ArrowRight, X, Sparkles, Wand2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/shared/utils';

const CREATIVE_SPARKS = [
  "Crea un Portal de Acceso Ciberpunk para un nodo seguro.",
  "Diseña una Tabla de Auditoría que parezca una terminal de la Matrix.",
  "Ensambla un Dashboard de Monitoreo Táctico para un CIO.",
  "Construye una Landing Page minimalista pero imponente.",
  "Crea una interfaz de comandos para un Asistente IA."
];

export const NexusCreatorCompass = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sparkIndex, setSparkIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const isLab = location.pathname.includes('laboratorio');
  const isBuilder = location.pathname.includes('builder');

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkIndex(prev => (prev + 1) % CREATIVE_SPARKS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  if (!isLab && !isBuilder) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[110]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-6 w-80 bg-slate-900 border border-primary-500/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(59,130,246,0.3)] p-8 relative overflow-hidden backdrop-blur-xl"
          >
            {/* HUD Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-indigo-500 to-primary-600 animate-scan opacity-30" />

            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-600 rounded-xl text-white shadow-glow">
                    <Compass size={18} className="animate-spin-slow" />
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">Brújula Creativa Nexus</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                  <X size={16} />
               </button>
            </div>

            <div className="space-y-6">
               <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 relative group">
                  <div className="absolute -top-2 -right-2 p-1.5 bg-indigo-600 rounded-lg text-white shadow-glow opacity-0 group-hover:opacity-100 transition-opacity">
                     <Lightbulb size={12} />
                  </div>
                  <p className="text-[11px] font-bold text-slate-300 italic leading-relaxed uppercase tracking-tighter">
                     "{CREATIVE_SPARKS[sparkIndex]}"
                  </p>
               </div>

               <div className="space-y-3">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Próximo Paso Recomendado:</p>

                  {isLab ? (
                    <button
                      onClick={() => navigate('/builder')}
                      className="w-full flex items-center justify-between p-4 bg-primary-600/10 border border-primary-500/30 rounded-2xl text-primary-400 hover:bg-primary-600 hover:text-white transition-all group"
                    >
                       <span className="text-[10px] font-black uppercase tracking-widest italic">Ir al Constructor</span>
                       <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/laboratorio')}
                      className="w-full flex items-center justify-between p-4 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all group"
                    >
                       <span className="text-[10px] font-black uppercase tracking-widest italic">Obtener más piezas</span>
                       <Zap size={14} className="group-hover:scale-110 transition-transform" />
                    </button>
                  )}
               </div>

               <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-2">
                  <Sparkles size={12} className="text-primary-500 animate-pulse" />
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em]">Nexus AI Inspiration Engine</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all relative group",
          isOpen ? "bg-red-600 text-white rotate-45" : "bg-slate-900 border-2 border-primary-500 text-primary-500 hover:bg-primary-600 hover:text-white"
        )}
      >
        <div className="absolute inset-0 bg-primary-500 blur-xl opacity-20 group-hover:opacity-40 animate-pulse" />
        <Wand2 size={24} className="relative z-10" />
      </motion.button>
    </div>
  );
};
