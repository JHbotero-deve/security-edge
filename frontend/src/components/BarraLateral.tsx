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
  Terminal
} from 'lucide-react';
import { useSidebar } from '@/shared/providers/ProveedorBarraLateral';
import { cn } from '@/shared/utils';

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
          "fixed top-0 left-0 h-screen bg-slate-900 border-r border-slate-800 z-50 transition-all duration-300 ease-in-out flex flex-col",
          isCollapsed ? "w-20" : "w-72",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header / Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-900/50">
          <div className={cn("flex items-center gap-3 transition-opacity duration-200", isCollapsed && "opacity-0 invisible")}>
            <div className="bg-primary-600 p-1.5 rounded-lg">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-white tracking-tight text-lg">SECURITY EDGE</span>
          </div>

          <button
            onClick={toggleCollapse}
            className="hidden lg:flex text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-slate-800 rounded-md"
          >
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>

          <button onClick={toggleSidebar} className="lg:hidden text-slate-400">
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
                      ? "bg-primary-600/10 text-primary-500 font-semibold"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200",
                    isCollapsed && "justify-center"
                  )}
                >
                  <item.icon className={cn("shrink-0", isCollapsed ? "w-6 h-6" : "w-5 h-5 mr-3")} />
                  {!isCollapsed && <span className="flex-1 whitespace-nowrap">{item.title}</span>}
                  {isActive && <div className="absolute left-0 w-1 h-6 bg-primary-600 rounded-r-full" />}
                </NavLink>
              ) : (
                <div>
                  <button
                    onClick={() => !isCollapsed && toggleSubmenu(item.title)}
                    className={cn(
                      "w-full flex items-center p-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-all group",
                      isCollapsed && "justify-center",
                      openMenus.includes(item.title) && !isCollapsed && "text-white bg-slate-800/30"
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
                    <div className="mt-1 ml-9 space-y-1 border-l border-slate-700/50 pl-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.subItems?.map((sub) => (
                        <NavLink
                          key={sub.title}
                          to={sub.href}
                          className={({ isActive }) => cn(
                            "block py-2 px-3 text-sm rounded-lg transition-colors",
                            isActive
                              ? "text-primary-500 font-medium"
                              : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
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

        <div className="p-4 border-t border-slate-800">
          <div className={cn("flex items-center p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 transition-all", isCollapsed && "justify-center")}>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
            {!isCollapsed && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Online</span>}
          </div>
        </div>
      </aside>
    </>
  );
};
