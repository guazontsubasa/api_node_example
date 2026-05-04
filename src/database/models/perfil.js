'use strict'

module.exports = (sequelize, DataTypes) => {

    let Perfil = sequelize.define('Perfil', {
        idPerfil: {
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
        tableName: 'perfiles',
        paranoid: true,
        freezeTableName: true
    })
    
    Perfil.associate = models => {
        Perfil.hasMany(models.Usuario, {
            foreignKey: 'idPerfil',
            as: 'usuarios'
        })
    }
    
    return Perfil;
}
