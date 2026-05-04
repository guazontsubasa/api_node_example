const { writeFileSync } = require('fs');
const sequelizeErd = require('sequelize-erd');
const db = require('../src/database/models'); // importa tu index.js

(async () => {
  const svg = await sequelizeErd({ source: db.sequelize });
  writeFileSync('./erd.svg', svg);
  console.log('ERD generado en erd.svg');
})();