'use strict'

module.exports = (sequelize, DataTypes) => {

    let Gasto = sequelize.define('Gasto', {
        idGasto: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        monto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 255]
            },
            allowNull: true
        },
        // fecha del mes correspondiente (ej: 2026-04-01 para el mes de abril)
        // validar que la fecha siempre sea el primer día del mes 
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        idUsuario: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        idDestino: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // fecha de vencimiento del gasto (null si no tiene vencimiento)
        fechaVencimiento: {
            type: DataTypes.DATE,
            allowNull: true
        },
        // fecha en la que se marca el gasto como pagado (null si no se ha pagado aún)
        fechaPago: {
            type: DataTypes.DATE,
            allowNull: true
        },
        idFormaPago: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idTarjeta: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cuotas: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at',
            allowNull: true
        }

    }, {
        tableName: 'gastos',
        paranoid: true,
        freezeTableName: true
    })
    
    Gasto.associate = models => {
        Gasto.belongsTo(models.Usuario, {
            foreignKey: 'idUsuario',
            as: 'usuario'
        });
        Gasto.belongsTo(models.FormaPago, {
            foreignKey: 'idFormaPago',
            as: 'formaPago'
        });
        Gasto.belongsTo(models.Destino, {
            foreignKey: 'idDestino',
            as: 'destino'
        });
        Gasto.belongsTo(models.Tarjeta, {
            foreignKey: 'idTarjeta',
            as: 'tarjeta'
        });
    }

    return Gasto;
}
