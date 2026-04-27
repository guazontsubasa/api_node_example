// SE ENCARGA DE CONECTAR TODAS LAS RUTAS

const { Router } = require("express") // importar express

const usuarioRoutes = require("./usuario.routes") // importar el archivo de rutas de usuarios

const rutas_init = () => { // aca se ponen todas las rutas que existen
  const router = Router() // crear una instancia de express.Router()

  router.use("/usuarios", usuarioRoutes) // para acceder a las rutas de usuarios de la api siempre deberá empezar con /usuarios
  router.use("/pacientes", require("./paciente.routes")) // para acceder a las rutas de pacientes de la api siempre deberá empezar con /pacientes
  router.use("/medicos", require("./medico.routes")) // para acceder a las rutas de medicos de la api siempre deberá empezar con /medicos
  router.use("/tratamientos", require("./tratamiento.routes")) // para acceder a las rutas de tratamientos de la api siempre deberá empezar con /tratamientos

  return router // retornar el router
};

module.exports = { rutas_init } // exportar el archivo de rutas de la api