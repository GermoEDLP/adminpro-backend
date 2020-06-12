
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

//=================================================
// Verificar TOKEN
//=================================================
//Viene en orden para que si llega hasta este middleware y lo rechaza, no ejecuta el resto

exports.verificaToken = function(req, res, next) {

    //Es query, porque no siempre viene por url. Si no viene por url, entonces esto se lo salta porque es undefined
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en base de datos al buscar un Usuario',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();
    })
};