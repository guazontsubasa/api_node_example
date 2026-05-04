// RUTAS DE USUARIOS

const router = require("express").Router(); // importar express.Router()

const validate = require('../middlewares/validate') // importar el middleware de validación
const usuarioSchema = require('../middlewares/schemes/usuario.scheme') // importar los schemas de validación para usuarios
const usuarioController = require('../controllers/usuario.controller') // importar el archivo de controladores de usuarios

router.get('/', usuarioController.listar)
router.post('/', validate(usuarioSchema.crearUsuario), usuarioController.crear)
router.get('/:idUsuario', usuarioController.listarInfo)
router.put('/:idUsuario', validate(usuarioSchema.modificarUsuario), usuarioController.modificar)
router.delete('/:idUsuario', usuarioController.eliminar)



module.exports = router;