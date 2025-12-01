# API de E-commerce de Álbums Musicales

API desarrollada en Node.js / Express para un E-commerce de venta de álbumes musicales. Utiliza Firestore (Firebase) como base de datos y JWT para autenticación y autorización.

## **IMPORTANTE**

El proyecto necesita un archivo .env (que fue añadido a .gitignore por una cuestión de seguridad) en la raíz del proyecto con las siguientes variables que necesitan ser rellenadas con la información de acceso de Firebase, la secret key para el JWT y el puerto de la API/rutas permitidas para Cors:

```
  FIREBASE_API_KEY=
  FIREBASE_AUTH_DOMAIN=
  FIREBASE_STORAGE_BUCKET=
  FIREBASE_APP_ID=

  API_PORT=
  CORS_ORIGINS=

  JWT_SECRET_KEY=

```

---

## Usuarios Hardcodeados

```
const admin = { id: 1, email: "admin@gmail.com", password: "12345", isAdmin: true };
const commonUser = { id: 2, email: "commonuser@gmail.com", password: "54321", isAdmin: false };
```

Existe también un endpoint para crear usuarios temporales para pruebas.

---

## Instalación

En el directorio principal ejecutar:

```
npm install
```

Modo desarrollo (watch):

```
npm run dev
```

Producción:

```
npm run start
```

---

## Ejemplo de Objeto Product

NOTA: el "id" para objetos nuevos es definido por la API.

```
{
  "id": 12624642,
  "artist": "Radiohead",
  "title": "The Interview",
  "releaseDate": "2010-08-23",
  "coverImages": [
    {
      "url": "http://coverartarchive.org/release/47343e96-7e84-4be1-9668-1692efabd972/37471174923.jpg",
      "types": ["Front"]
    }
  ],
  "tracklist": ["The Interview"],
  "extra": {
    "date": "2010-08-23",
    "producer": null,
    "format": "Digital Media",
    "trackCount": 1,
    "duration": 2621493,
    "trackDuration": [2621493]
  },
  "price": "117.16"
}
```

---

## Endpoints

/auth/login  
Método: POST  
Body: email y password  
Devuelve: token JWT

/auth/signin  
Método: POST  
Igual que /auth/login

/products/  
Método: GET  
Header: Authorization: Bearer <token>  
Devuelve: lista de productos

/products/:id  
Método: GET  
Header: Authorization  
Ruta: requiere ID  
Devuelve: producto específico

/products/byArtist  
Método: GET  
Header: Authorization  
Parámetro: artist  
Devuelve: array de productos del artista

/products/byTitle  
Método: GET  
Header: Authorization  
Parámetro: title  
Devuelve: producto cuyo título coincida

/products/create  
Método: POST  
Header: Authorization (usuario admin requerido)  
Body: JSON de producto  
Devuelve: producto creado

/products/:id (PATCH)  
Método: PATCH  
Header: Authorization (admin requerido)  
Body: datos a modificar  
Devuelve: producto editado

/products/:id (DELETE)  
Método: DELETE  
Header: Authorization (admin requerido)  
Devuelve: OK si se elimina correctamente

---

# Requerimientos del Proyecto

Requerimiento 1: Configuración Inicial

- Crear directorio y archivo index.js
- npm init -y
- Agregar "type": "module" en package.json
- Crear script start

Requerimiento 2: Dependencias  
Instalar: express, cors, body-parser, dotenv, firebase, jsonwebtoken

Requerimiento 3: Configuración del Servidor

- Crear servidor con Express
- Configurar CORS
- Configurar body-parser JSON
- Middleware 404
- Archivo .env

Requerimiento 4: Rutas  
products.routes.js:

- GET /api/products
- GET /api/products/:id
- POST /api/products/create
- DELETE /api/products/:id

auth.routes.js:

- POST /auth/login devuelve bearer token

Requerimiento 5: Controladores y Servicios

- Crear controladores por ruta
- Crear servicios correspondientes

Requerimiento 6: Acceso a Datos

- Crear modelos
- Crear proyecto Firestore
- Crear colección y documento inicial
- Conectar Firebase
- Métodos para interactuar con Firestore
- Conectar servicios con modelos

Requerimiento 7: Seguridad

- Configurar JWT
- Crear middleware de autenticación
- Proteger rutas
- Devolver token válido en /auth/login
