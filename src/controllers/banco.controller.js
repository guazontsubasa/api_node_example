// FUNCIONAMIENTO DE TODAS LAS RUTAS DE BANCO

const models = require('../database/models/index');

module.exports = {

    listar: async (req, res) => {
        try {
            const bancos = await models.Banco.findAll();

            return res.json({
                success: true,
                message: "listado de bancos",
                data: {
                    bancos: bancos
                }
            })
        } catch (err) {
            console.log(err)
            return res.json({
                success: false,
                message: "Error al listar los bancos",
                data: null
            })
        }
    },

    listarInfo: async (req, res) => {
        const banco = await models.Banco.findByPk(req.params.idBanco);

        if (!banco) {
            return res.json({
                success: false,
                message: "Banco no encontrado",
                data: null
            })
        }

        return res.json({
            success: true,
            message: "información del banco con idBanco: " + req.params.idBanco,
            data: {
                banco: banco
            }
        })
    },

    crear: async (req, res) => {
        const { nombre, idUsuario } = req.body || {};
        
        if (!nombre || !idUsuario) {
            return res.json({
                success: false,
                message: "Los campos nombre e idUsuario son requeridos",
                data: null
            })
        }

        try {
            const banco = await models.Banco.create({
                nombre: nombre,
                idUsuario: idUsuario
            })
            
            return res.json({
                success: true,
                message: "banco creado correctamente",
                data: {
                    banco: banco.idBanco
                }
            })
        } catch (err) {
            console.log(err)
            return res.json({
                success: false,
                message: "Error al crear el banco",
                data: null
            })
        }
    },

    modificar: async (req, res) => {
        const { nombre, idUsuario } = req.body || {};
        const { idBanco } = req.params;

        if (!nombre || !idUsuario) {
            return res.json({
                success: false,
                message: "Los campos nombre e idUsuario son requeridos",
                data: null
            })
        }
        
        try {
            const banco = await models.Banco.findByPk(idBanco);
            if (!banco) {
                return res.json({
                    success: false,
                    message: "Banco no encontrado",
                    data: null
                })
            }

            banco.nombre = nombre;
            banco.idUsuario = idUsuario;
            await banco.save();
            
            return res.json({
                success: true,
                message: "Banco modificado correctamente",
                data: {
                    banco: banco.idBanco
                }
            })
        }
        catch (err) {
            console.log(err)
            return res.json({
                success: false,
                message: "Error al modificar el banco",
                data: null
            })
        }
    },

    eliminar: async (req, res) => {
        const { idBanco } = req.params;

        try {
            const banco = await models.Banco.findByPk(idBanco);
            if (!banco) {
                return res.json({
                    success: false,
                    message: "Banco no encontrado",
                    data: null
                });
            }

            await banco.destroy();

            return res.json({
                success: true,
                message: "Banco eliminado correctamente",
                data: {
                    banco: idBanco
                }
            });
        } catch (err) {
            console.log(err);
            return res.json({
                success: false,
                message: "Error al eliminar el banco",
                data: null
            });
        }
    },

    toggleActive: async (req, res) => {
        const { idBanco } = req.params;

        try {
            const banco = await models.Banco.findByPk(idBanco);
            if (!banco) {
                return res.json({
                    success: false,
                    message: "Banco no encontrado",
                    data: null
                });
            }

            banco.activo = !banco.activo;
            await banco.save();

            return res.json({
                success: true,
                message: "Estado del banco actualizado correctamente",
                data: {
                    banco: banco.idBanco,
                    activo: banco.activo,
                    nombre: banco.nombre
                }
            });
        } catch (err) {
            console.log(err);
            return res.json({
                success: false,
                message: "Error al actualizar el estado del banco",
                data: null
            });
        }
    }

}