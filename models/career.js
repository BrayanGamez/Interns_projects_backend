const {model, Schema} = require('mongoose');
const Mongoose = require('mongoose')

const careerScheme = new Schema({
    nombre:String,
    pensum:String,//Aca iria una URL a un servidor de archivos que tenga el pdf del pensum
    ciclos:Number,
    status:{type:Boolean,default:true},
    idUniversidad:Mongoose.Types.ObjectId
});

module.exports = new model('Career',careerScheme);