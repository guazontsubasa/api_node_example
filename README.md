# API REST - Finanzas personales con Node.js + Express + PostgreSQL

API REST para gestión de finanzas personales: ingresos, gastos, categorías, orígenes, destinos, formas de pago, bancos y tarjetas.

Construida con Node.js, Express y Sequelize (PostgreSQL). Usa soft delete (`paranoid`), validación con Joi y manejo centralizado de errores.

## Configuración

Crear un archivo `.env` en la raíz del proyecto:

```bash
PORT = 8000
DB_HOST = localhost
DB_PORT = 5432
DB_NAME = curso_db
DB_USER = curso_user
DB_PASSWORD = curso_pass
```

## Instalación y ejecución

```bash
npm install

# Crear la base de datos
npm run db:create

# Iniciar el servidor (crea las tablas via sequelize.sync)
npm start

# Cargar datos iniciales
npm run db:seed
```

La API queda disponible en:

```
http://localhost:8000/api
```

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia con nodemon (auto-reload) |
| `npm run db:create` | Crea la base de datos |
| `npm run db:seed` | Carga los datos iniciales |
| `npm run db:migrate` | Ejecuta las migraciones pendientes |
| `npm run db:migrate:undo` | Revierte la última migración |
| `npm run erd` | Genera el diagrama entidad-relación |

## Rutas implementadas

Todos los endpoints comienzan con `/api`.

### Usuarios `/api/usuarios`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Listar usuarios |
| POST | `/` | Crear usuario (valida con Joi) |
| GET | `/:idUsuario` | Info de un usuario |
| PUT | `/:idUsuario` | Modificar usuario (valida con Joi) |
| DELETE | `/:idUsuario` | Eliminar usuario (soft delete, no elimina admins) |

### Ingresos `/api/ingresos`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Listar ingresos |
| POST | `/` | Crear ingreso |
| GET | `/:idIngreso` | Info de un ingreso |
| PUT | `/:idIngreso` | Modificar ingreso |
| PATCH | `/:idIngreso/cobro` | Marcar ingreso como cobrado |
| DELETE | `/:idIngreso` | Eliminar ingreso (soft delete) |

### Gastos `/api/gastos`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Listar gastos |
| POST | `/` | Crear gasto |
| GET | `/gastos-mensuales` | Gastos del mes actual |
| GET | `/gastos-mensuales/:anio/:mes` | Gastos de un mes específico |
| GET | `/gastos-pendientes` | Gastos sin fecha de pago con vencimiento |
| GET | `/:idGasto` | Info de un gasto |
| PUT | `/:idGasto` | Modificar gasto |
| PATCH | `/:idGasto/pagar` | Registrar pago del gasto |
| DELETE | `/:idGasto` | Eliminar gasto (soft delete) |

### Orígenes `/api/origenes`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Listar orígenes |
| POST | `/` | Crear origen |
| GET | `/:idOrigen` | Info de un origen |
| PUT | `/:idOrigen` | Modificar origen |
| DELETE | `/:idOrigen` | Eliminar origen (bloqueado si tiene ingresos) |
| PATCH | `/:idOrigen/toggle` | Activar / desactivar origen |

### Destinos `/api/destinos`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Listar destinos |
| POST | `/` | Crear destino |
| GET | `/:idDestino` | Info de un destino |
| PUT | `/:idDestino` | Modificar destino |
| DELETE | `/:idDestino` | Eliminar destino (bloqueado si tiene gastos) |
| PATCH | `/:idDestino/toggle` | Activar / desactivar destino |

### Categorías `/api/categorias`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Listar categorías |
| POST | `/` | Crear categoría |
| GET | `/:idCategoria` | Info de una categoría |
| PUT | `/:idCategoria` | Modificar categoría |
| DELETE | `/:idCategoria` | Eliminar categoría (soft delete) |
| PATCH | `/:idCategoria/toggle` | Activar / desactivar categoría |

### Formas de pago `/api/formas_pago`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Listar formas de pago |
| PATCH | `/:idFormaPago/toggle` | Activar / desactivar forma de pago |

### Bancos `/api/bancos`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Listar bancos |
| POST | `/` | Crear banco |
| GET | `/:idBanco` | Info de un banco |
| PUT | `/:idBanco` | Modificar banco |
| DELETE | `/:idBanco` | Eliminar banco (soft delete) |
| PATCH | `/:idBanco/toggle` | Activar / desactivar banco |

### Perfiles `/api/perfiles`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Listar perfiles |

### Reportes `/api/reportes`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Resumen mensual (total ingresos y gastos del mes actual) |

## Estructura del proyecto

```
src/
├── index.js                  # Configuración y arranque del servidor
├── const/
│   ├── globalConstants.js    # Variables de entorno
│   └── error.js              # Códigos y mensajes de error
├── controllers/              # Lógica de cada recurso
├── database/
│   ├── config/config.js      # Configuración de Sequelize
│   ├── migrations/           # Migraciones de base de datos
│   ├── models/               # Modelos Sequelize (con asociaciones y hooks)
│   └── seeders/              # Datos iniciales
├── middlewares/
│   ├── error.js              # Manejo centralizado de errores
│   ├── validate.js           # Middleware de validación Joi
│   └── schemes/              # Schemas Joi por recurso
└── routes/                   # Definición de rutas por recurso
```

## Formato de respuesta

Todas las respuestas siguen el mismo esquema:

```json
{
  "success": true,
  "message": "descripción de la operación",
  "data": {}
}
```

En caso de error:

```json
{
  "success": false,
  "error": {
    "code": 1000,
    "message": "descripción del error"
  }
}
```

## Uso con Postman

En la raíz del proyecto se incluyen colecciones Postman:

- `TP1.postman_collection.json` (DEPRECATED)
- `TP2.postman_collection.json`

La variable `URL` equivale a `http://localhost:8000/api`.

