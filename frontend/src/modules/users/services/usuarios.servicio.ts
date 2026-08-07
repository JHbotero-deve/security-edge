import api from '@/api/api';

export const usuariosServicio = {
  obtenerTodos: async (filtros: any = {}) => {
    const response = await api.get('/users', { params: filtros });
    return response.data;
  },
  obtenerPorId: async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  crear: async (datos: any) => {
    const response = await api.post('/users', datos);
    return response.data;
  },
  actualizar: async (id: number, datos: any) => {
    const response = await api.put(`/users/${id}`, datos);
    return response.data;
  },
  eliminar: async (id: number) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
