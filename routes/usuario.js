var express = require('express');

var app = express();


//Uso el schema
var Usuario = require('../models/usuario');


/*
Primero la ruta -> '/' es la raiz

res -> es la respuesta que nuestro servidor le va a mandar a cualquier usuario que lo solicite mediante url

*/
app.get('/', (req, res, next) => {

    //Busco son parametros en el find, para buscar TODOS, el segundo argumento te dice que columnas va a traer
    Usuario.find({}, 'nombre img role email')
    .exec( 
        (err, usuarios) => {

        //Si existe un error salgo con mensaje
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en base de datos al buscar Usarios',
                errors: err
            });
        }
        //Si no hay errores, devuelvo la data
        res.status(200).json({
            ok: true,
            mensaje: 'Get a Usuarios correcto',
            usuarios: usuarios
        })



    });

    

});

module.exports = app;