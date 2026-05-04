// RUTAS DE INGRESOS

const router = require("express").Router(); // importar express.Router()

const ingresoController = require('../controllers/ingreso.controller') // importar el archivo de controladores de ingresos

router.get('/', ingresoController.listar)
router.post('/', ingresoController.crear)
router.get('/:idIngreso', ingresoController.listarInfo)
router.put('/:idIngreso', ingresoController.modificar)
router.patch('/:idIngreso/cobro', ingresoController.marcarCobrado)
router.delete('/:idIngreso', ingresoController.eliminar)


module.exports = router;