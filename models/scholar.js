const {model, Schema} = require('mongoose');
const mongoose = require('mongoose');

const scholarSchema = new Schema(
    {
        nombre:{type:String,maxlength:30},
        apellido:{type:String,maxlength:30},
        carnet: String,
        password:{type:String},
        edad:{type:Number,min:15,max:110},
        fechaNacimiento:Date,
        direccion:{type:String,maxlength:50},
        correo:String,
        telefono:String,
        statusBecario:{type:Boolean,default:true},
        status:{type:Boolean,default:true},
        idCarrera:{type:mongoose.Types.ObjectId,
                   ref:'Career'},
        idUniversidad:{type:mongoose.Types.ObjectId,
                       ref:'universities'}
    }
)

scholarSchema.methods.toJSON = function()
{
    const {__v,password,_id,status,...scholar} = this.toObject();
    scholar.uid = _id;
    return scholar;
};

module.exports = new model("scholars",scholarSchema);