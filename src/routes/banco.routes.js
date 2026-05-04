// RUTAS DE BANCOS

const router = require("express").Router(); // importar express.Router()

const bancoController = require('../controllers/banco.controller') // importar el archivo de controladores de categorias

router.get('/', bancoController.listar)
router.post('/', bancoController.crear)
router.get('/:idBanco', bancoController.listarInfo)
router.put('/:idBanco', bancoController.modificar)
router.delete('/:idBanco', bancoController.eliminar)
router.patch('/:idBanco/toggle', bancoController.toggleActive)

module.exports = router;