import React from 'react';
import { motion } from 'framer-motion';
import { Boton } from '@/components/Boton';
import { Entrada } from '@/components/Entrada';
import {
  Shield, Mail, Lock, User, Github, Globe, Linkedin, Twitter,
  FileText, ChevronRight, CheckCircle2, Sparkles, Activity, ShieldCheck
} from 'lucide-react';
import { cn } from '@/shared/utils';

// --- LOGIN VARIANTS ---

export const LoginSimple = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <div className="w-full max-w-sm p-8 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100">
    <div className="text-center mb-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${themeColor}10`, color: themeColor }}>
        <Mail size={32} />
      </div>
      <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Acceso Rápido</h3>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Solo tu correo para comenzar</p>
    </div>
    <div className="space-y-4">
      <Entrada placeholder="nombre@empresa.com" label="Email Corporativo" />
      <Boton className="w-full" style={{ backgroundColor: themeColor }}>Enviar Enlace Mágico</Boton>
    </div>
  </div>
);

export const LoginStandard = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <div className="w-full max-w-sm p-8 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100">
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2 rounded-xl" style={{ backgroundColor: `${themeColor}10`, color: themeColor }}>
        <Shield size={20} />
      </div>
      <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Nexus Auth</h3>
    </div>
    <div className="space-y-4">
      <Entrada placeholder="usuario_red" label="Identificador" />
      <Entrada type="password" placeholder="••••••••" label="Contraseña" />
      <div className="flex justify-between items-center px-1">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="checkbox" className="hidden" />
          <div className="w-4 h-4 border-2 border-slate-200 rounded group-hover:border-primary-500 transition-colors" />
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Recordarme</span>
        </label>
        <button className="text-[9px] font-black text-primary-600 uppercase tracking-widest hover:underline">¿Olvidó su clave?</button>
      </div>
      <Boton className="w-full" style={{ backgroundColor: themeColor }}>Acceder al Sistema</Boton>
    </div>
  </div>
);

export const LoginSecure = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <div className="w-full max-w-sm p-8 bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-800 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
      <Lock size={120} className="text-white" />
    </div>
    <div className="relative z-10">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 text-white mb-4">
          <Lock size={24} style={{ color: themeColor }} />
        </div>
        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Terminal Segura</h3>
        <div className="flex items-center justify-center gap-2 mt-2">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.3em]">Cifrado Extremo a Extremo</span>
        </div>
      </div>
      <div className="space-y-4">
        <Entrada className="bg-slate-950 border-slate-800 text-white" label="Nombre de Usuario" />
        <Entrada className="bg-slate-950 border-slate-800 text-white" label="Correo Electrónico" />
        <Entrada type="password" className="bg-slate-950 border-slate-800 text-white" label="Clave Maestra" />
        <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 space-y-2">
           <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Autenticación Multi-Factor</p>
           <div className="flex gap-2">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="flex-1 h-10 bg-slate-900 border border-slate-800 rounded-lg" />
              ))}
           </div>
        </div>
        <Boton className="w-full py-4" style={{ backgroundColor: themeColor }}>Validar Credenciales</Boton>
      </div>
    </div>
  </div>
);

// --- FOOTER VARIANTS ---

export const FooterEnterprise = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <footer className="w-full py-16 px-8 bg-white border-t border-slate-100 rounded-t-[3rem]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl text-white" style={{ backgroundColor: themeColor }}>
            <Shield size={20} />
          </div>
          <span className="font-black text-slate-900 tracking-tighter text-xl italic uppercase">Nexus Edge</span>
        </div>
        <p className="text-[11px] text-slate-500 font-bold leading-relaxed pr-8 uppercase tracking-wider">
          Infraestructura de seguridad avanzada para la próxima generación de aplicaciones empresariales.
        </p>
      </div>
      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] italic">Plataforma</h4>
        <ul className="space-y-2 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
          <li className="hover:text-primary-600 cursor-pointer">Seguridad</li>
          <li className="hover:text-primary-600 cursor-pointer">Analíticas</li>
          <li className="hover:text-primary-600 cursor-pointer">Despliegue</li>
        </ul>
      </div>
      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] italic">Recursos</h4>
        <ul className="space-y-2 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
          <li className="hover:text-primary-600 cursor-pointer">Documentación</li>
          <li className="hover:text-primary-600 cursor-pointer">API Reference</li>
          <li className="hover:text-primary-600 cursor-pointer">Soporte</li>
        </ul>
      </div>
      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] italic">Legal</h4>
        <ul className="space-y-2 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
          <li className="hover:text-primary-600 cursor-pointer">Privacidad</li>
          <li className="hover:text-primary-600 cursor-pointer">Términos</li>
          <li className="hover:text-primary-600 cursor-pointer">Cumplimiento</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">© 2026 Nexus Infrastructure. All rights reserved.</p>
      <div className="flex gap-6 text-slate-400">
        <Github size={18} />
        <Linkedin size={18} />
        <Twitter size={18} />
        <Globe size={18} />
      </div>
    </div>
  </footer>
);

// --- DOCUMENTATION SECTIONS ---

export const DocsLayout = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <div className="w-full bg-slate-50 rounded-[3rem] p-12 border border-slate-200 shadow-inner">
     <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
           <div className="inline-flex px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em]" style={{ backgroundColor: `${themeColor}10`, color: themeColor }}>
              Guía de Implementación v2.4
           </div>
           <h2 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">Configuración del Nodo Central</h2>
           <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.2em] max-w-2xl mx-auto">
              Aprenda a integrar los módulos de seguridad de Nexus en su flujo de trabajo actual con solo unas líneas de código.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl space-y-4 group hover:border-primary-500 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: themeColor }}>
                 <FileText size={20} />
              </div>
              <h4 className="text-lg font-black text-slate-900 italic uppercase tracking-tighter">Inicialización Rápida</h4>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                 Configure su entorno en menos de 5 minutos utilizando nuestra CLI optimizada.
              </p>
              <div className="flex items-center text-primary-600 text-[10px] font-black uppercase tracking-widest gap-2 pt-2">
                 Ver Guía <ChevronRight size={14}/>
              </div>
           </div>
           <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl space-y-4 group hover:border-primary-500 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: themeColor }}>
                 <CheckCircle2 size={20} />
              </div>
              <h4 className="text-lg font-black text-slate-900 italic uppercase tracking-tighter">Seguridad Certificada</h4>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                 Todos los componentes cumplen con los estándares ISO/IEC 27001 y SOC2.
              </p>
              <div className="flex items-center text-primary-600 text-[10px] font-black uppercase tracking-widest gap-2 pt-2">
                 Certificaciones <ChevronRight size={14}/>
              </div>
           </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center md:text-left">
                 <h4 className="text-xl font-black italic uppercase tracking-tighter">¿Listo para escalar?</h4>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Únase a más de 500 empresas que confían en Nexus.</p>
              </div>
              <Boton style={{ backgroundColor: themeColor }}>Contactar Ventas</Boton>
           </div>
           <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent opacity-50" />
        </div>
     </div>
  </div>
);

// --- TABLES ---

export const TablePro = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => {
  return (
    <div className="w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-6 rounded-full" style={{ backgroundColor: themeColor }} />
          <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Auditoría de Inventario</h3>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">En Vivo</div>
          <div className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest">v3.0</div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Recurso</th>
              <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Estado</th>
              <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Rendimiento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { name: 'Motor Central', status: 'Óptimo', perf: '99.8%' },
              { name: 'Puerta de Enlace', status: 'Estable', perf: '96.2%' },
              { name: 'Flujo de Datos', status: 'Procesando', perf: '88.4%' }
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-4 text-[11px] font-bold text-slate-700 uppercase">{row.name}</td>
                <td className="px-8 py-4">
                  <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {row.status}
                  </span>
                </td>
                <td className="px-8 py-4">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: row.perf, backgroundColor: themeColor }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- BUTTON VARIANTS ---

export const NexusButtons = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <div className="flex flex-wrap gap-6 justify-center p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800">
    <Boton style={{ backgroundColor: themeColor }}>Ultra Primario</Boton>
    <button
      className="px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest italic border-2 transition-all hover:bg-white/10"
      style={{ borderColor: themeColor, color: themeColor }}
    >
      Contorno Glass
    </button>
    <button
      className="px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest italic text-white shadow-2xl transition-all hover:scale-105"
      style={{ backgroundColor: themeColor, boxShadow: `0 0 20px ${themeColor}60` }}
    >
      Brillo Neón
    </button>
    <button className="px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest italic bg-white text-slate-900 hover:bg-slate-100">
      Plano Minimal
    </button>
  </div>
);

// --- HEADERS ---

export const HeaderNexus = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-lg">
    <div className="flex items-center gap-3">
      <div className="p-1.5 rounded-lg text-white" style={{ backgroundColor: themeColor }}><Shield size={16}/></div>
      <span className="font-black text-slate-900 tracking-tighter text-sm uppercase italic">Nexus Edge</span>
    </div>
    <div className="flex items-center gap-6">
       <div className="hidden md:flex gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
          <span className="hover:text-primary-600 cursor-pointer">Inicio</span>
          <span className="hover:text-primary-600 cursor-pointer">Servicios</span>
          <span className="hover:text-primary-600 cursor-pointer">Contacto</span>
       </div>
       <div className="w-8 h-8 bg-slate-100 rounded-full border border-slate-200" />
    </div>
  </div>
);

export const FooterSocial = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <footer className="w-full py-8 px-8 bg-slate-950 text-white rounded-[2rem] border border-white/5">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: themeColor }}>
          <Shield size={16} />
        </div>
        <span className="font-black tracking-tighter uppercase italic text-sm">Nexus Social</span>
      </div>
      <div className="flex gap-4">
        <div className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"><Twitter size={16}/></div>
        <div className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"><Github size={16}/></div>
        <div className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"><Linkedin size={16}/></div>
      </div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Conectando la infraestructura global</p>
    </div>
  </footer>
);

// --- FORM VARIANTS ---

export const FormContacto = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <div className="w-full max-w-md p-8 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100">
    <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">Contactar Soporte</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Entrada label="Nombre" placeholder="Tu nombre" />
        <Entrada label="Asunto" placeholder="Motivo" />
      </div>
      <Entrada label="Mensaje" placeholder="¿En qué podemos ayudarte?" />
      <Boton className="w-full" style={{ backgroundColor: themeColor }}>Enviar Ticket</Boton>
    </div>
  </div>
);

export const FormBusqueda = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <div className="w-full max-w-2xl p-6 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl">
    <div className="flex gap-4">
      <div className="flex-1">
        <Entrada
          className="bg-slate-950 border-slate-800 text-white"
          placeholder="Buscar en el nodo central..."
        />
      </div>
      <Boton style={{ backgroundColor: themeColor }}>Buscar Ahora</Boton>
    </div>
    <div className="flex gap-3 mt-4">
      {['Ficheros', 'Usuarios', 'Logs', 'Alertas'].map(tag => (
        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">
          #{tag}
        </span>
      ))}
    </div>
  </div>
);

// --- HERO SECTIONS ---

export const HeroUltra = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <div className="w-full py-20 px-8 relative overflow-hidden bg-slate-950 rounded-[3rem]">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${themeColor} 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
    <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] bg-white/5 border border-white/10" style={{ color: themeColor }}>
        Revolución Digital 2026
      </motion.div>
      <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
        Diseña el <span style={{ color: themeColor }}>Futuro</span><br/>de tu Empresa
      </h1>
      <p className="text-slate-400 font-bold uppercase text-xs tracking-widest max-w-xl mx-auto leading-relaxed">
        La plataforma definitiva para construir interfaces de alta seguridad con un toque de diseño minimalista.
      </p>
      <div className="flex justify-center gap-4 pt-4">
        <Boton style={{ backgroundColor: themeColor }}>Empezar Ahora</Boton>
        <Boton variant="secondary">Ver Demo</Boton>
      </div>
    </div>
  </div>
);

// --- FEATURE GRIDS ---

export const FeaturesGrid = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 p-12 bg-white rounded-[3rem] border border-slate-100 shadow-xl">
    {[
      { title: 'Seguridad Total', desc: 'Cifrado de grado militar en cada componente.' },
      { title: 'Diseño Ágil', desc: 'Interfaz fluida optimizada para creadores.' },
      { title: 'Nube Propia', desc: 'Despliegue instantáneo sin configuraciones.' }
    ].map((f, i) => (
      <div key={i} className="space-y-4 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-primary-500 transition-all group">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: themeColor }}>
          <Sparkles size={20} />
        </div>
        <h4 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">{f.title}</h4>
        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">{f.desc}</p>
      </div>
    ))}
  </div>
);

// --- SOCIAL PROOF / TESTIMONIALS ---

export const TestimonialsGlass = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <div className="w-full py-16 px-8 bg-slate-900 rounded-[3rem] border border-white/5 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-gradient-to-br from-primary-500/20 to-transparent" />
    <div className="max-w-3xl mx-auto space-y-8 text-center relative z-10">
      <div className="flex justify-center gap-1">
        {[1,2,3,4,5].map(i => <Sparkles key={i} size={16} style={{ color: themeColor }} fill="currentColor" />)}
      </div>
      <blockquote className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight">
        "Nexus Studio ha transformado la forma en que presentamos nuestros prototipos. Es rápido, elegante y sumamente potente."
      </blockquote>
      <div className="pt-4">
        <p className="text-white font-black uppercase text-xs tracking-[0.3em]">Alexander Pierce</p>
        <p className="text-slate-500 font-bold uppercase text-[9px] tracking-widest mt-1">CTO @ CyberSystems</p>
      </div>
    </div>
  </div>
);

// --- COMPONENT CATALOG FOR BUILDER ---

export const CATALOG = [
  // 1. ESTRUCTURA: ENCABEZADOS
  { id: 'header-nex', aisle: 'Encabezados', title: 'Header Corporativo Pro', type: 'header', render: (t: string) => <HeaderNexus themeColor={t} /> },
  { id: 'header-min', aisle: 'Encabezados', title: 'Header Minimalista', type: 'header', render: (t: string) => <div className="w-full bg-slate-900 p-4 rounded-xl flex justify-between items-center text-white"><span className="font-black italic uppercase tracking-tighter text-xs">Mini Nexus</span><div className="flex gap-2"><div className="w-2 h-2 rounded-full" style={{backgroundColor: t}}/><div className="w-2 h-2 rounded-full bg-slate-700"/></div></div> },

  // 2. IMPACTO: HERO SECTIONS
  { id: 'hero-ultra', aisle: 'Marketing', title: 'Hero Ultra Impacto', type: 'hero', render: (t: string) => <HeroUltra themeColor={t} /> },
  { id: 'feat-grid', aisle: 'Marketing', title: 'Cuadrícula de Servicios', type: 'features', render: (t: string) => <FeaturesGrid themeColor={t} /> },
  { id: 'test-glass', aisle: 'Marketing', title: 'Testimonios Glass Pro', type: 'social', render: (t: string) => <TestimonialsGlass themeColor={t} /> },

  // 3. INTERACCIÓN: BOTONES
  { id: 'btns-nexus', aisle: 'Botones', title: 'Pack Botones Diseño', type: 'button', render: (t: string) => <NexusButtons themeColor={t} /> },
  { id: 'btn-ultra', aisle: 'Botones', title: 'Botón Acción Nexus', type: 'button', render: (t: string) => <div className="flex justify-center"><Boton style={{ backgroundColor: t }}>BOTÓN NEXUS</Boton></div> },

  // 4. DATOS: TABLAS
  { id: 'table-pro', aisle: 'Tablas', title: 'Auditoría de Datos Pro', type: 'table', render: (t: string) => <TablePro themeColor={t} /> },

  // 5. CAPTURA: FORMULARIOS & LOGINS
  { id: 'login-std', aisle: 'Formularios', title: 'Login Estándar Nexus', type: 'login', render: (t: string) => <div className="flex justify-center"><LoginStandard themeColor={t} /></div> },
  { id: 'login-sec', aisle: 'Formularios', title: 'Login Alta Seguridad', type: 'login', render: (t: string) => <div className="flex justify-center"><LoginSecure themeColor={t} /></div> },
  { id: 'form-cont', aisle: 'Formularios', title: 'Contacto de Soporte', type: 'form', render: (t: string) => <div className="flex justify-center"><FormContacto themeColor={t} /></div> },
  { id: 'form-busq', aisle: 'Formularios', title: 'Buscador de Nodo', type: 'form', render: (t: string) => <div className="flex justify-center"><FormBusqueda themeColor={t} /></div> },

  // 6. CIERRE: FOOTERS
  { id: 'footer-ent', aisle: 'Footers', title: 'Footer Empresarial Pro', type: 'footer', render: (t: string) => <FooterEnterprise themeColor={t} /> },
  { id: 'footer-soc', aisle: 'Footers', title: 'Footer Social Dark', type: 'footer', render: (t: string) => <FooterSocial themeColor={t} /> },
  { id: 'docs-lay', aisle: 'Docs', title: 'Sección Documentación', type: 'docs', render: (t: string) => <DocsLayout themeColor={t} /> },
];
