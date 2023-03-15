//Sequelize es un ORM (Object-Relational mapping) para Nodejs que nos permite manipular varias bases de datos SQL
//mysql, sqlite, postgres, mssql

const Sequelize = require('sequelize');

const sequelize = new Sequelize('bfson50eliiepzcjmhyt', 'u7dhsuugmv4gkch9', '4V0r0Dmcz3aquvS7BLVk', {
    host: 'bfson50eliiepzcjmhyt-mysql.services.clever-cloud.com',
    dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(error => {
    console.log('No se conecto: ' + error)
});

module.exports = sequelize;
