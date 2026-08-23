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
  <div className="w-full max-w-sm mx-auto p-6 md:p-8 bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-slate-100">
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
  <div className="w-full max-w-sm mx-auto p-6 md:p-8 bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-slate-100">
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2 rounded-xl" style={{ backgroundColor: `${themeColor}10`, color: themeColor }}>
        <Shield size={20} />
      </div>
      <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Private Auth</h3>
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
  <div className="w-full max-w-sm mx-auto p-6 md:p-8 bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-slate-800 relative overflow-hidden">
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
  <footer className="w-full py-12 md:py-20 px-6 bg-white border-t border-slate-100 rounded-t-[2.5rem] md:rounded-t-[3.5rem] relative overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
        {/* Branding Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl text-white shadow-lg" style={{ backgroundColor: themeColor }}>
              <Shield size={24} />
            </div>
            <span className="font-black text-slate-900 tracking-tighter text-2xl italic uppercase">Security Edge</span>
          </div>
          <p className="text-[12px] text-slate-500 font-bold leading-relaxed uppercase tracking-wider">
            Arquitectura de seguridad avanzada diseñada por <span className="text-slate-900">Jorge Devops</span> para infraestructuras de alto rendimiento.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] italic border-l-2 border-primary-500 pl-3">Enlace Directo</h4>
          <div className="space-y-4">
            <a href="tel:+573208071941" className="flex flex-col group">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary-600 transition-colors">Voz // Global</span>
              <span className="text-[11px] font-bold text-slate-700">+57 320 807 1941</span>
            </a>
            <a href="https://wa.me/573208071941" target="_blank" rel="noreferrer" className="flex flex-col group">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Mensajería // Nodo</span>
              <span className="text-[11px] font-bold text-slate-700">WhatsApp Business</span>
            </a>
          </div>
        </div>

        {/* Digital Section */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] italic border-l-2 border-primary-500 pl-3">Canal Digital</h4>
          <div className="space-y-4">
            <a href="mailto:jorgebotero190@gmail.com" className="flex flex-col group">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary-600 transition-colors">E-Mail // Soporte</span>
              <span className="text-[11px] font-bold text-slate-700 truncate">jorgebotero190@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Action Section */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] italic border-l-2 border-primary-500 pl-3">Private Studio</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase leading-tight">
            Prueba nuestro asistente de inteligencia hoy mismo.
          </p>
          <Boton className="w-full py-2 text-[9px]" style={{ backgroundColor: themeColor }}>
            Iniciar Auditoría
          </Boton>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">© 2026 Private Infrastructure</p>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">Deployment by jorgedevop // Protocol 4.5</p>
        </div>

        <div className="flex gap-4">
          {[Github, Linkedin, Twitter, Globe].map((Icon, i) => (
            <div key={i} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 hover:scale-110 transition-all cursor-pointer text-slate-400 hover:text-primary-600 border border-slate-100 shadow-sm">
              <Icon size={18} />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Background Watermark */}
    <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none select-none">
       <Shield size={400} />
    </div>
  </footer>
);

// --- DOCUMENTATION SECTIONS ---

export const DocsLayout = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => (
  <div className="w-full bg-slate-50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border border-slate-200 shadow-inner">
     <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
        <div className="space-y-4 text-center px-4">
           <div className="inline-flex px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em]" style={{ backgroundColor: `${themeColor}10`, color: themeColor }}>
              Guía de Implementación v2.4
           </div>
           <h2 className="text-2xl md:text-4xl font-black text-slate-900 italic uppercase tracking-tighter">Configuración del Nodo Central</h2>
           <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.2em] max-w-2xl mx-auto">
              Aprenda a integrar los módulos de seguridad privados en su flujo de trabajo actual con solo unas líneas de código.
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
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Únase a más de 500 empresas que confían en nuestro sistema.</p>
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
    <div className="w-full bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
      <div className="px-6 md:px-8 py-4 md:py-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/50 gap-4">
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
      <span className="font-black text-slate-900 tracking-tighter text-sm uppercase italic">Security Edge</span>
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
        <span className="font-black tracking-tighter uppercase italic text-sm">Private Social</span>
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
  <div className="w-full py-12 md:py-20 px-6 md:px-8 relative overflow-hidden bg-slate-950 rounded-[2rem] md:rounded-[3rem]">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${themeColor} 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
    <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] bg-white/5 border border-white/10" style={{ color: themeColor }}>
        Revolución Digital 2026
      </motion.div>
      <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
        Diseña el <span style={{ color: themeColor }}>Futuro</span><br/>de tu Empresa
      </h1>
      <p className="text-slate-400 font-bold uppercase text-[9px] md:text-xs tracking-widest max-w-xl mx-auto leading-relaxed px-4">
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
  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-6 md:p-12 bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-xl">
    {[
      { title: 'Seguridad Total', desc: 'Cifrado de grado militar en cada componente.' },
      { title: 'Diseño Ágil', desc: 'Interfaz fluida optimizada para creadores.' },
      { title: 'Nube Propia', desc: 'Despliegue instantáneo sin configuraciones.' }
    ].map((f, i) => (
      <div key={i} className="space-y-4 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-primary-500 transition-all group">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0" style={{ backgroundColor: themeColor }}>
          <Sparkles size={20} />
        </div>
        <h4 className="text-lg md:text-xl font-black text-slate-900 italic uppercase tracking-tighter">{f.title}</h4>
        <p className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">{f.desc}</p>
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
        "Private Studio ha transformado la forma en que presentamos nuestros prototipos. Es rápido, elegante y sumamente potente."
      </blockquote>
      <div className="pt-4">
        <p className="text-white font-black uppercase text-xs tracking-[0.3em]">Alexander Pierce</p>
        <p className="text-slate-500 font-bold uppercase text-[9px] tracking-widest mt-1">CTO @ CyberSystems</p>
      </div>
    </div>
  </div>
);

// --- SMART COMPONENTS ---

export const BotonInteligente = ({ themeColor = '#3b82f6' }: { themeColor?: string }) => {
  const [config, setConfig] = React.useState({ route: '', use: '' });

  return (
    <div className="p-6 bg-slate-900 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col gap-4">
      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">
        <Sparkles size={12} className="text-primary-500"/> Configuración de Acción Inteligente
      </div>
      {!config.use ? (
        <div className="space-y-3">
          <p className="text-[11px] text-white font-bold italic">¿Cuál es el propósito de este botón?</p>
          <div className="grid grid-cols-2 gap-2">
            {['Navegación', 'Ejecución API', 'Descarga PDF', 'Cierre Sesión'].map(u => (
              <button
                key={u}
                onClick={() => setConfig({...config, use: u})}
                className="px-3 py-2 bg-slate-800 rounded-xl text-[9px] font-black text-slate-300 uppercase hover:bg-primary-600 hover:text-white transition-all"
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-primary-400 uppercase">{config.use}</span>
            <button onClick={() => setConfig({route:'', use:''})} className="text-[8px] text-slate-600 underline uppercase">Cambiar</button>
          </div>
          <Entrada
            className="bg-slate-950 border-slate-800 text-white py-2"
            placeholder="Ingresa destino o función (Libre)..."
          />
          <Boton className="w-full py-2" style={{ backgroundColor: themeColor }}>
            Confirmar Acción
          </Boton>
        </div>
      )}
    </div>
  );
};

// --- COMPONENT CATALOG FOR BUILDER ---

export const CATALOG = [
  // Inteligencia - ¡Nuevo!
  { id: 'smart-btn', aisle: 'Inteligencia', title: 'Botón de Acción Inteligente', type: 'button', isPremium: true, render: (t: string) => <div className="flex justify-center"><BotonInteligente themeColor={t} /></div> },

  // 1. ESTRUCTURA: ENCABEZADOS
  { id: 'header-nex', aisle: 'Encabezados', title: 'Header Corporativo Pro', type: 'header', isPremium: true, render: (t: string) => <HeaderNexus themeColor={t} /> },
  { id: 'header-min', aisle: 'Encabezados', title: 'Header Minimalista', type: 'header', render: (t: string) => <div className="w-full bg-slate-900 p-4 rounded-xl flex justify-between items-center text-white"><span className="font-black italic uppercase tracking-tighter text-xs">Mini Private</span><div className="flex gap-2"><div className="w-2 h-2 rounded-full" style={{backgroundColor: t}}/><div className="w-2 h-2 rounded-full bg-slate-700"/></div></div> },

  // 2. IMPACTO: HERO SECTIONS
  { id: 'hero-ultra', aisle: 'Marketing', title: 'Hero Ultra Impacto', type: 'hero', render: (t: string) => <HeroUltra themeColor={t} /> },
  { id: 'feat-grid', aisle: 'Marketing', title: 'Cuadrícula de Servicios', type: 'features', render: (t: string) => <FeaturesGrid themeColor={t} /> },
  { id: 'test-glass', aisle: 'Marketing', title: 'Testimonios Glass Pro', type: 'social', render: (t: string) => <TestimonialsGlass themeColor={t} /> },

  // 3. INTERACCIÓN: BOTONES
  { id: 'btns-nex', aisle: 'Botones', title: 'Pack Botones Diseño', type: 'button', render: (t: string) => <NexusButtons themeColor={t} /> },
  { id: 'btn-ultra', aisle: 'Botones', title: 'Botón Acción Privado', type: 'button', render: (t: string) => <div className="flex justify-center"><Boton style={{ backgroundColor: t }}>BOTÓN PRIVADO</Boton></div> },

  // 4. DATOS: TABLAS
  { id: 'table-pro', aisle: 'Tablas', title: 'Auditoría de Datos Pro', type: 'table', render: (t: string) => <TablePro themeColor={t} /> },

  // 5. CAPTURA: FORMULARIOS & LOGINS
  { id: 'login-std', aisle: 'Formularios', title: 'Login Estándar Privado', type: 'login', render: (t: string) => <div className="flex justify-center"><LoginStandard themeColor={t} /></div> },
  { id: 'login-sec', aisle: 'Formularios', title: 'Login Alta Seguridad', type: 'login', render: (t: string) => <div className="flex justify-center"><LoginSecure themeColor={t} /></div> },
  { id: 'form-cont', aisle: 'Formularios', title: 'Contacto de Soporte', type: 'form', render: (t: string) => <div className="flex justify-center"><FormContacto themeColor={t} /></div> },
  { id: 'form-busq', aisle: 'Formularios', title: 'Buscador de Nodo', type: 'form', render: (t: string) => <div className="flex justify-center"><FormBusqueda themeColor={t} /></div> },

  // 6. CIERRE: FOOTERS
  { id: 'footer-ent', aisle: 'Footers', title: 'Footer Empresarial Pro', type: 'footer', render: (t: string) => <FooterEnterprise themeColor={t} /> },
  { id: 'footer-soc', aisle: 'Footers', title: 'Footer Social Dark', type: 'footer', render: (t: string) => <FooterSocial themeColor={t} /> },
  { id: 'docs-lay', aisle: 'Docs', title: 'Sección Documentación', type: 'docs', render: (t: string) => <DocsLayout themeColor={t} /> },
];
