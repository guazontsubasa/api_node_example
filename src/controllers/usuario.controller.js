// FUNCIONAMIENTO DE TODAS LAS RUTAS DE USUARIO

module.exports = {

    listar: async (req, res) => {
        try {

            res.json({
                message: "listado de usuarios"
            })

        } catch (err) {
            console.log(err)
        }
    },

    listarInfo: async (req, res) => {
        try {

            res.json({
                message: "información del usuario con idUsuario: " + req.params.idUsuario
            })

        } catch (err) {
            console.log(err)
        }
    },

    crear: async (req, res) => {
        try {

            res.json({
                message: "usuario creado correctamente"
            })

        } catch (err) {
            console.log(err)
        }
    }

}