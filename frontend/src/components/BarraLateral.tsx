import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  ShieldAlert,
  Settings,
  Bell,
  ChevronRight,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Terminal,
  Ghost,
  Sparkles
} from 'lucide-react';
import { useSidebar } from '@/shared/providers/ProveedorBarraLateral';
import { cn } from '@/shared/utils/index';

interface NavItem {
  title: string;
  href?: string;
  icon: React.ElementType;
  roles?: string[];
  subItems?: { title: string; href: string }[];
}

const navigation: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  {
    title: 'Ciberseguridad',
    icon: ShieldAlert,
    subItems: [
      { title: 'Incidentes', href: '/incidents' },
      { title: 'Alertas Críticas', href: '/alerts' },
      { title: 'Monitoreo Red', href: '/monitoring' },
    ]
  },
  {
    title: 'Administración',
    icon: Users,
    subItems: [
      { title: 'Usuarios', href: '/users' },
      { title: 'Roles y Permisos', href: '/roles' },
      { title: 'Auditoría', href: '/audit' },
    ]
  },
  { title: 'Notificaciones', href: '/notifications', icon: Bell },
  { title: 'Configuración', href: '/settings', icon: Settings },
  { title: 'Terminal', href: '/terminal', icon: Terminal },
  { title: 'Laboratorio', href: '/laboratorio', icon: Ghost },
  { title: 'Asistente Privado', href: '/intelligence', icon: Sparkles },
  {
    title: 'Biblioteca Privada',
    icon: Sparkles,
    subItems: [
      { title: 'Constructor Visual', href: '/builder' },
      { title: 'Sección Logins', href: '/builder?cat=login' },
      { title: 'Sección Botones', href: '/builder?cat=button' },
      { title: 'Sección Tablas', href: '/builder?cat=table' },
      { title: 'Sección Formularios', href: '/builder?cat=form' },
      { title: 'Sección Encabezados', href: '/builder?cat=header' },
      { title: 'Sección Footers', href: '/builder?cat=footer' },
      { title: 'Documentación', href: '/builder?cat=docs' },
    ]
  },
];

export const BarraLateral = () => {
  const { isOpen, isCollapsed, toggleSidebar, toggleCollapse } = useSidebar();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setOpenMenus(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={toggleSidebar}
      />

      {/* Sidebar Container: DARK GAMER THEME */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-slate-950 border-r border-white/5 z-50 transition-all duration-500 ease-in-out flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]",
          isCollapsed ? "w-24" : "w-80",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header / Logo */}
        <div className="h-24 flex items-center justify-between px-8 border-b border-white/5 bg-slate-950">
          <div className={cn("flex items-center gap-4 transition-all duration-300", isCollapsed && "opacity-0 invisible scale-90")}>
            <div className="bg-primary-600 p-2.5 rounded-[1.2rem] shadow-glow-strong animate-pulse-gamer">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-white italic tracking-tighter text-lg uppercase leading-none">Nexus Edge</span>
              <span className="text-[8px] font-black text-primary-500 uppercase tracking-[0.4em] mt-1">Infrastructure</span>
            </div>
          </div>

          <button
            onClick={toggleCollapse}
            className="hidden lg:flex text-slate-500 hover:text-white transition-all p-2 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10"
          >
            {isCollapsed ? <PanelLeftOpen size={22} /> : <PanelLeftClose size={22} />}
          </button>

          <button onClick={toggleSidebar} className="lg:hidden text-slate-500 hover:text-white">
            <X size={28} />
          </button>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-8 px-4 space-y-3 custom-scrollbar">
          {navigation.map((item) => (
            <div key={item.title}>
              {item.href ? (
                <NavLink
                  to={item.href}
                  className={({ isActive }) => cn(
                    "flex items-center p-4 rounded-[1.5rem] transition-all group relative border border-transparent",
                    isActive
                      ? "bg-primary-600/10 text-primary-400 font-black shadow-[inset_0_0_20px_rgba(59,130,246,0.1)] border-primary-500/20"
                      : "text-slate-500 hover:bg-white/5 hover:text-slate-200",
                    isCollapsed && "justify-center"
                  )}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={cn(
                        "shrink-0 transition-all duration-300",
                        isCollapsed ? "w-7 h-7" : "w-5 h-5 mr-4",
                        isActive && "text-primary-500 shadow-glow drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                      )} />
                      {!isCollapsed && <span className="flex-1 whitespace-nowrap text-[11px] uppercase tracking-widest italic">{item.title}</span>}
                      {isActive && (
                        <motion.div
                          layoutId="activeGlow"
                          className="absolute left-0 w-1.5 h-8 bg-primary-500 rounded-r-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ) : (
                <div className="space-y-1">
                  <button
                    onClick={() => !isCollapsed && toggleSubmenu(item.title)}
                    className={cn(
                      "w-full flex items-center p-4 rounded-[1.5rem] text-slate-500 hover:bg-white/5 hover:text-slate-200 transition-all group border border-transparent",
                      isCollapsed && "justify-center",
                      openMenus.includes(item.title) && !isCollapsed && "text-white bg-white/5 border-white/5"
                    )}
                  >
                    <item.icon className={cn("shrink-0 transition-transform duration-300 group-hover:scale-110", isCollapsed ? "w-7 h-7" : "w-5 h-5 mr-4")} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left whitespace-nowrap text-[11px] uppercase tracking-widest italic">{item.title}</span>
                        <ChevronRight className={cn(
                          "w-4 h-4 transition-transform duration-300 opacity-30",
                          openMenus.includes(item.title) && "rotate-90 opacity-100 text-primary-500"
                        )} />
                      </>
                    )}
                  </button>

                  {!isCollapsed && openMenus.includes(item.title) && (
                    <div className="mt-2 ml-10 space-y-1 border-l border-white/5 pl-6 animate-in fade-in slide-in-from-top-4 duration-300">
                      {item.subItems?.map((sub) => (
                        <NavLink
                          key={sub.title}
                          to={sub.href}
                          className={({ isActive: isSubActive }) => cn(
                            "block py-3 px-4 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all relative group",
                            isSubActive
                              ? "text-primary-400 bg-primary-500/5"
                              : "text-slate-600 hover:text-slate-300 hover:bg-white/5"
                          )}
                        >
                          {sub.title}
                          {/* Indicator for sub-active */}
                          <div className={cn(
                            "absolute left-[-25px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary-500 transition-all",
                            "opacity-0 group-hover:opacity-30",
                            "isSubActive" && "opacity-100 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                          )} />
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer / Status HUD */}
        <div className="p-6 border-t border-white/5 space-y-6 bg-slate-950/50">
          {!isCollapsed && (
            <div className="bg-gradient-to-tr from-primary-600/10 to-indigo-600/5 border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
                  <Sparkles size={40} className="text-white" />
               </div>
               <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-black text-primary-400 uppercase tracking-[0.2em]">Soporte Nexus</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               </div>
               <p className="text-[9px] text-slate-500 font-bold leading-relaxed mb-4 uppercase tracking-widest">Protocolo de Asistencia Prioritaria Activo.</p>
               <button className="w-full py-3 bg-slate-900 border border-white/10 text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-primary-600 transition-all shadow-2xl">
                  Contactar CIO
               </button>
            </div>
          )}

          <div className={cn(
            "flex items-center p-3 rounded-2xl bg-black/40 border border-white/5 transition-all",
            isCollapsed ? "justify-center" : "px-5"
          )}>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            {!isCollapsed && (
              <div className="ml-4 flex flex-col">
                <span className="text-[9px] font-black text-white uppercase tracking-widest">Nexus Node Alpha</span>
                <span className="text-[7px] font-bold text-emerald-500 uppercase tracking-[0.3em]">Synched & Secure</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
