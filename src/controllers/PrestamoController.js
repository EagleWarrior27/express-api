const controllers = {}

const sequelize = require('../database/BD');
//Importación modelo y sequelize
const Prestamo = require('../database/model/Prestamo');

const adminConsulta = require('sequelize');
const op = adminConsulta.Op;

controllers.create = async (req,res) => {
  // Parámetros del POST
  const { IdPrestamo, Solicitante, Procedencia, IdEquipo, FechaPrestamo, FechaDevolucion, TipoPrestamo } = req.body;

  //INSERT INTO prestamos(ID_PRESTAMO, SOLICITANTE, PROCEDENCIA, ID_EQUIPO, FECHA_PRESTAMO, HORA_PRESTAMO, FECHA_DEVOLUCION, HORA_DEVOLUCION, TIPO_PRESTAMO VALUES('', '', '', '', '', '', '', '', '', '');
  const data = await Prestamo.create({
    id_prestamo: IdPrestamo,
    solicitante: Solicitante,
    procedencia: Procedencia,
    id_equipo: IdEquipo,
    fecha_prestamo: FechaPrestamo,
    fecha_devolucion: FechaDevolucion,
    tipo_prestamo: TipoPrestamo
  })
  .then(function(data){
    res.status(200).json({
      success:true,
      message:"Préstamo agregado exitosamente",
      data:data
    });
  })
  .catch(err => {
    res.status(500).json({
      success:false,
      message:"Error al agregar préstamo",
      data:err
    });
  })
}

controllers.get = async (req, res) => {
  const { id } = req.params;

  //SELECT * FROM prestamos WHERE ID_PRESTAMO = 'id';
  const data = await Prestamo.findAll({
    where: { id_prestamo: id }
  })
  .then(function(data){
    res.status(200).json({
      success:true,
      message:"Préstamo obtenido exitosamente",
      data:data
    });
  })
  .catch(err => {
    res.status(500).json({
      success:false,
      message:"Error al obtener préstamo",
      data:err
    });
  })
}

controllers.update = async (req, res) => {
  //Parámetro ID
  const { id } = req.params;
  
  // parameter POST
  const { IdPrestamo, IdEquipo, FechaDevolucion, HoraDevolucion } = req.body;

  //UPDATE usuarios SET DISPONIBILIDAD='En Prestamo' WHERE NUM_INVENTARIO ='';
  const data = await Prestamo.update({
    id_prestamo: IdPrestamo,
    id_equipo: IdEquipo,
    fecha_devolucion: FechaDevolucion,
    hora_devolucion: HoraDevolucion
  },
  {
    where: { id_prestamo: id}
  })
  .then(function(data){
    res.status(200).json({
      success:true,
      message:"Actualización de préstamo exitoso",
      data:data
    });
  })
  .catch(error => {
    res.status(500).json({
      success:false,
      message:"Error al actualizar préstamo",
      data:err
    });
  })
}

controllers.delete = async (req, res) => {
  // parameter POST
  const { id } = req.body;

  // delete sequelize
  const data = await Prestamo.destroy({
    where: { id_prestamo: id}
  })
  .then(function(data){
    res.status(200).json({
      success:true,
      message:"Eliminación de préstamo exitoso",
      data:data
    });
  })
  .catch(error => {
    res.status(500).json({
      success:false,
      message:"Error al eliminar préstamo",
      data:err
    });
  })
}

controllers.rango = async (req, res) => {
  // parameter POST
  const { FechaInicial, FechaCorte } = req.body;
  
  //UPDATE usuarios SET DISPONIBILIDAD='En Prestamo' WHERE NUM_INVENTARIO ='';
  const data = await Prestamo.findAll({
    where: {
      fecha_prestamo: {
        [op.between]: [FechaInicial , FechaCorte]
      }
    }
  })
  .then(function(data){
    res.status(200).json({
      success:true,
      message:"Obtención de préstamos en rango exitoso",
      data:data
    });
  })
  .catch(err => {
    res.status(500).json({
      success:false,
      message:"Error al obtener lista de préstamos por rango",
      data:err
    });
  })
}

controllers.filtro = async (req, res) => {
  // parameter POST
  const { Filtro, Argumento } = req.body;

  //UPDATE usuarios SET DISPONIBILIDAD='En Prestamo' WHERE NUM_INVENTARIO ='';
  switch(Filtro){
    case 'PROCEDENCIA':
      const dataP = await Prestamo.findAll({
        where: {
          procedencia: Argumento
        }
      })
      .then(function(data){
        res.status(200).json({
          success:true,
          message:"Obtención de préstamos por procedencia",
          data:data
        });
      })
      .catch(err => {
        res.status(500).json({
          success:false,
          message:"Error al obtener lista de préstamos por procedencia",
          data:err
        });
      })
      break;

    case 'EQUIPO':
      const dataE = await Prestamo.findAll({
        where: {
          equipo: Argumento
        }
      })
      .then(function(data){
        res.status(200).json({
          success:true,
          message:"Obtención de préstamos por tipo de equipo",
          data:data
        });
      })
      .catch(err => {
        res.status(500).json({
          success:false,
          message:"Error al obtener lista de préstamos por tipo de equipo",
          data:err
        });
      })
      break;

    case 'TIPO_PRESTAMO':
      const dataT = await Prestamo.findAll({
        where: {
          tipo_prestamo: Argumento
        }
      })
      .then(function(data){
        res.status(200).json({
          success:true,
          message:"Obtención de préstamos por tipo de préstamo",
          data:data
        });
      })
      .catch(error => {
        res.status(500).json({
          success:false,
          message:"Error al obtener lista de préstamos por tipo de préstamo",
          data:err
        });
      })
      break;

    default: 
      res.status(500).json({
        success:false,
        message:"No se ha especificado el filtro",
        data:null
      });
  }
}

module.exports = controllers;