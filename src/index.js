// TIENE TODA LA CONFIGURACION DE LA API

const express = require('express') // importar express
const routerConfig = require('./routes/index.routes') // importar el archivo de rutas
const globalConstants = require('./const/globalConstants') // importar el archivo de constantes globales
const logger = require('morgan') // importar morgan para el logging de las peticiones
const cors = require('cors') // importar cors para permitir peticiones desde otros dominios

const errorHandler = require('./middlewares/error') // importar el middleware para manejar errores
const createError = require('http-errors') // importar http-errors para crear errores personalizados

const configuracionApi = (app) => { // configurar la api
  app.use(express.json()) // para que la api pueda recibir json
  app.use(express.urlencoded({ extended: true })) // para que la api pueda recibir formularios
  app.use(logger('dev'))
  app.use(cors()) // habilitar CORS para todas las rutas

  return;
};

const configuracionRouter = (app) => { // configurar las rutas
  app.use('/api/', routerConfig.rutas_init()) // para acceder a las rutas de la api siempre deberá empezar con /api/
  app.use('/', routerConfig.rutas_auth()) // para acceder a las rutas de autenticación de la api siempre deberá empezar con /api/auth

  app.use(function(req, res, next) { // middleware para manejar rutas no encontradas
    next(createError(404, 'RouteNotFound')); // crear un error 404 y pasarlo al middleware de manejo de errores
  });

  app.use(errorHandler) // middleware para manejar errores
};

const configuracionHeaders = (app) => { // configurar los headers de las respuestas
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // permitir peticiones desde cualquier origen
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS') // permitir estos métodos
    res.header('Access-Control-Allow-Headers', 'Content-Type') // permitir el header Content-Type
    next()
  })
};

const init = () => {
  const app = express() // crear una instancia de express
  configuracionApi(app) // configurar la api
  configuracionHeaders(app) // configurar los headers
  configuracionRouter(app) // configurar las rutas
  app.listen(globalConstants.PORT) // escuchar en el puerto
  console.log('La aplicacion se está ejecutando en http://localhost:' + globalConstants.PORT) // mostrar en consola que se está ejecutando la aplicación en el puerto correspondiente
};

init(); // iniciar la aplicación