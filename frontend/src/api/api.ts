import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // ELIMINADO: Redirección automática a /login.
    // Para el "Nexus Supermarket", permitimos que la UI maneje los fallos de auth
    // o muestre datos de prueba sin expulsar al usuario.

    if (error.response?.status === 401) {
      console.warn('Sesión no iniciada o expirada. Operando en modo Showcase / Vista Previa.');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
