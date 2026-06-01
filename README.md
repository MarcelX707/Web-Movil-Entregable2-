# Plataforma Municipal - Entregable 2

Este repositorio contiene el desarrollo del **Entregable 2**, el cual está dividido en dos avances principales que integran el Frontend y el Backend de la aplicación.

---

## 📁 Estructura del Proyecto

*   **`Avance1/Web-Movil`**: Aplicación Frontend desarrollada con **React** y **TypeScript**. Incluye vistas de inicio de sesión, registro, perfiles, buscador y paneles de control protegidos por rutas privadas.
*   **`Avance2/Web-Movil-Backend`**: API REST del Backend construida con **Node.js** y **Express**. Gestiona la autenticación mediante tokens JWT y se conecta con una base de datos **PostgreSQL** alojada en la nube (**Neon**).

---

## Requisitos Previos

Asegúrate de tener instalado en tu sistema:
*   [Node.js](https://nodejs.org/) (Versión 16 o superior recomendada)
*   [npm](https://www.npmjs.com/) (Viene incluido con la instalación de Node.js)

---

## Instalación y Configuración

Sigue estos pasos detallados para instalar y poner en marcha el proyecto localmente:

### 1. Clonar el Repositorio
```bash
git clone https://github.com/MarcelX707/Web-Movil-Entregable2-.git
cd Web-Movil-Entregable2-
```

### 2. Instalar Dependencias del Frontend (Avance 1)
Navega a la carpeta del frontend e instala las librerías necesarias:
```bash
cd Avance1/Web-Movil
npm install
```

### 3. Instalar Dependencias del Backend (Avance 2)
Regresa a la raíz, navega al backend e instala sus dependencias:
```bash
cd ../../Avance2/Web-Movil-Backend
npm install
```

### 4. Configurar Variables de Entorno (`.env`)
En la carpeta del backend (`Avance2/Web-Movil-Backend`), crea un archivo llamado `.env` e introduce las siguientes configuraciones de conexión a la base de datos en la nube (Neon):

```env
PORT=3001
JWT_SECRET=tu_clave_secreta_super_segura
DATABASE_URL=postgresql://neondb_owner:npg_TiS5pqhzwN4e@ep-purple-math-ap95ujnc-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

---

## Ejecución de la App

Para probar el proyecto completo en tu computadora local, debes levantar ambos servicios:

### Servidor Backend
Desde la carpeta `Avance2/Web-Movil-Backend`, arranca el servidor API REST:
```bash
node index.js
```
El servidor backend se ejecutará en: **`http://localhost:3001`**

### Servidor Frontend (Cliente)
Desde la carpeta `Avance1/Web-Movil`, inicia la aplicación web:
```bash
npm start
```
*Si estás utilizando la configuración por defecto de Vite, puedes utilizar:*
```bash
npm run dev
```
La aplicación web se abrirá automáticamente en tu navegador en: **`http://localhost:3000`** (o `http://localhost:5173` si es con Vite).

---

## Endpoints de la API Backend

La API implementa los siguientes endpoints clave para el entregable:

### Autenticación y Perfil
*   `POST /api/auth/register`: Registro de nuevos usuarios (encriptado con `bcrypt`).
*   `POST /api/auth/login`: Inicio de sesión que genera un token de seguridad JWT.
*   `PUT /api/auth/profile/:id`: Actualización de perfil del usuario.

### Carpetas y Documentos
*   `GET /api/carpetas`: Obtiene la lista completa de carpetas municipales.
*   `POST /api/carpetas`: Crea una nueva carpeta municipal.
*   `PUT /api/carpetas/:id`: Modifica el nombre de una carpeta existente.
*   `DELETE /api/carpetas/:id`: Elimina una carpeta de la base de datos.
