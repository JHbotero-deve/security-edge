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
<<<<<<< HEAD
    const status = error.response?.status;
    const method = (error.config?.method || '').toLowerCase();
    const isWriteAction = ['post', 'put', 'patch', 'delete'].includes(method);

    if (status === 401) {
      localStorage.removeItem('token');

      if (isWriteAction) {
        // MURO: crear, guardar, editar o borrar algo es una acción real y
        // requiere cuenta registrada. No se disfraza de éxito ni se guarda
        // nada "por detrás" — se bloquea y se manda a iniciar sesión.
        alert('Esta acción requiere una cuenta registrada. Puedes seguir mirando la aplicación, pero para guardar, crear o modificar datos necesitas iniciar sesión.');
        window.location.href = '/login';
      } else {
        // PUERTA: mirar/explorar la app sigue abierto sin registro (modo Showcase).
        console.warn('Sesión no iniciada o expirada. Mostrando datos de vista previa.');
      }
=======
    // ELIMINADO: Redirección automática a /login.
    // Para el "Nexus Supermarket", permitimos que la UI maneje los fallos de auth
    // o muestre datos de prueba sin expulsar al usuario.

    if (error.response?.status === 401) {
      console.warn('Sesión no iniciada o expirada. Operando en modo Showcase / Vista Previa.');
      localStorage.removeItem('token');
>>>>>>> origin/main
    }
    return Promise.reject(error);
  }
);

export default api;
