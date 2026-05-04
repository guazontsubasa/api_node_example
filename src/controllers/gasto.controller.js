// FUNCIONAMIENTO DE TODAS LAS RUTAS DE GASTO

const models = require('../database/models/index');
const { Op } = require('sequelize');

module.exports = {

    listar: async (req, res) => {
        try {
            const gastos = await models.Gasto.findAll({
                include: [
                    { model: models.Usuario, as: 'usuario' },
                    { model: models.Destino, as: 'destino',
                        include: [
                            { model: models.Categoria, as: 'categoria' }
                        ]
                     },
                    { model: models.FormaPago, as: 'formaPago' },
                    { model: models.Tarjeta, as: 'tarjeta' }
                ]
            });

            return res.json({
                success: true,
                message: "listado de gastos",
                data: { gastos }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al listar los gastos", data: null });
        }
    },

    listarInfo: async (req, res) => {
        try {
            const gasto = await models.Gasto.findByPk(req.params.idGasto, {
                include: [
                    { model: models.Usuario, as: 'usuario' },
                    { model: models.Destino, as: 'destino',
                        include: [
                            { model: models.Categoria, as: 'categoria' }
                        ]
                     },
                    { model: models.FormaPago, as: 'formaPago' },
                    { model: models.Tarjeta, as: 'tarjeta' }
                ]
            });

            if (!gasto) {
                return res.json({ success: false, message: "Gasto no encontrado", data: null });
            }

            return res.json({
                success: true,
                message: "información del gasto con idGasto: " + req.params.idGasto,
                data: { gasto }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al obtener el gasto", data: null });
        }
    },

    // Listar gastos de un mes específico
    listarGastosMensuales: async (req, res) => {
        try {
            let { anio, mes } = req.params;
            const hoy = new Date();
            
            if (!anio || !mes) {
                anio = hoy.getFullYear();
                mes = hoy.getMonth() + 1;
            }
            
            const inicio = new Date(anio, mes - 1, 1);
            const fin = new Date(anio, mes, 0, 23, 59, 59);

            const gastos = await models.Gasto.findAll({
                where: {
                    fecha: { [Op.between]: [inicio, fin] }
                },
                include: [
                    { model: models.Destino, as: 'destino',
                        include: [
                            { model: models.Categoria, as: 'categoria' }
                        ]
                     },
                    { model: models.FormaPago, as: 'formaPago' },
                    { model: models.Tarjeta, as: 'tarjeta' }
                ]
            });

            return res.json({
                success: true,
                message: `gastos del mes ${mes}/${anio}`,
                data: { gastos }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al listar los gastos mensuales", data: null });
        }
    },

    // Listar gastos con fecha de vencimiento pendiente (sin fecha de pago)
    listarGastosPendientes: async (req, res) => {
        try {
            const gastos = await models.Gasto.findAll({
                where: {
                    fechaPago: null,
                    fechaVencimiento: { [Op.ne]: null }
                },
                include: [
                    { model: models.Destino, as: 'destino',
                        include: [
                            { model: models.Categoria, as: 'categoria' }
                        ]
                     },
                    { model: models.FormaPago, as: 'formaPago' },
                    { model: models.Tarjeta, as: 'tarjeta' }
                ]
            });

            return res.json({
                success: true,
                message: "gastos pendientes de pago",
                data: { gastos }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al listar los gastos pendientes", data: null });
        }
    },

    crear: async (req, res) => {
        const { monto, fecha, idUsuario, idDestino, idFormaPago, descripcion, fechaVencimiento, idTarjeta, cuotas } = req.body || {};

        if (!monto || !fecha || !idUsuario || !idDestino || !idFormaPago) {
            return res.json({
                success: false,
                message: "Los campos monto, fecha, idUsuario, idDestino e idFormaPago son requeridos",
                data: null
            });
        }

        try {
            const gasto = await models.Gasto.create({
                monto,
                fecha,
                idUsuario,
                idDestino,
                idFormaPago,
                descripcion: descripcion || null,
                fechaVencimiento: fechaVencimiento || null,
                idTarjeta: idTarjeta || null,
                cuotas: cuotas || 1
            });

            return res.json({
                success: true,
                message: "gasto creado correctamente",
                data: { gasto: gasto.idGasto }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al crear el gasto", data: null });
        }
    },

    modificar: async (req, res) => {
        const { monto, fecha, idUsuario, idDestino, idFormaPago, descripcion, fechaVencimiento, idTarjeta, cuotas } = req.body || {};
        const { idGasto } = req.params;

        if (!monto && !fecha && !idUsuario && !idDestino && !idFormaPago && descripcion === undefined && fechaVencimiento === undefined && idTarjeta === undefined && cuotas === undefined) {
            return res.json({ success: false, message: "Debe enviar al menos un campo para modificar", data: null });
        }

        try {
            const gasto = await models.Gasto.findByPk(idGasto);
            if (!gasto) {
                return res.json({ success: false, message: "Gasto no encontrado", data: null });
            }

            if (monto !== undefined) gasto.monto = monto;
            if (fecha !== undefined) gasto.fecha = fecha;
            if (idUsuario !== undefined) gasto.idUsuario = idUsuario;
            if (idDestino !== undefined) gasto.idDestino = idDestino;
            if (idFormaPago !== undefined) gasto.idFormaPago = idFormaPago;
            if (descripcion !== undefined) gasto.descripcion = descripcion;
            if (fechaVencimiento !== undefined) gasto.fechaVencimiento = fechaVencimiento;
            if (idTarjeta !== undefined) gasto.idTarjeta = idTarjeta;
            if (cuotas !== undefined) gasto.cuotas = cuotas;

            await gasto.save();

            return res.json({
                success: true,
                message: "Gasto modificado correctamente",
                data: { gasto: gasto.idGasto }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al modificar el gasto", data: null });
        }
    },

    eliminar: async (req, res) => {
        const { idGasto } = req.params;

        try {
            const gasto = await models.Gasto.findByPk(idGasto);
            if (!gasto) {
                return res.json({ success: false, message: "Gasto no encontrado", data: null });
            }

            await gasto.destroy();

            return res.json({
                success: true,
                message: "Gasto eliminado correctamente",
                data: { gasto: idGasto }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al eliminar el gasto", data: null });
        }
    },

    // Registrar pago de un gasto (setea fechaPago con la fecha actual)
    pagar: async (req, res) => {
        const { idGasto } = req.params;

        try {
            const gasto = await models.Gasto.findByPk(idGasto);
            if (!gasto) {
                return res.json({ success: false, message: "Gasto no encontrado", data: null });
            }

            if (gasto.fechaPago) {
                return res.json({ success: false, message: "El gasto ya fue pagado", data: null });
            }

            gasto.fechaPago = new Date();
            await gasto.save();

            return res.json({
                success: true,
                message: "Gasto marcado como pagado correctamente",
                data: { gasto: gasto.idGasto, fechaPago: gasto.fechaPago }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al registrar el pago", data: null });
        }
    }

}