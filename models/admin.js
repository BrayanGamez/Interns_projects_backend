const {Model,Schema,Mongoose} = require('mongoose');

const adminSchema = new Schema({
    usuario:String,
    contraseña:String,
    nombre:String,
    apellido:String,
    correo:{type:String,maxlength:30},
    telefono:{type:String,maxlength:12}
});