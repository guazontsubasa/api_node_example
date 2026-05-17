// RUTAS DE USUARIOS

const router = require("express").Router(); // importar express.Router()

const validate = require('../middlewares/validate') // importar el middleware de validación
const usuarioSchema = require('../middlewares/schemes/usuario.scheme') // importar los schemas de validación para usuarios
const usuarioController = require('../controllers/usuario.controller') // importar el archivo de controladores de usuarios
const globalConstants = require('../const/globalConstants') // importar el archivo de constantes globales

var multer = require('multer') // importar multer para manejar la subida de archivos

var upload = multer({ 
    dest: 'uploads/archivos/', // carpeta donde se guardarán los archivos subidos
    limits: {
        fileSize: globalConstants.MAX_FILE_SIZE // limitar el tamaño de los archivos a 5MB
    }

}) // configurar multer para guardar los archivos en la carpeta uploads

router.post('/archivos', upload.single('jpg'), usuarioController.subirArchivo) // to upload a file for a specific user (user specified in the query params)
router.get('/archivos', usuarioController.listarArchivos) // to list files of a specific user (user specified in the query params)
router.get('/archivos/:idArchivo', usuarioController.descargarArchivo) // to download a specific file of a specific user (user specified in the query params)
router.delete('/archivos/:idArchivo', usuarioController.eliminarArchivo) // to delete a specific file of a specific user (user specified in the query params)

router.get('/', usuarioController.listar)
router.post('/', validate(usuarioSchema.crearUsuario), usuarioController.crear)
router.get('/:idUsuario', usuarioController.listarInfo)
router.put('/:idUsuario', validate(usuarioSchema.modificarUsuario), usuarioController.modificar)
router.delete('/:idUsuario', usuarioController.eliminar)



module.exports = router;