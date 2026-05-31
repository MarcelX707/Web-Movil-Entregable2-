// src/routes/PublicRoute.tsx
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import AuthService from '../services/auth.service';

interface PublicRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  restricted?: boolean; // true = no accesible si ya hay sesión (ej: login)
}

/**
 * PublicRoute — ruta pública.
 * Si restricted=true y el usuario ya está autenticado, redirige al dashboard.
 */
const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  restricted = false,
  ...rest
}) => {
  const isAuthenticated = AuthService.isAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (restricted && isAuthenticated) {
          return <Redirect to="/dashboard" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PublicRoute;
