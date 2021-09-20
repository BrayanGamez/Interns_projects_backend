const {Model, Schema, Mongoose} = require('mongoose');

const careerScheme = new Schema({
    nombre:String,
    pensum:String,//Aca iria una URL a un servidor de archivos que tenga el pdf del pensum
    ciclos:Number,
    idUniversidad:Mongoose.objectId
});

module.exports = new Model('Career',careerScheme);