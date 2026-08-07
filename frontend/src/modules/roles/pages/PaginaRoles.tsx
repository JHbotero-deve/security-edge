import { useQuery } from '@tanstack/react-query';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { TablaDatos } from '@/components/TablaDatos';
import { rolesServicio } from '../services/roles.servicio';
import { Shield, Key } from 'lucide-react';

export const PaginaRoles = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: () => rolesServicio.obtenerTodos(),
  });

  const columnas = [
    { header: 'ID', key: 'id' },
    {
      header: 'Nombre del Rol',
      key: 'name',
      render: (item: any) => <span className="font-bold text-white">{item.name}</span>
    },
    {
      header: 'Permisos Asignados',
      key: 'permissions',
      render: () => <span className="text-slate-500 italic">Ver detalles...</span>
    },
    {
      header: 'Fecha Creación',
      key: 'createdAt',
      render: (item: any) => new Date(item.createdAt).toLocaleDateString()
    },
  ];

  return (
    <DiseñoBase>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="text-primary-500" />
            Roles y Permisos
          </h1>
          <p className="text-slate-500 text-sm mt-1">Configuración del modelo de control de acceso basado en roles (RBAC).</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-start gap-4 mb-6">
          <div className="bg-amber-500/10 text-amber-500 p-3 rounded-xl">
            <Key size={24} />
          </div>
          <div>
            <h3 className="text-white font-semibold">Política de Mínimo Privilegio</h3>
            <p className="text-slate-400 text-sm mt-1 leading-relaxed">
              Recuerde que los cambios en los roles afectan el acceso inmediato de los usuarios a funciones críticas del sistema.
            </p>
          </div>
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
