// SE ENCARGA DE CONECTAR TODAS LAS RUTAS

const { Router } = require("express") // importar express
const decodeJWT = require('../middlewares/decodeJWT') // importar el middleware para decodificar el token JWT y proteger las rutas que lo requieran

const rutas_init = () => { // aca se ponen todas las rutas que existen
  const router = Router() // crear una instancia de express.Router()

  router.use("/usuarios", decodeJWT, require("./usuario.routes")) // para acceder a las rutas de usuarios de la api siempre deberá empezar con /usuarios
  router.use("/perfiles", decodeJWT, require("./perfil.routes")) 
  router.use("/ingresos", decodeJWT, require("./ingreso.routes")) 
  router.use("/gastos", decodeJWT, require("./gasto.routes")) 
  router.use("/origenes", decodeJWT, require("./origen.routes")) 
  router.use("/destinos", decodeJWT, require("./destino.routes")) 
  router.use("/categorias", decodeJWT, require("./categoria.routes"))
  router.use("/formas_pago", decodeJWT, require("./forma_pago.routes"))
  router.use("/reportes", decodeJWT, require("./reporte.routes"))
  router.use("/bancos", decodeJWT, require("./banco.routes"))

  return router // retornar el router
};

const rutas_auth = () => { // aca se ponen las rutas de autenticación
  const router = Router() // crear una instancia de express.Router()

  router.use("/auth", require("./auth.routes")) // para acceder a las rutas de autenticación de la api siempre deberá empezar con /auth

  return router // retornar el router
}

module.exports = { rutas_init, rutas_auth } // exportar el archivo de rutas de la api