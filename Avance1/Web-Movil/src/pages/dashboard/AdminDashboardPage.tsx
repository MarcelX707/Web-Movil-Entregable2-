// src/pages/dashboard/AdminDashboardPage.tsx
import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonMenuButton,
  IonButtons,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';

const AdminDashboardPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            Panel de Administración <IonBadge color="danger">Admin</IonBadge>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Gestión de Usuarios</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Administra los usuarios registrados en la plataforma.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Estadísticas del Sistema</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Revisa métricas y reportes de uso de la plataforma.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AdminDashboardPage;
