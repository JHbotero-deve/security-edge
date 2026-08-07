import { useAuthStore } from '@/store/autenticacion.estado';
import { useSidebar } from '@/shared/providers/ProveedorBarraLateral';
import { ShieldCheck, LogOut, User, Bell, Menu } from 'lucide-react';
import { cn } from '@/shared/utils';

export const Encabezado = () => {
  const { user, logout } = useAuthStore();
  const { toggleSidebar, isCollapsed } = useSidebar();

  return (
    <header className={cn(
      "h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40 transition-all duration-300",
      "lg:ml-0"
    )}>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className={cn("flex items-center gap-3 lg:opacity-0 transition-opacity duration-300", isCollapsed && "lg:opacity-100")}>
          <div className="bg-primary-600 p-1.5 rounded-lg shadow-lg shadow-primary-500/20">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-white tracking-tight text-lg">SECURITY EDGE</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-white transition-colors relative p-2 hover:bg-slate-800 rounded-lg">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-800 mx-1"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white leading-none">{user?.name || 'Usuario'}</p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-bold">{user?.role || 'Operador'}</p>
          </div>

          <div className="group relative">
            <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 hover:border-primary-500 transition-all overflow-hidden">
              <User className="text-slate-300 w-5 h-5" />
            </button>

            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-3 translate-y-2 group-hover:translate-y-0 z-50">
              <div className="px-4 pb-3 border-b border-slate-800 mb-2">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Cuenta</p>
                <p className="text-sm text-white font-medium truncate">{user?.email}</p>
              </div>

              <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 transition-colors">
                <User className="w-4 h-4" /> Mi Perfil
              </button>

              <div className="h-[1px] bg-slate-800 my-1 mx-2"></div>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Finalizar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
