import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Activity } from 'lucide-react';

interface EscudoSeguridadProps {
  nivel: number;
  estado: 'seguro' | 'alerta' | 'critico';
}

export const EscudoSeguridad = ({ nivel, estado }: EscudoSeguridadProps) => {
  const colores = {
    seguro: 'text-emerald-500 shadow-emerald-500/20 border-emerald-500/30',
    alerta: 'text-amber-500 shadow-amber-500/20 border-amber-500/30',
    critico: 'text-red-500 shadow-red-500/20 border-red-500/30',
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      {/* Outer Ring Animation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className={`absolute w-48 h-48 border-4 border-dashed rounded-full opacity-20 ${colores[estado]}`}
      />

      {/* Middle Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className={`absolute w-40 h-48 border-2 border-dotted rounded-full opacity-40 ${colores[estado]}`}
      />

      {/* Main Shield Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`relative z-10 w-32 h-32 bg-slate-900 border-2 rounded-3xl flex items-center justify-center shadow-2xl ${colores[estado]}`}
      >
        <ShieldCheck size={60} strokeWidth={1.5} />

        {/* Glow Effect */}
        <div className={`absolute inset-0 blur-xl opacity-30 rounded-3xl bg-current`} />
      </motion.div>

      {/* Stats Below */}
      <div className="mt-8 text-center space-y-1">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Security Level</p>
        <h4 className="text-4xl font-black text-white italic tracking-tighter">
          {nivel}% <span className="text-primary-500">OPTIMIZED</span>
        </h4>
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-bold">
            <Zap size={12} /> SYSTEM UP
          </div>
          <div className="flex items-center gap-1 text-primary-500 text-[10px] font-bold">
            <Activity size={12} /> 120MS LATENCY
          </div>
        </div>
      </div>
    </div>
  );
};
