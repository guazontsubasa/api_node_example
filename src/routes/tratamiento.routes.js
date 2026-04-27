// RUTAS DE TRATAMIENTOS

const router = require("express").Router(); // importar express.Router()

const tratamientoController = require('../controllers/tratamiento.controller')

router.get('/', tratamientoController.listar)
router.post('/', tratamientoController.crear)
router.get('/:idTratamiento', tratamientoController.listarInfo)



module.exports = router;