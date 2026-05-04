// FUNCIONAMIENTO DE TODAS LAS RUTAS DE CATEGORIA

const models = require('../database/models/index');

module.exports = {

    listar: async (req, res) => {
        try {
            const categorias = await models.Categoria.findAll();

            return res.json({
                success: true,
                message: "listado de categorias",
                data: {
                    categorias: categorias
                }
            })
        } catch (err) {
            console.log(err)
            return res.json({
                success: false,
                message: "Error al listar las categorias",
                data: null
            })
        }
    },

    listarInfo: async (req, res) => {
        const categoria = await models.Categoria.findByPk(req.params.idCategoria);

        if (!categoria) {
            return res.json({
                success: false,
                message: "Categoria no encontrada",
                data: null
            })
        }

        return res.json({
            success: true,
            message: "información de la categoria con idCategoria: " + req.params.idCategoria,
            data: {
                categoria: categoria
            }
        })
    },

    crear: async (req, res) => {
        const { nombre, tipo } = req.body || {};

        if (!nombre || !tipo) {
            return res.json({
                success: false,
                message: "Los campos nombre y tipo son requeridos",
                data: null
            })
        }

        if (tipo !== 'ingreso' && tipo !== 'gasto') {
            return res.json({
                success: false,
                message: "El campo tipo debe ser ingreso o gasto",
                data: null
            })
        }

        try {
            const categoria = await models.Categoria.create({
                nombre: nombre,
                tipo: tipo
            })

            return res.json({
                success: true,
                message: "categoria creada correctamente",
                data: {
                    categoria: categoria.idCategoria
                }
            })
        } catch (err) {
            console.log(err)
            return res.json({
                success: false,
                message: "Error al crear la categoria",
                data: null
            })
        }
    },

    modificar: async (req, res) => {
        const { nombre, tipo } = req.body || {};
        const { idCategoria } = req.params;

        if (!nombre && !tipo) {
            return res.json({
                success: false,
                message: "Al menos un campo (nombre o tipo) es requerido",
                data: null
            })
        }

        if (tipo && tipo !== 'ingreso' && tipo !== 'gasto') {
            return res.json({
                success: false,
                message: "El campo tipo debe ser ingreso o gasto",
                data: null
            })
        }

        try {
            const categoria = await models.Categoria.findByPk(idCategoria);
            if (!categoria) {
                return res.json({
                    success: false,
                    message: "Categoria no encontrada",
                    data: null
                });
            }

            if (nombre) categoria.nombre = nombre;
            if (tipo) categoria.tipo = tipo;

            await categoria.save();

            return res.json({
                success: true,
                message: "Categoria modificada correctamente",
                data: {
                    categoria: categoria.idCategoria
                }
            });
        } catch (err) {
            console.log(err);
            return res.json({
                success: false,
                message: "Error al modificar la categoria",
                data: null
            });
        }
    },

    eliminar: async (req, res) => {
        const { idCategoria } = req.params;

        try {
            const categoria = await models.Categoria.findByPk(idCategoria);
            if (!categoria) {
                return res.json({
                    success: false,
                    message: "Categoria no encontrada",
                    data: null
                });
            }

            await categoria.destroy();

            return res.json({
                success: true,
                message: "Categoria eliminada correctamente",
                data: {
                    categoria: idCategoria
                }
            });
        } catch (err) {
            console.log(err);
            return res.json({
                success: false,
                message: "Error al eliminar la categoria",
                data: null
            });
        }
    },

    toggleActive: async (req, res) => {
        const { idCategoria } = req.params;

        try {
            const categoria = await models.Categoria.findByPk(idCategoria);
            if (!categoria) {
                return res.json({
                    success: false,
                    message: "Categoria no encontrada",
                    data: null
                });
            }

            categoria.activo = !categoria.activo;
            await categoria.save();

            return res.json({
                success: true,
                message: "Estado de la categoria actualizado correctamente",
                data: {
                    categoria: categoria.idCategoria,
                    activo: categoria.activo,
                    nombre: categoria.nombre,
                    tipo: categoria.tipo
                }
            });
        } catch (err) {
            console.log(err);
            return res.json({
                success: false,
                message: "Error al actualizar el estado de la categoria",
                data: null
            });
        }
    }

}