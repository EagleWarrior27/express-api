const controllers = {}

var sequelize = require('../database/BD');
//Importación modelo y sequelize
var Equipo = require('../database/model/Equipo');

controllers.create = async (req,res) => {
  // Parámetros POST
  const { NumInventario, Tipo, Marca, Modelo, NumSerie } = req.body;
  
  //INSERT INTO equipos(num_inventario, tipo, marca, modelo, num_serie) VALUES('', '', '', '', '');
  const data = await Equipo.create({
    num_inventario: NumInventario,
    tipo: Tipo,
    marca: Marca,
    modelo: Modelo,
    num_serie: NumSerie
  })
  .then(function(data) {
    res.status(200).json({
      success:true,
      message:"Equipo agregado exitosamente",
      data:data
    });
  })
  .catch(err =>{
    res.status(500).json({
      success:false,
      message:"Error al agregar equipo",
      data:err
    });
  })
}

controllers.get = async (req, res) => {
  //Parámetro ID
  const { id } = req.params;
  
  //SELECT * FROM Equipo WHERE num_inventario='';
  const data = await Equipo.findAll({
      where: { num_inventario: id }
  })
  .then(function(data) {
    res.status(200).json({
      success:true,
      message:"Equipo obtenido exitosamente",
      data:data
    });
  })
  .catch(err => {
    res.status(500).json({
      success:false,
      message:"Error al obtener equipo",
      data:err
    });
  })
}

controllers.update = async (req, res) => {
  //Parámetro ID
  const { id } = req.params;

  //Parámetros del POST
  const { NumInventario, Tipo, Marca, Modelo, NumSerie } = req.body;
  //UPDATE equipos SET NUM_INVENTARIO='', TIPO='', MARCA='', MODELO='', NUM_SERIE='' WHERE NUM_INVENTARIO='';
  const data = await Equipo.update({
    num_inventario: NumInventario,
    tipo: Tipo,
    marca: Marca,
    modelo: Modelo,
    num_serie: NumSerie
  },
  {
    where: { num_inventario: id}
  })
  .then(function(data) {
    if(data == 0) {
      res.status(404).json({
        success:false,
        message:"Equipo no registrado",
      });
    } else {
      res.status(200).json({
        success:true,
        message:"Equipo actualizado exitosamente",
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      success:true,
      message:"Error al actualizar equipo",
    });
  })
}

controllers.delete = async (req, res) => {
  //Parámetro ID
  const { id } = req.body;
  
  //DELETE FROM equipos WHERE num_inventario='';
  const data = await Equipo.destroy({
    where: { num_inventario: id}
  })
  .then(function(data) {
    if(data == 0) {
      res.status(404).json({
        success:false,
        message:"Equipo no registrado",
      });
    } else {
      res.status(200).json({
        success:true,
        message:"Equipo eliminado exitosamente",
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      success:false,
      message:"Error al eliminar equipo",
    });
  })
}

controllers.list = async (req, res) => {
  //SELECT * FROM equipos;
  const data = await Equipo.findAll()
  .then(function(data) {
    res.status(200).json({
      success:true,
      message:"Listado de equipos obtenido",
      data:data
    });
  })
  .catch(err => {
    res.status(500).json({
      success:false,
      message:"Error al obtener listado de equipos",
      data:err
    });
  })
}

controllers.disponible = async (req, res) => {
  //SELECT * FROM equipos WHERE disponibilidad = 'Disponible';
  const data = await Equipo.findAll({
    where: {
      disponibilidad:'Disponible'
    }
  })
  .then(function(data) {
    res.status(200).json({
      success:true,
      message:"Listado de equipos disponibles obtenido",
      data:data
    });
  })
  .catch(err => {
    res.status(500).json({
      success:false,
      message:"Error al obtener listado de equipos disponibles",
      data:err     
    });
  })
}

controllers.prestado = async (req, res) => {
  //SELECT * FROM equipos WHERE disponibilidad = "En Préstamo";
  const data = await Equipo.findAll({
    where: {
      disponibilidad:'En Préstamo'
    }
  })
  .then(function(data) {
    res.status(200).json({
      success:true,
      message:"Listado de equipos en préstamo obtenido",
      data:data
    });
  })
  .catch(err => {
    res.status(500).json({
      success:false,
      message:"Error al obtener listado de equipos en préstamo",
      data:err
    });
  })
}

controllers.prestamo = async (req, res) => {
  const { NumInventario } = req.body;

  //UPDATE equipos SET disponibilidad = "En Préstamo" WHERE num_inventario = '';
  const data = await Equipo.update({
    disponibilidad:'En Préstamo',
  },
  {
    where: { num_inventario:NumInventario}
  })
  .then( function(data) {
    if(data == 0) {
      res.status(404).json({
        success:false,
        message:"Equipo no registrado",
      });
    } else {
      res.status(200).json({
        success:true,
        message:"Préstamo de equipo exitoso",
      });
    }
    res.status(200).json({
      success:true,
      message:"Préstamo de equipo exitoso",
      data:data    
    });
  })
  .catch(err => {
    res.status(500).json({
      success:false,
      message:"Error al prestar equipo",
      data:err
    });
  })
  
}

controllers.devolucion = async (req, res) => {
  const { NumInventario } = req.body;
  
  //UPDATE equipos SET disponibilidad='Disponible' WHERE num_inventario='';
  const data = await Equipo.update({
    disponibilidad:'Disponible',
  },
  {
    where: { num_inventario:NumInventario}
  })
  .then(function(data) {
    if(data == 0) {
      res.status(404).json({
        success:false,
        message:"Equipo no registrado",
      });
    } else {
      res.status(200).json({
        success:true,
        message:"Devolución de equipo exitoso",
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      success:false,
      message:"Error al devolver equipo",
      data:err
    });
  })
}

module.exports = controllers;
