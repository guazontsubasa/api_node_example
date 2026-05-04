// FUNCIONAMIENTO DE TODAS LAS RUTAS DE PERFIL

const models = require('../database/models/index')

module.exports = {

    listar: async (req, res) => {
        const perfiles = await models.Perfil.findAll()
        res.json({
            success: true,
            message: "listado de perfiles",
            data: {
                perfiles: perfiles
            }
        })
        
    }
    // ,

    // crear: async (req, res) => {
    //     const { nombre } = req.body || {};

    //     if (!nombre) {
    //         return res.json({
    //             success: false,
    //             message: "El campo nombre es requerido",
    //             data: null
    //         })
    //     }

    //     try {
    //         const perfil = await models.Perfil.create({
    //             nombre: nombre
    //         })

    //         return res.json({
    //             success: true,
    //             message: "perfil creado correctamente",
    //             data: {
    //                 perfil: perfil.idPerfil
    //             }
    //         })
    //     } catch (err) {
    //         console.log(err)
    //         return res.json({
    //             success: false,
    //             message: "Error al crear el perfil",
    //             data: null
    //         })
    //     }    
    // }

}