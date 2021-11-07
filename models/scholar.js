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
        img:{type:String},
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
    const {__v,password,_id,status,fechaNacimiento,...scholar} = this.toObject();
    scholar.uid = _id;
    const pureDate = new Date(fechaNacimiento);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    scholar.fechaDeNacimiento = pureDate.toLocaleDateString(undefined,options);
    return scholar;
};

module.exports = new model("scholars",scholarSchema);