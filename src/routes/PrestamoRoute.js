const express = require('express');
const router = express.Router();

const PrestamoController = require('../controllers/PrestamoController');

//Rutas a funciones del Prestamo
router.post('/create', PrestamoController.create);
router.get('/get/:id', PrestamoController.get);
router.post('/update/:id', PrestamoController.update);
router.post('/delete', PrestamoController.delete);
router.post('/rango', PrestamoController.rango);
router.post('/filtro', PrestamoController.filtro);

module.exports = router;