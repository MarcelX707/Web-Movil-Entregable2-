// src/pages/search/SearchPage.tsx
import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonList, IonItem, IonLabel, IonChip,
  IonButtons, IonButton, IonIcon, IonSelect, IonSelectOption,
  IonSkeletonText, IonText, IonBackButton,
} from '@ionic/react';
import { logOutOutline, filterOutline, closeCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface Tramite {
  id: string; nombre: string; estado: string; fecha: string; tipo: string;
}

const ESTADOS = ['Todos', 'Pendiente', 'En Proceso', 'Aprobado', 'Rechazado'];
const TIPOS = ['Todos', 'Patente', 'Permiso', 'Certificado', 'Licencia'];

const TRAMITES_DEMO: Tramite[] = [
  { id: '1', nombre: 'Patente Comercial 2024', estado: 'Aprobado', fecha: '2024-03-15', tipo: 'Patente' },
  { id: '2', nombre: 'Permiso de Obras', estado: 'Pendiente', fecha: '2024-04-01', tipo: 'Permiso' },
  { id: '3', nombre: 'Certificado de Residencia', estado: 'En Proceso', fecha: '2024-04-10', tipo: 'Certificado' },
];

const SearchPage: React.FC = () => {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('Todos');
  const [tipoFiltro, setTipoFiltro] = useState('Todos');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const filtrados = TRAMITES_DEMO.filter((t) => {
    const matchQuery = t.nombre.toLowerCase().includes(query.toLowerCase());
    const matchEstado = estadoFiltro === 'Todos' || t.estado === estadoFiltro;
    const matchTipo = tipoFiltro === 'Todos' || t.tipo === tipoFiltro;
    return matchQuery && matchEstado && matchTipo;
  });

  const getEstadoColor = (estado: string) => {
    const map: Record<string, string> = {
      Aprobado: 'success', Pendiente: 'warning', 'En Proceso': 'primary', Rechazado: 'danger',
    };
    return map[estado] || 'medium';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" text="Volver" />
          </IonButtons>
          <IonTitle>Búsqueda y Filtrado</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" color="danger" onClick={handleLogout}>
              <IonIcon slot="start" icon={logOutOutline} />
              Cerrar Sesión
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSearchbar value={query} onIonChange={(e) => setQuery(e.detail.value!)} placeholder="Buscar trámite..." showClearButton="focus" />

        <div className="filter-row">
          <IonIcon icon={filterOutline} />
          <IonSelect value={estadoFiltro} onIonChange={(e) => setEstadoFiltro(e.detail.value)} placeholder="Estado">
            {ESTADOS.map((e) => <IonSelectOption key={e} value={e}>{e}</IonSelectOption>)}
          </IonSelect>
          <IonSelect value={tipoFiltro} onIonChange={(e) => setTipoFiltro(e.detail.value)} placeholder="Tipo">
            {TIPOS.map((t) => <IonSelectOption key={t} value={t}>{t}</IonSelectOption>)}
          </IonSelect>
        </div>

        {filtrados.length === 0 ? (
          <div className="empty-state">
            <IonIcon icon={closeCircleOutline} size="large" color="medium" />
            <IonText color="medium"><p>No se encontraron resultados.</p></IonText>
          </div>
        ) : (
          <IonList>
            {filtrados.map((t) => (
              <IonItem key={t.id} button detail>
                <IonLabel>
                  <h2>{t.nombre}</h2>
                  <p>{t.tipo} · {t.fecha}</p>
                </IonLabel>
                <IonChip color={getEstadoColor(t.estado)} slot="end">{t.estado}</IonChip>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
