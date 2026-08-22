import { ShieldCheck } from 'lucide-react';
import { cn } from '@/shared/utils';

interface TarjetaUsuarioProps {
  name: string;
  role: string;
  email?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  className?: string;
}

export const TarjetaUsuario = ({ name, role, email, status = 'ACTIVE', className }: TarjetaUsuarioProps) => {
  return (
    <div className={cn(
      "bg-white border border-slate-200 rounded-[2rem] p-6 shadow-xl relative overflow-hidden group transition-all hover:border-primary-300 hover:shadow-2xl",
      className
    )}>
      {/* Background Icon Decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-500">
        <ShieldCheck size={80} />
      </div>

      <div className="flex flex-col items-center gap-4 relative z-10">
        {/* Avatar Circle */}
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border-2 border-primary-500/10 group-hover:border-primary-500/30 transition-colors">
          <ShieldCheck className="text-primary-600" size={40} />
        </div>

        {/* Info */}
        <div className="text-center space-y-1">
          <h4 className="text-slate-900 font-black text-base uppercase tracking-tight italic">
            {name}
          </h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
            {role}
          </p>
          {email && (
            <p className="text-[11px] text-slate-500 font-medium lowercase">
              {email}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 my-1" />

        {/* Badges */}
        <div className="flex gap-2">
          <div className={cn(
            "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all",
            status === 'ACTIVE'
              ? "bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-500/10"
              : "bg-red-50 text-red-600 shadow-sm shadow-red-500/10"
          )}>
            {status === 'ACTIVE' ? 'Online' : 'Offline'}
          </div>
          <div className="px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm shadow-primary-500/10">
            Nexus v3.0
          </div>
        </div>
      </div>
    </div>
  );
};
