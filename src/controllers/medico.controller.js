// FUNCIONAMIENTO DE TODAS LAS RUTAS DE MÉDICO

module.exports = {

    listar: async (req, res) => {
        try {

            res.json({
                message: "listado de médicos"
            })

        } catch (err) {
            console.log(err)
        }
    },

    listarInfo: async (req, res) => {
        try {

            res.json({
                message: "información del médico con idMedico: " + req.params.idMedico
            })

        } catch (err) {
            console.log(err)
        }
    },

    crear: async (req, res) => {
        try {

            res.json({
                message: "médico creado correctamente"
            })

        } catch (err) {
            console.log(err)
        }
    },

}