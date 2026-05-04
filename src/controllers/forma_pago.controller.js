// FUNCIONAMIENTO DE TODAS LAS RUTAS DE FORMA DE PAGO

const models = require('../database/models/index');

module.exports = {

    listar: async (req, res) => {
        try {
            const formasPago = await models.FormaPago.findAll();

            return res.json({
                success: true,
                message: "listado de formas de pago",
                data: { formasPago }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al listar las formas de pago", data: null });
        }
    },

    toggleActive: async (req, res) => {
        const { idFormaPago } = req.params;

        try {
            const formaPago = await models.FormaPago.findByPk(idFormaPago);
            if (!formaPago) {
                return res.json({ success: false, message: "Forma de pago no encontrada", data: null });
            }

            formaPago.activo = !formaPago.activo;
            await formaPago.save();

            return res.json({
                success: true,
                message: "Estado de la forma de pago actualizado correctamente",
                data: { formaPago: formaPago.idFormaPago, activo: formaPago.activo }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al actualizar el estado de la forma de pago", data: null });
        }
    }

}