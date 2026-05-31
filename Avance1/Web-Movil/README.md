# Plataforma Municipal - Municipalidad de Santo Domingo

**Ingeniería Web y Móvil — ICI 4247 | Entrega Parcial 1**

## Descripción

Plataforma web y móvil para la gestión de trámites municipales de la Municipalidad de Santo Domingo. Desarrollada con Ionic + React (frontend) y Node.js/Express (backend), permite a ciudadanos y funcionarios gestionar documentos, seguir el estado de trámites y generar reportes.

---

## Integrantes del Grupo

Benjamin Leiva,
Marcel Gutierrez,
Martin Basulto

---

## Estructura del Proyecto

```
src/
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx          # Login con Gmail, Clave Única y email/password
│   │   └── RegisterPage.tsx       # Registro con validación de RUT y campos completos
│   ├── dashboard/
│   │   ├── DashboardPage.tsx      # Dashboard principal del usuario
│   │   └── AdminDashboardPage.tsx # Panel exclusivo para administradores
│   ├── profile/
│   │   └── ProfilePage.tsx        # Gestión de perfil de usuario
│   ├── search/
│   │   └── SearchPage.tsx         # Búsqueda y filtrado de trámites
│   ├── reports/
│   │   └── ReportsPage.tsx        # Generación y exportación de reportes
│   ├── roadmap/
│   │   └── RoadmapPage.tsx        # Hoja de ruta dinámica de trámites
│   └── documents/
│       └── DocumentsPage.tsx      # Repositorio documental
├── components/
│   └── layout/
│       └── AppLayout.tsx          # Layout con menú lateral (web) y adaptativo (móvil)
├── routes/
│   ├── AppRoutes.tsx              # Definición central de todas las rutas
│   ├── PrivateRoute.tsx           # HOC para rutas protegidas con control de roles
│   └── PublicRoute.tsx            # HOC para rutas públicas (redirige si hay sesión)
├── services/
│   └── auth.service.ts            # Servicio de autenticación JWT + OAuth
├── hooks/
│   └── useAuth.ts                 # Hook personalizado de estado de autenticación
├── types/
│   └── index.ts                   # Tipos TypeScript globales
└── theme/
    ├── variables.css              # Variables CSS del tema municipal
    └── global.css                 # Estilos globales de la aplicación
```

---

## EP 1.1 — Requerimientos del Sistema
### Requerimientos Funcionales
Se definen 7 requerimientos funcionales diferenciados, cada uno asociado a un módulo específico de la plataforma. El inicio de sesión y el registro de usuario son condiciones base del sistema y están inmersas en la propuesta.
| N° | Módulo | Descripción |
|------|-----------|-------------|
| RF1 | Autenticación y Autorización | Los usuarios acceden a la plataforma mediante correo/contraseña, Gmail (OAuth) o Clave Única del gobierno. El sistema diferencia dos roles: usuario y administrador, restringiendo el acceso a funcionalidades según el perfil. |
| RF2 | Gestión de Perfil | El usuario puede visualizar y editar su información personal (nombre, apellido, RUT, correo, región, comuna) con validación visual inmediata en los campos del formulario. |
| RF3 | Búsqueda y Filtrado | La plataforma permite buscar trámites municipales en tiempo real con filtros por estado (pendiente, en proceso, aprobado, rechazado) y por tipo (patente, permiso, certificado, licencia). |
| RF4 | Reportes y Exportación | El sistema genera reportes de trámites configurables por tipo y rango de fecha, con opciones de descarga en PDF, exportación a Excel y envío por correo electrónico. |
| RF5 | Gestión de Hoja de Ruta Dinámica | Visualización del estado de avance de los trámites por fases (completado, en progreso, pendiente) con gestión de dependencias entre etapas. El administrador puede añadir tareas y editar dependencias. |
| RF6 | Repositorio Documental | Módulo de gestión de archivos organizado en carpetas (Resoluciones, Formularios, Informes) con búsqueda por nombre, descarga de documentos y, para el rol administrador, subida de archivos y creación de carpetas |
| RF7 | Sistema de Trazabilidad | El sistema permite seguir el estado de cada trámite a lo largo del tiempo, identificar en qué etapa se encuentra, y visualizar el historial de cambios para garantizar transparencia en el proceso. |
### Requerimientos No Funcionales
| N° | Módulo | Descripción |
|------|-----------|-------------|
| RNF1 | Usabilidad | La interfaz debe ser intuitiva para usuarios con nivel tecnológico básico a intermedio, con botones grandes, etiquetas claras y retroalimentación visual inmediata en formularios y acciones. |
| RNF2 | Eficiencia de Acceso | El sistema debe responder a las acciones del usuario en menos de 2 segundos en condiciones normales de red. Las pantallas deben cargarse de forma progresiva para no bloquear la interacción. |
| RNF3 | Adaptabilidad | La plataforma debe funcionar correctamente en dispositivos móviles y de escritorio, adaptando la navegación: menú lateral (IonSplitPane) en web y botón hamburguesa en móvil. |

## EP 1.2 — Justificación del Problema y Análisis del Usuario
### 1. Justificación del Problema
El proceso de formalización para micro y pequeñas empresas (MiPyME) en Chile enfrenta barreras críticas derivadas de la baja digitalización de los organismos municipales. Según datos recopilados por Lofwork, tras el acompañamiento de aproximadamente 400 empresas en sus procesos legales, se evidencia que la gestión de trámites sigue siendo mayoritariamente manual y desarticulada.

Esta deficiencia tiene un impacto directo en el ecosistema emprendedor. De acuerdo con un reporte de Emol, el 62% de los emprendedores demora más de tres meses en completar los trámites municipales esenciales para operar legalmente, lo que deriva en:
- Una pérdida de oportunidades económicas para el emprendedor.
- Un desincentivo a la formalización empresarial.
- Un uso ineficiente de recursos tanto del ciudadano como de la administración pública.

La implementación de una solución tecnológica busca mitigar esta brecha, centralizando la información y reduciendo los tiempos de respuesta mediante la automatización de procesos que hoy dependen de la presencialidad y el soporte físico.
### Perfiles de Usuario
A. Emprendedor / Dueño de MiPyME (Usuario Principal)
| Perfil | Contexto | Puntos de dolor | Nivel tecnológico |
|------|-----------|-------------|-------------|
| Personas naturales o jurídicas que buscan establecerse o regularizar su actividad comercial legalmente. | Tiempo limitado. Gestionan todas las áreas de su negocio simultáneamente y dependen de tramitar documentos de forma presencial. | Falta de claridad en los requisitos municipales. Agotamiento por desplazamientos físicos constantes. Ansiedad por la incertidumbre de los plazos de aprobación | Variado (básico a intermedio). La herramienta debe ser suficientemente intuitiva para quien no domina sistemas complejos, pero eficiente para el usuario avanzado. |

B. Gestor / Consultor de Formalización (Usuario Secundario)
| Perfil | Necesidades | Nivel tecnológico |
|------|-----------|-------------|
| Profesionales que, al igual que Lofwork, asesoran a múltiples empresas en paralelo durante su proceso de formalización. | Seguimiento masivo de expedientes. Alertas de plazos y vencimientos. Gestión documental organizada para evitar errores en solicitudes a municipalidades. | Intermedio a avanzado. Requiere una plataforma eficiente, con vistas rápidas y exportación de datos. |

### EP 1.3 — Bocetos de UI/UX y Prototipo Figma
Se diseñaron 9 pantallas diferenciadas en Figma, cada una correspondiente a una funcionalidad definida en los requerimientos. El prototipo considera explícitamente versión móvil y versión web, con componentes de navegación adaptados a cada dispositivo.
| N° | Pantalla | Funcionalidad cubierta | Disponible en |
|------|-----------|-------------|-------------|
| 1 | Login | Autenticación con Gmail, Clave Única y correo/contraseña | Web y Móvil |
| 2 | Registro | Formulario con validación: Nombre, RUT, Correo, Región, Comuna, Contraseña, Términos y Condiciones | Web y Móvil |
| 3 | Dashboard (Usuario) | Panel principal con acceso radial a todos los módulos | Web y Móvil |
| 4 | Gestión de Perfil | Edición de información personal con validación visual | Web y Móvil |
| 5 | Búsqueda y Filtrado | Buscador con filtros por estado y tipo de trámite | Web y Móvil |
| 6 | Reportes y Exportación | Generación de reportes por tipo y rango de fecha | Web y Móvil |
| 7 | Hoja de Ruta Dinámica | Visualización de fases de trámite con gestión admin | Web y Móvil |
| 8 | Repositorio Documental | Gestión de archivos por carpetas con búsqueda y descarga | Web y Móvil |
| 9 | Panel Administrador | Vista exclusiva para gestión de usuarios y estadísticas | Web y Móvil |

### Formularios con validación visual
Los formularios de Login y Registro cumplen con los campos requeridos e incorporan validaciones visuales centradas en el usuario:
- Login: correo electrónico y contraseña, con feedback de error si los campos están vacíos.
- Registro: Nombre, Apellido, RUT (formato 12.345.678-9), Correo Electrónico, Región, Comuna, Contraseña, Confirmación de Contraseña y aceptación de Términos y Condiciones.
- Validaciones activas: RUT con expresión regular, contraseñas coincidentes, mínimo 8 caracteres y obligatoriedad de todos los campos.

## EP 1.4 — Arquitectura de Navegación y Experiencia del Usuario
### (a) Rutas Principales y Secundarias
La aplicación utiliza react-router integrado con IonReactRouter. Las rutas se dividen en tres categorías según el nivel de acceso requerido:
| Tipo | Ruta | Componente/Descripción |
|------|-----------|-------------|
| Pública | /login | LoginPage — Acceso con Gmail, Clave Única o correo. Redirige a /dashboard si hay sesión activa. |
| Pública | /register | RegisterPage — Registro de nuevo usuario. Redirige a /dashboard si hay sesión activa. |
| Protegida | /dashboard | DashboardPage — Panel central con acceso a todos los módulos. |
| Protegida | /profile | ProfilePage — Gestión de información personal. |
| Protegida | /search | SearchPage — Búsqueda y filtrado de trámites. |
| Protegida | /reports | ReportsPage — Generación y exportación de reportes. |
| Protegida | /roadmap | RoadmapPage — Hoja de ruta dinámica de fases. |
| Protegida | /documents | DocumentsPage — Repositorio documental por carpetas. |
| Solo Admin | /admin/dashboard | AdminDashboardPage — Panel exclusivo para administradores. |

### (b) Relaciones Jerárquicas entre Vistas
- Nivel 1 — Acceso: El usuario llega a /login o /register.
- Nivel 2 — Central (Hub): Tras autenticarse, el Dashboard actúa como punto central de navegación.
- Nivel 3 — Funcional: Desde el Dashboard, la navegación es radial hacia módulos específicos (Perfil, Búsqueda, Reportes, Hoja de Ruta, Repositorio).
- Nivel 4 — Admin: /admin/dashboard es accesible únicamente desde el menú lateral cuando el rol es administrador.
### (c) Flujo de Navegación
El flujo principal de la aplicación sigue este orden:
- Usuario no autenticado accede a cualquier ruta protegida → redirigido automáticamente a /login.
- Usuario autenticado accede a /login o /register → redirigido automáticamente a /dashboard.
- Usuario con rol "user" intenta acceder a /admin/dashboard → redirigido a /dashboard.
###(d) Diferenciación de Acceso según Roles

| Rol | Acceso y Capacidades |
|-----|--------|
| Usuario (user) | Acceso a Dashboard, Perfil, Búsqueda, Reportes (descarga), Hoja de Ruta (solo lectura) y Repositorio (solo descarga). |
| Administrador (admin) | Todo lo anterior más: Panel de Administración (/admin/dashboard), añadir tareas en Hoja de Ruta, editar dependencias, subir archivos y crear carpetas en el Repositorio. |

### (e) Flujos de Tareas Principales (Task Flows)
#### Gestión de Documentos
- Dashboard → Repositorio Documental → Seleccionar Carpeta → Buscar documento → Descargar.
- (Admin) Dashboard → Repositorio → Subir Archivo o Nueva Carpeta.
#### Generación de Reportes
- Dashboard → Reportes y Exportación → Seleccionar Tipo → Definir Rango de Fecha → Descargar PDF / Exportar Excel / Enviar por Correo.
#### Seguimiento de Trámite
- Dashboard → Hoja de Ruta Dinámica → Ver fases (completado / en progreso / pendiente) → Ver dependencias.
### (f) Puntos Críticos de Interacción
- Cierre de Sesión: visible en el header de todas las pantallas protegidas para garantizar seguridad.
- Validación de Formularios: feedback visual inmediato en login (campos vacíos) y registro (RUT, contraseñas, términos).
- Control de roles en tiempo real: el menú lateral filtra las opciones según el rol del usuario autenticado.
### (g) Coherencia de Experiencia entre Dispositivos
La aplicación implementa una experiencia adaptativa según el dispositivo:

| Dispositivo | Comportamiento |
|-----|--------|
| Web / Tablet (≥ lg) | IonSplitPane muestra el menú lateral permanente con navegación completa, nombre del usuario y badge de rol. |
| Móvil (< lg) | Menú hamburguesa (IonMenuButton) en el header. La barra inferior con tabs no está implementada en esta entrega pero está prevista para EP2. |
### (h) Justificación Técnica
#### Usabilidad
Se utiliza una disposición limpia con tarjetas grandes y accesos directos en el Dashboard, ideal para entornos municipales o administrativos donde el usuario puede no estar familiarizado con interfaces complejas.
#### Escalabilidad
La estructura modular de vistas (pages, components, routes, services, hooks, types, theme) permite añadir nuevas funcionalidades sin afectar el núcleo del sistema. Cada módulo es independiente y extensible.
#### Seguridad de Navegación
Se implementan componentes PrivateRoute y PublicRoute para garantizar que ninguna ruta protegida sea accesible sin autenticación, y que las rutas públicas redirijan al Dashboard si ya existe sesión activa.

## EP 1.5 — Proyecto Ionic + React
El proyecto fue creado con Ionic + React + TypeScript, con la siguiente configuración base:
- Framework: Ionic 7 + React 18 + TypeScript
- Router: IonReactRouter + React Router 5
- HTTP Client: Axios con interceptores JWT
- Autenticación: JWT + Google OAuth + Clave Única (EP2)
- Modo Ionic: mode: "md" (Material Design, consistencia en web)
### (a) Rutas Públicas y Protegidas
Se implementaron dos componentes HOC para controlar el acceso:
- PublicRoute (restricted=true): Si el usuario ya tiene sesión activa, redirige automáticamente a /dashboard. Aplica a /login y /register.
- PrivateRoute (requiredRole?: UserRole): Verifica autenticación y, opcionalmente, el rol del usuario. Sin sesión redirige a /login; con rol insuficiente redirige a /dashboard.
### (b) Redirecciones
- / → /login (redirección raíz)
- Usuario no autenticado en ruta protegida → /login (con estado from para redirección post-login)
- Usuario autenticado en /login o /register → /dashboard
- Usuario "user" en /admin/dashboard → /dashboard
### (c) Estructura Modular de Vistas
El proyecto organiza el código en las siguientes carpetas:

| Carpeta | Contenido |
|-----|--------|
| src/pages/ | Vistas organizadas por módulo: auth/, dashboard/, profile/, search/, reports/, roadmap/, documents/ |
| src/components/ | Componentes reutilizables: layout/AppLayout.tsx (menú lateral + SplitPane adaptativo) |
| src/routes/ | AppRoutes.tsx, PrivateRoute.tsx, PublicRoute.tsx |
| src/services/ | auth.service.ts — login, register, logout, JWT, OAuth |
| src/hooks/ | useAuth.ts — estado de autenticación reactivo |
| src/types/| index.ts — User, UserRole, Documento, PasoHojaRuta, Reporte |
| src/theme/| variables.css (tema municipal), global.css (estilos globales) |

### (d) Pasos para Ejecutar el Proyecto
- 1. Clonar el repositorio desde GitHub.
- 2. Instalar dependencias: npm install
- 3. Copiar el archivo de variables: cp .env.example .env
- 4. Ejecutar en desarrollo: ionic serve o npm start
Variable de entorno requerida: REACT_APP_API_URL=http://localhost:3001/api

### Requisitos


- Node.js v18+
- npm v9+
- Ionic CLI: `npm install -g @ionic/cli`

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/[usuario]/municipalidad-santo-domingo.git
cd municipalidad-santo-domingo

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de tu backend

# 4. Ejecutar en desarrollo
ionic serve
# o
npm start
```

### Variables de entorno

```env
REACT_APP_API_URL=http://localhost:3001/api
```

---

## Arquitectura de Rutas (EP 1.4 → EP 1.5)

### Rutas Públicas (sin autenticación)

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/login` | `LoginPage` | Login con email, Gmail o Clave Única. Si hay sesión activa, redirige a `/dashboard` |
| `/register` | `RegisterPage` | Registro de nuevo usuario. Si hay sesión activa, redirige a `/dashboard` |

### Rutas Protegidas (usuario autenticado)

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/dashboard` | `DashboardPage` | Panel principal con accesos a módulos |
| `/profile` | `ProfilePage` | Gestión de información personal |
| `/search` | `SearchPage` | Búsqueda y filtrado de trámites |
| `/reports` | `ReportsPage` | Generación y exportación de reportes |
| `/roadmap` | `RoadmapPage` | Visualización de hoja de ruta dinámica |
| `/documents` | `DocumentsPage` | Repositorio y gestión de documentos |



### Rutas Exclusivas (rol Administrador)

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/admin/dashboard` | `AdminDashboardPage` | Panel de administración del sistema |

### Flujo de Redirección

```
Usuario no autenticado → accede a /dashboard → redirige a /login
Usuario autenticado → accede a /login → redirige a /dashboard
Usuario rol "user" → accede a /admin/dashboard → redirige a /dashboard
```

---

## Componentes Ionic Utilizados (EP 1.6)

- `IonPage`, `IonHeader`, `IonContent`, `IonFooter`
- `IonToolbar`, `IonTitle`, `IonButtons`, `IonMenuButton`
- `IonMenu`, `IonSplitPane` — menú lateral web
- `IonList`, `IonItem`, `IonLabel`, `IonInput`, `IonSelect`
- `IonCard`, `IonCardHeader`, `IonCardContent`
- `IonButton`, `IonIcon`, `IonFab`, `IonFabButton`
- `IonBadge`, `IonChip`, `IonCheckbox`, `IonSearchbar`
- `IonLoading`, `IonSkeletonText`
- `IonGrid`, `IonRow`, `IonCol`
- `IonRouterOutlet`, `IonReactRouter`
- React Router: `Route`, `Redirect`, `useHistory`, `Link`

---

## Roles de Usuario

| Rol | Acceso |
|-----|--------|
| `user` | Dashboard, Perfil, Búsqueda, Reportes (solo lectura), Hoja de Ruta, Documentos |
| `admin` | Todo lo anterior + Panel de Administración, gestión de usuarios, edición de Hoja de Ruta |

---

## Prototipo Figma

[Ver mockups en Figma](https://www.figma.com/design/GfTLy3QQAldIBUA4MP4xnK/Web-Movil--Mockups--prototipo-)

---

## Tecnologías

- **Frontend:** Ionic 7, React 18, TypeScript, React Router 5
- **HTTP Client:** Axios con interceptores JWT
- **Autenticación:** JWT + Google OAuth + Clave Única
- **Backend (EP 2):** Node.js + Express / Flask
- **Base de datos (EP 2):** PostgreSQL


