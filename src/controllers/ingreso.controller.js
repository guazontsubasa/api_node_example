// FUNCIONAMIENTO DE TODAS LAS RUTAS DE INGRESO

const models = require('../database/models/index');

module.exports = {

    listar: async (req, res) => {
        try {
            const ingresos = await models.Ingreso.findAll({
                include: [
                    { model: models.Usuario, as: 'usuario' },
                    { model: models.Origen, as: 'origen',
                        include: [
                            { model: models.Categoria, as: 'categoria' }
                        ]
                     }
                ]
            });

            return res.json({
                success: true,
                message: "listado de ingresos",
                data: { ingresos }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al listar los ingresos", data: null });
        }
    },

    listarInfo: async (req, res) => {
        try {
            const ingreso = await models.Ingreso.findByPk(req.params.idIngreso, {
                include: [
                    { model: models.Usuario, as: 'usuario' },
                    { model: models.Origen, as: 'origen',
                        include: [
                            { model: models.Categoria, as: 'categoria' }
                        ]
                     }
                ]
            });

            if (!ingreso) {
                return res.json({ success: false, message: "Ingreso no encontrado", data: null });
            }

            return res.json({
                success: true,
                message: "información del ingreso con idIngreso: " + req.params.idIngreso,
                data: { ingreso }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al obtener el ingreso", data: null });
        }
    },

    crear: async (req, res) => {
        const { monto, fecha, idUsuario, idOrigen, descripcion } = req.body || {};

        if (!monto || !fecha || !idUsuario || !idOrigen) {
            return res.json({
                success: false,
                message: "Los campos monto, fecha, idUsuario e idOrigen son requeridos",
                data: null
            });
        }

        try {
            const ingreso = await models.Ingreso.create({
                monto,
                fecha,
                idUsuario,
                idOrigen,
                fechaCobro: null,
                descripcion: descripcion || null
            });

            return res.json({
                success: true,
                message: "ingreso creado correctamente",
                data: { ingreso: ingreso.idIngreso }
            });
        } catch (err) {
            
            console.table(err);
            return res.json({ success: false, message: "Error al crear el ingreso", data: null });
        }
    },

    modificar: async (req, res) => {
        const { monto, fecha, idUsuario, idOrigen, descripcion } = req.body || {};
        const { idIngreso } = req.params;

        if (!monto && !fecha && !idUsuario && !idOrigen && descripcion === undefined) {
            return res.json({ success: false, message: "Debe enviar al menos un campo para modificar", data: null });
        }

        try {
            const ingreso = await models.Ingreso.findByPk(idIngreso);
            if (!ingreso) {
                return res.json({ success: false, message: "Ingreso no encontrado", data: null });
            }

            if (monto !== undefined) ingreso.monto = monto;
            if (fecha !== undefined) ingreso.fecha = fecha;
            if (idUsuario !== undefined) ingreso.idUsuario = idUsuario;
            if (idOrigen !== undefined) ingreso.idOrigen = idOrigen;
            if (descripcion !== undefined) ingreso.descripcion = descripcion;

            await ingreso.save();

            return res.json({
                success: true,
                message: "Ingreso modificado correctamente",
                data: { ingreso: ingreso.idIngreso }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al modificar el ingreso", data: null });
        }
    },

    eliminar: async (req, res) => {
        const { idIngreso } = req.params;

        try {
            const ingreso = await models.Ingreso.findByPk(idIngreso);
            if (!ingreso) {
                return res.json({ success: false, message: "Ingreso no encontrado", data: null });
            }

            await ingreso.destroy();

            return res.json({
                success: true,
                message: "Ingreso eliminado correctamente",
                data: { ingreso: idIngreso }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al eliminar el ingreso", data: null });
        }
    },

    marcarCobrado: async (req, res) => {
        const { idIngreso } = req.params;

        try {
            const ingreso = await models.Ingreso.findByPk(idIngreso);
            if (!ingreso) {
                return res.json({ success: false, message: "Ingreso no encontrado", data: null });
            }

            ingreso.fechaCobro = new Date();
            await ingreso.save();

            return res.json({
                success: true,
                message: "Cobro marcado correctamente",
                data: {
                    ingreso: ingreso.idIngreso,
                    fechaCobro: ingreso.fechaCobro
                }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al marcar el ingreso como cobrado", data: null });
        }
    }

}