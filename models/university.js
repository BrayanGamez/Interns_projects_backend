const {model,Schema} = require('mongoose');

const universitySchema = new Schema({
    nombre:{type:String,maxlength:50},
    direccion:{type:String,maxlength:100},
    correo:{type:String,maxlength:50},
    telefono:{type:String,maxlength:20},
    status:{type:Boolean,default:true}
});

universitySchema.methods.toJSON = function()
{
    const {__v,password,_id,status,...university} = this.toObject();
    university.uid = _id;
    return university;
};


module.exports = new model('universities',universitySchema);