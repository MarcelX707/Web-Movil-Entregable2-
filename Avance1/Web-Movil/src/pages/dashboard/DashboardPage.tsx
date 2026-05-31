// src/pages/dashboard/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonIcon, IonButton, IonButtons,
} from '@ionic/react';
import {
  searchOutline, documentTextOutline, mapOutline,
  folderOutline, personOutline, logOutOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const MENU_CARDS = [
  { label: 'Gestión de Perfil', path: '/profile', icon: personOutline, color: 'primary' },
  { label: 'Búsqueda y Filtrado', path: '/search', icon: searchOutline, color: 'secondary' },
  { label: 'Reportes y Exportación', path: '/reports', icon: documentTextOutline, color: 'tertiary' },
  { label: 'Hoja de Ruta Dinámica', path: '/roadmap', icon: mapOutline, color: 'success' },
  { label: 'Repositorio Documental', path: '/documents', icon: folderOutline, color: 'warning' },
];

const DashboardPage: React.FC = () => {
  const history = useHistory();

  // FIX: usar state para que se actualice si el usuario edita su perfil y vuelve
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    // Se ejecuta cada vez que la página se monta (incluyendo al volver desde Perfil)
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setNombreUsuario(user.nombre || '');
    }
  }, []); // [] = solo al montar; para actualización en tiempo real ver nota abajo

  // Para detectar cambios cuando se navega de vuelta desde perfil,
  // escuchamos el evento de storage (se dispara cuando otro tab escribe)
  // y también leemos al montar gracias al useEffect de arriba.
  useEffect(() => {
    const onStorage = () => {
      const userStr = localStorage.getItem('user');
      if (userStr) setNombreUsuario(JSON.parse(userStr).nombre || '');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // Re-leer localStorage al volver a esta ruta (el history.listen detecta la llegada)
  useEffect(() => {
    return history.listen(() => {
      const userStr = localStorage.getItem('user');
      if (userStr) setNombreUsuario(JSON.parse(userStr).nombre || '');
    });
  }, [history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenido {nombreUsuario ? `"${nombreUsuario}"` : ''}</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" color="danger" onClick={handleLogout}>
              <IonIcon slot="start" icon={logOutOutline} />
              Cerrar Sesión
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="dashboard-content">
        <IonGrid>
          <IonRow>
            {MENU_CARDS.map((card) => (
              <IonCol key={card.path} size="12" sizeMd="6" sizeLg="4">
                <IonCard button onClick={() => history.push(card.path)} className="dashboard-card">
                  <IonCardHeader>
                    <IonIcon icon={card.icon} color={card.color} size="large" />
                    <IonCardTitle>{card.label}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Accede a {card.label.toLowerCase()}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
