import api from '@/api/api';

export const auditoriaServicio = {
  obtenerLogs: async (filtros: any = {}) => {
    const response = await api.get('/audit', { params: filtros });
    return response.data;
  },
};
