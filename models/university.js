const {Model,Schema,Mongoose} = require('mongoose');

const universitySchema = new Model({
    nombre:String,
    Direccion:{type:String,maxlength:50},
    correo:{type:String,maxlength:50},
    telefono:{type:String,maxlength:12}
});

module.exports = new Model('University',universityScheme);