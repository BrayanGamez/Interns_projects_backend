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

adminSchema.methods.toJSON = function()
{
    const {__v,password,_id,status,...admin} = this.toObject();
    admin.uid = _id;
    return admin;
};


module.exports = model('admin',adminSchema);