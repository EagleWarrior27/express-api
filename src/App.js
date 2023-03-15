//Importación de  express
const express = require('express');
const app = express();

//Configuración del puerto
app.set('port', process.env.POST || 3000);

//Middlewares
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Importación del Route 
const equipoRouters = require('./routes/EquipoRoute');
const prestamoRouters = require('./routes/PrestamoRoute');

//Establecimiento de los Routers
app.use('/equipo', equipoRouters);
app.use('/prestamo', prestamoRouters);

//Ruta principal
app.use('/', (req, res) => {
  res.send("Hello World from NodeJS Express.");
});

app.listen(app.get('port'), () => {
  console.log("Start server on port "+ app.get('port'));
});

