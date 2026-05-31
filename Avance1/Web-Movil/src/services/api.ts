import axios from 'axios';

// Creamos la instancia base apuntando al backend local
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==========================================
// INTERCEPTORES (Requisito EP 2.4)
// ==========================================

// Interceptor de Peticiones (Request): 
// Aquí inyectaremos el token JWT más adelante cuando lo tengamos
api.interceptors.request.use(
  (config) => {
    // Ejemplo futuro:
    // const token = localStorage.getItem('token');
    // if (token) { config.headers.Authorization = `Bearer ${token}`; }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Respuestas (Response):
// Capturamos errores globales (ej: si el token expiró o hay error 500)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error capturado por el interceptor:', error.response?.data || error.message);
    
    // Si el error es 401 (No autorizado), podríamos forzar el cierre de sesión aquí
    if (error.response?.status === 401) {
      console.log('Sesión expirada o token inválido');
      // Lógica para redirigir al /login
    }

    return Promise.reject(error);
  }
);

export default api;