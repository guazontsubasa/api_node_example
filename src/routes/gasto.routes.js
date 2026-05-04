// RUTAS DE GASTOS

const router = require("express").Router(); // importar express.Router()

const gastoController = require('../controllers/gasto.controller') // importar el archivo de controladores de gastos

router.get('/', gastoController.listar)
router.post('/', gastoController.crear)
// el orden es importante, me rompió si pongo esto abajo del todo.
router.get('/gastos-mensuales', gastoController.listarGastosMensuales)
router.get('/gastos-mensuales/:anio/:mes', gastoController.listarGastosMensuales) // con año y mes específicos
router.get('/gastos-pendientes', gastoController.listarGastosPendientes)
router.get('/:idGasto', gastoController.listarInfo)
router.put('/:idGasto', gastoController.modificar)
router.delete('/:idGasto', gastoController.eliminar)
router.patch('/:idGasto/pagar', gastoController.pagar)

module.exports = router;