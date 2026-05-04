'use strict'

module.exports = (sequelize, DataTypes) => {

    let Ingreso = sequelize.define('Ingreso', {
        idIngreso: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        monto: {
            type: DataTypes.DECIMAL(10, 2),
            validate: {
                min: 0.00
            },
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
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        idUsuario: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        idOrigen: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        // fecha en la que se marca el ingreso como cobrado (null si no se ha cobrado aún)
        fechaCobro: {
            type: DataTypes.DATE,
            field: 'fecha_cobro',
            allowNull: true,
            defaultValue: null
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
        tableName: 'ingresos',
        paranoid: true,
        freezeTableName: true
    })
    
    Ingreso.associate = models => {
        Ingreso.belongsTo(models.Usuario, {
            foreignKey: 'idUsuario',
            as: 'usuario'
        });
        Ingreso.belongsTo(models.Origen, {
            foreignKey: 'idOrigen',
            as: 'origen'
        });
    }
    
    return Ingreso;
}
