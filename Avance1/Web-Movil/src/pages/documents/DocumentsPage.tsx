// src/pages/documents/DocumentsPage.tsx
import React, { useState, useEffect } from 'react'; // <-- NUEVO: Importamos useEffect
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon, IonBadge, IonButton,
  IonButtons, IonSearchbar, IonFab, IonFabButton,
  IonGrid, IonRow, IonCol, IonBackButton,
  IonLoading // <-- NUEVO: Para mostrar un símbolo de carga
} from '@ionic/react';
import { documentOutline, downloadOutline, addOutline, folderOpenOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { Documento } from '../../types';
import api from '../../services/api'; // <-- NUEVO: Importamos la conexión a tu backend

// NUEVO: Definimos cómo viene la carpeta desde tu PostgreSQL
interface CarpetaDB {
  id_carpeta: number;
  nombre_carpeta: string;
}

// FIX: cada documento tiene categoría para poder filtrar por carpeta
interface DocumentoConCategoria extends Documento {
  categoria: string; // <-- Lo cambiamos a string general porque ahora vendrá de la BD
}

// Mantenemos tus documentos falsos por ahora, hasta que hagamos el endpoint de documentos en el backend
const TODOS_LOS_DOCUMENTOS: DocumentoConCategoria[] = [
  { id: '1', nombre: 'Resolución N°1234-2024', tipo: 'PDF', fecha: '2024-03-01', estado: 'aprobado', categoria: 'Resoluciones' },
  { id: '2', nombre: 'Resolución N°1100-2023', tipo: 'PDF', fecha: '2023-11-10', estado: 'aprobado', categoria: 'Resoluciones' },
  { id: '3', nombre: 'Formulario de Solicitud', tipo: 'DOCX', fecha: '2024-02-15', estado: 'pendiente', categoria: 'Formularios' },
  { id: '4', nombre: 'Formulario de Permiso Obras', tipo: 'DOCX', fecha: '2024-01-20', estado: 'aprobado', categoria: 'Formularios' },
  { id: '5', nombre: 'Informe Técnico Q1', tipo: 'PDF', fecha: '2024-04-05', estado: 'aprobado', categoria: 'Informes' },
  { id: '6', nombre: 'Informe Ambiental 2023', tipo: 'PDF', fecha: '2023-12-01', estado: 'rechazado', categoria: 'Informes' },
];

const DocumentsPage: React.FC = () => {
  const history = useHistory();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.role === 'admin';

  const [query, setQuery] = useState('');
  
  // NUEVO: Estados para manejar las carpetas reales de la Base de Datos
  const [carpetas, setCarpetas] = useState<CarpetaDB[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  // FIX: estado de carpeta seleccionada. Puede ser el ID de la carpeta o 'Todos'
  const [carpetaActiva, setCarpetaActiva] = useState<number | 'Todos'>('Todos');

  // NUEVO: Esta función va a buscar las carpetas a tu servidor Node.js (EP 2.4)
  useEffect(() => {
    const obtenerCarpetas = async () => {
      try {
        const respuesta = await api.get('/carpetas');
        setCarpetas(respuesta.data); // Guardamos lo que respondió PostgreSQL
      } catch (error) {
        console.error('Error al cargar carpetas desde la API:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerCarpetas();
  }, []); // El arreglo vacío indica que se ejecuta solo una vez al abrir la pantalla

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // NUEVO: Lógica para filtrar los documentos según la carpeta activa
  // (Esto tendrás que ajustarlo cuando los documentos también vengan de la BD)
  const nombreCarpetaActiva = carpetaActiva === 'Todos' 
    ? 'Todos' 
    : carpetas.find(c => c.id_carpeta === carpetaActiva)?.nombre_carpeta || '';

  const documentosFiltrados = TODOS_LOS_DOCUMENTOS.filter(doc => {
    const coincideCarpeta = carpetaActiva === 'Todos' || doc.categoria === nombreCarpetaActiva;
    const coincideBusqueda = doc.nombre.toLowerCase().includes(query.toLowerCase());
    return coincideCarpeta && coincideBusqueda;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorio Documental</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        
        {/* Mostramos esto mientras Node.js busca la info en la BD */}
        <IonLoading isOpen={cargando} message="Cargando carpetas del sistema..." />

        <IonSearchbar 
          value={query} 
          onIonInput={(e: any) => setQuery(e.target.value)} 
          placeholder="Buscar documento..." 
        />

        {/* Sección de Filtros por Carpeta */}
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton 
                fill={carpetaActiva === 'Todos' ? 'solid' : 'outline'} 
                onClick={() => setCarpetaActiva('Todos')}
              >
                Todos
              </IonButton>
            </IonCol>
            
            {/* NUEVO: Iteramos sobre las carpetas reales de la BD */}
            {carpetas.map(carpeta => (
              <IonCol key={carpeta.id_carpeta}>
                <IonButton 
                  fill={carpetaActiva === carpeta.id_carpeta ? 'solid' : 'outline'} 
                  onClick={() => setCarpetaActiva(carpeta.id_carpeta)}
                >
                  {carpeta.nombre_carpeta}
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Lista de Documentos */}
        <IonList>
          {documentosFiltrados.map((doc) => (
            <IonItem key={doc.id}>
              <IonIcon icon={documentOutline} slot="start" />
              <IonLabel>
                <h2>{doc.nombre}</h2>
                <p>{doc.fecha} - {doc.tipo}</p>
              </IonLabel>
              <IonButton fill="clear" slot="end">
                <IonIcon icon={downloadOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        {/* Botón flotante solo para Administradores */}
        {isAdmin && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton>
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DocumentsPage;