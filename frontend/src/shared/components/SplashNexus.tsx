import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu, Database, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

export const SplashNexus = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 2500),
      setTimeout(() => setStep(3), 4000),
      setTimeout(() => onComplete(), 5500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 blur-3xl opacity-20 animate-pulse" />
              <ShieldCheck size={80} className="text-primary-500 relative z-10" />
            </div>
            <h2 className="text-sm font-black text-slate-500 uppercase tracking-[1em] italic">Iniciando Protocolo</h2>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-8 w-full max-w-xs"
          >
            <div className="flex justify-between w-full text-[10px] font-black text-primary-400 uppercase tracking-widest">
              <span>Verificando Módulos del Núcleo</span>
              <Activity size={14} className="animate-pulse" />
            </div>
            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5 }}
                className="h-full bg-primary-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              />
            </div>
            <div className="grid grid-cols-3 gap-8 opacity-40">
              <Cpu size={24} className="text-white" />
              <Database size={24} className="text-white" />
              <ShieldCheck size={24} className="text-white" />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
              NEXUS <span className="text-primary-500">EDGE</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] mt-4">Security Infrastructure v4.5</p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="text-primary-500 font-black text-xs uppercase tracking-[0.3em] animate-pulse">
              Enlace Establecido. Bienvenido.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanning Line Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-[2px] bg-primary-500/20 shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-scan" />
      </div>
    </div>
  );
};
