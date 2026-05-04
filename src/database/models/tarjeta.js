'use strict'

module.exports = (sequelize, DataTypes) => {

    let Tarjeta = sequelize.define('Tarjeta', {
        idTarjeta: {
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
            }
        },
        limite: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        idUsuario: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        idBanco: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        terminaEn: {
            type: DataTypes.STRING(4),
            allowNull: false,
            validate: {
                len: [4, 4],
                is: /^[0-9]+$/i
            }
        },
        // #ffffff type
        color: {
            type: DataTypes.STRING,
            validate: {
                len: [3, 20],
                is: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/i
            },
            allowNull: true
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
        tableName: 'tarjetas',
        paranoid: true,
        freezeTableName: true
    })
    
    Tarjeta.associate = models => {
        Tarjeta.hasMany(models.Gasto, {
            foreignKey: 'idTarjeta',
            as: 'gastos'
        });

        Tarjeta.belongsTo(models.Usuario, {
            foreignKey: 'idUsuario',
            as: 'usuario'
        });
        
        Tarjeta.belongsTo(models.Banco, {
            foreignKey: 'idBanco',
            targetKey: 'idBanco',
            as: 'bancoInfo'
        });
    }
    
    return Tarjeta;
}
