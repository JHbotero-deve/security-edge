import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { TablaDatos } from '@/components/TablaDatos';
import { rolesServicio } from '../services/roles.servicio';
import { Shield, Key, Plus } from 'lucide-react';
import { Boton } from '@/components/Boton';
import { Modal } from '@/components/Modal';
import { Entrada } from '@/components/Entrada';

export const PaginaRoles = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: () => rolesServicio.obtenerTodos(),
  });

  const mutation = useMutation({
    mutationFn: rolesServicio.crear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      setIsModalOpen(false);
      setNewRoleName('');
    },
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoleName.trim()) {
      mutation.mutate({ name: newRoleName });
    }
  };

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
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 italic uppercase tracking-tighter">
              <Shield className="text-primary-600" size={32} />
              Roles y Permisos
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Configuración del modelo de control de acceso basado en roles (RBAC).</p>
          </div>

          <Boton onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus size={18} /> Crear Rol
          </Boton>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] flex items-start gap-4 mb-6 shadow-2xl">
          <div className="bg-amber-500/10 text-amber-500 p-3 rounded-2xl">
            <Key size={24} />
          </div>
          <div>
            <h3 className="text-white font-black italic uppercase text-xs tracking-widest">Política de Mínimo Privilegio</h3>
            <p className="text-slate-400 text-[11px] mt-1 leading-relaxed font-bold italic">
              Recuerde que los cambios en los roles afectan el acceso inmediato de los usuarios a funciones críticas del sistema.
            </p>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TablaDatos
            columns={columnas}
            data={data?.data || []}
            isLoading={isLoading}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear Nuevo Rol"
      >
        <form onSubmit={handleCreate} className="space-y-6">
          <Entrada
            label="Nombre del Rol"
            placeholder="Ej: Auditor Senior"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            required
            autoFocus
          />
          <div className="flex justify-end gap-3 pt-4">
            <Boton
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Boton>
            <Boton
              type="submit"
              isLoading={mutation.isPending}
              disabled={!newRoleName.trim()}
            >
              Guardar Rol
            </Boton>
          </div>
        </form>
      </Modal>
    </DiseñoBase>
  );
};
