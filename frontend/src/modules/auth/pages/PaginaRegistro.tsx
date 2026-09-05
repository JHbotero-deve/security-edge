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
    <div className="h-screen bg-slate-50 flex flex-col lg:flex-row relative overflow-hidden font-sans">
      {/* Background Tech Elements: PRISMA LIGHT NEUTRAL */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-designer-grid" />
      <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-100 blur-[150px] rounded-full opacity-30" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-100 blur-[150px] rounded-full opacity-30" />

      <div className="flex-1 flex flex-col lg:flex-row relative z-10 h-full">
        {/* Left Panel: Majestic Brand Display (FIXED VIEWPORT) */}
        <div className="hidden lg:flex flex-[1] flex-col justify-between p-16 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-designer-grid" />
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-600/10 to-transparent pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex items-center gap-4"
          >
            <div className="p-3 bg-indigo-600 rounded-[1.2rem] shadow-xl">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl italic tracking-tighter uppercase leading-none">Seguridad Nexus</span>
              <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-[0.4em] mt-1">Suministros Tácticos</span>
            </div>
          </motion.div>

          <div className="relative z-10 space-y-10">
             <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl xl:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] text-gradient-nexus"
            >
              Forja tu <br /> <span className="text-primary-500 italic">Identidad</span> <br /> Digital.
            </motion.h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] leading-relaxed opacity-60 max-w-xs">
              Únase a la red de seguridad del mañana. Despliegue su perfil y tome el control.
            </p>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/5 flex items-center justify-between">
             <p className="text-[7px] font-black text-slate-600 uppercase tracking-[0.5em]">Infrastructure v4.5</p>
             <div className="flex gap-2">
                <div className="w-1 h-1 rounded-full bg-indigo-500" />
                <div className="w-1 h-1 rounded-full bg-primary-500" />
             </div>
          </div>
        </div>

        {/* Right Panel: Registration Form (SCROLLABLE BUT FIXED LAYOUT) */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-white/40 backdrop-blur-xl overflow-y-auto custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm space-y-10"
          >
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[7px] font-black uppercase tracking-[0.4em] border border-slate-200">
                Operación de Registro
              </div>
              <h2 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">Nueva Identidad</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Protocolo de Inicialización</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <Entrada
                  label="Nombre de Operador"
                  name="name"
                  placeholder="Ej: Jorge Botero"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Entrada
                  label="Identificador Único"
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
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[9px] font-black uppercase tracking-widest text-center italic">
                  {error}
                </div>
              )}

              <Boton type="submit" className="w-full py-4 rounded-[1.8rem] shadow-xl text-[10px] hover:scale-[1.02] transition-all" isLoading={isLoading}>
                INICIALIZAR IDENTIDAD <ArrowRight className="ml-3" size={16} />
              </Boton>
            </form>

            <div className="text-center pt-6 border-t border-slate-100">
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                 ¿Ya posee una identidad? {' '}
                 <Link to="/login" className="text-indigo-600 font-black hover:text-indigo-700 ml-2 italic">Acceder al Nodo</Link>
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
};
