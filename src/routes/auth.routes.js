// RUTAS de AUTENTICACIÓN

const router = require("express").Router(); // importar express.Router()

const authController = require('../controllers/auth.controller') // importar el archivo de controladores de autenticación
const validate = require('../middlewares/validate') // importar el middleware de validación
const authSchema = require('../middlewares/schemes/auth.scheme') // importar los schemas de validación para autenticación

router.post('/login', validate(authSchema.login), authController.login) // ruta para iniciar sesión
router.post('/register', validate(authSchema.register), authController.register) // ruta para registrarse

module.exports = router;