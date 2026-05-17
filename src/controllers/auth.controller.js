// FUNCIONAMIENTO DE TODAS LAS RUTAS DE AUTENTICACIÓN

const models = require('../database/models/index');
const errors = require('../const/error')
const globalConstants = require('../const/globalConstants')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signJWT = require('../middlewares/signJWT') // importar el middleware para generar el token JWT

module.exports = {

    login: async (req, res) => {    
        const { email, password } = req.body || {};
        
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Los campos email y password son requeridos",
                data: null
            })
        }

        try {
            const usuario = await models.Usuario.findOne({ where: { email: email } });

            if (!usuario) {
                return next(errors.CredencialesInvalidas)
            }

            const passwordIsValid = await bcrypt.compare(password, usuario.password);

            if (!passwordIsValid) {
                return next(errors.CredencialesInvalidas)
            }

            return res.json({
                success: true,
                message: `Inicio de sesión exitoso. Bienvenido ${usuario.username}`,
                data: {
                    idUsuario: usuario.idUsuario,
                    token: signJWT(usuario)
                }
            })
        }
        catch (err) {
            console.log(err)
            return res.json({
                success: false,
                message: "Error al iniciar sesión",
                data: null
            })
        }
    },

    register: async (req, res, next) => {
        const { username, email, password } = req.body || {};

        if (!username || !email || !password) {
            return res.json({
                success: false,
                message: "Los campos username, email y password son requeridos",
                data: null
            })
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const [usuario, created] = await models.Usuario.findOrCreate({
                where: { email: email },
                defaults: {
                    username: username,
                    email: email,
                    password: hashedPassword
                }
            });

            if (!created) {
                return res.json({
                    success: false,
                    message: "El usuario ya existe",
                    data: null
                })
            }

            return res.json({
                success: true,
                message: `Registro exitoso. Bienvenido ${usuario.username}`,
                data: {
                    idUsuario: usuario.idUsuario
                }
            })
        }
        catch (err) {
            console.log(err)
            return next(err)
        }
    }
}