// FUNCIONAMIENTO DE TODAS LAS RUTAS DE REPORTE

const models = require('../database/models/index');
const { Op } = require('sequelize');

module.exports = {

    // Reporte general: total de ingresos y gastos del mes actual
    resumenMensual: async (req, res) => {
        try {
            const ahora = new Date();
            const inicio = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
            const fin = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0, 23, 59, 59);

            const ingresos = await models.Ingreso.findAll({
                where: { fecha: { [Op.between]: [inicio, fin] } }
            });

            const gastos = await models.Gasto.findAll({
                where: { fecha: { [Op.between]: [inicio, fin] } }
            });

            const totalIngresos = ingresos.reduce((acc, i) => acc + parseFloat(i.monto), 0);
            const totalGastos = gastos.reduce((acc, g) => acc + parseFloat(g.monto), 0);

            return res.json({
                success: true,
                message: "reporte del mes actual",
                data: {
                    totalIngresos,
                    totalGastos,
                    balance: totalIngresos - totalGastos,
                    cantidadIngresos: ingresos.length,
                    cantidadGastos: gastos.length
                }
            });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Error al generar el reporte", data: null });
        }
    }

}