'use strict'

module.exports = (sequelize, DataTypes) => {

    // Las formas de pago pueden ser: efectivo, tarjeta de crédito

    let FormaPago = sequelize.define('FormaPago', {
        idFormaPago: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            validate: {
                len: [3, 50],
                is: /^[a-zA-Z0-9\s]+$/i
            },
            unique: true,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
        tableName: 'formas_pago',
        paranoid: true,
        freezeTableName: true
    })
    
    FormaPago.associate = models => {
        FormaPago.hasMany(models.Gasto, {
            foreignKey: 'idFormaPago',
            as: 'gastos'
        })
    }
    
    return FormaPago;
}
