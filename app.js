// Requires
var express = require('express');
var mongoose = require('mongoose');


//Inicializar variables
var app = express();


//Conexion a base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if(err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
})


//Rutas
/*
Primero la ruta -> '/' es la raiz

res -> es la respuesta que nuestro servidor le va a mandar a cualquier usuario que lo solicite mediante url

*/
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Servidor corriendo'
    })

})


//Escuchar peticiones
app.listen(3000, () => {
    console.log('Express corriendo: \x1b[32m%s\x1b[0m', 'online');
    
})