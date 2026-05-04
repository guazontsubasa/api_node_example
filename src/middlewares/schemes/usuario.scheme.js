// ARCHIVO PARA ESCRIBIR SCHEMES DE USUARIOS

const Joi = require('joi');

const crearUsuario = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const modificarUsuario = Joi.object({
    username: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(6)
}).or('username', 'email', 'password'); // al menos uno de los campos debe estar presente

module.exports = {
    crearUsuario,
    modificarUsuario
};