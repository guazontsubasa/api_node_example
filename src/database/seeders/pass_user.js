// SEEDER para cargar un usuario de prueba

'use strict';

const bcrypt = require('bcrypt');
const models = require('../models/index');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            models.Usuario.findOrCreate({
                where: { email: 'leandro@prueba.com' },
                defaults: {
                    username: 'Leandro',
                    email: 'leandro@prueba.com',
                    password: await bcrypt.hash('123456', 10),
                    idPerfil: 2 // perfil de usuario
                }
            })
        ]);
    }
};