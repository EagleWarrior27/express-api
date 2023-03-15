const controllers = {}

const sequelize = require('../database/BD');
//Importación modelo y sequelize
const Prestamo = require('../database/model/Prestamo');

const adminConsulta = require('sequelize');
const op = adminConsulta.Op;

controllers.create = async (req,res) => {
  console.log("\nAgregar Préstamo");

  // Parámetros del POST
  const { IdPrestamo, Solicitante, Procedencia, IdEquipo, FechaPrestamo, FechaDevolucion, TipoPrestamo } = req.body;

  //INSERT INTO prestamos(ID_PRESTAMO, SOLICITANTE, PROCEDENCIA, ID_EQUIPO, FECHA_PRESTAMO, HORA_PRESTAMO, FECHA_DEVOLUCION, HORA_DEVOLUCION, TIPO_PRESTAMO VALUES('', '', '', '', '', '', '', '', '', '');
  const data = await Prestamo.create({
    ID_PRESTAMO: IdPrestamo,
    SOLICITANTE: Solicitante,
    PROCEDENCIA: Procedencia,
    ID_EQUIPO: IdEquipo,
    FECHA_PRESTAMO: FechaPrestamo,
    FECHA_DEVOLUCION: FechaDevolucion,
    TIPO_PRESTAMO: TipoPrestamo
  })
  .then(function(data){
    mensaje = 'Préstamo Guardado';
    return data;
  })
  .catch(err => {
    mensaje = 'Error'+ err;
    console.log(err)
    return err;
  })
  res.status(200).json({
    success: true,
    message: mensaje,
    data: data
  });
}

controllers.get = async (req, res) => {
  console.log("\nObtener Préstamo");

  const { id } = req.params;
  console.log("ID Préstamo => ", id);

  //SELECT * FROM prestamos WHERE ID_PRESTAMO = 'id';
  const data = await Prestamo.findAll({
      where: { ID_PRESTAMO: id }
  })
  .then(function(data){
    mensaje = 'Búsqueda realizada';
    return data;
  })
  .catch(err => {
    mensaje = 'Error en la búsqueda';
    return err;
  })
  res.status(200).json({
    success: true,
    message: mensaje,
    data: data
  });
}

controllers.update = async (req, res) => {
  console.log("\nActualizar Préstamo");

  //Parámetro ID
  const { id } = req.params;
  console.log("ID del Préstamo: " + id);

  // parameter POST
  const { IdPrestamo, IdEquipo, FechaDevolucion, HoraDevolucion } = req.body;

  //UPDATE usuarios SET DISPONIBILIDAD='En Prestamo' WHERE NUM_INVENTARIO ='';
  const data = await Prestamo.update({
    ID_PRESTAMO: IdPrestamo,
    ID_EQUIPO: IdEquipo,
    FECHA_DEVOLUCION: FechaDevolucion,
    HORA_DEVOLUCION: HoraDevolucion
  },
  {
    where: { ID_PRESTAMO: id}
  })
  .then( function(data){
    console.log("Actualizar Préstamo =>" + data)
    return data;
  })
  .catch(error => {
    console.log("Error al Actualizar Préstamo" + err)
    return error;
  })
  res.json({
    success:true,
    data:data
  });
}

controllers.delete = async (req, res) => {
  console.log("\nEliminar prestamo");

  // parameter post
  const { id } = req.body;

  console.log("ID prestamo => ", id);
  // delete sequelize
  const del = await Prestamo.destroy({
    where: { ID_PRESTAMO: id}
  })
  res.json({
    success:true,
    deleted:del,
    message:"Préstamo Cancelado"
  });
}

controllers.rango = async (req, res) => {
  console.log("\nConsulta Préstamo");

  // parameter POST
  const { FechaInicial, FechaCorte } = req.body;
  console.log("Fecha inicio", FechaInicial)
  console.log("Fecha corte", FechaCorte)

  //UPDATE usuarios SET DISPONIBILIDAD='En Prestamo' WHERE NUM_INVENTARIO ='';
  const data = await Prestamo.findAll({
    where: {
      FECHA_PRESTAMO: {
        [op.between]: [FechaInicial , FechaCorte]
      }
    }
  })
  .then( function(data){
    console.log("Consulta Préstamo =>" + data)
    return data;
  })
  .catch(error => {
    console.log("Error al Consultar Préstamo" + err)
    return error;
  })
  res.json({
    success:true,
    data:data
  });
}

controllers.filtro = async (req, res) => {
  console.log("\nConsulta Préstamo Filtro");

  // parameter POST
  const { Filtro, Argumento } = req.body;
  console.log("Filtro =>", Filtro);
  console.log("Argumento =>", Argumento);

  //UPDATE usuarios SET DISPONIBILIDAD='En Prestamo' WHERE NUM_INVENTARIO ='';
  switch(Filtro){
    case 'PROCEDENCIA':
      const dataP = await Prestamo.findAll({
        where: {
          PROCEDENCIA: Argumento
        }
      })
      .then( function(dataP){
        console.log("Consulta Préstamo =>" + dataP)
        return dataP;
      })
      .catch(error => {
        console.log("Error al Consultar Préstamo" + error)
        return error;
      })
      res.json({
        success: true,
        data: dataP
      });
      break;

    case 'EQUIPO':
      const dataE = await Prestamo.findAll({
        where: {
          EQUIPO: Argumento
        }
      })
      .then( function(dataE){
        console.log("Consulta Préstamo =>" + dataE)
        return dataE;
      })
      .catch(error => {
        console.log("Error al Consultar Préstamo" + error)
        return error;
      })
      res.json({
        success: true,
        data: dataE
      });
      break;

    case 'TIPO_PRESTAMO':
      const dataT = await Prestamo.findAll({
        where: {
          TIPO_PRESTAMO: Argumento
        }
      })
      .then( function(dataT){
        console.log("Consulta Préstamo =>" + dataT)
        return dataT;
      })
      .catch(error => {
        console.log("Error al Consultar Préstamo" + error)
        return error;
      })
      res.json({
        success: true,
        data: dataT
      });
      break;

    default: console.log('Sin Filtro')
  }
}

module.exports = controllers;