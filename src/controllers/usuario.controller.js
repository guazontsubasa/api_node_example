// FUNCIONAMIENTO DE TODAS LAS RUTAS DE USUARIO

const models = require('../database/models/index');
const bcrypt = require('bcrypt');

module.exports = {

    listar: async (req, res) => {

        const users = await models.Usuario.findAll();

        res.json({
            success: true,
            message: "listado de usuarios",
            data: {
                usuarios: users
            }
        })

    },

    listarInfo: async (req, res) => {
        const user = await models.Usuario.findByPk(req.params.idUsuario);

        if (!user) {
            return res.json({
                success: false,
                message: "Usuario no encontrado",
                data: null
            })
        }
        
        return res.json({
            success: true,
            message: "información del usuario con idUsuario: " + req.params.idUsuario,
            data: {
                usuario: user
            }
        })
    },

    crear: async (req, res, next) => {
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

            const user = await models.Usuario.create({
                username: username,
                email: email,
                password: hashedPassword,
                idPerfil: 2
            })

            return res.json({
                success: true,
                message: "usuario creado correctamente",
                data: {
                    usuario: user.idUsuario
                }
            })
        } catch (err) {
            return next(err);
        }
    },

    modificar: async (req, res, next) => {
        // puede modificar username, email y password
        const { username, email, password } = req.body || {};
        const { idUsuario } = req.params;

        if (!username && !email && !password) {
            return res.json({
                success: false,
                message: "Al menos un campo (username, email o password) es requerido",
                data: null
            });
        }

        try {
            const user = await models.Usuario.findByPk(idUsuario);
            if (!user) {
                return res.json({
                    success: false,
                    message: "Usuario no encontrado",
                    data: null
                });
            }

            if (username) user.username = username;
            if (email) user.email = email;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
            }

            await user.save();

            return res.json({
                success: true,
                message: "Usuario modificado correctamente",
                data: {
                    usuario: user.idUsuario
                }
            });
        } catch (err) {
            return next(err);
        }
    },

    eliminar: async (req, res, next) => {
        const { idUsuario } = req.params;

        try {
            const user = await models.Usuario.findByPk(idUsuario);

            if (!user) {
                return res.json({
                    success: false,
                    message: "Usuario no encontrado",
                    data: null
                });
            }

            // valido que no sea el administrador (idPerfil = 1) para eliminarlo
            if (parseInt(user.idPerfil) === 1) {
                return res.json({
                    success: false,
                    message: "No se puede eliminar un usuario administrador",
                    data: null
                });
            }

            await user.destroy();

            return res.json({
                success: true,
                message: "Usuario eliminado correctamente",
                data: {
                    usuario: idUsuario
                }
            });
        } catch (err) {
            next(err);
        }
    }

}