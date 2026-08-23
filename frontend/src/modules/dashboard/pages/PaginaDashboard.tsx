import { DiseñoBase } from '@/shared/components/DiseñoBase';
import {
  Activity,
  ShieldAlert,
  Users,
  Database,
  Terminal,
  Ghost,
  Sparkles,
  Layout,
  ArrowRight,
  BookOpen,
  Zap,
  ShieldCheck,
  Globe,
  Lock,
  Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils';
import { useNavigate } from 'react-router-dom';
import { NexusChart } from '@/shared/components/NexusChart';

export const PaginaDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Integridad Nodo', value: '99.9%', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10', chart: [80, 85, 90, 88, 95, 99, 99.9] },
    { label: 'Componentes Privados', value: '24', icon: Ghost, color: 'text-primary-500', bg: 'bg-primary-500/10', chart: [10, 12, 15, 18, 20, 22, 24] },
    { label: 'Eventos de Red', value: '2.4k', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10', chart: [50, 40, 60, 80, 45, 70, 90] },
    { label: 'Logs Protegidos', value: '15.8k', icon: Database, color: 'text-amber-500', bg: 'bg-amber-500/10', chart: [100, 120, 110, 140, 130, 150, 158] },
  ];

  const guias = [
    {
      titulo: 'El Laboratorio',
      descripcion: 'Selecciona, personaliza y fija (Pin) componentes individuales. Es tu almacén de piezas tácticas.',
      icon: Ghost,
      color: 'from-blue-600 to-cyan-500',
      path: '/laboratorio',
      id: '01'
    },
    {
      titulo: 'El Constructor',
      descripcion: 'Ensambla tus piezas en una interfaz majestuosa. Usa el "Nexus Studio" para resultados 4K.',
      icon: Layout,
      color: 'from-primary-600 to-indigo-600',
      path: '/builder',
      id: '02'
    },
    {
      titulo: 'Asistente Privado',
      descripcion: 'Envía esquemas tácticos o usa voz para que la IA Nexus automatice tu flujo de trabajo.',
      icon: Sparkles,
      color: 'from-emerald-600 to-teal-500',
      path: '/intelligence',
      id: '03'
    }
  ];

  return (
    <DiseñoBase>
      <div className="space-y-12 pb-20 max-w-[1600px] mx-auto">

        {/* Majestic Header HUD */}
        <div className="relative p-12 lg:p-16 bg-slate-900 border border-white/5 rounded-[4rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.4)] group">
           {/* HUD Background Decoration */}
           <div className="absolute inset-0 opacity-[0.03] animate-scan pointer-events-none bg-gradient-to-b from-primary-500 to-transparent h-20" />
           <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
              <ShieldCheck size={300} className="text-white" />
           </div>

           <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-black text-primary-400 uppercase tracking-[0.5em] backdrop-blur-md"
                >
                  <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                  Nodo Central: ONLINE
                </motion.div>

                <div className="space-y-2">
                  <h1 className="text-5xl lg:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                    Security <span className="text-primary-500">Edge</span><br/>
                    <span className="text-slate-500 text-4xl lg:text-5xl opacity-50">Comando Nexus</span>
                  </h1>
                </div>

                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest max-w-xl leading-relaxed opacity-70">
                  Bienvenido, Jorge H. La infraestructura táctica está a su disposición. Todos los sistemas de auditoría y diseño están sincronizados.
                </p>
              </div>

              <div className="flex flex-wrap gap-8 lg:gap-16 bg-slate-950/40 p-10 rounded-[3rem] border border-white/5 backdrop-blur-xl">
                 <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <Globe size={12} className="text-primary-500" /> Latencia Red
                    </span>
                    <span className="text-2xl font-black text-white italic tracking-tighter">14 MS</span>
                 </div>
                 <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <Cpu size={12} className="text-indigo-400" /> CPU Cluster
                    </span>
                    <span className="text-2xl font-black text-white italic tracking-tighter">22.4%</span>
                 </div>
                 <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <Lock size={12} className="text-emerald-500" /> Seguridad
                    </span>
                    <span className="text-2xl font-black text-emerald-500 italic tracking-tighter">ACTIVA</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Interactive Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900 border border-white/5 p-10 rounded-[3rem] hover:border-primary-500/40 transition-all group shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-10 transition-opacity">
                 <stat.icon size={100} />
              </div>

              <div className="flex items-center justify-between mb-8">
                <div className={`${stat.bg} ${stat.color} p-5 rounded-[1.5rem] group-hover:scale-110 transition-transform shadow-glow`}>
                  <stat.icon size={28} />
                </div>
              </div>

              <div className="space-y-4">
                 <div>
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">{stat.label}</p>
                    <p className="text-4xl font-black text-white italic tracking-tighter mt-1">{stat.value}</p>
                 </div>

                 {/* Visual Data Chart */}
                 <NexusChart data={stat.chart} color={stat.color.includes('emerald') ? '#10b981' : stat.color.includes('primary') ? '#3b82f6' : stat.color.includes('blue') ? '#3b82f6' : '#f59e0b'} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Strategic Modules Protocol */}
        <div className="space-y-10">
           <div className="flex items-center gap-6">
              <h2 className="text-xl font-black text-white italic uppercase tracking-tighter flex items-center gap-4">
                 <div className="w-10 h-1 bg-primary-600 rounded-full" />
                 Módulos de Operación Estratégica
              </h2>
              <div className="h-px flex-1 bg-white/5" />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {guias.map((guia, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  onClick={() => navigate(guia.path)}
                  className="bg-slate-900 border border-white/5 p-10 rounded-[3.5rem] space-y-8 group hover:border-primary-500 transition-all cursor-pointer relative overflow-hidden shadow-2xl"
                >
                   {/* Module Index Badge */}
                   <div className="absolute top-8 right-8 text-4xl font-black text-white/5 italic select-none">
                      {guia.id}
                   </div>

                   <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white bg-gradient-to-br shadow-glow-strong transition-transform group-hover:scale-110", guia.color)}>
                      <guia.icon size={32} />
                   </div>

                   <div className="space-y-3">
                      <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">{guia.titulo}</h3>
                      <p className="text-[11px] text-slate-500 font-bold uppercase leading-relaxed tracking-widest opacity-80">
                        {guia.descripcion}
                      </p>
                   </div>

                   <div className="pt-6 flex items-center text-[10px] font-black text-primary-500 uppercase tracking-[0.3em] gap-3 group-hover:gap-5 transition-all">
                      Iniciar Protocolo <ArrowRight size={16} />
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Security Announcement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-600 rounded-[4rem] p-16 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_0_100px_rgba(59,130,246,0.3)]"
        >
           {/* Background HUD Decor */}
           <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,_white_2px,_transparent_0)] bg-[length:30px_30px]" />
           <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 blur-[80px] rounded-full" />

           <div className="relative z-10 space-y-4 text-center lg:text-left">
              <div className="inline-flex px-4 py-1.5 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-2 backdrop-blur-md">Protocolo de Cifrado AES-256</div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Blindaje de Suministros Activo</h2>
              <p className="text-white/80 font-bold uppercase text-xs tracking-widest max-w-lg">Su arquitectura está protegida por la infraestructura Nexus. Los datos permanecen en su nodo local.</p>
           </div>

           <Boton
             onClick={() => navigate('/intelligence')}
             className="relative z-10 bg-white text-primary-600 px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:scale-[1.05] transition-all shadow-[0_0_50px_rgba(255,255,255,0.3)] border-none"
           >
              Consultar Inteligencia Nexus
           </Boton>
        </motion.div>

      </div>
    </DiseñoBase>
  );
};
