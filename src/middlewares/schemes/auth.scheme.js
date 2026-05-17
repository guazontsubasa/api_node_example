// ARCHIVO PARA ESCRIBIR SCHEMES DEL LOGIN

const Joi = require('joi');

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const register = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

module.exports = {
    login,
    register
};