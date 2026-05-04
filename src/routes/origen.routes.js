// RUTAS DE ORIGENES

const router = require("express").Router(); // importar express.Router()

const origenController = require('../controllers/origen.controller') // importar el archivo de controladores de origenes

router.get('/', origenController.listar)
router.post('/', origenController.crear)
router.get('/:idOrigen', origenController.listarInfo)
router.put('/:idOrigen', origenController.modificar)
router.delete('/:idOrigen', origenController.eliminar)
router.patch('/:idOrigen/toggle', origenController.toggleActive)

module.exports = router;