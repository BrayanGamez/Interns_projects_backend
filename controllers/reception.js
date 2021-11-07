const {request,response} = require('express');
const mongoose = require('mongoose');
const {newDate} = require('../helpers/returnDate');
const Reception = require('../models/reception');
const Scholar = require('../models/scholar');

const controllerGet = async(req=request,res=response)=>
{
    const {limite=5,desde=0} = req.query;
    const queryReceptionTrue = {status:true};

    const [Total,Receptions] =  await Promise.all([
        Reception.countDocuments(queryReceptionTrue),
        Reception.find(queryReceptionTrue)
        .populate({path:'Estudiante',select:'nombre'})
        .skip(Number(desde))
        .limit(Number(limite))   
    ]);

    res.json({Total,Receptions});
}


const controllerPost = async(req=request,res=response)=>
{
    const scholars = await Scholar.find({status:true});
    const existReception = await Reception.find({status:true});
    if(existReception.length>0)
    {
        return res.status(400).json({msg:'No puede crear una recepcion, ya existe una'});
    }
    const {FechaInicial,FechaFinal,Descripcion} = req.body;
    const nuevaFechaInicial = newDate(FechaInicial);
    const nuevaFechaFinal = newDate(FechaFinal);
    for(let element of scholars) 
        {
            const nuevoIdParseado = mongoose.Types.ObjectId(element._id.toString());
        
            const reception = new Reception({
                FechaInicial:nuevaFechaInicial,
                FechaFinal:nuevaFechaFinal,
                Descripcion,
                Estudiante:nuevoIdParseado
            });
            await reception.save();  
        };

    res.json({msg:'Se establecio la recepcion de documentos a todos los becarios'});
}

const controllerPut = async(req=request,res=response)=>
{
    const {FechaInicial,FechaFinal,...resto} = req.body;
    if(FechaInicial)
        {
            const nuevaFechaInicial = newDate(FechaInicial);
            resto.FechaInicial = nuevaFechaInicial;
        }
    if(FechaFinal)
        {
            const nuevaFechaFinal = newDate(FechaFinal);
            resto.FechaFinal = nuevaFechaFinal;
        }
          await Reception.updateMany({status:true},resto);

    res.json({msg:'Se actualizo la recepcion en curso'});
}

const controllerDelete = async(req=request,res=response)=>
{
    await Reception.updateMany({status:true},{status:false});

    res.json({msg:'Se Elimino la recepcion'});
}

const controllerStatusForm = async(req=request,res=response)=>
{
    const {estado} = req.params;
    if(estado=='true')
    {
        await Reception.updateMany({status:true},{EstadoDeFormulario:true});
        return res.json({msg:'Recepcion habilitada'});
    }
   if(estado=='false')
   {
    await Reception.updateMany({status:true},{EstadoDeFormulario:false});
   return res.json({msg:'Recepcion Deshabilitada'});
   }
   res.status(400).json({msg:'El estado que ingreso no es valido'});
    
}

module.exports = {
    controllerPost,
    controllerGet,
    controllerPut,
    controllerDelete,
    controllerStatusForm
}