import api from '@/api/api';

export const incidentesServicio = {
  obtenerTodos: async (filtros: any = {}) => {
    const response = await api.get('/incidents', { params: filtros });
    return response.data;
  },
  obtenerPorId: async (id: number) => {
    const response = await api.get(`/incidents/${id}`);
    return response.data;
  },
  crear: async (datos: any) => {
    const response = await api.post('/incidents', datos);
    return response.data;
  },
  actualizar: async (id: number, datos: any) => {
    const response = await api.put(`/incidents/${id}`, datos);
    return response.data;
  },
  eliminar: async (id: number) => {
    const response = await api.delete(`/incidents/${id}`);
    return response.data;
  },
};
