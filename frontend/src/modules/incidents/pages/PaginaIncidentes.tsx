import { useQuery } from '@tanstack/react-query';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { TablaDatos } from '@/components/TablaDatos';
import { incidentesServicio } from '../services/incidentes.servicio';
import { ShieldAlert, Plus } from 'lucide-react';
import { Boton } from '@/components/Boton';

export const PaginaIncidentes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['incidentes'],
    queryFn: () => incidentesServicio.obtenerTodos(),
  });

  const columnas = [
    { header: 'ID', key: 'id' },
    { header: 'Título', key: 'title' },
    {
      header: 'Severidad',
      key: 'severity',
      render: (item: any) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
          item.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-500' :
          item.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'
        }`}>
          {item.severity}
        </span>
      )
    },
    {
      header: 'Estado',
      key: 'status',
      render: (item: any) => (
        <span className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'RESOLVED' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
          {item.status.replace('_', ' ')}
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldAlert className="text-primary-500" />
              Gestión de Incidentes
            </h1>
            <p className="text-slate-500 text-sm mt-1">Supervisión y respuesta ante eventos de seguridad.</p>
          </div>
          <Boton className="flex items-center gap-2">
            <Plus size={18} /> Nuevo Incidente
          </Boton>
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
