import { useQuery } from '@tanstack/react-query';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { notificacionesServicio } from '../services/notificaciones.servicio';
import { Bell, CheckCircle2, Clock } from 'lucide-react';

export const PaginaNotificaciones = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['notificaciones'],
    queryFn: () => notificacionesServicio.obtenerMias(),
  });

  return (
    <DiseñoBase>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Bell className="text-primary-500" />
            Centro de Notificaciones
          </h1>
          <p className="text-slate-500 text-sm mt-1">Alertas y avisos importantes generados por el sistema.</p>
        </div>

        <div className="grid gap-4">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-slate-900 border border-slate-800 rounded-xl" />
              ))}
            </div>
          ) : data?.data?.items?.length > 0 ? (
            data.data.items.map((notif: any) => (
              <div
                key={notif.id}
                className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                  notif.read
                  ? 'bg-slate-900/50 border-slate-800 opacity-60'
                  : 'bg-slate-900 border-primary-500/30 border-l-4 border-l-primary-500 shadow-lg'
                }`}
              >
                <div className={`p-2 rounded-lg ${notif.read ? 'bg-slate-800 text-slate-500' : 'bg-primary-500/10 text-primary-500'}`}>
                  <Bell size={20} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold ${notif.read ? 'text-slate-400' : 'text-white'}`}>{notif.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{notif.message}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock size={12} /> {new Date(notif.createdAt).toLocaleString()}
                    </span>
                    {!notif.read && (
                      <button className="text-[10px] text-primary-500 font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
                        <CheckCircle2 size={12} /> Marcar como leída
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl">
              <Bell className="mx-auto text-slate-700 mb-4" size={48} />
              <p className="text-slate-500 font-medium italic">No tienes notificaciones pendientes</p>
            </div>
          )}
        </div>
      </div>
    </DiseñoBase>
  );
};
