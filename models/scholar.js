const {Model, Schema, Mongoose} = require('mongoose');

const scholarSchema = new Schema(
    {
        nombre:{type:String,maxlength:30},
        apellido:{type:String,maxlength:30},
        carnet: String,
        password:{type:String,minlength:6,maxlength:8},
        edad:{type:Number,min:15,max:110},
        fechaNacimiento:Date,
        direccion:{type:String,maxlength:50},
        correo:String,
        telefono:String,
        statusBecario:{type:Boolean,default:true},
        status:{type:Boolean,default:true},
        idCarrera:Mongoose.objectId,
        idUniversidad:Mongoose.objectId
    }
)

module.exports = new Model("Scholar",scholarSchema);