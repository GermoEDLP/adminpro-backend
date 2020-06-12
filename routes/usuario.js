var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var midd = require('../middlewares/autenticacion');
var SEED = require('../config/config').SEED;

var app = express();


//Uso el schema
var Usuario = require('../models/usuario');


/*
Primero la ruta -> '/' es la raiz

res -> es la respuesta que nuestro servidor le va a mandar a cualquier usuario que lo solicite mediante url

*/
//=============================================
// Obtener todos los usuarios
//=============================================
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





//=================================================
// Actualizar un Usuario
//=================================================

app.put('/:id', midd.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {

        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en base de datos al buscar un Usuario',
                errors: err
            });
        }

        if(!usuario){
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario especificado no existe',
                errors: {message: "El ID no pertenece a ningun usuario"}
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save( (err, usuarioGuardado) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error en base de datos al actualizar un Usuario',
                    errors: err
                });
            }

            usuarioGuardado.pass = ':)';
            //Si no hay errores, actualizo la data
            res.status(201).json({
                ok: true,
                mensaje: 'Usuario actualizado correctamente!!! ',
                usuario : usuarioGuardado
            })    
        });
    });
});



//=============================================
// Crear un nuevo usuario
//=============================================
app.post('/', midd.verificaToken, (req, res, next) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        pass: bcrypt.hashSync( body.pass, 10),
        img: body.img,
        role: body.role
    });

    // La instancia esta creada, pero no se guardo en BD, ahora la guardo
    usuario.save((err, usuarioGuardado) => {

        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error en base de datos al crear nuevo Usario',
                errors: err
            });
        }
        //Si no hay errores, devuelvo la data
        res.status(201).json({
            ok: true,
            mensaje: 'Usuario creado correctamente!!! ',
            usuario : usuarioGuardado,
            usuariotoken: req.usuario
        })


    });


});

//=================================================
// Borrar un usuario por id
//=================================================

app.delete('/:id', midd.verificaToken, (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error en base de datos al borrar Usario',
                errors: err
            });
        }
        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario especificado no existe',
                errors: {message: "El ID no pertenece a ningun usuario"}
            });
        }

        //Si no hay errores, devuelvo la data
        res.status(200).json({
            ok: true,
            mensaje: 'Usuario borrado correctamente!!! '
        })
    })



})




module.exports = app;