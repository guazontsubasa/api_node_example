'use strict'

const errors = require('../../const/error') 

module.exports = (sequelize, DataTypes) => {

    let Archivo = sequelize.define('Archivo', {
        idArchivo: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        // lo usa multer 
        nombre: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        // lo usa multer 
        file: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        // lo usa multer
        originalName: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        idUsuario: {
            type: DataTypes.BIGINT,
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
        tableName: 'archivos',
        paranoid: true,
        freezeTableName: true
    })
    
    Archivo.associate = models => {
        Archivo.belongsTo(models.Usuario, {
            foreignKey: 'idUsuario',
            as: 'usuario'
        })
    }
    
    return Archivo;
}
