'use strict'

module.exports = (sequelize, DataTypes) => {

    let Banco = sequelize.define('Banco', {
        idBanco: {
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
            allowNull: false
        },
        idUsuario: {
            type: DataTypes.BIGINT,
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
        tableName: 'bancos',
        paranoid: true,
        freezeTableName: true
    })

    Banco.associate = models => {
        Banco.hasMany(models.Tarjeta, {
            foreignKey: 'idBanco',
            as: 'tarjetas'
        });

        Banco.belongsTo(models.Usuario, {
            foreignKey: 'idUsuario',
            as: 'usuario'
        });
    };

    return Banco;
}
