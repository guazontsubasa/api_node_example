// FUNCIONAMIENTO DE TODAS LAS RUTAS DE ORIGEN

const models = require('../database/models/index');

module.exports = {

    listar: async (req, res) => {
        try {
            const origenes = await models.Origen.findAll();

            return res.json({
                success: true,
                message: "listado de origenes",
                data: { origenes }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al listar los origenes", data: null });
        }
    },

    listarInfo: async (req, res) => {
        try {
            const origen = await models.Origen.findByPk(req.params.idOrigen);

            if (!origen) {
                return res.json({ success: false, message: "Origen no encontrado", data: null });
            }

            return res.json({
                success: true,
                message: "información del origen con idOrigen: " + req.params.idOrigen,
                data: { origen }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al obtener el origen", data: null });
        }
    },

    crear: async (req, res) => {
        const { nombre, idCategoria } = req.body || {};

        if (!nombre || !idCategoria) {
            return res.json({ success: false, message: "Los campos nombre e idCategoria son requeridos", data: null });
        }

        try {
            const origen = await models.Origen.create({ nombre, idCategoria });

            return res.json({
                success: true,
                message: "origen creado correctamente",
                data: { origen: origen.idOrigen }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al crear el origen", data: null });
        }
    },

    modificar: async (req, res) => {
        const { nombre, idCategoria } = req.body || {};
        const { idOrigen } = req.params;

        if (!nombre && !idCategoria) {
            return res.json({ success: false, message: "Debe enviar al menos un campo para modificar", data: null });
        }

        try {
            const origen = await models.Origen.findByPk(idOrigen);
            if (!origen) {
                return res.json({ success: false, message: "Origen no encontrado", data: null });
            }

            if (nombre !== undefined) origen.nombre = nombre;
            if (idCategoria !== undefined) origen.idCategoria = idCategoria;
            await origen.save();

            return res.json({
                success: true,
                message: "Origen modificado correctamente",
                data: { origen: origen.idOrigen }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al modificar el origen", data: null });
        }
    },

    eliminar: async (req, res) => {
        const { idOrigen } = req.params;

        try {
            const origen = await models.Origen.findByPk(idOrigen);
            if (!origen) {
                return res.json({ success: false, message: "Origen no encontrado", data: null });
            }

            const ingresosAsociados = await models.Ingreso.count({
                where: { idOrigen: origen.idOrigen }
            });

            if (ingresosAsociados > 0) {
                return res.json({
                    success: false,
                    message: "No se puede eliminar el origen porque tiene ingresos asociados",
                    data: null
                });
            }

            await origen.destroy();

            return res.json({
                success: true,
                message: "Origen eliminado correctamente",
                data: { origen: idOrigen }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al eliminar el origen", data: null });
        }
    },

    toggleActive: async (req, res) => {
        const { idOrigen } = req.params;

        try {
            const origen = await models.Origen.findByPk(idOrigen);
            if (!origen) {
                return res.json({ success: false, message: "Origen no encontrado", data: null });
            }

            origen.activo = !origen.activo;
            await origen.save();

            return res.json({
                success: true,
                message: "Estado del origen actualizado correctamente",
                data: { origen: origen.idOrigen, activo: origen.activo }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al actualizar el estado del origen", data: null });
        }
    }

}