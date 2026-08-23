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
  { title: 'Pregúntale a Nexus', href: '/intelligence', icon: Sparkles },
  {
    title: 'Biblioteca Nexus',
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
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={toggleSidebar}
      />

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-white border-r border-slate-200 z-50 transition-all duration-300 ease-in-out flex flex-col",
          isCollapsed ? "w-20" : "w-72",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header / Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 bg-white">
          <div className={cn("flex items-center gap-3 transition-opacity duration-200", isCollapsed && "opacity-0 invisible")}>
            <div className="bg-primary-600 p-1.5 rounded-lg">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-lg">SECURITY EDGE</span>
          </div>

          <button
            onClick={toggleCollapse}
            className="hidden lg:flex text-slate-500 hover:text-slate-900 transition-colors p-1.5 hover:bg-slate-100 rounded-md"
          >
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>

          <button onClick={toggleSidebar} className="lg:hidden text-slate-500">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 space-y-2 custom-scrollbar">
          {navigation.map((item) => (
            <div key={item.title}>
              {item.href ? (
                <NavLink
                  to={item.href}
                  className={({ isActive }) => cn(
                    "flex items-center p-3 rounded-xl transition-all group relative",
                    isActive
                      ? "bg-primary-50 text-primary-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    isCollapsed && "justify-center"
                  )}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={cn("shrink-0", isCollapsed ? "w-6 h-6" : "w-5 h-5 mr-3")} />
                      {!isCollapsed && <span className="flex-1 whitespace-nowrap">{item.title}</span>}
                      {isActive && <div className="absolute left-0 w-1 h-6 bg-primary-600 rounded-r-full" />}
                    </>
                  )}
                </NavLink>
              ) : (
                <div>
                  <button
                    onClick={() => !isCollapsed && toggleSubmenu(item.title)}
                    className={cn(
                      "w-full flex items-center p-3 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all group",
                      isCollapsed && "justify-center",
                      openMenus.includes(item.title) && !isCollapsed && "text-slate-900 bg-slate-50"
                    )}
                  >
                    <item.icon className={cn("shrink-0", isCollapsed ? "w-6 h-6" : "w-5 h-5 mr-3")} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left whitespace-nowrap">{item.title}</span>
                        <ChevronRight className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          openMenus.includes(item.title) && "rotate-90"
                        )} />
                      </>
                    )}
                  </button>

                  {!isCollapsed && openMenus.includes(item.title) && (
                    <div className="mt-1 ml-9 space-y-1 border-l border-slate-200 pl-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.subItems?.map((sub) => (
                        <NavLink
                          key={sub.title}
                          to={sub.href}
                          className={({ isActive: isSubActive }) => cn(
                            "block py-2 px-3 text-sm rounded-lg transition-colors",
                            isSubActive
                              ? "text-primary-600 font-medium"
                              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                          )}
                        >
                          {sub.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="bg-gradient-to-tr from-amber-500/10 to-transparent border border-amber-500/20 p-4 rounded-2xl">
             <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Plan Actual</span>
                <span className="px-2 py-0.5 bg-slate-900 text-white text-[7px] font-black rounded-full uppercase">Trial</span>
             </div>
             <p className="text-[9px] text-slate-500 font-bold leading-tight mb-3">7 días restantes de Nexus Studio Pro.</p>
             <button className="w-full py-2 bg-amber-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20">
                Mejorar a Pro
             </button>
          </div>
          <div className={cn("flex items-center p-2 rounded-xl bg-slate-50 border border-slate-200 transition-all", isCollapsed && "justify-center")}>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
            {!isCollapsed && <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Online</span>}
          </div>
        </div>
      </aside>
    </>
  );
}
