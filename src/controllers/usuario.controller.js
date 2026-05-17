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
    },

    subirArchivo: async (req, res, next) => {
        // Debe venir el usuario en el body 
        const { idUsuario } = req.body || {};

        if (!idUsuario) {
            return res.json({
                success: false,
                message: "El campo idUsuario es requerido",
                data: null
            });
        }

        // VALIDO QUE EL USUARIO EXISTA
        const user = await models.Usuario.findByPk(idUsuario);

        if (!user) {
            return res.json({
                success: false,
                message: "Usuario no encontrado",
                data: null
            });
        }

        // CHEQUEO QUE SE HAYA SUBIDO UN ARCHIVO
        if (!req.file) {
            return res.json({
                success: false,
                message: "No se ha subido ningún archivo",
                data: null
            });
        }

        // VALIDO SI YA EXISTE
        const archivoExistente = await models.Archivo.findOne({
            where: {
                idUsuario: req.body.idUsuario,
                nombre: req.body.nombre
            }
        });

        if (archivoExistente) {
            return res.json({
                success: false,
                message: "Ya existe un archivo con el mismo nombre para este usuario",
                data: null
            });
        }

        try {
            const archivo = await models.Archivo.create({
                nombre: req.body.nombre,
                file: req.file.filename,
                originalName: req.file.originalname,
                idUsuario: idUsuario
            });

            return res.json({
                success: true,
                message: "Archivo subido correctamente",
                data: {
                    archivo: archivo.idArchivo
                }
            });
        } catch (err) {
            next(err);
        }
    },

    listarArchivos: async (req, res, next) => {
        const { idUsuario } = req.body || {};

        if (!idUsuario) {
            return res.json({
                success: false,
                message: "El campo idUsuario es requerido en los query params",
                data: null
            });
        }

        // validar que exista el usuario
        const user = await models.Usuario.findByPk(idUsuario);

        if (!user) {
            return res.json({
                success: false,
                message: "Usuario no encontrado",
                data: null
            });
        }

        try {
            const archivos = await models.Archivo.findAll({
                where: {
                    idUsuario: idUsuario
                }
            });

            return res.json({
                success: true,
                message: "Archivos del usuario con idUsuario: " + idUsuario,
                data: {
                    archivos: archivos
                }
            });
        } catch (err) {
            next(err);
        }
    },

    descargarArchivo: async (req, res, next) => {

        // Debe venir el usuario en el body 
        const { idUsuario } = req.body || {};

        if (!idUsuario) {
            return res.json({
                success: false,
                message: "El campo idUsuario es requerido",
                data: null
            });
        }

        // VALIDO QUE EL USUARIO EXISTA
        const user = await models.Usuario.findByPk(idUsuario);

        if (!user) {
            return res.json({
                success: false,
                message: "Usuario no encontrado",
                data: null
            });
        }

        // VALIDO SI YA EXISTE
        const archivoExistente = await models.Archivo.findOne({
            where: {
                idUsuario: req.body.idUsuario,
                nombre: req.body.nombre
            }
        });

        if (!archivoExistente) {
            return res.json({
                success: false,
                message: "No se ha encontrado el archivo para este usuario",
                data: null
            });
        }

        try {
            const filePath = 'uploads/archivos/' + archivoExistente.file;
            res.download(filePath, archivoExistente.originalName);
        } catch (err) {
            next(err);
        }
    },

    eliminarArchivo: async (req, res, next) => {
        // para eliminar un archivo específico de un usuario específico (usuario especificado en los query params)
        const { idUsuario } = req.body || {};
        const { idArchivo } = req.params;
        
        if (!idUsuario || !idArchivo) {
            return res.json({
                success: false,
                message: "Los campos idUsuario e idArchivo son requeridos en los query params",
                data: null
            });
        }

        // validar que exista el usuario
        const user = await models.Usuario.findByPk(idUsuario);
        
        if (!user) {
            return res.json({
                success: false,
                message: "Usuario no encontrado",
                data: null
            });
        }

        try {
            const archivo = await models.Archivo.findOne({
                where: {
                    idArchivo: idArchivo,
                    idUsuario: idUsuario
                }
            });

            if (!archivo) {
                return res.json({
                    success: false,
                    message: "Archivo no encontrado para el usuario especificado",
                    data: null
                });
            }

            await archivo.destroy();

            // borrar físicamente
            const fs = require('fs');
            const filePath = 'uploads/archivos/' + archivo.file;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error al eliminar el archivo físicamente:", err);
                }
            });

            return res.json({
                success: true,
                message: "Archivo eliminado correctamente",
                data: {
                    archivo: idArchivo
                }
            });
        } catch (err) {
            next(err);
        }
    }

}