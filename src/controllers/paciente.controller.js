// FUNCIONAMIENTO DE TODAS LAS RUTAS DE PACIENTE

module.exports = {

    listar: async (req, res) => {
        try {

            res.json({
                message: "listado de pacientes"
            })

        } catch (err) {
            console.log(err)
        }
    },

    listarInfo: async (req, res) => {
        try {
            res.json({
                message: "información del paciente con idPaciente: " + req.params.idPaciente
            })

        } catch (err) {
            console.log(err)
        }
    },

    crear: async (req, res) => {
        try {

            res.json({
                message: "paciente creado correctamente"
            })

        } catch (err) {
            console.log(err)
        }
    },



}