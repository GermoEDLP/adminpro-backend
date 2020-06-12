var express = require('express');

var app = express();

/*
Primero la ruta -> '/' es la raiz

res -> es la respuesta que nuestro servidor le va a mandar a cualquier usuario que lo solicite mediante url

*/
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    })

});

module.exports = app;