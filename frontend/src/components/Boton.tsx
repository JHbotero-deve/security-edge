import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/utils';

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Boton = ({
  children,
  variant = 'primary',
  isLoading,
  className,
  disabled,
  ...props
}: BotonProps) => {
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] -translate-y-[2px] active:translate-y-0 active:scale-[0.98] border border-primary-400/20',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/5 hover:border-white/20 shadow-xl active:scale-[0.98]',
    danger: 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] -translate-y-[2px] active:translate-y-0 active:scale-[0.98] border border-red-400/20',
  };

  return (
    <button
      className={cn(
        "px-8 py-4 rounded-[1.8rem] font-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.2em] italic",
        variants[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  );
};
