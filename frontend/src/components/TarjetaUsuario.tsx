import { ShieldCheck, Edit2, Trash2 } from 'lucide-react';
import { cn } from '@/shared/utils';

interface TarjetaUsuarioProps {
  id?: number;
  name: string;
  role: string;
  email?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TarjetaUsuario = ({ id, name, role, email, status = 'ACTIVE', className, onEdit, onDelete }: TarjetaUsuarioProps) => {
  return (
    <div className={cn(
      "bg-white border border-slate-200 rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden group transition-all hover:border-primary-300 hover:shadow-2xl",
      className
    )}>
      {/* Background Icon Decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-500">
        <ShieldCheck size={80} />
      </div>

      {/* Action Overlay */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        {onEdit && (
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="p-2.5 bg-white/90 backdrop-blur-md border border-slate-200 text-slate-600 hover:text-primary-600 rounded-xl shadow-lg hover:shadow-primary-500/10 transition-all"
          >
            <Edit2 size={14} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="p-2.5 bg-white/90 backdrop-blur-md border border-slate-200 text-slate-600 hover:text-red-600 rounded-xl shadow-lg hover:shadow-red-500/10 transition-all"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <div className="flex flex-col items-center gap-5 relative z-10">
        {/* Avatar Circle */}
        <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center border-2 border-primary-500/10 group-hover:border-primary-500/30 transition-all group-hover:rotate-3">
          <ShieldCheck className="text-primary-600" size={48} />
        </div>

        {/* Info */}
        <div className="text-center space-y-1.5">
          <h4 className="text-slate-900 font-black text-base uppercase tracking-tight italic">
            {name}
          </h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
            {role}
          </p>
          {email && (
            <p className="text-[11px] text-slate-500 font-medium lowercase opacity-70">
              {email}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100/80 my-1" />

        {/* Badges */}
        <div className="flex gap-2 w-full justify-center">
          <div className={cn(
            "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
            status === 'ACTIVE'
              ? "bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-500/5"
              : "bg-red-50 text-red-600 shadow-sm shadow-red-500/5"
          )}>
            <span className={cn("w-1.5 h-1.5 rounded-full", status === 'ACTIVE' ? "bg-emerald-500 animate-pulse" : "bg-red-500")} />
            {status}
          </div>
          <div className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/20">
            Nexus v3
          </div>
        </div>
      </div>
    </div>
  );
};
