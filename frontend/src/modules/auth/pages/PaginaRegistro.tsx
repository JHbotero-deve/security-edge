import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { autenticacionServicio } from '../services/autenticacion.servicio';
import { Entrada } from '@/components/Entrada';
import { Boton } from '@/components/Boton';
import { ShieldCheck, ArrowRight, UserPlus, Mail, Lock, User } from 'lucide-react';
import { cn } from '@/shared/utils';

export const PaginaRegistro = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await autenticacionServicio.register(formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al inicializar la identidad Nexus.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:row relative overflow-hidden font-sans">
      {/* Background Tech Elements: PRISMA LIGHT STYLE */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-designer-grid" />
      <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-50 blur-[150px] rounded-full opacity-50" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary-50 blur-[150px] rounded-full opacity-50" />

      <div className="flex-1 flex flex-col lg:flex-row relative z-10">
        {/* Left Panel: Majestic Onboarding (PRISMA DARK CORE) */}
        <div className="hidden lg:flex flex-[1.1] flex-col justify-between p-24 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-designer-grid" />
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-600/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="p-4 bg-indigo-600 rounded-[1.8rem] shadow-glow-strong">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl italic tracking-tighter uppercase leading-none">Seguridad Nexus</span>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.5em] mt-1">Suministros Tácticos</span>
            </div>
          </div>

          <div className="relative z-10 space-y-12 max-w-2xl">
             <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-7xl xl:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-gradient-nexus"
            >
              Forja tu <br /> <span className="text-indigo-500 italic">Identidad</span> <br /> Digital.
            </motion.h1>
            <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em] leading-relaxed opacity-70 max-w-md">
              Únase a la infraestructura de vanguardia. Despliegue su perfil de seguridad y acceda a los nodos de alta fidelidad.
            </p>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/5">
             <p className="text-[8px] font-black text-slate-700 uppercase tracking-[0.6em]">Nexus Infrastructure // Protocol v4.5</p>
          </div>
        </div>

        {/* Right Panel: Registration Form (PRISMA LIGHT) */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-white/50 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-16"
          >
            <div className="space-y-6">
              <div className="inline-flex px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase tracking-[0.4em] border border-indigo-100">
                Nuevo Operador
              </div>
              <h2 className="text-5xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">Desplegar <br /> Perfil</h2>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.3em] leading-relaxed max-w-xs">Ingrese sus datos para inicializar el protocolo de acceso.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <Entrada
                  label="Nombre de Operador"
                  name="name"
                  placeholder="Ej: Jorge Botero"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Entrada
                  label="Matriz de Identidad (ID)"
                  name="username"
                  placeholder="jbotero_ops"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <Entrada
                  label="Enlace de Red (Email)"
                  name="email"
                  type="email"
                  placeholder="jorge@nexus.security"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Entrada
                  label="Clave de Encriptación"
                  name="password"
                  type="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <div className="p-5 bg-red-50/50 border border-red-100 rounded-3xl text-red-600 text-[10px] font-black uppercase tracking-widest text-center italic">
                  {error}
                </div>
              )}

              <Boton type="submit" className="w-full py-6 rounded-[2.5rem] shadow-2xl text-[11px] hover:scale-[1.02] transition-transform">
                INICIALIZAR IDENTIDAD <ArrowRight className="ml-4" size={20} />
              </Boton>
            </form>

            <div className="text-center pt-8 border-t border-slate-100">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 ¿Ya posee una identidad táctica? {' '}
                 <Link to="/login" className="text-indigo-600 font-black hover:text-indigo-700 ml-2 italic transition-colors">Acceder al Nodo</Link>
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
};
