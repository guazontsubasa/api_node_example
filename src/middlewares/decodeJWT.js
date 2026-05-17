const jwt = require('jsonwebtoken');
const error = require('../const/error');
const models = require('../database/models/index');
const moment = require('moment');
const globalConstants = require('../const/globalConstants');

module.exports = async function(req, res, next) {

    if (req.header('Authorization') && req.header('Authorization').split(' ').length > 1) {
        try {
            // Verifico que el token sea válido con la clave secreta para obtener el payload (datos del usuario)
            let dataToken = jwt.verify(req.header('Authorization').split(' ')[1], globalConstants.JWT_SECRET);

            if (dataToken.exp < moment().unix()) return next(error.SesionExpirada);
        
            // guardo los datos del token en res.locals para usarlos en los controllers
            res.locals.token = dataToken; 

            const usuario = await models.Usuario.findByPk(dataToken.idUsuario, {
                include: [
                    { model: models.Perfil, as: 'perfil' }
                ]
            });

            if (!usuario) return next(error.DecodeError);

            // guardo los datos del usuario en res.locals para usarlos en los controllers
            res.locals.usuario = usuario; 

            next();
        } catch (err) {
            console.log(err);
            return next(error.CredencialesInvalidas);
        }

    } else {
        return next(error.UsuarioNoAutorizado);
    }
}