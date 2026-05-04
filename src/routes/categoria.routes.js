// RUTAS DE CATEGORIAS

const router = require("express").Router(); // importar express.Router()

const categoriaController = require('../controllers/categoria.controller') // importar el archivo de controladores de categorias

router.get('/', categoriaController.listar)
router.post('/', categoriaController.crear)
router.get('/:idCategoria', categoriaController.listarInfo)
router.delete('/:idCategoria', categoriaController.eliminar)
router.put('/:idCategoria', categoriaController.modificar)
router.patch('/:idCategoria/toggle', categoriaController.toggleActive)

module.exports = router;