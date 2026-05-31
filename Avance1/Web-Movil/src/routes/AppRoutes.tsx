// src/routes/AppRoutes.tsx
import React from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ProfilePage from '../pages/profile/ProfilePage';
import SearchPage from '../pages/search/SearchPage';
import ReportsPage from '../pages/reports/ReportsPage';
import RoadmapPage from '../pages/roadmap/RoadmapPage';
import DocumentsPage from '../pages/documents/DocumentsPage';
import AdminDashboardPage from '../pages/dashboard/AdminDashboardPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

/**
 * AppRoutes — rutas de la aplicación.
 *
 * Públicas:   /login, /register
 * Protegidas: /dashboard, /profile, /search, /reports, /roadmap, /documents
 * Admin:      /admin/dashboard
 * Raíz /      → redirige a /login
 */
const AppRoutes: React.FC = () => {
  return (
    <IonRouterOutlet>

      {/* Públicas */}
      <PublicRoute exact path="/login" component={LoginPage} restricted />
      <PublicRoute exact path="/register" component={RegisterPage} restricted />

      {/* Protegidas — requieren autenticación */}
      <PrivateRoute exact path="/dashboard" component={DashboardPage} />
      <PrivateRoute exact path="/profile" component={ProfilePage} />
      <PrivateRoute exact path="/search" component={SearchPage} />
      <PrivateRoute exact path="/reports" component={ReportsPage} />
      <PrivateRoute exact path="/roadmap" component={RoadmapPage} />
      <PrivateRoute exact path="/documents" component={DocumentsPage} />
      
      {/* Solo admin */}
      <PrivateRoute exact path="/admin/dashboard" component={AdminDashboardPage} requiredRole="admin" />

      {/* Raíz */}
      <Route exact path="/" render={() => <Redirect to="/login" />} />
    </IonRouterOutlet>
  );
};

export default AppRoutes;
