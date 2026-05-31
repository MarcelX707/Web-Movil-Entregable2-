// src/pages/reports/ReportsPage.tsx
import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonSelect, IonSelectOption, IonButton,
  IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardContent,
  IonButtons, IonBackButton, IonInput,
} from '@ionic/react';
import { downloadOutline, printOutline, mailOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const TIPOS_REPORTE = ['Trámites por Estado', 'Documentos Emitidos', 'Actividad de Usuarios', 'Resumen Mensual'];

const ReportsPage: React.FC = () => {
  const history = useHistory();
  const [tipoReporte, setTipoReporte] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

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
          <IonTitle>Reportes y Exportación</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" color="danger" onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
              Cerrar Sesión
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            {/* Panel izquierdo: configuración */}
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardContent>
                  <h3>Tipo de Reporte</h3>
                  <IonItem>
                    <IonLabel>Seleccionar tipo</IonLabel>
                    <IonSelect
                      value={tipoReporte}
                      onIonChange={(e) => setTipoReporte(e.detail.value)}
                      placeholder="Elige un reporte"
                    >
                      {TIPOS_REPORTE.map((t) => (
                        <IonSelectOption key={t} value={t}>{t}</IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>

                  {/* FIX: usar input type="date" nativo en vez de IonDatetime embebido
                      para evitar que el calendario se solape con el label "Desde/Hasta" */}
                  <h3 style={{ marginTop: '1rem' }}>Rango de Fecha</h3>

                  <IonItem>
                    <IonLabel position="stacked">Desde</IonLabel>
                    <IonInput
                      type="date"
                      value={fechaInicio}
                      onIonChange={(e) => setFechaInicio(e.detail.value as string)}
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Hasta</IonLabel>
                    <IonInput
                      type="date"
                      value={fechaFin}
                      onIonChange={(e) => setFechaFin(e.detail.value as string)}
                    />
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Panel derecho: vista previa y acciones */}
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardContent>
                  <h3>Vista Previa</h3>
                  <div className="report-preview">
                    {tipoReporte ? (
                      <div>
                        <p>Reporte: <strong>{tipoReporte}</strong></p>
                        {fechaInicio && <p>Desde: {fechaInicio}</p>}
                        {fechaFin && <p>Hasta: {fechaFin}</p>}
                      </div>
                    ) : (
                      <p className="preview-placeholder">Selecciona un tipo de reporte.</p>
                    )}
                  </div>
                </IonCardContent>
              </IonCard>

              <div className="report-actions">
                <IonButton expand="block" color="primary" disabled={!tipoReporte}>
                  <IonIcon slot="start" icon={downloadOutline} /> Descargar PDF
                </IonButton>
                <IonButton expand="block" color="success" disabled={!tipoReporte}>
                  <IonIcon slot="start" icon={printOutline} /> Exportar Excel
                </IonButton>
                <IonButton expand="block" fill="outline" disabled={!tipoReporte}>
                  <IonIcon slot="start" icon={mailOutline} /> Enviar Por Correo
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReportsPage;
