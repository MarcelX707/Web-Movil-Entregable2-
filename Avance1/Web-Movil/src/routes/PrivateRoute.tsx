// src/routes/PrivateRoute.tsx
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { UserRole } from '../types';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  requiredRole?: UserRole;
}

/**
 * PrivateRoute — ruta protegida que redirige a /login si no hay sesión activa.
 * Si se especifica requiredRole, verifica además que el usuario tenga ese rol.
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  requiredRole,
  ...rest
}) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const currentUser = AuthService.getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        // Sin sesión → redirigir al login
        if (!isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }

        // Rol insuficiente → redirigir al dashboard
        if (requiredRole && currentUser?.role !== requiredRole) {
          return <Redirect to="/dashboard" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
