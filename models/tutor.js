const {Model,Schema,Mongoose} = require('mongoose');

const tutorSchema = new Schema({
    usuario:String,
    contraseña:String,
    nombre:String,
    apellido:String,
    correo:{type:String,maxlength:30},
    telefono:{type:String,maxlength:12},
    idAlumno:Array,
});

module.exports = new Model('Tutor',tutorSchema);