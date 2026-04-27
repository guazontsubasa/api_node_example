// FUNCIONAMIENTO DE TODAS LAS RUTAS DE TRATAMIENTO

module.exports = {

    listar: async (req, res) => {
        try {

            res.json({
                message: "listado de tratamientos"
            })

        } catch (err) {
            console.log(err)
        }
    },

    listarInfo: async (req, res) => {
        try {
            
            res.json({
                message: "información del tratamiento con idTratamiento: " + req.params.idTratamiento
            })

        } catch (err) {
            console.log(err)
        }
    },

    crear: async (req, res) => {
        try {

            res.json({
                message: "tratamiento creado correctamente"
            })

        } catch (err) {
            console.log(err)
        }
    },


}