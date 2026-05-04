// FUNCIONAMIENTO DE TODAS LAS RUTAS DE DESTINO

const models = require('../database/models/index');

module.exports = {

    listar: async (req, res) => {
        try {
            const destinos = await models.Destino.findAll();

            return res.json({
                success: true,
                message: "listado de destinos",
                data: { destinos }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al listar los destinos", data: null });
        }
    },

    listarInfo: async (req, res) => {
        try {
            const destino = await models.Destino.findByPk(req.params.idDestino);

            if (!destino) {
                return res.json({ success: false, message: "Destino no encontrado", data: null });
            }

            return res.json({
                success: true,
                message: "información del destino con idDestino: " + req.params.idDestino,
                data: { destino }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al obtener el destino", data: null });
        }
    },

    crear: async (req, res) => {
        const { nombre, idCategoria } = req.body || {};

        if (!nombre || !idCategoria) {
            return res.json({ success: false, message: "Los campos nombre e idCategoria son requeridos", data: null });
        }

        try {
            const destino = await models.Destino.create({ nombre, idCategoria });

            return res.json({
                success: true,
                message: "destino creado correctamente",
                data: { destino: destino.idDestino }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al crear el destino", data: null });
        }
    },

    modificar: async (req, res) => {
        const { nombre, idCategoria } = req.body || {};
        const { idDestino } = req.params;

        if (!nombre && !idCategoria) {
            return res.json({ success: false, message: "Debe enviar al menos un campo para modificar", data: null });
        }

        try {
            const destino = await models.Destino.findByPk(idDestino);
            if (!destino) {
                return res.json({ success: false, message: "Destino no encontrado", data: null });
            }

            if (nombre !== undefined) destino.nombre = nombre;
            if (idCategoria !== undefined) destino.idCategoria = idCategoria;
            await destino.save();

            return res.json({
                success: true,
                message: "Destino modificado correctamente",
                data: { destino: destino.idDestino }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al modificar el destino", data: null });
        }
    },

    eliminar: async (req, res) => {
        const { idDestino } = req.params;

        try {
            const destino = await models.Destino.findByPk(idDestino);
            if (!destino) {
                return res.json({ success: false, message: "Destino no encontrado", data: null });
            }

            const gastosAsociados = await models.Gasto.count({
                where: { idDestino: destino.idDestino }
            });

            if (gastosAsociados > 0) {
                return res.json({
                    success: false,
                    message: "No se puede eliminar el destino porque tiene gastos asociados",
                    data: null
                });
            }

            await destino.destroy();

            return res.json({
                success: true,
                message: "Destino eliminado correctamente",
                data: { destino: idDestino }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al eliminar el destino", data: null });
        }
    },

    toggleActive: async (req, res) => {
        const { idDestino } = req.params;

        try {
            const destino = await models.Destino.findByPk(idDestino);
            if (!destino) {
                return res.json({ success: false, message: "Destino no encontrado", data: null });
            }

            destino.activo = !destino.activo;
            await destino.save();

            return res.json({
                success: true,
                message: "Estado del destino actualizado correctamente",
                data: { destino: destino.idDestino, activo: destino.activo }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al actualizar el estado del destino", data: null });
        }
    }

}