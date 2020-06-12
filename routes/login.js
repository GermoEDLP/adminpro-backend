var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

var app = express();


//Uso el schema
var Usuario = require('../models/usuario');
const usuario = require('../models/usuario');


app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioEncontrado) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en base de datos al buscar un Usuario',
                errors: err
            });
        }
        if(!usuarioEncontrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: {message: "El email no pertenece a ningun usuario"}
            });
        }
        if(!bcrypt.compareSync(body.pass, usuarioEncontrado.pass)){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - pass',
                errors: {message: "La contraseña es incorrecta"}
            });
        }

        var token = jwt.sign({usuario: usuarioEncontrado}, SEED, {expiresIn: 3600}); //1 hora

        res.json({
            ok: true,
            message: 'Login funcionando',
            usuario: usuarioEncontrado,
            token: token,
            id: usuarioEncontrado._id
        })

    })



    
})




module.exports = app;