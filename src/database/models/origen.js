'use strict'

module.exports = (sequelize, DataTypes) => {

    let Origen = sequelize.define('Origen', {
        idOrigen: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 50],
                is: /^[a-zA-Z0-9\s]+$/i
            }
        },
        idCategoria: {
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
        tableName: 'origenes',
        paranoid: true,
        freezeTableName: true,
        hooks: {
            beforeDestroy: async (origen) => {
                const ingresosAsociados = await sequelize.models.Ingreso.count({
                    where: { idOrigen: origen.idOrigen }
                });

                if (ingresosAsociados > 0) {
                    throw new Error('OrigenConIngresosAsociados');
                }
            }
        }
    })
    
    Origen.associate = models => {
        Origen.hasMany(models.Ingreso, {
            foreignKey: 'idOrigen',
            as: 'ingresos'
        })
        Origen.belongsTo(models.Categoria, {
            foreignKey: 'idCategoria',
            as: 'categoria'
        })
    }

    return Origen;
}
