import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils';
import { ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface EntradaProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Entrada = forwardRef<HTMLInputElement, EntradaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-2 group/field">
        {label && (
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within/field:text-indigo-500 transition-colors">
            {label}
          </label>
        )}
        <div className="relative group/input">
          <input
            ref={ref}
            className={cn(
              "w-full px-6 py-5 bg-white border-2 border-slate-100 rounded-[2rem] text-slate-900 placeholder-slate-200 focus:outline-none focus:ring-[12px] focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all text-xs font-bold shadow-sm hover:border-slate-200",
              error && "border-red-500/50 focus:ring-red-500/5 focus:border-red-500",
              className
            )}
            {...props}
          />
          <div className="absolute inset-0 rounded-[2rem] border border-white/0 group-focus-within/input:border-indigo-500/20 pointer-events-none transition-all scale-[1.02]" />

          {error && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-red-500">
               <ShieldAlert size={18} />
            </div>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] font-bold text-red-500 italic ml-2 mt-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);
