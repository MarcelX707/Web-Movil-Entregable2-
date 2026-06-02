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
DATABASE_URL=postgresql://neondb_owner:npg_vbsTJX0V9Zyn@ep-purple-math-ap95ujnc-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

---

## Ejecución de la App

Para probar el proyecto completo en la computadora local, se debe levantar ambos servicios:

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
*

# Pruebas Funcionales de la API REST 

Las pruebas fueron realizadas utilizando **Postman** con el objetivo de verificar el correcto funcionamiento de los endpoints REST desarrollados para la aplicación. Se evaluaron tanto escenarios exitosos como casos de error, validando códigos de respuesta HTTP, mensajes JSON y restricciones implementadas en el backend.

---

# Pruebas Exitosas

## 1. Registro de Usuario

**Endpoint:** `POST /api/auth/register`

**Objetivo:** Registrar un nuevo usuario en el sistema.

**Resultado esperado:**

* Código HTTP: `201 Created`
* Usuario registrado correctamente.

**Evidencia:**

![Registro Usuario](https://github.com/user-attachments/assets/23c9e736-2d0a-42ff-9d07-5cf63a2d141a)

**Resultado obtenido:** Registro exitoso.

---

## 2. Inicio de Sesión

**Endpoint:** `POST /api/auth/login`

**Objetivo:** Autenticar usuario y generar token JWT.

**Resultado esperado:**

* Código HTTP: `200 OK`
* Generación de token JWT.

**Evidencia:**

![Login](https://github.com/user-attachments/assets/27d602e1-edd6-48ab-8aca-6fbcd5d8518a)

**Resultado obtenido:** Inicio de sesión exitoso.

---

## 3. Actualización de Perfil

**Endpoint:** `PUT /api/auth/profile/:id`

**Objetivo:** Modificar información del perfil del usuario.

**Resultado esperado:**

* Código HTTP: `200 OK`
* Datos actualizados correctamente.

**Evidencia:**

![Actualizar Perfil](https://github.com/user-attachments/assets/62479610-6166-49ea-a337-a45c583bb952)

**Resultado obtenido:** Perfil actualizado.

---

## 4. Obtener Carpetas Municipales

**Endpoint:** `GET /api/carpetas`

**Objetivo:** Recuperar todas las carpetas almacenadas.

**Resultado esperado:**

* Código HTTP: `200 OK`
* Lista de carpetas en formato JSON.

**Evidencia:**

![GET Carpetas](https://github.com/user-attachments/assets/40069db9-a95e-4a44-a70c-fb1ce4c3f025)

**Resultado obtenido:** Consulta exitosa.

---

## 5. Crear Carpeta Municipal

**Endpoint:** `POST /api/carpetas`

**Objetivo:** Crear una nueva carpeta municipal.

**Resultado esperado:**

* Código HTTP: `201 Created`
* Carpeta almacenada correctamente.

**Evidencia:**

![POST Carpetas](https://github.com/user-attachments/assets/a0820a26-50e4-4165-9cf2-4b428798cb56)

**Resultado obtenido:** Carpeta creada.

---

## 6. Actualizar Carpeta Municipal

**Endpoint:** `PUT /api/carpetas/:id`

**Objetivo:** Modificar el nombre de una carpeta existente.

**Resultado esperado:**

* Código HTTP: `200 OK`
* Carpeta actualizada correctamente.

**Evidencia:**

![PUT Carpetas](https://github.com/user-attachments/assets/12454f9c-ba3f-4bb5-b2fb-0f019186e370)

**Resultado obtenido:** Actualización exitosa.

---

## 7. Eliminar Carpeta Municipal

**Endpoint:** `DELETE /api/carpetas/:id`

**Objetivo:** Eliminar una carpeta de la base de datos.

**Resultado esperado:**

* Código HTTP: `200 OK`
* Carpeta eliminada correctamente.

**Evidencia:**

![DELETE Carpetas](https://github.com/user-attachments/assets/35038d23-389a-4efb-8262-a5f56b6753f0)

**Resultado obtenido:** Eliminación exitosa.

---

# Pruebas de Validación y Manejo de Errores

Estas pruebas verifican que la API responda adecuadamente ante datos incorrectos o recursos inexistentes.

---

## 8. Login con Contraseña Incorrecta

**Endpoint:** `POST /api/auth/login`

**Objetivo:** Validar rechazo de credenciales inválidas.

**Resultado esperado:**

* Código HTTP: `401 Unauthorized`

**Evidencia:**

![Login Incorrecto](https://github.com/user-attachments/assets/cda88d61-d89d-4d69-9d50-0d0ed5335c59)

**Resultado obtenido:** Error controlado correctamente.

---

## 9. Registro con Correo ya Existente

**Endpoint:** `POST /api/auth/register`

**Objetivo:** Evitar registros duplicados.

**Resultado esperado:**

* Código HTTP: `400 Bad Request`

**Evidencia:**

![Correo Existente](https://github.com/user-attachments/assets/b59df3e1-7e7f-4e54-a0a4-f093dca95f66)

**Resultado obtenido:** Validación correcta de duplicados.

---

## 10. Registro sin Correo Electrónico

**Endpoint:** `POST /api/auth/register`

**Objetivo:** Validar campos obligatorios.

**Resultado esperado:**

* Código HTTP: `400 Bad Request`

**Evidencia:**

![Registro Sin Correo](https://github.com/user-attachments/assets/4705e7d9-015f-442b-8d62-7cbf35871528)

**Resultado obtenido:** Validación de formulario exitosa.

---

## 11. Login con Campos Vacíos

**Endpoint:** `POST /api/auth/login`

**Objetivo:** Verificar validación de datos requeridos.

**Resultado esperado:**

* Código HTTP: `400 Bad Request`

**Evidencia:**

![Login Sin Datos](https://github.com/user-attachments/assets/2937a88f-dba9-470b-8b05-93fbec9cb5f9)

**Resultado obtenido:** Error controlado correctamente.

---

## 12. Crear Carpeta sin Nombre

**Endpoint:** `POST /api/carpetas`

**Objetivo:** Verificar validación de campos obligatorios.

**Resultado esperado:**

* Código HTTP: `400 Bad Request`

**Evidencia:**

![Nombre Obligatorio](https://github.com/user-attachments/assets/9b0f9301-ac8c-424c-8588-e26da25775c8)

**Resultado obtenido:** Validación aplicada correctamente.

---

## 13. Actualizar Carpeta Inexistente

**Endpoint:** `PUT /api/carpetas/:id`

**Objetivo:** Verificar manejo de recursos inexistentes.

**Resultado esperado:**

* Código HTTP: `404 Not Found`

**Evidencia:**

![PUT Carpeta Inexistente](https://github.com/user-attachments/assets/50ca28ee-c52c-4457-842c-4ff3071175dc)

**Resultado obtenido:** Recurso inexistente detectado correctamente.

---

## 14. Eliminar Carpeta Inexistente

**Endpoint:** `DELETE /api/carpetas/:id`

**Objetivo:** Verificar manejo de eliminación sobre recursos inexistentes.

**Resultado esperado:**

* Código HTTP: `404 Not Found`

**Evidencia:**

![DELETE Carpeta Inexistente](https://github.com/user-attachments/assets/b9ba10a3-cb42-4e21-ac33-791e5787bf72)

**Resultado obtenido:** Error controlado correctamente.

15. Acceso a Ruta Protegida sin Token JWT

Endpoint: PUT /api/auth/profile/:id

Objetivo: Verificar que el sistema impida el acceso a rutas protegidas cuando no se proporciona un token JWT válido en la cabecera de autorización.

Resultado esperado:

Código HTTP: 403 Forbidden
Mensaje indicando que no se proporcionó un token de acceso.

**Evidencia:**

<img width="1573" height="898" alt="image" src="https://github.com/user-attachments/assets/e5d2933a-28d6-484d-938d-3aee43e337db" />
<img width="1576" height="885" alt="image" src="https://github.com/user-attachments/assets/14f30182-9d25-43ea-a72c-c32b3012fe50" />



Respuesta obtenida:

{
  "error": "Acceso denegado: token no proporcionado"
}

Resultado obtenido: El middleware de autenticación bloquea correctamente el acceso a la ruta protegida cuando no se envía el token JWT.

Validación realizada:

No se envió cabecera Authorization.
El servidor rechazó la solicitud.
Se devolvió el código HTTP correspondiente.
No se permitió la modificación de datos del usuario.

---

# Conclusión

Las pruebas realizadas demuestran el correcto funcionamiento de la API REST, incluyendo autenticación mediante JWT, operaciones CRUD, validaciones de entrada, manejo de errores, protección frente a registros duplicados y control de recursos inexistentes. Los resultados obtenidos evidencian que la aplicación responde con códigos HTTP apropiados y mensajes JSON consistentes ante distintos escenarios de uso.



