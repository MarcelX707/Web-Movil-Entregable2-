// src/components/layout/AppLayout.tsx
import React from 'react';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonButtons,
  IonButton,
  IonSplitPane,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
} from '@ionic/react';
import {
  homeOutline,
  personOutline,
  searchOutline,
  documentTextOutline,
  mapOutline,
  folderOutline,
  logOutOutline,
  shieldOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/auth.service';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', path: '/dashboard', icon: homeOutline },
  { label: 'Mi Perfil', path: '/profile', icon: personOutline },
  { label: 'Búsqueda y Filtrado', path: '/search', icon: searchOutline },
  { label: 'Reportes', path: '/reports', icon: documentTextOutline },
  { label: 'Hoja de Ruta', path: '/roadmap', icon: mapOutline },
  { label: 'Documentos', path: '/documents', icon: folderOutline },
  { label: 'Admin Panel', path: '/admin/dashboard', icon: shieldOutline, adminOnly: true },
];

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * AppLayout — layout adaptativo:
 * - En web (IonSplitPane): muestra menú lateral + contenido
 * - En móvil: menú hamburguesa + barra de tabs inferior
 */
const AppLayout: React.FC<AppLayoutProps> = ({ children, title = 'Municipalidad' }) => {
  const history = useHistory();
  const isAdmin = AuthService.isAdmin();
  const currentUser = AuthService.getCurrentUser();

  const visibleItems = NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin);

  const handleLogout = () => {
    AuthService.logout();
    history.push('/login');
  };

  return (
    <IonSplitPane contentId="main-content" when="lg">
      {/* ── Menú lateral (visible en web/tablet) ─── */}
      <IonMenu contentId="main-content" type="overlay">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>
              <div className="menu-logo">
                <img
                  src="/assets/logo-municipalidad.png"
                  alt="Municipalidad de Santo Domingo"
                  height={36}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span>Municipalidad</span>
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {/* Info del usuario */}
          <div className="menu-user-info">
            <IonIcon icon={personOutline} size="large" />
            <p>{currentUser ? `${currentUser.nombre} ${currentUser.apellido}` : 'Usuario'}</p>
            <span className="role-badge">
              {currentUser?.role === 'admin' ? 'Administrador' : 'Usuario'}
            </span>
          </div>

          {/* Links de navegación */}
          <IonList lines="none">
            {visibleItems.map((item) => (
              <IonItem
                key={item.path}
                button
                routerLink={item.path}
                routerDirection="root"
                detail={false}
                className="menu-item"
              >
                <IonIcon slot="start" icon={item.icon} />
                <IonLabel>{item.label}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>

        {/* Botón cerrar sesión al fondo del menú */}
        <div className="menu-footer">
          <IonButton expand="block" fill="clear" color="danger" onClick={handleLogout}>
            <IonIcon slot="start" icon={logOutOutline} />
            Cerrar Sesión
          </IonButton>
        </div>
      </IonMenu>

      {/* ── Contenido principal ──────────────────────── */}
      <div id="main-content">
        {children}
      </div>
    </IonSplitPane>
  );
};

export default AppLayout;
