'use strict';

const models = require('../models/index'); // importar los modelos de la base de datos

const indexBy = (items, key) => {
  return items.reduce((accumulator, item) => {
    accumulator[item[key]] = item;
    return accumulator;
  }, {});
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const transaction = await queryInterface.sequelize.transaction();

    try {
      const perfiles = await models.Perfil.bulkCreate([
        { nombre: 'admin' },
        { nombre: 'usuario' }
      ], { returning: true, transaction });
      const perfilesPorNombre = indexBy(perfiles, 'nombre');

      const usuarios = await models.Usuario.bulkCreate([
        { username: 'admin', email: 'admin@example.com', password: '$2b$10$1p7NSnXlmC8uXYgQiF/Dte6fMliV1vGvVPZ1AwMCFfdbp6SU5K06.', idPerfil: perfilesPorNombre.admin.idPerfil },
        { username: 'usuario1', email: 'usuario1@example.com', password: '$2b$10$1p7NSnXlmC8uXYgQiF/Dte6fMliV1vGvVPZ1AwMCFfdbp6SU5K06.', idPerfil: perfilesPorNombre.usuario.idPerfil }
      ], { returning: true, transaction });
      const usuariosPorUsername = indexBy(usuarios, 'username');

      const categorias = await models.Categoria.bulkCreate([
        { nombre: 'Laboral', tipo: 'ingreso', 'text_color': '#ffffff', 'bg_color': '#007bff' },
        { nombre: 'Impuestos', tipo: 'gasto', 'text_color': '#ffffff', 'bg_color': '#dc3545' },
        { nombre: 'Transporte', tipo: 'gasto', 'text_color': '#ffffff', 'bg_color': '#28a745' },
        { nombre: 'Profesional', tipo: 'gasto', 'text_color': '#ffffff', 'bg_color': '#17a2b8' },
        { nombre: 'Salud', tipo: 'gasto', 'text_color': '#000000', 'bg_color': '#ffc107' },
        { nombre: 'Educación', tipo: 'gasto', 'text_color': '#ffffff', 'bg_color': '#6f42c1' },
        { nombre: 'Entretenimiento', tipo: 'gasto', 'text_color': '#000000', 'bg_color': '#fd7e14' },
        { nombre: 'Internet', tipo: 'gasto', 'text_color': '#000000', 'bg_color': '#20c997' },
        { nombre: 'Hogar', tipo: 'gasto', 'text_color': '#ffffff', 'bg_color': '#6610f2' },
        { nombre: 'Insumos', tipo: 'gasto', 'text_color': '#ffffff', 'bg_color': '#e83e8c' },
        { nombre: 'Servicios', tipo: 'gasto', 'text_color': '#000000', 'bg_color': '#6c757d' },
        { nombre: 'Social', tipo: 'gasto', 'text_color': '#000000', 'bg_color': '#fd7e14' }, 
        { nombre: 'Tarjetas', tipo: 'gasto', 'text_color': '#000000', 'bg_color': '#20c997' }
      ], { returning: true, transaction });
      const categoriasPorNombre = indexBy(categorias, 'nombre');

      await models.FormaPago.bulkCreate([
        { nombre: 'Efectivo' },
        { nombre: 'Tarjeta de crédito' },
        { nombre: 'Transferencia bancaria' },
        { nombre: 'Débito automático' },
        { nombre: 'Débito en cuenta' }
      ], { returning: true, transaction });

      const bancos = await models.Banco.bulkCreate([
        { nombre: 'Banco de la Nación Argentina', idUsuario: usuariosPorUsername.admin.idUsuario },
        { nombre: 'Banco Provincia', idUsuario: usuariosPorUsername.admin.idUsuario },
        { nombre: 'Brubank', idUsuario: usuariosPorUsername.admin.idUsuario },
        { nombre: 'Ualá', idUsuario: usuariosPorUsername.admin.idUsuario },
        { nombre: 'Mercado Pago', idUsuario: usuariosPorUsername.admin.idUsuario }
      ], { returning: true, transaction });
      const bancosPorNombre = indexBy(bancos, 'nombre');

      await models.Origen.bulkCreate([
        { nombre: 'Sueldo provincia', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Laboral.idCategoria },
        { nombre: 'Sueldo Freelance', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Laboral.idCategoria },
        { nombre: 'Sueldo Jardín', idUsuario: usuariosPorUsername.usuario1.idUsuario, idCategoria: categoriasPorNombre.Laboral.idCategoria }
      ], { returning: true, transaction });

      await models.Destino.bulkCreate([
        { nombre: 'Edelap', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Servicios.idCategoria },
        { nombre: 'Camuzzi', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Servicios.idCategoria },
        { nombre: 'ABSA', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Servicios.idCategoria },
        { nombre: 'Supermercado', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Insumos.idCategoria },
        { nombre: 'SUBE', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Transporte.idCategoria },
        { nombre: 'Pediatría', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Salud.idCategoria },
        { nombre: 'Contador', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Profesional.idCategoria },
        { nombre: 'Monotributo Unificado', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Impuestos.idCategoria },
        { nombre: 'ARBA Inmobiliario', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Impuestos.idCategoria },
        { nombre: 'ARBA Automotor', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Impuestos.idCategoria },
        { nombre: 'APR', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Impuestos.idCategoria },
        { nombre: 'Celular Movistar', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Servicios.idCategoria },
        { nombre: 'CPCIBA', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Profesional.idCategoria },
        { nombre: 'HBO Max', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Internet.idCategoria },
        { nombre: 'Google One', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Internet.idCategoria },
        { nombre: 'Google Youtube', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Internet.idCategoria },
        { nombre: 'Microsoft 365', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Internet.idCategoria },
        { nombre: 'Jardín', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre['Educación'].idCategoria },
        { nombre: 'Combustible', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Transporte.idCategoria },
        { nombre: 'Gimnasio', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Salud.idCategoria },
        { nombre: 'Jardinero', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Hogar.idCategoria },
        { nombre: 'Starlink', idUsuario: usuariosPorUsername.admin.idUsuario, idCategoria: categoriasPorNombre.Internet.idCategoria }
      ], { returning: true, transaction });

      await models.Tarjeta.bulkCreate([
        { nombre: 'Visa', limite: 50000, idUsuario: usuariosPorUsername.admin.idUsuario, idBanco: bancosPorNombre['Banco de la Nación Argentina'].idBanco, terminaEn: '1234', color: 'azul' },
        { nombre: 'Mastercard', limite: 30000, idUsuario: usuariosPorUsername.admin.idUsuario, idBanco: bancosPorNombre['Banco Provincia'].idBanco, terminaEn: '5678', color: 'rojo' },
        { nombre: 'American Express', limite: 70000, idUsuario: usuariosPorUsername.admin.idUsuario, idBanco: bancosPorNombre.Brubank.idBanco, terminaEn: '9012', color: 'verde' },
        { nombre: 'Visa', limite: 40000, idUsuario: usuariosPorUsername.admin.idUsuario, idBanco: bancosPorNombre['Ualá'].idBanco, terminaEn: '3456', color: 'amarillo' }
      ], { returning: true, transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return Promise.all([
      models.Perfil.destroy({ where: {} }),
      models.Usuario.destroy({ where: {} }),
      models.Categoria.destroy({ where: {} }),
      models.FormaPago.destroy({ where: {} }),
      models.Banco.destroy({ where: {} }),
      models.Tarjeta.destroy({ where: {} }),
      models.Origen.destroy({ where: {} }),
      models.Destino.destroy({ where: {} })
    ]);
  }
};
