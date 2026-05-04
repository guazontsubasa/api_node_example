// RUTAS DE PERFILES

const router = require("express").Router(); // importar express.Router()

const perfilController = require('../controllers/perfil.controller') // importar el archivo de controladores de perfiles

router.get('/', perfilController.listar)
// router.post('/', perfilController.crear)

module.exports = router;