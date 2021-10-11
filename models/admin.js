const {model,Schema} = require('mongoose');

const adminSchema = new Schema({
    usuario:String,
    password:String,
    nombre:String,
    apellido:String,
    correo:{type:String,maxlength:30},
    telefono:{type:String,maxlength:12}
});

module.exports = model('admin',adminSchema);