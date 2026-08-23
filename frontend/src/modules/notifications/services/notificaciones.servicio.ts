import api from '@/api/api';

export const notificacionesServicio = {
  obtenerMias: async (filtros: any = {}) => {
    const response = await api.get('/notifications/me', { params: filtros });
    return response.data;
  },
  marcarLeida: async (id: number, leida: boolean) => {
    const response = await api.patch(`/notifications/${id}/status`, { leida });
    return response.data;
  },
};
