import api from '@/api/api';

export const rolesServicio = {
  obtenerTodos: async () => {
    const response = await api.get('/roles');
    return response.data;
  },
};
