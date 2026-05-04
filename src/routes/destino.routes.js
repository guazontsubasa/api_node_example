// RUTAS DE DESTINOS

const router = require("express").Router(); // importar express.Router()

const destinoController = require('../controllers/destino.controller') // importar el archivo de controladores de destinos

router.get('/', destinoController.listar)
router.post('/', destinoController.crear)
router.get('/:idDestino', destinoController.listarInfo)
router.put('/:idDestino', destinoController.modificar)
router.delete('/:idDestino', destinoController.eliminar)
router.patch('/:idDestino/toggle', destinoController.toggleActive)

module.exports = router;