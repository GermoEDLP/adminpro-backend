var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El nemail es necesario'] },
    pass: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String },
    role: { type: String, required: true, default: 'USER:ROLE' },


});

module.exports = mongoose.model('Usuario', usuarioSchema);