const {model, Schema} = require('mongoose');
const Mongoose = require('mongoose')

const receptionSchema  = new Schema({
    FechaInicial:Date,
    FechaFinal:Date,
    Descripcion:String,
    EstadoDeFormulario:{type:Boolean,default:true},
    status:{type:Boolean,default:true},
    ColectorDeNotas:String,
    InformeRendimientoAcademico:String,
    InformeDeNotas:String,
    CartaTercioSuperior:String,
    HojaInscripcionCicloProximo:String,
    Estudiante:{type:Mongoose.Types.ObjectId,ref:'scholars'}
});

module.exports = model('reception',receptionSchema);