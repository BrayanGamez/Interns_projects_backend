const {model,Schema} = require('mongoose');

const adminSchema = new Schema({
    usuario:String,
    password:String,
    nombre:String,
    apellido:String,
    rol:{type:String,default:'Admin'},
    status:{type:Boolean,default:true},
    correo:{type:String,maxlength:30,unique:true},
    telefono:{type:String,maxlength:25}
});

module.exports = model('admin',adminSchema);