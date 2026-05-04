// RUTAS DE REPORTES

const router = require("express").Router(); // importar express.Router()

const reporteController = require('../controllers/reporte.controller') // importar el archivo de controladores de reportes

router.get('/', reporteController.resumenMensual)

module.exports = router;