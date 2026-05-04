'use strict'

const errors = require('../../const/error') 

module.exports = (sequelize, DataTypes) => {

    let Usuario = sequelize.define('Usuario', {
        idUsuario: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            validate: {
                len: [3, 20],
                is: /^[a-zA-Z0-9_]+$/i
            },
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idPerfil: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                min: 1,
                max: 2
            },
            defaultValue: 2 // perfil de usuario
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
        tableName: 'usuarios',
        paranoid: true,
        freezeTableName: true
    })
    
    Usuario.associate = models => {
        Usuario.belongsTo(models.Perfil, {
            foreignKey: 'idPerfil',
            as: 'perfil'
        })
    }
    
    return Usuario;
}
