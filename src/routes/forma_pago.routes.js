// RUTAS DE FORMAS DE PAGO

const router = require("express").Router(); // importar express.Router()

const formaPagoController = require('../controllers/forma_pago.controller') // importar el archivo de controladores de formas de pago

router.get('/', formaPagoController.listar)
router.patch('/:idFormaPago/toggle', formaPagoController.toggleActive)

module.exports = router;