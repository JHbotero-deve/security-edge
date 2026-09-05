import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/autenticacion.estado';
import { autenticacionServicio } from '../services/autenticacion.servicio';
import { Entrada } from '@/components/Entrada';
import { Boton } from '@/components/Boton';
import { Modal } from '@/components/Modal';
import { ShieldCheck, Lock, ArrowRight, Sparkles, Activity, Terminal, Globe, Cpu, Mail } from 'lucide-react';
import { cn } from '@/shared/utils';
import { SplashNexus } from '@/shared/components/SplashNexus';

export const PaginaLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSplash, setShowSplash] = useState(true);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryStatus, setRecoveryStatus] = useState<'idle' | 'success'>('idle');

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data } = await autenticacionServicio.login({ email, password });
      setAuth(data.user, data.token);
      navigate('/dashboard'); // Redirigir al comando central
    } catch (err: any) {
      setError(err.response?.data?.error || 'ACCESO DENEGADO: Credenciales no reconocidas en la red Nexus.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRecovering(true);
    // Simulación de recuperación táctica
    setTimeout(() => {
      setIsRecovering(false);
      setRecoveryStatus('success');
    }, 2000);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashNexus onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <div className="h-screen bg-slate-50 flex flex-col lg:flex-row relative overflow-hidden font-sans">
        {/* Cinematic Background Elements: PRISMA LIGHT NEUTRAL */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-designer-grid opacity-[0.02] pointer-events-none" />
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-100 blur-[150px] rounded-full opacity-40" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-100 blur-[150px] rounded-full opacity-40" />

          {/* Decorative HUD Elements */}
          <div className="absolute top-10 left-10 w-24 h-24 border-l-2 border-t-2 border-slate-200 rounded-tl-3xl opacity-20 hidden lg:block" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border-r-2 border-b-2 border-slate-200 rounded-br-3xl opacity-20 hidden lg:block" />
        </div>

        {/* Left Panel: Majestic Brand Display (LIGHT) */}
        <div className="hidden lg:flex flex-[1.1] flex-col justify-between p-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="p-3 bg-indigo-600 rounded-[1.2rem] shadow-xl hover:rotate-6 transition-transform">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-slate-900 italic tracking-tighter uppercase leading-none">Seguridad Nexus</span>
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-[0.4em] mt-1">Infraestructura de Borde</span>
            </div>
          </motion.div>

          <div className="space-y-8 max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-full"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.4em]">Nodo Alpha-7 Activo</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-6xl xl:text-7xl font-black text-slate-900 italic uppercase tracking-tighter leading-[0.9]"
            >
              Domina la <br /> <span className="text-indigo-600 italic">Arquitectura</span> <br /> del Mañana.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-slate-500 font-bold uppercase text-xs tracking-widest leading-relaxed max-w-sm opacity-80"
            >
              Plataforma táctica para el monitoreo y blindaje de activos digitales bajo el estándar JBCore.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-10 border-t border-slate-100 pt-10"
          >
             <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl border border-slate-100 text-indigo-500 shadow-sm"><Globe size={18} /></div>
                <div className="flex flex-col">
                   <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Latencia</span>
                   <span className="text-xs font-black text-slate-900 uppercase italic">12ms</span>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl border border-slate-100 text-blue-400 shadow-sm"><Cpu size={18} /></div>
                <div className="flex flex-col">
                   <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Carga</span>
                   <span className="text-xs font-black text-slate-900 uppercase italic">18%</span>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Right Panel: Secure Portal (FIXED PRISMA LIGHT) */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12 relative z-10 bg-white/40 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm relative"
          >
            <div className="bg-white/80 border border-slate-200 p-10 lg:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-2xl relative overflow-hidden group">

              <div className="text-center mb-10">
                 <motion.div
                   whileHover={{ scale: 1.05 }}
                   className="w-20 h-20 bg-white border border-slate-100 rounded-[1.8rem] flex items-center justify-center mx-auto mb-6 shadow-xl text-indigo-600"
                 >
                    <Terminal size={36} />
                 </motion.div>
                 <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">Acceso <br /> Táctico</h2>

                 <div className="mt-6 flex flex-col items-center gap-3">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">Identidad Requerida</p>
                    <Link to="/register" className="px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                       Registrar Nueva Identidad
                    </Link>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  <Entrada
                    label="Matriz de Identidad (Email)"
                    type="email"
                    placeholder="usuario@nexus.security"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Entrada
                    label="Clave de Encriptación"
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-between items-center px-2 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="hidden" />
                    <div className="w-5 h-5 border-2 border-slate-100 rounded-xl group-hover:border-indigo-500 transition-all flex items-center justify-center bg-white shadow-sm">
                       <div className="w-2 h-2 rounded-full bg-indigo-500 scale-0 group-hover:scale-100 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">Recordar</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(true)}
                    className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors"
                  >
                    ¿Perdió el Acceso?
                  </button>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[9px] font-black uppercase tracking-widest text-center italic shadow-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <Boton
                  type="submit"
                  className="w-full py-5 rounded-[2rem] text-[11px] font-black shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all active:scale-[0.98]"
                  isLoading={isLoading}
                >
                  AUTENTICAR NODO <ArrowRight size={18} className="ml-3" />
                </Boton>
              </form>

              <div className="mt-12 pt-8 border-t border-slate-100 text-center space-y-6">
                 <div className="flex justify-center gap-8 opacity-40 hover:opacity-100 transition-opacity duration-700">
                    <div className="flex flex-col items-center gap-2">
                       <Activity size={18} className="text-primary-500" />
                       <span className="text-[8px] font-black text-white uppercase tracking-widest">Activo</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <Lock size={18} className="text-indigo-400" />
                       <span className="text-[8px] font-black text-white uppercase tracking-widest">Seguro</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <Sparkles size={18} className="text-emerald-400" />
                       <span className="text-[8px] font-black text-white uppercase tracking-widest">Nube</span>
                    </div>
                 </div>
                 <p className="text-[8px] text-slate-700 font-black uppercase tracking-[0.5em]">
                    © 2026 NEXUS INFRASTRUCTURE // ALL RIGHTS RESERVED
                 </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modal de Recuperación */}
        <Modal
          isOpen={isForgotModalOpen}
          onClose={() => { setIsForgotModalOpen(false); setRecoveryStatus('idle'); }}
          title="Recuperación de Enlace"
        >
          {recoveryStatus === 'idle' ? (
            <form onSubmit={handleRecovery} className="space-y-6">
               <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                 Ingrese su matriz de identidad para recibir un código de acceso temporal.
               </p>
               <Entrada
                 label="Correo de Red"
                 placeholder="usuario@nexus.security"
                 type="email"
                 required
                 value={recoveryEmail}
                 onChange={(e) => setRecoveryEmail(e.target.value)}
               />
               <Boton className="w-full" isLoading={isRecovering}>
                 SOLICITAR PROTOCOLO <ArrowRight size={16} className="ml-2" />
               </Boton>
            </form>
          ) : (
            <div className="text-center space-y-6 py-4">
               <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto text-emerald-500 shadow-lg shadow-emerald-500/10">
                  <Mail size={40} />
               </div>
               <div className="space-y-2">
                 <h3 className="text-xl font-black text-slate-900 italic uppercase">Enlace Enviado</h3>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                   Se ha enviado un protocolo de acceso a <span className="text-slate-900">{recoveryEmail}</span>. Revise su bandeja de entrada.
                 </p>
               </div>
               <Boton variant="secondary" className="w-full" onClick={() => setIsForgotModalOpen(false)}>
                 VOLVER AL ACCESO
               </Boton>
            </div>
          )}
        </Modal>

        {/* Footer Credit (Mobile View) */}
        <div className="lg:hidden absolute bottom-6 w-full text-center px-4">
          <p className="text-[8px] font-black text-slate-700 uppercase tracking-[0.3em] bg-slate-950/80 py-2 rounded-full border border-white/5 backdrop-blur-md italic">
             Nexus Infrastructure // Secure Edge Node
          </p>
        </div>
      </div>
    </>
  );
};
