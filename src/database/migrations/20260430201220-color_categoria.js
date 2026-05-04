'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // add columns text_color y bg_color to categorias table
    await queryInterface.addColumn('categorias', 'text_color', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '#000000'
    });

    await queryInterface.addColumn('categorias', 'bg_color', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '#ffffff'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('categorias', 'text_color');
    await queryInterface.removeColumn('categorias', 'bg_color');
  }
};
