//Constante para el uso de sequelize
const Sequelize = require('sequelize');
//Variable conector a BD
const sequelize = require('../BD');

//Asignación de la tabla
const nombreTabla = "equipos";
//Declaración de atributos de la tabla
const Equipo = sequelize.define(nombreTabla, {
  num_inventario: {
    type: Sequelize.STRING,
    primaryKey: true,
    autoIncrement: false,
  },
  tipo: Sequelize.STRING,
  marca: Sequelize.STRING,
  modelo: Sequelize.STRING,
  num_serie: Sequelize.STRING,
  disponibilidad: Sequelize.STRING,
},
{
	 timestamps: false,
});

module.exports = Equipo;