import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils';
import { ShieldAlert } from 'lucide-react';

interface EntradaProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Entrada = forwardRef<HTMLInputElement, EntradaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
            {label}
          </label>
        )}
        <div className="relative group/input">
          <input
            ref={ref}
            className={cn(
              "w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-8 focus:ring-primary-500/5 focus:border-primary-500 focus:bg-white transition-all text-xs font-bold shadow-sm",
              error && "border-red-500/50 focus:ring-red-500/5 focus:border-red-500",
              className
            )}
            {...props}
          />
          {error && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
               <ShieldAlert size={16} />
            </div>
          )}
        </div>
        {error && <p className="text-[10px] font-bold text-red-500 italic ml-1">{error}</p>}
      </div>
    );
  }
);
