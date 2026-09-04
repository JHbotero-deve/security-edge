import { useQuery } from '@tanstack/react-query';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { TablaDatos } from '@/components/TablaDatos';
import { alertasServicio } from '../services/alertas.servicio';
import { Siren } from 'lucide-react';

export const PaginaAlertas = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['alertas'],
    queryFn: () => alertasServicio.obtenerTodas(),
  });

  const columnas = [
    { header: 'ID', key: 'id' },
    {
      header: 'Tipo',
      key: 'type',
      render: (item: any) => (
        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-500">
          {item.type}
        </span>
      )
    },
    { header: 'Mensaje', key: 'message' },
    {
      header: 'Estado',
      key: 'isResolved',
      render: (item: any) => (
        <span className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${item.isResolved ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`}></span>
          {item.isResolved ? 'Resuelta' : 'Activa'}
        </span>
      )
    },
    {
      header: 'Fecha',
      key: 'createdAt',
      render: (item: any) => new Date(item.createdAt).toLocaleString()
    },
  ];

  return (
    <DiseñoBase>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Siren className="text-primary-500" />
            Alertas Críticas
          </h1>
          <p className="text-slate-500 text-sm mt-1">Eventos de seguridad que requieren atención inmediata.</p>
        </div>

        <TablaDatos
          columns={columnas}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>
    </DiseñoBase>
  );
};
