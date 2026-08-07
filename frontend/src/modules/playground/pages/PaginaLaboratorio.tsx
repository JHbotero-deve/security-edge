import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { Boton } from '@/components/Boton';
import { Entrada } from '@/components/Entrada';
import { TablaDatos } from '@/components/TablaDatos';
import {
  Zap,
  Gamepad2,
  Maximize2,
  Code2,
  Layers,
  Move,
  Cpu,
  Ghost,
  Sparkles
} from 'lucide-react';
import { cn } from '@/shared/utils';

const ComponentWrapper = ({ title, children, description }: { title: string; children: React.ReactNode; description: string }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      className="bg-slate-900/80 border-2 border-slate-800 p-6 rounded-3xl backdrop-blur-xl relative group hover:border-primary-500/50 transition-colors shadow-2xl overflow-hidden"
    >
      {/* Neon Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/10 blur-[80px] rounded-full group-hover:bg-primary-500/20 transition-all" />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-600/10 rounded-xl text-primary-500">
            <Layers size={18} />
          </div>
          <div>
            <h3 className="text-white font-bold tracking-tight">{title}</h3>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{description}</p>
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400"><Code2 size={14} /></button>
          <button className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 cursor-move"><Move size={14} /></button>
        </div>
      </div>

      <div className="relative z-10 min-h-[100px] flex items-center justify-center border border-dashed border-slate-800 rounded-2xl p-8 bg-slate-950/50">
        {children}
      </div>

      <div className="mt-4 flex justify-between items-center text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">
        <span>Drag to move</span>
        <span>Interactive Sandbox v1.0</span>
      </div>
    </motion.div>
  );
};

export const PaginaLaboratorio = () => {
  const [activeTab, setActiveTab] = useState('ui');

  const tabs = [
    { id: 'ui', label: 'UI Core', icon: Layers },
    { id: 'fx', label: 'Efectos', icon: Zap },
    { id: 'sys', label: 'Hardware', icon: Cpu },
  ];

  return (
    <DiseñoBase>
      <div className="space-y-8 relative">
        {/* Header Gamer */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-primary-950/30 p-10 rounded-[2.5rem] border-2 border-primary-500/20 shadow-inner">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
            <Gamepad2 size={180} className="text-primary-500" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-600/20 rounded-full border border-primary-500/30">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping" />
              <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em]">State: Gamer Mode Activated</span>
            </div>

            <h1 className="text-5xl font-black text-white tracking-tighter italic">
              NEXUS <span className="text-primary-500">LABORATORY</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-lg font-medium leading-relaxed">
              El santuario experimental de Security Edge. Arrastra, prueba y destruye componentes en este entorno de alto rendimiento.
            </p>

            <div className="flex gap-4 pt-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all border-2",
                    activeTab === tab.id
                    ? "bg-primary-600 border-primary-400 text-white shadow-lg shadow-primary-500/30 -translate-y-1"
                    : "bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                  )}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Laboratorio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode='wait'>
            {activeTab === 'ui' && (
              <>
                <ComponentWrapper title="Botón Primario" description="Componente Atómico" key="btn-p">
                  <Boton className="shadow-lg shadow-primary-500/20 px-8">DESPLEGAR PROTOCOLO</Boton>
                </ComponentWrapper>

                <ComponentWrapper title="Botón Peligro" description="Acciones Críticas" key="btn-d">
                  <Boton variant="danger" className="shadow-lg shadow-red-500/20 px-8">DETENER SISTEMA</Boton>
                </ComponentWrapper>

                <ComponentWrapper title="Entrada de Datos" description="Input Form" key="input">
                  <Entrada placeholder="Escriba aquí..." label="Terminal Input" />
                </ComponentWrapper>

                <ComponentWrapper title="Loader Estado" description="Feedback Loop" key="loader">
                  <Boton isLoading>CARGANDO DATOS</Boton>
                </ComponentWrapper>

                <ComponentWrapper title="Tabla de Seguridad" description="Data Display" key="table">
                  <div className="w-full scale-[0.8]">
                    <TablaDatos
                      columns={[{header: 'LOG', key: 'l'}, {header: 'STATUS', key: 's'}]}
                      data={[{l: 'Auth Success', s: 'OK'}, {l: 'Firewall Up', s: 'OK'}]}
                    />
                  </div>
                </ComponentWrapper>

                <ComponentWrapper title="Ghost Component" description="Easter Egg" key="ghost">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-primary-500/50"
                  >
                    <Ghost size={60} strokeWidth={1} />
                  </motion.div>
                </ComponentWrapper>
              </>
            )}

            {activeTab === 'fx' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full h-96 border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center gap-6 bg-slate-900/20"
              >
                <div className="p-6 bg-primary-500/10 rounded-full animate-pulse">
                  <Sparkles size={64} className="text-primary-500" />
                </div>
                <h3 className="text-2xl font-black text-white italic tracking-widest uppercase">Efectos Visuales en Desarrollo</h3>
                <p className="text-slate-500 font-mono">Engine: Framer Motion v11.0</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Glitch */}
        <div className="text-center py-10">
          <p className="text-slate-800 font-black text-[150px] leading-none select-none tracking-tighter opacity-10 absolute bottom-0 left-0 right-0 -z-10">
            SHOWCASE
          </p>
          <div className="flex items-center justify-center gap-2 text-slate-600 font-mono text-xs uppercase tracking-widest">
            <Maximize2 size={14} /> F11 para Inmersión Total
          </div>
        </div>
      </div>
    </DiseñoBase>
  );
};
