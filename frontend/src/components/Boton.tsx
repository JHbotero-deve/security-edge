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
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
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
