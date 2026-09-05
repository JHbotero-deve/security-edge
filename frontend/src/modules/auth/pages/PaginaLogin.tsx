import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/autenticacion.estado';
import { autenticacionServicio } from '../services/autenticacion.servicio';
import { Entrada } from '@/components/Entrada';
import { Boton } from '@/components/Boton';
import { ShieldCheck, Lock, ArrowRight, Sparkles, Activity, Terminal, Globe, Cpu } from 'lucide-react';
import { cn } from '@/shared/utils';
import { SplashNexus } from '@/shared/components/SplashNexus';

export const PaginaLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSplash, setShowSplash] = useState(true);

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data } = await autenticacionServicio.login({ email, password });
      setAuth(data.user, data.token);
      navigate('/laboratorio');
    } catch (err: any) {
      setError(err.response?.data?.error || 'ACCESO DENEGADO: Credenciales no reconocidas en la red Nexus.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashNexus onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row relative overflow-hidden font-sans">
        {/* Cinematic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-designer-grid opacity-[0.07] pointer-events-none" />
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-primary-600/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/10 blur-[150px] rounded-full" />

          {/* Decorative HUD Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 border-l border-t border-white/10 rounded-tl-3xl opacity-20 hidden lg:block" />
          <div className="absolute bottom-10 right-10 w-32 h-32 border-r border-b border-white/10 rounded-br-3xl opacity-20 hidden lg:block" />
        </div>

        {/* Left Panel: Majestic Brand Display */}
        <div className="hidden lg:flex flex-[1.2] flex-col justify-between p-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="p-4 bg-primary-600 rounded-[1.5rem] shadow-glow-strong group hover:rotate-6 transition-transform">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl text-white italic tracking-tighter uppercase leading-none">Seguridad Nexus</span>
              <span className="text-[10px] font-bold text-primary-500 uppercase tracking-[0.4em] mt-1">Infraestructura de Borde</span>
            </div>
          </motion.div>

          <div className="space-y-10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Suministros Activos: Nodo Alpha-7</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-7xl xl:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85] text-gradient-nexus"
            >
              Domina la <br /> <span className="text-primary-500 italic">Arquitectura</span> <br /> del Mañana.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-slate-400 font-bold uppercase text-sm tracking-widest leading-relaxed max-w-lg opacity-80"
            >
              Plataforma de grado empresarial para el monitoreo táctico, despliegue acelerado y blindaje de activos digitales Nexus.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-12 border-t border-white/10 pt-10"
          >
             <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-900 rounded-xl border border-white/5 text-primary-500 shadow-glow"><Globe size={20} /></div>
                <div className="flex flex-col">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Latencia Global</span>
                   <span className="text-sm font-black text-white uppercase italic">12ms <span className="text-[10px] text-emerald-500 ml-1">OPTIMAL</span></span>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-900 rounded-xl border border-white/5 text-indigo-400 shadow-glow"><Cpu size={20} /></div>
                <div className="flex flex-col">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Carga de Nodo</span>
                   <span className="text-sm font-black text-white uppercase italic">18% <span className="text-[10px] text-primary-400 ml-1">STABLE</span></span>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Right Panel: Secure Portal (HUD Style) */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-20 relative z-10 bg-slate-950/50 backdrop-blur-sm lg:bg-transparent">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full max-w-md relative"
          >
            {/* HUD Corner Decorations */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-l-2 border-t-2 border-primary-500/40 rounded-tl-2xl z-20" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-r-2 border-b-2 border-primary-500/40 rounded-br-2xl z-20" />

            <div className="bg-slate-900/90 border border-white/10 p-12 rounded-[3rem] shadow-[0_0_120px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden group">
              {/* Internal Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] animate-scan bg-gradient-to-b from-primary-500 to-transparent h-1" />

              <div className="text-center mb-12">
                 <motion.div
                   whileHover={{ scale: 1.1, rotate: 360 }}
                   transition={{ duration: 1 }}
                   className="w-20 h-20 bg-primary-600 rounded-[1.8rem] flex items-center justify-center mx-auto mb-6 shadow-glow-strong cursor-pointer"
                 >
                    <Terminal className="text-white w-10 h-10" />
                 </motion.div>
                 <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Acceso Táctico</h2>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-3">Identidad Nexus Requerida</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <Entrada
                    label="Matriz de Identidad (Email)"
                    type="email"
                    placeholder="usuario@nexus.security"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-950/50 border-white/5 text-white placeholder:text-slate-800 focus:bg-slate-950"
                    required
                  />
                  <Entrada
                    label="Código de Encriptación"
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-950/50 border-white/5 text-white placeholder:text-slate-800 focus:bg-slate-950"
                    required
                  />
                </div>

                <div className="flex justify-between items-center px-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="hidden" />
                    <div className="w-5 h-5 border-2 border-slate-800 rounded-xl group-hover:border-primary-500 transition-all flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-primary-500 scale-0 group-hover:scale-100 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">Enlace Persistente</span>
                  </label>
                  <button type="button" className="text-[10px] font-black text-primary-500 uppercase tracking-widest hover:text-white transition-colors">¿Olvidó la Clave?</button>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center italic"
                  >
                    {error}
                  </motion.div>
                )}

                <Boton
                  type="submit"
                  className="w-full py-5 rounded-[2rem] text-[11px] font-black shadow-glow-strong hover:scale-[1.02] transition-transform"
                  isLoading={isLoading}
                >
                  INICIAR PROTOCOLO DE ACCESO <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Boton>
              </form>

              <div className="mt-16 pt-8 border-t border-white/5 text-center space-y-6">
                 <div className="flex justify-center gap-8 opacity-40 hover:opacity-100 transition-opacity duration-700">
                    <div className="flex flex-col items-center gap-2">
                       <Activity size={18} className="text-primary-500" />
                       <span className="text-[8px] font-black text-white uppercase tracking-widest">Active</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <Lock size={18} className="text-indigo-400" />
                       <span className="text-[8px] font-black text-white uppercase tracking-widest">Secure</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <Sparkles size={18} className="text-emerald-400" />
                       <span className="text-[8px] font-black text-white uppercase tracking-widest">Cloud</span>
                    </div>
                 </div>
                 <p className="text-[8px] text-slate-700 font-black uppercase tracking-[0.5em]">
                    © 2026 NEXUS INFRASTRUCTURE // ALL RIGHTS RESERVED
                 </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Credit (Mobile View) */}
        <div className="lg:hidden absolute bottom-6 w-full text-center px-4">
          <p className="text-[8px] font-black text-slate-700 uppercase tracking-[0.3em] bg-slate-950/80 py-2 rounded-full border border-white/5 backdrop-blur-md">
             Jorge Botero Devops // Securing the Edge
          </p>
        </div>
      </div>
    </>
  );
};
