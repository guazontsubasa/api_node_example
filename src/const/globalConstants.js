// ESTAN TODAS LAS CONSTANTES DE LA API EN ESTE ARCHIVO

require('dotenv').config() // importar dotenv para obtener las variables de entorno

module.exports = {
    PORT: process.env.PORT || 5000, // obtener el puerto de la aplicación desde el archivo .env o si no existe, usar el puerto 5000
    DB_HOST: process.env.DB_HOST, 
    DB_PORT: process.env.DB_PORT, 
    DB_NAME: process.env.DB_NAME, 
    DB_USER: process.env.DB_USER, 
    DB_PASSWORD: process.env.DB_PASSWORD, 
    ENVIRONMENT: process.env.ENVIRONMENT || 'development',
    JWT_SECRET: process.env.JWT_SECRET, // clave secreta para firmar los tokens JWT
    MAX_FILE_SIZE: 5 * 1024 * 1024, // tamaño máximo de los archivos en bytes (5MB)
    JWT_EXPIRES_IN: '3000m' // tiempo de expiración de los tokens JWT (24 horas)
}