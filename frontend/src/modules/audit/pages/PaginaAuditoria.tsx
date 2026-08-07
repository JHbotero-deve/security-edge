import { useQuery } from '@tanstack/react-query';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { TablaDatos } from '@/components/TablaDatos';
import { auditoriaServicio } from '../services/auditoria.servicio';
import { History, FileSearch } from 'lucide-react';

export const PaginaAuditoria = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['auditoria'],
    queryFn: () => auditoriaServicio.obtenerLogs(),
  });

  const columnas = [
    {
      header: 'Fecha',
      key: 'createdAt',
      render: (item: any) => new Date(item.createdAt).toLocaleString()
    },
    { header: 'Usuario ID', key: 'userId' },
    {
      header: 'Acción',
      key: 'action',
      render: (item: any) => (
        <span className="font-semibold text-white">{item.action}</span>
      )
    },
    { header: 'Detalles', key: 'details' },
    { header: 'IP', key: 'ipAddress' },
  ];

  return (
    <DiseñoBase>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <History className="text-primary-500" />
              Registros de Auditoría
            </h1>
            <p className="text-slate-500 text-sm mt-1">Historial detallado de todas las acciones del sistema.</p>
          </div>
          <div className="flex items-center gap-2 text-slate-400 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            <FileSearch size={18} />
            <span className="text-sm font-medium">Filtrando últimos 100 eventos</span>
          </div>
        </div>

        <TablaDatos
          columns={columnas}
          data={data?.data?.items || []}
          isLoading={isLoading}
        />
      </div>
    </DiseñoBase>
  );
};
