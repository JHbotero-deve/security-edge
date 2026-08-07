import { useAuthStore } from '@/store/auth.store';
import { ShieldCheck, LogOut, User, Bell } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-primary-600 p-1.5 rounded-lg shadow-lg shadow-primary-500/20">
          <ShieldCheck className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-white tracking-tight text-lg">SECURITY EDGE</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-800 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white leading-none">{user?.name || 'Usuario'}</p>
            <p className="text-xs text-slate-500 mt-1 capitalize">{user?.role?.toLowerCase() || 'Operador'}</p>
          </div>

          <div className="group relative">
            <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 hover:border-primary-500 transition-all">
              <User className="text-slate-300 w-5 h-5" />
            </button>

            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 translate-y-2 group-hover:translate-y-0">
              <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2">
                <User className="w-4 h-4" /> Perfil
              </button>
              <div className="h-[1px] bg-slate-800 my-1 mx-2"></div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
