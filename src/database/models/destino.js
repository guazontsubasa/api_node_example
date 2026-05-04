'use strict'

module.exports = (sequelize, DataTypes) => {

    let Destino = sequelize.define('Destino', {
        idDestino: {
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
        tableName: 'destinos',
        paranoid: true,
        freezeTableName: true,
        hooks: {
            beforeDestroy: async (destino) => {
                const gastosAsociados = await sequelize.models.Gasto.count({
                    where: { idDestino: destino.idDestino }
                });

                if (gastosAsociados > 0) {
                    throw new Error('DestinoConGastosAsociados');
                }
            }
        }
    })
    
    Destino.associate = models => {
        Destino.hasMany(models.Gasto, {
            foreignKey: 'idDestino',
            as: 'gastos'
        })
        Destino.belongsTo(models.Categoria, {
            foreignKey: 'idCategoria',
            as: 'categoria'
        })
    }
    
    return Destino;
}
