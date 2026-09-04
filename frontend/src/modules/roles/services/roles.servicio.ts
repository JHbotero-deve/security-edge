import api from '@/api/api';

export const rolesServicio = {
  obtenerTodos: async () => {
    const response = await api.get('/roles');
    return response.data;
  },
  crear: async (data: { name: string }) => {
    const response = await api.post('/roles', data);
    return response.data;
  },
};
