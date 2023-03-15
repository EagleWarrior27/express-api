const express = require('express');
const router = express.Router();

const EquipoController = require('../controllers/EquipoController');

//Rutas a funciones del equipo

router.post('/create', EquipoController.create);
router.get('/get/:id', EquipoController.get);
router.post('/update/:id', EquipoController.update);
router.post('/delete', EquipoController.delete);
router.get('/list', EquipoController.list);
router.get('/disponible', EquipoController.disponible);
router.get('/prestado', EquipoController.prestado);
router.post('/prestamo', EquipoController.prestamo);
router.post('/devolucion', EquipoController.devolucion);

module.exports = router;