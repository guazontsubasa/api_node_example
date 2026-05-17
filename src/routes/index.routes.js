// SE ENCARGA DE CONECTAR TODAS LAS RUTAS

const { Router } = require("express") // importar express

const rutas_init = () => { // aca se ponen todas las rutas que existen
  const router = Router() // crear una instancia de express.Router()

  router.use("/usuarios", require("./usuario.routes")) // para acceder a las rutas de usuarios de la api siempre deberá empezar con /usuarios
  router.use("/perfiles", require("./perfil.routes")) 
  router.use("/ingresos", require("./ingreso.routes")) 
  router.use("/gastos", require("./gasto.routes")) 
  router.use("/origenes", require("./origen.routes")) 
  router.use("/destinos", require("./destino.routes")) 
  router.use("/categorias", require("./categoria.routes"))
  router.use("/formas_pago", require("./forma_pago.routes"))
  router.use("/reportes", require("./reporte.routes"))
  router.use("/bancos", require("./banco.routes"))

  return router // retornar el router
};

const rutas_auth = () => { // aca se ponen las rutas de autenticación
  const router = Router() // crear una instancia de express.Router()

  router.use("/auth", require("./auth.routes")) // para acceder a las rutas de autenticación de la api siempre deberá empezar con /auth

  return router // retornar el router
}

module.exports = { rutas_init, rutas_auth } // exportar el archivo de rutas de la api