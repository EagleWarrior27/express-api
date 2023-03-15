const controllers = {}

var sequelize = require('../database/BD');
//Importación modelo y sequelize
var Equipo = require('../database/model/Equipo');

controllers.create = async (req,res) => {
  console.log("\nAgregar Equipo");

  // Parámetros del POST
  const { NumInventario, Tipo, Marca, Modelo, NumSerie } = req.body;
  //Parámetro ID
  console.log("Número de Inventario: " + NumInventario);

  //INSERT INTO equipos(NUM_INVENTARIO, TIPO, MARCA, MODELO, NUM_SERIE) VALUES('', '', '', '', '');
  const data = await Equipo.create({
    NUM_INVENTARIO: NumInventario,
    TIPO: Tipo,
    MARCA: Marca,
    MODELO: Modelo,
    NUM_SERIE: NumSerie
  })
  .then(function(data){
    console.log("Agregar Equipo =>" + data)
    return data;
  })
  .catch(err =>{
    console.log("Error al Agregar Equipo" + err)
    return err;
  })
  res.status(200).json({
    success: true,
    message:"Equipo agregado",
    data: data
  });
}

controllers.get = async (req, res) => {
  console.log("\nObtener Equipo");

  //Parámetro ID
  const { id } = req.params;
  console.log("NumInventario => ", id);

  //SELECT * FROM Equipo WHERE NUM_INVENTARIO='';
  const data = await Equipo.findAll({
      where: { NUM_INVENTARIO: id }
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    return error;
  })
  res.json({
    success: true,
    data: data
  });
}

controllers.update = async (req, res) => {
  console.log("\nActualizar Equipo");

  //Parámetro ID
  const { id } = req.params;
  console.log("NumInventario => ", id);

  //Parámetros del POST
  const { NumInventario, Tipo, Marca, Modelo, NumSerie } = req.body;
  //UPDATE equipos SET NUM_INVENTARIO='', TIPO='', MARCA='', MODELO='', NUM_SERIE='' WHERE NUM_INVENTARIO='';
  const data = await Equipo.update({
    NUM_INVENTARIO: NumInventario,
    TIPO: Tipo,
    MARCA: Marca,
    MODELO: Modelo,
    NUM_SERIE: NumSerie
  },
  {
    where: { NUM_INVENTARIO: id}
  })
  .then( function(data){
    console.log("Actualizar Equipo =>" + data)
    return data;
  })
  .catch(error => {
    console.log("Error al Actualizar Equipo" + err)
    return error;
  })
  res.json({
    success:true,
    data:data,
    message:"Datos del Equipo Actualizados"
  });
}

controllers.delete = async (req, res) => {
  console.log("\nEliminar Equipo");

  //Parámetro ID
  const { id } = req.body;
  console.log("NumInventario => ", id);

  //DELETE FROM equipos WHERE NUM_INVENTARIO='';
  const del = await Equipo.destroy({
    where: { NUM_INVENTARIO: id}
  })
  res.json({
    success:true,
    deleted:del,
    message:"Equipo Eliminado"
  });
}

controllers.list = async(req, res) => {
  console.log("\nLista de Equipos");

  //SELECT * FROM equipos;
  const data = await Equipo.findAll()
  .then(function(data){
    return data;
  })
  .catch(err => {
    return err;
  })

  res.json({
    success: true,
    data: data
  });
}

controllers.disponible = async(req, res) => {
  console.log("Lista de Equipos");

  //SELECT * FROM equipos;
  const data = await Equipo.findAll({
    where: {
      DISPONIBILIDAD: 'Disponible'
    }
  })
  .then(function(data){
    return data;
  })
  .catch(err => {
    return err;
  })

  res.json({
    success: true,
    data: data
  });
}

controllers.prestado = async(req, res) => {
  console.log("Lista de Equipos");

  //SELECT * FROM equipos;
  const data = await Equipo.findAll({
    where: {
      DISPONIBILIDAD: 'En Préstamo'
    }

  })
  .then(function(data){
    return data;
  })
  .catch(err => {
    return err;
  })

  res.json({
    success: true,
    data: data
  });
}

controllers.prestamo = async (req, res) => {
  console.log("\nCambiar disponibilidad del Equipo");

  const { NumInventario } = req.body;
  console.log("NumInventario => ", NumInventario);

  const data = await Equipo.update({
    DISPONIBILIDAD: 'En Préstamo',
  },
  {
    where: { NUM_INVENTARIO: NumInventario}
  })
  .then( function(data){
    console.log("Cambiar disponibilidad del Equipo =>" + data)
    return data;
  })
  .catch(error => {
    console.log("Error al cambiar disponibilidad del Equipo" + error)
    return error;
  })
  res.json({
    success:true,
    data:data,
    message:"Datos del Equipo Actualizados"
  });
}

controllers.devolucion = async (req, res) => {
  console.log("\nCambiar disponibilidad del Equipo");

  const { NumInventario } = req.body;
  console.log("NumInventario => ", NumInventario);

  const data = await Equipo.update({
    DISPONIBILIDAD: 'Disponible',
  },
  {
    where: { NUM_INVENTARIO: NumInventario}
  })
  .then( function(data){
    console.log("Cambiar disponibilidad del Equipo =>" + data)
    return data;
  })
  .catch(error => {
    console.log("Error al cambiar disponibilidad del Equipo" + error)
    return error;
  })
  res.json({
    success:true,
    data:data,
    message:"Datos del Equipo Actualizados"
  });
}

module.exports = controllers;
