const globalConstants = require('../../const/globalConstants');

module.exports = {
  development: {
    "username": globalConstants.DB_USER,
    "password": globalConstants.DB_PASSWORD,
    "database": globalConstants.DB_NAME,
    "host": globalConstants.DB_HOST,
    "port": Number(globalConstants.DB_PORT),
    "dialect": 'postgres',
    "logging": false
  },
  "test": {
    "username": globalConstants.DB_USER,
    "password": globalConstants.DB_PASSWORD,
    "database": globalConstants.DB_NAME,
    "host": globalConstants.DB_HOST,
    "port": Number(globalConstants.DB_PORT),
    "dialect": "postgres",
    "logging": false
  },
  "production": {
    "username": globalConstants.DB_USER,
    "password": globalConstants.DB_PASSWORD,
    "database": globalConstants.DB_NAME,
    "host": globalConstants.DB_HOST,
    "port": Number(globalConstants.DB_PORT),
    "dialect": "postgres",
    "logging": false
  }
};
