// Requires
var express = require('express');
var mongoose = require('mongoose');


//Inicializar variables
var app = express();


//Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');


//Conexion a base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if(err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
})


//Rutas
/* Esto es un midleware, me permite decirle a la ruta -> cuando hagas match con la ruta '/', busca el siguiente archivo appRoutes*/
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);


//Escuchar peticiones
app.listen(3000, () => {
    console.log('Express corriendo: \x1b[32m%s\x1b[0m', 'online');
    
})