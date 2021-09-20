const {Model,Schema,Mongoose} = require('mongoose');

const assignatureSchema = new Schema({
    nombre:String,
    Calificacion:Number,
    idCarrera:Mongoose.objectId,
    idAlumno:Mongoose.objectId
});

module.exports = new Model('Assignature',assignatureSchema);