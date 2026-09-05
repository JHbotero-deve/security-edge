import { useQuery } from '@tanstack/react-query';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { TablaDatos } from '@/components/TablaDatos';
import { monitoreoServicio } from '../services/monitoreo.servicio';
import { Activity, Cpu } from 'lucide-react';

export const PaginaMonitoreo = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['monitoreo'],
    queryFn: () => monitoreoServicio.obtenerMetricas(),
  });

  const columnas = [
    { header: 'Tipo', key: 'type' },
    {
      header: 'Valor',
      key: 'value',
      render: (item: any) => <span className="font-mono text-emerald-400">{item.value}</span>
    },
    { header: 'Estado', key: 'status' },
    {
      header: 'Última Actualización',
      key: 'createdAt',
      render: (item: any) => new Date(item.createdAt).toLocaleString()
    },
  ];

  return (
    <DiseñoBase>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Activity className="text-primary-500" />
            Monitoreo de Red y Sistema
          </h1>
          <p className="text-slate-500 text-sm mt-1">Estado de sensores y métricas de infraestructura en tiempo real.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
            <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-lg">
              <Cpu size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">CPU Load</p>
              <p className="text-xl font-bold text-white">24%</p>
            </div>
          </div>
          {/* Infrastructure Metrics */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
            <div className="bg-blue-500/10 text-blue-500 p-2 rounded-lg">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Net Traffic</p>
              <p className="text-xl font-bold text-white">120 Mb/s</p>
            </div>
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
