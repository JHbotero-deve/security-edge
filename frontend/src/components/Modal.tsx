import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/shared/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Contenedor Modal */}
      <div className={cn(
        "relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100",
        className
      )}>
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter flex items-center gap-3">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200/50 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};
