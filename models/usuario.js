var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: 'El rol {VALUE}, no es valido'
}

var usuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El nemail es necesario'] },
    pass: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String },
    role: { type: String, required: true, default: 'USER:ROLE', enum: rolesValidos },


});



usuarioSchema.plugin(uniqueValidator, {message: 'El campo {PATH} debe ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema);