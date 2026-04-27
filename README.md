# Estructura Básica de un proyecto con NodeJS utilizando Express

Este repositorio contiene la estructura básica de una API REST con Node.js y Express. En esta etapa se encuentra implementado un módulo de usuarios con rutas que simulan su funcionamiento devolviendo mensajes JSON.

## Archivo .env en la raiz del proyecto
Crear un archivo llamado .env con los siguientes datos:

```bash
PORT = 8000
```

## Para ejecutar el proyecto

```bash
npm install
npm start
```

La API se publica bajo el prefijo `/api`, por lo tanto la base local queda así:

```bash
http://localhost:8000/api
```

## Rutas implementadas

Actualmente están implementadas las rutas del recurso `usuarios`:

- `GET /api/usuarios/` devuelve un mensaje de listado de usuarios
- `POST /api/usuarios/` devuelve un mensaje de creación correcta
- `GET /api/usuarios/:idUsuario` devuelve un mensaje con el identificador solicitado

### Ejemplos de respuesta

`GET /api/usuarios/`

```json
{
	"message": "listado de usuarios"
}
```

`POST /api/usuarios/`

```json
{
	"message": "usuario creado correctamente"
}
```

`GET /api/usuarios/1`

```json
{
	"message": "información del usuario con idUsuario: 1"
}
```

## Uso con Postman

En la raíz del proyecto se incluye el archivo `TP1.postman_collection.json` para importar una colección con ejemplos de consumo.

La variable `URL` en Postman equivale a `http://localhost:8000/api`.

Pasos mínimos:

1. Abrir Postman.
2. Importar el archivo `TP1.postman_collection.json`.
3. Crear una variable `URL` con el valor `http://localhost:8000/api`.
4. Ejecutar las requests del grupo `Usuarios`, `Pacientes`, `Medicos` y `Tratamientos`. Ninguna ruta está implementada todavía.



