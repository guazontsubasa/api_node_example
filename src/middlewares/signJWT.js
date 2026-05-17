const JWT = require('jsonwebtoken');
const globalConst = require('../const/globalConstants') // importar las constantes globales de la api

module.exports = function(usuario) { // recibe el Usuario por parámetro

    if (usuario){

        const token = JWT.sign(
            { id: usuario.idUsuario },  
            globalConst.JWT_SECRET,
            { expiresIn: globalConst.JWT_EXPIRES_IN } // 24 horas
        );

        return token; // retornar el token generado

    }else{
        return null; // si no se recibe un usuario, retornar null
    }
}