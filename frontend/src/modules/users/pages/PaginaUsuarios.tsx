import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { TablaDatos } from '@/components/TablaDatos';
import { TarjetaUsuario } from '@/components/TarjetaUsuario';
import { usuariosServicio } from '../services/usuarios.servicio';
import { Users, UserPlus, LayoutGrid, List } from 'lucide-react';
import { Boton } from '@/components/Boton';
import { cn } from '@/shared/utils';

const MOCK_USERS = [
  { id: 1, name: 'Admin Nexus', username: 'admin', email: 'admin@nexus.io', role: 'SUPER_ADMIN', status: 'ACTIVE' },
  { id: 2, name: 'Operador Alpha', username: 'o.alpha', email: 'alpha@nexus.io', role: 'OPERADOR', status: 'ACTIVE' },
  { id: 3, name: 'Auditor Beta', username: 'auditor.b', email: 'beta@nexus.io', role: 'AUDITOR', status: 'INACTIVE' },
];

export const PaginaUsuarios = () => {
  const [view, setView] = useState<'table' | 'grid'>('table');
  const { data, isLoading } = useQuery({
    queryKey: ['usuarios'],
    queryFn: () => usuariosServicio.obtenerTodos(),
  });

  const users = data?.data?.items?.length ? data.data.items : MOCK_USERS;

  const columnas = [
    {
      header: 'Nombre',
      key: 'name',
      render: (item: any) => <span className="font-black italic uppercase tracking-tight">{item.name}</span>
    },
    { header: 'Usuario', key: 'username' },
    { header: 'Email', key: 'email' },
    {
      header: 'Rol',
      key: 'role',
      render: (item: any) => (
        <span className="px-3 py-1 bg-slate-100 rounded-lg text-[9px] font-black text-slate-600 uppercase tracking-widest">
          {item.role}
        </span>
      )
    },
    {
      header: 'Estado',
      key: 'status',
      render: (item: any) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2",
          item.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
        )}>
          <span className={cn("w-1.5 h-1.5 rounded-full", item.status === 'ACTIVE' ? "bg-emerald-500 animate-pulse" : "bg-red-500")}></span>
          {item.status}
        </span>
      )
    },
  ];

  return (
    <DiseñoBase>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 italic uppercase tracking-tighter">
              <Users className="text-primary-600" size={32} />
              Directorio Nexus
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Administración de identidades y suministros de acceso.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-white border border-slate-200 p-1 rounded-2xl shadow-sm">
              <button
                onClick={() => setView('table')}
                className={cn("p-2 rounded-xl transition-all", view === 'table' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setView('grid')}
                className={cn("p-2 rounded-xl transition-all", view === 'grid' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
              >
                <LayoutGrid size={20} />
              </button>
            </div>
            <Boton className="flex items-center gap-2">
              <UserPlus size={18} /> Crear Usuario
            </Boton>
          </div>
        </div>

        {view === 'table' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TablaDatos
              columns={columnas}
              data={users}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {users.map((user: any) => (
              <TarjetaUsuario
                key={user.id}
                name={user.name}
                role={user.role}
                email={user.email}
                status={user.status}
              />
            ))}
          </div>
        )}
      </div>
    </DiseñoBase>
  );
};
