// src/services/auth.service.ts
import axios from 'axios';
import { User } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Configurar interceptor para agregar token JWT a todas las peticiones
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta para manejar errores de autenticación
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      AuthService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const AuthService = {
  /**
   * Inicia sesión con email y contraseña
   */
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { user, token };
  },

  /**
   * Login con Google OAuth
   */
  loginWithGoogle: (): void => {
    window.location.href = `${API_URL}/auth/google`;
  },

  /**
   * Login con Clave Única del gobierno de Chile
   */
  loginWithClaveUnica: (): void => {
    window.location.href = `${API_URL}/auth/claveunica`;
  },

  /**
   * Registra un nuevo usuario
   */
  register: async (userData: {
    nombre: string;
    apellido: string;
    rut: string;
    email: string;
    region: string;
    comuna: string;
    password: string;
  }): Promise<{ user: User; token: string }> => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { user, token };
  },

  /**
   * Cierra la sesión del usuario
   */
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Retorna el usuario actual desde localStorage
   */
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },

  /**
   * Retorna el token JWT actual
   */
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  /**
   * Actualiza los datos de perfil del usuario en la base de datos real
   */
  updateProfile: async (id: string, profileData: {
    nombre: string;
    apellido: string;
    email: string;
  }): Promise<User> => {
    const response = await axios.put(`${API_URL}/auth/profile/${id}`, profileData);
    const updatedUser = response.data;
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  },

  /**
   * Verifica si el usuario tiene rol de administrador
   */
  isAdmin: (): boolean => {
    const user = AuthService.getCurrentUser();
    return user?.role === 'admin';
  },
};

export default AuthService;
