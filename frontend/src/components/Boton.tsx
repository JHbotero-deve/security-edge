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
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 -translate-y-[1px] active:translate-y-0 active:scale-[0.98]',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-100 hover:border-slate-200 shadow-sm active:scale-[0.98]',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40 -translate-y-[1px] active:translate-y-0 active:scale-[0.98]',
  };

  return (
    <button
      className={cn(
        "px-6 py-3 rounded-2xl font-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest italic",
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
