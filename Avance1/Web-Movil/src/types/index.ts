// src/types/index.ts

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  rut: string;
  email: string;
  region: string;
  comuna: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface Documento {
  id: string;
  nombre: string;
  tipo: string;
  fecha: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  url?: string;
}

export interface PasoHojaRuta {
  id: string;
  titulo: string;
  descripcion: string;
  estado: 'completado' | 'en_progreso' | 'pendiente';
  fechaEstimada?: string;
  dependencias?: string[];
}

export interface Reporte {
  tipo: string;
  fechaInicio: string;
  fechaFin: string;
  formato: 'pdf' | 'excel';
}
