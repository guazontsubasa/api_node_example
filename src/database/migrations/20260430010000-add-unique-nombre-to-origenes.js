'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint('origenes', {
      fields: ['nombre'],
      type: 'unique',
      name: 'origenes_nombre_unique'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('origenes', 'origenes_nombre_unique');
  }
};
