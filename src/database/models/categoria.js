'use strict'

module.exports = (sequelize, DataTypes) => {

    let Categoria = sequelize.define('Categoria', {
        idCategoria: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 50],
                is: /^[a-zA-Z0-9\s]+$/i
            },
            unique: true
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        // tipo (ingreso o gasto)
        tipo: {
            type: DataTypes.ENUM('ingreso', 'gasto'),
            validate: {
                isIn: [['ingreso', 'gasto']]
            },
            allowNull: false
        },
        // #ffffff type
        text_color: {
            type: DataTypes.STRING,
            validate: {
                len: [3, 20],
                is: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/i
            },
            default: '#000000',
            allowNull: true
        },
        // #ffffff type
        bg_color: {
            type: DataTypes.STRING,
            validate: {
                len: [3, 20],
                is: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/i
            },
            default: '#ffffff',
            allowNull: true
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
        tableName: 'categorias',
        paranoid: true,
        freezeTableName: true
    })
    
    Categoria.associate = models => {
        Categoria.hasMany(models.Origen, {
            foreignKey: 'idCategoria',
            as: 'origenes'
        });

        Categoria.hasMany(models.Destino, {
            foreignKey: 'idCategoria',
            as: 'destinos'
        });
    }
    
    return Categoria;
}