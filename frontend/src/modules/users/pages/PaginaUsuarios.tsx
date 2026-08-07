import { useQuery } from '@tanstack/react-query';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { TablaDatos } from '@/components/TablaDatos';
import { usuariosServicio } from '../services/usuarios.servicio';
import { Users, UserPlus } from 'lucide-react';
import { Boton } from '@/components/Boton';

export const PaginaUsuarios = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['usuarios'],
    queryFn: () => usuariosServicio.obtenerTodos(),
  });

  const columnas = [
    { header: 'Nombre', key: 'name' },
    { header: 'Usuario', key: 'username' },
    { header: 'Email', key: 'email' },
    {
      header: 'Rol',
      key: 'role',
      render: (item: any) => (
        <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold text-slate-300 uppercase">
          {item.role}
        </span>
      )
    },
    {
      header: 'Estado',
      key: 'status',
      render: (item: any) => (
        <span className={`flex items-center gap-2 ${item.status === 'ACTIVE' ? 'text-emerald-500' : 'text-red-500'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
          {item.status}
        </span>
      )
    },
  ];

  return (
    <DiseñoBase>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Users className="text-primary-500" />
              Directorio de Usuarios
            </h1>
            <p className="text-slate-500 text-sm mt-1">Administración de identidades y accesos del sistema.</p>
          </div>
          <Boton className="flex items-center gap-2">
            <UserPlus size={18} /> Crear Usuario
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
