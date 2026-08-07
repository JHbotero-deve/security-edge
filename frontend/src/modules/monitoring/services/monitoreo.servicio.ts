import api from '@/api/api';

export const monitoreoServicio = {
  obtenerMetricas: async (filtros: any = {}) => {
    const response = await api.get('/monitoring', { params: filtros });
    return response.data;
  },
};
