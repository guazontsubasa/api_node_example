const errors = require('../const/error') // importar el archivo de constantes de errores

module.exports = function(err, req, res, next) {
    console.log('------>>>>');
    console.error(err); 
    console.log('<<<<------');

    let response = {
        success: false,
        error: {
            code: err.code || "INTERNAL_SERVER_ERROR",
            message: err.message || "Error interno del servidor"
        }
    }

    // Si el error es un error de validación de Joi
    if (err.isJoi) {
        let validationErrorType = err.details[0].type; 
        let errorKey = 'ValidationError'

        if (validationErrorType === 'any.required') {
            errorKey = 'Faltan campos'
        }

        response.error.code = errors[errorKey].code;
        response.error.message = errors[errorKey].message;
    }

    if (err.message === 'RouteNotFound') {
        response.error.code = errors['RouteNotFound'].code;
        response.error.message = errors['RouteNotFound'].message;
    } else if (err.message === 'OrigenConIngresosAsociados') {
        response.error.code = errors['OrigenConIngresosAsociados'].code;
        response.error.message = errors['OrigenConIngresosAsociados'].message;
    } else if (err.message === 'DestinoConGastosAsociados') {
        response.error.code = errors['DestinoConGastosAsociados'].code;
        response.error.message = errors['DestinoConGastosAsociados'].message;
    // Si viene de una restricción UNIQUE de Sequelize (DB), mapeamos por campo
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        const duplicatedField = err?.errors?.[0]?.path || err?.parent?.constraint || '';

        if (duplicatedField === 'email' || String(duplicatedField).includes('email')) {
            response.error.code = errors['EmailDuplicado'].code;
            response.error.message = errors['EmailDuplicado'].message;
        } else if (duplicatedField === 'username' || String(duplicatedField).includes('username')) {
            response.error.code = errors['UsernameDuplicado'].code;
            response.error.message = errors['UsernameDuplicado'].message;
        } else {
            response.error.code = errors['UsuarioYaExiste'].code;
            response.error.message = errors['UsuarioYaExiste'].message;
        }
    } 

    res.status(200).json(response);
}