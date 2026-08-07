import api from '@/api/api';

export const configuracionServicio = {
  obtenerTodas: async () => {
    const response = await api.get('/settings');
    return response.data;
  },
  actualizar: async (id: number, valor: string) => {
    const response = await api.put(`/settings/${id}`, { value: valor });
    return response.data;
  },
};
