const {model,Schema} = require('mongoose');
const mongoose = require('mongoose');

const assignatureSchema = new Schema({
    nombre:String,
    idCarrera:{type:mongoose.Types.ObjectId,
               ref:'Career'},
    status:{type:Boolean,default:true}
});

assignatureSchema.methods.toJSON = function()
{
    const {__v,_id,status,...assignature} = this.toObject();
    assignature.uid = _id;
    return assignature;
};

module.exports = new model('Assignature',assignatureSchema);