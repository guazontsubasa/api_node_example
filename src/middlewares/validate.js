module.exports = (schema) => {
    return (req, res, next) => {
        let result = schema.validate(req.body);

        if (result.error) {
            next(result.error); //pasa el error al middleware de manejo de errores
        } else {
            next(); //continua con el siguiente middleware o controlador
        }
    }
}