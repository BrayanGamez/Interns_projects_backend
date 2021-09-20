const {Model,Schema,Mongoose} = require('mongoose');

const dataCenterSchema = new Schema({
    Fecha:Date,
    idAlumno:Mongoose.objectId
});