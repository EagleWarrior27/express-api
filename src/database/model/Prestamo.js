//Constante para el uso de sequelize
const Sequelize = require('sequelize');
//Variable conector a BD
const sequelize = require('../BD');
//Enlace a llave foránea
const Equipo = require('./Equipo');

//Asignación de la tabla
const nombreTabla = "prestamo";
//Declaración de atributos de la tabla
const Prestamo = sequelize.define(nombreTabla, {
  id_prestamo: {
    type: Sequelize.STRING,
    primaryKey: true,
    autoIncrement: false,
  },
  solicitante: Sequelize.STRING,
  procedencia: Sequelize.STRING,
  id_equipo: Sequelize.STRING,
  fecha_prestamo: Sequelize.STRING,
  fecha_devolucion: Sequelize.STRING,
  tipo_prestamo: Sequelize.STRING
},
{
	 timestamps: false,
});

module.exports = Prestamo;
