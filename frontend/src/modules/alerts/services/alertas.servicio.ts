import api from '@/api/api';

export const alertasServicio = {
  obtenerTodas: async () => {
    const response = await api.get('/alerts');
    return response.data;
  },
  obtenerPorId: async (id: number) => {
    const response = await api.get(`/alerts/${id}`);
    return response.data;
  },
};
