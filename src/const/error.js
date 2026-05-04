module.exports = {
    'ValidationError': {
        code: 1000,
        message: 'Error de validación'
    },

    'Faltan campos': {
        code: 1001,
        message: 'Faltan campos requeridos'
    },

    'RouteNotFound': {
        code: 404,
        message: 'Ruta no encontrada'
    },

    'UsuarioYaExiste': {
        code: 1002,
        message: 'Usuario ya existe'
    },

    'EmailDuplicado': {
        code: 1003,
        message: 'Email ya en uso'
    },

    'UsernameDuplicado': {
        code: 1004,
        message: 'Username ya en uso'
    },

    'OrigenConIngresosAsociados': {
        code: 1005,
        message: 'No se puede eliminar el origen porque tiene ingresos asociados'
    },

    'DestinoConGastosAsociados': {
        code: 1006,
        message: 'No se puede eliminar el destino porque tiene gastos asociados'
    }
}