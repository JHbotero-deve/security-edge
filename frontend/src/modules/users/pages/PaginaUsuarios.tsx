import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { TablaDatos } from '@/components/TablaDatos';
import { TarjetaUsuario } from '@/components/TarjetaUsuario';
import { usuariosServicio } from '../services/usuarios.servicio';
import { Users, UserPlus, LayoutGrid, List, Search, Filter, Edit2, Trash2, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';
import { Boton } from '@/components/Boton';
import { Entrada } from '@/components/Entrada';
import { Modal } from '@/components/Modal';
import { cn } from '@/shared/utils';

export const PaginaUsuarios = () => {
  const queryClient = useQueryClient();
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading } = useQuery({
    queryKey: ['usuarios', { search, role: roleFilter, status: statusFilter, page, limit }],
    queryFn: () => usuariosServicio.obtenerTodos({ search, role: roleFilter, status: statusFilter, page, limit }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => usuariosServicio.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });

  const users = data?.data?.items || [];
  const meta = data?.data?.meta || { total: 0, page: 1, totalPages: 1 };

  const handleEdit = (user: any) => {
    usuariosServicio.obtenerPorId(user.id).then(res => {
      console.log('User data loaded for edit:', res.data);
      // Aqui se abriria el modal con los datos para editar
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      deleteMutation.mutate(id);
    }
  };

  const columnas = [
    {
      header: 'Identidad',
      key: 'name',
      render: (item: any) => (
        <div className="flex flex-col">
          <span className="font-black italic uppercase tracking-tight text-slate-900">{item.name}</span>
          <span className="text-[9px] text-slate-400 font-bold tracking-widest lowercase">@{item.username}</span>
        </div>
      )
    },
    { header: 'Contacto', key: 'email', render: (item: any) => <span className="text-slate-500 font-medium">{item.email}</span> },
    {
      header: 'Rango Nexus',
      key: 'role',
      render: (item: any) => (
        <span className="px-3 py-1 bg-slate-100 rounded-lg text-[9px] font-black text-slate-600 uppercase tracking-widest shadow-sm">
          {item.role}
        </span>
      )
    },
    {
      header: 'Suministro',
      key: 'status',
      render: (item: any) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 shadow-sm",
          item.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
        )}>
          <span className={cn("w-1.5 h-1.5 rounded-full", item.status === 'ACTIVE' ? "bg-emerald-500 animate-pulse" : "bg-red-500")}></span>
          {item.status}
        </span>
      )
    },
    {
      header: 'Acciones',
      key: 'actions',
      render: (item: any) => (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(item)} className="p-2 bg-slate-50 hover:bg-primary-50 text-slate-400 hover:text-primary-600 rounded-xl transition-all">
            <Edit2 size={14} />
          </button>
          <button onClick={() => handleDelete(item.id)} className="p-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all">
            <Trash2 size={14} />
          </button>
        </div>
      )
    }
  ];

  return (
    <DiseñoBase>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-4 italic uppercase tracking-tighter">
              <div className="bg-primary-600 p-2 rounded-2xl shadow-lg shadow-primary-500/30">
                <Users className="text-white" size={32} />
              </div>
              Nexus Directory
            </h1>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-2 ml-1 opacity-60">Identidades | Accesos | Auditoría</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-white border border-slate-200 p-1.5 rounded-[1.5rem] shadow-xl">
              <button
                onClick={() => setView('table')}
                className={cn("p-3 rounded-[1.2rem] transition-all", view === 'table' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
              >
                <List size={22} />
              </button>
              <button
                onClick={() => setView('grid')}
                className={cn("p-3 rounded-[1.2rem] transition-all", view === 'grid' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
              >
                <LayoutGrid size={22} />
              </button>
            </div>
            <Boton onClick={() => setIsModalOpen(true)} className="rounded-[1.5rem] px-8 py-4 shadow-2xl">
              <UserPlus size={20} /> Deploy Identity
            </Boton>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white/50 backdrop-blur-md border border-slate-200 p-6 rounded-[2.5rem] shadow-xl flex flex-col lg:flex-row items-end gap-6">
          <div className="flex-1 w-full">
            <Entrada
              placeholder="Buscar por nombre, usuario o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none bg-slate-100/50"
              label="Terminal de Búsqueda"
            />
          </div>

          <div className="w-full lg:w-48 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Rango Nexus</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-5 py-4 bg-slate-100/50 border-2 border-transparent rounded-[1.5rem] text-xs font-bold text-slate-700 focus:outline-none focus:border-primary-500 transition-all cursor-pointer"
            >
              <option value="">Todos los Rangos</option>
              <option value="ADMIN">ADMIN</option>
              <option value="OPERATOR">OPERATOR</option>
              <option value="USER">USER</option>
            </select>
          </div>

          <div className="w-full lg:w-48 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Estatus Suministro</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-5 py-4 bg-slate-100/50 border-2 border-transparent rounded-[1.5rem] text-xs font-bold text-slate-700 focus:outline-none focus:border-primary-500 transition-all cursor-pointer"
            >
              <option value="">Todos los Estatus</option>
              <option value="ACTIVE">ACTIVO</option>
              <option value="INACTIVE">INACTIVO</option>
            </select>
          </div>

          <Boton
            variant="secondary"
            onClick={() => { setSearch(''); setRoleFilter(''); setStatusFilter(''); setPage(1); }}
            className="rounded-[1.5rem] p-4 aspect-square flex items-center justify-center border-none shadow-none hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={20} />
          </Boton>
        </div>

        {/* Content Section */}
        {view === 'table' ? (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <TablaDatos
              columns={columnas}
              data={users}
              isLoading={isLoading}
              emptyMessage="No se encontraron identidades en el sector Nexus"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {users.map((user: any) => (
              <TarjetaUsuario
                key={user.id}
                id={user.id}
                name={user.name}
                role={user.role}
                email={user.email}
                status={user.status}
                onEdit={() => handleEdit(user)}
                onDelete={() => handleDelete(user.id)}
                className="hover:scale-[1.02]"
              />
            ))}
            {users.length === 0 && !isLoading && (
              <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
                <Users size={64} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-black uppercase tracking-widest italic">No se detectaron suministros</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination Section */}
        <div className="flex items-center justify-between px-6 py-6 bg-white border border-slate-200 rounded-[2rem] shadow-xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Showing <span className="text-slate-900">{users.length}</span> of <span className="text-slate-900">{meta.total}</span> Identidades
          </p>
          <div className="flex items-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-3 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 rounded-xl transition-all text-slate-600"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {[...Array(meta.totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={cn(
                    "w-10 h-10 rounded-xl text-xs font-black transition-all",
                    page === i + 1 ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20" : "hover:bg-slate-50 text-slate-400"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              disabled={page === meta.totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-3 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 rounded-xl transition-all text-slate-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Create User Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Deploy New Nexus Identity"
        >
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            console.log('Initializing security profile deployment...');
            setIsModalOpen(false);
          }}>
            <div className="grid grid-cols-2 gap-4">
              <Entrada label="Nombre Completo" placeholder="e.g. John Doe" required />
              <Entrada label="ID Usuario" placeholder="e.g. jdoe" required />
            </div>
            <Entrada label="Correo Corporativo" placeholder="email@nexus.io" type="email" required />
            <Entrada label="Security Key (Password)" type="password" required />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nexus Level</label>
                <select className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] text-xs font-bold text-slate-700 focus:border-primary-500 transition-all">
                  <option value="USER">USER</option>
                  <option value="OPERATOR">OPERATOR</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Status Protocol</label>
                <select className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] text-xs font-bold text-slate-700 focus:border-primary-500 transition-all">
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
            </div>

            <Boton className="w-full py-5 rounded-[1.8rem] text-xs shadow-2xl mt-4">
              <UserCheck size={18} /> Initialize Security Profile
            </Boton>
          </form>
        </Modal>
      </div>
    </DiseñoBase>
  );
};
