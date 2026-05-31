// src/pages/roadmap/RoadmapPage.tsx
import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon, IonBadge, IonButton,
  IonButtons, IonGrid, IonRow, IonCol, IonCard, IonCardContent,
  IonText, IonBackButton,
} from '@ionic/react';
import {
  checkmarkCircleOutline, timeOutline, ellipseOutline,
  addOutline, createOutline, gitBranchOutline, logOutOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { PasoHojaRuta } from '../../types';

const PASOS_DEMO: PasoHojaRuta[] = [
  { id: '1', titulo: 'Solicitud inicial', descripcion: 'Presentación de documentos requeridos', estado: 'completado', fechaEstimada: '2024-01-15' },
  { id: '2', titulo: 'Revisión municipal', descripcion: 'Evaluación por el departamento correspondiente', estado: 'en_progreso', fechaEstimada: '2024-02-01', dependencias: ['1'] },
  { id: '3', titulo: 'Aprobación', descripcion: 'Emisión de resolución oficial', estado: 'pendiente', fechaEstimada: '2024-03-01', dependencias: ['2'] },
];

const getEstadoIcon = (estado: PasoHojaRuta['estado']) =>
  ({ completado: checkmarkCircleOutline, en_progreso: timeOutline, pendiente: ellipseOutline }[estado]);

const getEstadoColor = (estado: PasoHojaRuta['estado']) =>
  ({ completado: 'success', en_progreso: 'primary', pendiente: 'medium' }[estado]);

const RoadmapPage: React.FC = () => {
  const history = useHistory();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" text="Volver" />
          </IonButtons>
          <IonTitle>Gestión de Hoja de Ruta Dinámica</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" color="danger" onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
              Cerrar Sesión
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="8">
              <IonList>
                {PASOS_DEMO.map((paso, index) => (
                  <IonItem key={paso.id} className="roadmap-item">
                    <IonIcon slot="start" icon={getEstadoIcon(paso.estado)} color={getEstadoColor(paso.estado)} size="large" />
                    <IonLabel>
                      <h2>{index + 1}. {paso.titulo}</h2>
                      <p>{paso.descripcion}</p>
                      {paso.fechaEstimada && <IonText color="medium"><p>Fecha estimada: {paso.fechaEstimada}</p></IonText>}
                      {paso.dependencias && paso.dependencias.length > 0 && (
                        <div className="dependencias">
                          <IonIcon icon={gitBranchOutline} size="small" />
                          <span> Depende de: Paso {paso.dependencias.join(', ')}</span>
                        </div>
                      )}
                    </IonLabel>
                    <IonBadge color={getEstadoColor(paso.estado)} slot="end">
                      {paso.estado.replace('_', ' ')}
                    </IonBadge>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>

            {isAdmin && (
              <IonCol size="12" sizeMd="4">
                <IonCard>
                  <IonCardContent>
                    <h3>Gestión</h3>
                    <IonButton expand="block"><IonIcon slot="start" icon={addOutline} />Añadir Tarea</IonButton>
                    <IonButton expand="block" fill="outline" style={{ marginTop: '0.5rem' }}>
                      <IonIcon slot="start" icon={createOutline} />Editar Dependencias
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>

        <div className="roadmap-footer-actions">
          <IonButton color="success">Guardar Cambios</IonButton>
          <IonButton fill="outline" color="medium" onClick={() => history.push('/dashboard')}>Cancelar</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RoadmapPage;
